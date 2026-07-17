# Maro Përhitura — the four-act flagship arc (the xhind rebuild)

**Why this exists:** the old xhind encounter (`xhind1`/`xhindFund`/`xhindKeq` off the
dry well) was a placeless rule-quiz — teleported to an unowned "prag", stated the
water-taboo, offered obey/violate with instant endings. Retired by this arc.
The corpus's own xhindet tale — «Maro Përhitura», Pralla popullore shqiptare
(Tiranë 1954, pp. 100–110; extract: `docs/references/pralla-1954-maro-perhitura.sq.txt`)
— stages them at the NIGHT MILL, and the game already has the mill. Tale file:
`src/game/data/tales/maro-perhitura.js` (47th tale, full four-act beats).

**Ambition:** the best folktale yet — ALL FOUR ACTS PLAYED, using every mechanic:
embodiment, day/night as engine (nightfall send-off, cockcrow rescue, midnight
deadline), hearts (limb-twisting), lek (gilding, the 100-lira bribe as lore),
items, NPC schedules (miller flees at dusk; the xhindet's night walk ends at the
mill), the krushqit reuse, the sheruesi tie-in, and the litany as a
language-learning set piece (the player holds the spirits at bay by SPEAKING
Albanian at length).

## Stance & entry (rules 12/16)

- `stance: 'embodied'`, `as: 'maro'`, `become: 'maro-perhitura'` on a DECLARATION.
- The stepmother's house (`maroShtepi`, new node + drawn spot at the village edge
  near fshatiJeta) is visitable un-embodied: by day the njerka and her two
  dressed-up daughters idle; the drudge-daughter is conspicuously absent (at the
  heavy work). Talk delivers Act I as prologue (father dead, the rags, the moldy
  bread, suitors ask only for her — `learn:` beats).
- At DUSK the njerka stands at the door with a loaded grain sack her own girls
  refuse (the dark, the mill, the xhindet). She calls into the dusk: «Maro! ku
  je? merr drithin!» — the declaration option is answering to the name:
  «thuaj: unë jam Maro». Verbatim Q() for the send-off taunt: «mos u trëmb, se
  s' të ha as kukudhi» (kukudh already in DICT/folklore!). Grant: `drithe`;
  interactive «merr furkën» (rule 18) grants `furke` (with the three shtullungë
  of flax). Unconditional walk-on option stays beside the declaration.

## Act II — the mill night (the xhind encounter proper)

- Night walk down to the mill (real edges, arrival lines). `mulli1` fixes:
  the old miller currently SITS AT THE DOOR at night listening — contradicts the
  tale. New truth: at dusk he packs and hurries out (rule 11 wind-down +
  fear line: the door stands open all night, the ground flour left, and nobody
  steals — nga frika e xhindëve). Miller becomes a walking NPC (day mill /
  night home). The xhindet's route gains the mill as its night gathering point.
- `maroMulli1` (co-located on the mill): the open door, the dark, the miller's
  kandil. Touchable props: «ndez kandilin», «lësho mullirin» (the stone starts on
  your grain), «tirr lin» → the xhindet come (shrieking and singing — loud, not
  inert). Their first ask, VERBATIM: «ç' është kjo, që tjerr?»
