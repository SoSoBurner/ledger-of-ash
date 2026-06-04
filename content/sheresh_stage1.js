var SHERESH_STAGE1 = (function() {

  function openingHook() {
    
    if (!G || G.flags.sideplot_sheresh_started) return;
    G.flags.sideplot_sheresh_started = true;

    G.lastResult = 'The memory hall is cool and smells of old binding paste. You are looking for one thing and find another: the entry for the year you turned nine has a blank where a name should be. Not a struck-through name, not a notation of correction. A blank — the kind left when a line of text is carefully removed and the surrounding entries are closed around it to hide the gap. You know whose name belongs there. The healer who showed you which leaf treats river-fever, who argued with the provisioning board every harvest and was always right. Her name is not here. The commune record has no entry for her at all.';
    G.flags.sheresh_memory_gap_found = true;
    G.recentOutcomeType = 'discovery';
    G.investigationProgress = Math.max(G.investigationProgress || 0, 2);
    addJournal(G.lastResult, 'evidence');
    if (typeof addNarration === 'function') addNarration('Commune Registry', G.lastResult);

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        { id: 'sheresh_ask_elder', plot: 'main', text: 'An elder would remember what was before the gap.', tag: 'bold',
          action: function() { askElder(); } },
        { id: 'sheresh_search_older', plot: 'main', text: 'Search older records — find evidence she existed before the gap.', tag: 'risky',
          action: function() { searchOlderRecords(); } },
        { id: 'sheresh_sit_with_it', plot: 'main', text: 'Sit with the knowledge. What does it mean that she is gone from here too?', tag: 'safe',
          action: function() { sitWithIt(); } }
      ]);
    }, 400);
  }

  function askElder() {
    
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The elder stands at the registry shelf and does not reach for the book. She already knows the page you mean. "They came through with a correction order," she says. "They called it a duplicate registration. Two entries for the same individual." She pauses. "There was never a duplicate. I checked the year myself afterward." She cannot give you a name. She can tell you the order came in from outside the commune — sealed, stamped, and acted on before anyone thought to ask why.';
      G.flags.sheresh_external_erasure_confirmed = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'The elder you find looks at the blank line and suggests a transcription error — her voice flat and practiced, as if she has rehearsed exactly this answer. She does not meet your eyes when she says it. She changes the subject before you can ask a follow-up question and keeps her back to you until you leave the room.';
      G.flags.sheresh_elder_uncooperative = true;
    }
    addJournal(G.lastResult, 'evidence');
    _closeWithHint();
  }

  function searchOlderRecords() {
    
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'The secondary ledger is stored flat in a crate under correspondence bundles nobody has opened in years. Her name is there three times — a resource requisition for fever-plant compounds, a healer certification renewal, and a formal grievance filed against the commune memory board. The grievance is dated three months before the gap appears in the primary registry. It names "external registry interference" as the cause of the complaint. There is no resolution entry. The grievance was received and then nothing happened and then her name was gone.';
      G.flags.sheresh_evidence_found = true;
      G.flags.sheresh_grievance_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 4);
    } else {
      G.lastResult = 'The secondary ledger has water damage along the bottom third of every page in the relevant year-range. You find one certification entry that could match — healer, river district, the right approximate period — but the name block is unreadable. You cannot confirm it. An afternoon in a damp room with nothing to show for it except a possible that stays possible.';
    }
    addJournal(G.lastResult, 'evidence');
    _closeWithHint();
  }

  function sitWithIt() {
    
      G.lastResult = 'You sit with the ledger open to the blank line. You know what her hands looked like when she prepared a compress. You know which cough she took seriously and which she sent home with salt water. The record says none of that happened. Someone decided it should not have happened, and then someone else made the record agree. The pattern you have been following in other places started here — in your own commune, in a year when you were young enough not to notice. That is what the blank line is telling you. It started before you were looking.';
    G.flags.sheresh_emotional_anchor_set = true;
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
    G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    addJournal(G.lastResult, 'evidence');
    _closeWithHint();
  }

  function _closeWithHint() {

    if (!(G.flags && G.flags.sheresh_principalities_hint_shown)) {
      G.flags.sheresh_principalities_hint_shown = true;
      if (typeof addNarration === 'function') {
        addNarration('A Thought', 'The pattern is larger than this commune. If it happened here, it happened in more places. The Principalities — Shelkopolis in particular — is where the ledger records are centralized. That is where the answer is.');
      }
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
    setTimeout(function() {
      if (typeof loadStageChoices === 'function' && !document.querySelector('.choice-btn:not([disabled])')) {
        loadStageChoices(G.location);
      }
    }, 500);
  }

  return { openingHook: openingHook };
})();

window.SHERESH_STAGE1 = SHERESH_STAGE1;

