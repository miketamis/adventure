# Albanian Folklore Evidence Library

Locally held texts, checked extracts and source-location records backing the game's folklore library
(`src/game/folklore.js` → the 📚 **Sources** panel in the in-game Debug tab).

The folder is intentionally mixed: public-domain OCR, CC-licensed transcriptions,
translations, page-checked research extracts, and source-location notes. A local
file is evidence that can be inspected; it is not by itself a public-domain or
primary-source claim. The `CORPUS` metadata and each file's own header record its
work, relationship and reuse limits. Language is encoded in the filename: `.sq`
Albanian · `.de` German · `.fr` French · `.en` English (multi = bilingual, e.g.
`.de-sq`).

Machine-readable metadata for each source lives in `CORPUS` in
`src/game/folklore.js`; this README is the human index.

Each beat-by-beat tale record also exposes a structured, clickable bibliography
through its `references` array. The reference role distinguishes an exact
selected witness from its facsimile or transcription, translations, catalogue
records, scholarship, variants, analogues and general context. Run
`npm run audit:sources` to perform the optional live URL probe in addition to
the deterministic registry checks included in `npm run certify`.

## Locally held evidence — license and limits shown per row

| File | Work | Author | Year | Lang | Albanian text? |
|---|---|---|---|---|---|
| `fishta-lahuta-e-malcis.sq.txt` | Lahuta e Malcís (national epic, 30 songs) | Gjergj Fishta | 1937 (Rome 1958) | sq (Gheg) | ✅ full |
| `naim-historia-e-skenderbeut.sq.txt` | Historia e Skënderbeut (verse epic) | Naim Frashëri | 1898 | sq | ✅ full |
| `ymer-age-ulqini.sq.txt` | Ymer Agë Ulqini (returning-husband song) | folk / coll. | trad. | sq | ✅ full (CC-BY-SA, Wikibooks) |
| `vajtimi-i-ajkunes.sq.txt` | Vajtimi i Ajkunës (Ajkuna's lament, kreshnik) | folk / coll. | trad. | sq | ✅ full (CC-BY-SA, Wikibooks) |
| `dozon-manuel-langue-chkipe.fr-sq.txt` | Manuel de la langue chkipe (chrestomathy) | Auguste Dozon | 1878 | fr + sq | ✅ tale originals |
| `hahn-albanesische-studien.de-sq.txt` | Albanesische Studien (samples + lexicon) | J. G. von Hahn | 1854 | de + sq | ✅ samples |
| `jarnik-zur-albanischen-sprachenkunde.de-sq.txt` | Zur albanischen Sprachenkunde | J. U. Jarník | 1881 | de + sq | ✅ Gheg tales |
| `lambertz-albanische-marchen.de-sq.txt` | Albanische Märchen | M. Lambertz | 1922 | de + sq | ✅ source texts |
| `meyer-kurzgefasste-grammatik.de-sq.txt` | Kurzgefasste albanesische Grammatik | Gustav Meyer | 1888 | de + sq | ✅ Tosk tales |
| `hahn-griechische-albanesische-marchen.de.txt` | Griechische u. albanesische Märchen | J. G. von Hahn | 1864 | de | translation |
| `dozon-contes-albanais.fr.txt` | Contes albanais | Auguste Dozon | 1881 | fr | translation |
| `durham-high-albania-1908.en.txt` | High Albania and its Customs in 1908 | Edith Durham | 1910 | en | ethnography |
| `garnett-women-of-turkey.en.txt` | The Women of Turkey and their Folk-lore | Lucy Garnett | 1890 | en | folklore |
| `wheeler-albanian-wonder-tales.en.txt` | Albanian Wonder Tales | Post Wheeler | 1936 | en | ⚠ retelling; 1936 — copyright uncertain, freely readable on IA |

## Downloaded — research pass 2 (law, history, travelogues)

| File | Work | Author | Year | Lang | Note |
|---|---|---|---|---|---|
| `kanuni-leke-dukagjinit.sq.txt` | Kanuni i Lekë Dukagjinit (customary law) | coll. Gjeçovi | 1913–33 | sq | ⭐ the law behind the whole custom layer |
| `noli-scanderbeg.en.txt` | George Castrioti Scanderbeg | Fan S. Noli | 1947 | en | best free English Skanderbeg history |
| `durham-struggle-for-scutari.en.txt` | The Struggle for Scutari | Edith Durham | 1914 | en | 1912–13 siege of Shkodra |
| `nopcsa-aus-shala-und-klementi.de.txt` | Aus Šala und Klementi (tribal ethnography) | Franz Nopcsa | 1910 | de | Shala & Kelmendi highland tribes |
| `hobhouse-journey-through-albania.en.txt` | A Journey through Albania | J. C. Hobhouse | 1813 | en | Byron's companion at Ali Pasha's court |
| `hecquard-haute-albanie.fr.txt` | Histoire … de la Haute Albanie | H. Hecquard | 1858 | fr | Gheg north: tribes, Kanun, legends |
| `brailsford-macedonia.en.txt` | Macedonia: Its Races and Their Future | H. N. Brailsford | 1906 | en | late-Ottoman Balkans / the feud |
| `leake-travels-northern-greece-1.en.txt` | Travels in Northern Greece, vol. I | W. M. Leake | 1835 | en | Epirus & the southern coast |
| `meyer-albanische-marchen-1884.de.txt` | Albanische Märchen (tale collection) | Gustav Meyer | 1884 | de | Tosk fairy tales |
| `pedersen-1895-birbil-gizari.sq.txt` | Birbil Gizári (raw OCR samples plus page-checked alignment transcript from *Albanesische Texte mit Glossar*) | Holger Pedersen / Albanian informant | 1895 | sq | ✅ exact original; all 154 game units aligned to printed pp. 30–35 |
| `weigand-1913-zonja-skile-ujku.sq.txt` | Tierfabel: Fuchs und Wolf, no. 52 (Elbasan) | Gustav Weigand / Josif Suterikji | 1913 | sq | ✅ complete Albanian analogue; not Hahn 89 |
| `schiro-1923-binoshet.sq.txt` | «Binóshæt» (complete game-line witness transcript, pp. 411–426) | Giuseppe Schirò / Piana degli Albanesi teller | 1923 | sq (Arbëresh) | ✅ exact page-collated evidence for all 141 game units |

These back the new **📜 History** layer and the expanded custom cluster. Two prestige
Albanian originals proved partly digitized after all: **Dine's *Valët e detit*** is a full
894-page page-image scan at the National Library IIIF viewer (linked, no plain-text), and the
**Kanun** above is the keystone Albanian-language law text.

## Not downloadable (link-only) — recorded in `CORPUS` with landing pages
Prestige Albanian originals that are **not** cleanly digitized as free full text:
Mitko *Bleta shqiptare* (1878), Dine *Valët e Detit* (1908), Palaj & Kurti
*Visaret e Kombit II — Kângë kreshnikësh* (1937), and Prennushi *Kângë
popullore gegnishte* (1911). Pedersen's 1895 *Albanesische Texte* is now
available through the Internet Archive and is recorded in the downloaded table
above; its 154 game units are collated against printed pp. 30–35.

## In copyright — linked, never ingested
Elsie *Albanian Folktales and Legends* (freely readable, © Elsie), Kuteli
*Tregime të moçme shqiptare* (1965), Çetta *Përralla* (1979/82), Haxhihasani
*Folklor shqiptar — Epika legjendare*, Tirta *Mitologjia ndër shqiptarë* (2004).

## Provenance
Sources located & verified by parallel research passes, 2026-07-08. Each
archive.org identifier was confirmed by fetching the item before download.