- **The litany loop** (3 asks, as in the tale — the flax, the distaff, the flour):
  each round the choice is
  - SPEAK the litany («thuaj: e mbjellim, e korrim…» — option IS the action;
    result Q()s the tale's own endless chain verbatim; the scene grounds the
    verbs as Maro's remembered field-work). The xhindet listen open-mouthed and
    lay gold on you.
  - ANSWER RUDELY (Lilo's verbatim words: «li është, nuk e shini?») → hearts:-1,
    a limb twisted; the asks continue.
- Outcomes at cockcrow (`became('dawn')`, verbatim «këndoi kokoshi, iknë
  xhinërit»): pure litany → GILDED head to toe (big lek + `flori`) → Act III.
  Any twist → bad endings: one-twist-then-silence = «Dora e Shtrembër» (the
  crooked hand — you live marked; the sheruesi can straighten you, for lek);
  rude to the end = «Shtrembëruar» (head turned backwards; the millers cart you
  home at dawn on a horse). Divergence note: the player's rude night IS Lilo's
  night, lived in her stead.
- Dawn return (gilded path): the DOG barks the news (verbatim Q: «vjen Maro
  Përhitura veshur në flori»), the njerka nearly bursts, sweet-talks the how out
  of you, sends Lilo that evening — next day the millers carry her home twisted
  (the tale's own second night, told as world-event; doctors and priests barely
  straighten her part-way).

## Act III — the aunt, the coach, the shoe

- News: a prince at the city inn (han = the existing `bujtina`) feasts nightly
  seeking a bride — he dreamed a nameless girl, took her measure in the dream,
  had shoes made. The sisters and njerka primp and go; they mock you.
- `maroTetua` (the aunt's house, new spot near the homes): the tetua is a
  magjistare — two mice become horses, four grasshoppers coachmen, a great
  pumpkin the coach, golden clothes. THE WARNING: away by half past eleven; at
  midnight all reverts.
- The feast at the bujtina: the shoe fits only you. The prince begs — VERBATIM
  Q(): «aman rri edhe një çikë». The choice: «ik para mesnate» (tale-true; the
  riders see the coach vanish at midnight and mark the aunt's house, then trail
  the ragged girl home) vs «rri edhe pak» (the reversion catches you — seen in
  rags, followed home directly). Either way the house is marked; the wedding
  procession (reuse the krushqit NPC) comes for you — the shoes and clothes fit:
  «ti je gruaja ime». The wedding is a TRIUMPHANT MID-ARC SCENE, not an ending.

## Act IV — the needle and the bird (the second life)

- The birth of your son at the palace (palace scenes co-located; anchor decision
  at build time — offstage-mirror staged at the map's far edge past the city).
  The njerka arrives with the (bribed) mamija. The vigilance choice, a documented
  divergence: «mos e lër njerkën brenda» → averts the needle → shorter good
  ending «Princesha» (you knew her; the tale's readers always shouted this).
- Tale-true (trusting) path: the needle in your head — YOU BECOME THE BIRD.
  Played bird scenes: the window («ciu ciu, djal' i mëmës» — verbatim, your only
  words now), shot at by the hunters the njerka demands (she calls you a hije),
  flight to the wilderness, the return to the garden, the day the prince walks
  unarmed — land on his hands; he strokes your head, pricks his hand, PULLS THE
  NEEDLE → restoration in his arms. The reckoning (the four buried alive) is
  dealt as the prince's justice in the ending text, tale-faithful.
- Final good ending «Sot e gjithë ditën» — the full tale, the closing formula.

## Endings (4): «Dora e Shtrembër» (bad), «Shtrembëruar» (bad),
«Princesha» (good, vigilant divergence), «Sot e gjithë ditën» (good, full tale).
All release embodiment; blurbs recap ONLY played events (standard #15).

## Retirements & rewires

- DELETE `xhind1`/`xhindFund`/`xhindKeq` (+ their confusers, nodePositions rows,
  folklore ENDING_LORE rows → replaced by the new endings). `pusiThate` drops the
  «prit natën»/«kerko Xhindët» options; keeps «thonë: natën Xhindët rrinë këtu»
  (true — the route's mouth) and gains ONE in-world pointer (the day plaka:
  «natën xhinërit shkojnë te mulliri») so the encounter is discoverable.
- `mulli1`: night lines rewritten (empty open mill, the left flour, the fear);
  miller day-gated + dusk wind-down; miller → walking NPC.
- xhindet npcs.js route: night walk now well → square → MILL (gathering) → back.

## New DICT (freqrank-check each): njerke, li, furke, tjerr, drithe, flori,
enderr, princ, kungull, karroce, gjilpere, kandil(?), mesnate(?) + proper nouns
maro, lilo, lena (+ mini-defs). Existing reused: kukudh, gjel, zog (enAll →
'chick/bird'), mi, motra, nuse, dasme, ar, miell, mulli, thes?, kendo.

## Build stages (each additive, render-tested, audits green before the next):
A. Household + declaration + mill night + the two bad endings + dawn return.
B. Act III through the wedding scene.
C. Act IV + the two good endings + play block in the tale file + full walkthrough.
