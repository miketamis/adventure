// NPCs: Constantine & Doruntine (the besa beyond death) — see ../npcs/_SCHEMA.md.
// Kostandini himself is a CORE figure (core-village.js, already placed at
// kostandin1 and already telling a condensed version of this exact legend in
// content.js) — linked from the tale's cast, not duplicated here. This file
// holds only the figures unique to the fuller ballad: his mother, his sister,
// his eight brothers (collective, unnamed in every telling), and the never-seen
// foreign husband whose letter starts the whole story.

export default {
  nenaKostandinit: {
    name: 'nëna e Kostandinit', glyph: '🕯️', kind: 'human',
    role: 'the grieving mother whose curse woke her son from the grave',
    backstory: 'Widowed, with nine sons and one daughter, she watched her only daughter married off to a foreign village against her own heart, and then lost all nine sons to the same year of war. Standing at Kostandini\'s grave, unable to bear her own longing any longer, she cried out the curse that pulled him from the earth to keep the besa he had sworn her. NOT the crossroads crone or the forest\'s cold old woman — she keeps to this one grave, and this one grief.',
    folklore: ['constantine-doruntine', 'besa'],
    location: { status: 'placed', node: 'kostandin1' },
    tales: { 'constantine-doruntine': 'nena' },
  },
  doruntina: {
    name: 'Doruntina', glyph: '💃', kind: 'human',
    role: 'the sister carried home by her dead brother, one night only',
    backstory: 'The only daughter among nine brothers, married off across seven mountain ranges while still a girl. When Kostandini rose from his grave to keep his besa, she rode home behind him through the night without knowing her brother was dead — and reached her mother\'s door only for the truth to break both their hearts at once. Called Dhoqina in the Chameria ballad Elsie translated (also Garantina or Fjoruntina in other regional tellings, per Elsie\'s own headnote) — the game keeps the name Doruntina throughout, matching the tale\'s id and its existing vocabulary.',
    folklore: ['constantine-doruntine', 'besa'],
    location: { status: 'placed', node: 'kostandin1' },
    tales: { 'constantine-doruntine': 'doruntina' },
  },
  vellezeritKostandinit: {
    name: 'të tetë vëllezërit', glyph: '⚔️', kind: 'collective',
    role: 'Kostandini\'s eight older brothers, who die with him in the same war',
    backstory: 'Eight brothers besides Kostandini, every one of them called a hero in his own right. They balked at marrying their one sister off to a foreign land, but were overruled by their own youngest brother\'s besa, and marched to war together with him — all nine falling within the same year. No telling of the legend names any of the eight; only Kostandini keeps a story of his own.',
    folklore: ['constantine-doruntine'],
    location: { status: 'planning', plan: 'never separately staged — they exist only alongside Kostandini, at home and then at the war, and do not return' },
    tales: { 'constantine-doruntine': 'vellezerit' },
  },
  dhenderriHuaj: {
    name: 'dhëndri i huaj', glyph: '✉️', kind: 'human',
    role: 'the foreign husband whose marriage-letter starts the whole ballad',
    backstory: 'A suitor from a distant country who sends the written proposal for Doruntina\'s hand that sets the whole legend moving. Never named or seen again in any telling of the story — he exists only as the far-off reason she is away from home when the wars and the curse come. His country lies seven days\' journey, seven mountain ranges, from Kostandini\'s village, and is never itself part of the story.',
    folklore: ['constantine-doruntine'],
    location: { status: 'planning', plan: 'somewhere across the seven mountain ranges — never staged, like the tale\'s other offstage lands' },
    tales: { 'constantine-doruntine': 'princi' },
  },
}
