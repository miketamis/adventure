// Exact reviewed physical claims and nonvisual dispositions, one record per source line.
export default Object.freeze([
  {
    "id": "description:deti1:0",
    "nodeId": "deti1",
    "lineIndex": 0,
    "placeId": "deti1",
    "text": "ti ngjitesh lart nga uji.",
    "conditions": {
      "all": [
        "from:detiThelle1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player emerges upward from the water to this coast."
  },
  {
    "id": "description:deti1:1",
    "nodeId": "deti1",
    "lineIndex": 1,
    "placeId": "deti1",
    "text": "ti ke dëgjuar fjalët: ja deti.",
    "conditions": {
      "all": [
        "rumor"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Previously heard words identify the sea; hearing them does not create a separate speaker here."
  },
  {
    "id": "description:deti1:2",
    "nodeId": "deti1",
    "lineIndex": 2,
    "placeId": "deti1",
    "text": "lumi vjen në det.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "coastal-river-mouth",
        "asset": "river",
        "label": "River mouth",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, River mouth; only the represented moment is staged."
  },
  {
    "id": "description:deti1:3",
    "nodeId": "deti1",
    "lineIndex": 3,
    "placeId": "deti1",
    "text": "larg, një anije lëviz nëpër detin e madh dhe të thellë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:sea-ship"
      ],
      "observationId": "sea-ship"
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "distant-ship",
        "asset": "ship",
        "label": "Distant ship",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Distant ship; only the represented moment is staged."
  },
  {
    "id": "description:deti1:4",
    "nodeId": "deti1",
    "lineIndex": 4,
    "placeId": "deti1",
    "text": "Njerëzit thonë: poshtë rri Bukura e detit, dhe Bukura ka dy motra, një në tokë dhe një në qiell.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The Beauty of the Sea and her two sisters are reported lore; none is asserted present at this shore."
  },
  {
    "id": "description:deti1:5",
    "nodeId": "deti1",
    "lineIndex": 5,
    "placeId": "deti1",
    "text": "një fshat i vogël rri këtu, afër ujit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coast-village",
        "asset": "village",
        "label": "Coastal village",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal village, Sea surrounding the coast; only the represented moment is staged."
  },
  {
    "id": "description:deti1:6",
    "nodeId": "deti1",
    "lineIndex": 6,
    "placeId": "deti1",
    "text": "afër, njerëzit bëjnë kripë nga uji.",
    "conditions": {
      "all": [
        "visited:kripore1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-workers",
        "asset": "human",
        "label": "Salt workers",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal salt pans, Salt workers; only the represented moment is staged."
  },
  {
    "id": "description:deti1:7",
    "nodeId": "deti1",
    "lineIndex": 7,
    "placeId": "deti1",
    "text": "Ali Pasha rri në liqen. Ali Pasha lufton një mbret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Ali Pasha’s lake battle is reported elsewhere, not staged beside this sea shore."
  },
  {
    "id": "description:deti1:8",
    "nodeId": "deti1",
    "lineIndex": 8,
    "placeId": "deti1",
    "text": "dielli zbret në det: deti bëhet i kuq.",
    "conditions": {
      "all": [
        "became:dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "setting-sun",
        "asset": "sun",
        "label": "Sun setting into the horizon",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Sunset is visible over the sea."
  },
  {
    "id": "description:deti1:9",
    "nodeId": "deti1",
    "lineIndex": 9,
    "placeId": "deti1",
    "text": "dielli bie në det dhe nata vjen.",
    "conditions": {
      "all": [
        "became:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "setting-sun",
        "asset": "sun",
        "label": "Sun setting into the horizon",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Sunset is visible over the sea."
  },
  {
    "id": "description:deti1:10",
    "nodeId": "deti1",
    "lineIndex": 10,
    "placeId": "deti1",
    "text": "natën hëna bën një rrugë të bardhë mbi detin.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sea-moon",
        "asset": "moon",
        "label": "Moon above the sea",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      },
      {
        "key": "coastal-sea",
        "property": "reflection",
        "value": "moon"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Moonlight makes a white reflection on the water."
  },
  {
    "id": "description:deti1:11",
    "nodeId": "deti1",
    "lineIndex": 11,
    "placeId": "deti1",
    "text": "dielli është mbi detin.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sea-sun",
        "asset": "sun",
        "label": "Sun above the sea",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Sun above the sea; only the represented moment is staged."
  },
  {
    "id": "description:deti1:12",
    "nodeId": "deti1",
    "lineIndex": 12,
    "placeId": "deti1",
    "text": "është muzg: deti është i kuq dhe i artë. deti është i bukur.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Dusk colors the sea red and gold."
  },
  {
    "id": "description:deti1:13",
    "nodeId": "deti1",
    "lineIndex": 13,
    "placeId": "deti1",
    "text": "është agim: një dritë e artë bie mbi detin e qetë.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The still sea catches golden dawn light."
  },
  {
    "id": "description:deti1:14",
    "nodeId": "deti1",
    "lineIndex": 14,
    "placeId": "deti1",
    "text": "larg, një anije lëviz nëpër detin e madh dhe të thellë.",
    "conditions": {
      "all": [
        "observed:sea-ship",
        "arrival:action:observation:sea-ship"
      ],
      "negate": false,
      "none": [],
      "observationId": "sea-ship"
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "distant-ship",
        "asset": "ship",
        "label": "Distant ship",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Distant ship; only the represented moment is staged."
  },
  {
    "id": "description:detiThelle1:0",
    "nodeId": "detiThelle1",
    "lineIndex": 0,
    "placeId": "detiThelle1",
    "text": "ti zbret në det.",
    "conditions": {
      "all": [
        "from:detiThelle2"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-sea-water",
        "asset": "water",
        "label": "Deep sea water",
        "zone": "around",
        "attributes": {
          "color": "#244e62"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The ascent or descent remains in the dark sea at this intermediate location."
  },
  {
    "id": "description:detiThelle1:1",
    "nodeId": "detiThelle1",
    "lineIndex": 1,
    "placeId": "detiThelle1",
    "text": "ti vjen lart nga kalaja.",
    "conditions": {
      "all": [
        "from:detiThelle2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-sea-water",
        "asset": "water",
        "label": "Deep sea water",
        "zone": "around",
        "attributes": {
          "color": "#244e62"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The ascent or descent remains in the dark sea at this intermediate location."
  },
  {
    "id": "description:detiThelle1:2",
    "nodeId": "detiThelle1",
    "lineIndex": 2,
    "placeId": "detiThelle1",
    "text": "Nëpër detin e errët vjen një kulshedër e detit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-sea-water",
        "asset": "water",
        "label": "Deep sea water",
        "zone": "around",
        "attributes": {
          "color": "#244e62"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sea-kulshedra",
        "asset": "dragon",
        "label": "Sea-Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#315f68"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Deep sea water, Sea-Kulshedra; only the represented moment is staged."
  },
  {
    "id": "description:detiThelle1:3",
    "nodeId": "detiThelle1",
    "lineIndex": 3,
    "placeId": "detiThelle1",
    "text": "poshtë është një kala.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-castle",
        "asset": "fortress",
        "label": "Underwater castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "sea-castle",
        "kind": "below",
        "target": "viewer"
      }
    ],
    "disposition": "physical",
    "rationale": "The castle is below the underwater viewpoint."
  },
  {
    "id": "description:detiThelle2:0",
    "nodeId": "detiThelle2",
    "lineIndex": 0,
    "placeId": "detiThelle2",
    "text": "Në një kala në det, rri Bukura e detit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-castle",
        "asset": "fortress",
        "label": "Underwater castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Underwater castle, Beauty of the Sea; only the represented moment is staged."
  },
  {
    "id": "description:detiThelle2:1",
    "nodeId": "detiThelle2",
    "lineIndex": 1,
    "placeId": "detiThelle2",
    "text": "bukura ka flokë ari, dhe këtu është shumë ar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sea-gold",
        "asset": "gold",
        "label": "Gold in the castle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Sea, Gold in the castle; only the represented moment is staged."
  },
  {
    "id": "description:detiThelle2:2",
    "nodeId": "detiThelle2",
    "lineIndex": 2,
    "placeId": "detiThelle2",
    "text": "Uji lëkundet, dhe drita e arit kalon përmes tij.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-sea-water",
        "asset": "water",
        "label": "Deep sea water",
        "zone": "around",
        "attributes": {
          "color": "#244e62"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sea-gold",
        "asset": "gold",
        "label": "Gold glowing through water",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Rippling water carries reflected light from the gold."
  },
  {
    "id": "description:detiThelle2:3",
    "nodeId": "detiThelle2",
    "lineIndex": 3,
    "placeId": "detiThelle2",
    "text": "ti pyet Bukurën: a do të martohesh me mua? ajo thotë: po.",
    "conditions": {
      "all": [
        "arrival:action:sea-beauty-propose-marriage"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks at the castle before the player chooses to leave; the proposed shore wedding is not already rendered here."
  },
  {
    "id": "description:detiThelle2:4",
    "nodeId": "detiThelle2",
    "lineIndex": 4,
    "placeId": "detiThelle2",
    "text": "Bukura thotë: eja me mua; ne do të dalim bashkë nga det dhe do të martohemi.",
    "conditions": {
      "all": [
        "flag:seaBeautyMarriageAccepted"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks at the castle before the player chooses to leave; the proposed shore wedding is not already rendered here."
  },
  {
    "id": "description:detiThelle2:5",
    "nodeId": "detiThelle2",
    "lineIndex": 5,
    "placeId": "detiThelle2",
    "text": "ti kërko ndihmë nga Bukura. ajo thotë: po.",
    "conditions": {
      "all": [
        "arrival:action:sea-beauty-ask-help"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks at the castle before the player chooses to leave; the proposed shore wedding is not already rendered here."
  },
  {
    "id": "description:detiThelle2:6",
    "nodeId": "detiThelle2",
    "lineIndex": 6,
    "placeId": "detiThelle2",
    "text": "Bukura thotë: eja me mua; unë do të çon lart nga kalaja.",
    "conditions": {
      "all": [
        "flag:seaBeautyHelpAccepted"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks at the castle before the player chooses to leave; the proposed shore wedding is not already rendered here."
  },
  {
    "id": "description:detiNuse:0",
    "nodeId": "detiNuse",
    "lineIndex": 0,
    "placeId": "detiThelle2",
    "text": "ti del nga kalaja me Bukurën, kalon bashkë detin dhe arrin në tokë të thatë.",
    "conditions": {
      "all": [
        "from:detiThelle2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "wedding-shore",
        "asset": "shore",
        "label": "Dry shore",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Sea, Sea surrounding the coast, Dry shore; only the represented moment is staged."
  },
  {
    "id": "description:detiNuse:1",
    "nodeId": "detiNuse",
    "lineIndex": 1,
    "placeId": "detiThelle2",
    "text": "Në tokë të thatë, ti martohesh me Bukurën, dhe ajo të jep një flokë ari.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "golden-hair",
        "asset": "hair",
        "label": "One golden strand of hair",
        "zone": "near",
        "attributes": {
          "color": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Sea, One golden strand of hair; only the represented moment is staged."
  },
  {
    "id": "description:detiStuhi:0",
    "nodeId": "detiStuhi",
    "lineIndex": 0,
    "placeId": "detiThelle1",
    "text": "ti lufton kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-kulshedra",
        "asset": "dragon",
        "label": "Sea-Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#315f68"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "deep-sea-water",
        "asset": "water",
        "label": "Deep sea water",
        "zone": "around",
        "attributes": {
          "color": "#244e62"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea-Kulshedra, Deep sea water; only the represented moment is staged."
  },
  {
    "id": "description:detiStuhi:1",
    "nodeId": "detiStuhi",
    "lineIndex": 1,
    "placeId": "detiThelle1",
    "text": "deti të ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-sea-water",
        "asset": "water",
        "label": "Deep sea water",
        "zone": "around",
        "attributes": {
          "color": "#244e62"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Dark water closes over the player after the losing fight."
  },
  {
    "id": "description:detiStuhi:2",
    "nodeId": "detiStuhi",
    "lineIndex": 2,
    "placeId": "detiThelle1",
    "text": "loja mbaroi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The game ending is a control/status consequence with no additional physical object."
  },
  {
    "id": "description:kripore1:0",
    "nodeId": "kripore1",
    "lineIndex": 0,
    "placeId": "kripore1",
    "text": "ti je afër detit: këtu njerëzit bëjnë kripë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-workers",
        "asset": "human",
        "label": "Salt workers",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Coastal salt pans, Salt workers; only the represented moment is staged."
  },
  {
    "id": "description:kripore1:1",
    "nodeId": "kripore1",
    "lineIndex": 1,
    "placeId": "kripore1",
    "text": "dielli merr ujin dhe kripa rri e bardhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "white-salt",
        "asset": "salt",
        "label": "White salt remaining after evaporation",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal salt pans, White salt remaining after evaporation; only the represented moment is staged."
  },
  {
    "id": "description:kripore1:2",
    "nodeId": "kripore1",
    "lineIndex": 2,
    "placeId": "kripore1",
    "text": "ditën burrat punojnë me kripë nën diell: ka punë për ty.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-workers",
        "asset": "human",
        "label": "Salt workers",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "salt-sun",
        "asset": "sun",
        "label": "Sun over the salt pans",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal salt pans, Salt workers, Sun over the salt pans; only the represented moment is staged."
  },
  {
    "id": "description:kripore1:3",
    "nodeId": "kripore1",
    "lineIndex": 3,
    "placeId": "kripore1",
    "text": "është muzg: burrat shkojnë në shtëpi dhe qielli i kuq bie mbi ujin.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-workers",
        "asset": "human",
        "label": "Departing salt workers",
        "zone": "far",
        "attributes": {
          "pose": "walking"
        },
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The workers leave toward home under a red evening sky."
  },
  {
    "id": "description:kripore1:4",
    "nodeId": "kripore1",
    "lineIndex": 4,
    "placeId": "kripore1",
    "text": "natën hëna bën një rrugë të bardhë mbi ujin.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-moon",
        "asset": "moon",
        "label": "Moon above the pans",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Moonlight reflects in the shallow water."
  },
  {
    "id": "description:kripore1:5",
    "nodeId": "kripore1",
    "lineIndex": 5,
    "placeId": "kripore1",
    "text": "është agim: drita e parë bie mbi kripë të bardhë.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "white-salt",
        "asset": "salt",
        "label": "White salt",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "First dawn light falls on the salt."
  },
  {
    "id": "description:punaKripe:0",
    "nodeId": "punaKripe",
    "lineIndex": 0,
    "placeId": "kripore1",
    "text": "ti bën punë me burrat nën diell.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-workers",
        "asset": "human",
        "label": "Salt workers",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal salt pans, Salt workers; only the represented moment is staged."
  },
  {
    "id": "description:punaKripe:1",
    "nodeId": "punaKripe",
    "lineIndex": 1,
    "placeId": "kripore1",
    "text": "ti bën punë me kripë. burrat japin tetëqind lekë dhe thonë: faleminderit!",
    "conditions": {
      "all": [
        "arrival:money"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "salt-workers",
        "asset": "human",
        "label": "Salt workers",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "salt-wage",
        "asset": "money",
        "label": "Earned 800 lek payment",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The completed salt work earns the payment; the amount is money value, not 800 visible coin meshes."
  },
  {
    "id": "description:punaKripe:2",
    "nodeId": "punaKripe",
    "lineIndex": 2,
    "placeId": "kripore1",
    "text": "Fshati është pas kripë, pranë detit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "salt-pans",
        "asset": "salt-pan",
        "label": "Coastal salt pans",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "coast-village",
        "asset": "village",
        "label": "Village behind the salt pans",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal salt pans, Village behind the salt pans, Sea surrounding the coast; only the represented moment is staged."
  },
  {
    "id": "description:pusi2:0",
    "nodeId": "pusi2",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "ti je në pus.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player is at the bottom of the deep well, unable to climb its steep shaft."
  },
  {
    "id": "description:pusi2:1",
    "nodeId": "pusi2",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "pusi është i madh dhe i thellë: ti nuk mund të ngjitesh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player is at the bottom of the deep well, unable to climb its steep shaft."
  },
  {
    "id": "description:pusi2:2",
    "nodeId": "pusi2",
    "lineIndex": 2,
    "placeId": "pusi2",
    "text": "lart rri vetëm një sy i qiellit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Only the small circular sky opening is visible above the deep shaft."
  },
  {
    "id": "description:pusi2:3",
    "nodeId": "pusi2",
    "lineIndex": 3,
    "placeId": "pusi2",
    "text": "shqiponja rri lart në qiell.",
    "conditions": {
      "all": [
        "shqiponja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Eagle high over the well",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Deep coast well, Eagle high over the well; only the represented moment is staged."
  },
  {
    "id": "description:pusi2:4",
    "nodeId": "pusi2",
    "lineIndex": 4,
    "placeId": "pusi2",
    "text": "ti ngjit rrugën e gjatë dhe arrin në fund të pusit.",
    "conditions": {
      "all": [
        "from:springReturn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player is at the bottom of the deep well, unable to climb its steep shaft."
  },
  {
    "id": "description:shqiponja1:0",
    "nodeId": "shqiponja1",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "shqiponja vjen si një re e zezë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The eagle arrives like a black cloud; the cloud is a simile, not an additional storm cloud."
  },
  {
    "id": "description:shqiponja1:1",
    "nodeId": "shqiponja1",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "shqiponja do mish për rrugën lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The hungry eagle requests meat; the request does not supply meat the player lacks."
  },
  {
    "id": "description:shqiponja1:2",
    "nodeId": "shqiponja1",
    "lineIndex": 2,
    "placeId": "pusi2",
    "text": "vetëm nga këmba jote mund të i japësh mish.",
    "conditions": {
      "all": [
        "mish"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The possible self-sacrifice is described before the choice and must not be rendered as already completed."
  },
  {
    "id": "description:siperfaqja:0",
    "nodeId": "siperfaqja",
    "lineIndex": 0,
    "placeId": "siperfaqja",
    "text": "shqiponja fluturon lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Great eagle; only the represented moment is staged."
  },
  {
    "id": "description:siperfaqja:1",
    "nodeId": "siperfaqja",
    "lineIndex": 1,
    "placeId": "siperfaqja",
    "text": "ti je lart përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The viewpoint has returned to the surface; no duplicate player body is added."
  },
  {
    "id": "description:siperfaqja:2",
    "nodeId": "siperfaqja",
    "lineIndex": 2,
    "placeId": "siperfaqja",
    "text": "është agim: drita bie mbi ujin e ri.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored surface water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The newly restored water reflects the stated time of day."
  },
  {
    "id": "description:siperfaqja:3",
    "nodeId": "siperfaqja",
    "lineIndex": 3,
    "placeId": "siperfaqja",
    "text": "dielli është lart: uji i ri është si argjend.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored surface water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The newly restored water reflects the stated time of day."
  },
  {
    "id": "description:siperfaqja:4",
    "nodeId": "siperfaqja",
    "lineIndex": 4,
    "placeId": "siperfaqja",
    "text": "është muzg: uji i ri bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored surface water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The newly restored water reflects the stated time of day."
  },
  {
    "id": "description:siperfaqja:5",
    "nodeId": "siperfaqja",
    "lineIndex": 5,
    "placeId": "siperfaqja",
    "text": "natën yjet janë në ujin e ri.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored surface water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The newly restored water reflects the stated time of day."
  },
  {
    "id": "description:siperfaqja:6",
    "nodeId": "siperfaqja",
    "lineIndex": 6,
    "placeId": "siperfaqja",
    "text": "Bota ka ndryshuar: tani ka ujë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Water returned to the world",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Water returned to the world; only the represented moment is staged."
  },
  {
    "id": "description:siperfaqja:7",
    "nodeId": "siperfaqja",
    "lineIndex": 7,
    "placeId": "siperfaqja",
    "text": "ti sheh dy rrugë: një shko në det, dhe një tjetër kthehet në fshat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-road",
        "asset": "road",
        "label": "Road to the sea",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "village-road",
        "asset": "road",
        "label": "Road back to village",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The two distinct roads are both visible and lead in different directions."
  },
  {
    "id": "description:mishiVetes:0",
    "nodeId": "mishiVetes",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "mishi mbaroi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "carried-meat",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "absence",
    "rationale": "The carried meat is exhausted; no spare food should be drawn."
  },
  {
    "id": "description:mishiVetes:1",
    "nodeId": "mishiVetes",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "ti preve këmbën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The self-directed cut is the committed consequence; no second standing player is created in front of the viewpoint."
  },
  {
    "id": "description:mishiVetes:2",
    "nodeId": "mishiVetes",
    "lineIndex": 2,
    "placeId": "pusi2",
    "text": "shqiponja fluturon lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Great eagle; only the represented moment is staged."
  },
  {
    "id": "description:rene:0",
    "nodeId": "rene",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "ti bie poshtë.",
    "conditions": {
      "all": [
        "from:pusi2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player’s fall and return downwards move the viewpoint, not another player figure."
  },
  {
    "id": "description:rene:1",
    "nodeId": "rene",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "ti zbret mbrapa poshtë.",
    "conditions": {
      "all": [
        "from:ngjitja1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player’s fall and return downwards move the viewpoint, not another player figure."
  },
  {
    "id": "description:rene:2",
    "nodeId": "rene",
    "lineIndex": 2,
    "placeId": "pusi2",
    "text": "ti je në një det të errët: uji rri i zi dhe i qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "black-water",
        "asset": "water",
        "label": "Still black sea water",
        "zone": "around",
        "attributes": {
          "color": "#132e3b"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The fallen viewpoint is inside the dark water."
  },
  {
    "id": "description:rene:3",
    "nodeId": "rene",
    "lineIndex": 3,
    "placeId": "pusi2",
    "text": "Bukura e Detit vjen si një dritë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The arriving Beauty is compared to light; she remains the same embodied person."
  },
  {
    "id": "description:rene:4",
    "nodeId": "rene",
    "lineIndex": 4,
    "placeId": "pusi2",
    "text": "Bukura thotë: eja me mua; unë do të merr lart nga uji i zi.",
    "conditions": {
      "all": [
        "flag:heardSeaBeautyRescue"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty offers to guide the player; the upward journey is not completed before its choice."
  },
  {
    "id": "description:detiUp:0",
    "nodeId": "detiUp",
    "lineIndex": 0,
    "placeId": "detiThelle2",
    "text": "ti ngjitesh nga kalaja me Bukurën dhe arrin te dritë.",
    "conditions": {
      "all": [
        "from:detiThelle2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "black-water",
        "asset": "water",
        "label": "Black water below the ascent",
        "zone": "below",
        "attributes": {
          "color": "#132e3b"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Sea, Black water below the ascent; only the represented moment is staged."
  },
  {
    "id": "description:detiUp:1",
    "nodeId": "detiUp",
    "lineIndex": 1,
    "placeId": "detiThelle2",
    "text": "ti vjen lart me Bukurën nga uji i zi.",
    "conditions": {
      "all": [
        "from:rene"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sea-beauty",
        "asset": "human",
        "label": "Beauty of the Sea",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#d9b24d"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "black-water",
        "asset": "water",
        "label": "Black water below the ascent",
        "zone": "below",
        "attributes": {
          "color": "#132e3b"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Sea, Black water below the ascent; only the represented moment is staged."
  },
  {
    "id": "description:detiUp:2",
    "nodeId": "detiUp",
    "lineIndex": 2,
    "placeId": "detiThelle2",
    "text": "mbi ujin e zi, era është e freskët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "wind",
        "value": "breeze"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "A cool breeze is perceived above the water; wind has no solid person or building."
  },
  {
    "id": "description:detiUp:3",
    "nodeId": "detiUp",
    "lineIndex": 3,
    "placeId": "detiThelle2",
    "text": "ti sheh dritë: ti je lart përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Light is visible at the surface after ascent."
  },
  {
    "id": "description:detiNgrene:0",
    "nodeId": "detiNgrene",
    "lineIndex": 0,
    "placeId": "detiThelle2",
    "text": "ti merr arin. Deti mbyllet mbi ty dhe të ha.",
    "conditions": {
      "all": [
        "from:detiThelle2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "black-water",
        "asset": "water",
        "label": "Enclosing black water",
        "zone": "around",
        "attributes": {
          "color": "#132e3b"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The water closes around the viewpoint in the fatal consequence."
  },
  {
    "id": "description:detiNgrene:1",
    "nodeId": "detiNgrene",
    "lineIndex": 1,
    "placeId": "detiThelle2",
    "text": "ti vazhdo nëpër ujin e zi. Deti të ha.",
    "conditions": {
      "all": [
        "from:rene"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "black-water",
        "asset": "water",
        "label": "Enclosing black water",
        "zone": "around",
        "attributes": {
          "color": "#132e3b"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "underwater",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The water closes around the viewpoint in the fatal consequence."
  },
  {
    "id": "description:detiNgrene:2",
    "nodeId": "detiNgrene",
    "lineIndex": 2,
    "placeId": "detiThelle2",
    "text": "loja mbaroi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Ending status has no physical mesh."
  },
  {
    "id": "description:ktheu3:0",
    "nodeId": "ktheu3",
    "lineIndex": 0,
    "placeId": "ktheu3",
    "text": "ti del pranë detit përsëri, nën qiellin e hapur; para teje, rruga shkon drejt një kalaje dhe një fshati.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "coast-homeward-road",
        "asset": "road",
        "label": "Road toward castle and village",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Road toward castle and village; only the represented moment is staged."
  },
  {
    "id": "description:ktheu3:1",
    "nodeId": "ktheu3",
    "lineIndex": 1,
    "placeId": "ktheu3",
    "text": "atje rri kalaja e Rozafës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-distant",
        "asset": "fortress",
        "label": "Rozafa castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rozafa castle; only the represented moment is staged."
  },
  {
    "id": "description:ktheu3:2",
    "nodeId": "ktheu3",
    "lineIndex": 2,
    "placeId": "ktheu3",
    "text": "është agim: një dritë e artë bie mbi kalanë dhe mbi fshatin.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-distant",
        "asset": "fortress",
        "label": "Rozafa castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-village",
        "asset": "village",
        "label": "Village below the castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Golden dawn light falls on the distant castle and village."
  },
  {
    "id": "description:ktheu3:3",
    "nodeId": "ktheu3",
    "lineIndex": 3,
    "placeId": "ktheu3",
    "text": "është muzg: qielli bëhet i kuq mbi kalanë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-distant",
        "asset": "fortress",
        "label": "Rozafa castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "A red dusk sky rises above the castle."
  },
  {
    "id": "description:bregu:0",
    "nodeId": "bregu",
    "lineIndex": 0,
    "placeId": "bregu",
    "text": "ti je në një fshat të detit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coast-village",
        "asset": "village",
        "label": "Coastal village",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Coastal village, Sea surrounding the coast; only the represented moment is staged."
  },
  {
    "id": "description:bregu:1",
    "nodeId": "bregu",
    "lineIndex": 1,
    "placeId": "bregu",
    "text": "burrat marrin peshk nga deti.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "fishermen",
        "asset": "human",
        "label": "Fishermen",
        "zone": "front",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "coast-fish",
        "asset": "fish",
        "label": "Caught fish",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Fishermen, Caught fish; only the represented moment is staged."
  },
  {
    "id": "description:bregu:2",
    "nodeId": "bregu",
    "lineIndex": 2,
    "placeId": "bregu",
    "text": "natën burrat nuk dalin: deti është i zi dhe i qetë.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      },
      {
        "key": "fishermen",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The still sea is black; the fishermen stay indoors and are absent from the shore."
  },
  {
    "id": "description:bregu:3",
    "nodeId": "bregu",
    "lineIndex": 3,
    "placeId": "bregu",
    "text": "është agim: burrat dalin në det, dhe uji është i artë.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "fishermen",
        "asset": "human",
        "label": "Fishermen leaving for sea",
        "zone": "front",
        "attributes": {
          "pose": "walking"
        },
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Fishermen depart across dawn-gold water."
  },
  {
    "id": "description:bregu:4",
    "nodeId": "bregu",
    "lineIndex": 4,
    "placeId": "bregu",
    "text": "është muzg: qielli mbi detin bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The sky over the sea turns red and gold at dusk."
  },
  {
    "id": "description:bregu:5",
    "nodeId": "bregu",
    "lineIndex": 5,
    "placeId": "bregu",
    "text": "këtu është një kullë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:coast-tower"
      ],
      "observationId": "coast-tower"
    },
    "objects": [
      {
        "key": "alia-tower",
        "asset": "tower",
        "label": "Gjergj Elez Alia’s tower-house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Gjergj Elez Alia’s tower-house; only the represented moment is staged."
  },
  {
    "id": "description:bregu:6",
    "nodeId": "bregu",
    "lineIndex": 6,
    "placeId": "bregu",
    "text": "në kullë një trim ka nëntë plagë.",
    "conditions": {
      "all": [
        "fact:coastalBalozDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": "coast-tower"
    },
    "objects": [
      {
        "key": "alia-tower",
        "asset": "tower",
        "label": "Gjergj Elez Alia’s tower-house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:gjergj-elez-alia",
        "kind": "inside",
        "target": "alia-tower"
      }
    ],
    "disposition": "physical",
    "rationale": "The wounded hero lies inside the tower."
  },
  {
    "id": "description:bregu:7",
    "nodeId": "bregu",
    "lineIndex": 7,
    "placeId": "bregu",
    "text": "një motër jep ujë trimit.",
    "conditions": {
      "all": [
        "fact:coastalBalozDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "alia-water",
        "asset": "cup",
        "label": "Water offered to the hero",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Gjergj Elez Alia, The hero’s sister, Water offered to the hero; only the represented moment is staged."
  },
  {
    "id": "description:bregu:8",
    "nodeId": "bregu",
    "lineIndex": 8,
    "placeId": "bregu",
    "text": "flokët e motrës kanë gjak.",
    "conditions": {
      "all": [
        "fact:coastalBalozDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "actor:alia-sister",
        "property": "blood",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Blood stains the sister’s hair; it is not her ordinary hair color."
  },
  {
    "id": "description:bregu:9",
    "nodeId": "bregu",
    "lineIndex": 9,
    "placeId": "bregu",
    "text": "burrat thonë: balozi nuk merr më ar, dhi ose vajza.",
    "conditions": {
      "all": [
        "fact:coastalBalozDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "fishermen",
        "asset": "human",
        "label": "Speaking men",
        "zone": "front",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The men report the tribute has ended; gold, goats and tribute victims are not present here."
  },
  {
    "id": "description:bregu:10",
    "nodeId": "bregu",
    "lineIndex": 10,
    "placeId": "bregu",
    "text": "Shiu bie mbi detin dhe kullën.",
    "conditions": {
      "all": [
        "weather:rain"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "alia-tower",
        "asset": "tower",
        "label": "Gjergj Elez Alia’s tower-house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "rain"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Rain falls over the sea and tower."
  },
  {
    "id": "description:bregu:11",
    "nodeId": "bregu",
    "lineIndex": 11,
    "placeId": "bregu",
    "text": "Trimi dhe motra e tij janë në një varr.",
    "conditions": {
      "all": [
        "fact:coastalBalozDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "siblings-grave",
        "asset": "grave",
        "label": "Shared grave of hero and sister",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "After the Baloz is defeated the siblings lie in one grave; they are not living figures beside it."
  },
  {
    "id": "description:balozMotra:0",
    "nodeId": "balozMotra",
    "lineIndex": 0,
    "placeId": "bregu",
    "text": "motra thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister speaks beside the bedridden hero. Her years of care and their emotional bond do not add past meals or a literal shared heart."
  },
  {
    "id": "description:balozMotra:1",
    "nodeId": "balozMotra",
    "lineIndex": 1,
    "placeId": "bregu",
    "text": "trimi quhet Gjergj Elez Alia.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister speaks beside the bedridden hero. Her years of care and their emotional bond do not add past meals or a literal shared heart."
  },
  {
    "id": "description:balozMotra:2",
    "nodeId": "balozMotra",
    "lineIndex": 2,
    "placeId": "bregu",
    "text": "nëntë vjet kanë kaluar. trimi rri ende në kullë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "alia-tower",
        "asset": "tower",
        "label": "Gjergj Elez Alia’s tower-house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same wounded hero remains in the tower after nine years."
  },
  {
    "id": "description:balozMotra:3",
    "nodeId": "balozMotra",
    "lineIndex": 3,
    "placeId": "bregu",
    "text": "unë jam vetëm me trimin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister speaks beside the bedridden hero. Her years of care and their emotional bond do not add past meals or a literal shared heart."
  },
  {
    "id": "description:balozMotra:4",
    "nodeId": "balozMotra",
    "lineIndex": 4,
    "placeId": "bregu",
    "text": "për nëntë vjet unë kam dhënë ujë dhe bukë trimit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister speaks beside the bedridden hero. Her years of care and their emotional bond do not add past meals or a literal shared heart."
  },
  {
    "id": "description:balozMotra:5",
    "nodeId": "balozMotra",
    "lineIndex": 5,
    "placeId": "bregu",
    "text": "unë vajtoj trimin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister speaks beside the bedridden hero. Her years of care and their emotional bond do not add past meals or a literal shared heart."
  },
  {
    "id": "description:balozMotra:6",
    "nodeId": "balozMotra",
    "lineIndex": 6,
    "placeId": "bregu",
    "text": "zemra ime dhe zemra e trimit janë një.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister speaks beside the bedridden hero. Her years of care and their emotional bond do not add past meals or a literal shared heart."
  },
  {
    "id": "description:balozTribut:0",
    "nodeId": "balozTribut",
    "lineIndex": 0,
    "placeId": "bregu",
    "text": "motra thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The sister is the present speaker."
  },
  {
    "id": "description:balozTribut:1",
    "nodeId": "balozTribut",
    "lineIndex": 1,
    "placeId": "bregu",
    "text": "një baloz vjen në detin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The sister recounts the Baloz and its tribute demands at the sea; the monster and its former victims are not in this tower conversation."
  },
  {
    "id": "description:balozTribut:2",
    "nodeId": "balozTribut",
    "lineIndex": 2,
    "placeId": "bregu",
    "text": "balozi donte ar, pastaj dhitë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The sister recounts the Baloz and its tribute demands at the sea; the monster and its former victims are not in this tower conversation."
  },
  {
    "id": "description:balozTribut:3",
    "nodeId": "balozTribut",
    "lineIndex": 3,
    "placeId": "bregu",
    "text": "fshati jep një vajzë balozit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The sister recounts the Baloz and its tribute demands at the sea; the monster and its former victims are not in this tower conversation."
  },
  {
    "id": "description:balozTribut:4",
    "nodeId": "balozTribut",
    "lineIndex": 4,
    "placeId": "bregu",
    "text": "tani balozi do mua!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The sister recounts the Baloz and its tribute demands at the sea; the monster and its former victims are not in this tower conversation."
  },
  {
    "id": "description:balozZgjedh:0",
    "nodeId": "balozZgjedh",
    "lineIndex": 0,
    "placeId": "bregu",
    "text": "motra vajton.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The sister weeps over the wounded hero, with tears reaching his face."
  },
  {
    "id": "description:balozZgjedh:1",
    "nodeId": "balozZgjedh",
    "lineIndex": 1,
    "placeId": "bregu",
    "text": "lotët bien në fytyrën e trimit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The sister weeps over the wounded hero, with tears reaching his face."
  },
  {
    "id": "description:balozZgjedh:2",
    "nodeId": "balozZgjedh",
    "lineIndex": 2,
    "placeId": "bregu",
    "text": "trimi do të luftojë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The hero’s nine wounds are visible; wanting to fight does not yet enact the battle."
  },
  {
    "id": "description:balozZgjedh:3",
    "nodeId": "balozZgjedh",
    "lineIndex": 3,
    "placeId": "bregu",
    "text": "trimi ka nëntë plagë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The hero’s nine wounds are visible; wanting to fight does not yet enact the battle."
  },
  {
    "id": "description:balozZgjedh:4",
    "nodeId": "balozZgjedh",
    "lineIndex": 4,
    "placeId": "bregu",
    "text": "shpata e trimit është këtu.",
    "conditions": {
      "all": [
        "flag:balozSwordGiven"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "alia-sword",
        "asset": "sword",
        "label": "The hero’s sword",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The hero’s sword; only the represented moment is staged."
  },
  {
    "id": "description:balozZgjedh:5",
    "nodeId": "balozZgjedh",
    "lineIndex": 5,
    "placeId": "bregu",
    "text": "Sytë e motrës po të pikojnë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "The hero’s sister",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long",
          "hairColor": "#762f2e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The sister weeps over the wounded hero, with tears reaching his face."
  },
  {
    "id": "description:balozZgjedh:6",
    "nodeId": "balozZgjedh",
    "lineIndex": 6,
    "placeId": "bregu",
    "text": "Trimi merr shpatën dhe thotë: eja me mua në det.",
    "conditions": {
      "all": [
        "flag:balozSwordGiven"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Hero ready to leave",
        "zone": "near",
        "attributes": {
          "wounds": 9,
          "held": "sword"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "alia-sword",
        "asset": "sword",
        "label": "Sword taken by the hero",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The hero takes his own sword and invites the player before departure."
  },
  {
    "id": "description:balozLufte:0",
    "nodeId": "balozLufte",
    "lineIndex": 0,
    "placeId": "balozLufte",
    "text": "është agim, balozi vjen nga deti.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Baloz arrives from the sea at dawn."
  },
  {
    "id": "description:balozLufte:1",
    "nodeId": "balozLufte",
    "lineIndex": 1,
    "placeId": "balozLufte",
    "text": "ti vjen në det me trimin; trimi lufton balozin.",
    "conditions": {
      "all": [
        "from:balozZgjedh"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Fighting hero",
        "zone": "near",
        "attributes": {
          "pose": "attacking",
          "wounds": 9,
          "held": "sword"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea surrounding the coast, Baloz sea-monster, Fighting hero; only the represented moment is staged."
  },
  {
    "id": "description:balozLufte:2",
    "nodeId": "balozLufte",
    "lineIndex": 2,
    "placeId": "balozLufte",
    "text": "balozi thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The monster taunts the living wounded hero; the taunt must not make him a dead body."
  },
  {
    "id": "description:balozLufte:3",
    "nodeId": "balozLufte",
    "lineIndex": 3,
    "placeId": "balozLufte",
    "text": "trimi është një trim i vdekur!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The monster taunts the living wounded hero; the taunt must not make him a dead body."
  },
  {
    "id": "description:balozLufte:4",
    "nodeId": "balozLufte",
    "lineIndex": 4,
    "placeId": "balozLufte",
    "text": "Trimi është mbi kalë. Dy trimat mbajnë armë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "alia-horse",
        "asset": "horse",
        "label": "The hero’s horse",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "alia-held-weapon",
        "asset": "weapon",
        "label": "The hero’s weapon",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "baloz-held-weapon",
        "asset": "weapon",
        "label": "Baloz’s weapon",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:gjergj-elez-alia",
        "kind": "on",
        "target": "alia-horse"
      },
      {
        "subject": "actor:gjergj-elez-alia",
        "kind": "holds",
        "target": "alia-held-weapon"
      },
      {
        "subject": "actor:baloz",
        "kind": "holds",
        "target": "baloz-held-weapon"
      }
    ],
    "disposition": "physical",
    "rationale": "The hero is on his horse and the two combatants hold weapons; the player is not an additional armed hero."
  },
  {
    "id": "description:balozKoke:0",
    "nodeId": "balozKoke",
    "lineIndex": 0,
    "placeId": "balozLufte",
    "text": "ti rri pranë trimit.",
    "conditions": {
      "all": [
        "arrival:action:baloz-stand-by-hero",
        "flag:stoodByGjergj"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player’s exact guarded choice is to stand beside Gjergj; it does not intercept a stone or behead the monster."
  },
  {
    "id": "description:balozKoke:1",
    "nodeId": "balozKoke",
    "lineIndex": 1,
    "placeId": "balozLufte",
    "text": "Balozi hedh armën; kali i trimit bie në gjunjë dhe arma kalon mbi kokën e trimit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "alia-horse",
        "asset": "horse",
        "label": "The hero’s horse",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "baloz-thrown-weapon",
        "asset": "weapon",
        "label": "Weapon passing above the hero",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "alia-horse",
        "property": "pose",
        "value": "kneeling"
      }
    ],
    "relations": [
      {
        "subject": "actor:gjergj-elez-alia",
        "kind": "on",
        "target": "alia-horse"
      }
    ],
    "disposition": "physical",
    "rationale": "Baloz throws a weapon and the hero’s horse kneels so it passes overhead; no stone interception by the player occurs."
  },
  {
    "id": "description:balozKoke:2",
    "nodeId": "balozKoke",
    "lineIndex": 2,
    "placeId": "balozLufte",
    "text": "Trimi godet balozin me armën e tij; pastaj nxjerr shpatën dhe pret kokën e balozit. Balozi vdes.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Gjergj Elez Alia",
        "zone": "near",
        "attributes": {
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Dead, beheaded Baloz",
        "zone": "front",
        "attributes": {
          "color": "#46586b",
          "pose": "dead",
          "headless": true
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "alia-sword",
        "asset": "sword",
        "label": "Gjergj’s sword",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:gjergj-elez-alia",
        "kind": "holds",
        "target": "alia-sword"
      }
    ],
    "disposition": "physical",
    "rationale": "Gjergj strikes then draws his sword and beheads Baloz; the final visible result is the dead, headless monster."
  },
  {
    "id": "description:balozKoke:3",
    "nodeId": "balozKoke",
    "lineIndex": 3,
    "placeId": "balozLufte",
    "text": "fshati është i sigurt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Village safety is the consequence of the victory, not a village appearing at the seashore."
  },
  {
    "id": "description:balozFitore:0",
    "nodeId": "balozFitore",
    "lineIndex": 0,
    "placeId": "bregu",
    "text": "ti kthehesh në kullë, ku trimi dhe motra janë bashkë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "alia-tower",
        "asset": "tower",
        "label": "Gjergj Elez Alia’s tower-house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player returns to the tower; the hero and sister are reunited there before their final embrace."
  },
  {
    "id": "description:balozFitore:1",
    "nodeId": "balozFitore",
    "lineIndex": 1,
    "placeId": "bregu",
    "text": "Trimi përqafon motrën, dhe zemra e trimit dhe zemra e motrës ndalojnë bashkë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:gjergj-elez-alia",
        "asset": "human",
        "label": "Dead hero",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 9
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:alia-sister",
        "asset": "human",
        "label": "Dead sister",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The hero embraces his sister and both die; the final state belongs to those two siblings, not the player."
  },
  {
    "id": "description:balozFitore:2",
    "nodeId": "balozFitore",
    "lineIndex": 2,
    "placeId": "bregu",
    "text": "një varr për dy.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "alia-shared-grave",
        "asset": "grave",
        "label": "One grave for both siblings",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "One grave is shared by the two siblings; the quantity is explicit."
  },
  {
    "id": "description:balozFitore:3",
    "nodeId": "balozFitore",
    "lineIndex": 3,
    "placeId": "bregu",
    "text": "lahuta këndon trimin dhe motrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The epic’s song and praise remember the siblings; the line does not establish an instrument or singer physically beside this grave."
  },
  {
    "id": "description:balozFitore:4",
    "nodeId": "balozFitore",
    "lineIndex": 4,
    "placeId": "bregu",
    "text": "Trim mbi trima ai Gjergj Elez Alia!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The epic’s song and praise remember the siblings; the line does not establish an instrument or singer physically beside this grave."
  },
  {
    "id": "description:bregFle:0",
    "nodeId": "bregFle",
    "lineIndex": 0,
    "placeId": "bregu",
    "text": "ti fle dhe nuk dëgjon detin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player sleeps and cannot hear the sea; no duplicate sleeper is placed before the camera."
  },
  {
    "id": "description:bregFle:1",
    "nodeId": "bregFle",
    "lineIndex": 1,
    "placeId": "bregu",
    "text": "balozi vjen nga uji i zi dhe merr një vajzë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "tribute-maiden",
        "asset": "human",
        "label": "Taken maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Baloz sea-monster, Taken maiden, Sea surrounding the coast; only the represented moment is staged."
  },
  {
    "id": "description:bregFle:2",
    "nodeId": "bregFle",
    "lineIndex": 2,
    "placeId": "bregu",
    "text": "loja mbaroi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Ending status does not add geometry."
  },
  {
    "id": "description:bregHumb:0",
    "nodeId": "bregHumb",
    "lineIndex": 0,
    "placeId": "bregHumb",
    "text": "ti ikën, por Balozi është më i shpejtë; ai të kap pranë detit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The failed escape ends with Baloz catching the player at the sea; it does not silently move elsewhere."
  },
  {
    "id": "description:bregHumb:1",
    "nodeId": "bregHumb",
    "lineIndex": 1,
    "placeId": "bregHumb",
    "text": "Balozi të ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:baloz",
        "asset": "giant",
        "label": "Baloz sea-monster",
        "zone": "front",
        "attributes": {
          "color": "#46586b"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "coastal-sea",
        "asset": "sea",
        "label": "Sea surrounding the coast",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Baloz kills the player after the failed flight; this is the actual fatal encounter, not reported lore."
  },
  {
    "id": "description:bregHumb:2",
    "nodeId": "bregHumb",
    "lineIndex": 2,
    "placeId": "bregHumb",
    "text": "loja mbaroi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Ending status does not add geometry."
  },
  {
    "id": "description:ngjitja1:0",
    "nodeId": "ngjitja1",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "shqiponja fluturon lart në pus.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The carrying eagle ascends inside the same dark well shaft."
  },
  {
    "id": "description:ngjitja1:1",
    "nodeId": "ngjitja1",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "pusi është i madh dhe i errët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The carrying eagle ascends inside the same dark well shaft."
  },
  {
    "id": "description:ngjitja1:2",
    "nodeId": "ngjitja1",
    "lineIndex": 2,
    "placeId": "pusi2",
    "text": "poshtë është vetëm errësirë, pa fund.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dark"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The bottomless-looking dark shaft lies below the moving viewpoint."
  },
  {
    "id": "description:ngjitja2:0",
    "nodeId": "ngjitja2",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "shqiponja është e uritur: krahët bien ngadalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Exhausted eagle",
        "zone": "near",
        "attributes": {
          "pose": "tired"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Exhausted eagle; only the represented moment is staged."
  },
  {
    "id": "description:ngjitja2:1",
    "nodeId": "ngjitja2",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "shqiponja do bukë ose mish.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The eagle requests food; the request does not invent bread or meat."
  },
  {
    "id": "description:ngjitja3:0",
    "nodeId": "ngjitja3",
    "lineIndex": 0,
    "placeId": "pusi2",
    "text": "nata mbaroi dhe vjen dita.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Night gives way to daylight during the ascent."
  },
  {
    "id": "description:ngjitja3:1",
    "nodeId": "ngjitja3",
    "lineIndex": 1,
    "placeId": "pusi2",
    "text": "pusi është lart, po ti sheh dritë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-well",
        "asset": "well",
        "label": "Deep coast well",
        "zone": "center",
        "attributes": {
          "covered": false,
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Light enters from the well’s upper opening."
  },
  {
    "id": "description:ngjitja3:2",
    "nodeId": "ngjitja3",
    "lineIndex": 2,
    "placeId": "pusi2",
    "text": "ti jep bukë",
    "conditions": {
      "all": [
        "arrival:action:story:ngjitja2:jep-buke"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-food",
        "asset": "bread",
        "label": "Bread given to the eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Great eagle, Bread given to the eagle; only the represented moment is staged."
  },
  {
    "id": "description:ngjitja3:3",
    "nodeId": "ngjitja3",
    "lineIndex": 3,
    "placeId": "pusi2",
    "text": "ti jep mish",
    "conditions": {
      "all": [
        "arrival:action:story:ngjitja2:jep-mish"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "carrying-eagle",
        "asset": "eagle",
        "label": "Great eagle",
        "zone": "above",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-food",
        "asset": "meat",
        "label": "Meat given to the eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Great eagle, Meat given to the eagle; only the represented moment is staged."
  },
  {
    "id": "description:ktheu1:0",
    "nodeId": "ktheu1",
    "lineIndex": 0,
    "placeId": "ktheu1",
    "text": "bota ka ujë tani.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water now covers the once dry ground and is calm rather than bloody."
  },
  {
    "id": "description:ktheu1:1",
    "nodeId": "ktheu1",
    "lineIndex": 1,
    "placeId": "ktheu1",
    "text": "uji ishte me gjak, tani është i qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water now covers the once dry ground and is calm rather than bloody."
  },
  {
    "id": "description:ktheu1:2",
    "nodeId": "ktheu1",
    "lineIndex": 2,
    "placeId": "ktheu1",
    "text": "toka nuk është e thatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water now covers the once dry ground and is calm rather than bloody."
  },
  {
    "id": "description:ktheu1:3",
    "nodeId": "ktheu1",
    "lineIndex": 3,
    "placeId": "ktheu1",
    "text": "dielli është mbi botën.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "return-sun",
        "asset": "sun",
        "label": "Sun over the restored world",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Restored calm water, Sun over the restored world; only the represented moment is staged."
  },
  {
    "id": "description:ktheu1:4",
    "nodeId": "ktheu1",
    "lineIndex": 4,
    "placeId": "ktheu1",
    "text": "është agim: një dritë e artë bie mbi ujin e qetë.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The calm water reflects the stated sky and light."
  },
  {
    "id": "description:ktheu1:5",
    "nodeId": "ktheu1",
    "lineIndex": 5,
    "placeId": "ktheu1",
    "text": "është muzg: uji bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The calm water reflects the stated sky and light."
  },
  {
    "id": "description:ktheu1:6",
    "nodeId": "ktheu1",
    "lineIndex": 6,
    "placeId": "ktheu1",
    "text": "natën uji i qetë mban yjet.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "water",
        "label": "Restored calm water",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The calm water reflects the stated sky and light."
  },
  {
    "id": "description:ktheu1:7",
    "nodeId": "ktheu1",
    "lineIndex": 7,
    "placeId": "ktheu1",
    "text": "ti ecën larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "village-return-road",
        "asset": "road",
        "label": "Homeward village road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Homeward village road; only the represented moment is staged."
  },
  {
    "id": "description:ktheu1:8",
    "nodeId": "ktheu1",
    "lineIndex": 8,
    "placeId": "ktheu1",
    "text": "rruga përpara kthehet në fshat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "village-return-road",
        "asset": "road",
        "label": "Homeward village road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Homeward village road; only the represented moment is staged."
  },
  {
    "id": "description:ktheu2:0",
    "nodeId": "ktheu2",
    "lineIndex": 0,
    "placeId": "ktheu2",
    "text": "ti ecën në një rrugë.",
    "conditions": {
      "all": [
        "from:ktheu1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "night-road",
        "asset": "road",
        "label": "Quiet road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Quiet road; only the represented moment is staged."
  },
  {
    "id": "description:ktheu2:1",
    "nodeId": "ktheu2",
    "lineIndex": 1,
    "placeId": "ktheu2",
    "text": "natën hijet ecin në rrugë.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "night-road",
        "asset": "road",
        "label": "Quiet road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Night shadows cross the road; no unmentioned solid people are created."
  },
  {
    "id": "description:ktheu2:2",
    "nodeId": "ktheu2",
    "lineIndex": 2,
    "placeId": "ktheu2",
    "text": "rruga rri e qetë. këtu nuk është njeri.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "night-road",
        "asset": "road",
        "label": "Quiet road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "actor:night-mother",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The road is quiet and explicitly empty."
  },
  {
    "id": "description:ktheu2:3",
    "nodeId": "ktheu2",
    "lineIndex": 3,
    "placeId": "ktheu2",
    "text": "këtu një nënë kërkon një fëmijë.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:night-mother",
        "asset": "human",
        "label": "Mother of the night",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#36343e"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mother is present and seeks a child; the sought child is not supplied."
  },
  {
    "id": "description:ktheu2:4",
    "nodeId": "ktheu2",
    "lineIndex": 4,
    "placeId": "ktheu2",
    "text": "nëna është e keqe.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:night-mother",
        "asset": "human",
        "label": "Mother of the night",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#36343e"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mother is present and seeks a child; the sought child is not supplied."
  },
  {
    "id": "description:ktheu2:5",
    "nodeId": "ktheu2",
    "lineIndex": 5,
    "placeId": "ktheu2",
    "text": "Ora thotë: nëna është nëna e natës.",
    "conditions": {
      "all": [
        "ora"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:ora",
        "asset": "human",
        "label": "Speaking Ora",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#eee8d9"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:night-mother",
        "asset": "human",
        "label": "Mother of the night",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#36343e"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Ora identifies the same night-mother."
  },
  {
    "id": "description:ktheu2:6",
    "nodeId": "ktheu2",
    "lineIndex": 6,
    "placeId": "ktheu2",
    "text": "Ora thotë: kulshedra ishte një gjarpër. shumë vjet pa sy, dhe u bë kulshedër.",
    "conditions": {
      "all": [
        "ora"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:ora",
        "asset": "human",
        "label": "Speaking Ora",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#eee8d9"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Ora tells the Kulshedra’s ancient transformation; no past snake or monster is conjured into the road."
  },
  {
    "id": "description:ktheu2:7",
    "nodeId": "ktheu2",
    "lineIndex": 7,
    "placeId": "ktheu2",
    "text": "ujku sulmon nënën.",
    "conditions": {
      "all": [
        "ujk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:night-mother",
        "asset": "human",
        "label": "Mother of the night",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#36343e"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "companion:wolf",
        "asset": "wolf",
        "label": "Attacking companion wolf",
        "zone": "near",
        "attributes": {
          "pose": "attacking"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Mother of the night, Attacking companion wolf; only the represented moment is staged."
  },
  {
    "id": "description:ktheu2:8",
    "nodeId": "ktheu2",
    "lineIndex": 8,
    "placeId": "ktheu2",
    "text": "nëna ikën.",
    "conditions": {
      "all": [
        "ujk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:night-mother",
        "asset": "human",
        "label": "Departing night-mother",
        "zone": "far",
        "attributes": {
          "gender": "woman",
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Departing night-mother; only the represented moment is staged."
  },
  {
    "id": "description:nenaShtrige:0",
    "nodeId": "nenaShtrige",
    "lineIndex": 0,
    "placeId": "ktheu2",
    "text": "nëna është nëna e natës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:night-mother",
        "asset": "human",
        "label": "Mother of the night",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "color": "#36343e"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Mother of the night; only the represented moment is staged."
  },
  {
    "id": "description:nenaShtrige:1",
    "nodeId": "nenaShtrige",
    "lineIndex": 1,
    "placeId": "ktheu2",
    "text": "nata të merr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dark"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The fatal night closes around the viewpoint; night is not a separate solid figure."
  },
  {
    "id": "description:nenaShtrige:2",
    "nodeId": "nenaShtrige",
    "lineIndex": 2,
    "placeId": "ktheu2",
    "text": "loja mbaroi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Ending status does not add geometry."
  },
  {
    "id": "description:bregu:12",
    "nodeId": "bregu",
    "lineIndex": 12,
    "placeId": "bregu",
    "text": "këtu është një kullë.",
    "conditions": {
      "all": [
        "observed:coast-tower",
        "arrival:action:observation:coast-tower"
      ],
      "negate": false,
      "none": [],
      "observationId": "coast-tower"
    },
    "objects": [
      {
        "key": "coastal-tower",
        "asset": "tower",
        "label": "Tower-house revealed by observation",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The completed observation reveals the local tower; only its declared observation branch depicts it."
  },
{"id":"description:balozKoke:4","nodeId":"balozKoke","lineIndex":4,"placeId":"balozLufte","text":"rruga mbrapa kthehet në kullë.","conditions":{"all":[],"negate":false,"none":[],"observationId":null},"objects":[{"key":"alia-return-road","asset":"road","label":"Road back to the tower","zone":"back","attributes":{},"count":1,"persistence":"place"}],"states":[],"relations":[],"disposition":"physical","rationale":"The ordinary return road leads back toward the existing tower."}
])
