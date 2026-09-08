# World-claim source audit

Initial audit: **2026-09-07** · Remediation and current probe verified: **2026-09-08**

## Scope and standard

This audit covers the non-tale claims exposed by `FOLKLORE`, `HISTORY`,
`EXTRA_SOURCES` and `CORPUS` in `src/game/folklore.js`, plus the broader claims
in `docs/albanian-folklore.md`. Tale-by-tale source-unit alignment is audited
separately by the source and projection ledgers.

The aim is not to maximize a raw link count. It is to give each material claim
the strongest evidence that is legitimately available, with a direct route for
a reader to inspect it. Ten copied encyclopaedia links do not outweigh one
pinpointed primary witness.

Evidence classes used here:

- **P — primary or near-primary:** tale/song text, field report, customary-law
  collection, contemporary document, or recorded performance.
- **S — scholarly:** peer-reviewed article, critical edition, or research
  monograph.
- **I — institutional:** archive/library catalogue, UNESCO inventory, or an
  Albanian public-body record.
- **R — reference:** general-purpose encyclopaedia or dictionary summary.
- **C — community/popular attestation:** tourism, community, press, blog, or
  modern retelling useful for reception but weak for historical priority.

`P`, `S`, and `I` answer different questions. An institutional catalogue proves
identity and availability, while a primary text supports what the witness
actually says. Neither should be described as line-verified unless the cited
passage has been inspected.

## Inventory results

The figures in this section preserve the **pre-repair baseline** found by the
independent audit. The repair result is recorded immediately below so the
before/after evidence is not lost.

- **176 claim cards:** 140 folklore/custom cards and 36 history cards.
- **267 direct source-link mentions:** 204 on folklore cards and 63 on history
  cards.
- **86 cards have only one direct source link.**
- **103 cards expose Wikipedia only in their direct `sources` field:** 78
  folklore/custom cards and 25 history cards. Some have stronger material in
  `EXTRA_SOURCES` or `CORPUS`, but the player-facing card does not show that
  distinction clearly.
- Across direct sources, supplemental sources and corpus records there are
  **598 link mentions / 402 unique URLs**.
- Even after combining those three registries, **28 cards have no clearly
  scholarly, institutional or book-level link under a conservative domain
  classification**: 19 folklore/custom cards and 9 history cards. They are
  listed below for targeted repair.

### Cards lacking a strong non-encyclopaedic link at audit time

Folklore/custom:

`nena-e-diellit`, `karkanxholl`, `dhampir`, `dodola`, `nata-e-buzmit`,
`sulltan-nevruzi`, `plisi`, `legjenda-e-prespes`, `gjeto-basho-muji`,
`sokol-halili`, `ali-bajraktari`, `sunet`, `mashallah-ptu`, `plumbi-frika`,
`fall-kafeja`, `e-marta`, `nusja-omens`, `pragu`, `besime-popullore`.

History:

`ura-e-tabakeve`, `meshari-buzuku`, `frasheri-brothers`, `gjergj-fishta`,
`ded-gjo-luli`, `lufta-e-vlores`, `king-zog`, `prenk-bibe-doda`,
`italian-invasion-wwii`.

Several can be repaired immediately from authoritative sources already found:

