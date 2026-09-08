# Folklore evidence and adaptation certification

This ledger defines the strongest honest release claim the repository can make.
It does not promise metaphysical certainty, recover lost manuscripts, or turn a
modern or translated witness into an older Albanian original. It does require
every claim inside the declared game scope to be either reproducibly supported
or explicitly qualified, with no unresolved contradiction allowed through the
strict gate.

Run `npm run certify` for the combined world, runtime, source and adaptation
gate. Run `node scripts/lorecertainty.mjs --json` for its evidence inventory.

Run `npm run audit:sources` when network access is available to probe every
unique external bibliography URL. The deterministic certification validates
the registry itself; the live probe additionally fails on definitive HTTP 404
or 410 responses while reporting login walls, rate limits and transient network
failures separately. Those temporary access conditions are not misreported as
proof that a publication has disappeared.

Every tale also carries a clickable `references` bibliography. Each link names
its relationship to the beat record: selected witness, source text, facsimile,
translation, catalogue, scholarship, variant, analogue, or context. A high
link count is never treated as fidelity by itself, and variants or analogues
cannot satisfy the requirement for an inspectable route to the selected text.

## Negative space is not automatically a defect

The sourced timeline and the playable projection are different records:

- A **direct beat** has an enacted scene or an explicit in-world learning
  event. A divergence note documents how the adaptation differs; it does not
  make the source beat playable.
- A **justified omission** remains visible in the complete source timeline but
  is deliberately handled as setup, connective narration, repeated action,
  aftermath, offstage geography, or a declared point-of-view boundary.
- A **gap** changes or loses a causal event important enough to require repair.
- An **uncertain** decision lacks enough aligned evidence to decide.

Only the last two block certification. The same rule applies to places. A
proposed anchor is acceptable when it honestly records an unplayed or compressed
source location and does not pretend the player can visit it. If a place is
causally necessary to a playable route, it must be built as its own coherent
location. This prevents both padding the map with decorative dots and hiding a
real missing scene behind the word “proposal.”

Every individual omission and proposal has a disposition in
`src/game/data/tales/_projectionLedger.js`. One SHA-256 snapshot binds the full
current tale records, story nodes, inventory lore, folklore and ending cards,
history, source-corpus metadata, the quote evidence register, achievements and
bad-ending fates, NPC registry and backstories, persistent world-memory text,
places, disposition ledgers, the application shell, runtime state, route,
region, reveal, live-NPC, language and comprehension models; the complete merged
reviewed-reading and reviewed-action registries; and the selected guide, token,
comprehension, map, story, achievement and environment renderers that turn those
records into visible geography, translations, accepted answers and consequences.
A contradiction cannot drift into a neighbouring player-facing layer unnoticed:
any relevant edit invalidates the snapshot until the changed projection is
compared with its evidence and dispositions and the digest is consciously
renewed. A matching digest proves identity with the sealed payload; it does not
prove who inspected it, external expert approval, or semantic truth.

The global snapshot is not the only seal. Every omitted beat and proposed
place has a separate context digest over its exact source/projection or
anchor/geography fields. The audits recompute all 362 item digests, require
one-to-one key parity and reject copied values. This keeps “justified” from
becoming a blanket label that survives a changed source beat or place plan.

## Source-evidence ladder

Source units are accounted for through the strongest evidence actually available:

1. normalized text-exact containment in a local witness;
2. conservative letters-only containment for punctuation, line-number and
   word-break apparatus, without fuzzy spelling or transliteration;
3. a page/OCR/transliteration collation record bound to hashes of both the exact
   source fields and the local witness bytes;
4. for a telling with no available Albanian transcript, a line-by-line internal
   editorial attestation against the exact selected French, German, English, or
   modern witness, bound to the current English beat record and to every locally
   stocked witness; external-only evidence remains an attestation rather than a
   locally reproducible byte proof or external expert validation;
5. a clearly labelled multi-source synthesis, documented and hash-bound as a
   synthesis rather than misrepresented as one folk original.

A merely located source is not enough. It remains blocking until each source
unit is aligned. Albanian is never invented or back-translated to fill a blank.

## Evidence qualifications that remain visible

These are limits of the surviving or selected evidence, not unresolved defects:

