# Content Authoring Standards — Ledger of Ash

## A1 — Result Text Minimum Length

**Rule:** Every result text must be at least 30 words. Under 30 words is a placeholder, not a result.

**Pass:** "The innkeeper slides the registry across without meeting your eye. The entry you need is already folded to — a small crease at the corner, recent. Someone read this before you arrived. The name in the margin is not in the standard registry hand; it was added after the page was filled."

**Fail:** "You find the entry. Someone has already read it."

## A2 — Result Text Target Length

**Rule:** Target 60–90 words. 30–59 words triggers a warning (expand if possible). Over 120 words fails (trim to fit one screen).

At 60 words a result earns its place. At 90 it's complete. Past 120 it scrolls, and scrolling breaks immersion.

## A3 — No Summary-Register Openers

**Rule:** Result text must not begin with a procedural summary phrase.

**Blocked openers (case-insensitive):** "confirms", "acknowledges", "indicates", "the result is", "you learn that", "it turns out"

**Fail:** "Confirms the delivery was rerouted. The factor handled it personally."

**Pass:** "The factor handled it personally. That much is in the ledger, in ink that's still bright — the entry was made after everything else on the page."

The blocked phrases open with a verdict. The game already resolved the dice; the result should open in the scene, not above it.

## A4 — Rumor Source Attribution

**Rule:** Any rumor journal entry (`addJournal(text, 'rumor')`) must contain a source marker — a proper noun (NPC name), a social role, or a location reference.

**Blocked (no source):** "Word is the shipment was rerouted."

**Pass:** "A stevedore at the south wharf said the cargo was moved before the manifest was logged — he saw it himself but didn't ask why."

A rumor without a source is a briefing. Rumors should feel overheard — they need a mouth and a room. Acceptable source markers: a named NPC (two capitalized words), a social role (merchant, factor, clerk, warden, innkeeper, stevedore, scribe, captain, etc.), or a location word (market, hall, inn, gate, dock, harbor, etc.).

## A5 — NPC First-Encounter Flag Timing

**Rule:** `G.flags.met_<name> = true` must be set *before* any `addNarration()` call that names the NPC, not after it.

**Fail:**
```js
addNarration('', 'Elior sets the ledger down without looking at you.');
G.flags.met_elior = true; // too late — flag must precede narration
```

**Pass:**
```js
G.flags.met_elior = true;
addNarration('', 'Elior sets the ledger down without looking at you.');
```

If the met flag is set during the outcome block (after narration), any check gating on that flag sees the wrong state on the same turn. Set the flag before narration that assumes familiarity.

## A6 — World Clock Transparency

**Rule:** If `G.worldClocks.<key>++` or `+= N` appears in a choice `fn()`, the result text must contain at least one consequence-signal word: `attention`, `pressure`, `harder`, `watchful`, `noticed`, `tracked`, or `scrutin`. Violation is a **warning**, not a failure.

**Fail (WARN):**
```js
G.worldClocks.pressure++;
addNarration('Gate', 'The gate clerk marks your name in the log.');
// silent — player cannot know why future DCs will be harder
```

**Pass:**
```js
G.worldClocks.pressure++;
addNarration('Gate', 'The gate clerk marks your name in the log. The next time through this checkpoint will be harder — he has your face now.');
```

If the clock ticks, the player must feel it. Silent increments are invisible tax.

---

## Human Review Standards (B1–B5)

These standards require judgment and cannot be automated. Run `npm run review:content <file>` to generate a checklist pre-populated with flagged choices, then work through each item.

### B1 — Scene Opening

**Check:** Does the result text open with an observable action, sensory detail, or physical environment — or does it open with a procedural summary that positions the player above the scene?

**Pass signal:** *"Aurek sets the ledger down without looking at it."* (player is in the scene)

**Fail signal:** *"Aurek confirms the figures match."* (player is above the scene, reading a verdict)

**B1 vs A3:** A3 catches specific mechanical openers ("confirms", "it turns out"). B1 catches the broader pattern — any result that summarizes rather than shows. A clean declarative opener like "She was right." passes A3 but may fail B1 if it positions the player outside the moment.

### B2 — NPC Register and Tell

**Check:** For any named NPC appearing in dialogue — does their speech pattern match their dossier register? Does their physical tell appear at least once per scene?

A tell is specific enough that no other NPC would do it. Wrong: *"she folds her hands."* Right: *"her thumb finds the chalk edge of the ward mark in the doorframe without her seeming to notice it."*

Cross-check against `content/npc_dossiers.js` or V33_2 canon (`data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/`).

### B3 — Rumor Source Texture

**Check:** Does the rumor feel like it was overheard in a specific place, at a specific time, from a specific social register — or does it read like a labeled briefing?

**B3 vs A4:** A4 checks mechanical presence of attribution (proper noun, location, or role). B3 checks whether the attribution feels *lived in*. "A merchant said X" passes A4. "A wool merchant at the Guildheart exchange — the one who argues about weight stamps every Tuesday — said X" passes B3.

### B4 — Combat Result Vividness

**Check:** Combat outcomes (press/defend results) must include at least one specific physical detail — a body part, a weapon behavior, a surface, or a sound. No generic outcome language.

**Fail:** *"You win the fight."* / *"The enemy falls."*

**Pass:** *"The blade catches him across the collarbone — not deep, but the shoulder drops and his grip goes slack."*

### B5 — Subtext

**Check:** Every named NPC scene must have at least one layer of subtext — something the NPC wants but does not say directly. If every NPC line can be taken at face value, the scene fails.

NPCs rarely say exactly what they mean. An innkeeper who mentions the registry has been "very busy lately" might be warning you. A factor who answers every question completely may be performing compliance to avoid harder questions. If the NPC's agenda is fully visible in their words, add an unsaid layer.
