// NPCs new to "Rrëmbimi i së shoqes së Mujit" (Mujo's Wife is Kidnapped) — see
// ../npcs/_SCHEMA.md for the format contract. This file is owned by its tale:
// agents editing other tales must not touch it. Mujo himself is NOT duplicated
// here — he is the core NPC `mujo` in core-world.js, linked from the tale
// file's cast. The game ALREADY STAGES this exact song as the halil1 →
// halilFund/halilKeq branch off Jutbina ("The Krajl took Muji of Jutbina and
// threw him in a tower... so Halili rode alone into the Krajl's land, broke
// into the prison, fought his way through, and carried his brother home") —
// the beats below anchor onto that branch, keyframed in full.
// ===========================================================================

export default {
  // halili — Sokol Halili — is the shared canonical figure in core-kreshnik.js.
  krajli: {
    name: 'Krajle Kapidani', glyph: '👑', kind: 'human',
    role: "the Slav king who burned Mujo's kulla and chained him in his own tower",
    backstory:
      "One of the many Krajls the frontier songs set against Jutbina — \"Kapidani\" names his own boast, not his office. Stung when his own wife praised Mujo above him in everything, he swore by God to gather three hundred landless, kinless men, arm and feed them a hundred days, and raze Mujo's kulla to a stump; he kept the oath, married Mujo's own captured wife in his first wife's place, and later crept alone into the Kingdom to take Mujo himself prisoner with his new bride's help — only for Halili to ride in and take his head in his own garden. NOT the same Krajl who keeps Rusha in her tower (tale-arnaut-osmani.js's own note holds across every frontier song: \"Krajl\" names the standing office of the Slavic royal enemy, not one man — each song's Krajl is his own man).",
    folklore: ['kreshnik-epic'],
    location: { status: 'placed', node: 'halil1' },
    tales: { 'kreshnik-epic': 'krajli' },
  },
  mehreme: {
    name: 'Meremja Turkinë', glyph: '🍶', kind: 'human',
    role: "Mujo's own wife — until she drugged and chained him for a Krajl's crown",
    backstory:
      "Carried off with Mujo's sister and daughter when the Krajl burned his kulla, she was made the Krajl's own wife in his first wife's place — and when Mujo himself rode alone into the Kingdom looking for her, she wept to see him, poured him nine-year raki until he could not wake, and bound him hand and foot for her new husband's boast. She answered the Krajl's own hunting-boast in kind (\"I've caught something bigger\") and paid Mujo back, at the very end, with her life. NOT Ajkuna, Omer's mother and Mujo's wife of the later songs — the frontier cycle keeps no one wife constant across its many singers and centuries; this is Mehreme's only appearance, this song's own telling.",
    folklore: ['kreshnik-epic'],
    location: { status: 'placed', node: 'halil1' },
    tales: { 'kreshnik-epic': 'mehreme' },
  },
  gruaKrajlit: {
    name: "gruaja e parë e krajlit", glyph: '🧹', kind: 'human',
    role: "the Krajl's own first wife — demoted to servant, freed at the end",
    backstory:
      "Praised Mujo above her own husband once too honestly, and paid for it the day the Krajl brought Mehreme home as his new bride: made to wash his feet, carry his water, and hold the firebrand between her teeth at his own table. She keeps her eyes open through all of it — on the tower wall at the very end, she is the one who names Sokol Halili correctly to a suddenly-frightened Mehreme, and welcomes the death she knows is riding in for both her husband and her rival. Mujo takes her for his own when it is over — the one clean thing salvaged from a burned kulla and a broken household. Never named in the song beyond her place at the Krajl's side.",
    folklore: ['kreshnik-epic'],
    location: { status: 'placed', node: 'halil1' },
    tales: { 'kreshnik-epic': 'gruaKrajlit' },
  },
  familjaMujos: {
    name: 'motra e Mujit dhe bija e tij', glyph: '👩‍👧', kind: 'collective',
    role: "Mujo's sister and daughter, carried off in the same raid as Mehreme",
    backstory:
      "Never given a word of their own in the whole song — seized alongside Mehreme when the kulla burned, held in the Krajl's household through the entire captivity, and named once more, together, only at the very end, swept into Mujo's reckoning alongside the wife who betrayed him. The Albanian repeats the identical formula for their seizure (¶3.11/¶5.3) and their end (¶19.2), which is why the beats read the final line as Mujo's own household, not the Krajl's — see the tale file's discrepancies note. The frontier songs are not always kind to the women who never get to speak.",
    folklore: ['kreshnik-epic'],
    location: { status: 'placed', node: 'mujo1' },
    tales: { 'kreshnik-epic': 'familjaMujos' },
  },
  // gjogu — Mujo's oracular courser — is the shared canonical figure in core-kreshnik.js.
  zanat: {
    name: 'zanat probatesha', glyph: '🌕', kind: 'collective',
    role: "the mountain zanas who nursed Mujo his strength — his sworn blood-sisters",
    backstory:
      "Presumed the same zanas who once nursed the boy Mujo three drops of milk at a time and bound him their probatin (blood-kin) at a cliffside cradle — the song Fuqija e Mujit tells it in full, and it is that very oath Mujo calls in on now, chained in a locked room across the frontier: \"I've been captured, sister zanas... take word to Halili.\" They hear his lahutë carry clean over the mountains, and keep the old bargain: whenever he is pressed, they come — even if, this once, it only means waking his brother. A separate registry entry from mujo-strength's own zanatShkembit only because each tale keeps its own file under this schema; nothing here contradicts that earlier telling.",
    folklore: ['kreshnik-epic', 'mujo-strength', 'zana'],
    location: { status: 'placed', node: 'mujiZana1' },
    tales: { 'kreshnik-epic': 'zanat' },
  },
  agët: {
    name: 'tridhjetë agët', glyph: '🧔', kind: 'collective',
    role: "the thirty Agas who try to comfort Mujo with gifts he refuses",
    backstory:
      "Gather at the ruin of Mujo's kulla to offer him a finer tower, a finer wife, a finer throne — everything money and labour can rebuild. Mujo's answer humbles them: none of it buys back his honour. Shamed that they never rode with him in the first place, and now angry at him besides, they go home to Jutbina without him. The same thirty agas — thirty is the standing number of Jutbina's own band across the cycle — who elsewhere ride out at Mujo's own call; here they simply arrive too late, and with the wrong kind of help.",
    folklore: ['kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'kreshnik-epic': 'agët' },
  },
}
