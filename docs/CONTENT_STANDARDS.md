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
