#!/usr/bin/env node
/**
 * Ollama Draft Helper — Ledger of Ash
 *
 * Generates N candidate narrations / choice labels / result text via the local
 * Ollama server, grounded in the locality voice guide and content/CLAUDE.md
 * style rules. Output goes to stdout as JSON for easy piping or capture.
 *
 * Requires Ollama server running at http://localhost:11434 (start with
 * `ollama serve` or by launching the Ollama desktop app).
 *
 * Usage:
 *   node scripts/ollama-draft.js --locality shelkopolis --task narration --count 5
 *   node scripts/ollama-draft.js --locality soreheim_proper --task choice-label --count 8 --intent "confront the warden about a stamped manifest"
 *   node scripts/ollama-draft.js --locality guildheart_hub --task result-text --count 3 --intent "Player succeeds at convincing a guild scribe to leak a manifest" --tier safe
 *
 * Flags:
 *   --locality <id>     Required. Locality id matching keys in LOCALITY_VOICE_GUIDE.
 *   --task <kind>       narration | choice-label | result-text  (default: narration)
 *   --count N           Number of candidates (default: 5)
 *   --model <name>      Ollama model (default: llama3.1:8b)
 *   --intent "..."      Optional scene/choice intent (required for choice-label/result-text)
 *   --tier <t>          safe | risky | bold (result-text only; affects framing)
 *   --raw               Print raw model output instead of parsed JSON
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const VOICE_GUIDE_PATH = path.join(ROOT, 'content', 'locality_voice_guide.js');
const STYLE_GUIDE_PATH = path.join(ROOT, 'content', 'CLAUDE.md');
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

function parseArgs(argv) {
  const args = { task: 'narration', count: 5, model: 'llama3.1:8b' };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const next = argv[i + 1];
    if (k === '--locality') { args.locality = next; i++; }
    else if (k === '--task') { args.task = next; i++; }
    else if (k === '--count') { args.count = parseInt(next, 10); i++; }
    else if (k === '--model') { args.model = next; i++; }
    else if (k === '--intent') { args.intent = next; i++; }
    else if (k === '--tier') { args.tier = next; i++; }
    else if (k === '--raw') { args.raw = true; }
    else if (k === '--help' || k === '-h') { args.help = true; }
  }
  return args;
}

function loadVoiceGuide() {
  const src = fs.readFileSync(VOICE_GUIDE_PATH, 'utf8');
  const sandbox = { window: {} };
  new Function('window', src)(sandbox.window);
  return sandbox.window.LOCALITY_VOICE_GUIDE || {};
}

function loadStyleRules() {
  const md = fs.readFileSync(STYLE_GUIDE_PATH, 'utf8');
  const sections = {};
  ['Narrative Style', 'Content Type Standards', 'Forbidden Words', 'Choice Label Standard — Moral Texture']
    .forEach(name => {
      const re = new RegExp(`## ${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*\\n([\\s\\S]*?)(?=\\n## |\\n# |$)`);
      const m = md.match(re);
      if (m) sections[name] = m[1].trim();
    });
  return sections;
}

function buildPrompt({ task, locality, voiceEntry, styleRules, count, intent, tier }) {
  const voiceBlock = voiceEntry
    ? `LOCALITY: ${locality}
sensoryAnchor: ${voiceEntry.sensoryAnchor || '(none)'}
register: ${voiceEntry.register || '(none)'}
vocabulary: ${(voiceEntry.vocabulary || []).join(', ')}
magicLaw: ${voiceEntry.magicLaw || '(none)'}
hierarchyTell: ${voiceEntry.hierarchyTell || '(none)'}`
    : `LOCALITY: ${locality} (no voice-guide entry — match the project's general observational style)`;

  const forbidden = `Forbidden words/phrases (NEVER use): investigation, investigate, meaningful, contact (as person noun), official (vague), "you feel", "you realize", "you sense", "the city knows it", "in a way that suggests".`;

  const taskBlock = (() => {
    if (task === 'narration') {
      return `TASK: Write ${count} distinct candidate locality narrations.
- 1–2 sentences each
- Open with a sensory detail specific to THIS place — use the sensoryAnchor for grounding but vary the specifics
- No editorial framing, no "the city knows," no abstract atmosphere
- Show defining infrastructure (dome, towers, walls, etc.) before mood`;
    }
    if (task === 'choice-label') {
      return `TASK: Write ${count} distinct candidate CHOICE LABELS for this player intent: "${intent || '(no intent provided)'}"
- Each is the player's INNER VOICE (a thought), not a description of an action
- Under 15 words
- No question marks
- No infinitives ("To ask...", "To check..." — wrong)
- Carry moral register inside the label — don't save it for the result
Example formats: "The warden stamped that manifest without looking at it." / "Aurek knows which routes stopped moving."`;
    }
    if (task === 'result-text') {
      const tierNote = tier === 'safe' ? 'safe-tier success: low-stakes, observed detail dominates'
                     : tier === 'bold' ? 'bold-tier outcome: consequences land hard, sensory texture stays grounded'
                     : 'risky-tier outcome: tradeoff visible, voice stays observational';
      return `TASK: Write ${count} distinct candidate RESULT TEXT passages for this outcome: "${intent || '(no intent provided)'}"
- 60–90 words each (90 hard cap)
- Scene, not summary
- Tier framing: ${tierNote}
- Show emotional texture through behavior/posture/tone — never tell the player what they feel`;
    }
    return `TASK: ${task}`;
  })();

  return `You are drafting candidates for the text-RPG "Ledger of Ash."

STYLE:
${styleRules['Narrative Style'] || ''}

CONTENT RULES:
${styleRules['Content Type Standards'] || ''}

${forbidden}

${voiceBlock}

${taskBlock}

OUTPUT: Return a single JSON array of ${count} strings. No prose around it. No numbering inside the strings. Just the array.`;
}

function callOllama(model, prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model, prompt, stream: false });
    const url = new URL('/api/generate', OLLAMA_HOST);
    const req = http.request({
      hostname: url.hostname,
      port: url.port || 11434,
      path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      timeout: 120_000,
    }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`Ollama returned non-JSON: ${data.slice(0, 200)}`)); }
      });
    });
    req.on('error', err => reject(new Error(
      `Ollama API unreachable at ${OLLAMA_HOST}. Start the server with \`ollama serve\` or launch the Ollama desktop app. (${err.message})`
    )));
    req.on('timeout', () => { req.destroy(); reject(new Error('Ollama request timed out after 120s')); });
    req.write(body);
    req.end();
  });
}

function extractJsonArray(text) {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1) return null;
  try { return JSON.parse(text.slice(start, end + 1)); }
  catch (e) { return null; }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.locality) {
    process.stdout.write(fs.readFileSync(__filename, 'utf8').match(/\/\*\*[\s\S]*?\*\//)[0] + '\n');
    process.exit(args.help ? 0 : 1);
  }
  if ((args.task === 'choice-label' || args.task === 'result-text') && !args.intent) {
    console.error(`--intent "..." is required for task=${args.task}`);
    process.exit(1);
  }

  const guide = loadVoiceGuide();
  const voiceEntry = guide[args.locality];
  if (!voiceEntry) {
    console.error(`Warning: no voice-guide entry for locality "${args.locality}". Proceeding with style-only grounding.`);
  }

  const styleRules = loadStyleRules();
  const prompt = buildPrompt({
    task: args.task, locality: args.locality, voiceEntry, styleRules,
    count: args.count, intent: args.intent, tier: args.tier,
  });

  const result = await callOllama(args.model, prompt);
  const raw = result.response || '';

  if (args.raw) {
    process.stdout.write(raw + '\n');
    return;
  }

  const arr = extractJsonArray(raw);
  if (!arr) {
    console.error('Could not parse JSON array from model output. Re-run with --raw to inspect.');
    console.error('--- raw start ---'); console.error(raw); console.error('--- raw end ---');
    process.exit(2);
  }
  process.stdout.write(JSON.stringify({
    locality: args.locality, task: args.task, model: args.model,
    count: arr.length, candidates: arr,
  }, null, 2) + '\n');
}

main().catch(err => { console.error(err.message); process.exit(1); });
