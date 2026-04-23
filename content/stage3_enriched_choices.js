const STAGE3_ENRICHED_CHOICES = [
  // ============================================================================
  // INSTITUTIONAL INVESTIGATION & INFILTRATION (20 choices)
  // ============================================================================
  {
    label: "Infiltrate the Archive of Records. The city keeps secrets in vaults below the courthouse. You know there's a night clerk who drinks too much.",
    tags: ['Institutional', 'Investigation', 'Infiltration', 'Risky'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('courtArchiveAccess');
        G.lastResult = "You slip past the drowsy clerk and find ledgers documenting systematic tax evasion by the merchant council. Names, amounts, dates—everything."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "Guards catch you red-handed. You escape, but the archive is now under increased scrutiny. Someone knows you were there."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.discoveries.push('partialArchiveAccess');
        G.lastResult = "You access the records but only glimpse surface-level documents. Enough to know there's much deeper corruption, but not enough to prove it yet."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You're forced to flee before finding anything useful. The clerk alerts his supervisor. The archives are now locked down."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Bribe your way into the Temple's Tithes Office. The clergy claims poverty while holding land across three counties. Someone in their accounting department knows the truth.",
    tags: ['Institutional', 'Investigation', 'Manipulation', 'Risky'],
    xpReward: 76,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('templeAccountant');
        G.discoveries.push('templeWealth');
        G.lastResult = "The accountant becomes your informant. She's tired of hiding the truth. The Church owns seventeen properties with annual income exceeding the Crown's tax revenue."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.omens++;
        G.lastResult = "The accountant reports you to the High Priest. They know what you were after. Religious authority issues a public denunciation of your 'heretical intrusions.'"; 
      }
      else if(r.total >= 13) { 
        G.stageProgress[3]++; 
        G.contacts.push('reticientClerk');
        G.lastResult = "You establish contact but the clerk is cautious. They'll talk, but only in shadows, and only about specific questions you ask. Nothing volunteered."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your bribe is refused. The clerk suspects you're a spy or worse. The temple tightens security on its offices."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Pose as a tax auditor to access the Merchant Council's sealed ledgers. You've forged documents that might fool a distracted official.",
    tags: ['Infiltration', 'Investigation', 'Institutional', 'Corruption'],
    xpReward: 74,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('merchantCouncilLoophole');
        G.lastResult = "Your forgery is flawless and your bearing confident. You spend hours photographing records that show how merchant families systematically laundered pirate profits through 'legitimate' trade routes."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "The real auditor arrives early. Your forgery is detected immediately. The Council's security gives chase. You escape but your face is now known to powerful merchants."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.discoveries.push('merchantPartialLedger');
        G.lastResult = "You access the office but can only photograph pages before someone returns. Enough to glimpse a pattern of unreported income, but not the full scheme."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your documents are questioned immediately. You flee before being detained. The Council now knows someone is searching for their secrets."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Gain access to the Guard Captain's personnel files. Promotions, commendations, and dismissals—the records will reveal who in the Watch answers to whom.",
    tags: ['Institutional', 'Investigation', 'Infiltration'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('watchHierarchy');
        G.lastResult = "The files reveal a network of corruption within the Watch itself. Officers receiving payments from crime syndicates, their careers protected by a chain of command complicit in the scheme."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=3;
        G.lastResult = "A guard catches you mid-burglary. You fight your way out, but now the Watch is actively hunting you. Every officer in the city has your description."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.discoveries.push('watchPartialCorruption');
        G.lastResult = "You find evidence of some corruption but not the full network. At least three officers are taking bribes, but the chain of command above them remains unclear."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You're caught before finding anything substantial. Guards detain you briefly but release you with a warning. They're watching you now."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Blackmail a courthouse clerk into showing you sealed legal proceedings. Trials that were never publicly recorded. Verdicts that benefited the powerful.",
    tags: ['Investigation', 'Manipulation', 'Institutional', 'Risky'],
    xpReward: 77,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('terrorizedClerk');
        G.discoveries.push('sealedTrials');
        G.lastResult = "You discover leverage over the clerk and establish control. They show you trials sealed by judicial order—political enemies of the Council silenced, their convictions hidden from public record."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "The clerk refuses and reports you to their superior. The courts now have your name. A warrant for 'extortion and coercion' is quietly issued."; 
      }
      else if(r.total >= 13) { 
        G.stageProgress[3]++; 
        G.contacts.push('reluctantClerk');
        G.lastResult = "The clerk agrees but demands protection—safe passage out of the city afterward. They provide limited access to sealed records before severing contact."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your blackmail attempt fails. The clerk isn't afraid of your threats. They're protected by forces more powerful than you can imagine."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Infiltrate the University's Restricted Archives. Scholars there have been documenting something—something powerful enough that their research was suppressed.",
    tags: ['Institutional', 'Investigation', 'Infiltration', 'Lore'],
    xpReward: 76,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('suppressedResearch');
        G.lastResult = "You access restricted documents revealing systematic suppression of scholarly work critical of the ruling families. The university itself has become a tool for controlling knowledge and truth."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.omens++;
        G.lastResult = "You're caught by the head archivist. She knows who sent you—or assumes she does. The university's scholars are now locked in dispute about who to trust."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.discoveries.push('partialResearch');
        G.lastResult = "You find fragments of suppressed research. Enough to know that something significant was covered up, but the full truth requires accessing deeper collections."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You're discovered but escape. The archives are now under watch. A scholar sympathetic to your cause leaves you an anonymous note with a name and address."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Pose as a new recruit to infiltrate the Militia's training barracks. Their records and operational orders might reveal plans against the civilian population.",
    tags: ['Infiltration', 'Investigation', 'Institutional', 'Combat'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('militiaDoubt');
        G.discoveries.push('militiaOrders');
        G.lastResult = "You excel in training, earning trust. A disillusioned officer shows you sealed operational orders: contingency plans for martial law, population control protocols, and named targets."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "Your cover collapses during combat training when you hesitate in ways a real recruit wouldn't. You're identified as a spy and barely escape the barracks alive."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.contacts.push('militiaOfficer');
        G.lastResult = "You maintain your cover but can't access restricted materials. However, you make a contact—a junior officer who suspects corruption and wants to talk more privately."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Something about you reads wrong to the drill instructors. You're reassigned to latrine duty and watched constantly. No access to anything useful before you're released."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Steal correspondence between the Lord Mayor and regional governors. Official reports don't match the letters being sent behind closed doors.",
    tags: ['Investigation', 'Infiltration', 'Institutional', 'Risky'],
    xpReward: 78,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('governorLetters');
        G.lastResult = "You access the sealed correspondence. The letters reveal coordination between officials on matters they publicly deny—illegal trade agreements, assassination contracts, and coordinated suppression of dissent."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=2;
        G.lastResult = "You're discovered mid-theft. The Lord Mayor's personal guard chases you through the city. You escape but your face is now known to the highest authority."; 
      }
      else if(r.total >= 13) { 
        G.stageProgress[3]++; 
        G.discoveries.push('partialCorrespondence');
        G.lastResult = "You steal some letters but can't get them all. Enough to see communication is happening, but not complete enough to prove conspiracy—just suspicious."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You're nearly caught. The guards see you but you escape into the crowd. The Lord Mayor increases security on correspondence immediately."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Bribe a harbor master's assistant to access shipping manifests. Some goods never officially enter the city. Where do they go?",
    tags: ['Institutional', 'Investigation', 'Manipulation'],
    xpReward: 74,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('harbourAssistant');
        G.discoveries.push('blackMarketShipping');
        G.lastResult = "The assistant becomes a reliable informant. You discover manifests for shipments of weapons, alchemical substances, and prisoners—all routed through hidden channels to unknown destinations."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival+=2;
        G.lastResult = "The assistant reports your bribe attempt. Harbor security increases dramatically. Anyone attempting to access manifests is now scrutinized immediately."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.contacts.push('cautionsAssistant');
        G.lastResult = "You establish contact but the assistant is nervous. They provide limited information—enough to know something illicit is happening, but not enough detail to act on."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your bribe is refused. The assistant is too well-connected to the harbor authority to risk it. You learn nothing and raise suspicion."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Audit the Moneylender's Guild records to expose predatory lending schemes. The Guild claims transparency but their books are designed to hide exploitation.",
    tags: ['Institutional', 'Investigation', 'Corruption'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('lendingScheme');
        G.lastResult = "Your audit reveals a complex scheme: interest rates hidden in 'administrative fees,' contracts deliberately written to trap borrowers in perpetual debt, and systematic theft of collateral."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "The Guild discovers what you've been doing and moves to suppress you legally. They're powerful and well-connected. A warrant is issued for 'fraudulent auditing and extortion.'"; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.discoveries.push('partialScheme');
        G.lastResult = "You find evidence of impropriety but the books are too carefully obscured. You know corruption exists but can't prove it with concrete numbers."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "The Guild's accountants catch you. They're more careful than you anticipated. You escape but the records are now even more carefully guarded."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Access the Healers' Guild pharmacy records. Restricted herbs and poisons are being diverted—but to whom and for what purpose?",
    tags: ['Investigation', 'Institutional', 'Risky'],
    xpReward: 76,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('pharmacyDiversion');
        G.lastResult = "You discover the pharmacy has been supplying restricted substances to specific individuals—powerful people being kept addicted and dependent on regular doses of custom preparations."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.omens++;
        G.lastResult = "A guild master arrives unexpectedly. You're caught in the pharmacy archive. They let you leave but now they know someone is watching their operation."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.discoveries.push('partialPharmacy');
        G.lastResult = "The records show diversions but are obscured. Someone is definitely receiving substances, but the recipient's identity is hidden behind aliases and intermediaries."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You're interrupted before finding anything conclusive. A healer nearly catches you. The pharmacy is now locked after hours."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Pose as a wealthy patron to attend elite gathering where real power operates beyond official chambers. The decisions that matter happen over wine and secrets.",
    tags: ['Infiltration', 'Investigation', 'Institutional'],
    xpReward: 77,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('eliteNetwork');
        G.contacts.push('disillusionedNoble');
        G.lastResult = "Your disguise is flawless and you blend perfectly. You overhear conversations about manipulating trade wars, blackmailing judges, and coordinating to maintain power. A sympathetic noble even shares names."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival+=2;
        G.lastResult = "Someone recognizes you or suspects your cover. Security is called. You escape but the elite are now aware someone tried to infiltrate their gathering."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.discoveries.push('elitePlots');
        G.lastResult = "Your disguise holds but you're kept at arm's length. You overhear enough to know the elite are coordinating something major, but not enough detail to understand it fully."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your cover is questioned immediately. You excuse yourself before exposure becomes certain. No real intelligence gathered, but you confirm the meeting happens."; 
      }
      maybeStageAdvance();
    }
  },

  // ============================================================================
  // MORAL & ETHICAL DECISION POINTS (15 choices)
  // ============================================================================
  {
    label: "An innocent person is blamed for a crime you know was committed by someone in power. You could expose the truth, but it would expose your methods and burn sources.",
    tags: ['Moral', 'Investigation', 'Consequence'],
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You find a way to reveal the truth that protects your sources. Anonymous evidence reaches the court. The innocent is freed, the guilty remains at large but now watching over their shoulder."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.omens+=2;
        G.lastResult = "You expose the truth but your methods are traced. Your best informant is silenced. The innocent is freed but your operation is now deeply compromised."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You stay silent. The innocent is convicted. You know you could have saved them. The guilt is a weight you'll carry, but your operation survives intact."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.lastResult = "Trying to remain neutral fails. Word of your knowledge reaches both sides. Everyone assumes you know more than you do. Pressure from all directions increases."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A frightened informant wants to withdraw. They've seen too much and fear for their family. If you let them go, you lose crucial information. If you press, they might break.",
    tags: ['Moral', 'Network', 'Consequence'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You convince them to stay, but protect them first. You arrange genuine safety measures—relocation funds, safe houses. They become loyal because you proved you care about them."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "You push too hard. They contact the authorities instead, trying to make a deal. Your operation is exposed. You survive but half your network is compromised."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You let them go quietly. It costs you ground, but you sleep better at night. They thank you. Somewhere, a person who could have hurt innocent people won't have extra leverage."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You can't convince them to stay nor to stay silent. They talk to people on both sides, creating confusion that damages your plans but also protects them through obscurity."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Someone you care about is deeply involved in the corruption. Turn them in, protect them, or try to turn them as a source.",
    tags: ['Moral', 'Investigation', 'Consequence', 'Network'],
    xpReward: 76,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You confront them with evidence. They confess fully and agree to testify in exchange for reduced consequences. Their cooperation cracks open the case, but your relationship is forever changed."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "Your attempt to turn them backfires. They warn the conspiracy. Your relationship ends in betrayal and they become an enemy with intimate knowledge of your operation."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You choose to protect them but pull back from your work temporarily. The guilt eats at you, but you buy time to decide how to proceed without compromising your relationship further."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your indecision costs you. They discover you know and disappear. You don't know if they've fled or if they're reporting you to the conspiracy."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "An institution offers you a bribe to stop your work and falsify your findings. The amount would solve all your immediate problems. No one would ever know.",
    tags: ['Moral', 'Corruption', 'Consequence'],
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You refuse with such conviction that they become unsettled. They offer information instead to 'make peace.' You gain intelligence without compromising yourself."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival++;
        G.lastResult = "You accept. Word spreads. Your reputation is destroyed. Worse, they pressure you to continue covering things up. You're trapped and everyone knows it."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You refuse but negotiate instead. They offer protection for some findings in exchange for silence on others. It's a compromise that lets the work continue in limited ways."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your refusal angers them. They become more aggressive, moving against you before you can move against them. The pressure escalates dangerously."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Evidence suggests a radical group is planning something terrible using intelligence you uncovered. You didn't intend for information to reach them. Do you contact authorities or try to stop them yourself?",
    tags: ['Moral', 'Consequence', 'Investigation', 'Risky'],
    xpReward: 77,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You reach a sympathetic authority figure and work together to prevent the attack without revealing your involvement. The threat is neutralized quietly and your operation remains protected."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.omens+=2;
        G.lastResult = "Whichever you choose, your involvement is discovered. Authorities suspect you're funding the radical group. The group suspects you betrayed them. Everyone wants answers."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You manage to contact the radicals first and convince them your findings don't justify violence. They stand down. You've made a moral choice and gained an unexpected ally."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.lastResult = "Your attempt to intervene fails. The attack happens anyway. You're left haunted by what you could have prevented, and questions are asked about your role."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "You must choose between exposing a conspiracy that will destabilize the entire region or keeping it hidden to prevent chaos. Either choice will cost lives in different ways.",
    tags: ['Moral', 'Exposure', 'Consequence'],
    xpReward: 78,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You find a way to expose the conspiracy gradually, giving institutions time to adapt and reforming gradually. Fewer lives are lost in chaos, and change happens with less violence."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.omens+=2;
        G.lastResult = "Your attempt to manage the exposure fails spectacularly. The conspiracy is exposed in the worst possible way, causing immediate chaos and conflict."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You choose to keep it hidden. Fewer die in the short term, but corruption continues and you bear the weight of that choice forever."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "Your indecision costs you both ways. The conspiracy is partially exposed through other channels. Chaos and instability follow, and you're blamed for it."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "You discover the conspiracy includes people you believe are genuinely good. They got in over their heads, not from malice but from trying to help. Exposing them destroys their lives.",
    tags: ['Moral', 'Exposure', 'Consequence', 'Investigation'],
    xpReward: 76,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You help them exit gracefully and anonymously before exposure. They disappear, rebuilding elsewhere. Justice is served without unnecessary cruelty."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "They discover you know and panic. They become dangerous, doing whatever it takes to protect themselves. Good people become threats."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You confront them privately and offer a path to redemption—testify against the others or face exposure. Most accept. One refuses and you must choose how hard to push."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your moral hesitation becomes apparent. They exploit it, recruiting you or forcing you to make harder choices than you anticipated."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "An informant provides information obtained through torture of a victim. The information is accurate and crucial, but using it means condoning the method.",
    tags: ['Moral', 'Investigation', 'Consequence'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You use the information but immediately work to rescue the victim and hold the torturer accountable. The conspiracy is exposed and so is the brutality used to conceal it."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.omens++;
        G.lastResult = "You refuse to use the information. The victim is abandoned. The informant becomes hostile. Your moral stand costs you both intelligence and allies."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You use the information but document the torture separately. Both the conspiracy and the brutality are eventually exposed. Justice is complicated but comprehensive."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.lastResult = "You're unable to decide immediately. The victim dies before you can act. The guilt haunts you and your hesitation is noted by everyone watching."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "You have evidence that would solve a cold case and bring closure to a grieving family, but it also implicates your main source. Revealing it exposes them.",
    tags: ['Moral', 'Exposure', 'Consequence', 'Network'],
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You reveal the evidence but protect your source by finding alternative explanations or creating reasonable doubt. The family gets closure and your operation continues."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "You expose your source trying to protect the family. The source is discovered. Your operation is compromised and the family still doesn't get full justice."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You choose to protect your source. The family never learns the truth. You carry their disappointment, but the operation continues."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your hesitation is noticed. The family begins pressing you directly. Pressure comes from multiple directions—the family, your source, and everyone else with stakes."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Corruption you've exposed has led to punishment of low-level workers while the architects remain untouched. Your work is being co-opted to appear to address corruption without real change.",
    tags: ['Moral', 'Exposure', 'Consequence', 'Corruption'],
    xpReward: 77,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You publicly expose this co-option and redirect blame to the real architects. The low-level workers are freed and the work regains its original purpose."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You resist too publicly. Authorities move against you, framing you for the corruption you've exposed. You're forced to flee and go underground."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You work quietly to expand your scope to include higher targets. It takes longer but is less risky. The original suspects eventually face real consequences."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.lastResult = "You attempt reform but are outmaneuvered. Your reach remains limited. You're left with the bitter taste of partial justice and full complicity."; 
      }
      maybeStageAdvance();
    }
  },

  // ============================================================================
  // NETWORK BUILDING & INFORMANT INTERACTIONS (15 choices)
  // ============================================================================
  {
    label: "A jaded bureaucrat has access to information but demands payment beyond money—they want you to betray a different contact to prove your loyalty. What do you do?",
    tags: ['Network', 'Moral', 'Manipulation'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('jadedBureaucrat');
        G.lastResult = "You convince them the loyalty test is unnecessary. You offer a sacrifice they'll accept—exposing corruption they already know about, creating the appearance of payment without betraying anyone."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "You refuse and they become hostile. They contact your other sources, warning them you're unstable. Trust throughout your network fractures."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.contacts.push('unreliableBureaucrat');
        G.lastResult = "You agree to provide information on someone, but you feed them false data. They believe you've betrayed someone, but the person is protected by your deception."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "Your negotiations fail. They demand proof of betrayal before sharing information. You're deadlocked and must find another approach."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Two of your most valuable informants are now in conflict with each other over information you've shared with both. You could choose sides, stay neutral, or escalate deliberately.",
    tags: ['Network', 'Manipulation', 'Consequence'],
    xpReward: 76,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You mediate their conflict by revealing they've been given different pieces of the same puzzle. They realize you were playing them against each other strategically. Both respect the move and deepen cooperation."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "Your attempt at mediation is interpreted as manipulation. Both informants turn against you and coordinate to expose your operation."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You choose neutrality and let them resolve it. One survives the conflict stronger and more loyal. The other disappears, but at least you didn't lose both."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You can't manage the situation. Both informants reduce cooperation with you, feeling you've betrayed one of them by existing in this conflict at all."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A former rival offers to become an informant in exchange for protection and a cut of any rewards. They have deep knowledge but are untrustworthy by nature.",
    tags: ['Network', 'Alliance', 'Risky'],
    xpReward: 74,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('formerRival');
        G.lastResult = "You accept and structure the arrangement with safeguards. They prove invaluable, using their rivalry history to access places you couldn't. The rivalry becomes strength."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "You accept but they betray you immediately, using the agreement as cover to infiltrate and sabotage your operation from within."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.contacts.push('unreliableRival');
        G.lastResult = "You accept with extreme caution. They provide some useful information but clearly hold back key details. You gain a source but never fully trust them."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You refuse. They become defensive and begin spreading rumors about you, claiming the rejection was hostile. Your reputation takes a hit."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A powerful noble wants to join your work as a partner, claiming they're equally invested in exposing corruption. Their motivations seem personal, not principled.",
    tags: ['Network', 'Alliance', 'Manipulation', 'Risky'],
    xpReward: 77,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('powerfulAlly');
        G.lastResult = "You accept and use their motivations strategically. They want to take down a rival—you want to expose corruption. You leverage their resources and power while maintaining control of your own direction."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You accept but they take over the work, redirecting it to their personal vendetta. Your operation is corrupted by their politics. You're forced to leave or become complicit."; 
      }
      else if(r.total >= 13) { 
        G.stageProgress[3]++; 
        G.contacts.push('cautionsNoble');
        G.lastResult = "You accept them partially—you accept their resources but keep your work separate. They eventually lose interest when they realize you won't be their tool."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You refuse. They become a competitor, starting their own pursuit and interfering with yours out of spite and ambition."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "An idealistic young person seeks to join your network. They're intelligent and passionate but inexperienced and potentially reckless. Training them takes resources.",
    tags: ['Network', 'Alliance', 'Consequence'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('idealisticRecruit');
        G.lastResult = "You train them carefully. They become a reliable asset and their fresh perspective helps you see patterns you'd missed. The time investment pays off dramatically."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "You recruit them but can't control their recklessness. They take an action without permission that exposes part of your operation and endangers everyone."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.contacts.push('traineeRecruit');
        G.lastResult = "You bring them in cautiously. They learn slowly but prove useful for low-risk tasks. They consume resources but don't sabotage anything."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You refuse. They're hurt but become obsessed with proving themselves. They begin their own pursuit, accidentally interfering with yours."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A network of street informants offers to work for you—kids, beggars, and lower-class workers who see everything. They're unreliable but numerous and everywhere.",
    tags: ['Network', 'Investigation', 'Alliance'],
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('streetNetwork');
        G.discoveries.push('ubiquitousIntelligence');
        G.lastResult = "You establish a robust system of street-level informants. They see movements, hear conversations, and report patterns. Your coverage increases exponentially and institutions can't hide large-scale activities."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "You try to organize them but they're too chaotic and independent. Word spreads that you're recruiting spies. Authorities crack down on street populations to limit information flow."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.contacts.push('partialStreetNetwork');
        G.lastResult = "You establish a network but only a portion proves reliable. About forty percent of their information is useful, sixty percent is rumor or misunderstanding. Still, it's coverage you didn't have."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "They negotiate harder than you anticipated. The cost of maintaining street informants is higher than you can afford. You must choose between fewer informants or budget cuts elsewhere."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A former employee of an institution you've been watching wants to defect fully—move away, testify publicly, do everything. But this is the highest-risk informant scenario.",
    tags: ['Network', 'Alliance', 'Risky', 'Consequence'],
    xpReward: 78,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.contacts.push('fullDefector');
        G.discoveries.push('defectorTestimony');
        G.lastResult = "You orchestrate their defection carefully, creating false trails that make it appear they disappeared naturally. They escape cleanly and later testify under protection. The case becomes ironclad."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=2;
        G.lastResult = "The defection is detected immediately. The institution moves against both of you. The defector is captured before reaching safety. You're blamed for the disaster."; 
      }
      else if(r.total >= 13) { 
        G.stageProgress[3]++; 
        G.contacts.push('partialDefector');
        G.lastResult = "You help them escape but they stay in contact anonymously. They're too afraid to testify publicly, but they provide ongoing intelligence from their new location."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "The defection attempt fails. They're discovered trying to contact you. The institution uses them to trace back to your operation. Both of you are compromised."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "You're offered a choice: recruit a connected informant or recruit an idealistic activist. The informant has access, the activist has commitment. You can't work with both.",
    tags: ['Network', 'Alliance', 'Consequence'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You choose the connected informant but find ways to eventually involve the activist in lower-risk activities. Both are eventually working together, each providing what the other lacks."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "The one you reject becomes hostile. They begin their own pursuit and actively interfere with yours out of spite."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You choose the activist. They lack access initially but their commitment leads them to create opportunities. It takes longer but builds momentum differently."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You can't decide and delay. Both lose interest and look for other opportunities. You've gained neither."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Your network reports that someone is hunting your informants. Sources are being targeted. You must decide who to protect and whether to move operations entirely.",
    tags: ['Network', 'Consequence', 'Risky', 'Pressure'],
    xpReward: 77,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You identify who is hunting your network and feed them false information. They chase ghosts while your real operation relocates and continues. You're now hidden and they've wasted resources."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=2;
        G.lastResult = "Your attempt to protect informants fails catastrophically. Several are discovered and pressured. Your network collapses. You're forced to rebuild from scratch."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You move operations carefully, relocating key informants to safe houses and changing communication methods. Most of your network survives but the disruption costs momentum."; 
      }
      else { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You can't protect everyone. Some informants are captured or exposed. Your network is damaged but not destroyed. You'll need to rebuild trust with survivors."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "An informant is about to be discovered. You could sacrifice them to protect your operation or risk everything trying to save them. There's no middle ground.",
    tags: ['Network', 'Moral', 'Consequence', 'Risky'],
    xpReward: 76,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You find a way to save them that doesn't expose your operation. You arrange their escape using non-obvious methods. Both survive and their loyalty increases immensely."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "Your rescue attempt fails. The informant is captured and you're discovered trying to save them. Both the informant and your operation are compromised."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You sacrifice the informant to protect your operation. It haunts you, but the work continues. Other informants understand it was necessary but trust is permanently damaged."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "Your indecision costs you both. The informant is captured and begins providing information about you under duress. Your operation is partially exposed."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Two rival factions want to use your work for their own purposes. Both offer resources and access. Accepting either means becoming a tool for their agenda.",
    tags: ['Network', 'Alliance', 'Manipulation', 'Risky'],
    xpReward: 77,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You accept resources from both while remaining independent. You tell each faction what they need to hear about helping you. Both remain convinced you're their asset while you control your own destiny."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "Your deception is discovered. Both factions turn against you simultaneously, viewing you as a common enemy. You're caught between them."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You accept one faction's resources while using the threat of the other to maintain leverage. It works temporarily but eventually you'll have to choose a side."; 
      }
      else { 
        G.worldClocks.rival++; 
        G.lastResult = "You refuse both and remain independent. They both become suspicious of what you're doing with other parties. Pressure increases from both directions."; 
      }
      maybeStageAdvance();
    }
  },

  // ============================================================================
  // PRESSURE ESCALATION & CONSEQUENCE (10 choices)
  // ============================================================================
  {
    label: "The conspiracy discovers you've been watching them. They haven't moved overtly yet. Go deeper before they tighten security, or consolidate what you have.",
    tags: ['Pressure', 'Consequence', 'Risky', 'Investigation'],
    xpReward: 76,
    stageProgress: 4,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]+=2; 
        G.lastResult = "You move faster than they expect, accessing crucial information before they can tighten security. You're in and out before they know you were there. The pressure builds but you're ahead."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=2;
        G.lastResult = "They move first. Your base of operations is attacked, your safe houses discovered. You're forced to run and consolidate from hiding. Everything is now more difficult."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You consolidate carefully. The evidence you have is secured and distributed. When the conspiracy strikes, you've already protected what matters most."; 
      }
      else { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You delay too long. They strike before you can act. You lose some evidence and some sources. The operation survives but is severely weakened."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "An assassination attempt on you fails dramatically. The message is clear: you've become a threat worth killing. Everything changes now.",
    tags: ['Pressure', 'Consequence', 'Risky', 'Combat'],
    xpReward: 78,
    stageProgress: 4,
    fn: function() {
      advanceTime(1);
      const r = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.discoveries.push('failedAssassinIdentity');
        G.lastResult = "You not only survive but capture and interrogate the assassin. They provide information about who ordered the hit, revealing connections you didn't know existed. The assassination backfires spectacularly."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=3;
        G.lastResult = "You barely escape with your life. You're injured, traumatized, and hunted. The assassination attempt becomes the least of your problems—the conspiracy is now in open conflict with you."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You survive and escape. The assassination proves the conspiracy is desperate. You know you're close to something important, but you're also marked for death."; 
      }
      else { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival+=2;
        G.lastResult = "You survive but witnesses are killed. The Watch will come looking for you. It becomes unclear if you're the target or a suspect in their deaths."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Your work has triggered institutional crackdowns that harm innocent people. The conspiracy is successfully painting you as the destabilizer. Public opinion turns against you.",
    tags: ['Pressure', 'Consequence', 'Exposure'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You publicly lay out what you've uncovered and show evidence of the conspiracy's guilt. Public opinion swings back. The conspiracy's attempt to use innocents as shields backfires."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.omens++;
        G.lastResult = "Your attempted explanation fails. Conspiracy operatives have better PR. Public sentiment hardens against you. You're now as much a threat as they are to ordinary people."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You accept partial responsibility and redirect blame to the conspiracy simultaneously. It's a careful balance but you regain enough public support to continue quietly."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.lastResult = "You can't manage public opinion. Innocents suffer more crackdowns. You're left with a moral weight and reduced resources as support dries up."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A bounty has been placed on you—dead or alive. Every mercenary, criminal, and desperate person is now a potential enemy. You can't trust anyone.",
    tags: ['Pressure', 'Consequence', 'Risky'],
    xpReward: 77,
    stageProgress: 4,
    fn: function() {
      advanceTime(1);
      const r = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You disappear completely. False trails, hidden identity, network protection—you vanish from public view while continuing your work from the shadows. The bounty becomes irrelevant when they can't find you."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=3;
        G.lastResult = "Bounty hunters track you relentlessly. You're constantly on the run. Everything else becomes secondary to survival. Multiple close calls in quick succession."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You survive but must change your entire operational security. Safe houses are used only once. Communication is sparse and careful. Progress slows but continues."; 
      }
      else { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You're injured in bounty hunter confrontations. You survive but are increasingly compromised. Every day brings new close calls."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A powerful institution has declared you a threat to social stability. They're moving to arrest you for fabricated crimes. You have one night to decide whether to surrender, flee, or go public.",
    tags: ['Pressure', 'Consequence', 'Exposure', 'Risky'],
    xpReward: 79,
    stageProgress: 4,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]+=2; 
        G.lastResult = "You leak your evidence publicly just before they arrest you. The revelation spreads before they can suppress it. The institution's move becomes obviously political. You're arrested but what you uncovered is now public knowledge and unstoppable."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=2;
        G.lastResult = "You flee but you're tracked. You're arrested anyway, this time as a fugitive. Your work is buried while you're detained. Everything is lost."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You surrender but your allies ensure the evidence is protected and released slowly over time. Your arrest becomes a catalyst for wider exposure rather than the end."; 
      }
      else { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You're undecided. They arrest you during your hesitation. You're detained without formal charges, your work frozen."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Multiple groups are now hunting you—the conspiracy, rival factions, authorities, even some innocents you accidentally hurt. The pressure becomes lethal from all directions.",
    tags: ['Pressure', 'Consequence', 'Risky', 'Combat'],
    xpReward: 78,
    stageProgress: 4,
    fn: function() {
      advanceTime(1);
      const r = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You turn the factions against each other, making them fight over you instead of with you. The chaos buys you breathing room. You use it to establish protection through leverage and fear."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=4; 
        G.worldClocks.rival+=3;
        G.lastResult = "The pressure reaches a breaking point. You're cornered, nearly killed multiple times in the same day. You escape barely alive but are completely exhausted and hunted more than ever."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You survive through careful movement and strategy. Each faction is kept at arm's length through different leverage. It's fragile but sustainable for now."; 
      }
      else { 
        G.worldClocks.watchfulness+=3; 
        G.worldClocks.rival+=2;
        G.lastResult = "You survive but barely. You're injured and cornered. Your only option is to find allies quickly or risk being caught between multiple forces simultaneously."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The conspiracy makes a devastating public move—they frame allies of yours for heinous crimes, using evidence you collected. Your evidence is being weaponized against you.",
    tags: ['Pressure', 'Consequence', 'Exposure', 'Moral'],
    xpReward: 76,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You immediately reveal the frame-up with counter-evidence. You expose the conspiracy's manipulation publicly. Your allies are freed and the conspiracy's credibility is destroyed."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.omens+=2;
        G.lastResult = "You can't counter the narrative fast enough. Allies are arrested and convicted. The conspiracy successfully frames you as a manipulator who arranged everything. Your network is destroyed."; 
      }
      else if(r.total >= 11) { 
        G.stageProgress[3]++; 
        G.lastResult = "You expose part of the frame-up but not all. Some allies are freed, others remain in custody. The conspiracy's manipulation is partially revealed but not fully understood."; 
      }
      else { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You delay your response too long. Allies are locked away before you can act. You can only begin dismantling the frame-up after the damage is done."; 
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A critical informant is killed. It's unclear whether the conspiracy did it as punishment or if it was coincidence. Either way, your network is terrified and credibility is questioned.",
    tags: ['Pressure', 'Consequence', 'Network', 'Risky'],
    xpReward: 75,
    stageProgress: 3,
    fn: function() {
      advanceTime(1);
      const r = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if(r.isCrit) { 
        G.stageProgress[3]++; 
        G.lastResult = "You prove it was murder by the conspiracy. The evidence is clear. Your network is angry but united. Everyone sees the threat and redoubles their commitment."; 
      }
      else if(r.isFumble) { 
        G.worldClocks.watchfulness+=2; 
        G.worldClocks.rival++;
        G.lastResult = "You can't determine what happened. Your network fractures. Some think you got the informant killed. Others think you caused it through careless work. The network dissolves."; 
      }
      else if(r.total >= 12) { 
        G.stageProgress[3]++; 
        G.lastResult = "You determine it was likely the conspiracy but can't prove it conclusively. Your network is frightened but doesn't abandon you. Everyone becomes more careful and security-conscious."; 
      }
      else { 
        G.worldClocks.watchfulness++; 
        G.worldClocks.rival++;
        G.lastResult = "The death is mysterious. You lose momentum chasing the circumstances of it. Several informants withdraw out of fear, reducing your capabilities significantly."; 
      }
      maybeStageAdvance();
    }
  }
];
window.STAGE3_ENRICHED_CHOICES = STAGE3_ENRICHED_CHOICES;
