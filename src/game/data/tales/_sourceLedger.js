// Evidence dispositions for cases a byte-containment check cannot decide.
//
// Two different limits are represented here and must never be conflated:
// 1. A selected telling can be verified exactly even when its surviving witness
//    is French, German, English, or a copyrighted modern Albanian publication.
//    That proves fidelity to the selected witness; it does not invent a missing
//    public-domain Albanian transcription.
// 2. A source-language line can be page-collated yet fail literal containment
//    because the repository deliberately repairs OCR, joins verse lines, or
//    transliterates a documented pre-standard alphabet.
//
// Hashes bind every recorded evidence disposition to the exact tale fields and,
// whenever a witness is stocked locally, its exact bytes. External-only evidence
// remains an explicit source qualification rather than being copied into the
// repo. Any later edit makes certification fail closed until a new comparison is
// performed and the relevant hash is consciously renewed. These records are
// internal editorial attestations; they do not claim external expert review.

export const SOURCE_REVIEW_DISPOSITIONS = Object.freeze({
  VERIFIED_SELECTED: 'verified-selected-witness',
  REVIEWED_SYNTHESIS: 'reviewed-synthesis',
  UNRESOLVED: 'unresolved',
})

const VERIFIED = SOURCE_REVIEW_DISPOSITIONS.VERIFIED_SELECTED
const SYNTHESIS = SOURCE_REVIEW_DISPOSITIONS.REVIEWED_SYNTHESIS

