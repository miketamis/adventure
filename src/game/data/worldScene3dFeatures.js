// Reviewed physical depictions, rather than a noun-to-mesh inference. Each
// witness is one exact STORY line and the senses which establish this thing
// there. Offsets and dimensions are schematic artwork, never surveyed facts.
// Conditional witnesses remain conditional in the scene inspector.
// Exact per-feature source review: editing a witness requires reviewing this
// one claim, never renewing an opaque whole-story seal.
const REVIEWED_FEATURE_WITNESSES = Object.freeze({
  "village-bridge": {
    "text": "para teje, një urë kalon mbi lumin dhe të çon në fshat.",
    "conditions": {
      "all": [
        "from:fshatiLumi"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "bridgehead-forest": {
    "text": "mbrapa është një pyll me një rrugë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "clearing-forest": {
    "text": "këtu është një vend i qetë: pylli vazhdon thellë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "forest-canopy": {
    "text": "nën pemët është errët dhe thatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "deep-forest-trees": {
    "text": "pylli është i qetë: vetëm pemët flasin me erën.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "square-well": {
    "text": "ti je në shesh: fshati rri rreth teje, dhe një pus është i thatë.",
    "conditions": {
      "all": [
        "fact:villageWellsRestored"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "square-church": {
    "text": "Nga sheshi sheh kishën lart mbi fshat; pranë teje rrinë një xhami dhe një kullë e orës, që tregon orët dhe minutat.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "square-mosque": {
    "text": "Nga sheshi sheh kishën lart mbi fshat; pranë teje rrinë një xhami dhe një kullë e orës, që tregon orët dhe minutat.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "square-clock-tower": {
    "text": "Nga sheshi sheh kishën lart mbi fshat; pranë teje rrinë një xhami dhe një kullë e orës, që tregon orët dhe minutat.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "spring-basin": {
    "text": "natën, uji i ftohtë rrjedh qetë nga kroi.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "dry-well-shaft": {
    "text": "pusi shkon poshtë thellë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "inn-building": {
    "text": "Bujtina ka tetë dhoma; kjo ka një shtrat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "inn-bed": {
    "text": "Bujtina ka tetë dhoma; kjo ka një shtrat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "working-mill": {
    "text": "Uji e vë mullirin në punë, dhe plaku bën miell për fshatin.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "night-mill-door": {
    "text": "dera rri e hapur. brenda nuk është njeri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "river-bed": {
    "text": "lumi është i thatë.",
    "conditions": {
      "all": [
        "fact:riverRestored"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "river-water-restored": {
    "text": "uji lëviz në lumë përsëri.",
    "conditions": {
      "all": [
        "fact:riverRestored"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "old-bridge": {
    "text": "ti je në një urë.",
    "conditions": {
      "all": [
        "from:uraFshaj|udhaSyri|syriKanali"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "fshaj-bridge": {
    "text": "ura është e fortë: ti mund të kalosh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "fshaj-river-below": {
    "text": "Lumi është poshtë urës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "tomorr-summit": {
    "text": "ti je lart në mal.",
    "conditions": {
      "all": [
        "from:maliStuhi|diellShtepi1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "rozafa-wall": {
    "text": "muri merr Rozafa në gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "lake-surface": {
    "text": "Në liqen është një floçkë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "sea-river-mouth": {
    "text": "lumi vjen në det.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "sea-village": {
    "text": "një fshat i vogël rri këtu, afër ujit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "sacred-sky-mountain": {
    "text": "ti je në një mal të shenjtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "underworld-door": {
    "text": "bota e poshtë është e errët, dhe ti sheh një derë të madhe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "well-bottom": {
    "text": "pusi është i madh dhe i thellë: ti nuk mund të ngjitesh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "serpent-cave": {
    "text": "ti je në një shpellë të madhe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "beauty-court-door": {
    "text": "ti kalo nëpër derën dhe sheh Bukurën; kulshedra e mban këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "cave-entrance": {
    "text": "ti zbret në shpellën.",
    "conditions": {
      "all": [
        "from:shpellaRruget"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    }
  },
  "kordha-palace": {
    "text": "ti je në pallatin e Bukurës: mur mbi mur, dhe asnjë zë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    }
  },
  "prince-palace": {
    "text": "ti shkon me princin në pallatin. dasmë e madhe bëhet me këngë.",
    "conditions": {
      "all": [
        "from:maroKrushqit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    }
  }
})

const witness = (id, nodeId, lineIndex, requires, location) => Object.freeze({
  nodeId, lineIndex, requires, ...REVIEWED_FEATURE_WITNESSES[id], ...(location ? { location } : {}),
})
const localWitness = (nodeId, lineIndex, requires, text, conditions = { all: [], negate: false, none: [], observationId: null }, location) => Object.freeze({
  nodeId, lineIndex, requires, text, conditions, ...(location ? { location } : {}),
})
const visibleFrom = (nodeId, optionIndex, to) => ({ kind: 'visible-from', route: { nodeId, optionIndex, to } })
const crossingEndpoint = Object.freeze({ kind: 'crossing-endpoint' })
const feature = (id, label, nodeId, lineIndex, requires, shape, size, offset = [0, 0, 0], options = {}) => Object.freeze({
  id, label, nodeId, witnesses: Object.freeze(options.witnesses || [witness(id, nodeId, lineIndex, requires)]),
  geometry: Object.freeze({ shape, size }), offset,
  interpretation: 'Reviewed physical feature; dimensions and local offset are illustrative.',
  ...(options.placement ? { placement: Object.freeze(options.placement) } : {}),
  ...(options.relations ? { relations: Object.freeze(options.relations) } : {}),
})

export const WORLD_SCENE_3D_FEATURES = Object.freeze([
  feature('village-bridge', 'Bridge between the forest approach and village bank', 'start', 1, ['ure', 'lume', 'fshat'], 'box', [34, 7, 12], [0, 7, 0], {
    placement: { kind: 'crossing', barrierId: 'central-river', crossingIndex: 0 },
    witnesses: [witness('village-bridge', 'start', 1, ['ure', 'lume', 'fshat'], crossingEndpoint)],
  }),
  feature('bridgehead-forest', 'Forest behind the bridgehead', 'start', 3, ['mbrapa', 'pyll', 'rruge'], 'cone', [22, 30, 22], [-18, 15, 12]),
  feature('clearing-forest', 'Forest around the clearing', 'lendina', 3, ['pyll', 'thelle'], 'cone', [26, 36, 26], [-14, 18, 12]),
  feature('forest-canopy', 'Trees above the forest floor', 'pylli1', 2, ['nen', 'peme', 'erret'], 'cone', [30, 40, 30], [0, 20, 0]),
  feature('deep-forest-trees', 'Trees in the deep forest', 'pylliLoop', 4, ['pyll', 'peme', 'ere'], 'cone', [32, 46, 32], [0, 23, 0]),
  feature('square-well', 'Village well and its descending shaft', 'pusiThate', 4, ['pus', 'poshte', 'thelle'], 'cylinder', [16, 9, 16], [0, -4.5, 0], {
    witnesses: [
      witness('dry-well-shaft', 'pusiThate', 4, ['pus', 'poshte', 'thelle']),
      witness('square-well', 'fshatiSheshi', 0, ['shesh', 'pus', 'thate'], visibleFrom('fshatiSheshi', 5, 'pusiThate')),
      localWitness('fshatiSheshi', 1, ['shesh', 'uje', 'pus'], 'ti je në shesh: uji është përsëri në pus.',
        { all: ['fact:villageWellsRestored'], negate: false, none: [], observationId: null }, visibleFrom('fshatiSheshi', 28, 'pusiThate')),
      localWitness('pusiThate', 0, ['pus', 'thate'], 'një pus është i thatë.',
        { all: ['fact:villageWellsRestored'], negate: true, none: [], observationId: null }),
      localWitness('pusiThate', 1, ['pus', 'uje'], 'pusi ka ujë përsëri.',
        { all: ['fact:villageWellsRestored'], negate: false, none: [], observationId: null }),
    ],
    relations: [{ kind: 'below-ground' }],
  }),
  feature('square-church', 'Church above the village, visible from the square', 'kisha1', 2, ['kishe', 'lart', 'fshat'], 'box', [15, 18, 20], [0, 9, 0], {
    witnesses: [
      witness('square-church', 'fshatiSheshi', 10, ['kishe', 'xhami', 'kulle'], visibleFrom('fshatiSheshi', 11, 'kisha1')),
      localWitness('kisha1', 2, ['kishe', 'lart', 'fshat'], 'Kisha rri lart mbi fshatin; afër rri një teqe.'),
    ],
  }),
  feature('square-mosque', 'Mosque by the square', 'fshatiSheshi', 10, ['kishe', 'xhami', 'kulle'], 'box', [18, 15, 18], [2, 7.5, -18]),
  feature('square-clock-tower', 'Clock tower by the square', 'fshatiSheshi', 10, ['kulle', 'ore', 'minuta'], 'box', [9, 35, 9], [22, 17.5, -15]),
  feature('spring-basin', 'Cold water at the village spring', 'kroi1', 3, ['uje', 'ftohte', 'rrjedh', 'krua'], 'cylinder', [20, 5, 20], [0, 2.5, 0]),
  feature('inn-building', 'Inn with eight rooms', 'bujtina', 8, ['bujtine', 'tete', 'dhome'], 'box', [34, 23, 25], [0, 11.5, 0]),
  feature('inn-bed', 'Bed in the inn room', 'bujtina', 8, ['dhome', 'shtrat'], 'box', [9, 3, 15], [5, 1.5, 0], {
    relations: [{ kind: 'inside', targetId: 'inn-building' }],
  }),
  feature('working-mill', 'Water-powered village mill', 'mulli1', 6, ['uje', 'mulli', 'miell'], 'box', [27, 22, 23], [0, 11, 0]),
  feature('night-mill-door', 'Open door of the night mill', 'maroMulli1', 2, ['dere', 'hap', 'brenda'], 'box', [12, 19, 3], [0, 9.5, -8]),
  feature('river-bed', 'River bed, dry until restored', 'lumi', 1, ['lume', 'thate'], 'plane', [43, 1, 15], [0, 0.5, 12]),
  feature('river-water-restored', 'Water moving in the restored river', 'lumi', 2, ['uje', 'leviz', 'lume', 'perseri'], 'plane', [43, 1, 15], [0, 1.5, 12]),
  feature('fshaj-bridge', 'Fshaj bridge joining both shores', 'uraFshaj', 5, ['ure', 'forte', 'kalo'], 'box', [34, 8, 13], [0, 8, 0], {
    placement: { kind: 'crossing', barrierId: 'fshaj-river', crossingIndex: 0 },
    witnesses: [
      witness('old-bridge', 'ura', 3, ['ure'], crossingEndpoint),
      witness('fshaj-bridge', 'uraFshaj', 5, ['ure', 'forte', 'kalo'], crossingEndpoint),
    ],
  }),
  feature('fshaj-river-below', 'River below the Fshaj bridge', 'uraFshaj', 6, ['lume', 'poshte', 'ure'], 'plane', [42, 1, 19], [0, 0.5, 0], {
    placement: { kind: 'crossing-center', barrierId: 'fshaj-river', crossingIndex: 0 },
    witnesses: [witness('fshaj-river-below', 'uraFshaj', 6, ['lume', 'poshte', 'ure'], crossingEndpoint)],
    relations: [{ kind: 'below', targetId: 'fshaj-bridge', overlap: true, alignedCenter: true }],
  }),
  feature('tomorr-summit', 'Tomorr summit', 'maja', 2, ['lart', 'mal'], 'pyramid', [40, 53, 40], [0, 26.5, 0]),
  feature('rozafa-wall', 'Rozafa in the stone wall', 'kalaMur', 0, ['mur', 'rozafa', 'gur'], 'box', [35, 28, 7], [0, 14, 0]),
  feature('lake-surface', 'Lake of the Floçka', 'flocka1', 0, ['liqen', 'flocka'], 'plane', [48, 1, 35], [0, 0.5, 0]),
  feature('sea-river-mouth', 'River meeting the sea', 'deti1', 2, ['lume', 'det'], 'plane', [48, 1, 34], [0, 0.5, 0]),
  feature('sea-village', 'Village beside the sea', 'bregu', 0, ['fshat', 'det'], 'box', [16, 15, 15], [0, 7.5, 0], {
    witnesses: [
      witness('sea-village', 'deti1', 5, ['fshat', 'afer', 'uje'], visibleFrom('deti1', 0, 'bregu')),
      localWitness('bregu', 0, ['fshat', 'det'], 'ti je në një fshat të detit.'),
    ],
  }),
  feature('sacred-sky-mountain', 'Sacred mountain of the sky threshold', 'qiell1', 0, ['mal', 'shenjte'], 'pyramid', [35, 48, 35], [0, 24, 0]),
  feature('underworld-door', 'Great door in the dark world below', 'bota1', 0, ['bote', 'poshte', 'dere', 'madh'], 'box', [22, 32, 5], [0, 16, 0]),
  feature('well-bottom', 'Large deep well around its bottom', 'pusi2', 1, ['pus', 'madh', 'thelle'], 'cylinder', [30, 15, 30], [0, 7.5, 0]),
  feature('serpent-cave', 'Great cave of the serpent', 'bota2', 0, ['shpelle', 'madh'], 'box', [40, 25, 30], [0, 12.5, 0]),
  feature('beauty-court-door', 'Door into the Earthly Beauty’s court', 'bukura1', 0, ['kalo', 'dere', 'bukura'], 'box', [15, 23, 4], [0, 11.5, -6]),
  feature('cave-entrance', 'Descending cave entrance', 'shpellaHyrje', 0, ['zbrit', 'shpelle'], 'box', [28, 19, 20], [0, 9.5, 0]),
  feature('kordha-palace', 'Walls of the Beauty’s palace', 'kordhaPallat', 0, ['pallat', 'mur'], 'box', [36, 28, 28], [0, 14, 0]),
  feature('prince-palace', 'Palace of the foreign prince', 'maroPallati', 0, ['princ', 'pallat'], 'box', [38, 32, 30], [0, 16, 0]),
])
