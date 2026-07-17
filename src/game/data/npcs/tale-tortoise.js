// NPCs: the tortoise legend (tortoise) cast — see ../npcs/_SCHEMA.md for the
// format contract. One file per area/tale so parallel agents never collide.
// The curser is the REUSED registry figure zoti (Zoti/Perëndia of the
// creation-wolf myth-notes, linked from the tale file's cast); only the
// legend's own figures live here.

export default {
  // ── Why the Tortoise Carries her House (tortoise) — the legend's figures ──
  plakaBreshka: {
    name: 'plaka breshkë', glyph: '🐢', kind: 'mythic',
    role: 'the inhospitable old wife — the first tortoise, her pot for a shell',
    backstory: 'She kept a whole vegsh of meat simmering for herself and set her hungry guest bread and salt — the code\'s letter with its heart cut out. The hungry man\'s cry carried the case to heaven, and the curse fused the pot to her back: she ate her last supper, stiffened at her own hearth, and has crawled ever since, the house she would not share hers to carry forever, her guilt traced on the shell for every child to read. The bridge elder\'s riddle is her («Kam samar, po s\'jam gomar»), and a Tirana variant adds why every tortoise still pulls in at a footstep: the morning shame. NOT the crossroads crone (plakaUdhekryqit), NOT the forest\'s cold old woman (plakaPyllit), NOT the gate-keeper of Aga Ymer\'s kulla (plaka) — this one broke bread\'s law and wears the sentence.',
    folklore: ['tortoise', 'hospitality'],
    location: { status: 'placed', node: 'breshka1' },
    tales: { tortoise: 'plaka' },
  },
  mikuUritur: {
    name: 'miku i uritur', glyph: '🚶', kind: 'human',
    role: 'the hungry traveller-guest the code was broken on',
    backstory: 'He came off the evening road to the one hearth in the tale that failed him: bread and salt on the table, the meat kept back at the fire. He blessed the little he was given — but his eye stayed caught on the pot, and his cry («this was never the Albanians\' way!») brought the curse down on the house. Some tellings say he was God in a beggar\'s shape; this registry keeps him mortal and keeps the Lord (zoti) in heaven, as the numbered telling has it. NOT the foreign traveller of the world-below inn (the udhetariHuaj living-quarter scene) — this one walks the living roads above.',
    folklore: ['tortoise', 'hospitality'],
    location: { status: 'placed', node: 'breshka1' },
    tales: { tortoise: 'miku' },
  },
}
