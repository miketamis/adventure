// The QUOTE PROOF REGISTER — one entry per Q() line in the story.
//
// A Q() line claims "this sentence is the real thing, quoted from the folk
// sources." This file is where that claim is backed up. Each entry records
// WHAT the game quotes, WHERE the original lives, and — whenever the source
// is one of the downloaded primary texts in docs/references/ — the exact
// string a checker can find in that file. `node scripts/quotecheck.mjs`
// machine-verifies every entry and prints the file:line of each original;
// it FAILS if a registered proof can't be found, and content.js throws at
// import if a Q() line uses an id that isn't registered here. So a quote
// cannot exist in the story without an entry, and an entry cannot claim a
// corpus proof that doesn't hold.
//
// Fields:
//   label       what the player sees after the line (the attribution)
//   game        the quoted words exactly as the story line renders them
//               (the checker asserts the Q() line really contains this)
//   original    the wording as the source itself has it (Gheg, dialect or
//               19th-century orthography preserved)
//   translation plain English of the original
//   fidelity    'verbatim'  — the source wording, only re-spelled into the
//                             game's standard Albanian
//               'inflected' — the source formula with person/number/name
//                             bent to fit the scene
//               'adapted'   — wording altered or merged; `note` says how
//   source      CORPUS id (src/game/folklore.js) of the primary source, or
//               null when the quote is oral tradition / a web source with
//               no single book behind it
//   evidence    ordered list, strongest first:
//     { kind: 'corpus', file, match, note? }
//         match is copied from the local file (compared whitespace-
//         insensitively, so OCR line breaks don't matter). quotecheck
//         FAILS the build if it is not found in the file.
//         `variant: true` marks a match that attests the formula rather
//         than the exact wording (the note explains the difference).
//     { kind: 'url', url, label, quote?, note? }
//         a printed source we link but don't hold locally (in-copyright
//         or not cleanly digitized). Not machine-checkable; the ledger
//         marks it as link-verified only.
//     { kind: 'oral', note }
//         a living formula not located in print — the weakest tier, and
//         the generated ledger says so plainly.
//   note        anything a reviewer needs to judge the claim honestly
//
// ── ID NOTE ──────────────────────────────────────────────────────────────────
// A handful of ids below are still the descriptive label string itself (e.g.
// 'Ali Bajraktari — këngë kreshnike') rather than a short kebab-case id —
// that's simply the id of the FIRST Q() call registered for that source, kept
// as-is. Originally (2026-07-18 registration pass) several of these label ids
// were reused across more than one Q() call whose rendered Albanian was
// genuinely different text (a different verse, a different proverb) — a
// register id can only carry one `game` string, so only one call site per
// shared id could pass the per-line wording check. That collision has since
// been resolved throughout: every distinct quoted sentence in content.js now
// has its own register id (e.g. 'ymer-besa-kept', 'fjala-plumbi',
// 'pralla-maro-kukudhi'), each declared as a sibling entry right after the
// original it split from, and content.js's Q() calls were updated to match.
//
// The generated human-readable ledger lives at docs/quote-proofs.md
// (rebuild with `node scripts/quotecheck.mjs --report`).