// Enriched choices pool for Sheresh — ensures ≥3 ungated choices at sp1=0
// No canon NPCs: Sheresh has zero authored named NPCs; all voices are unnamed commune members
var SHERESH_STAGE1_ENRICHED_CHOICES = [
  {
    id: 'sheresh_commune_board',
    label: 'The commune record board is open. Something was filed and then not followed up on.',
    plot: 'main',
    tags: ['Records', 'Observation', 'Stage1'],
    xpReward: 65,
    skill: 'wits',
    dc: 7,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading commune record board');
      G.stageProgress[1]++;
      var result = rollD20('wits', (G.skills && G.skills.wits) || 0);
      if (result.total >= 12) {
        G.lastResult = 'The board holds three months of postings. Near the bottom, almost covered by a harvest notice, is a complaint filed by a commune member against external record revision. The signature block is intact. The response block is blank — the board received it and nothing happened. The complaint describes an entry removed from the health registry without a correction order, without a notified party, without any procedural basis. It names no one responsible because no one came to answer it.';
        G.flags.sheresh_board_complaint_found = true;
        addJournal('Commune board: unresolved complaint against external record revision, health registry entry removed without procedure.', 'evidence');
      } else {
        G.lastResult = 'The board is layered with postings — harvest tallies, water-use agreements, a notice about the winter road schedule. The older material underneath requires pulling back edges to read. The complaint you are looking for is probably here. The date range is right. Finding it means returning when the newer postings have come down.';
        addJournal('Commune board layered — older record complaints may be underneath recent postings.', 'intelligence');
      }
      G.recentOutcomeType = 'investigate';
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    },
    failResult: 'The board is too layered with current postings to read what is underneath without disturbing material still in use. The record keeper cycles it weekly. Returning after the next change would give clear access to the older filings.'
  },
  {
    id: 'sheresh_water_route',
    label: 'The water-route marks moved north without a vote.',
    tags: ['Survey', 'Observation', 'Stage1'],
    xpReward: 60,
    skill: 'vigor',
    dc: 7,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(60, 'surveying eastern water route');
      G.stageProgress[1]++;
      var result = rollD20('vigor', (G.skills && G.skills.vigor) || 0);
      if (result.total >= 10) {
        G.lastResult = 'The marker stakes have been reset recently — the ground around the new positions is softer than the surrounding soil, undisturbed in a way that marks recent work. The old positions are still visible as faint impressions in the earth. The rerouting pushes the path sixty meters north of the original line, away from the stand of medicinal plants that grows along the original route. Nobody who uses that route for harvesting would have chosen this change. It was made by someone who does not use it.';
        G.flags.sheresh_water_route_redirected = true;
        addJournal('Eastern water-route markers moved without commune vote — rerouting avoids medicinal plant stand.', 'evidence');
      } else {
        G.lastResult = 'The path runs east along the ridge and the markers are where they should be — or where they appear to be. Reading recent ground disturbance in dry weather requires closer attention than a first pass allows. The afternoon light is wrong for it. Coming back at a different time of day would make the soil reading clearer.';
      }
      G.recentOutcomeType = 'investigate';
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    },
    failResult: 'The ground is dry and the light is wrong for reading recent disturbance. The route marker reading would be clearer in morning light or after rain — conditions that make soil compression visible without crouching for an hour.'
  },
  {
    id: 'sheresh_provisioning_log',
    label: 'One year in the provisioning log is nearly empty.',
    tags: ['Records', 'Inquiry', 'Stage1'],
    xpReward: 65,
    skill: 'wits',
    dc: 7,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading provisioning log');
      G.stageProgress[1]++;
      var result = rollD20('wits', (G.skills && G.skills.wits) || 0);
      if (result.total >= 10) {
        G.lastResult = 'The log runs in a consistent hand for four years — regular entries, corrections noted in margin, the ordinary accumulation of a working settlement. Then a gap: eleven months where the entry count drops to a third of the usual rate. The remaining entries in that period are formal and brief, stripped of the annotation that makes the other years readable. Someone was still writing, but carefully. The gap closes when the handwriting changes — a different recorder started, and the normal volume returned. The name of the prior recorder does not appear in the log after that.';
        G.flags.sheresh_provisioning_gap_found = true;
        addJournal('Provisioning log: eleven-month gap with sparse formal entries — prior recorder disappeared from record after that period.', 'evidence');
      } else {
        G.lastResult = 'The log is maintained in the provisioning house, which is open during the morning distribution hours and closed after. Getting adequate time with it requires returning before the first bell, when the building is unlocked for the day\'s work but before the members arrive.';
      }
      G.recentOutcomeType = 'investigate';
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    },
    failResult: 'The provisioning house closes before there is enough time to work through five years of entries methodically. Coming back during the morning distribution hours, before the building fills with members, would give a clear window.'
  }
];

window.SHERESH_STAGE1_ENRICHED_CHOICES = SHERESH_STAGE1_ENRICHED_CHOICES;