| Card(s) | Add or replace with | Class | Limit |
|---|---|---:|---|
| `ura-e-tabakeve` | [Albanian National Tourism Agency](https://akt.gov.al/tanners-bridge/) and [Municipality of Tirana](https://tirana.al/pikat-e-interesit/itenerari-historik/ura-e-tabakeve-6924) | I + I | place history, not folklore proof |
| `meshari-buzuku` | [Albanian diplomatic service / Vatican holding note](https://ambasadat.gov.al/vatican/en/newsroom/takim-i-ambasadores-frangaj-me-prefektin-e-bibliotekes-apostolike-te-vatikanit/) and [Albanian Academy journal article PDF](https://api.journals-akad.gov.al/media/article/Bardhyl_Demiraj_5-56.pdf) | I + S | article is modern scholarship; Vatican original is not digitally reproduced there |
| `rilindja-awakening`, `league-of-prizren`, `congress-of-manastir`, `independence-1912`, `king-zog`, `italian-invasion-wwii` | [Library of Congress country study](https://www.loc.gov/item/93042885/) | I/S | broad synthesis; add primary documents where available |
| `league-of-prizren` | [1878 resolutions](http://www.albanianhistory.net/1878_League-of-Prizren/index.html) | P/S | translated documentary edition on Elsie’s surviving HTTP author site |
| `independence-1912` | [1912 declaration](http://www.albanianhistory.net/1912_Declaration-of-Independence/index.html) | P/S | translated documentary edition on Elsie’s surviving HTTP author site |
| `syri-kalter` | [National Agency of Protected Areas](https://akzm.gov.al/parku-natyror-syri-i-kalter/) and [official tourism record](https://akt.gov.al/en/natural-monuments/Blue-eye/) | I + I | physical place/status only |
| `burrnesha` | Antonia Young, [publisher page](https://www.bloomsbury.com/uk/women-who-become-men-9781859733356/) and [Google Books record/preview](https://books.google.com/books?id=jDgqAAAAYAAJ) | S + I | copyrighted, partial preview |
| fate/caul cards (`ora`, `fatia-mira`, relevant `drangue`) | Albert Doja, [correct DOI](https://doi.org/10.5771/0257-9774-2005-2-449) and [UCL open-access record](https://discovery.ucl.ac.uk/id/eprint/18364/) | S | supports destiny/birth symbolism, not every deity claim |
| mythology, ritual and named-being cards | Robert Elsie, [Google Books record/preview](https://books.google.com/books?id=aAtQZ0vjf5gC), and Mark Tirta, [WorldCat record](https://search.worldcat.org/search?q=Mitologjia+nd%C3%ABr+shqiptar%C3%AB+Tirta) | S/I | copyrighted; catalogue/preview evidence only until the relevant pages are collated |
| `gjama-e-burrave` | [specific national ICH record](https://regjistritkj.al/en/gjama-e-burrave-te%CC%88-dukagjinit/) | I/C | the claimed Skanderbeg origin is recorded tradition, not established event-history |
| `dita-e-veres` | [specific national verore record](https://regjistritkj.al/riti-i-vendosjes-se-veroreve/) | I/C | describes living regional forms and dates |
| ATU comparisons attached to tale cards | Hans-Jörg Uther, [current Folklore Fellows material](https://www.folklorefellows.fi/wp-content/uploads/FFC-284-286-Uther-2024-Introductions.pdf) and [WorldCat record](https://search.worldcat.org/title/57716857) | S/I | type classification is contextual, not a source for the Albanian wording |

The remaining weak cards should not be bulk-filled with an Elsie or Tirta
catalogue link and then declared proved. Each needs the relevant entry/page or a
qualified label such as `catalogue pointer; exact passage not locally checked`.

## Post-remediation result

The audit findings were applied to the live registry and then rechecked:

- **47/47 tales** expose structured, role-labelled source routes: **179 tale
  references** in total. Every tale names at least one selected witness, source
  text, facsimile, or translation; variants and analogues are explicitly
  distinguished from the selected telling.
- **176/176 folklore and history cards** expose at least two distinct clickable
  routes after tale references, supplemental sources and corpus coverage are
  combined. The registry contributes **698 direct, supplemental and tale-reference
  links**; after the UI adds corpus-work coverage and deduplicates each card, the
  player-visible surface contains **923 links**. No card is left dependent only
  on a wiki-family source.
- The registry now contains **508 distinct external URLs**. The final live probe
  found **457 reachable**, **41 access-controlled**, **9 temporarily
  unavailable**, **1 other nonfatal server response**, and **0 confirmed
  404/410 links**.
- The 28-card targeted backlog above is closed. Where the exact passage is not
  openly digitised, the UI says that the link is a catalogue or preview pointer
  instead of implying that it is a verified full text.
- The false Zana/Doja JSTOR attribution was removed and replaced with the
  article's correct DOI and UCL repository record, with its evidentiary scope
  narrowed to fate and birth symbolism.

These results certify the registry's current coverage and record zero
definitive 404/410 responses in the latest probe. They do not turn
access-blocked or temporarily unavailable pages into inspected texts, or make
an independent variant evidence for the wording of a selected witness.

## Historical pre-remediation link-integrity review

Before the repairs above, a concurrent HTTP `GET` check was run over the then
current 402-URL registry with redirects enabled and a twelve-second timeout.
The table below is retained as the historical baseline, not the current result.
Results vary because many hosts block automated clients; the current probe is
recorded in [the source-link resilience audit](source-link-resilience-audit.md).

| Result | URLs | Interpretation |
|---|---:|---|
| 200 / 206 | 337 | machine-reachable during this run |
| 403 | 22 | access-controlled or bot-blocked; not evidence of link death |
| 404 | 35 | strong moved/dead indication; replace or remove |
| network failure | 3 | unresolved from this environment |
| timeout | 5 | unresolved from this environment |

This is an availability test, not a semantic verification. For example,
Wikipedia rate limiting can produce false failures, while a page returning 200
can still point to the wrong work.

### Definite semantic mismatch in the baseline (repaired)

The baseline `EXTRA_SOURCES['zana-e-malit']` labelled
`https://www.jstor.org/stable/40466705` as Albert Doja's “Mythology and
Destiny.” That JSTOR identifier resolves to **“Colonial Response to Population
Depletion in Early Congo, ca. 1890–1936,” an unrelated article**. The repair
replaced it with:

- DOI: <https://doi.org/10.5771/0257-9774-2005-2-449>
- open-access repository record: <https://discovery.ucl.ac.uk/id/eprint/18364/>
- correct JSTOR identifier, if retained as a catalogue pointer: `40466549`

The source's scope was also narrowed: Doja's article supports Albanian fate,
birth, caul and symbolic-regeneration material. It is not blanket evidence for
every detail on the Zana card.

### High-value dead/moved links and replacements in the baseline (repaired)

| Former use | Dead or obsolete target | Replacement applied |
|---|---|---|
| `independence-1912` | `albanianhistory.net/1912_Independence/` | [surviving Elsie documentary edition](http://www.albanianhistory.net/1912_Declaration-of-Independence/index.html) |
| `syri-kalter` | Wikipedia `Blue_Eye_(spring)` | [AKZM natural-park record](https://akzm.gov.al/parku-natyror-syri-i-kalter/) or current [Wikipedia title](https://en.wikipedia.org/wiki/Blue_Eye%2C_Albania) |
| `ura-e-tabakeve` | removed Into Albania page | [Albanian National Tourism Agency](https://akt.gov.al/tanners-bridge/) and [Municipality of Tirana](https://tirana.al/pikat-e-interesit/itenerari-historik/ura-e-tabakeve-6924) |
| `burrnesha` | dead Google Books edition id | [current Google Books record](https://books.google.com/books?id=jDgqAAAAYAAJ) and [publisher record](https://www.bloomsbury.com/uk/women-who-become-men-9781859733356/) |
| `prende`, `ora`, `fatia-mira` | removed `albanianstudies.org` Elsie PDF | [Google Books record/preview](https://books.google.com/books?id=aAtQZ0vjf5gC) and [WorldCat record](https://search.worldcat.org/title/A-dictionary-of-Albanian-religion-mythology-and-folk-culture/oclc/47270652) |
| `ali-pashe-tepelena` | obsolete Princeton URL | [JSTOR/Princeton book record](https://www.jstor.org/stable/j.ctt7zvj7v) |
| Rilindja/League/Manastir/Mic Sokoli/independence | removed Archive item for Skendi | [JSTOR/Princeton book record](https://www.jstor.org/stable/j.ctt17t75n7) and [Library of Congress country study](https://www.loc.gov/item/93042885/) |
| Kelmendi, kulla and sofra | removed Archive item for Elsie's *Tribes* | [publisher record](https://www.bloomsbury.com/us/tribes-of-albania-9781784534011/) |
| Isa Boletini, Bajram Curri, Shote/Azem Galica | removed Archive item for Elsie's *Biographical Dictionary* | [publisher record for the broader *Historical Dictionary*](https://www.bloomsbury.com/uk/historical-dictionary-of-albania-9780810861886/) plus person-specific scholarship still to be located |
| seven ATU comparison links under `sites.pitt.edu/~dash/type...` | obsolete paths | [Folklore Fellows current ATU introduction](https://www.folklorefellows.fi/wp-content/uploads/FFC-284-286-Uther-2024-Introductions.pdf) and [Uther catalogue record](https://search.worldcat.org/title/57716857); retain working [Ashliman index](https://sites.pitt.edu/~dash/folktexts.html) only as a comparative portal |
| `nastradin` supplemental source | obsolete `~dash/nasreddin.html` | working [Ashliman Hodja collection](https://sites.pitt.edu/~dash/hodja.html) |
| `arnaut-osmani`, `muji-e-behuri` | misspelled Wikipedia `Kangë_...` slug | existing [Frontier Warriors overview](https://en.wikipedia.org/wiki/Albanian_Songs_of_the_Frontier_Warriors) and, preferably, the local Palaj–Kurti witnesses |

Other baseline 404s included removed or renamed Wikipedia pages, an obsolete *Walled-Up
Wife* Google Books edition, inaccessible Archive borrow records for Babinger,
Setton and Vickers, a dead Yahoo circumcision story, a dead Bajram tourism page,
and one removed *Lahuta e Malcís* OCR URL. The remediation stopped counting
those silently as usable corroboration and, where a local witness existed,
retained the local proof while replacing the external route with a stable
catalogue or publisher record.

### Access-limited results in the baseline (historical)

- Britannica, UNESCO, EEBO and HathiTrust returned 403 to the automated client
  but are normal access-controlled institutional pages.
- UPenn, Open Library, Perseus and the National Library of Albania viewer timed
  out or rejected this automated run. Keep them labelled `access-limited` until
  checked interactively.
- The surviving Elsie Albanian Literature site and USC Folklore records are
  served successfully over HTTP from this environment but do not offer usable
  HTTPS routes. The USC item remains a **modern family performance
  attestation**, not evidence for the antiquity of the Sons of the Eagle story.
- **Resolved after the baseline:** the BnF catalogue and Gallica Issues/OAI
  services identify the 28 March 1926 issue as
  [`ark:/12148/bd6t5733745d`](https://gallica.bnf.fr/ark:/12148/bd6t5733745d),
  and the article is on the issue’s
  [second scanned page](https://gallica.bnf.fr/ark:/12148/bd6t5733745d/f2.item).
  The cover prints *Septième Année — N° 287*. The repository’s former “no.
  267” citation was a bibliographic error and has been corrected in the tale,
  source card, local transcription provenance and quote report.

## Historical recommendations and current disposition

1. **Completed:** the definite wrong and dead URLs listed above were replaced.
2. **Superseded by the merged UI:** card, supplemental, tale and corpus sources
   remain separate authoring layers, but the player sees one deduplicated,
   role-labelled evidence list.
3. **Future enhancement:** source records could add universal structured fields:

   ```js
   {
     label,
     url,
     sourceClass: 'primary' | 'scholarly' | 'institutional' | 'reference' | 'community',
     access: 'local' | 'open' | 'preview' | 'catalogue' | 'gated' | 'external-only',
     pinpoint: 'page, section, line, or archival unit',
     supports: ['specific claim key'],
     checkedAt: 'YYYY-MM-DD',
   }
   ```

4. **Partially completed:** the UI displays source roles and author notes and
   never equates HTTP 200 with semantic verification. Uniform access and
   pinpoint fields are not yet present on every record.
5. **Completed:** link health is a non-blocking qualification except for
   definitive 404/410 responses, while structural, semantic, source-state and
   hash-bound review checks block certification.
6. **Partially completed:** every card exposes at least two distinct clickable
   routes and witness limits are explicit, but two URLs are not automatically
   claimed to be two independent witnesses. Stronger claim-level independence
   remains scholarly review work.
7. **Partially completed:** roles and notes distinguish selected witness,
   variant, context, place and other scopes where authored; universal
   claim-by-claim support typing remains a future enhancement.

## Remaining research limits

- Modern religious and household practice cards (`sunet`, `mashallah-ptu`,
  `fall-kafeja`, wedding omens, threshold/taboo material) still need
  Albanian-specific ethnography with pinpoint pages. Generic Islamic or Balkan
  summaries are context, not proof of Albanian distribution.
- Sparse legendary beings (`karkanxholl`, `dhampir`) often survive in regional
  vocabulary and comparative sources. Claims should be narrowed to what an
  Albanian witness actually records rather than expanded from neighboring
  traditions.
- Several twentieth-century biographies need person-specific scholarship or
  primary documents, not only a broad national-history survey.
- Copyrighted Elsie and Tirta references can be excellent scholarship while
  remaining externally non-reproducible. Their entries need page-level evidence
  attestations from an identified reviewer, or must be presented only as
  catalogue pointers. The current internal ledger is not external expert
  validation.

No unresolved access limit should be converted into a certainty claim merely by
adding another link.
