# Albanian Folklore Reference Corpus

Downloaded primary-source full texts backing the game's folklore library
(`src/game/folklore.js` → the 📚 **Sources** panel in the in-game Debug tab).

Every file here is a plain-text (`_djvu.txt` OCR or wiki `action=raw`) copy of a
public-domain source, kept locally so the corpus survives link-rot. Language is
encoded in the filename: `.sq` Albanian · `.de` German · `.fr` French · `.en`
English (multi = bilingual, e.g. `.de-sq`).

Machine-readable metadata for each source lives in `CORPUS` in
`src/game/folklore.js`; this README is the human index.

The story lines quoted verbatim from these texts are tracked in the quote proof
register (`src/game/quotes.js`) and verified against these files by
`npm run quotecheck`; the generated ledger is [`../quote-proofs.md`](../quote-proofs.md).

## Downloaded — public domain

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

These back the new **📜 History** layer and the expanded custom cluster. Two prestige
Albanian originals proved partly digitized after all: **Dine's *Valët e detit*** is a full
894-page page-image scan at the National Library IIIF viewer (linked, no plain-text), and the
**Kanun** above is the keystone Albanian-language law text.

## Not downloadable (link-only) — recorded in `CORPUS` with landing pages
Prestige Albanian originals that are **not** cleanly digitized as free full text:
Mitko *Bleta shqiptare* (1878), Dine *Valët e Detit* (1908), Palaj & Kurti
*Visaret e Kombit II — Kângë kreshnikësh* (1937), Prennushi *Kângë popullore
gegnishte* (1911), Pedersen *Albanesische Texte* (1895).

## In copyright — linked, never ingested
Elsie *Albanian Folktales and Legends* (freely readable, © Elsie), Kuteli
*Tregime të moçme shqiptare* (1965), Çetta *Përralla* (1979/82), Haxhihasani
*Folklor shqiptar — Epika legjendare*, Tirta *Mitologjia ndër shqiptarë* (2004).

## Provenance
Sources located & verified by parallel research passes, 2026-07-08. Each
archive.org identifier was confirmed by fetching the item before download.