export const SELECTED_WITNESS_REVIEWS = Object.freeze({
  'ali-pashe-tepelena': {
    disposition: SYNTHESIS,
    lineCount: 97,
    recordHash: 'cd9242e9622d94697755a0679b8a92b626b36792236664b33fffcdfa3ebe0a31',
    basis: 'declared-multi-source-historical-synthesis',
    evidence: ['docs/references/fishta-eufrozina-ali-pashe.sq.txt'],
    localEvidenceHashes: { 'docs/references/fishta-eufrozina-ali-pashe.sq.txt': 'e457e2d5191937c8ffdecea49f7dfc73ecbbc0a71c0be1882b66614ac05beb24' },
    scope: 'The authored timeline is checked as a transparent historical synthesis, with a real Albanian literary witness only for the Eufrozina episode; it is not certified as one continuous folk telling.',
  },
  'bee-spider-cicada': {
    disposition: VERIFIED,
    lineCount: 12,
    recordHash: 'dd0760f9e6845f3c3eb735683b5fe568b4a858667b7411cb28fdf790b6d62af0',
    basis: 'exact-french-printed-witness',
    evidence: ['docs/references/eve-1926-la-legende-de-l-abeille.fr.txt'],
    localEvidenceHashes: { 'docs/references/eve-1926-la-legende-de-l-abeille.fr.txt': '4e7e782370b7167da6af19ef263dd9e923828b8631749e9e6033de4df9bab80f' },
    scope: 'All source units were checked against the anonymous 1926 French printing; no Albanian transcription is claimed.',
  },
  'creation-wolf': {
    disposition: VERIFIED,
    lineCount: 13,
    recordHash: 'ed808a8667f15380286a2fd51adddaa11f999ef55c021f44b8518d2d6bda7296',
    basis: 'exact-german-field-witness-with-albanian-formula',
    evidence: ['docs/references/hahn-erschaffung-des-wolfes.de-sq.txt'],
    localEvidenceHashes: { 'docs/references/hahn-erschaffung-des-wolfes.de-sq.txt': '8eb22b1656e626817fa3a4e701ab2a6b5524b416e089b0f37a4f02e919640fad' },
    scope: 'All source units follow Hahn’s German record; the one Albanian curse is preserved as such and the missing Albanian narrative is not back-translated.',
  },
  cuckoo: {
    disposition: VERIFIED,
    lineCount: 12,
    recordHash: 'b82a78416a53c227561f671ca92ffbc0d5392b36e072cfeba4acdc3312bd4d64',
    basis: 'exact-german-field-witness-with-albanian-cries',
    evidence: ['docs/references/hahn-entstehung-des-kukuks.de-sq.txt'],
    localEvidenceHashes: { 'docs/references/hahn-entstehung-des-kukuks.de-sq.txt': '9ec9a489fe946f99f6c6c14598d4599b59fa92c44cd595a39294b0c1feb0cbe9' },
    scope: 'All source units follow Hahn no. 104; only the Albanian bird cries and song printed by Hahn are presented as Albanian.',
  },
  'gjakova-cavern': {
    disposition: VERIFIED,
    lineCount: 14,
    recordHash: '18a18ba9d9706ae2a6b6c2680525fa1336fe0a60f9637cd17129cefab95ce8cb',
    basis: 'exact-direct-english-field-record',
    evidence: ['docs/references/durham-high-albania-1909-gjakova.en.txt'],
    localEvidenceHashes: { 'docs/references/durham-high-albania-1909-gjakova.en.txt': '7aca56728c45620b9035919978d997d3621267afa6514f1b6422720d7c437a42' },
    scope: 'All source units were checked against Durham’s direct 1908 oral-testimony record; no Albanian transcript was published.',
  },
  'half-rooster': {
    disposition: VERIFIED,
    lineCount: 64,
    recordHash: '0fc5356bcc9c2e3a69f4d42b9f619ced9b0089ab2e9d6a10fa858c6b73131930',
    basis: 'exact-selected-translation-with-identified-albanian-witness',
    evidence: [
      'http://www.albanianliterature.net/folktales/tale_15.html',
      'https://books.google.com/books?id=YgTaAAAAMAAJ&pg=PA90&dq=Gjysagjeli',
    ],
    scope: 'All source units match Elsie’s selected telling. The exact Albanian witness is now identified as «Gjysagjeli» in Folklor shqiptar 1 (1963), pp. 90–93, traced to Donat Kurti and plot-collated through institutional search snippets; no complete readable transcript exists for an Albanian quotation claim.',
  },
  'kuma-lisa': {
    disposition: VERIFIED,
    lineCount: 36,
    recordHash: '138dc2d7c6abde140f9a9069e631e1b43573f6d7f0f46785c201b1554c29dd51',
    basis: 'exact-selected-german-balkan-witness',
    evidence: ['docs/references/hahn-89-ujku-dhelpra-mjalti.de.txt'],
    localEvidenceHashes: { 'docs/references/hahn-89-ujku-dhelpra-mjalti.de.txt': '378caf2d17ce6093242a9ce0581ee0f9787bf209855c26854f2009b260bfa90f' },
    scope: 'All source units follow Hahn no. 89 exactly. Hahn prints it in the Greek cycle, so this proves the selected pan-Balkan telling rather than specifically Albanian provenance; the Albanian Weigand analogue remains a separate variant.',
  },
  'sari-salltek': {
    disposition: VERIFIED,
    lineCount: 33,
    recordHash: '5203160ef74e9d575ba092e22a41604966864aefec7ab7d6a7549480c4419336',
    basis: 'exact-selected-translation-backed-by-french-field-record',
    evidence: [
      'http://www.albanianliterature.net/legends/legend_02.html',
      'https://archive.org/details/souvenirsdelaha00degrgoog',
    ],
    scope: 'The timeline follows Elsie’s selected excerpt and was checked against Degrand’s underlying French field record; ancillary Degrand material outside that excerpt is not silently merged.',
  },
  'snake-bridegroom': {
    disposition: VERIFIED,
    lineCount: 155,
    recordHash: 'db0fa7698890f1dd338c2051420c3d9dd3b53f18c7bf090132bb28512bc5a550',
    basis: 'exact-selected-translation-with-identified-albanian-witness',
    evidence: [
      'http://www.albanianliterature.net/folktales/tale_13.html',
      'https://books.google.com/books?id=YgTaAAAAMAAJ&pg=PA397&dq=Shpejti',
    ],
    scope: 'Every sentence of the selected Elsie telling is accounted for. The exact Albanian witness is identified at Folklor shqiptar 1 (1963), pp. 397–403 and its distinctive sequence is snippet-collated; lack of continuous access prevents an Albanian quotation claim, not verification of the selected translation.',
  },
  'sons-of-eagle': {
    disposition: VERIFIED,
    lineCount: 12,
    recordHash: 'd3e1df2f6409ec748134c712fc4cb55669ca8889ba005d17596762512e3eb0fc',
    basis: 'exact-modern-family-oral-performance',
    evidence: ['http://folklore.usc.edu/the-tale-of-the-eagle/'],
    scope: 'All source units follow the 2022 USC family performance. This verifies a modern family attestation, not the antiquity of the legend.',
  },
  swallow: {
    disposition: VERIFIED,
    lineCount: 23,
    recordHash: '84bad58b5d6cbd8a3621ef07a11c43a058a684fd5de19f8cd605359ac144f5be',
    basis: 'exact-modern-albanian-selected-witness',
    evidence: ['docs/references/hysi-2023-pse-dallendyshja.sq.txt'],
    localEvidenceHashes: { 'docs/references/hysi-2023-pse-dallendyshja.sq.txt': '4636c103a6f9c642610c3df85a61753e7af4e7475c3a8a8d1ddeefcc668f069a' },
    scope: 'All source units follow the modern Albanian telling. Copyright prevents stocking its prose as reusable public-domain quotation; it does not prevent factual collation.',
  },
  'tomor-shpirag': {
    disposition: SYNTHESIS,
    lineCount: 21,
    recordHash: '5fc153a3c9854cf547e183ad224ec13ae3fda5a6a42b4107eedd3de38a11b506',
    basis: 'declared-scholarly-synthesis',
    evidence: [
      'docs/references/lambertz-baba-tomor-shpirag.de.txt',
      'http://www.albanianliterature.net/legends/legend_01.html',
    ],
    localEvidenceHashes: { 'docs/references/lambertz-baba-tomor-shpirag.de.txt': 'd44f537416906953d14bf007b80044d6b8fe659f03ba6548c7fbab39de25d070' },
    scope: 'The selected Elsie/Lambertz synthesis is covered exactly; the accessible 1922 oral variant has a different ending and remains separately disclosed.',
  },
  tortoise: {
    disposition: VERIFIED,
    lineCount: 9,
    recordHash: '3c322322fbf7d3ed8083208ca1ccffcb9bf45fe95d1a4ef3e54d36f045da0f0d',
    basis: 'exact-modern-albanian-selected-witness',
    evidence: ['https://prizrenpress.com/plaka-dhe-breshka/'],
    scope: 'All source units follow the selected modern Albanian telling; its modern publication and copyright are explicit qualifications, not permission to backfill public-domain quote stock.',
  },
})

