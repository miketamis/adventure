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
//               null when the quote is oral tradition with no single book
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
// The generated human-readable ledger lives at docs/quote-proofs.md
// (rebuild with `node scripts/quotecheck.mjs --report`).

export const QUOTES = {
  // ── The Kanun of Lekë Dukagjini (Gjeçovi's codification, 1913–33) ────────
  'kanun-602': {
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
  'kanun-608': {
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
  'kanun-620': {
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
  'kanun-598': {
    label: 'Kanuni i Lekë Dukagjinit, §598',
    game: 'ndera nuk shpërblehet me gjë, por me gjak ose me të falur fisnikisht',
    original: '"Ndera e marrun nuk shperblehet me gja, por a me të derdhun të gjakut, a me të falun fisnikisht."',
    translation: 'Honour taken is not repaid with goods, but either with spilled blood or with noble forgiveness.',
    fidelity: 'adapted',
    source: 'src-kanun-leke',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
        match: '"Ndera e marrun nuk shperblehet me gja, por a me të derdhun të gjakut, a',
        note: 'The game drops "e marrun" (taken), simplifies "a me të derdhun të gjakut" (with the shedding of blood) to "me gjak", and renders the a…a disjunction with ose.',
      },
    ],
  },
  'kanun-609': {
    label: 'Kanuni i Lekë Dukagjinit, §609',
    game: 'zjarri e trungu gati për mik në çdo kohë të natës e të ditës',
    original: 'Buka e krypa e zëmra, zjarmi e trungu e do firi per shtrojë do të gjindet gadi per mik në çdo kohë të natës e të ditës.',
    translation: 'Bread, salt and heart, the fire and the log and some straw for bedding shall stand ready for the guest at any hour of the night and of the day.',
    fidelity: 'adapted',
    source: 'src-kanun-leke',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/kanuni-leke-dukagjinit.sq.txt',
        match: 'zjarmi e trungu e do firi per shtrojë do të gjindet',
        note: 'The game trims the bread-salt-heart opening (quoted separately as kanun-608) and the bedding-straw clause; Gheg zjarmi/gadi rendered zjarri/gati.',
      },
    ],
  },
  'kanun-631': {
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

  // ── Ymer Agë Ulqini — the returning-husband song (Krajë; Wikibooks text) ─
  'ymer-welcome': {
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

  // ── Vajtimi i Ajkunës — Ajkuna's lament (kreshnik cycle; Wikibooks text) ─
  'ajkuna-zogjte': {
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
  'ajkuna-drita': {
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
        note: 'The Wikibooks text glosses shkimte with (shoftë) inline; the game trims the vocative filler "ty, o mori" to "o" and spells hanë → hënë.',
      },
    ],
  },

  'ajkuna-agimi': {
    label: 'Vajtimi i Ajkunës — këngë kreshnike',
    game: "drita ka dalë e dritë s'po bën",
    original: "Drita a dale e drite s'po ben,",
    translation: 'The dawn has come and gives no light — the lament\'s opening line.',
    fidelity: 'verbatim',
    source: 'src-vajtimi-ajkunes',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/vajtimi-i-ajkunes.sq.txt',
        match: 'Drita a dale e drite s’po ben',
        note: 'Gheg "a dale" is standard "ka dalë"; the next verse ("ka le dielli e nuk po nxeh" — the sun has risen and gives no warmth) completes the couplet.',
      },
    ],
  },
  'ajkuna-varri': {
    label: 'Vajtimi i Ajkunës — këngë kreshnike',
    game: 'varrin ta ruan nëna',
    original: 'se ty varrin ta ruen nana,',
    translation: 'for your mother guards your grave,',
    fidelity: 'verbatim',
    source: 'src-vajtimi-ajkunes',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/vajtimi-i-ajkunes.sq.txt',
        match: 'se ty varrin ta ruen nana',
        note: 'Gheg ruen/nana rendered ruan/nëna; the game trims the opening "se ty" (for you).',
      },
    ],
  },
  'ajkuna-burgu': {
    label: 'Vajtimi i Ajkunës — këngë kreshnike',
    game: 'dil një herë nga ky burg i errët',
    original: "dil nji here ksi burgut t'erret,",
    translation: 'come out once from this dark prison — Ajkuna\'s plea at the grave.',
    fidelity: 'verbatim',
    source: 'src-vajtimi-ajkunes',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/vajtimi-i-ajkunes.sq.txt',
        match: 'dil nji here ksi burgut t’erret',
        note: 'Gheg "ksi burgut t\'erret" (from this dark prison) rendered "nga ky burg i errët".',
      },
    ],
  },

  // ── Lahuta e Malcís — Gjergj Fishta (Rome 1958 text) ─────────────────────
  'fishta-invocation': {
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

  // ── Dozon, Manuel de la langue chkipe (1878) — formulas & proverbs ───────
  'dozon-tale-opener': {
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
        note: 'Dozon\'s ç-orthography for sh: "Iç mos iç" = "Ish mos ish". It opens, among others, the very tale the old man in the oda tells (the maiden promised to the Sun: "nœ mbretœréçœ kyœ noûkœ kiç fœmiyœ" — a queen who had no children). Tellers commonly link the pair with e, as the game does.',
      },
    ],
  },
  'dozon-tale-closing': {
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
  'qeni-leh': {
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
  'koha-drejten': {
    label: 'fjalë e urtë (Dozon, 1879)',
    game: 'koha e nxjerr të drejtën',
    original: 'Kôha e nxjer të dréjtënë ("le temps fait connaître la vérité" — Dozon\'s proverb no. 7)',
    translation: 'Time brings out the truth.',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Kôha e nef en dréylœnœ, le temps fait connaître la vérité',
        note: 'The OCR mangles the Albanian ("e nxjer të dréjtënë" reads "e nef en dréylœnœ"); Dozon\'s French gloss on the same line identifies the proverb beyond doubt.',
      },
    ],
  },
  'kush-duron': {
    label: 'fjalë e urtë (Dozon, 1879)',
    game: 'kush duron, trashëgon',
    original: 'Koûç dourôn traçœgén ("Kush duron trashëgon" — Dozon\'s proverb no. 54, from Korça)',
    translation: 'Who endures, inherits (who perseveres, prospers).',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Koûç dourôn traçœgén',
      },
    ],
  },
  'lumi-fle': {
    label: 'fjalë e urtë (Dozon, 1879)',
    game: "lumi fle, hasmi s'fle",
    original: 'Lyoûmi flyé, hásmi s\'flyé ("le fleuve dort, l\'ennemi ne dort pas" — Dozon\'s proverb no. 32, marked as shared with Turkish)',
    translation: 'The river sleeps, the foe does not sleep.',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: 'Lyoûmi flyé, hdsmi',
        note: 'The OCR misreads á as d ("hdsmi") and the second flyé as "(lyé"; the French gloss "le fleuve dort, l\'ennemi ne dort pas" on the same line is legible.',
      },
    ],
  },
  'stambolle': {
    label: 'fjalë e urtë (Dozon, 1879)',
    game: 'duke pyetur gjen Stambollë',
    original: "Douke puétour gye'n Stambôlhœ (\"à force de demander on trouve Stamboul\" — Dozon's proverb no. 20)",
    translation: 'By asking, you find your way to Istanbul.',
    fidelity: 'verbatim',
    source: 'src-dozon-manuel',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/dozon-manuel-langue-chkipe.fr-sq.txt',
        match: "Douke puétour gye'n Stambôlhœ",
      },
    ],
  },
  'gjaku-s-behet-uje': {
    label: 'fjalë e urtë (Hahn, 1854)',
    game: "gjaku s'bëhet ujë",
    original: 'Gjaku nuk bënetë ujë ("das Blut wird nicht zu Wasser" — Hahn\'s Tosk proverb no. 1)',
    translation: 'Blood does not become water — kinship cannot be dissolved.',
    fidelity: 'verbatim',
    source: 'src-hahn-studien',
    evidence: [
      {
        kind: 'corpus',
        file: 'docs/references/hahn-albanesische-studien.de-sq.txt',
        match: 'das Blut wird nicht zu Wasser',
        variant: true,
        note: 'First entry of Hahn\'s "Toskische Sprichwörter, Redensarten und Sentenzen"; the Albanian is printed in Hahn\'s own alphabet, which the OCR destroys, but his German gloss ("wörtl.: das Blut wird nicht zu Wasser") is legible. The proverb lives on in exactly the game\'s standard form.',
      },
    ],
  },
  'trashegofshin': {
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
  'te-hengte-ujku': {
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

  // ── Lambertz, Albanische Märchen (1922) ──────────────────────────────────
  'lambertz-closing': {
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

  // ── The great legends (Albanian texts linked, not held locally) ──────────
  'rozafa-gjiri': {
    label: 'kënga e Rozafës',
    game: 'gjirin e djathtë ma lini jashtë',
    original: 'Gjirin e djathtë ma lini jashtë (the walled mother\'s plea, as the song and Kuteli\'s prose keep it)',
    translation: 'Leave my right breast outside the wall (to nurse my son).',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'url',
        url: 'https://www.voal.ch/legjenda-e-rozafes-nga-mitrush-kuteli/kulture/letersi/',
        label: 'Legjenda e Rozafës — Mitrush Kuteli (full Albanian prose)',
        quote: 'Gjirin e djathtë ma lini jashtë',
      },
      {
        kind: 'corpus',
        file: 'docs/references/hecquard-haute-albanie.fr.txt',
        match: 'laissât allaiter',
        variant: true,
        note: 'Hecquard (1858) attests the legend at Shkodër first-hand: the walled woman "demanda qu\'on lui laissât allaiter encore une fois son enfant à travers un trou de la muraille" — asked to keep nursing her child through a gap in the wall. A French retelling, so it proves the motif, not the Albanian wording.',
      },
    ],
  },
  'doruntina-era': {
    label: 'Kostandini e Doruntina — legjendë',
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
    label: 'Kostandini e Doruntina — legjendë',
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

  // ── Songs and chants of the calendar ─────────────────────────────────────
  'rona-peperona': {
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

  // ── Proverbs quoted from the living tradition (Wikiquote-attested) ───────
  // The public-domain corpus holds Tosk proverb collections (Dozon's supplement,
  // Hahn's "Toskische Sprichwörter"), but Hahn's Albanian is printed in his own
  // alphabet and defeats OCR — so these standards of the spoken tradition are
  // link-verified against Wikiquote's sourced list rather than machine-checked.
  'zoti-vonon': {
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

  // ── Blessings, greetings, riddles of the living voice ────────────────────
  'te-lumte-krahu': {
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
  'njeqind-vjec': {
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
  'mire-se-ju-gjeta': {
    label: 'përgjigjja e mikut — urim i moçëm',
    game: 'mirë se ju gjeta',
    original: 'Mirë se ju gjeta! — the guest\'s set reply to "Mirë se erdhe!"',
    translation: 'Well have I found you! (The fixed response to the welcome the Kanun commands.)',
    fidelity: 'verbatim',
    source: null,
    evidence: [
      {
        kind: 'oral',
        note: 'The universal reply-half of the Albanian greeting pair whose first half the Kanun fixes in §620 (see kanun-620); the pair is standard from the highlands to the south.',
      },
    ],
  },
  'breshka-samar': {
    label: 'gjëegjëzë e moçme',
    game: 'ka samar por nuk është gomar',
    original: "Kam samar, po s'jam gomar. (answer: breshka, the tortoise)",
    translation: 'I have a packsaddle, but I am no donkey.',
    fidelity: 'inflected',
    source: null,
    evidence: [
      {
        kind: 'oral',
        note: 'A standard children\'s gjëegjëzë from the riddle anthologies (the tortoise carries her house-saddle); the game bends the riddle\'s first person ("kam… s\'jam") to the third ("ka… nuk është") because the old man poses it about the creature. Not located in the public-domain corpus.',
      },
    ],
  },
  'bleta-riddle': {
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
