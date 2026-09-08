# Narrative projection audit

This review answers a narrower question than source coverage: **does a source
beat need its own playable moment for the current adaptation to remain causal,
emotionally intelligible and geographically drawable?** A beat is not a defect
merely because the source timeline is longer than the game.

The machine-readable inventory remains
[`_projectionLedger.js`](../src/game/data/tales/_projectionLedger.js): 310
in-span beats without dedicated scenes and 52 proposed places, each with an
individual disposition. This document records the dramatic review behind the
next implementation choices.

Each disposition is also pinned to its own context digest. An omitted-beat
digest covers that beat's title, note, source lines and exact scene/learn/span/
divergence status; a proposed-place digest covers its note, map node, mirror,
mold, proposal and collision record. The audits reject missing, copied, reused
or stale digests, so a generic tale-level rationale cannot hide item drift.

## Decision test

A missing beat earns a scene only when at least one of these is true:

1. **Causality:** without it, a later action or reversal appears unmotivated.
2. **Emotion:** it changes a relationship, grief, loyalty or moral meaning that
   the playable ending otherwise misstates.
3. **Geography:** the player must understand a distinct journey or return route.
4. **Agency:** it contains an action suitable for the current player stance.

Repetition, fixed connective travel, formulaic dialogue, aftermath, actions
outside the chosen point of view and details already carried by an adjacent
scene remain source-timeline lore. Witness adaptations are not automatically
converted into embodied quests.

## Implemented in this review

### Binoshët: feast, council and war

The former `binoshetZambak → binoshetKurora` transition put an exact nine-day
feast, a council, a road and an indefinite months-long war behind one click.
That was chronologically accurate but dramatically opaque. It is now:

`lily restoration → marriage → nine feast-days → council → road to the
ancestral kingdom → campaign opening → mid-campaign return to play → foreign
king enters the final mêlée → Handa wins the crown`.

The nine days are source-exact. The campaign is still described by Schirò only
as «several months»; the game visibly labels its three 30-day tale-months as a
calendar simulation, not a source claim. The interstitial animates days and
nights, exposes the duration of every segment and returns the player to a
scene between the modeled months. No unsupported battle, victory or tactic was
invented.