export const SOURCE_COLLATION_RECORDS = Object.freeze({
  'aga-ymer': {
    lineCount: 46, unmatchedCount: 38,
    sourceFieldsHash: 'fadb424427c576a59d16f77f18d7b508ac966516e10c2cf993f4d10611332ebf',
    witnessHash: 'e88fb649a7442944435dff1de058ec815e2f37be4de2e21fd7f50396e5bfd293',
    method: 'Hash-bound Gheg verse collation after disclosed OCR repair and stanza segmentation; dialectal forms are retained.',
  },
  'ali-bajraktari': {
    lineCount: 99, unmatchedCount: 1,
    sourceFieldsHash: 'e18b31f2b4842b0ae6ba3b228725bb9460d8bfa5eca95dcb85829ab52c94374e',
    witnessHash: '865466f261a3399192955e9295838e6267a10b0eaeec90f5d5a4ffa8c9eaae2f',
    method: 'One delivery line is reordered across the letter boundary; the adjoining source lines and discrepancy note preserve the printed sequence.',
  },
  'bear-dervish': {
    lineCount: 94, unmatchedCount: 94,
    sourceFieldsHash: '91086ac47d47fcce48652031a7eec99d4c9d3fd2f33c095d4f9247251bbb7573',
    witnessHash: '9a1f1e47561294f502b501c982321a199403fa8b12ca4762958ffc5196ebde65',
    method: 'Hash-bound line collation records the transliteration of Dozon’s documented French-based pre-standard alphabet and the disclosed OCR repairs.',
  },
  'death-of-omer': {
    lineCount: 98, unmatchedCount: 1,
    sourceFieldsHash: 'c4976f110f505919704b2252091be5cd156c2a6a0cc927b3e130aaa80a1928ba',
    witnessHash: '4bb45d890be09285be70ee0e249f269a55e0c19b61f27b0ae89c325d338a5553',
    method: 'The one miss is the disclosed correction of the scan’s “Homeri” to the internally required “Omeri.”',
  },
  'goose-girl': {
    lineCount: 31, unmatchedCount: 31,
    sourceFieldsHash: '54d3fee7d5e1bb0029aaef93ea2dad46eb12801ec0c89ddda8f4943bfdaa318e',
    witnessHash: 'e2a39e80d916485ebfd5140804c0946516aba7dffcce4fb2e0628c16c5492b3c',
    method: 'Hash-bound line collation records the transliteration of Dozon’s pre-standard alphabet; the single French editorial “ou” is explicitly rendered as Albanian “ose.”',
  },
  'kostandini-i-vogel': {
    lineCount: 54, unmatchedCount: 42,
    sourceFieldsHash: '724e16fe45713789f46218bf41d77448e5fc1640fb426bc7d2379f13d510a6d2',
    witnessHash: 'e88fb649a7442944435dff1de058ec815e2f37be4de2e21fd7f50396e5bfd293',
    method: 'Hash-bound verse collation covers segmentation, metrical filler removal and the disclosed Gheg/OCR repairs without silently standardising the song.',
  },
  'maiden-promised-sun': {
    lineCount: 44, unmatchedCount: 44,
    sourceFieldsHash: 'f48862cdb192aee8b7f6a98d18043e3ed7b4651148935bd5c5b3d7b3d0e62f81',
    witnessHash: '4bc1477aba78881c1cf08a2de2a501777f415441bcc40a318f796ea6e2fb6a3e',
    method: 'Hash-bound line collation records the transliteration of Dozon’s documented pre-standard alphabet and the enumerated OCR repairs.',
  },
  'maro-perhitura': {
    lineCount: 155, unmatchedCount: 137,
    sourceFieldsHash: '9ed40cab3d9d965e135d5037156a39a0959eb2453e7efbb45e010c7039ade194',
    witnessHash: '9e5ec8a9d8c86c896400aeaf154d1c7781431eccfcbc7797d6ae5186f2579492',
    method: 'Hash-bound page/OCR collation rejoins broken words and records disclosed glyph repairs while retaining the source’s southern dialect.',
  },
  nastradin: {
    lineCount: 105, unmatchedCount: 57,
    sourceFieldsHash: 'eb093595dc02558ffdb261bf0b7bc9fcd65a49680b999da8b6fc96545da9f14b',
    witnessHash: '468a66cdf081dda345184901dffcd59aa8ff4bd4af904d72322024055e3af625',
    method: 'Hash-bound collation against the 1954 Gheg text covers its noisy scan, joined dialogue and light OCR cleaning.',
  },
  scurfhead: {
    lineCount: 164, unmatchedCount: 14,
    sourceFieldsHash: '18c1d3cbca4fab9019fe8f5796821910cf010d993c6a8bd66e827c573952065d',
    witnessHash: 'c137e8914f34ef6acf75934811618398a43b5c3f43225a3137722d8ee0d9d951',
    method: 'The remaining units were reconstructed from Meyer’s clean page images and transliterated from his 1888 phonetic alphabet; uncertainties are disclosed.',
  },
  'sokol-halili': {
    lineCount: 22, unmatchedCount: 1,
    sourceFieldsHash: 'edb1cc6d392d8da48c8bc10d84b795565bea5249527e49b186d581af64c07de6',
    witnessHash: 'e758c8056ca7e949da767236db36f197a31f4a964497a03f2610f609e880f583',
    method: 'The one miss is documented quotation apparatus around the otherwise verbatim Gheg verse.',
  },
  'three-friends': {
    lineCount: 155, unmatchedCount: 88,
    sourceFieldsHash: '2d18c6c7b49bf84b5c68bd99ad6e4b5d743e484e0dedee19fe7ea1572a4ac419',
    witnessHash: '902505cf25ad59458143aacecb943098039dd0abc0a36ded190e25a8593302f9',
    method: 'Hash-bound page/OCR collation covers reconstructed dialogue segmentation and light cleaning of the 1954 Mitko text.',
  },
  'tomorri-pilgrimage': {
    lineCount: 27, unmatchedCount: 1,
    sourceFieldsHash: '4bc3522ef4ea69f71cc9952e541e329ce69bedaa7808a4120d7a9386541ecefd',
    witnessHash: 'bc3a444e2231c0168f8d067570bbf78c907d837c6d8d6a68a0426d3706b7693f',
    method: 'The one miss is the disclosed correction of an obvious source-page OCR typo (“trajron” to “trajton”).',
  },
})

export const unresolvedSelectedWitnessReviews = () =>
  Object.entries(SELECTED_WITNESS_REVIEWS)
    .filter(([, review]) => review.disposition === SOURCE_REVIEW_DISPOSITIONS.UNRESOLVED)
    .map(([taleId, review]) => ({ taleId, ...review }))
