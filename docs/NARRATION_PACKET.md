# Ledger of Ash — Narration Packet Structure

Narration packets are the ONLY interface between the deterministic engine and Claude.
Claude reads the packet and generates flavor text only.
Claude never modifies game state. Claude never decides outcomes.

## Packet structure

```json
{
  "sceneContext": "Shelkopolis, Principality of Shelk. Dawnrise. Axis stable.",
  "playerArchetype": "Inquisitor",
  "playerBackground": "House Shirsh Investigator",
  "playerName": "Sena",
  "playerAlignment": "Lawful Neutral",
  "playerRenown": "Known (renown 12)",
  "choiceText": "The Roadwardens. Shirsh investigator credentials give you standing here.",
  "outcomeType": "success",
  "outcomeDetail": "The duty sergeant recognizes your credentials and grants a brief meeting.",
  "effectsSummary": "Roadwardens faction +8. Quest added: Speak to Captain Holst.",
  "rollDisplay": "d20: 14 + persuasion 3 + trait 1 = 18 vs difficulty 7",
  "locationDesc": "Capital of House Shelk. Dyes, pressed flowers, polished boots.",
  "timeOfDay": "Dawnrise",
  "dayCount": 2,
  "activeWounds": [],
  "factionContext": "Roadwardens: 53 rep. House Shelk: 65 rep.",
  "npcMemory": "Captain Thalion Windrider: seen 0 times, trust 0."
}
```

## Claude prompt template (system)

```
You are the narrative voice of Ledger of Ash, a text RPG set in the V28_4 canon world.
You generate immersive second-person scene narration based on deterministic game outcomes.

Rules:
- Second person only ("You walk in...") — never first or third
- Observative, not explanatory — describe what is perceptible
- No inner monologue, no assumed actions, no assumed possessions
- Culturally specific to the location and polity
- Concise: 2-4 sentences maximum per scene description
- The outcome is already determined — you narrate it, not decide it
- If outcome is failure, narrate the failure without inventing causes
- Include sensory detail: sound, smell, light, texture
- Include one culturally specific detail where supported by canon

You are given a narration packet. Generate:
1. sceneText (2-3 sentences): the scene as the player experiences it
2. npcLines (0-1 lines): what an NPC says, if relevant, verbatim
3. recapLine (1 sentence): a journal-style summary of what happened
```

## Fallback text (deterministic, always available)

If Claude is unavailable, the deterministic fallback text from the consequence node is displayed.
This text is written to be readable and sufficient on its own.
Claude narration is additive flavor — the game is always playable without it.
