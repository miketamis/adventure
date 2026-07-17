// NPCs new to "Ali Bajraktari or the Word of Honour" — see ../npcs/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it. Mujo, Halili and their own mother are NOT
// duplicated here — Mujo is the core NPC `mujo` in core-world.js; Halili is
// `halili`, defined in ../npcs/tale-halil-marriage.js; their mother is
// `nenaMujit`, defined in ../npcs/tale-mujo-strength.js — all three reused
// here by npc id, exactly as bukuraDheut is reused across tales.
// ===========================================================================

export default {
  ali: {
    name: 'Ali Bajraktari', glyph: '🚩', kind: 'human',
    role: 'standard-bearer of a lone frontier kulla — a besa kept twice, at the cost of everything each time',
    backstory:
      'A widow\'s only son, raised on begging and rags until God gives him flocks and land at twelve. This is HIS signature song — married, then shut behind his own barred door for three years out of fear of raiders, until a hunting king catches him asleep at a mountain spring and jails him for good. He wins six days\' leave on his own sworn word alone, wins his bride back from Jutbina in a beggar\'s rags, and then keeps his word a second time by riding straight back to the very prison he had just escaped. "Bajraktar" is an epic TITLE — standard-bearer of a clan\'s own banner — not a personal name: NOT Zuku Bajraktar (a different frontier hero who holds the same title in his own song, met at rusha1/rushaFund), and NOT any Bajraktar named only in passing in Fishta\'s own verse. This Ali is his own man, his own song.',
    folklore: ['ali-bajraktari', 'kreshnik-epic', 'besa'],
    location: { status: 'planning', plan: 'his own kulla on the frontier, within the wider Jutbina krahina (proposed "home", off the jutbina hub); later the king\'s own realm (proposed "mbretnia") and Jutbina itself' },
    tales: { 'ali-bajraktari': 'ali' },
  },
  nenaAliut: {
    name: 'nëna e Aliut', glyph: '👵', kind: 'human',
    role: 'Ali\'s own widowed mother, who raised him begging door to door',
    backstory:
      'Raised Ali alone on nothing, begging bread at other people\'s doors and dressing him in rags off the bushes. Swears him the besa he demands before he\'ll ride out — the door opened for no one but her son — and dies sometime during the three years he is held prisoner. The bride\'s own last letter never mentions it; Ali only reveals the death himself, weeks later, when the king presses him over his own scream in the dungeon. NOT nenaMujit (Mujo and Halili\'s own mother, who greets the disguised Ali warmly at Jutbina later in the same song) — two different aged mothers, one dead by the tale\'s second half, one very much alive.',
    folklore: ['ali-bajraktari'],
    location: { status: 'planning', plan: 'Ali\'s own kulla (proposed "home", off jutbina) — dead by the tale\'s second half' },
    tales: { 'ali-bajraktari': 'nena' },
  },
  nusjaAliut: {
    name: 'nusja e Aliut', glyph: '👰', kind: 'human',
    role: 'Ali\'s own bride, unnamed in the song, married at his mother\'s arranging',
    backstory:
      'Fetched home as the finest bride to be found, and left alone behind a barred door for three years. Sees through the king\'s disguised double by his rough voice and pale courser, but is talked into opening anyway; waits three years writing letters before agreeing, in despair, to marry Halili instead — and knows her true husband months later, under a beggar\'s rags, by an old mark on his own brow. NOT E Bukura e Dheut (three-friends\' serial mythic bride) or Tanusha (halil-marriage\'s Krajl\'s daughter) — a mortal frontier bride with her own three-year vow and her own besa kept by waiting.',
    folklore: ['ali-bajraktari'],
    location: { status: 'planning', plan: 'her own family, never staged (proposed "nusesFamilja", offstage) before her marriage; Ali\'s own kulla ("home") through the wait; Jutbina itself once she chooses Halili' },
    tales: { 'ali-bajraktari': 'nusja' },
  },
  krajliAliut: {
    name: 'mbreti gjahtar', glyph: '👑', kind: 'human',
    role: 'the foreign king whose hunting party catches Ali asleep',
    backstory:
      'Stumbles on the sleeping Ali while hunting his own mountains and jails him for good rather than ransom him outright, then sends a disguised double after the bride sooner than let her go free. Relents only when his own daughter stands bail for a prisoner\'s bare word. "Krajl" is an epic TITLE the songs give many different antagonists, not one ruler: NOT Krajlo Kapedani (mujo-courser), NOT the Krajl of New Kotor (halil-marriage, Tanusha\'s father), NOT the Krajl of the Zuku Bajraktar song (rusha1/rushaFund), and NOT the captain of Mujo Avenges Halili (mejdan1/mujoHak1) — a sixth, separate king, with his own hunting grounds, his own dungeon, and his own daughter.',
    folklore: ['ali-bajraktari'],
    location: { status: 'planning', plan: 'his own kingdom across the frontier (proposed "mbretnia", off jutbina)' },
    tales: { 'ali-bajraktari': 'krajl' },
  },
  rojatHungareze: {
    name: 'rojet hungareze', glyph: '⚔️', kind: 'collective',
    role: 'the king\'s own mounted guards',
    backstory:
      'Ride down at the king\'s bare word to bind the sleeping Ali and carry him off to the dungeon; never named or seen again once the deed is done.',
    folklore: ['ali-bajraktari'],
    location: { status: 'planning', plan: 'the king\'s own kingdom (proposed "mbretnia", off jutbina)' },
    tales: { 'ali-bajraktari': 'rojat' },
  },
  shkjaZevendesi: {
    name: 'shkja zëvendësues', glyph: '🎭', kind: 'human',
    role: 'the lookalike dressed in Ali\'s own clothes to steal his bride by trick',
    backstory:
      'Chosen for his likeness to Ali, dressed in his clothes and mounted on his own horse with his own sabre, and sent to talk his way past the bride\'s own barred door. Very nearly succeeds — she almost opens for him twice — but loses his nerve and flees the instant she cries the frontier to arms, his hand still on her. NOT the escort of mujo-courser or the queen of halil-marriage — a nameless, one-scene impostor unique to this song.',
    folklore: ['ali-bajraktari'],
    location: { status: 'planning', plan: 'the king\'s own kingdom (proposed "mbretnia", off jutbina)' },
    tales: { 'ali-bajraktari': 'shkja' },
  },
  vajzaKrajlit: {
    name: 'vajza e mbretit', glyph: '🕊️', kind: 'human',
    role: 'the king\'s own daughter, who stands bail for a prisoner\'s bare word',
    backstory:
      'The only one in her father\'s own hall who trusts a captive\'s sworn besa without collateral — offers to take on Ali\'s whole sentence herself should he fail to return within six days, and so wins him the leave that lets him win his bride back. NOT Tanusha (halil-marriage) or the moat-king\'s princess (three-friends) — staged only once, at the bail, and never elsewhere in the song.',
    folklore: ['ali-bajraktari', 'besa'],
    location: { status: 'planning', plan: 'her father\'s own hall (proposed "mbretnia", off jutbina)' },
    tales: { 'ali-bajraktari': 'vajza' },
  },
}
