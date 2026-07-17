// NPCs: the legend of Princess Argjiro of Gjirokastër (argjiro-gjirokastra)
// — see ../npcs/_SCHEMA.md for the format contract. One file per area/tale
// so parallel agents never collide.

export default {
  // ── the legend's own figures ───────────────────────────────────────────
  argjiro: {
    name: 'Princesha Argjiro', glyph: '🏰', kind: 'human',
    role: "the noblewoman who leapt from Gjirokastër's walls rather than be taken",
    backstory:
      'Tradition in Gjirokastër holds she ruled the city in the fourteenth century, married to its own prince; the leap that made her name is remembered the same way in every telling — when the Turks took the castle by treachery rather than by force, she climbed its highest tower and jumped with her infant son rather than fall alive into their hands. One source close to the FOLKLORE card\'s own citation (the Gjirokastra Conservation and Development Organization\'s own history) instead calls her the city lord\'s SISTER, not his wife — both readings circulate, and neither is treated as more canon than the other here. Historians agree on one thing only: the city cannot truly be named for her, since "Gjirokastër"/"Argyrokastro" is on record from Byzantine times, well before any Ottoman siege — the naming is legend, not history. NOT Rozafa (a northern castle, walled in alive by her own kin\'s besa) and NOT E Bukura e Dheut (a mythic bride won and re-won) — Argjiro is a human noblewoman of a real, still-standing southern castle, and her death is final and her own choice.',
    folklore: ['argjiro-gjirokastra'],
    location: { status: 'planning', plan: "the offstage Kalaja e Gjirokastrës — no node exists yet for the Drino valley this far south of Mount Tomorr/Shpirag; see the tale's own castle place note for why" },
    tales: { 'argjiro-gjirokastra': 'argjiro' },
  },
  djaliArgjiro: {
    name: 'djali i Argjiros', glyph: '👶', kind: 'human',
    role: "the infant son carried in his mother's arms off the tower — and the only one who lived",
    backstory:
      'Unnamed in every telling. His mother carried him down the tower stair on what the legend insists was the very first outing she had ever made with him, and off the wall with him rather than let the Turks take him. She was broken on the rock below; he was not — the stone itself is said to have begun weeping milk to keep him alive. No telling records what became of him afterward; the legend ends at the rock.',
    folklore: ['argjiro-gjirokastra'],
    location: { status: 'planning', plan: 'carried by Argjiro throughout; left at the foot of the offstage castle, on the milk-stone, after her death' },
    tales: { 'argjiro-gjirokastra': 'infant' },
  },
  turqitRrethues: {
    name: 'turqit rrethues', glyph: '⚔️', kind: 'collective',
    role: 'the Ottoman besiegers of Gjirokastër',
    backstory:
      "The force that closed around Gjirokastër's castle and could not take it by the wall — only by an unnamed traitor's treachery from within, opening by stealth what siege engines could not open by force. No teller names the traitor; the army itself is the only lasting shape this episode gives its conquerors. NOT the rival kings of the three-friends tale (a wholly different southern legend's coveting royalty) and NOT the Baloz (a single sea-champion, not a besieging host) — this is Gjirokastër's own, specific Ottoman siege, and it succeeds only through betrayal, never through battle.",
    folklore: ['argjiro-gjirokastra'],
    location: { status: 'planning', plan: 'musters offstage beyond the Drino valley, then camps at the offstage castle for the siege' },
    tales: { 'argjiro-gjirokastra': 'turqit' },
  },
}