export const QUOTES = {
  // ── The Kanun of Lekë Dukagjini (Gjeçovi's codification, 1913–33) ────────
  'Kanuni i Lekë Dukagjinit, §608': {
    label: 'Kanuni i Lekë Dukagjinit, §608',
    game: 'bukë e kripë e zemër',
    original: 'Mikut do t\'i bahet nderë: "Bukë e krypë e zêmër".',
    translation: 'The guest shall be honoured: with bread, salt and heart.',
    fidelity: 'verbatim',
    source: 'src-kanun-leke',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
        match: '"Bukë e krypë e zerner"',
        note: 'The OCR of the scan reads zêmër as "zerner"; §609 on the next line repeats the triad legibly ("Buka e krypa e zëmra").',
      },
    ],
  },
  'Kanuni i Lekë Dukagjinit, §602': {
    label: 'Kanuni i Lekë Dukagjinit, §602',
    game: 'shtëpia e shqiptarit është e zotit dhe e mikut',
    original: '"Shpija e Shqyptarit asht e Zotit e e mikut."',
    translation: "The Albanian's house belongs to God and to the guest.",
    fidelity: 'verbatim',
    source: 'src-kanun-leke',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
        match: '"Shpija e Shqyptarit asht e Zotit e e mikut"',
        note: 'Gheg shpija/asht rendered shtëpia/është; the Kanun\'s "e Zotit e e mikut" smoothed to "e Zotit dhe e mikut".',
      },
    ],
  },
  'Kanuni i Lekë Dukagjinit, §631': {
    label: 'Kanuni i Lekë Dukagjinit, §631',
    game: 'buka e lan dëmin',
    original: '"Buka e lan dâmin."',
    translation: 'The bread washes away the harm. (The reconciliation meal ends the feud.)',
    fidelity: 'verbatim',
    source: 'src-kanun-leke',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
        match: '"Buka e lan damin"',
        note: 'The scan prints dâmin without the circumflex.',
      },
    ],
  },
  'Kanuni i Lekë Dukagjinit, §620': {
    label: 'Kanuni i Lekë Dukagjinit, §620',
    game: 'mirë se erdhe',
    original: 'Po të hini miku në shpi, gjak me të pasë, do t\'i thuejsh: "Mirë së erdhe!"',
    translation: 'When the guest enters your house — even if you are in blood with him — you shall say: "Well have you come!"',
    fidelity: 'verbatim',
    source: 'src-kanun-leke',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
        match: '"Mirë së erdhe!"',
      },
    ],
  },

  // ── Ymer Agë Ulqini — the returning-husband song (Krajë; Wikibooks text) ─
  'Ymer Aga — këngë popullore': {
    label: 'Ymer Aga — këngë popullore',
    game: 'mirë se erdhe, aga ymer',
    original: '- Mirë se erdhe Imer Aga!',
    translation: 'Welcome home, Aga Ymer!',
    fidelity: 'inflected',
    source: 'src-ymer-ulqini',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/ymer-age-ulqini.sq.txt',
        match: 'Mirë se erdhe Imer Aga!',
        note: 'The song\'s "Imer Aga" is the game\'s "Aga Ymer" (name order and spelling follow the game\'s dictionary).',
      },
    ],
  },
  'ymer-besa-kept': {
    label: 'Ymer Aga — këngë popullore',
    game: 'mbajte besën që ke dhënë',
    original: 'majte besën i shqyptarit, / majte besën qi ke dhan-e!',
    translation: 'You kept the besa of the Albanian — you kept the besa you had given!',
    fidelity: 'verbatim',
    source: 'src-ymer-ulqini',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/ymer-age-ulqini.sq.txt',
        match: 'majte besën qi ke dhan-e!',
        note: 'Gheg majte/qi/dhan rendered mbajte/që/dhënë; the sung filler syllable "-e" dropped.',
      },
    ],
  },
  'ymer-udha-mbare': {
    label: 'Ymer Aga — këngë popullore',
    game: 'udha e mbarë',
    original: '- Udha e marë, o krushqellar-e!',
    translation: 'A good road to you, o wedding guests!',
    fidelity: 'verbatim',
    source: 'src-ymer-ulqini',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/ymer-age-ulqini.sq.txt',
        match: 'Udha e marë, o krushqelIar-e!',
        note: 'The Wikibooks transcription has a stray capital I in "krushqelIar"; marë is the Gheg spelling of mbarë.',
      },
    ],
  },

  // ── Dozon, Manuel de la langue chkipe (1878) — formulas & proverbs ───────
  'formula e përrallës (Dozon, 1879)': {
    label: 'formula e përrallës (Dozon, 1879)',
    game: 'ish e mos ish',
    original: 'Iç mos iç ("Il était et il n\'était pas")',
    translation: 'There was and there was not — the set opening of the Tosk tales.',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Iç mos iç',
        note: 'Dozon\'s ç-orthography for sh: "Iç mos iç" = "Ish mos ish". Used twice in the story (agaYmer1, odaPlak) with identical wording — not a collision.',
      },
    ],
  },
  'formula e mbylljes (Dozon, 1879)': {
    label: 'formula e mbylljes (Dozon, 1879)',
    game: 'u mplakën e u trashëguan',
    original: 'Oumblyâk edhé outraçigoûa. ("U mplak edhe u trashëgua.")',
    translation: 'He grew old and had heirs — the set closing of the Tosk tales.',
    fidelity: 'inflected',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Oumblyâk edhé outraçigoûa',
        note: 'Dozon prints the formula in the singular at the end of two tales; the game bends it to the plural (ata u mplakën e u trashëguan) for Aga Ymer and his wife.',
      },
    ],
  },
  'fjalë e urtë (Dozon, 1879)': {
    label: 'fjalë e urtë (Dozon, 1879)',
    game: 'qeni që leh nuk kafshon',
    original: 'Kyéni kyœ lyéh noûkœ kafçón ("Qeni që leh nukë kafshon")',
    translation: 'The dog that barks does not bite. (Dozon\'s proverb no. 1, from Fier.)',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Kyéni kyœ lyéh noûkœ kafçdn',
        note: 'First entry of Dozon\'s "Quelques proverbes" supplement; the scan\'s OCR reads the ó of kafçón as d.',
      },
    ],
  },
  'me-durim': {
    label: 'fjalë e urtë (Dozon, 1879)',
    game: 'me durim bëhen të gjitha',
    original: 'Me dourim tœ tœra bœkenœ ("Me durim të tëra bëhen")',
    translation: 'With patience all things are done. (Dozon\'s proverb no. 4.)',
    fidelity: 'inflected',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Me dourim tœ tœra bœkenœ',
        note: 'The game re-orders të tëra bëhen to bëhen të gjitha (tëra → gjitha is the standard-Albanian synonym).',
      },
    ],
  },

  // ── The great legends & kreshnik songs (this pass's new content) ────────
  'Legjenda e Prespës — lakeohrid.blogspot.com': {
    label: 'Legjenda e Prespës dhe Ohrit — lakeohrid.blogspot.com',
    game: 'nëse ata martoheshin do të ndodhte një fatkeqësi shumë e madhe',
    original:
      'Legjenda thotë se, nëse ata martoheshin, do të ndodhte një fatkeqësi shumë e madhe dhe do të ndikonte në krijesat e liqenit dhe njerëzit që jetojnë rreth tij.',
    translation: 'The legend says that if the two of them married, a very great misfortune would happen and would affect the creatures of the lake and the people living around it.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/lakeohrid-blog-legjenda-e-prespes.sq.txt',
        match: 'se, nëse ata martoheshin, do të ndodhte një fatkeqësi shumë e madhe',
      },
    ],
  },
  'prespa-mbytja': {
    label: 'Legjenda e Prespës dhe Ohrit — lakeohrid.blogspot.com',
    game: 'që mbyti të gjithë qytetin duke krijuar një liqen',
    original:
      'ra një shi shumë i madh dhe i rrëmbyer, që mbyti të gjithë qytetin, duke krijuar një liqen, aty ku ndodhet sot liqeni i Prespës.',
    translation: 'a great, sweeping rain fell, which drowned the whole city, creating a lake, where Lake Prespa lies today.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/lakeohrid-blog-legjenda-e-prespes.sq.txt',
        match: 'që mbyti të gjithë qytetin, duke krijuar një liqen',
      },
    ],
  },
  'Ali Bajraktari — këngë kreshnike': {
    label: 'Ali Bajraktari (Besa) — këngë kreshnike',
    game: 'se nuk je alija i ynë',
    original: 'Se nuk je Alija i ynë,',
    translation: 'For you are not our Ali,',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-ali-bajraktari.sq.txt',
        match: 'Se nuk je Alija i ynë,',
        note: 'Sung by Palok Ujka of Kastrat; published Visaret e Kombit vol. II (1937), pp. 108-117.',
      },
    ],
  },
  'ali-bajr-besnik': {
    label: 'Ali Bajraktari (Besa) — këngë kreshnike',
    game: 'se besnik ti qenke qenë',
    original: 'Se besnik ti kenke kanë.',
    translation: 'For faithful you have been.',
    fidelity: 'inflected',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-ali-bajraktari.sq.txt',
        match: 'Se besnik ti kenke kanë.',
        note: 'Gheg kenke kanë (a compound past) re-tensed to standard qenke qenë; the Slav king\'s admission as the true Ali rides home. Same song and file as "Ali Bajraktari — këngë kreshnike" above, line 358.',
      },
    ],
  },
  'Arnaut Osmani — këngë kreshnike': {
    label: 'Arnaut Osmani — këngë kreshnike',
    game: "dritë as diell mos të shohë me sy",
    original: "Dritë as diell mos t'shofë me sy.",
    translation: 'May he see neither light nor sun with his eyes (the curse on the imprisoned hero).',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-arnaut-osmani.sq.txt',
        match: "Dritë as diell mos t'shofë me sy.",
        note: 'Song no. 13 of the Kângë Kreshnikësh, recorded in Shala; published Visaret e Kombit vol. II (1937), pp. 130-135. Gheg t\'shofë respelled shohë for the game\'s standard orthography.',
      },
    ],
  },
  'Deka e Halilit — këngë kreshnike': {
    label: 'Deka e Halilit — këngë kreshnike',
    game: 'dredh, halil, zoti të vraftë',
    original: '- Dredh, Halil, zoti të vraftë,',
    translation: 'Dodge, Halil, may God slay you (the taunt hurled in the duel).',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-deka-e-halilit.sq.txt',
        match: 'Dredh, Halil, zoti të vraftë,',
        note: 'Sung by Shan Zefi of Curraj i Epërm; published Visaret e Kombit vol. II (1937), pp. 227-230.',
      },
    ],
  },
  'Zadrani për Halilin — Deka e Halilit': {
    label: 'Zadrani për Halilin — Deka e Halilit',
    game: 'mjeri unë, mjeri, sokol halili',
    original: '- Mjeri un, mjeri, Sokole Halili!',
    translation: 'Woe is me, woe, Falcon Halili! (Zadrani\'s cry over the dying hero.)',
    fidelity: 'inflected',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-deka-e-halilit.sq.txt',
        match: 'Mjeri un, mjeri, Sokole Halili!',
        note: 'Same song and file as "Deka e Halilit — këngë kreshnike" above, 18 lines on; Gheg un/Sokole respelled unë/Sokol.',
      },
    ],
  },

  // ── Proverbs quoted from the living tradition (already collected once) ──
  'fjalë e urtë': {
    label: 'fjalë e urtë',
    game: 'zoti vonon, por nuk harron',
    original: 'Zoti vonon, po nuk harron.',
    translation: 'God delays, but does not forget.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },
  'fjala-plumbi': {
    label: 'fjalë e urtë',
    game: "fjala dhe plumbi kur dalin s'kthehen më",
    original: "Fjala dhe plumbi kur dalin s'kthehen më.",
    translation: 'The word and the bullet, once they go out, do not come back.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },
  'besa-nuk-shitet': {
    label: 'fjalë e urtë',
    game: 'besa e shqiptarit nuk shitet',
    original: 'Besa e shqiptarit nuk shitet.',
    translation: "The Albanian's besa is not for sale.",
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },
  'shtepia-pa-femije': {
    label: 'fjalë e urtë',
    game: 'shtëpia pa fëmijë si nata pa yje',
    original: 'Shtëpia pa fëmijë, si nata pa yje.',
    translation: 'A house without children is like a night without stars.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },
  'gjuha-eshtra': {
    label: 'fjalë e urtë',
    game: "gjuha eshtra s'ka, eshtra thyen",
    original: "Gjuha eshtra s'ka, eshtra thyen. (also: Gjuha kocka nuk ka, po kocka thyen)",
    translation: 'The tongue has no bones, yet bones it breaks.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },
  'mali-me-mal': {
    label: 'fjalë e urtë',
    game: 'mali me mal nuk piqet, njeriu me njeriun piqet',
    original: 'Mali me mal nuk piqen, njeriu me njeriun piqen.',
    translation: 'Mountain never meets mountain, but person meets person.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
        note: 'Commonly given with plural piqen; the game uses the singular concord.',
      },
    ],
  },
  'sa-rron': {
    label: 'fjalë e urtë',
    game: 'sa rron, aq mëson',
    original: 'Sa rron, aq mëson.',
    translation: 'As long as you live, you learn.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },
  'fjale-pak': {
    label: 'fjalë e urtë',
    game: 'fjalë pak e punë shumë',
    original: 'Fjalë pak e punë shumë.',
    translation: 'Few words and much work.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikiquote.org/wiki/Albanian_proverbs',
        label: 'Albanian proverbs (Wikiquote)',
      },
    ],
  },

  'beja popullore — Për Baba Tomor': {
    label: 'beja popullore — për Baba Tomor',
    game: 'për baba tomor',
    original: 'Beja "Për Baba Tomor"',
    translation: 'The oath "By Baba Tomor" (Mount Tomorr\'s sky-father, sworn by Muslim and Christian believers alike).',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kryegjyshata-tomorri-abaz-aliut.sq.txt',
        match: 'beja "Për Baba Tomor"',
        note: 'The Bektashi Kryegjyshata\'s own page on the Tomorr pilgrimage: "Në të gjithë vendin tek njerëzit e të dyja besimeve është përhapur beja \'Për Baba Tomor\'."',
      },
      {
        kind: 'corpus',
        file: 'docs/references/lambertz-baba-tomor-shpirag.de.txt',
        match: 'Per  baba  Tomor',
        variant: true,
        note: 'Lambertz/Fishta cited secondhand in German: "\'Per baba Tomor!\' sagen sie oft" — corroborates the same oath from a second, independent source.',
      },
    ],
  },
  'Tre vëllezër — Mitko, Bleta shqypëtare': {
    label: 'Tre vëllezër me të bukurën e dheut — Mitko, Bleta shqypëtare',
    game: 'nga ky njeri nuk kam shpëtim unë',
    original: "kuçedra, «popo! tha, nga ky njeri s' kam shpëtim unë».",
    translation: 'The kuçedra: "alas!" she said, "from this man I have no escape."',
    fidelity: 'inflected',
    source: 'src-mitko-bleta',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/mitko-tre-vellezer-bukura-dheut.sq.txt',
        match: "nga ky njeri s' kam shpëtim unë",
        note: "Thimi Mitko, Bleta shqypëtare (1878), as reprinted in Pralla popullore shqiptare (1954), p. 7-13; the negation s' kam is smoothed to nuk kam for the game's standard orthography.",
      },
    ],
  },

  // ── Rozafa / the walled-castle ballad (same source page, two tellings) ──
  'Legjenda e Rozafës': {
    label: 'Legjenda e Rozafës — plaku i vjetër te muri',
    game: 'ditën punojmë e natën shembet',
    original: 'Ditën punojmë e\nnatën shembet.',
    translation: "By day we labour and by night it collapses (the brothers' answer to the old man who stops on the road).",
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/rozafa-legjenda-e-rozafes.sq.txt',
        match: 'Ditën punojmë e\nnatën shembet',
      },
    ],
  },
  'Kanga e kalasë së Shkodrës': {
    label: 'Kanga e kalasë së Shkodrës — balada e murimit',
    game: 'lidhni besë e lidhni fe',
    original: 'Lidhni besë, e lidhni fe,',
    translation: "Bind an oath, and bind a faith (the old saint's instruction to the three mason brothers).",
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/rozafa-legjenda-e-rozafes.sq.txt',
        match: 'Lidhni besë, e lidhni fe,',
        note: 'Part 2 of the file: the sung Gheg ballad ("Kanga e kalasë së Shkodrës" / "Balada e murimit"), on the same source page as the prose Rozafa legend used for the entry above.',
      },
    ],
  },
  'kala-prishi-bese': {
    label: 'Kanga e kalasë së Shkodrës — balada e murimit',
    game: 'prishi besë e prishi fe',
    original: 'Prishi besë, e prishi fe,',
    translation: 'He broke the oath, and broke the faith (said twice, of the two elder brothers who each break their word).',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/rozafa-legjenda-e-rozafes.sq.txt',
        match: 'Prishi besë, e prishi fe,',
        note: 'Part 2 of the file, a few verses after "Lidhni besë, e lidhni fe" (see "Kanga e kalasë së Shkodrës" above); the line recurs verbatim of the second elder brother too.',
      },
    ],
  },

  // ── Kostandini e Doruntina (besa-beyond-death legend, prose recording) ──
  'Kostandini e Doruntina — legjendë': {
    label: 'Kostandini e Doruntina — "Plaka me nëntë djelm"',
    game: 'ku e ke besën që më dhe',
    original: '«O Kostandin, biri im! Ku e ke besën që më dhe?',
    translation: '"O Kostandin, my son! Where is the besa you gave me?" (the mother\'s curse that wakes the dead son.)',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/plaka-nente-djelm-kostandin.sq.txt',
        match: 'besën që më dhe? Siellmë çupën që',
        note: 'Prose recording ("Plaka me nëntë djelm" / "The old woman with nine sons"), Pralla popullore shqiptare 1954, p. 137 — the same besa-curse Elsie translates in verse as "The Ballad of Constantine and Dhoqina". The line recurs verbatim at line 79 of the same file and is pinned in src/game/data/tales/constantine-doruntine.js beat 3.2.',
      },
    ],
  },
  'doruntina-era': {
    label: 'Kostandini e Doruntina — "Plaka me nëntë djelm"',
    game: 'pse më vjen erë e dheut',
    original: '"Pse më vjen erë dheu, o vëlla?" — Doruntina, riding behind the dead Kostandin',
    translation: 'Why do you smell of earth, brother?',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://www.voal.ch/besa-e-kostandinit-balade-popullore-shqiptare/kulture/letersi/',
        label: 'Besa e Kostandinit — the full Albanian ballad',
        note: 'The earth-smell exchange on the night ride is the legend\'s most famous beat; the ballad variants word it slightly differently and the game follows the common prose form.',
      },
      {
        kind: 'url',
        url: 'https://en.wikipedia.org/wiki/Constantin_and_Doruntin%C3%AB',
        label: 'Constantin and Doruntinë (Wikipedia)',
      },
    ],
  },
  'doruntina-pluhuri': {
    label: 'Kostandini e Doruntina — "Plaka me nëntë djelm"',
    game: 'është pluhuri i udhës',
    original: '"Është pluhuri i udhës" — Kostandin\'s answer',
    translation: 'It is the dust of the road.',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://www.voal.ch/besa-e-kostandinit-balade-popullore-shqiptare/kulture/letersi/',
        label: 'Besa e Kostandinit — the full Albanian ballad',
        note: 'The dead brother\'s deflection, paired with doruntina-era; variants give pluhuri i udhës / pluhuri i rrugës.',
      },
    ],
  },
  'doruntina-nuk-je-ti': {
    label: 'Kostandini e Doruntina — "Plaka me nëntë djelm"',
    game: 'nuk je ti, ime bijë',
    original: '«Nuk je ti, ime bijë»',
    translation: "It is not you, my daughter — the mother's refusal to open the door until Doruntina proves herself.",
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/plaka-nente-djelm-kostandin.sq.txt',
        match: 'Nuk je ti, ime bijë',
        note: 'Same prose recording as "Kostandini e Doruntina — legjendë" above (line 58 of the raw OCR / line 103 of the lightly-cleaned copy), the beat just before the mother makes her prove it through the door-gap and dies of the shock.',
      },
    ],
  },

  // ── The kreshnik cycle (Visaret e Kombit II, Palaj & Kurti 1937) ────────
  'Gjergj Elez Alia — këngë kreshnike': {
    label: 'Gjergj Elez Alia — këngë kreshnike',
    game: 'sytë e motrës po të pikojnë',
    original: "Sytë e motrës po t'pikojnë, more vlla!",
    translation: 'Your sister\'s eyes are dripping (with tears) for you, brother! (the sister\'s plea to the wounded hero.)',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-gjergj-elez-alia.sq.txt',
        match: "Sytë e motrës po t'pikojnë, more vlla!",
        note: 'Recorded in Nikaj (District of Tropoja); published Visaret e Kombit vol. II (1937), pp. 42-48.',
      },
    ],
  },
  'gjergj-trim-mbi-trima': {
    label: 'Gjergj Elez Alia — këngë kreshnike',
    game: 'trim mbi trima ai gjergj elez alia',
    original: 'Trim mbi trima ay Gjergj Elez Alija!',
    translation: 'Hero above heroes, that Gjergj Elez Alia! (the song\'s opening acclamation, echoed here as its close.)',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-gjergj-elez-alia.sq.txt',
        match: 'Trim mbi trima ay Gjergj Elez Alija!',
        note: 'The song\'s very first line; same file as "Gjergj Elez Alia — këngë kreshnike" above.',
      },
    ],
  },
  'Martesa e Gjeto Basho Mujit — këngë kreshnike': {
    label: 'Gjeto Basho Muji — Martesa — këngë kreshnike',
    game: 'besa besë e fjala fjalë',
    original: 'Besa besë, e fjala fjalë,',
    translation: 'A besa is a besa, and a word is a word (the epic\'s formula for an unbreakable pledge).',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kreshnik-gjeto-basho-muji-martesa.sq.txt',
        match: 'Besa besë, e fjala fjalë,',
        note: 'Sung by Mëhill Prêka of Curraj i Epërm; first published Hylli i Dritës (1924), p. 414; reprinted Visaret e Kombit vol. II (1937), pp. 1-10. The formula repeats three times in the song (also without the comma).',
      },
    ],
  },
  'Zuku Bajraktar — këngë kreshnike': {
    label: 'Zuku Bajraktar — këngë kreshnike',
    game: 'se nëna ime më ka verbuar',
    original: 'Se nana e eme m\'ka verbue.',
    translation: 'For my own mother has blinded me.',
    fidelity: 'verbatim',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-zuku-bajraktar.sq.txt',
        match: "Se nana e eme m'ka verbue.",
        note: 'Song no. 10 (Elsie & Mathie-Heck ordering), recorded in Shala; published Visaret e Kombit vol. II (1937), pp. 89-96. Gheg nana/eme/verbue respelled nëna/ime/verbuar.',
      },
    ],
  },
  'zuku-besa-zotit': {
    label: 'Zuku Bajraktar — këngë kreshnike',
    game: 'besën e zotit djali ua kishte dhënë',
    original: "Besën e zotit djali jau ki' dhanë:",
    translation: "The boy had given them God's own besa:",
    fidelity: 'inflected',
    source: 'src-visaret-kombit',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/palaj-kurti-zuku-bajraktar.sq.txt',
        match: "Besën e zotit djali jau ki' dhanë:",
        note: 'From a different song in the same file ("Zuku merr Rushën"), line 169; Gheg ki\' dhanë rendered kishte dhënë.',
      },
    ],
  },

  // ── Vajtimi i Ajkunës — Ajkuna's lament (kreshnik cycle; Wikibooks text) ─
  'Vajtimi i Ajkunës — këngë kreshnike': {
    label: 'Vajtimi i Ajkunës — këngë kreshnike',
    game: 'kanë lënë këngën zogjtë e malit',
    original: 'Kanë lanë kangen zogjtë e malit,',
    translation: 'The birds of the mountain have left off their song,',
    fidelity: 'verbatim',
    source: 'src-vajtimi-ajkunes',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/vajtimi-i-ajkunes.sq.txt',
        match: 'Kane lanë kangen zogjtë e malit',
        note: 'Gheg lanë/kangen rendered lënë/këngën.',
      },
    ],
  },
  'ajkuna-shkimte-drita': {
    label: 'Vajtimi i Ajkunës — këngë kreshnike',
    game: "t'u shkimtë drita, o hënë",
    original: "- T'u shkimtë drita ty, o mori hanë,",
    translation: 'May your light go out, o moon,',
    fidelity: 'verbatim',
    source: 'src-vajtimi-ajkunes',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/vajtimi-i-ajkunes.sq.txt',
        match: 'T’u shkimte (shoftë) drita ty, o mori hane',
        note: 'The Wikibooks text glosses shkimte with (shoftë) inline; the game trims the vocative filler "ty, o mori" to "o" and spells hanë → hënë. Same file as "Vajtimi i Ajkunës — këngë kreshnike" above, the lament\'s second verse.',
      },
    ],
  },

  // ── Blessings, greetings, riddles of the living voice ────────────────────
  'urimi i trimit': {
    label: 'urimi i trimit',
    game: 'të lumtë krahu',
    original: 'Të lumtë krahu! (the set congratulation on a feat of arms; Fishta: "Të lumtë goja, bajraktar")',
    translation: 'Blessed be your arm!',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/fishta-lahuta-e-malcis.sq.txt',
        match: 'Të lumtë goja, bajraktar',
        variant: true,
        note: 'The Lahuta attests the optative formula "të lumtë <limb>" (there with goja, the mouth, praising a speech); krahu (the arm) is its standard martial pair in the living language.',
      },
      {
        kind: 'oral',
        note: 'The exact wording "të lumtë krahu" is the everyday congratulation on a deed of strength; standard usage, lightly attested in the public-domain corpus.',
      },
    ],
  },
  'urim i moçëm': {
    label: 'urim i moçëm',
    game: 'u bëfsh njëqind vjeç',
    original: 'U bëfsh njëqind vjeç!',
    translation: 'May you live to a hundred! (The optative blessing over a cure or a birthday.)',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'oral',
        note: 'A standard optative blessing of the living language; idiomatically universal but not located in the public-domain corpus.',
      },
    ],
  },
  'përgjigjja e mikut — urim i moçëm': {
    label: 'përgjigjja e mikut — urim i moçëm',
    game: 'mirë se ju gjeta',
    original: 'Mirë se ju gjeta! — the guest\'s set reply to "Mirë se erdhe!"',
    translation: 'Well have I found you! (The fixed response to the welcome the Kanun commands.)',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'oral',
        note: 'The universal reply-half of the Albanian greeting pair whose first half the Kanun fixes in §620 (see "Kanuni i Lekë Dukagjinit, §620" above); the pair is standard from the highlands to the south.',
      },
    ],
  },
  'urimi i dasmës': {
    label: 'urimi i dasmës',
    game: 'u trashëgofshin',
    original: 'na outraçigofçin ("na u trashëgofshin") — the blessing called at the betrothal and the ring-exchange',
    translation: 'May they have heirs! — the set wedding blessing.',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'na outraçigofçin',
        note: 'From Dozon\'s account of the wedding customs ("VLYÉSA — les fiançailles"): the fathers kiss and wish "na outraçigofçin edhé na oumblyâktçin" — may they have heirs and grow old.',
      },
    ],
  },
  'kënga e shiut': {
    label: 'kënga e shiut',
    game: 'bjerë shi në arat tona',
    original: 'Rona, rona, peperona, / bjerë shi ndër arat tona! (the children\'s dodola rain-chant)',
    translation: 'Rona, rona, butterfly-doll, let rain fall on our fields!',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://en.wikipedia.org/wiki/Dodola',
        label: 'Dodola / peperona rain rite (Wikipedia)',
        note: 'The Albanian chant is recorded in the ethnographic literature (Tirta, Mitologjia ndër shqiptarë) in close variants: "Rona, rona, peperona, bjerë shi ndër arat tona". The game\'s në for ndër is the only change.',
      },
    ],
  },
  'mbyllja e tregimtarit (Lambertz)': {
    label: 'mbyllja e tregimtarit (Lambertz)',
    game: 'përralla atje, shëndeti këtej',
    original: 'Pralla n Lesh, shndetja prei nesh! (Tirana; Lambertz no. 61 — "the tale in the wool, health for us")',
    translation: 'The tale away, the health our way — the teller\'s sign-off.',
    fidelity: 'adapted',
    source: 'src-lambertz',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/lambertz-albanische-marchen.de-sq.txt',
        match: 'Praia n Le§, Snedja prei nes!',
        variant: true,
        note: 'Lambertz no. 61 ("Erklärung zweier Märchenschlüsse", recorded in Tirana) prints the formula — the OCR mangles sh to § and s. The game keeps the formula\'s shape ("the tale THERE, the health HERE") but simplifies the pun on lesh (wool / the town Lezha) that the original turns on.',
      },
    ],
  },
  'Lahuta e Malcís — Gjergj Fishta': {
    label: 'Lahuta e Malcís — Gjergj Fishta',
    game: 'ndihmo, zot, si më ke ndihmuar',
    original: "Ndihmo, Zot, si m'kë ndihmue!",
    translation: 'Help me, God, as you have helped me before! (The epic\'s opening invocation.)',
    fidelity: 'verbatim',
    source: 'src-fishta-lahuta',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/fishta-lahuta-e-malcis.sq.txt',
        match: 'Ndihmo, Zot, si m’kë ndihmue!',
        note: 'The OCR splits the verse across blank lines under the heading CUBAT (= Song I, "Cubat"). Gheg m\'kë ndihmue rendered më ke ndihmuar.',
      },
    ],
  },
  'mallkimi i moçëm (von Hahn, përralla 105)': {
    label: 'mallkimi i moçëm (von Hahn, përralla 105)',
    game: 'të hëngtë ujku',
    original: 'tœ ngrœntœ oûykou ("të ngrëntë ujku" — Tosk); Gheg: "Të hângtë ujku!"',
    translation: 'May the wolf eat you! — the herdsman\'s curse the wolf-creation fable explains.',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'tœ ngrœntœ oûykou, que le loup te',
        note: 'Dozon\'s note to proverb no. 37: "allusion à l\'imprécation qu\'on a coutume d\'adresser aux animaux domestiques: tœ ngrœntœ oûykou, que le loup te mange!" The Tosk verb ngrëntë and the game\'s standard hëngtë are forms of the same optative of ha (to eat).',
      },
      {
        kind: 'url',
        url: 'https://archive.org/stream/GriechischeUndAlbanesischeMarchenJohannGeorgVonHahn/GriechischeUndAlbanesischeMarchen-JohannGeorgVonHahn_djvu.txt',
        label: 'von Hahn, Griechische und albanesische Märchen, tale 105',
        note: 'The etiological fable ("why the wolf devours") behind the curse, in von Hahn\'s German translation.',
      },
    ],
  },
  'gjëegjëzë e moçme': {
    label: 'gjëegjëzë e moçme',
    game: 'punon ditë e natë, na jep dyllë e na jep mjaltë',
    original: 'Zu-zu-zu, punon ditë e natë, na jep dyllë e na jep mjaltë. (answer: bleta, the bee)',
    translation: 'Buzz-buzz, works day and night, gives us wax and gives us honey.',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'oral',
        note: 'A children\'s gjëegjëzë from the school-collection tradition; circulates widely in Albanian riddle anthologies but is not located in the public-domain corpus.',
      },
    ],
  },
  'nusja, nga guri': {
    label: 'balada e murimit — Ura e Artës',
    game: 'të dridhesh si dridhem unë',
    original: 'të më dridhesh kùshtù si dhe unë;',
    translation: 'May you tremble just as I do (the walled bride\'s curse on the bridge).',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/cam-balada-murimit-ura-e-artes.sq.txt',
        match: 'të dridhesh si dridhem unë',
        note: 'Çam ballad of the walled bride at the Bridge of Arta; the same curse is given twice in the source text (lines 96 and 200), the second an exact verbatim match to the game\'s wording.',
      },
    ],
  },

  // ── Maro Përhitura — the Albanian Cinderella (Pralla popullore 1954) ────
  'Pralla popullore shqiptare (1954)': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: 'vjen maro përhitura veshur në flori',
    original: 'lehu qëni edhe tha, që «vjen Maro Perhitura veshur\nnë flori".',
    translation: 'The dog barked and said, "Maro Përhitura is coming, dressed in gold."',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'vjen Maro Perhitura veshur',
      },
    ],
  },
  'pralla-maro-kukudhi': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: "mos u tremb, se s' të ha as kukudhi",
    original: 'edhe nga se do trëmbeç ti? E tilla, që je ti, mos u trëmb, se s të ha as kukudhi tij',
    translation: "Why should you be afraid? A girl like you — don't be afraid, not even the kukudh will eat you.",
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'mos u trëmb\nse s të ha as kukudhi tij',
        note: 'Raw OCR of the 1954 scan (spacing/line-break artifacts as printed); the stepmother taunts Maro before sending her to the night mill. Same file as "Pralla popullore shqiptare (1954)" above.',
      },
    ],
  },
  'pralla-maro-tjerr': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: "ç' është ajo, që tjerr",
    original: 'e pyesnë vajzën e i thanë, që "ç\'është eta, që tjerr?"',
    translation: 'They ask the girl, saying, "what is that, spinning?"',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: "ç'është eta, që tjerr",
        note: 'The scan\'s OCR of "ç\'është ajo" reads "eta"; the xhindet\'s first question to Maro at the mill.',
      },
    ],
  },
  'pralla-maro-mundim': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: "të thuash, se ç' mundim ka",
    original: 'I thon ata, që "ë rthuaç, se ç\' mundim ka", se ata xhinërit duajnë t\'i gjenjën nonjë shkak',
    translation: 'They say to her, "tell us what toil it is" — for the xhindet want to catch her out in some fault.',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: "se ç' mundim ka",
        note: 'The xhindet press Maro to tell her tale of toil; same page as the flax litany below.',
      },
    ],
  },
  'lirit-vemefurke': {
    label: 'mundimi i lirit — Pralla popullore shqiptare (1954)',
    game: 'pa e vëmë në furkë, pa e tjerrim',
    original: 'p a e heqim me llanar, pa e bejmë shtullungë, pa e vëmë në furkë, pa e bëjmë lemsh, pa e tjerrim',
    translation: 'and then we set it on the distaff, and then we spin it (round two of Maro\'s litany).',
    fidelity: 'adapted',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'pa e vëmë në furkë',
        note: 'From the same ~25-step litany as "mundimi i lirit — Pralla popullore shqiptare (1954)" above; the game selects vëmë në furkë / tjerrim as round two\'s two representative verbs.',
      },
    ],
  },
  'lirit-veshim': {
    label: 'mundimi i lirit — Pralla popullore shqiptare (1954)',
    game: 'pa e lajmë, pa e presim, pa e qepim, pa e veshim',
    original: 'pa e marrëm, pa e lajmë, pa e presim, pa e\nqepim, pa e veshim',
    translation: 'and then we wash it, and then we cut it, and then we sew it, and then we wear it (round three, the litany\'s close).',
    fidelity: 'adapted',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'pa e marrëm, pa e lajmë, pa e presim, pa e\nqepim, pa e veshim',
        note: 'The litany\'s final steps, the same sentence as "mundimi i lirit — Pralla popullore shqiptare (1954)" above; the game trims the opening "pa e marrëm" (we take it up) since round three opens on wash/cut/sew/wear.',
      },
    ],
  },
  'pralla-maro-lajmi': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: "unë s' jam për atje",
    original: 'edhe ejo u tha, që "u s\' janë për atje, po të veni ju, që jeni të mira"',
    translation: 'and she told them, "I am not for there — you go, you who are the pretty ones."',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: "u s' janv\npër atje",
        note: 'The scan\'s OCR reads janë as "janv"; Maro\'s deflection when her stepsisters mock her over the prince\'s feast.',
      },
    ],
  },
  'pralla-maro-krushqit': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: 'ti je gruaja ime',
    original: 'edhe ashtu i tha, që "shko, se do vemi në pallat tim, edhe ti je gruaja ime, edhe u jam burri yt".',
    translation: '"Come," he told her, "for we go to my palace, and you are my wife, and I am your husband."',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'edhe ti je gruaja ime, edhe u jam burri',
        note: 'The prince\'s recognition once the shoe and the golden clothes fit her alone.',
      },
    ],
  },
  'pralla-maro-ciuciu': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: "ciu ciu, djal' i mëmës",
    original: "ciu ciu, djal' i mëmës",
    translation: 'cheep, cheep, mother\'s own boy (the bird-wife\'s song at the window).',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: "ciu ciu, djal' i mëmës",
        note: 'Verbatim; the needled Maro, turned bird, sings this at her son\'s window while the false wife sleeps in her bed.',
      },
    ],
  },
  'pralla-maro-fundi': {
    label: 'Maro Përhitura — Pralla popullore shqiptare (1954)',
    game: 'unë jam gruaja jote',
    original: "I tho'ë ajo, që «u jam gruaja jote, princesha, që bëra djalën»",
    translation: 'She told him, "I am your wife, the princess who bore your son."',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'u jam gruaja jote',
        note: 'Maro\'s own declaration once the needle is drawn from her bird-head and she has her voice back — the reversed-voice echo of the prince\'s own words at maroKrushqit ("ti je gruaja ime").',
      },
    ],
  },
  'mundimi i lirit — Pralla popullore shqiptare (1954)': {
    label: 'mundimi i lirit — Pralla popullore shqiptare (1954)',
    game: 'pa e mbjellim, pa e mbledhim, pa e lidhim',
    original: "punojmë dhen, pa e kthejmë, pa e mbjellëm, pa e tëharrim... pa e mbledhim, pa e lidhim, pa e shtypi[m]",
    translation: 'We work the field, plough it, sow it, harrow it... gather it, bind it, thresh it (Maro\'s patient litany of the flax\'s toil, the xhindet\'s test).',
    fidelity: 'adapted',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'pa e mbledhim, pa e lidhim, pa e shtypi',
        note: 'From Maro\'s full litany of ~25 steps ("pa e kthejmë, pa e mbjellëm, pa e tëharrim, pa e shkulim... pa e mbledhim, pa e lidhim, pa e shtypim..."); the game groups sow/gather/bind as the first of three rounds (Litani1/2/3), selecting three representative verbs from the longer chain rather than quoting it in full.',
      },
    ],
    note:
      "This id is reused at maroLitani2 for round two — \"pa e vëmë në furkë, pa e tjerrim\" (source: \"pa e vëmë në furkë\", verbatim) — and at maroLitani3 for round three — \"pa e lajmë, pa e presim, pa e qepim, pa e veshim\" (source: \"pa e marrëm, pa e lajmë, pa e presim, pa e\\nqepim, pa e veshim\", verbatim). All three resolve under this shared id but would need distinct ids (e.g. suffixed -1/-2/-3) to each pass a per-line wording check.",
  },
  'porosia e tetos — Pralla popullore shqiptare (1954)': {
    label: 'porosia e tetos — Pralla popullore shqiptare (1954)',
    game: 'kur të bjerë mesnata, kuajt bëhen minj, karroca bëhet kungull',
    original: 'po mbete atje, e ra sahati dymbëdhjetë, kualtë do të bëhen, mij, edhe karroca do bëhet kungull, edhe karrocerët do bëhen karkalecë,',
    translation: "If you stay past midnight, the horses will become mice, and the coach will become a pumpkin, and the coachmen will become grasshoppers (the sorceress aunt's deadline).",
    fidelity: 'adapted',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'kualtë do të bëhen, mij, edhe\nkarroca do bëhet kungull',
        note: '"mij" is the scan\'s OCR of "minj" (mice); the game trims the coachmen-into-grasshoppers clause.',
      },
    ],
  },
  'mbyllja e përrallës — Pralla popullore shqiptare (1954)': {
    label: 'mbyllja e përrallës — Pralla popullore shqiptare (1954)',
    game: 'edhe janë sot e gjithë ditën',
    original: 'edhe janë sot e gjithë ditën.',
    translation: 'And they are, to this very day. (The 1954 book\'s closing formula.)',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'edhe janë sot e gjithë ditën.',
        note: 'The tale\'s final line.',
      },
    ],
  },
  'mallkimi i Lilos — Pralla popullore shqiptare (1954)': {
    label: 'mallkimi i Lilos — Pralla popullore shqiptare (1954)',
    game: 'ju plasshin sytë',
    original: 'U thotë Lilua, "a li është nuk e shini? Pon u plasnë syt?»',
    translation: 'Lilua answers them, "Can\'t you see what it is? May your eyes burst!" (her rude retort to the xhindet\'s question, which earns her the twisted limbs.)',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/pralla-1954-maro-perhitura.sq.txt',
        match: 'u plasnë syt',
        note: 'The scan\'s OCR of "u plasshin sytë" (optative "may they burst"); the surrounding "Pon..." is itself an OCR mangle of "Po nuk...".',
      },
    ],
  },
}

// The strongest tier of proof an entry carries:
//   'corpus'   — the wording itself is machine-verified in docs/references/
//   'variant'  — a corpus text attests the formula, an external link the wording
//   'external' — link-verified against a printed source we don't hold
//   'oral'     — a living formula, not located in print (the honest weakest tier)
export const quoteTier = (q) => {
  if (q.evidence.some((e) => e.kind === 'corpus' && !e.variant)) return 'corpus'
  if (q.evidence.some((e) => e.kind === 'corpus')) return 'variant'
  if (q.evidence.some((e) => e.kind === 'url')) return 'external'
  return 'oral'
}

// Where "view the proof" should take a reader: the local primary-source file on
// GitHub for corpus-proven quotes, else the first external source link.
export const quoteProofUrl = (q, repoBlob) => {
  const c = q.evidence.find((e) => e.kind === 'corpus' && !e.variant) || q.evidence.find((e) => e.kind === 'corpus')
  if (c) return repoBlob + c.file
  const u = q.evidence.find((e) => e.kind === 'url')
  return u ? u.url : null
}