| Tale | Recorded evidence basis | Qualification |
|---|---|---|
| Ali Pashë Tepelena | declared historical synthesis; Albanian Fishta witness for Eufrozina | not one continuous folk telling |
| Bee, Spider and Cicada | exact 1926 French printing | no Albanian transcript claimed |
| Creation of the Wolf | exact Hahn German field witness, with its Albanian formula | narrative was printed in German |
| Cuckoo | exact Hahn German witness, with Albanian cries and song | narrative was printed in German |
| Gjakova cavern | Durham's direct English field report | no Albanian transcript was published |
| Half-Rooster | exact selected Elsie translation; exact Albanian witness identified and snippet-collated | «Gjysagjeli», *Folklor shqiptar 1* (1963), pp. 90–93, is not continuously readable, so no Albanian quotation claim is made |
| Kuma Lisa | exact Hahn no. 89 German witness | Hahn places it in the Greek cycle; the Albanian Weigand analogue is a different variant |
| Sari Salltëk | exact selected Elsie excerpt checked against Degrand | ancillary Degrand material is not silently merged |
| Snake Bridegroom | exact selected Elsie translation; exact Albanian witness identified and snippet-collated | *Folklor shqiptar 1* (1963), pp. 397–403, is not continuously readable, so no Albanian quotation claim is made |
| Sons of the Eagle | exact 2022 USC family performance | proves a modern family attestation, not antiquity |
| Swallow | exact modern Albanian selected witness | modern age and copyright remain disclosed |
| Tomorr and Shpirag | declared Elsie/Lambertz scholarly synthesis | the accessible 1922 oral variant has a different ending |
| Tortoise | exact modern Albanian selected telling | modern age and copyright remain disclosed |

External-only witnesses remain qualifications because the repository cannot
freeze their bytes. Locally stocked evidence is byte-hashed and fails closed if
it changes.

## Primary witnesses recovered during this review

- **Half-Rooster:** [Google Books' institutional scan](https://books.google.com/books?id=YgTaAAAAMAAJ&pg=PA90&dq=Gjysagjeli) indexes the exact
  «Gjysagjeli» across *Folklor shqiptar 1* (1963), pp. 90–93. Its snippets
  expose every rare movement in Elsie's selected combined plot. [Spiro Floqi's
  1966 *Studime Filologjike* article](https://albanica.al/studime_filologjike/article/download/2577/9283/12656)
  prints the frog dialogue and cites Donat Kurti, *Prralla* I, p. 75; the
  [National Library's bibliography](https://www.bksh.al/bksh/LibriShqip1913.pdf)
  records Kurti's 1940 first and 1942 second editions. This repairs provenance
  but does not turn discontinuous search snippets into a complete transcript.
- **Snake Bridegroom:** [the same institutional scan](https://books.google.com/books?id=YgTaAAAAMAAJ&pg=PA397&dq=Shpejti) indexes the exact Albanian
  witness on pp. 397–403, including Swift, the Kulshedra, ring-in-jug,
  two-cauldron and coffin sequence. The 1954 local corpus's «Shamakadija» is
  now correctly recorded as a close foal-bridegroom variant, not dismissed as
  an unrelated qose tale. Neither source is silently merged into the selected
  1963 witness.
- **Hahn's 1854 first printing:** the [Digital Library of Slovenia's complete
  three-volume facsimile](https://www.dlib.si/details/URN%3ANBN%3ASI%3Adoc-POV0ZX2I),
  supplied by the National and University Library of Slovenia, now backs the
  Creation of the Wolf and Cuckoo records alongside the 1864 reprint.

- **Gjizar / Birbil Gizári:** Holger Pedersen, *Albanesische Texte mit
  Glossar* (1895), printed pp. 30–35. Every source unit is aligned to the local
  page-checked transcription in
  `docs/references/pedersen-1895-birbil-gizari.sq.txt`.
- **Binoshët:** Giuseppe Schirò, *Canti tradizionali ed altri saggi delle
  colonie albanesi di Sicilia* (1923), Arbëresh text pp. 411–426 with Schirò's
  Italian translation on pp. 427–439. The primary comparison separated
  Bardhakuqja, the river-king's daughter, from the later Earthly Beauty and
  exposed the second twin's missing rescue route.
- **Kuma Lisa analogue:** Gustav Weigand, *Albanesische Grammatik im
  südgegischen Dialekt* (1913), no. 52, pp. 152–153. This exact Albanian
  honey-pot analogue is preserved separately and is not spliced into Hahn's
  different selected telling.

## What the strict gate rejects

- missing line coverage or a duplicate source-unit assignment;
- an unverified, stale, missing, or located-but-unaligned witness;
- a stale record, local-evidence, source-collation, or projection-review hash;
- English editorial apparatus presented as source-language quotation;
- an unknown scene, beat, place, cast member, source-only status, or NPC link;
- a scene outside its declared entry–finale span, a beat classified as both
  enacted and learned, or a divergence-only beat omitted from the negative-
  space ledger;
- an omitted playable-span beat without an individual disposition;
- a proposed place without mirror, sharing mold, collision analysis and an
  individual disposition;
- any disposition still marked `gap` or `uncertain`;
- any strict world warning, including geographic ambiguity, density imbalance,
  an unresponsive distant sightline, or a runtime state contradiction.

The latest exact counts belong to the generated audit output, not hand-edited
prose in this document. This avoids turning yesterday's totals into today's
false assurance.
