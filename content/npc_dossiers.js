// NPC Dossiers — Ledger of Ash
// Three-layer model per NPC: Agenda (independent want), Register (speech shaped by class/locality), Tell (one physical/behavioral habit)
// Used to keep dialogue consistent across stages. Not all NPCs appear in player-facing text — mark [OFFSTAGE] for lore-only entries.

window.NPC_DOSSIERS = {

  // ============================================================
  // OVERSIGHT COLLEGIUM
  // ============================================================

  orveth: {
    name: 'Inquisitor Orveth',
    faction: 'Oversight Collegium',
    locality: 'Shelkopolis (Collegium Hall)',
    stage_first_appears: 2,
    agenda: 'Contain the suppressed names scandal before it implicates the Collegium itself — she knows someone inside is responsible and wants to identify them before the player does.',
    register: 'Precise and economical. Never repeats herself. Uses institutional terminology as armor — "a person of interest," "noted as well," "active inquiries." When she chooses directness, it is more unsettling than her formality.',
    tell: 'Finishes what she is reading before acknowledging anyone who enters. Sets the document squarely at the corner of her desk before she speaks. The squareness of the corner is not incidental.',
    subtext: 'She knows more than she reveals at every stage. Her silences are not absences — they are positions.',
    renown_reactive: 'At renown 10+: "I had heard your name before you arrived. That is unusual for someone at your stage of things."',
    archetype_reactive: {
      magic: '"A licensed practitioner. That simplifies certain questions and complicates others."',
      stealth: 'She looks at you as if she already knows what you are. She does not say so.'
    }
  },

  seld: {
    name: 'Seld',
    faction: 'Oversight Collegium (junior archivist)',
    locality: 'Shelkopolis (Collegium filing rooms)',
    stage_first_appears: 2,
    agenda: 'Get out before whoever is protecting the suppressed names decides he is a liability. He has been feeding information because silence felt more dangerous, not because he is brave.',
    register: 'Fast, clipped, low volume. Leaves sentences incomplete when he is afraid. Refers to the filing rooms by their floor number, not their function — a habit of someone who thinks about exits.',
    tell: 'Checks the corridor behind him before speaking even when the building is empty. Keeps his hand on his satchel strap.',
    subtext: 'He does not know the full picture — only his fragment. He is aware he does not know the full picture, which is why he is afraid.'
  },

  // ============================================================
  // MAREN OSS
  // ============================================================

  maren_oss: {
    name: 'Maren Oss',
    faction: 'Independent (former Collegium adjacent)',
    locality: 'Shelkopolis',
    stage_first_appears: 1,
    agenda: 'Establish whether the player is useful without making herself useful first. She has been burned by premature trust and the caution is now structural.',
    register: 'Unhurried. Asks questions rather than making statements. When she does make statements, they are complete and she does not elaborate unless asked. Guild vocabulary absent — she is deliberately unaffiliated.',
    tell: 'Does not comment on what she observes. But she looked. This is noted in narration, not in her speech.',
    subtext: 'She has her own thread on the same case. She is further along than the player and is deciding whether to share the lead or keep the advantage.',
    archetype_reactive: {
      support: '"Supply lines. Yes. That is a useful way to come at this."',
      stealth: 'She looks at you once and does not explain what she was assessing.'
    }
  },

  // ============================================================
  // UNION — GUILD COUNCIL
  // ============================================================

  selene: {
    name: 'Guildmaster Selene',
    faction: 'Union (Guild Council)',
    locality: 'Guildheart Hub',
    stage_first_appears: 3,
    agenda: 'Preserve the Union\'s procedural legitimacy above all — not from cynicism but from genuine belief that process is the only thing keeping commerce functional. Corruption that operates outside the process is, to her, a greater threat than the content of the corruption.',
    register: 'Formal but not cold. Uses "we" for the Union and "the record" for anything she wants treated as fact. Never raises her voice. When she disagrees, she asks a clarifying question that makes you explain your own error.',
    tell: 'Hosts every significant meeting in her office. The seating arrangement communicates her position on the relationship — visitors to the chair across the desk, potential allies to the side chair, subordinates standing.',
    subtext: 'She suspects the player before the player is relevant to her. She is patient because she has leverage she has not used yet.',
    renown_reactive: 'At renown 15+: "You have made yourself visible. That is a choice with consequences in both directions."'
  },

  orin_ledgermere: {
    name: 'Orin Ledgermere',
    faction: 'Union (Border Assessor)',
    locality: 'Transit posts, multiple localities',
    stage_first_appears: 1,
    agenda: 'Maintain the Union\'s transit monopoly while quietly routing information about irregularities to whoever will act on them — not out of principle, but because irregularities threaten the monopoly.',
    register: 'Assessor register: manifests first, people second. Addresses everyone by their listed trade classification until he knows them well enough to use a name. Uses "the record shows" as both an assertion and a deflection.',
    tell: 'Marks his place in whatever document he is reading before he looks up. Does not lose his place.',
    subtext: 'He is cautious about the player until a transit irregularity connects. Then he becomes specifically, narrowly useful.'
  },

  sable_ledgermere: {
    name: 'Sable Ledgermere',
    faction: 'Union (Archive Scribe, Guildheart Hub)',
    locality: 'Guildheart Hub',
    stage_first_appears: 2,
    agenda: 'Document everything correctly. The sealed charter exemptions bother her not because she knows what they mean but because they break her filing system.',
    register: 'Categorical and precise. Gives you the classification before the content. "Under freight charter, subsection four, there is an exemption that..." Becomes flustered when asked to interpret rather than describe.',
    tell: 'Reaches for her index before answering questions about documents, even when she already knows the answer.',
    subtext: 'She knows more than she has filed, because some of what she has found does not fit any existing category and she has not decided how to classify it.'
  },

  kesh: {
    name: 'Guild Arbitrator Kesh',
    faction: 'Union (Guildheart Hub)',
    locality: 'Guildheart Hub',
    stage_first_appears: 1,
    agenda: 'Protect his family\'s guild standing while finding someone outside the system who can deal with the directives he has been receiving. He chose cooperation over resistance and is not sure he chose correctly.',
    register: 'Formal in public, clipped and low in private. Refers to the corruption obliquely in official settings — "the process has been complex" means "I have been told how to rule." Uses "I had no choice" as a shield he does not entirely believe in.',
    tell: 'Speaks quietly even when the room is empty. Old habit from months of being watched.',
    subtext: 'He wants to be useful to the player but cannot be seen being useful. Every piece of information comes wrapped in a layer of deniability.'
  },

  porter_brokerwell: {
    name: 'Porter Brokerwell',
    faction: 'Union Trade Arbitration Guild',
    locality: 'Guildheart Hub / circuit',
    stage_first_appears: 2,
    agenda: 'Protect the arbitration guild\'s territory from both the corruption and from any investigation that would expose how much the guild knew and when.',
    register: 'Hearty and formal in alternation — uses warmth as a tool, not a state. "We are all on the same side here" means something specific and is worth parsing.',
    tell: 'Makes everything a mutual arrangement. Even information that costs him nothing becomes a trade.',
    subtext: 'He knows the arbitration process was compromised. He does not know the full network behind it. He is more useful as a source than he will admit to being.'
  },

  sena_brokerwell: {
    name: 'Sena Brokerwell',
    faction: 'Union Sanction Board',
    locality: 'Guildheart Hub',
    stage_first_appears: 2,
    agenda: 'Apply sanctions correctly and on record. She is not corrupt — but the Sanction Board\'s records have been used to legitimize things she did not sanction, and she has not yet noticed.',
    register: 'By-the-number. Cites the relevant statute before explaining it. If you cite an incorrect statute, she corrects you before engaging with the substance.',
    tell: 'Always has the current sanction register open on the corner of her desk. Points to it rather than quoting from memory.',
    subtext: 'She is the most useful single source in Guildheart, but her usefulness depends on whether the player can show her the record irregularities in terms she can classify as sanctionable.'
  },

  // ============================================================
  // LOCALITIES — MINOR NAMED NPCs
  // ============================================================

  ilya: {
    name: 'Merchant Representative Ilya',
    faction: 'Independent traders (Guildheart Hub)',
    locality: 'Guildheart Hub',
    stage_first_appears: 1,
    agenda: 'Restore his trade agreements to the terms he originally signed. He is not interested in the larger conspiracy — he wants his contracts back.',
    register: 'Merchant register: talks about agreements in abstract terms until he trusts you, then quotes chapter and clause. Uses "they" for the guild leadership without naming anyone.',
    tell: 'Carries the original trade agreement folded into his satchel. Has carried it for months without knowing what to do with it.',
    subtext: 'He can provide documentary evidence but only if the player can show him a use for it that does not expose him to further retaliation.'
  },

  vale_brokerwell: {
    name: 'Vale Brokerwell',
    faction: 'Union (Clerk of Arrivals, Unity Square)',
    locality: 'Unity Square',
    stage_first_appears: 2,
    agenda: 'Keep the arrival registry accurate. The shadow sub-register bothers her specifically because it is not her record — it is someone else\'s, and it uses her station to legitimize transit exemptions she did not approve.',
    register: 'Administrative and resigned. Has explained the sub-register problem to three supervisors and been told not to raise it again. Speaks about it with the tone of someone who has stopped expecting to be listened to.',
    tell: 'Points to the discrepancy in the actual registry rather than describing it. Show, don\'t tell, is her instinct.',
    subtext: 'She will cooperate immediately if the player can show her authority to act on the information. She has been waiting for someone with standing to use it.'
  },

  cala_ledgermere: {
    name: 'Cala Ledgermere',
    faction: 'Union (Innkeeper, Guildheart Hub)',
    locality: 'Guildheart Hub',
    stage_first_appears: 2,
    agenda: 'Maintain her inn\'s guild standing, which depends on discretion about trade arbiter guests. She is not complicit — she simply keeps records of what she is paid to record.',
    register: 'Hospitality register: asks what you need before you say why you are there. Refers to guests by room number until trust is established.',
    tell: 'Wipes the counter when she is deciding whether to answer something.',
    subtext: 'The booking records exist. She will share them if the player can frame the request as a formal inquiry rather than personal nosiness.'
  },

  jorin_ledgermere: {
    name: 'Jorin Ledgermere',
    faction: 'Union (Material Ledger Officer, Craftspire)',
    locality: 'Craftspire',
    stage_first_appears: 2,
    agenda: 'Maintain an accurate material ledger. The specialty chemical input discrepancies have been actively preventing him from doing his job, which is the lens through which he understands the entire problem.',
    register: 'Ledger-precise. Traces everything backward to source. Gets animated talking about documentation chains in a way that catches people off guard.',
    tell: 'Can walk you through the entire supply chain discrepancy from memory. Has done it before, hoping someone would listen.',
    subtext: 'He does not know what the compounds are for. He knows where they came from and that the paperwork is wrong, and to him that is sufficient reason to act.'
  }

};