Primary evidence: [Giuseppe Schirò, *Canti tradizionali ed altri saggi delle
colonie albanesi di Sicilia* (1923), «Binóshæt», pp. 423–425](https://play.google.com/store/books/details?id=Z0UfwPKzZk0C).
The repository also keeps the page-bounded transcription in
[`schiro-1923-binoshet.sq.txt`](references/schiro-1923-binoshet.sq.txt).

### Ajkuna's lament: the actual ending

The old game ending said Ajkuna's heart broke and left her beside Omer's grave.
The selected songs do not end there. The mountain Oras hush her lament, dry her
tears and take her home to Jutbina. `omerFund` now stages that intervention and
maps directly to both `underBeech` and `comforted`. Grief is not softened, but
the tradition's final act of communal/supernatural care is no longer erased.

Primary and parallel evidence: [Palaj–Kurti, «Ajkuna kjan Omerin» (Albanian
PDF)](http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_20.pdf)
and [Elsie–Mathie-Heck, “Ajkuna’s Lament” (English
translation)](http://www.albanianliterature.net/oralverse/verse_09_20.html).
The paired-song transcription is stored in
[`palaj-kurti-vdekja-e-omerit-ajkuna-kjan.sq.txt`](references/palaj-kurti-vdekja-e-omerit-ajkuna-kjan.sq.txt).

## Review of all 310 omitted beats

`Keep` means the omission is appropriate to the projection as it exists.
`Expansion bundle` means the beats should stay documented together if that
tale is later enlarged; it is not a request to add isolated screens or to
inflate the map. Counts are the exact inventory in the projection ledger.

| Tale | Count | Judgment |
|---|---:|---|
| Aga Ymer | 9 | Expansion bundle: the release, homeward ride, recognition road and return journey belong together; `meanwhile` stays connective. The present embodied choice can honestly begin at the besa crux. |
| Ali Bajraktari | 3 | Keep: escape mechanism, recognition and reconciliation frame the already-played second besa. |
| Ali Pashë Tepelena | 1 | Keep: historical legacy is aftermath, not embodied action. |
| Argjiro | 2 | Keep: the debate and naming belief are ending claims with an explicit historical caveat. |
| Arnaut Osmani | 9 | Keep as one ordeal montage: repeating every test would add length without a new decision. |
| Bear and Dervish | 9 | Keep as comic repetition/coda around the cunning-versus-force hinge. |
| Bee, Spider and Cicada | 1 | Keep: devotional household coda. |
| Binoshët | 2 | Keep: gorge and monster-rise are immediate setup inside the staged dragon encounter. Later feast/war compression was separately repaired above. |
| Constantine and Doruntine | 5 | Keep: the player witnesses rather than embodies the dead brother; family loss and omens are sung context. |
| Creation of the Wolf | 2 | Keep: fixed cosmogonic narration offers no player action. |
| Cuckoo | 3 | Keep: transformation details are already carried by setup and ending. |
| Death of Omer | 20 | Keep most martial/connective units in the witnessed song. If expanded, group `chapel`, `lastWords`, `lie`, `confess`, `wouldHaveBegged`, `riseOnce` and `wouldYouRide` as one emotional sequence. The formerly false final outcome is repaired above. |
| Gjakova Cavern | 3 | Keep: corroborating field-report details, not treasure choices. |
| Gjergj Elez Alia | 11 | Expansion bundle: the sibling dialogue, customary greetings, kanun and bequest can deepen the relationship together. Do not turn each formula into a separate choice. |
| Gjeto Basho Mujo | 5 | Keep: fixed Zana response and homeward transition between staged capture and release. |
| Gjizar | 3 | High-value expansion bundle: friendship, instructions and the blind lion's healing establish why the helpers later reciprocate. Build only with the helper-house route described below. |
| Goose Girl | 2 | Keep: repeated night-watch material. |
| Half-Rooster | 9 | Keep: cumulative swallowed-animal and failed-execution repetitions are the same comic mechanism. |
| Halil Garria | 6 | Keep: reunion omens and the homeward/grave threshold are disclosed in ending narration; the embodied choice closes at the tale's decisive recognition. |
| Halil's Marriage | 23 | High-value expansion bundle: vow/courser counsel, Danube tent and disguise, betrayal/capture, message to Mujo, stake-song and homecoming form a causal mini-campaign. The current five-screen witness telling remains honest until the whole bundle is built. |
| Kostandini i Vogël | 9 | Keep as comparative variant lore; the playable road belongs to the separately identified Aga Ymer telling. |
| Kreshnik rescue epic | 3 | Keep: the harsh post-rescue coda is deliberately outside the heroic playable scope and remains visible in the source record. |
| Kuma Lisa | 3 | Keep: repeated trick-names and the fixed escape-hole detail. |
| Prespa | 2 | Keep: courtship/seizure setup; the playable hinge is Nereida's warning. |
| Maro Përhitura | 8 | Expansion bundle: prince's dream, han feast, sisters' report, second night, failed nursing and needle removal belong as one domestic-court sequence. Existing calendar passages already preserve the long waits. |
| Muji and Behuri | 29 | Keep for the current heard-song stance. A full field campaign would be a new adaptation scope, not 29 independent defects. |
| Mujo Avenges Halil | 14 | Keep as witnessed reckoning; guardians, pursuit and healing surround the staged survival/blood-taking facts. |
| Mujo's Courser | 6 | Keep as correspondence/procession montage around the horse-quest. |
| Mujo's Strength | 10 | Keep: repeated milk trials lead to one origin choice; later public feats are epilogue. |
| Mujo and the Zanas | 18 | Keep for the present anonymous-witness stance. A Mujo embodiment would require the investigation, hunt, refusal, little Zana's oath and restoration as one new arc. |
| Nastradin | 5 | Keep: independent anecdotes, not missing chapters of one plot. |
| Sari Salltek | 10 | Keep: lesser miracles and disciple coda belong to the wider saint cycle. |
| Scurfhead | 7 | Keep: courtly aftermath lies outside the later trace-witness stance. |
| Snake Bridegroom | 19 | High-value expansion bundle: broken secret, Sun/Moon/Wind route, over-sea crossing, spring recognition and the Kulshedra's chores/coffin trick are the tale's causal geographic spine. Do not add only one isolated chore. |
| Sokol Halili | 8 | Keep: the player embodies Halili only through death; Mujo's revenge remains a posthumous movement elsewhere. |
| Blue Eye | 3 | Keep: witnessed place-origin setup. |
| Three Friends | 18 | Expansion bundle: Kordha's widow/sabre origin and the siege-theft-recovery/crowning finale are the two coherent additions. Repeated armies and roads remain montage. |
| Tomorr Pilgrimage | 5 | Keep: devotional/historical context should be witnessed, not controlled. |
| Tortoise | 1 | Keep: the curse is the transformation ending's stated cause. |
| Zuku Bajraktar | 4 | Keep: extending the consent-focused projection into competing claims would change its current moral scope. |

The audit therefore does **not** recommend 310 new scenes. It recommends
coherent bundles when a tale's scope is deliberately expanded, with Gjizar,
Snake Bridegroom and Halil's Marriage providing the strongest causal/geographic
returns. The remainder are appropriate compressions for their current stance.

## Review of all 52 proposed places

All 52 proposals have a nearest existing anchor, mirror, sharing mold and
collision review. A proposal becomes a built place only when a playable bundle
needs the player to distinguish it from the current anchor.

Thirteen proposals are tied to the expansion bundles above:

- Aga Ymer: `ulqin` (household and White Spring).
- Halil's Marriage: `lumiDanub` (ford and tent camp).
- Gjizar: `barberTown`, `coffeeTown`, `tigerHouse`, `lionHouse`,
  `eaglesHouse`.
- Snake Bridegroom: `windHouse`, `overseaSpring`, `kulshedraHouse`,
  `kulshedraForest`.
- Three Friends: `home`, `moatCity`.

These places should be promoted only with their associated scenes. A marker
without the causal encounter would make the world larger but not richer.

The other 39 remain justified proposals: source-prologue homes, offstage
courts, aftermath locations, yard-scale details, repeated comic stations, or
optional refinements already represented by a compatible playable place. They
should stay visible in the source geography record and should not be advertised
as built destinations.

## Release rule

Counts of omitted beats and proposed places are disclosure metrics, not quality
scores. Release certification should fail only when an item lacks a disposition,
when the playable projection contradicts its source, or when an implemented
scene/location cannot be traced back to the selected witness. A future scope
expansion must update the scene mapping, place anchor, embodiment contract,
calendar semantics and projection-review snapshot together.
