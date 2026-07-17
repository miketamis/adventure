// NPCs for the tale "Aga Ymer of Ulcinj — the returning husband" — see
// ../npcs/_SCHEMA.md for the format contract. Owned by this tale only.

export default {
  // agaYmer — Aga Ymeri of Ulcinj — is the canonical core-village.js entry
  // (a real staged node, agaYmer1); this tale reuses it by the cast npc link.
  nusjaYmerit: {
    name: 'nusja e Ymerit', glyph: '👰', kind: 'human',
    role: 'Aga Ymer\'s bride — waited exactly as long as she swore to',
    backstory: 'Married to Aga Ymer for one single night before he was called to war, she was talked up from an offer of nine days to a sworn nine years and nine days, with an honest clause: past that day, she was free to think him dead and marry again. She held to it to the very edge of the term, and knew her true husband the instant he bared the scar his own mother had once described to her.',
    folklore: ['aga-ymer'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { 'aga-ymer': 'bride' },
  },
  nenaYmerit: {
    name: 'nëna e Ymerit', glyph: '👵', kind: 'human',
    role: 'Aga Ymer\'s mother, who did not know her own son at the fountain',
    backstory: 'Kept the household at Ulqin through nine years without her son. Meeting a long-haired stranger at her own roadside spring, she asked after her boy and was told, by her own boy, that he had died three weeks before — and wept for him without ever learning otherwise on the page.',
    folklore: ['aga-ymer'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { 'aga-ymer': 'mother' },
  },
  mbretiHuaj: {
    name: 'mbreti i huaj', glyph: '👑', kind: 'human',
    role: 'the foreign king who held Aga Ymer captive nine years',
    backstory: 'Held Aga Ymer for a ransom his own Sultan never paid, and would have beheaded his own daughter for freeing him on nothing but a word of honour — until that word walked back through his gate on its own, at which he freed his prisoner outright, astonished a man would trade freedom for a kept promise. Unnamed in every telling; the ballad\'s "Spanja e zezë" — Black Spain — is a formulaic far-off captor-realm, not the real Iberian kingdom.',
    folklore: ['aga-ymer'],
    location: { status: 'planning', plan: 'the offstage foreign court ("captivity") — never mapped, exactly like three-friends\' kingsRealms or ali-pashe-tepelena\'s europeOffstage' },
    tales: { 'aga-ymer': 'king' },
  },
  bijaMbretitHuaj: {
    name: 'bija e mbretit', glyph: '🌙', kind: 'human',
    role: 'the foreign king\'s daughter — freed her father\'s prisoner on his word alone',
    backstory: 'Noticed the captive Aga Ymer first for his good cheer, then for its collapse into silence as his promised day drew near; drew his dream out of him, set his own sworn word as her price when he could not pay the ransom, and freed him on nothing else. Her father nearly beheaded her for it before Aga Ymer rode back through the gate exactly as he had sworn.',
    folklore: ['aga-ymer'],
    location: { status: 'planning', plan: 'the offstage foreign court ("captivity")' },
    tales: { 'aga-ymer': 'daughter' },
  },
  pashaVeliu: {
    name: 'Pashë Veli', glyph: '🤵', kind: 'human',
    role: 'the new match riding for Aga Ymer\'s bride when he reaches his own door',
    backstory: 'Already sending his wedding party to collect Aga Ymer\'s wife when the disguised Aga Ymer intercepts them on the road and, then, reveals himself. Left waiting for a bride who never arrives. Elsie\'s prose names him "Pasha Veli"; the sung ballad instead calls the same role "Ali Pashë" / "Ali Beu" — two names collected for the one figure across two independent tellings (see the tale\'s discrepancies).',
    folklore: ['aga-ymer'],
    location: { status: 'planning', plan: 'the proposed Ulqin household (nearest spot today: kalaRozafa)' },
    tales: { 'aga-ymer': 'groom' },
  },
  shoketYmerit: {
    name: 'shokët e Ymerit', glyph: '⚔️', kind: 'collective',
    role: 'Aga Ymer\'s war-companions, taken captive alongside him',
    backstory: 'Fought the same war and shared the same captivity as Aga Ymer; grieved when he alone was freed on his word, and were freed themselves only when he kept that word and returned to a king now willing to let all of them go.',
    folklore: ['aga-ymer'],
    location: { status: 'planning', plan: 'the offstage foreign court ("captivity"), alongside Aga Ymer throughout' },
    tales: { 'aga-ymer': 'companions' },
  },
  krushqitDasmes: {
    name: 'krushqit e dasmës', glyph: '🎉', kind: 'collective',
    role: 'Pashë Veli\'s wedding party, riding to collect the bride',
    backstory: 'Pashë Veli\'s escort, sent to fetch Aga Ymer\'s wife for a wedding that never happens; meet a disguised stranger on the road who claims Aga Ymer dead, and are left to carry that news — then its reversal — back home.',
    folklore: ['aga-ymer'],
    location: { status: 'planning', plan: 'the proposed Ulqin household and its road (nearest spot today: kalaRozafa)' },
    tales: { 'aga-ymer': 'weddingParty' },
  },
}
