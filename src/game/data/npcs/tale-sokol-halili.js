// ===========================================================================
// NPCs new to "The Death of Halili" (Deka e Halilit) — see ../npcs/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// Sokol Halili himself is NOT duplicated here — he already has a registry
// entry, `sokolHalili`, defined in ../npcs/tale-arnaut-osmani.js, whose own
// comment invites exactly this reuse ("any future song that needs him again
// should link to `sokolHalili` … rather than duplicate him"). Mujo is NOT
// duplicated either — he is the core NPC `mujo` in core-world.js. The three
// hundred Agas of Jutbina and the zana sisterhood sworn to Mujo are NOT
// duplicated a third time — they are `treqindAgallaret` and `zanatBesatare`,
// both already defined in ../npcs/tale-mujo-avenges-halil.js (the same camp,
// the same standing oath, called on again).
//
// NOTE ON THE NAME "ARNAUT OSMANI": this song's own treacherous Aga shares
// his popular name with the loyal hero of a wholly different song
// ("Arnaut Osmani," Palaj–Kurti no. 13, already told in full in
// tale-arnaut-osmani.js). The epic reuses this name for more than one man
// exactly as it does "Zuku" and "Krajl" — see that tale's own npc file for
// the precedent. Rather than deepen an existing key collision (`halili` is
// already independently defined in both tale-mujo-avenges-halil.js and
// tale-halil-marriage.js), THIS Osmani gets his own distinct registry key,
// `osmaniZilise`, with the collision spelled out in his backstory below.
// ===========================================================================

export default {
  zadraniTetoves: {
    name: 'Zadrani i Tetovës', glyph: '🎯', kind: 'human',
    role: 'the warrior of Tetova who kills Halili — and is killed by Mujo in turn',
    backstory:
      'A warrior of Tetova across the frontier, armed with a rifle that strikes true however crookedly it is aimed. He meets Halili already blood-spattered in the Green Valleys, avenging two cousins Halili killed there that same day; he kills him with a single warning shot, then lays the body out in the shade with real tenderness and grief, dreading what Mujo will do to him. When Mujo comes for him in turn the same rifle cannot finish the job — the two grapple three days and nights before a poisoned dagger, named to Mujo by the zana sisterhood, finally kills him. Cutting the body open afterward, Mujo finds three serpents coiled in his belly, one still awake: the hidden source of a strength that let him survive the very shot that killed Halili outright. Not a Krajl and not tied to any other named enemy elsewhere in the cycle — a lone warrior, his tribe and his slain cousins named only in passing, met once in this one song.',
    folklore: ['sokol-halili'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'sokol-halili': 'zadrani' },
  },
  osmaniZilise: {
    name: 'Arnaut Osmani (i Lugjeve)', glyph: '😠', kind: 'human',
    role: "the Aga whose private grudge against Mujo starts the whole tragedy",
    backstory:
      'One of the three hundred Agas camped with Mujo and Halili at Kunora, and the only one of them the song says held a grudge against Mujo. The moment Mujo slips off alone to scout the high pastures, this Osmani wakes the sleeping Halili with a kick and a lie — that the shkja have already killed Mujo in the Green Valleys — and sends him racing off to his death; when Mujo returns, he tells him the same lie in reverse, sending the second brother after the first. The song never explains the grudge, only that it exists, and that one lie costs the frontier its second pillar. NOT `arnautOsmani`, the loyal Aga of the coals-and-corpse song ("Arnaut Osmani," Palaj–Kurti no. 13, tale-arnaut-osmani.js), who endures nine years in chains rather than let his companions share the blame — the epic hands this popular name to more than one man across its songs, exactly as it does with Zuku and with every Krajl; this is a different Osmani, known here only for the lie he tells twice.',
    folklore: ['sokol-halili'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'sokol-halili': 'osmani' },
  },
}
