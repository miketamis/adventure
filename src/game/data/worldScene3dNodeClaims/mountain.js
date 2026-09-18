// Exact reviewed source claims for the mountain region; conditional cases remain separate.
export default Object.freeze([
  {
    "id": "description:gbMuji1:0",
    "nodeId": "gbMuji1",
    "lineIndex": 0,
    "placeId": "gbMuji1",
    "text": "Në agim, drita e ftohtë vjen te kali që pret nën dy pemët.",
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
        "key": "mujo-two-trees",
        "asset": "tree",
        "label": "Two sheltering trees",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [
      {
        "subject": "mujo-courser",
        "kind": "under",
        "target": "mujo-two-trees"
      }
    ],
    "disposition": "physical",
    "rationale": "Dawn light reaches the waiting horse beneath exactly two trees."
  },
  {
    "id": "description:gbMuji1:1",
    "nodeId": "gbMuji1",
    "lineIndex": 1,
    "placeId": "gbMuji1",
    "text": "ti je Mujo.",
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
    "rationale": "Mujo is the embodied viewpoint; identity must not create a second Mujo in front of the camera."
  },
  {
    "id": "description:gbMuji1:2",
    "nodeId": "gbMuji1",
    "lineIndex": 2,
    "placeId": "gbMuji1",
    "text": "një armik të godet nëntë herë. ti bie nën dy pemë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-two-trees",
        "asset": "tree",
        "label": "Two sheltering trees",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:enemy",
        "asset": "human",
        "label": "Enemy fighter",
        "zone": "front",
        "attributes": {
          "pose": "attacking"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The enemy strikes the embodied player nine times; nine impacts are an action count, not nine enemies."
  },
  {
    "id": "description:gbMuji1:3",
    "nodeId": "gbMuji1",
    "lineIndex": 3,
    "placeId": "gbMuji1",
    "text": "kali yt rri pranë dhe ka lot në sy.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same loyal horse stays beside the fallen viewpoint."
  },
  {
    "id": "description:gbMuji1:4",
    "nodeId": "gbMuji1",
    "lineIndex": 4,
    "placeId": "gbMuji1",
    "text": "zanat vijnë me qumësht dhe fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zanas",
        "asset": "fairy",
        "label": "Zanas",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "milk-cup",
        "asset": "cup",
        "label": "Cup of milk",
        "zone": "near",
        "attributes": {
          "contents": "milk"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Zanas visibly arrive with milk; the promised strength is not a separate object."
  },
  {
    "id": "description:gbMujiFund:0",
    "nodeId": "gbMujiFund",
    "lineIndex": 0,
    "placeId": "gbMuji1",
    "text": "ti pi qumësht. ti jeton përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "milk-cup",
        "asset": "cup",
        "label": "Cup of milk",
        "zone": "near",
        "attributes": {
          "contents": "milk"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Drinking and recovery belong to the embodied player; only the actual cup is modeled."
  },
  {
    "id": "description:gbMujiFund:1",
    "nodeId": "gbMujiFund",
    "lineIndex": 1,
    "placeId": "gbMuji1",
    "text": "armiku sulmon, por kali yt e godet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:enemy",
        "asset": "human",
        "label": "Enemy fighter",
        "zone": "front",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The horse brings the charging enemy down; the final enemy pose is fallen."
  },
  {
    "id": "description:gbMujiVdes:0",
    "nodeId": "gbMujiVdes",
    "lineIndex": 0,
    "placeId": "gbMuji1",
    "text": "ti ik. armiku të vret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:enemy",
        "asset": "human",
        "label": "Enemy fighter",
        "zone": "front",
        "attributes": {
          "pose": "attacking"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The pursuing enemy kills the viewpoint character; no duplicate player corpse is placed before the camera."
  },
  {
    "id": "description:gbMujiVdes:1",
    "nodeId": "gbMujiVdes",
    "lineIndex": 1,
    "placeId": "gbMuji1",
    "text": "burrat bëjnë gjëmën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mourners",
        "asset": "human",
        "label": "Men making the death-wail",
        "zone": "front",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Men making the death-wail; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetKopshtiZanave:0",
    "nodeId": "binoshetKopshtiZanave",
    "lineIndex": 0,
    "placeId": "binoshetKopshtiZanave",
    "text": "Në pranverë, lulet hapen në Fushën e Zonjave.",
    "conditions": {
      "all": [
        "season:spring"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ladies-field",
        "asset": "field",
        "label": "Field of the Ladies",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "field-flowers",
        "asset": "flower",
        "label": "Spring flowers",
        "zone": "near",
        "attributes": {},
        "count": 12,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Flowers visibly open across the field; twelve stems are an illustrative sample, not an exact count."
  },
  {
    "id": "description:binoshetKopshtiZanave:1",
    "nodeId": "binoshetKopshtiZanave",
    "lineIndex": 1,
    "placeId": "binoshetKopshtiZanave",
    "text": "Handa vjen në Fusha e Zonjave.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ladies-field",
        "asset": "field",
        "label": "Field of the Ladies",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Field of the Ladies, Handa; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetKopshtiZanave:2",
    "nodeId": "binoshetKopshtiZanave",
    "lineIndex": 2,
    "placeId": "binoshetKopshtiZanave",
    "text": "vajzat të bardha tregojnë Handa: Bukura rri në një shpellë poshtë mal.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-maidens",
        "asset": "human",
        "label": "Maidens in white",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#eee8d9"
        },
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maidens speak to Handa. The Beauty and her cave are the reported destination, not present people in the field."
  },
  {
    "id": "description:binoshetKopshtiZanave:3",
    "nodeId": "binoshetKopshtiZanave",
    "lineIndex": 3,
    "placeId": "binoshetKopshtiZanave",
    "text": "Handa do Bukurën. ai shko te ajo.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "far",
        "attributes": {
          "pose": "walking"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa begins the visible departure; his desire does not materialize the distant Beauty."
  },
  {
    "id": "description:binoshetKopshtiZanave:4",
    "nodeId": "binoshetKopshtiZanave",
    "lineIndex": 4,
    "placeId": "binoshetKopshtiZanave",
    "text": "tani ti vjen. vajzat tregojnë: Handa shko poshtë mal.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-maidens",
        "asset": "human",
        "label": "Maidens in white",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#eee8d9"
        },
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The arriving player hears that Handa has already gone; do not leave an extra Handa beside the speakers."
  },
  {
    "id": "description:binoshetKopshtiZanave:5",
    "nodeId": "binoshetKopshtiZanave",
    "lineIndex": 5,
    "placeId": "binoshetKopshtiZanave",
    "text": "poshtë mal ka një kopsht me gardh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "beauty-garden",
        "asset": "garden",
        "label": "Hedged garden",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "beauty-garden",
        "kind": "below",
        "target": "tomorr-mountain"
      }
    ],
    "disposition": "physical",
    "rationale": "The garden lies beneath the mountain as observed from the field."
  },
  {
    "id": "description:binoshetGardhiHanda:0",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 0,
    "placeId": "binoshetGardhiHanda",
    "text": "Në vjeshtë, gjethet mbulojnë tokën pranë gardhit.",
    "conditions": {
      "all": [
        "season:autumn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "hedge-leaves",
        "asset": "leaves",
        "label": "Fallen autumn leaves",
        "zone": "near",
        "attributes": {
          "color": "#ad743d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The leaves cover the ground by the hedge; the sample count is illustrative."
  },
  {
    "id": "description:binoshetGardhiHanda:1",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 1,
    "placeId": "binoshetGardhiHanda",
    "text": "Handa gjen një kopsht me gardh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "beauty-garden",
        "asset": "garden",
        "label": "Hedged garden",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Hedged garden, Garden hedge, Handa; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetGardhiHanda:2",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 2,
    "placeId": "binoshetGardhiHanda",
    "text": "një plakë jep tre prova: një gjëegjëzë, një litar, dhe gardh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:garden-witch",
        "asset": "human",
        "label": "Old woman",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "hairColor": "#aaaaa0"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "test-cord",
        "asset": "rope",
        "label": "Test cord",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The old woman presents three tests; the spoken riddle has no separate physical object."
  },
  {
    "id": "description:binoshetGardhiHanda:3",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 3,
    "placeId": "binoshetGardhiHanda",
    "text": "Handa nuk gjen të drejtën. ai nuk pre litarin. ai nuk kërcen mbi gardhin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "test-cord",
        "asset": "rope",
        "label": "Test cord",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa fails the tests; the cord remains intact and the hedge remains an obstacle."
  },
  {
    "id": "description:binoshetGardhiHanda:4",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 4,
    "placeId": "binoshetGardhiHanda",
    "text": "plaka gurëzon Handa, kalin dhe qenin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {
          "skinColor": "#999b94",
          "clothingColor": "#999b94"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "handa-horse",
        "asset": "horse",
        "label": "Handa’s petrified horse",
        "zone": "near",
        "attributes": {
          "color": "#999b94"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "handa-dog",
        "asset": "dog",
        "label": "Petrified dog",
        "zone": "near",
        "attributes": {
          "color": "#999b94"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa, his horse and dog are petrified, not extra living copies."
  },
  {
    "id": "description:binoshetGardhiHanda:5",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 5,
    "placeId": "binoshetGardhiHanda",
    "text": "ti gjen Handa në gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {
          "skinColor": "#999b94",
          "clothingColor": "#999b94"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "handa-horse",
        "asset": "horse",
        "label": "Handa’s petrified horse",
        "zone": "near",
        "attributes": {
          "color": "#999b94"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "handa-dog",
        "asset": "dog",
        "label": "Petrified dog",
        "zone": "near",
        "attributes": {
          "color": "#999b94"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa, his horse and dog are petrified, not extra living copies."
  },
  {
    "id": "description:binoshetGardhiHanda:6",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 6,
    "placeId": "binoshetGardhiHanda",
    "text": "tani ti provo tre provat.",
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
    "rationale": "The obligation to attempt the tests is a decision prompt, not another visible object."
  },
  {
    "id": "description:binoshetGardhiHanda:7",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 7,
    "placeId": "binoshetGardhiHanda",
    "text": "Pas teje rri Fusha e Zonjave.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ladies-field",
        "asset": "field",
        "label": "Field of the Ladies behind the garden",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Field of the Ladies behind the garden; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetGardhiHanda:8",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 8,
    "placeId": "binoshetGardhiHanda",
    "text": "ti thua të drejtën; plaka thotë: drejtë.",
    "conditions": {
      "all": [
        "arrival:action:binoshet-answer-riddle"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:garden-witch",
        "asset": "human",
        "label": "Old woman",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "hairColor": "#aaaaa0"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The woman acknowledges the player’s answer; the riddle remains spoken language."
  },
  {
    "id": "description:binoshetGardhiHanda:9",
    "nodeId": "binoshetGardhiHanda",
    "lineIndex": 9,
    "placeId": "binoshetGardhiHanda",
    "text": "Litari është i prerë në tokë; gardhi rri para teje.",
    "conditions": {
      "all": [
        "flag:binoshetCordCut"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "test-cord",
        "asset": "rope",
        "label": "Cut cord",
        "zone": "near",
        "attributes": {
          "cut": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The cut cord is on the ground and the remaining hedge is ahead."
  },
  {
    "id": "description:binoshetGardhiZjerma:0",
    "nodeId": "binoshetGardhiZjerma",
    "lineIndex": 0,
    "placeId": "binoshetGardhiHanda",
    "text": "gjëegjëzë është gjetur.",
    "conditions": {
      "all": [
        "flag:binoshetRiddleAnswered"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The previously answered riddle is remembered progress, not a physical prop."
  },
  {
    "id": "description:binoshetGardhiZjerma:1",
    "nodeId": "binoshetGardhiZjerma",
    "lineIndex": 1,
    "placeId": "binoshetGardhiHanda",
    "text": "Litari rri i prerë mbrapa teje.",
    "conditions": {
      "all": [
        "flag:binoshetCordCut"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "test-cord",
        "asset": "rope",
        "label": "Cut cord behind the player",
        "zone": "back",
        "attributes": {
          "cut": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Cut cord behind the player; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetGardhiZjerma:2",
    "nodeId": "binoshetGardhiZjerma",
    "lineIndex": 2,
    "placeId": "binoshetGardhiHanda",
    "text": "me kalë, kërcen mbi gardhin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "handa-horse",
        "asset": "horse",
        "label": "Handa’s horse",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "garden-hedge",
        "asset": "fence",
        "label": "Garden hedge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mounted viewpoint clears the hedge; a second player body is not drawn."
  },
  {
    "id": "description:binoshetGardhiZjerma:3",
    "nodeId": "binoshetGardhiZjerma",
    "lineIndex": 3,
    "placeId": "binoshetGardhiHanda",
    "text": "Në fund, litari e lidh plakën te një pemë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:garden-witch",
        "asset": "human",
        "label": "Old woman",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "hairColor": "#aaaaa0"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "test-cord",
        "asset": "rope",
        "label": "Test cord",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "witch-tree",
        "asset": "tree",
        "label": "Tree holding the bound woman",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:garden-witch",
        "kind": "beside",
        "target": "witch-tree"
      },
      {
        "subject": "test-cord",
        "kind": "around",
        "target": "actor:garden-witch"
      }
    ],
    "disposition": "physical",
    "rationale": "The cord binds the woman to the tree."
  },
  {
    "id": "description:binoshetGardhiZjerma:4",
    "nodeId": "binoshetGardhiZjerma",
    "lineIndex": 4,
    "placeId": "binoshetGardhiHanda",
    "text": "plaka tregon: një zambak i bardhë ka vesë. vesa zgjon njerëzit në gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:garden-witch",
        "asset": "human",
        "label": "Old woman",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "hairColor": "#aaaaa0"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The captive woman describes the lily’s power; the lily is not yet found at this location."
  },
  {
    "id": "description:binoshetZambak:0",
    "nodeId": "binoshetZambak",
    "lineIndex": 0,
    "placeId": "binoshetGardhiHanda",
    "text": "Në agim, vesa shkëlqen mbi zambakun e bardhë.",
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
        "key": "white-lily",
        "asset": "flower",
        "label": "White lily with dew",
        "zone": "near",
        "attributes": {
          "color": "#eee8d9",
          "dew": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
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
    "rationale": "Dawn shines on the white lily and dew."
  },
  {
    "id": "description:binoshetZambak:1",
    "nodeId": "binoshetZambak",
    "lineIndex": 1,
    "placeId": "binoshetGardhiHanda",
    "text": "ti gjen zambakun e bardhë dhe vesën e tij.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-lily",
        "asset": "flower",
        "label": "White lily with dew",
        "zone": "near",
        "attributes": {
          "color": "#eee8d9",
          "dew": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes White lily with dew; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetZambak:2",
    "nodeId": "binoshetZambak",
    "lineIndex": 2,
    "placeId": "binoshetGardhiHanda",
    "text": "qeni i Handa prek zambakun; vesa bie mbi Handa dhe njerëzit të gurëzuar, që zgjohen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-lily",
        "asset": "flower",
        "label": "White lily with dew",
        "zone": "near",
        "attributes": {
          "color": "#eee8d9",
          "dew": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "handa-horse",
        "asset": "horse",
        "label": "Handa’s horse",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "handa-dog",
        "asset": "dog",
        "label": "Handa’s dog",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "awakened-company",
        "asset": "human",
        "label": "Awakened people",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The dog touches the lily and its dew restores the petrified company; living forms replace stone forms."
  },
  {
    "id": "description:binoshetZambak:3",
    "nodeId": "binoshetZambak",
    "lineIndex": 3,
    "placeId": "binoshetGardhiHanda",
    "text": "plaka bëhet një bolla e zezë. ajo tërheq pemën, por bëhet dy dhe vdes.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:garden-witch",
        "asset": "snake",
        "label": "Dead black Bolla",
        "zone": "near",
        "attributes": {
          "color": "#292929",
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "witch-tree",
        "asset": "tree",
        "label": "Tree holding the transformed witch",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The woman transforms into the black Bolla and dies; only her transformed final body is drawn."
  },
  {
    "id": "description:binoshetZambak:4",
    "nodeId": "binoshetZambak",
    "lineIndex": 4,
    "placeId": "binoshetGardhiHanda",
    "text": "burrat thotë: Handa merr Bukurën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "awakened-company",
        "asset": "human",
        "label": "Awakened people",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The people discuss a proposed marriage; the absent Beauty is not added here."
  },
  {
    "id": "description:binoshetZambak:5",
    "nodeId": "binoshetZambak",
    "lineIndex": 5,
    "placeId": "binoshetGardhiHanda",
    "text": "Handa thotë: eja me mua te Bukura.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The same living Handa speaks and invites travel; the arrival at the Beauty remains a later node."
  },
  {
    "id": "description:binoshetZambak:6",
    "nodeId": "binoshetZambak",
    "lineIndex": 6,
    "placeId": "binoshetGardhiHanda",
    "text": "ti pyet Handa: a je mirë? Handa thotë: po. mund të ec.",
    "conditions": {
      "all": [
        "arrival:action:binoshet-ask-handa-well"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The same living Handa speaks and invites travel; the arrival at the Beauty remains a later node."
  },
  {
    "id": "description:binoshetDasma:0",
    "nodeId": "binoshetDasma",
    "lineIndex": 0,
    "placeId": "binoshetGardhiHanda",
    "text": "Në muzg, drita e fundit bie mbi dy kurorat me gjethe.",
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
        "key": "leaf-crowns",
        "asset": "crown",
        "label": "Two woven leaf crowns",
        "zone": "near",
        "attributes": {
          "color": "#51764d"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
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
    "rationale": "The two actual crowns catch the final evening light."
  },
  {
    "id": "description:binoshetDasma:1",
    "nodeId": "binoshetDasma",
    "lineIndex": 1,
    "placeId": "binoshetGardhiHanda",
    "text": "Handa dhe njerëzit shkojnë te shpella. ti shkon me Handa.",
    "conditions": {
      "all": [
        "from:binoshetZambak"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "wedding-company",
        "asset": "human",
        "label": "Awakened wedding party",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "beauty-cave",
        "asset": "cave",
        "label": "Beauty’s cave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Handa, Awakened wedding party, Beauty’s cave; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetDasma:2",
    "nodeId": "binoshetDasma",
    "lineIndex": 2,
    "placeId": "binoshetGardhiHanda",
    "text": "Bukura pret nën një pemë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "beauty-tree",
        "asset": "tree",
        "label": "Tree above the waiting Beauty",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:beauty",
        "kind": "under",
        "target": "beauty-tree"
      }
    ],
    "disposition": "physical",
    "rationale": "The Beauty waits beneath the tree."
  },
  {
    "id": "description:binoshetDasma:3",
    "nodeId": "binoshetDasma",
    "lineIndex": 3,
    "placeId": "binoshetGardhiHanda",
    "text": "Bukura i jep dorën Handës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa and the Beauty join hands at the wedding."
  },
  {
    "id": "description:binoshetDasma:4",
    "nodeId": "binoshetDasma",
    "lineIndex": 4,
    "placeId": "binoshetGardhiHanda",
    "text": "njerëzit që zgjohen bëjnë dy kurora me gjethe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "leaf-crowns",
        "asset": "crown",
        "label": "Two woven leaf crowns",
        "zone": "near",
        "attributes": {
          "color": "#51764d"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "wedding-company",
        "asset": "human",
        "label": "People weaving the crowns",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two woven leaf crowns, People weaving the crowns; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetDasma:5",
    "nodeId": "binoshetDasma",
    "lineIndex": 5,
    "placeId": "binoshetGardhiHanda",
    "text": "Handa dhe Bukura martohen. tani ka festë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "leaf-crowns",
        "asset": "crown",
        "label": "Two woven leaf crowns",
        "zone": "near",
        "attributes": {
          "color": "#51764d"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "wedding-company",
        "asset": "human",
        "label": "Wedding celebration",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Handa, The Beauty, Two woven leaf crowns, Wedding celebration; the camera remains at the canonical place."
  },
  {
    "id": "description:binoshetKuvendi:0",
    "nodeId": "binoshetKuvendi",
    "lineIndex": 0,
    "placeId": "binoshetGardhiHanda",
    "text": "pas nëntë ditësh, Handa mbledh trimat bashkë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "hero-council",
        "asset": "human",
        "label": "Gathered heroes",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The council gathers after nine days; elapsed days are not people."
  },
  {
    "id": "description:binoshetKuvendi:1",
    "nodeId": "binoshetKuvendi",
    "lineIndex": 1,
    "placeId": "binoshetGardhiHanda",
    "text": "Handa pyet ata: shkoni bashkë me ne.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "hero-council",
        "asset": "human",
        "label": "Gathered heroes",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Handa and the assembled heroes exchange commitments; their future journey is not enacted early."
  },
  {
    "id": "description:binoshetKuvendi:2",
    "nodeId": "binoshetKuvendi",
    "lineIndex": 2,
    "placeId": "binoshetGardhiHanda",
    "text": "mbretëria e Zjermës dhe Handës është në duart e një mbreti të huaj.",
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
    "rationale": "The foreign king holds a distant kingdom; he is not a council participant."
  },
  {
    "id": "description:binoshetKuvendi:3",
    "nodeId": "binoshetKuvendi",
    "lineIndex": 3,
    "placeId": "binoshetGardhiHanda",
    "text": "për mbretërinë, ju duhet të hyni në luftë.",
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
    "rationale": "The need to wage war is a future intention, not a battle already occurring here."
  },
  {
    "id": "description:binoshetKuvendi:4",
    "nodeId": "binoshetKuvendi",
    "lineIndex": 4,
    "placeId": "binoshetGardhiHanda",
    "text": "trimat thonë: ne shkojmë me ti dhe Handa.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "hero-council",
        "asset": "human",
        "label": "Gathered heroes",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Handa and the assembled heroes exchange commitments; their future journey is not enacted early."
  },
  {
    "id": "description:binoshetKuvendi:5",
    "nodeId": "binoshetKuvendi",
    "lineIndex": 5,
    "placeId": "binoshetGardhiHanda",
    "text": "ti pyet: a jemi gati? Handa thotë: jemi gati.",
    "conditions": {
      "all": [
        "arrival:action:binoshet-ask-ready-for-war"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "hero-council",
        "asset": "human",
        "label": "Gathered heroes",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Handa and the assembled heroes exchange commitments; their future journey is not enacted early."
  },
  {
    "id": "description:aliBajr1:0",
    "nodeId": "aliBajr1",
    "lineIndex": 0,
    "placeId": "aliBajr1",
    "text": "ti je Ali. ti rri larg.",
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
    "rationale": "Ali is the embodied viewpoint and his distance from the king is narrative context."
  },
  {
    "id": "description:aliBajr1:1",
    "nodeId": "aliBajr1",
    "lineIndex": 1,
    "placeId": "aliBajr1",
    "text": "shtëpia është e qetë, ndërsa gruaja sheh një shenjë në ballë.",
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
        "key": "ali-house",
        "asset": "house",
        "label": "Ali’s family home",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "ali-wife",
        "asset": "human",
        "label": "Ali’s wife",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The wife sees a mark on the embodied player’s brow; no duplicate Ali is placed in the room."
  },
  {
    "id": "description:aliBajr1:2",
    "nodeId": "aliBajr1",
    "lineIndex": 2,
    "placeId": "aliBajr1",
    "text": "gruaja thotë seriozisht: ti je Ali.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ali-wife",
        "asset": "human",
        "label": "Ali’s wife",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Ali’s wife recognizes the player; recognition adds no new person."
  },
  {
    "id": "description:aliBajr1:3",
    "nodeId": "aliBajr1",
    "lineIndex": 3,
    "placeId": "aliBajr1",
    "text": "ti premtove një besë mbretit. tamam gjashtë ditë kanë kaluar. tani ti duhet të kthehesh në burg.",
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
    "rationale": "The oath, six elapsed days and duty to return recall an absent king and prison."
  },
  {
    "id": "description:aliBajr1:4",
    "nodeId": "aliBajr1",
    "lineIndex": 4,
    "placeId": "aliBajr1",
    "text": "ti mendon: kthehu te mbreti, ose rri në shtëpi?",
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
    "rationale": "The return-or-stay thought is an unchosen intention."
  },
  {
    "id": "description:aliBajrFund:0",
    "nodeId": "aliBajrFund",
    "lineIndex": 0,
    "placeId": "aliBajr1",
    "text": "ti kthehesh te mbreti.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Krajl; the camera remains at the canonical place."
  },
  {
    "id": "description:aliBajrFund:1",
    "nodeId": "aliBajrFund",
    "lineIndex": 1,
    "placeId": "aliBajr1",
    "text": "mbreti sheh: ti mban besën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present king sees the oath kept and permits departure; the home is a subsequent destination."
  },
  {
    "id": "description:aliBajrFund:2",
    "nodeId": "aliBajrFund",
    "lineIndex": 2,
    "placeId": "aliBajr1",
    "text": "se besnik ti qenke qenë.",
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
    "rationale": "The source quotation praises fidelity and adds no physical object."
  },
  {
    "id": "description:aliBajrFund:3",
    "nodeId": "aliBajrFund",
    "lineIndex": 3,
    "placeId": "aliBajr1",
    "text": "mbreti të lë të kthehesh në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present king sees the oath kept and permits departure; the home is a subsequent destination."
  },
  {
    "id": "description:aliBajrKeq:0",
    "nodeId": "aliBajrKeq",
    "lineIndex": 0,
    "placeId": "aliBajr1",
    "text": "ti rri në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ali-house",
        "asset": "house",
        "label": "Ali’s family home",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Ali’s family home; the camera remains at the canonical place."
  },
  {
    "id": "description:aliBajrKeq:1",
    "nodeId": "aliBajrKeq",
    "lineIndex": 1,
    "placeId": "aliBajr1",
    "text": "ti nuk mban besën.",
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
    "rationale": "The broken oath is a moral consequence, not geometry."
  },
  {
    "id": "description:aliBajrKeq:2",
    "nodeId": "aliBajrKeq",
    "lineIndex": 2,
    "placeId": "aliBajr1",
    "text": "bija e mbretit pret. ti nuk kthehesh.",
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
    "rationale": "The king’s daughter waits elsewhere; she does not appear in Ali’s home."
  },
  {
    "id": "description:mujoKale:0",
    "nodeId": "mujoKale",
    "lineIndex": 0,
    "placeId": "mujoKale",
    "text": "ti je Mujo.",
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
    "rationale": "Mujo is the embodied viewpoint, not a second visible NPC."
  },
  {
    "id": "description:mujoKale:1",
    "nodeId": "mujoKale",
    "lineIndex": 1,
    "placeId": "mujoKale",
    "text": "ti do kalin: një kalë i bardhë. kali rri larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "far",
        "attributes": {
          "color": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "A white horse stands at a distance; wanting it is internal."
  },
  {
    "id": "description:mujoKale:2",
    "nodeId": "mujoKale",
    "lineIndex": 2,
    "placeId": "mujoKale",
    "text": "kali godet tokën; ylli është tamam mbi syrin e tij.",
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
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "far",
        "attributes": {
          "color": "#eee8d9",
          "eyeStar": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The horse stamps, with its star marking above the eye."
  },
  {
    "id": "description:mujoKale:3",
    "nodeId": "mujoKale",
    "lineIndex": 3,
    "placeId": "mujoKale",
    "text": "një armik ruan kalin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:enemy",
        "asset": "human",
        "label": "Enemy fighter",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "far",
        "attributes": {
          "color": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Enemy fighter, Mujo’s courser; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoKale:4",
    "nodeId": "mujoKale",
    "lineIndex": 4,
    "placeId": "mujoKale",
    "text": "ti mendon: lufto armikun, ose ik larg?",
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
    "rationale": "Fighting or leaving remains an unchosen decision."
  },
  {
    "id": "description:mujoKaleFund:0",
    "nodeId": "mujoKaleFund",
    "lineIndex": 0,
    "placeId": "mujoKale",
    "text": "ti lufton armikun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:enemy",
        "asset": "human",
        "label": "Enemy fighter",
        "zone": "front",
        "attributes": {
          "pose": "attacking"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Enemy fighter; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoKaleFund:1",
    "nodeId": "mujoKaleFund",
    "lineIndex": 1,
    "placeId": "mujoKale",
    "text": "Armiku nuk ruan më kalin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "absence",
    "rationale": "The defeated guard no longer occupies his guarding position."
  },
  {
    "id": "description:mujoKaleFund:2",
    "nodeId": "mujoKaleFund",
    "lineIndex": 2,
    "placeId": "mujoKale",
    "text": "kali rri me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {
          "color": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s courser; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoKaleLarg:0",
    "nodeId": "mujoKaleLarg",
    "lineIndex": 0,
    "placeId": "mujoKale",
    "text": "ti ikën larg.",
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
    "rationale": "The player’s departure changes the viewpoint; no duplicate walking player is added."
  },
  {
    "id": "description:mujoKaleLarg:1",
    "nodeId": "mujoKaleLarg",
    "lineIndex": 1,
    "placeId": "mujoKale",
    "text": "armiku ruan kalin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:enemy",
        "asset": "human",
        "label": "Enemy fighter",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "far",
        "attributes": {
          "color": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The distant guard retains the horse after withdrawal."
  },
  {
    "id": "description:mujoKaleLarg:2",
    "nodeId": "mujoKaleLarg",
    "lineIndex": 2,
    "placeId": "mujoKale",
    "text": "ti nuk merr kalin.",
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
    "rationale": "Failure to acquire the horse is inventory history, not an additional horse."
  },
  {
    "id": "description:halilGarria1:0",
    "nodeId": "halilGarria1",
    "lineIndex": 0,
    "placeId": "halilGarria1",
    "text": "ti je Halili. ti je në varr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-grave",
        "asset": "grave",
        "label": "Halil’s grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Halil is the embodied viewpoint in the grave."
  },
  {
    "id": "description:halilGarria1:1",
    "nodeId": "halilGarria1",
    "lineIndex": 1,
    "placeId": "halilGarria1",
    "text": "një lule vyshket mbi varrin, dhe zogu pret pranë tij.",
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
        "key": "halil-grave",
        "asset": "grave",
        "label": "Halil’s grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "grave-flower",
        "asset": "flower",
        "label": "Withering grave flower",
        "zone": "near",
        "attributes": {
          "withered": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "garria-bird",
        "asset": "bird",
        "label": "Messenger bird",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil’s grave, Withering grave flower, Messenger bird; the camera remains at the canonical place."
  },
  {
    "id": "description:halilGarria1:2",
    "nodeId": "halilGarria1",
    "lineIndex": 2,
    "placeId": "halilGarria1",
    "text": "shtatë vjet kanë kaluar. motra pret ende. një zog gjen varrin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-grave",
        "asset": "grave",
        "label": "Halil’s grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "garria-bird",
        "asset": "bird",
        "label": "Messenger bird",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The bird arrives at the grave; seven elapsed years and the sister’s distant waiting are not local people."
  },
  {
    "id": "description:halilGarria1:3",
    "nodeId": "halilGarria1",
    "lineIndex": 3,
    "placeId": "halilGarria1",
    "text": "zogu thotë: motra dhe nëna presin. ti ke një besë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "garria-bird",
        "asset": "bird",
        "label": "Speaking messenger bird",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The messenger reports the waiting mother and sister without placing them at the grave."
  },
  {
    "id": "description:halilGarria1:4",
    "nodeId": "halilGarria1",
    "lineIndex": 4,
    "placeId": "halilGarria1",
    "text": "ti mendon: zgjohu dhe merr motrën, ose rri në varr?",
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
    "rationale": "Waking or remaining dead is the player’s unchosen decision."
  },
  {
    "id": "description:halilGarriaFund:0",
    "nodeId": "halilGarriaFund",
    "lineIndex": 0,
    "placeId": "jutbina",
    "text": "ti zgjohesh nga varri dhe kthehesh te motra që pret.",
    "conditions": {
      "all": [
        "from:halilGarria1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The return to the sister and home is narrated as the completed journey before the final return to the grave; it does not relocate the terminal camera."
  },
  {
    "id": "description:halilGarriaFund:1",
    "nodeId": "halilGarriaFund",
    "lineIndex": 1,
    "placeId": "jutbina",
    "text": "ti dhe motra shkoni në shtëpi.",
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
    "rationale": "The return to the sister and home is narrated as the completed journey before the final return to the grave; it does not relocate the terminal camera."
  },
  {
    "id": "description:halilGarriaFund:2",
    "nodeId": "halilGarriaFund",
    "lineIndex": 2,
    "placeId": "jutbina",
    "text": "ti kthehesh në varr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-grave",
        "asset": "grave",
        "label": "Halil’s grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil’s grave; the camera remains at the canonical place."
  },
  {
    "id": "description:halilGarriaFund:3",
    "nodeId": "halilGarriaFund",
    "lineIndex": 3,
    "placeId": "jutbina",
    "text": "nëna dhe motra vdesin bashkë.",
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
    "rationale": "The mother and sister die together in the narrated family outcome, not as bodies in Halil’s grave."
  },
  {
    "id": "description:halilGarriaFund:4",
    "nodeId": "halilGarriaFund",
    "lineIndex": 4,
    "placeId": "jutbina",
    "text": "Besa mbahet.",
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
    "rationale": "Keeping besa is a moral result with no additional mesh."
  },
  {
    "id": "description:halilGarriaKeq:0",
    "nodeId": "halilGarriaKeq",
    "lineIndex": 0,
    "placeId": "halilGarria1",
    "text": "ti rri në varr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-grave",
        "asset": "grave",
        "label": "Halil’s grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil’s grave; the camera remains at the canonical place."
  },
  {
    "id": "description:halilGarriaKeq:1",
    "nodeId": "halilGarriaKeq",
    "lineIndex": 1,
    "placeId": "halilGarria1",
    "text": "motra pret ende.",
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
    "rationale": "The sister waits elsewhere while Halil remains in his grave."
  },
  {
    "id": "description:halilGarriaKeq:2",
    "nodeId": "halilGarriaKeq",
    "lineIndex": 2,
    "placeId": "halilGarria1",
    "text": "ti nuk mban besën.",
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
    "rationale": "The broken besa is a nonvisual consequence."
  },
  {
    "id": "description:osmaniBurg:0",
    "nodeId": "osmaniBurg",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "ti je Osmani.",
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
    "rationale": "Osmani is the embodied viewpoint."
  },
  {
    "id": "description:osmaniBurg:1",
    "nodeId": "osmaniBurg",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "nëntë vjet kanë kaluar. ti rri ende në burg, pa diell.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-cell",
        "asset": "interior",
        "label": "Prison chamber",
        "zone": "around",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
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
    "rationale": "The prison remains dark; nine years is duration, not a rendered count."
  },
  {
    "id": "description:osmaniBurg:2",
    "nodeId": "osmaniBurg",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "ti je ende në pranga. vëllezërit rrinë me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-chains",
        "asset": "chain",
        "label": "Prison shackles",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Albanian establishes the embodied player in shackles with his brothers but gives no exact number. Eleven visible brothers are a representative group, not an asserted source quantity."
  },
  {
    "id": "description:osmaniBurg:3",
    "nodeId": "osmaniBurg",
    "lineIndex": 3,
    "placeId": "osmaniBurg",
    "text": "krajli vjen dhe pyet: cili nga ju dogji pallatin tim?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Krajl enters and asks about a past palace fire; no burning palace is placed inside prison."
  },
  {
    "id": "description:osmaniBurg:4",
    "nodeId": "osmaniBurg",
    "lineIndex": 4,
    "placeId": "osmaniBurg",
    "text": "ti mendon: a do të marr çdo faj mbi vete, apo do të iki vetëm?",
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
    "rationale": "Taking blame or fleeing remains a private decision."
  },
  {
    "id": "description:osmaniBurg:5",
    "nodeId": "osmaniBurg",
    "lineIndex": 5,
    "placeId": "osmaniBurg",
    "text": "dritë as diell mos të shohë me sy.",
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
    "rationale": "The quoted sentence denies daylight; it does not add a visible sun to the dark cell."
  },
  {
    "id": "description:osmaniVdekur:0",
    "nodeId": "osmaniVdekur",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "ti i merr të gjithë fajet mbi vete. krajli ju dënon me gjashtë vjet të tjera burg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-cell",
        "asset": "interior",
        "label": "Prison chamber",
        "zone": "around",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The king sentences the embodied player and brothers; six years is the sentence duration."
  },
  {
    "id": "description:osmaniVdekur:1",
    "nodeId": "osmaniVdekur",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "në natën e dymbëdhjetë, ti mbledh duart mbi zemër dhe rri si i vdekur.",
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
    "rationale": "The player lies still feigning death; there is no duplicate player body in first-person view."
  },
  {
    "id": "description:osmaniVdekur:2",
    "nodeId": "osmaniVdekur",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "në mesnatë, vëllezërit bëjnë gjëmën. vajza e krajlit hap burgun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "krajl-daughter",
        "asset": "human",
        "label": "The Krajl’s daughter",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osmani-door",
        "asset": "door",
        "label": "Opened prison door",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
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
    "rationale": "The brothers wail and the daughter opens the door at midnight."
  },
  {
    "id": "description:osmaniProvat:0",
    "nodeId": "osmaniProvat",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "një rojë të sjell para krajlit. krajli pyet: a je vërtet i vdekur?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "A present guard brings the feigning player before the king."
  },
  {
    "id": "description:osmaniProvat:1",
    "nodeId": "osmaniProvat",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "nëntë gjarpërinj rrinë mbi ty. dy zjarre të mëdha djegin lëkurën tënde.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ordeal-serpents",
        "asset": "snake",
        "label": "Nine ordeal serpents",
        "zone": "near",
        "attributes": {},
        "count": 9,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "ordeal-fires",
        "asset": "fire",
        "label": "Two ordeal fires",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Nine ordeal serpents, Two ordeal fires; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniProvat:2",
    "nodeId": "osmaniProvat",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "të ngulin njëzet gozhdë nën thonjtë, dhe del gjak.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ordeal-nails",
        "asset": "nail",
        "label": "Twenty ordeal nails",
        "zone": "near",
        "attributes": {},
        "count": 20,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "ordeal-blood",
        "asset": "blood",
        "label": "Blood from the ordeal",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Twenty nails and actual blood are visible; the camera does not duplicate the player."
  },
  {
    "id": "description:osmaniVallja:0",
    "nodeId": "osmaniVallja",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "ti rri pa lëvizur mes gjarpërinjve, zjarreve dhe gozhdëve.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ordeal-serpents",
        "asset": "snake",
        "label": "Nine ordeal serpents",
        "zone": "near",
        "attributes": {},
        "count": 9,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "ordeal-fires",
        "asset": "fire",
        "label": "Two ordeal fires",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "ordeal-nails",
        "asset": "nail",
        "label": "Twenty ordeal nails",
        "zone": "near",
        "attributes": {},
        "count": 20,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Nine ordeal serpents, Two ordeal fires, Twenty ordeal nails; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniVallja:1",
    "nodeId": "osmaniVallja",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "tridhjetë vajza kërcejnë dhe këndojnë rreth teje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "dancing-maidens",
        "asset": "human",
        "label": "Thirty dancing maidens",
        "zone": "around",
        "attributes": {
          "variant": "woman"
        },
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Thirty dancing maidens; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniVallja:2",
    "nodeId": "osmaniVallja",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "Vajza e krajlit sheh fytyrën tënde dhe buzëqesh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "krajl-daughter",
        "asset": "human",
        "label": "The Krajl’s daughter",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Krajl’s daughter; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniShpata:0",
    "nodeId": "osmaniShpata",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "ti rri pa lëvizur. Vajza e krajlit të mbulon fytyrën. dhe i thotë krajlit: varrose dhe hiqja prangat.",
    "conditions": {
      "all": [
        "flag:osmaniSwordTaken"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "krajl-daughter",
        "asset": "human",
        "label": "The Krajl’s daughter",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "burial-cloth",
        "asset": "cloth",
        "label": "Cloth laid over the player",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The daughter covers the feigning player and commands burial; the command does not prematurely add a grave."
  },
  {
    "id": "description:osmaniShpata:1",
    "nodeId": "osmaniShpata",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "një rojë rri pranë teje me një shpatë në dorë. prangat hiqen.",
    "conditions": {
      "all": [
        "flag:osmaniSwordTaken"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osmani-chains",
        "asset": "chain",
        "label": "Prison shackles",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Prison guard, Prison shackles; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniShpata:2",
    "nodeId": "osmaniShpata",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "roja pyet: a je i vdekur? ti nuk përgjigjesh.",
    "conditions": {
      "all": [
        "flag:osmaniSwordTaken"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard addresses the silent player."
  },
  {
    "id": "description:osmaniShpata:3",
    "nodeId": "osmaniShpata",
    "lineIndex": 3,
    "placeId": "osmaniBurg",
    "text": "kur heqin prangat nga duart e tua, roja lë pa dashje shpatën e zhveshur afër.",
    "conditions": {
      "all": [
        "flag:osmaniSwordTaken"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "guard-sword",
        "asset": "sword",
        "label": "Drawn sword within reach",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "osmani-chains",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The freed hands can reach the accidentally abandoned sword."
  },
  {
    "id": "description:osmaniShpata:4",
    "nodeId": "osmaniShpata",
    "lineIndex": 4,
    "placeId": "osmaniBurg",
    "text": "ti merr shpatën; roja rri larg nga ti.",
    "conditions": {
      "all": [
        "flag:osmaniSwordTaken"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guard-sword",
        "asset": "sword",
        "label": "Taken sword",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Taken sword, Prison guard; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniShpata:5",
    "nodeId": "osmaniShpata",
    "lineIndex": 5,
    "placeId": "osmaniBurg",
    "text": "Prangat e vëllezërve janë afër shpatës.",
    "conditions": {
      "all": [
        "flag:osmaniSwordTaken"
      ],
      "negate": false,
      "none": [
        "flag:osmaniBrothersFreed"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osmani-chains",
        "asset": "chain",
        "label": "Prison shackles",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "guard-sword",
        "asset": "sword",
        "label": "Sword beside the shackles",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Osmani’s brothers, Prison shackles, Sword beside the shackles; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniShpata:6",
    "nodeId": "osmaniShpata",
    "lineIndex": 6,
    "placeId": "osmaniBurg",
    "text": "ti pre prangat e vëllezërve. Vëllezërit thonë: ikim menjëherë bashkë në Jutbina.",
    "conditions": {
      "all": [
        "flag:osmaniBrothersFreed"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "guard-sword",
        "asset": "sword",
        "label": "Sword cutting the chains",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The brothers are freed and invite immediate departure; Jutbina remains the subsequent arrival."
  },
  {
    "id": "description:osmaniZbuluar:0",
    "nodeId": "osmaniZbuluar",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "ti zgjohesh para fundit e mashtrimit.",
    "conditions": {
      "all": [
        "from:osmaniVdekur"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The viewpoint player breaks the pretence; this action creates no separate body."
  },
  {
    "id": "description:osmaniZbuluar:1",
    "nodeId": "osmaniZbuluar",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "ti thirr krajlin gjatë provës.",
    "conditions": {
      "all": [
        "from:osmaniProvat"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The addressed king observes the failed deception."
  },
  {
    "id": "description:osmaniZbuluar:2",
    "nodeId": "osmaniZbuluar",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "ti buzëqesh, dhe vajzat shohin se ti je gjallë.",
    "conditions": {
      "all": [
        "from:osmaniVallja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "dancing-maidens",
        "asset": "human",
        "label": "Thirty observing maidens",
        "zone": "around",
        "attributes": {
          "variant": "woman"
        },
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Thirty observing maidens; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniZbuluar:3",
    "nodeId": "osmaniZbuluar",
    "lineIndex": 3,
    "placeId": "osmaniBurg",
    "text": "ti thirr rojën, dhe roja sjell krajlin.",
    "conditions": {
      "all": [
        "from:osmaniShpata"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The guard brings the king, who sees the player alive."
  },
  {
    "id": "description:osmaniZbuluar:4",
    "nodeId": "osmaniZbuluar",
    "lineIndex": 4,
    "placeId": "osmaniBurg",
    "text": "krajli sheh se ti je gjallë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The guard brings the king, who sees the player alive."
  },
  {
    "id": "description:osmaniZbuluar:5",
    "nodeId": "osmaniZbuluar",
    "lineIndex": 5,
    "placeId": "osmaniBurg",
    "text": "prangat mbyllen përsëri. vëllezërit rrinë në burg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-cell",
        "asset": "interior",
        "label": "Prison chamber",
        "zone": "around",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "osmani-chains",
        "asset": "chain",
        "label": "Prison shackles",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Prison chamber, Prison shackles, Osmani’s brothers; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniLiri:0",
    "nodeId": "osmaniLiri",
    "lineIndex": 0,
    "placeId": "osmaniLiri",
    "text": "Pas jush, dera e burgut të tmerrshëm kërcet dhe mbyllet.",
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
        "key": "osmani-door",
        "asset": "door",
        "label": "Prison door behind the escape",
        "zone": "back",
        "attributes": {
          "open": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Prison door behind the escape; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniLiri:1",
    "nodeId": "osmaniLiri",
    "lineIndex": 1,
    "placeId": "osmaniLiri",
    "text": "vëllezërit ikin nga burgu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "escape-road",
        "asset": "road",
        "label": "Road to Jutbina",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The freed brothers leave prison together toward Jutbina."
  },
  {
    "id": "description:osmaniLiri:2",
    "nodeId": "osmaniLiri",
    "lineIndex": 2,
    "placeId": "osmaniLiri",
    "text": "ti dhe vëllezërit shkoni në Jutbina.",
    "conditions": {
      "all": [
        "from:osmaniShpata"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "escape-road",
        "asset": "road",
        "label": "Road to Jutbina",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The freed brothers leave prison together toward Jutbina."
  },
  {
    "id": "description:osmaniRob:0",
    "nodeId": "osmaniRob",
    "lineIndex": 0,
    "placeId": "osmaniBurg",
    "text": "ti ikën vetëm. krajli të kap.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Krajl captures the escaping player."
  },
  {
    "id": "description:osmaniRob:1",
    "nodeId": "osmaniRob",
    "lineIndex": 1,
    "placeId": "osmaniBurg",
    "text": "ti rri në burg shumë vjet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-cell",
        "asset": "interior",
        "label": "Prison chamber",
        "zone": "around",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Prison chamber; the camera remains at the canonical place."
  },
  {
    "id": "description:osmaniRob:2",
    "nodeId": "osmaniRob",
    "lineIndex": 2,
    "placeId": "osmaniBurg",
    "text": "vëllezërit rrinë në burg ende.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osmani-cell",
        "asset": "interior",
        "label": "Prison chamber",
        "zone": "around",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "osmani-brothers",
        "asset": "human",
        "label": "Osmani’s brothers (representative group)",
        "zone": "near",
        "attributes": {},
        "count": 11,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Prison chamber, Osmani’s brothers; the camera remains at the canonical place."
  },
  {
    "id": "description:haliliDeka:0",
    "nodeId": "haliliDeka",
    "lineIndex": 0,
    "placeId": "jutbina",
    "text": "ti je Halili. ti rri në Jutbina.",
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
    "rationale": "Halil is the embodied viewpoint in Jutbina."
  },
  {
    "id": "description:haliliDeka:1",
    "nodeId": "haliliDeka",
    "lineIndex": 1,
    "placeId": "jutbina",
    "text": "Osmani vjen. Osmani thotë: dil në mejdan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osmani",
        "asset": "human",
        "label": "Osmani",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Osmani urges a duel and falsely reports Mujo’s death; no dead Mujo is shown."
  },
  {
    "id": "description:haliliDeka:2",
    "nodeId": "haliliDeka",
    "lineIndex": 2,
    "placeId": "jutbina",
    "text": "Osmani thotë: Mujo vdes. por Osmani nuk mban besë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osmani",
        "asset": "human",
        "label": "Osmani",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Osmani urges a duel and falsely reports Mujo’s death; no dead Mujo is shown."
  },
  {
    "id": "description:haliliDeka:3",
    "nodeId": "haliliDeka",
    "lineIndex": 3,
    "placeId": "jutbina",
    "text": "Zadran rri në mejdan me një shpatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zadran",
        "asset": "human",
        "label": "Zadran with his sword",
        "zone": "far",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Zadran is seen in the arena ahead."
  },
  {
    "id": "description:haliliDeka:4",
    "nodeId": "haliliDeka",
    "lineIndex": 4,
    "placeId": "jutbina",
    "text": "Osmani thotë: një shpatë vret në mejdan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osmani",
        "asset": "human",
        "label": "Osmani",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Osmani urges a duel and falsely reports Mujo’s death; no dead Mujo is shown."
  },
  {
    "id": "description:haliliDeka:5",
    "nodeId": "haliliDeka",
    "lineIndex": 5,
    "placeId": "jutbina",
    "text": "Dredh, Halil, zoti të vraftë!",
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
    "rationale": "The quoted curse is spoken language and does not enact divine violence."
  },
  {
    "id": "description:haliliMejdan:0",
    "nodeId": "haliliMejdan",
    "lineIndex": 0,
    "placeId": "mejdan1",
    "text": "ti del në mejdan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-arena",
        "asset": "field",
        "label": "Open duel ground",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Open duel ground; the camera remains at the canonical place."
  },
  {
    "id": "description:haliliMejdan:1",
    "nodeId": "haliliMejdan",
    "lineIndex": 1,
    "placeId": "mejdan1",
    "text": "Zadran të vret. ti vdes në mejdan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zadran",
        "asset": "human",
        "label": "Zadran",
        "zone": "near",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Zadran; the camera remains at the canonical place."
  },
  {
    "id": "description:haliliMejdan:2",
    "nodeId": "haliliMejdan",
    "lineIndex": 2,
    "placeId": "mejdan1",
    "text": "Mujo bën gjëmën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo; the camera remains at the canonical place."
  },
  {
    "id": "description:haliliMejdan:3",
    "nodeId": "haliliMejdan",
    "lineIndex": 3,
    "placeId": "mejdan1",
    "text": "Mjeri unë, mjeri, Sokol Halili!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo laments the dead embodied Halil; the quote adds no second Halil."
  },
  {
    "id": "description:haliliJeton:0",
    "nodeId": "haliliJeton",
    "lineIndex": 0,
    "placeId": "jutbina",
    "text": "ti rri në Jutbina.",
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
    "rationale": "Halil remains at Jutbina and lives; knowledge of Osmani’s false oath adds no physical actor."
  },
  {
    "id": "description:haliliJeton:1",
    "nodeId": "haliliJeton",
    "lineIndex": 1,
    "placeId": "jutbina",
    "text": "Osmani nuk mban besë.",
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
    "rationale": "Halil remains at Jutbina and lives; knowledge of Osmani’s false oath adds no physical actor."
  },
  {
    "id": "description:haliliJeton:2",
    "nodeId": "haliliJeton",
    "lineIndex": 2,
    "placeId": "jutbina",
    "text": "Zadran rri në mejdan vetëm.",
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
    "rationale": "Zadran waits alone in the separate arena, not beside Halil in Jutbina."
  },
  {
    "id": "description:haliliJeton:3",
    "nodeId": "haliliJeton",
    "lineIndex": 3,
    "placeId": "jutbina",
    "text": "ti jeton.",
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
    "rationale": "Halil remains at Jutbina and lives; knowledge of Osmani’s false oath adds no physical actor."
  },
  {
    "id": "description:vajtim1:0",
    "nodeId": "vajtim1",
    "lineIndex": 0,
    "placeId": "vajtim1",
    "text": "ti shko nëpër rrugën nga Jutbina dhe arrin te burrat që bëjnë gjëmën.",
    "conditions": {
      "all": [
        "from:jutbina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "lament-path",
        "asset": "road",
        "label": "Path from Jutbina",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "mourners",
        "asset": "human",
        "label": "Men making the death-wail",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Path from Jutbina, Men making the death-wail; the camera remains at the canonical place."
  },
  {
    "id": "description:vajtim1:1",
    "nodeId": "vajtim1",
    "lineIndex": 1,
    "placeId": "vajtim1",
    "text": "këtu një trim është i vdekur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "dead-hero",
        "asset": "human",
        "label": "Dead hero",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Dead hero; the camera remains at the canonical place."
  },
  {
    "id": "description:vajtim1:2",
    "nodeId": "vajtim1",
    "lineIndex": 2,
    "placeId": "vajtim1",
    "text": "një kapidan vrau trimin.",
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
    "rationale": "The captain killed the hero earlier; this historical sentence does not establish the captain at the wake."
  },
  {
    "id": "description:vajtim1:3",
    "nodeId": "vajtim1",
    "lineIndex": 3,
    "placeId": "vajtim1",
    "text": "burrat bëjnë gjëmën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mourners",
        "asset": "human",
        "label": "Men making the death-wail",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mourners strike their chests and call the dead hero’s name."
  },
  {
    "id": "description:vajtim1:4",
    "nodeId": "vajtim1",
    "lineIndex": 4,
    "placeId": "vajtim1",
    "text": "burrat godasin gjirin dhe thërrasin emrin e trimit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mourners",
        "asset": "human",
        "label": "Men making the death-wail",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mourners strike their chests and call the dead hero’s name."
  },
  {
    "id": "description:vajtim1:5",
    "nodeId": "vajtim1",
    "lineIndex": 5,
    "placeId": "vajtim1",
    "text": "gratë këndojnë vajtimin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mourning-women",
        "asset": "human",
        "label": "Women singing the lament",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Women singing the lament; the camera remains at the canonical place."
  },
  {
    "id": "description:vajtim1:6",
    "nodeId": "vajtim1",
    "lineIndex": 6,
    "placeId": "vajtim1",
    "text": "Mujo do gjak.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo desires revenge; desire is not additional blood on the ground."
  },
  {
    "id": "description:vajtim1:7",
    "nodeId": "vajtim1",
    "lineIndex": 7,
    "placeId": "vajtim1",
    "text": "një lahutë këndon pranë Mujo.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mourning-lute",
        "asset": "lute",
        "label": "Lahuta beside Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Lahuta beside Mujo; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoHak1:0",
    "nodeId": "mujoHak1",
    "lineIndex": 0,
    "placeId": "vajtim1",
    "text": "Pranë shtratit, lahuta rri; askush nuk e prek.",
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
        "key": "mujo-bed",
        "asset": "bed",
        "label": "Mujo’s bed",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "mourning-lute",
        "asset": "lute",
        "label": "Untouched lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "mourning-lute",
        "kind": "beside",
        "target": "mujo-bed"
      }
    ],
    "disposition": "physical",
    "rationale": "The unused instrument lies beside the bed."
  },
  {
    "id": "description:mujoHak1:1",
    "nodeId": "mujoHak1",
    "lineIndex": 1,
    "placeId": "vajtim1",
    "text": "lahuta këndon:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mourning-lute",
        "asset": "lute",
        "label": "Lahuta telling the story",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Lahuta telling the story; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoHak1:2",
    "nodeId": "mujoHak1",
    "lineIndex": 2,
    "placeId": "vajtim1",
    "text": "një kapidan goditi Mujo me dhjetë plagë.",
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
    "rationale": "The song reports the captain’s ten previous blows; the attacker is not currently in Mujo’s sickroom."
  },
  {
    "id": "description:mujoHak1:3",
    "nodeId": "mujoHak1",
    "lineIndex": 3,
    "placeId": "vajtim1",
    "text": "Mujo është në gjendje të rëndë: në trupin e tij ka dhjetë plagë, por ai është ende i gjallë dhe rri në shtrat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "wounds": 10
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-bed",
        "asset": "bed",
        "label": "Mujo’s bed",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:mujo",
        "kind": "on",
        "target": "mujo-bed"
      }
    ],
    "disposition": "physical",
    "rationale": "Mujo remains alive with ten wounds and lies on the bed."
  },
  {
    "id": "description:mujoHak1:4",
    "nodeId": "mujoHak1",
    "lineIndex": 4,
    "placeId": "vajtim1",
    "text": "Halili do marrë gjakun e Mujo.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil’s intention to avenge Mujo is not a completed fight."
  },
  {
    "id": "description:mujoHakFund:0",
    "nodeId": "mujoHakFund",
    "lineIndex": 0,
    "placeId": "vajtim1",
    "text": "Halili lufton kapidanin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "revenge-captain",
        "asset": "human",
        "label": "Enemy captain",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, Enemy captain; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoHakFund:1",
    "nodeId": "mujoHakFund",
    "lineIndex": 1,
    "placeId": "vajtim1",
    "text": "Në shpellë, ai vret kapidanin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "revenge-captain",
        "asset": "human",
        "label": "Slain captain",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "revenge-cave",
        "asset": "cave",
        "label": "Cave where the captain falls",
        "zone": "front",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The present killing takes place inside the cave; the combat figures stand within its enclosing rock scene."
  },
  {
    "id": "description:mujoHakFund:2",
    "nodeId": "mujoHakFund",
    "lineIndex": 2,
    "placeId": "vajtim1",
    "text": "Kështu, ai merr gjakun e Mujos.",
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
    "rationale": "The achieved revenge is a narrative result."
  },
  {
    "id": "description:mujoHakFund:3",
    "nodeId": "mujoHakFund",
    "lineIndex": 3,
    "placeId": "vajtim1",
    "text": "Mujo kthehet i gjallë në Jutbina.",
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
    "rationale": "Mujo’s eventual living return to Jutbina is reported after the cave fight, not a relocation into the cave."
  },
  {
    "id": "description:mujoHakKeq:0",
    "nodeId": "mujoHakKeq",
    "lineIndex": 0,
    "placeId": "vajtim1",
    "text": "ti nuk lufton.",
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
    "rationale": "Refusing the fight and the lost revenge are nonvisual consequences; the game-over announcement is not an object."
  },
  {
    "id": "description:mujoHakKeq:1",
    "nodeId": "mujoHakKeq",
    "lineIndex": 1,
    "placeId": "vajtim1",
    "text": "kapidani ikën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "revenge-captain",
        "asset": "human",
        "label": "Departing captain",
        "zone": "far",
        "attributes": {
          "pose": "walking"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Departing captain; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoHakKeq:2",
    "nodeId": "mujoHakKeq",
    "lineIndex": 2,
    "placeId": "vajtim1",
    "text": "Halili nuk merr gjakun e Mujo.",
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
    "rationale": "Refusing the fight and the lost revenge are nonvisual consequences; the game-over announcement is not an object."
  },
  {
    "id": "description:mujoHakKeq:3",
    "nodeId": "mujoHakKeq",
    "lineIndex": 3,
    "placeId": "vajtim1",
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
    "rationale": "Refusing the fight and the lost revenge are nonvisual consequences; the game-over announcement is not an object."
  },
  {
    "id": "description:mejdan1:0",
    "nodeId": "mejdan1",
    "lineIndex": 0,
    "placeId": "mejdan1",
    "text": "ti je në mejdan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-arena",
        "asset": "field",
        "label": "Open duel ground",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Open duel ground; the camera remains at the canonical place."
  },
  {
    "id": "description:mejdan1:1",
    "nodeId": "mejdan1",
    "lineIndex": 1,
    "placeId": "mejdan1",
    "text": "kapidani është i fortë si gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The captain is compared to stone; do not turn the metaphor into an additional rock."
  },
  {
    "id": "description:mejdan1:2",
    "nodeId": "mejdan1",
    "lineIndex": 2,
    "placeId": "mejdan1",
    "text": "një mejdan është vetëm: ti dhe ai, askush tjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Only the captain stands with the embodied player in the duel ground."
  },
  {
    "id": "description:mejdan1:3",
    "nodeId": "mejdan1",
    "lineIndex": 3,
    "placeId": "mejdan1",
    "text": "agallarët thonë: fjala dhe plumbi kur dalin s'kthehen më.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-agas",
        "asset": "human",
        "label": "Agas watching from afar",
        "zone": "far",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Distant agas speak a proverb about words and bullets; no shot is fired."
  },
  {
    "id": "description:mejdan1:4",
    "nodeId": "mejdan1",
    "lineIndex": 4,
    "placeId": "mejdan1",
    "text": "agallarët rrinë larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-agas",
        "asset": "human",
        "label": "Agas watching from afar",
        "zone": "far",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Agas watching from afar; the camera remains at the canonical place."
  },
  {
    "id": "description:mejdan1:5",
    "nodeId": "mejdan1",
    "lineIndex": 5,
    "placeId": "mejdan1",
    "text": "dielli është lart: nuk ka hije në mejdan.",
    "conditions": {
      "all": [
        "day"
      ],
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
    "rationale": "The high sun lights the exposed arena without sheltering shade."
  },
  {
    "id": "description:mejdan2:0",
    "nodeId": "mejdan2",
    "lineIndex": 0,
    "placeId": "mejdan1",
    "text": "ti lufton kapidanin vetëm, dhe kapidani bie.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Duel captain; the camera remains at the canonical place."
  },
  {
    "id": "description:mejdan2:1",
    "nodeId": "mejdan2",
    "lineIndex": 1,
    "placeId": "mejdan1",
    "text": "kapidani kërkon besën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The defeated captain asks for besa and invokes sun, moon and stone as oath witnesses; these are not newly present props."
  },
  {
    "id": "description:mejdan2:2",
    "nodeId": "mejdan2",
    "lineIndex": 2,
    "placeId": "mejdan1",
    "text": "kapidani thotë: besa e shqiptarit nuk shitet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The defeated captain asks for besa and invokes sun, moon and stone as oath witnesses; these are not newly present props."
  },
  {
    "id": "description:mejdan2:3",
    "nodeId": "mejdan2",
    "lineIndex": 3,
    "placeId": "mejdan1",
    "text": "kapidani thotë: unë premtoj për diell, për hënë, për gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The defeated captain asks for besa and invokes sun, moon and stone as oath witnesses; these are not newly present props."
  },
  {
    "id": "description:mejdanKeq:0",
    "nodeId": "mejdanKeq",
    "lineIndex": 0,
    "placeId": "mejdan1",
    "text": "ti thërret agallarët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-agas",
        "asset": "human",
        "label": "Agas watching from afar",
        "zone": "far",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The player calls the previously distant watchers."
  },
  {
    "id": "description:mejdanKeq:1",
    "nodeId": "mejdanKeq",
    "lineIndex": 1,
    "placeId": "mejdan1",
    "text": "agallarët vrasin kapidanin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-agas",
        "asset": "human",
        "label": "Agas entering the duel",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Agas entering the duel, Duel captain; the camera remains at the canonical place."
  },
  {
    "id": "description:mejdanKeq:2",
    "nodeId": "mejdanKeq",
    "lineIndex": 2,
    "placeId": "mejdan1",
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
    "rationale": "The game-over statement is not physical geometry."
  },
  {
    "id": "description:besaVella:0",
    "nodeId": "besaVella",
    "lineIndex": 0,
    "placeId": "mejdan1",
    "text": "ti jep besën. kjo krijon një lidhje me nder dhe besim mes teje dhe kapidanit. kapidani bëhet miku yt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The living captain becomes the player’s sworn friend; trust is not an object."
  },
  {
    "id": "description:besaThyer:0",
    "nodeId": "besaThyer",
    "lineIndex": 0,
    "placeId": "mejdan1",
    "text": "ti vret kapidanin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "duel-captain",
        "asset": "human",
        "label": "Duel captain",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Duel captain; the camera remains at the canonical place."
  },
  {
    "id": "description:besaThyer:1",
    "nodeId": "besaThyer",
    "lineIndex": 1,
    "placeId": "mejdan1",
    "text": "ti nuk mban besën.",
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
    "rationale": "The broken oath and ending notice are nonvisual consequences."
  },
  {
    "id": "description:besaThyer:2",
    "nodeId": "besaThyer",
    "lineIndex": 2,
    "placeId": "mejdan1",
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
    "rationale": "The broken oath and ending notice are nonvisual consequences."
  },
  {
    "id": "description:vajtimFund:0",
    "nodeId": "vajtimFund",
    "lineIndex": 0,
    "placeId": "vajtim1",
    "text": "ti bën gjëmën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "dead-hero",
        "asset": "human",
        "label": "Dead hero",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewpoint player mourns the still dead man; no duplicate player body is drawn."
  },
  {
    "id": "description:vajtimFund:1",
    "nodeId": "vajtimFund",
    "lineIndex": 1,
    "placeId": "vajtim1",
    "text": "ti vajton burrin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "dead-hero",
        "asset": "human",
        "label": "Dead hero",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewpoint player mourns the still dead man; no duplicate player body is drawn."
  },
  {
    "id": "description:vajtimFund:2",
    "nodeId": "vajtimFund",
    "lineIndex": 2,
    "placeId": "vajtim1",
    "text": "burri rri i qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "dead-hero",
        "asset": "human",
        "label": "Dead hero",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewpoint player mourns the still dead man; no duplicate player body is drawn."
  },
  {
    "id": "description:vajtimFund:3",
    "nodeId": "vajtimFund",
    "lineIndex": 3,
    "placeId": "vajtim1",
    "text": "malet mbajnë zërin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mountains carry the lament’s echo; sound is not a floating prop."
  },
  {
    "id": "description:mali1:0",
    "nodeId": "mali1",
    "lineIndex": 0,
    "placeId": "mali1",
    "text": "ti je në malin Tomorr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:1",
    "nodeId": "mali1",
    "lineIndex": 1,
    "placeId": "mali1",
    "text": "ti ke dëgjuar fjalët: ja mali.",
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
    "disposition": "nonvisual",
    "rationale": "A remembered utterance is not an additional visible object."
  },
  {
    "id": "description:mali1:2",
    "nodeId": "mali1",
    "lineIndex": 2,
    "placeId": "mali1",
    "text": "ti ngjit nga udhëkryqi.",
    "conditions": {
      "all": [
        "from:udhekryq"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:3",
    "nodeId": "mali1",
    "lineIndex": 3,
    "placeId": "mali1",
    "text": "ti zbrit nga lart.",
    "conditions": {
      "all": [
        "from:mali3|dhia1|qiell1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:4",
    "nodeId": "mali1",
    "lineIndex": 4,
    "placeId": "mali1",
    "text": "ti ik nga shpella.",
    "conditions": {
      "all": [
        "from:katallan1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-cave",
        "asset": "cave",
        "label": "Cave behind the arriving viewpoint",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Cave behind the arriving viewpoint; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:5",
    "nodeId": "mali1",
    "lineIndex": 5,
    "placeId": "mali1",
    "text": "mali është i madh dhe i errët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:6",
    "nodeId": "mali1",
    "lineIndex": 6,
    "placeId": "mali1",
    "text": "rruga poshtë zbret te udhëkryqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "crossroads-descent",
        "asset": "road",
        "label": "Lower road to the crossroads",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Lower road to the crossroads; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:7",
    "nodeId": "mali1",
    "lineIndex": 7,
    "placeId": "mali1",
    "text": "natën era është e ftohtë dhe yjet janë afër.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Cold wind and nearby-looking stars establish night; no false nearby star geometry is placed."
  },
  {
    "id": "description:mali1:8",
    "nodeId": "mali1",
    "lineIndex": 8,
    "placeId": "mali1",
    "text": "dielli është mbi majë.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The sun is above the summit."
  },
  {
    "id": "description:mali1:9",
    "nodeId": "mali1",
    "lineIndex": 9,
    "placeId": "mali1",
    "text": "është agim: dielli prek majë e shenjtë, dhe majë bëhet e artë.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:mali1:10",
    "nodeId": "mali1",
    "lineIndex": 10,
    "placeId": "mali1",
    "text": "është muzg: qielli mbi malet bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [
        "arrival:action:observation:mountain-summit"
      ],
      "observationId": "mountain-summit"
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:mali1:11",
    "nodeId": "mali1",
    "lineIndex": 11,
    "placeId": "mali1",
    "text": "lart është majë e shenjtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": "mountain-summit"
    },
    "objects": [
      {
        "key": "tomorr-summit",
        "asset": "mountain",
        "label": "Sacred summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sacred summit; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:12",
    "nodeId": "mali1",
    "lineIndex": 12,
    "placeId": "mali1",
    "text": "në një gur rri shenja e një kali të bardhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "horse-mark-stone",
        "asset": "stone",
        "label": "Stone bearing a white horse mark",
        "zone": "near",
        "attributes": {
          "mark": "horse",
          "markColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The horse is a mark on a stone, not a live horse."
  },
  {
    "id": "description:mali1:13",
    "nodeId": "mali1",
    "lineIndex": 13,
    "placeId": "mali1",
    "text": "një shpellë e zezë rri në gur si një gojë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-cave",
        "asset": "cave",
        "label": "Black cave mouth in the rock",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Black cave mouth in the rock; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:14",
    "nodeId": "mali1",
    "lineIndex": 14,
    "placeId": "mali1",
    "text": "afër rri një Peri me rroba të bardha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Peri wearing white; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:15",
    "nodeId": "mali1",
    "lineIndex": 15,
    "placeId": "mali1",
    "text": "në mal rri një bar i mirë: çaj.",
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
        "key": "mountain-tea",
        "asset": "flower",
        "label": "Mountain tea plants",
        "zone": "near",
        "attributes": {
          "color": "#c6c28d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain tea plants; the camera remains at the canonical place."
  },
  {
    "id": "description:mali1:16",
    "nodeId": "mali1",
    "lineIndex": 16,
    "placeId": "mali1",
    "text": "është muzg: qielli mbi malet bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk",
        "observed:mountain-summit",
        "arrival:action:observation:mountain-summit"
      ],
      "negate": false,
      "none": [],
      "observationId": "mountain-summit"
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:cajMali1:0",
    "nodeId": "cajMali1",
    "lineIndex": 0,
    "placeId": "mali1",
    "text": "ti merr çaj në mal.",
    "conditions": {
      "all": [
        "from:mali1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-tea",
        "asset": "flower",
        "label": "Mountain tea plants",
        "zone": "near",
        "attributes": {
          "color": "#c6c28d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player gathers actual mountain tea; no duplicate player body is created."
  },
  {
    "id": "description:cajMali1:1",
    "nodeId": "cajMali1",
    "lineIndex": 1,
    "placeId": "mali1",
    "text": "ti ke dëgjuar fjalët: ja çaj i mirë i malit.",
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
    "disposition": "nonvisual",
    "rationale": "This is a remembered phrase, not a new scene object."
  },
  {
    "id": "description:cajMali1:2",
    "nodeId": "cajMali1",
    "lineIndex": 2,
    "placeId": "mali1",
    "text": "çaj është bar i mirë për ditë të ftohta.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-tea",
        "asset": "flower",
        "label": "Mountain tea plants",
        "zone": "near",
        "attributes": {
          "color": "#c6c28d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Tea is present; its usefulness on cold days is general knowledge."
  },
  {
    "id": "description:cajMali1:3",
    "nodeId": "cajMali1",
    "lineIndex": 3,
    "placeId": "mali1",
    "text": "tregtari në qytet blen çaj.",
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
    "rationale": "The merchant buying tea is in a different city scene."
  },
  {
    "id": "description:cajMali1:4",
    "nodeId": "cajMali1",
    "lineIndex": 4,
    "placeId": "mali1",
    "text": "është agim: një dritë e artë bie mbi malet.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:cajMali1:5",
    "nodeId": "cajMali1",
    "lineIndex": 5,
    "placeId": "mali1",
    "text": "është muzg: qielli mbi malet bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:cajMali1:6",
    "nodeId": "cajMali1",
    "lineIndex": 6,
    "placeId": "mali1",
    "text": "një shportë rri pranë çajit të malit.",
    "conditions": {
      "all": [
        "flag:teaBasketFilled"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-tea",
        "asset": "flower",
        "label": "Mountain tea plants",
        "zone": "near",
        "attributes": {
          "color": "#c6c28d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "tea-basket",
        "asset": "basket",
        "label": "Basket beside mountain tea",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "tea-basket",
        "kind": "beside",
        "target": "mountain-tea"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain tea plants, Basket beside mountain tea; the camera remains at the canonical place."
  },
  {
    "id": "description:cajMali1:7",
    "nodeId": "cajMali1",
    "lineIndex": 7,
    "placeId": "mali1",
    "text": "ti mbush shportën me çaj mali.",
    "conditions": {
      "all": [
        "flag:teaBasketFilled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-tea",
        "asset": "flower",
        "label": "Mountain tea plants",
        "zone": "near",
        "attributes": {
          "color": "#c6c28d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "tea-basket",
        "asset": "basket",
        "label": "Basket filled with mountain tea",
        "zone": "near",
        "attributes": {
          "contents": "tea"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain tea plants, Basket filled with mountain tea; the camera remains at the canonical place."
  },
  {
    "id": "description:mali2:0",
    "nodeId": "mali2",
    "lineIndex": 0,
    "placeId": "mali2",
    "text": "një dragua lufton kulshedrën me djep dhe me gurë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:drangue",
        "asset": "human",
        "label": "Drangue",
        "zone": "near",
        "attributes": {
          "heldItem": "cradle"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "drangue-cradle",
        "asset": "cradle",
        "label": "Cradle used in the fight",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "fight-stones",
        "asset": "stone",
        "label": "Stones used by the Drangue",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Drangue, Kulshedra, Cradle used in the fight, Stones used by the Drangue; the camera remains at the canonical place."
  },
  {
    "id": "description:mali2:1",
    "nodeId": "mali2",
    "lineIndex": 1,
    "placeId": "mali2",
    "text": "ti gjen një gur të fortë.",
    "conditions": {
      "all": [
        "gur"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "held-stone",
        "asset": "stone",
        "label": "Strong stone found by the player",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Strong stone found by the player; the camera remains at the canonical place."
  },
  {
    "id": "description:mali2:2",
    "nodeId": "mali2",
    "lineIndex": 2,
    "placeId": "mali2",
    "text": "Natën, gurët janë të ftohtë nën duart e tua.",
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
        "key": "fight-stones",
        "asset": "stone",
        "label": "Cold stones",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Cold surfaces are tactile; the actual stones remain physical."
  },
  {
    "id": "description:mali3:0",
    "nodeId": "mali3",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "ti ngjit lart.",
    "conditions": {
      "all": [
        "from:mali2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali3:1",
    "nodeId": "mali3",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "ti zbrit nga maja.",
    "conditions": {
      "all": [
        "from:maja|kali1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali3:2",
    "nodeId": "mali3",
    "lineIndex": 2,
    "placeId": "mali3",
    "text": "ti je lart në mal.",
    "conditions": {
      "all": [
        "from:mali2|maja|kali1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr; the camera remains at the canonical place."
  },
  {
    "id": "description:mali3:3",
    "nodeId": "mali3",
    "lineIndex": 3,
    "placeId": "mali3",
    "text": "lart rri një plak i vjetër me mjekër të bardhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-elder",
        "asset": "human",
        "label": "Mountain elder",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain elder; the camera remains at the canonical place."
  },
  {
    "id": "description:mali3:4",
    "nodeId": "mali3",
    "lineIndex": 4,
    "placeId": "mali3",
    "text": "një kalë rri afër dhe të sheh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "summit-horse",
        "asset": "horse",
        "label": "Horse near the elder",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Horse near the elder; the camera remains at the canonical place."
  },
  {
    "id": "description:mali3:5",
    "nodeId": "mali3",
    "lineIndex": 5,
    "placeId": "mali3",
    "text": "është agim: një dritë e artë bie mbi malet.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:mali3:6",
    "nodeId": "mali3",
    "lineIndex": 6,
    "placeId": "mali3",
    "text": "është muzg: qielli mbi malet bëhet i kuq dhe i artë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:tomor1:0",
    "nodeId": "tomor1",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "baba Tomor të pret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Baba Tomor; the camera remains at the canonical place."
  },
  {
    "id": "description:tomor1:1",
    "nodeId": "tomor1",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "mjekra e tij është e bardhë si mjegull.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Baba Tomor; the camera remains at the canonical place."
  },
  {
    "id": "description:tomor1:2",
    "nodeId": "tomor1",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "shqiponjat rrinë me Tomorin dhe fluturojnë rreth tij.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tomor-eagles",
        "asset": "eagle",
        "label": "Eagles circling Tomor",
        "zone": "above",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Baba Tomor, Eagles circling Tomor; the camera remains at the canonical place."
  },
  {
    "id": "description:tomor1:3",
    "nodeId": "tomor1",
    "lineIndex": 3,
    "placeId": "maja",
    "text": "Në pranverë, një lule e vogël lulëzon pranë tij.",
    "conditions": {
      "all": [
        "season:spring"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tomor-flower",
        "asset": "flower",
        "label": "Small spring flower",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "season",
        "value": "spring"
      }
    ],
    "relations": [
      {
        "subject": "tomor-flower",
        "kind": "beside",
        "target": "actor:tomor"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Baba Tomor, Small spring flower; the camera remains at the canonical place."
  },
  {
    "id": "description:tomor1:4",
    "nodeId": "tomor1",
    "lineIndex": 4,
    "placeId": "maja",
    "text": "Në vjeshtë, bari vyshket në mal.",
    "conditions": {
      "all": [
        "season:autumn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "season",
        "value": "autumn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The mountain grass withers in autumn; this is ground vegetation state."
  },
  {
    "id": "description:tomor1:5",
    "nodeId": "tomor1",
    "lineIndex": 5,
    "placeId": "maja",
    "text": "Tomor thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Baba Tomor; the camera remains at the canonical place."
  },
  {
    "id": "description:tomor1:6",
    "nodeId": "tomor1",
    "lineIndex": 6,
    "placeId": "maja",
    "text": "kulshedra është poshtë.",
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
    "rationale": "Tomor reports the Kulshedra below; it is not at the summit with him."
  },
  {
    "id": "description:tomor1:7",
    "nodeId": "tomor1",
    "lineIndex": 7,
    "placeId": "maja",
    "text": "Për Baba Tomor.",
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
    "rationale": "An invocation to Baba Tomor is spoken devotion, not an object."
  },
  {
    "id": "description:tomor2:0",
    "nodeId": "tomor2",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "Era qetësohet.",
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
        "property": "weather",
        "value": "calm"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The wind visibly subsides; no extra creature or prop is implied."
  },
  {
    "id": "description:tomor2:1",
    "nodeId": "tomor2",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "Tomor jep një shpatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tomor-sword",
        "asset": "sword",
        "label": "Sword given by Tomor",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Baba Tomor, Sword given by Tomor; the camera remains at the canonical place."
  },
  {
    "id": "description:tomor2:2",
    "nodeId": "tomor2",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "shpata vret kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-sword",
        "asset": "sword",
        "label": "Sword given by Tomor",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The weapon’s power is reported; no Kulshedra is killed in this summit scene."
  },
  {
    "id": "description:maja:0",
    "nodeId": "maja",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "ti ngjitesh lart në majë.",
    "conditions": {
      "all": [
        "from:maliStuhi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-summit",
        "asset": "mountain",
        "label": "Sacred summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sacred summit; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:1",
    "nodeId": "maja",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "ti zbret nga rrezet e diellit.",
    "conditions": {
      "all": [
        "from:diellShtepi1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-summit",
        "asset": "mountain",
        "label": "Sacred summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sacred summit; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:2",
    "nodeId": "maja",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "ti je lart në mal.",
    "conditions": {
      "all": [
        "from:maliStuhi|diellShtepi1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-summit",
        "asset": "mountain",
        "label": "Sacred summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sacred summit; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:3",
    "nodeId": "maja",
    "lineIndex": 3,
    "placeId": "maja",
    "text": "këtu rri një plak i vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-elder",
        "asset": "human",
        "label": "Mountain elder",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain elder; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:4",
    "nodeId": "maja",
    "lineIndex": 4,
    "placeId": "maja",
    "text": "plaku thotë: në verë njerëzit ngjiten këtu dhe hanë një kurban.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-elder",
        "asset": "human",
        "label": "Mountain elder",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder describes summer pilgrimage; reported pilgrims and kurban are not present in this condition."
  },
  {
    "id": "description:maja:5",
    "nodeId": "maja",
    "lineIndex": 5,
    "placeId": "maja",
    "text": "larg rrinë kullat e Jutbinës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:summit-distance"
      ],
      "observationId": "summit-distance"
    },
    "objects": [
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Distant towers of Jutbina",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The distant towers are an illustrative plural group; the prose gives no exact number."
  },
  {
    "id": "description:maja:6",
    "nodeId": "maja",
    "lineIndex": 6,
    "placeId": "maja",
    "text": "një rrugë zbret te dy malet e tjera mbi një qytet të largët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": "summit-distance"
    },
    "objects": [
      {
        "key": "other-mountains-road",
        "asset": "road",
        "label": "Descending road toward two mountains",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "other-two-mountains",
        "asset": "mountain",
        "label": "Two mountains above the distant city",
        "zone": "far",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "distant-city",
        "asset": "house",
        "label": "Distant city buildings",
        "zone": "far",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Exactly two mountains are named; four city buildings are a representative skyline."
  },
  {
    "id": "description:maja:7",
    "nodeId": "maja",
    "lineIndex": 7,
    "placeId": "maja",
    "text": "një rrugë tjetër shkon drejt një kala larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "castle-road",
        "asset": "road",
        "label": "Road toward the distant castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "distant-castle",
        "asset": "castle",
        "label": "Distant castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Road toward the distant castle, Distant castle; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:8",
    "nodeId": "maja",
    "lineIndex": 8,
    "placeId": "maja",
    "text": "dielli del nga malet: qielli bëhet i kuq.",
    "conditions": {
      "all": [
        "became:dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:maja:9",
    "nodeId": "maja",
    "lineIndex": 9,
    "placeId": "maja",
    "text": "dielli zbret nën botën.",
    "conditions": {
      "all": [
        "became:dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:maja:10",
    "nodeId": "maja",
    "lineIndex": 10,
    "placeId": "maja",
    "text": "nata vjen.",
    "conditions": {
      "all": [
        "became:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The summit looks out across a dark world beneath the stars."
  },
  {
    "id": "description:maja:11",
    "nodeId": "maja",
    "lineIndex": 11,
    "placeId": "maja",
    "text": "rrezet e diellit bien në majë.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Sunlight falls on the summit."
  },
  {
    "id": "description:maja:12",
    "nodeId": "maja",
    "lineIndex": 12,
    "placeId": "maja",
    "text": "natën ti je lart me yjet: bota poshtë është e errët.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The summit looks out across a dark world beneath the stars."
  },
  {
    "id": "description:maja:13",
    "nodeId": "maja",
    "lineIndex": 13,
    "placeId": "maja",
    "text": "është agim: bota poshtë është e artë.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:maja:14",
    "nodeId": "maja",
    "lineIndex": 14,
    "placeId": "maja",
    "text": "është muzg: qielli është i kuq dhe i artë, dhe bota poshtë bëhet e errët.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:maja:15",
    "nodeId": "maja",
    "lineIndex": 15,
    "placeId": "maja",
    "text": "sot mijë njerëz ngjiten këtu me kurban.",
    "conditions": {
      "all": [
        "festival:tomorriPilgrimage",
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "summit-pilgrims",
        "asset": "human",
        "label": "Thousands of pilgrims, represented as a crowd",
        "zone": "front",
        "attributes": {},
        "count": 24,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "pilgrim-kurban",
        "asset": "sheep",
        "label": "Kurban carried by the pilgrims",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The prose gives a large approximate crowd, not a count of 24; the sampled crowd is explicitly representative."
  },
  {
    "id": "description:maja:16",
    "nodeId": "maja",
    "lineIndex": 16,
    "placeId": "maja",
    "text": "mbi një gur i vjetër është shenjë e Zojz. ti e di nga pyll.",
    "conditions": {
      "all": [
        "knows:zojzMarkInForest"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zojz-mark-stone",
        "asset": "stone",
        "label": "Old stone bearing Zojz’s sign",
        "zone": "near",
        "attributes": {
          "mark": "zojz"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Old stone bearing Zojz’s sign; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:17",
    "nodeId": "maja",
    "lineIndex": 17,
    "placeId": "maja",
    "text": "malet larg mbajnë një shenjë e luftës.",
    "conditions": {
      "all": [
        "fact:tomorShpiragBattleScars"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "war-mark-mountains",
        "asset": "mountain",
        "label": "Distant mountains bearing the war’s scar",
        "zone": "far",
        "attributes": {
          "scar": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Distant mountains bearing the war’s scar; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:18",
    "nodeId": "maja",
    "lineIndex": 18,
    "placeId": "maja",
    "text": "poshtë është Osum, mes Tomorrit dhe Shpiragut.",
    "conditions": {
      "all": [
        "fact:osumBornFromBeautyTears"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "osum-river",
        "asset": "river",
        "label": "Osum below the mountains",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "shpirag-mountain",
        "asset": "mountain",
        "label": "Mount Shpirag",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Osum occupies the valley between Tomorr and Shpirag."
  },
  {
    "id": "description:maja:19",
    "nodeId": "maja",
    "lineIndex": 19,
    "placeId": "maja",
    "text": "tani kalaja e Rozafës është mbi lumë.",
    "conditions": {
      "all": [
        "fact:rozafaCastleRaised"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-castle",
        "asset": "castle",
        "label": "Rozafa above the river",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "rozafa-river",
        "asset": "river",
        "label": "River below Rozafa",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "rozafa-castle",
        "kind": "above",
        "target": "rozafa-river"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Rozafa above the river, River below Rozafa; the camera remains at the canonical place."
  },
  {
    "id": "description:maja:20",
    "nodeId": "maja",
    "lineIndex": 20,
    "placeId": "maja",
    "text": "larg rrinë kullat e Jutbinës.",
    "conditions": {
      "all": [
        "observed:summit-distance",
        "arrival:action:observation:summit-distance"
      ],
      "negate": false,
      "none": [],
      "observationId": "summit-distance"
    },
    "objects": [
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Distant towers of Jutbina",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The distant towers are an illustrative plural group; the prose gives no exact number."
  },
  {
    "id": "description:jutbina:0",
    "nodeId": "jutbina",
    "lineIndex": 0,
    "placeId": "jutbina",
    "text": "këtu është Jutbina: Mujo dhe Halili rrinë këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Jutbina is Mujo and Halil’s home; the statement does not locate both at the gate."
  },
  {
    "id": "description:jutbina:1",
    "nodeId": "jutbina",
    "lineIndex": 1,
    "placeId": "jutbina",
    "text": "ti ke dëgjuar fjalët: ja Jutbina.",
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
    "disposition": "nonvisual",
    "rationale": "The remembered phrase is not a new visible entity."
  },
  {
    "id": "description:jutbina:2",
    "nodeId": "jutbina",
    "lineIndex": 2,
    "placeId": "jutbina",
    "text": "një rrugë shkon te Mujo dhe Halili. Mujo do kalin që një armik ruan larg.",
    "conditions": {
      "all": [
        "visited:mujoKale"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-halil-path",
        "asset": "road",
        "label": "Path to Mujo and Halil",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The desired courser and its enemy guard are explicitly far away."
  },
  {
    "id": "description:jutbina:3",
    "nodeId": "jutbina",
    "lineIndex": 3,
    "placeId": "jutbina",
    "text": "një rrugë shkon te një trim që nuk sheh: sytë e tij janë të errët.",
    "conditions": {
      "all": [
        "fact:zukuBesaAlly"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "blind-hero-path",
        "asset": "road",
        "label": "Path toward the blind hero",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The hero at the destination is described for navigation, not placed at the path entrance."
  },
  {
    "id": "description:jutbina:4",
    "nodeId": "jutbina",
    "lineIndex": 4,
    "placeId": "jutbina",
    "text": "zanat japin fuqi.",
    "conditions": {
      "all": [
        "visited:mujiZana1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The Zanas’ power is lore rather than an actual arrival here."
  },
  {
    "id": "description:jutbina:5",
    "nodeId": "jutbina",
    "lineIndex": 5,
    "placeId": "jutbina",
    "text": "një lahutë këndon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:jutbina-lute"
      ],
      "observationId": "jutbina-lute"
    },
    "objects": [
      {
        "key": "jutbina-lute",
        "asset": "lute",
        "label": "Sounding lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sounding lahuta; the camera remains at the canonical place."
  },
  {
    "id": "description:jutbina:6",
    "nodeId": "jutbina",
    "lineIndex": 6,
    "placeId": "jutbina",
    "text": "dielli del mbi kullat.",
    "conditions": {
      "all": [
        "became:dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:jutbina:7",
    "nodeId": "jutbina",
    "lineIndex": 7,
    "placeId": "jutbina",
    "text": "nata vjen.",
    "conditions": {
      "all": [
        "became:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Night arrives at the towers."
  },
  {
    "id": "description:jutbina:8",
    "nodeId": "jutbina",
    "lineIndex": 8,
    "placeId": "jutbina",
    "text": "natën kullat janë hije të zeza nën hënë.",
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
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Moonlight silhouettes the towers."
  },
  {
    "id": "description:jutbina:9",
    "nodeId": "jutbina",
    "lineIndex": 9,
    "placeId": "jutbina",
    "text": "është agim: një dritë e artë bie mbi kullat.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:jutbina:10",
    "nodeId": "jutbina",
    "lineIndex": 10,
    "placeId": "jutbina",
    "text": "është muzg: qielli mbi kullat bëhet i kuq.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Red and gold dusk light changes the sky above the mountains."
  },
  {
    "id": "description:jutbina:11",
    "nodeId": "jutbina",
    "lineIndex": 11,
    "placeId": "jutbina",
    "text": "Nëpër një rrugë, burrat bëjnë gjëmën për një trim; një kapidan do një mejdan.",
    "conditions": {
      "all": [
        "visited:vajtim1",
        "visited:mejdan1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mourning-path",
        "asset": "road",
        "label": "Path toward the death-wail",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The audible men and duel captain are down the path; do not transpose their scene here."
  },
  {
    "id": "description:jutbina:12",
    "nodeId": "jutbina",
    "lineIndex": 12,
    "placeId": "jutbina",
    "text": "në kullën e madhe është një odë: burrat flasin atje.",
    "conditions": {
      "all": [
        "visited:odaJutbina"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "oda-tower",
        "asset": "tower",
        "label": "Large tower containing the oda",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Men can be heard inside the tower; the exterior render preserves their enclosed source rather than placing them outside."
  },
  {
    "id": "description:jutbina:13",
    "nodeId": "jutbina",
    "lineIndex": 13,
    "placeId": "jutbina",
    "text": "Mujo dhe Halili janë në shtëpi bashkë.",
    "conditions": {
      "all": [
        "fact:mujoFreedFromKrajl"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Home status establishes Mujo and Halil’s whereabouts inside their home, not both outside at the viewpoint."
  },
  {
    "id": "description:jutbina:14",
    "nodeId": "jutbina",
    "lineIndex": 14,
    "placeId": "jutbina",
    "text": "Zuku është një mik me besë në mal.",
    "conditions": {
      "all": [
        "fact:zukuBesaAlly"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Zuku is a friend elsewhere in the mountains."
  },
  {
    "id": "description:jutbina:15",
    "nodeId": "jutbina",
    "lineIndex": 15,
    "placeId": "jutbina",
    "text": "një lahutë këndon.",
    "conditions": {
      "all": [
        "observed:jutbina-lute",
        "arrival:action:observation:jutbina-lute"
      ],
      "negate": false,
      "none": [],
      "observationId": "jutbina-lute"
    },
    "objects": [
      {
        "key": "jutbina-lute",
        "asset": "lute",
        "label": "Sounding lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sounding lahuta; the camera remains at the canonical place."
  },
  {
    "id": "description:odaJutbina:0",
    "nodeId": "odaJutbina",
    "lineIndex": 0,
    "placeId": "odaJutbina",
    "text": "ti hyn në odën e kullës.",
    "conditions": {
      "all": [
        "from:jutbina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-oda",
        "asset": "interior",
        "label": "Interior of Jutbina’s tower oda",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Interior of Jutbina’s tower oda; the camera remains at the canonical place."
  },
  {
    "id": "description:odaJutbina:1",
    "nodeId": "odaJutbina",
    "lineIndex": 1,
    "placeId": "odaJutbina",
    "text": "burrat rrinë me zjarr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-oda",
        "asset": "interior",
        "label": "Interior of Jutbina’s tower oda",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "oda-hearth",
        "asset": "hearth",
        "label": "Oda hearth",
        "zone": "front",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Interior of Jutbina’s tower oda, Men gathered in the oda, Oda hearth; the camera remains at the canonical place."
  },
  {
    "id": "description:odaJutbina:2",
    "nodeId": "odaJutbina",
    "lineIndex": 2,
    "placeId": "odaJutbina",
    "text": "ditën shumë burra janë jashtë: vetëm pleqtë rrinë këtu.",
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
        "key": "oda-elders",
        "asset": "human",
        "label": "Elders remaining in the daytime oda",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#c6c6bf"
        },
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "day"
      },
      {
        "key": "oda-men",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Only elders remain inside; the men described outside are not duplicated indoors."
  },
  {
    "id": "description:odaJutbina:3",
    "nodeId": "odaJutbina",
    "lineIndex": 3,
    "placeId": "odaJutbina",
    "text": "natën zjarri bën hije të gjata mbi murin.",
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
        "key": "oda-hearth",
        "asset": "hearth",
        "label": "Night hearth",
        "zone": "front",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "oda-wall",
        "asset": "wall",
        "label": "Wall receiving fire shadows",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Night hearth, Wall receiving fire shadows; the camera remains at the canonical place."
  },
  {
    "id": "description:odaJutbina:4",
    "nodeId": "odaJutbina",
    "lineIndex": 4,
    "placeId": "odaJutbina",
    "text": "burrat flasin për krajlin:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:jutbina-krajl-talk"
      ],
      "observationId": "jutbina-krajl-talk"
    },
    "objects": [
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The men are actual speakers; their Krajl subject remains offstage."
  },
  {
    "id": "description:odaJutbina:5",
    "nodeId": "odaJutbina",
    "lineIndex": 5,
    "placeId": "odaJutbina",
    "text": "Rusha rri në kullën e krajlit.",
    "conditions": {
      "all": [
        "visited:rusha1"
      ],
      "negate": true,
      "none": [],
      "observationId": "jutbina-krajl-talk"
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The oda conversation reports people, prisoners or consequences at other places; those entities are not in this room."
  },
  {
    "id": "description:odaJutbina:6",
    "nodeId": "odaJutbina",
    "lineIndex": 6,
    "placeId": "odaJutbina",
    "text": "krajli merr Mujon: Halili do ndihmë.",
    "conditions": {
      "all": [
        "visited:kreshnikRrembimi1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The oda conversation reports people, prisoners or consequences at other places; those entities are not in this room."
  },
  {
    "id": "description:odaJutbina:7",
    "nodeId": "odaJutbina",
    "lineIndex": 7,
    "placeId": "odaJutbina",
    "text": "Mujo pyet: a je gati? nisemi sot.",
    "conditions": {
      "all": [
        "visited:behuriJutbina"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo visibly invites a departure that has not occurred yet."
  },
  {
    "id": "description:odaJutbina:8",
    "nodeId": "odaJutbina",
    "lineIndex": 8,
    "placeId": "odaJutbina",
    "text": "Pranë Mujos është një gotë me qumësht.",
    "conditions": {
      "all": [
        "flag:gbMujiMilkTaken"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "milk-cup",
        "asset": "cup",
        "label": "Cup of milk",
        "zone": "near",
        "attributes": {
          "contents": "milk"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "milk-cup",
        "kind": "beside",
        "target": "actor:mujo"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Cup of milk; the camera remains at the canonical place."
  },
  {
    "id": "description:odaJutbina:9",
    "nodeId": "odaJutbina",
    "lineIndex": 9,
    "placeId": "odaJutbina",
    "text": "ti ke qumësht. burrat tregojnë dy pemë ku Mujo ra.",
    "conditions": {
      "all": [
        "flag:gbMujiMilkTaken"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "milk-cup",
        "asset": "cup",
        "label": "Cup of milk",
        "zone": "near",
        "attributes": {
          "contents": "milk"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The milk is in the viewpoint’s hands; the two trees are a direction the men indicate elsewhere."
  },
  {
    "id": "description:odaJutbina:10",
    "nodeId": "odaJutbina",
    "lineIndex": 10,
    "placeId": "odaJutbina",
    "text": "Osmani rri në burgun e krajlit me hekur.",
    "conditions": {
      "all": [
        "visited:osmaniBurg"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The oda conversation reports people, prisoners or consequences at other places; those entities are not in this room."
  },
  {
    "id": "description:odaJutbina:11",
    "nodeId": "odaJutbina",
    "lineIndex": 11,
    "placeId": "odaJutbina",
    "text": "Halili rri në varr jashtë Jutbina; një zog i zi këndon atje.",
    "conditions": {
      "all": [
        "visited:halilGarria1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The oda conversation reports people, prisoners or consequences at other places; those entities are not in this room."
  },
  {
    "id": "description:odaJutbina:12",
    "nodeId": "odaJutbina",
    "lineIndex": 12,
    "placeId": "odaJutbina",
    "text": "Ali rri larg. një krajl mban derën e shtëpisë.",
    "conditions": {
      "all": [
        "visited:aliBajr1"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The oda conversation reports people, prisoners or consequences at other places; those entities are not in this room."
  },
  {
    "id": "description:odaJutbina:13",
    "nodeId": "odaJutbina",
    "lineIndex": 13,
    "placeId": "odaJutbina",
    "text": "Mujo është në shtëpi. burrat pyet Halili: si ishte rruga?",
    "conditions": {
      "all": [
        "fact:mujoFreedFromKrajl"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The reunited heroes are in the oda while the men ask about their past journey."
  },
  {
    "id": "description:odaJutbina:14",
    "nodeId": "odaJutbina",
    "lineIndex": 14,
    "placeId": "odaJutbina",
    "text": "udhëtarët thonë se kulla e Behurit nuk rri më.",
    "conditions": {
      "all": [
        "fact:behuriKullaDestroyed"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The oda conversation reports people, prisoners or consequences at other places; those entities are not in this room."
  },
  {
    "id": "description:odaJutbina:15",
    "nodeId": "odaJutbina",
    "lineIndex": 15,
    "placeId": "odaJutbina",
    "text": "burrat pyet: a do të këndosh përsëri?",
    "conditions": {
      "all": [
        "knows:frontierNewVerse"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The men invite a future song."
  },
  {
    "id": "description:odaJutbina:16",
    "nodeId": "odaJutbina",
    "lineIndex": 16,
    "placeId": "odaJutbina",
    "text": "ti merr qumësht",
    "conditions": {
      "all": [
        "arrival:action:story:oda-jutbina:merr-qumesht"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "milk-cup",
        "asset": "cup",
        "label": "Cup of milk",
        "zone": "near",
        "attributes": {
          "contents": "milk"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Cup of milk; the camera remains at the canonical place."
  },
  {
    "id": "description:odaJutbina:17",
    "nodeId": "odaJutbina",
    "lineIndex": 17,
    "placeId": "odaJutbina",
    "text": "ti Këndo përsëri.",
    "conditions": {
      "all": [
        "arrival:action:story:oda-jutbina:kendo-perseri"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The embodied player sings; no duplicate player or unspecified instrument is invented."
  },
  {
    "id": "description:odaJutbina:18",
    "nodeId": "odaJutbina",
    "lineIndex": 18,
    "placeId": "odaJutbina",
    "text": "burrat flasin për krajlin:",
    "conditions": {
      "all": [
        "observed:jutbina-krajl-talk",
        "arrival:action:observation:jutbina-krajl-talk"
      ],
      "negate": false,
      "none": [],
      "observationId": "jutbina-krajl-talk"
    },
    "objects": [
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The men are actual speakers; their Krajl subject remains offstage."
  },
  {
    "id": "description:kreshnikRrembimi1:0",
    "nodeId": "kreshnikRrembimi1",
    "lineIndex": 0,
    "placeId": "kreshnikRrembimi1",
    "text": "Në mesnatë, ti del nga odë dhe arrin te dera e Halilit.",
    "conditions": {
      "all": [
        "from:odaJutbina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-door",
        "asset": "door",
        "label": "Halil’s door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil’s door; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimi1:1",
    "nodeId": "kreshnikRrembimi1",
    "lineIndex": 1,
    "placeId": "kreshnikRrembimi1",
    "text": "është mesnatë. zanat trokasin në derën e Halilit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-door",
        "asset": "door",
        "label": "Halil’s door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:zanas",
        "asset": "fairy",
        "label": "Zanas",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil’s door, Zanas; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimi1:2",
    "nodeId": "kreshnikRrembimi1",
    "lineIndex": 2,
    "placeId": "kreshnikRrembimi1",
    "text": "zanat thonë: zgjohu, Halili. krajli e ka Mujon në burg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zanas",
        "asset": "fairy",
        "label": "Zanas",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zanas report distant Mujo’s captivity."
  },
  {
    "id": "description:kreshnikRrembimi1:3",
    "nodeId": "kreshnikRrembimi1",
    "lineIndex": 3,
    "placeId": "kreshnikRrembimi1",
    "text": "Halili të pyet: a do të vish me mua?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil is the present speaker offering companionship."
  },
  {
    "id": "description:kreshnikRrembimi1:4",
    "nodeId": "kreshnikRrembimi1",
    "lineIndex": 4,
    "placeId": "kreshnikRrembimi1",
    "text": "kali i Mujos pret te dera. kali godit tokën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "halil-door",
        "asset": "door",
        "label": "Halil’s door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "mujo-courser",
        "kind": "beside",
        "target": "halil-door"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s courser, Halil’s door; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimi1:5",
    "nodeId": "kreshnikRrembimi1",
    "lineIndex": 5,
    "placeId": "kreshnikRrembimi1",
    "text": "një zanë thotë: kali i Mujos mund të thyejë një derë të hekurt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zanas",
        "asset": "fairy",
        "label": "Zanas",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The horse is present but the door-breaking claim is an ability for later."
  },
  {
    "id": "description:kreshnikRrembimiNisja:0",
    "nodeId": "kreshnikRrembimiNisja",
    "lineIndex": 0,
    "placeId": "kreshnikRrembimi1",
    "text": "Halili thotë: mirë. kali është gati për rrugën drejt kullës së Krajlit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil and the courser are ready; the distant Krajl tower is not here."
  },
  {
    "id": "description:kreshnikRrembimiBurg:0",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 0,
    "placeId": "kreshnikRrembimiBurg",
    "text": "në agim, ti vjen te kulla e krajlit me Halilin dhe kalin.",
    "conditions": {
      "all": [
        "from:kreshnikRrembimiNisja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "krajl-tower",
        "asset": "tower",
        "label": "Krajl’s tower",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, Mujo’s courser, Krajl’s tower; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiBurg:1",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 1,
    "placeId": "kreshnikRrembimiBurg",
    "text": "pas derës së hekurt, Mujo thotë: Halili, a je ti?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "krajl-iron-door",
        "asset": "door",
        "label": "Iron prison door",
        "zone": "front",
        "attributes": {
          "color": "#62686b",
          "material": "iron"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:mujo",
        "kind": "behind",
        "target": "krajl-iron-door"
      }
    ],
    "disposition": "physical",
    "rationale": "Mujo is behind the opaque iron door, heard before he is visible."
  },
  {
    "id": "description:kreshnikRrembimiBurg:2",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 2,
    "placeId": "kreshnikRrembimiBurg",
    "text": "Halili thotë: po, vëlla. ne erdhëm për ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil responds to his brother’s voice."
  },
  {
    "id": "description:kreshnikRrembimiBurg:3",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 3,
    "placeId": "kreshnikRrembimiBurg",
    "text": "një rojë pret afër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "krajl-guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Prison guard; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiBurg:4",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 4,
    "placeId": "kreshnikRrembimiBurg",
    "text": "Halili pyet: si hapim derën? pastaj ai thotë: me duar nuk hapet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "krajl-iron-door",
        "asset": "door",
        "label": "Iron prison door",
        "zone": "front",
        "attributes": {
          "color": "#62686b",
          "material": "iron"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil asks about the physical locked obstacle."
  },
  {
    "id": "description:kreshnikRrembimiBurg:5",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 5,
    "placeId": "kreshnikRrembimiBurg",
    "text": "ti di se kali i Mujos mund të thyejë një derë të hekurt.",
    "conditions": {
      "all": [
        "knows:mujoCourserBreaksIron"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "A remembered courser ability does not break the door early."
  },
  {
    "id": "description:kreshnikRrembimiBurg:6",
    "nodeId": "kreshnikRrembimiBurg",
    "lineIndex": 6,
    "placeId": "kreshnikRrembimiBurg",
    "text": "Halili sjell kalin pranë teje dhe thotë: eja me ne te dera.",
    "conditions": {
      "all": [
        "knows:mujoCourserBreaksIron"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "krajl-iron-door",
        "asset": "door",
        "label": "Iron prison door",
        "zone": "front",
        "attributes": {
          "color": "#62686b",
          "material": "iron"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, Mujo’s courser, Iron prison door; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiFund:0",
    "nodeId": "kreshnikRrembimiFund",
    "lineIndex": 0,
    "placeId": "kreshnikRrembimiFund",
    "text": "ti dhe Halili e sillni kalin te dera e hekurt; kali e godet dhe e thyen.",
    "conditions": {
      "all": [
        "from:kreshnikRrembimiBurg"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "krajl-iron-door",
        "asset": "door",
        "label": "Broken iron prison door",
        "zone": "front",
        "attributes": {
          "broken": true,
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, Mujo’s courser, Broken iron prison door; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiFund:1",
    "nodeId": "kreshnikRrembimiFund",
    "lineIndex": 1,
    "placeId": "kreshnikRrembimiFund",
    "text": "Mujo del. Halili përqafon vëllanë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Halil; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiFund:2",
    "nodeId": "kreshnikRrembimiFund",
    "lineIndex": 2,
    "placeId": "kreshnikRrembimiFund",
    "text": "Në rrugën për në Jutbinë, bora shkrihet.",
    "conditions": {
      "all": [
        "season:spring"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-return-road",
        "asset": "road",
        "label": "Road home to Jutbina",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "melting-snow",
        "asset": "snow",
        "label": "Melting snow beside the road",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Road home to Jutbina, Melting snow beside the road; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiFund:3",
    "nodeId": "kreshnikRrembimiFund",
    "lineIndex": 3,
    "placeId": "kreshnikRrembimiFund",
    "text": "ju ktheheni bashkë në shtëpi. në Jutbina thonë: mirë se erdhët!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The journey resolves in homecoming; the small company remains continuous."
  },
  {
    "id": "description:kreshnikRrembimiHumbur:0",
    "nodeId": "kreshnikRrembimiHumbur",
    "lineIndex": 0,
    "placeId": "kreshnikRrembimiFund",
    "text": "ti ik nga roja. ai të dëgjon; Halili të tërheq dhe të dërgon në shtëpi, pastaj kthehet vetëm.",
    "conditions": {
      "all": [
        "from:kreshnikRrembimiBurg"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "krajl-guard",
        "asset": "human",
        "label": "Prison guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Halil pulls the player free; Mujo has not been rescued in this witnessed escape."
  },
  {
    "id": "description:kreshnikRrembimiHumbur:1",
    "nodeId": "kreshnikRrembimiHumbur",
    "lineIndex": 1,
    "placeId": "kreshnikRrembimiFund",
    "text": "kali thyen derën e hekurt. Mujo kthehet në shtëpi.",
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
    "rationale": "The subsequent rescue and return happen after the player is sent home."
  },
  {
    "id": "description:kreshnikRrembimiRefuz:0",
    "nodeId": "kreshnikRrembimiRefuz",
    "lineIndex": 0,
    "placeId": "kreshnikRrembimi1",
    "text": "ti rri në Jutbina. dera e Halilit mbyllet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "halil-door",
        "asset": "door",
        "label": "Halil’s door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "halil-door",
        "property": "open",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil’s door; the camera remains at the canonical place."
  },
  {
    "id": "description:kreshnikRrembimiRefuz:1",
    "nodeId": "kreshnikRrembimiRefuz",
    "lineIndex": 1,
    "placeId": "kreshnikRrembimi1",
    "text": "Halili merr kalin dhe shkon vetëm.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The departing companions recede from the viewpoint."
  },
  {
    "id": "description:kreshnikRrembimiRefuz:2",
    "nodeId": "kreshnikRrembimiRefuz",
    "lineIndex": 2,
    "placeId": "kreshnikRrembimi1",
    "text": "më vonë njerëzit thonë se në agim Halili u kthye në shtëpi me Mujon.",
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
    "rationale": "Later testimony reports their return rather than placing a second arrival in this moment."
  },
  {
    "id": "description:behuriJutbina:0",
    "nodeId": "behuriJutbina",
    "lineIndex": 0,
    "placeId": "odaJutbina",
    "text": "para agimit, Mujo ndez zjarrin në vatër dhe bën kafe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "oda-hearth",
        "asset": "hearth",
        "label": "Lit hearth",
        "zone": "front",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "coffee-cup",
        "asset": "cup",
        "label": "Prepared coffee",
        "zone": "near",
        "attributes": {
          "contents": "coffee"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Lit hearth, Prepared coffee; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriJutbina:1",
    "nodeId": "behuriJutbina",
    "lineIndex": 1,
    "placeId": "odaJutbina",
    "text": "Mujo thotë: Halili, a je zgjuar? thirri tridhjetë agallarët. nisemi sot.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo calls for Halil and thirty Agas; the call itself does not mean they have assembled yet."
  },
  {
    "id": "description:behuriJutbina:2",
    "nodeId": "behuriJutbina",
    "lineIndex": 2,
    "placeId": "odaJutbina",
    "text": "Halili pyet: ku po shkojmë? Mujo thotë: ku na çon zot.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The brothers discuss their route without locating an enemy."
  },
  {
    "id": "description:behuriJutbina:3",
    "nodeId": "behuriJutbina",
    "lineIndex": 3,
    "placeId": "odaJutbina",
    "text": "Mujo të jep një filxhan kafeje. pi. rruga është e gjatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "coffee-cup",
        "asset": "cup",
        "label": "Coffee given to the player",
        "zone": "near",
        "attributes": {
          "contents": "coffee"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Coffee given to the player; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriJutbina:4",
    "nodeId": "behuriJutbina",
    "lineIndex": 4,
    "placeId": "odaJutbina",
    "text": "Mujo thotë: ne nuk mund të presim. mos shko vetëm.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo warns the viewpoint to leave together."
  },
  {
    "id": "description:behuriJutbina:5",
    "nodeId": "behuriJutbina",
    "lineIndex": 5,
    "placeId": "odaJutbina",
    "text": "ti thua: faleminderit. jam gati.",
    "conditions": {
      "all": [
        "arrival:action:behuri-morning-coffee"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The viewpoint’s spoken thanks adds no entity."
  },
  {
    "id": "description:behuriJutbina:6",
    "nodeId": "behuriJutbina",
    "lineIndex": 6,
    "placeId": "odaJutbina",
    "text": "ti thua: nisemi bashkë. Mujo thotë: mirë. Çetat janë gati.",
    "conditions": {
      "all": [
        "arrival:action:behuri-agree-departure"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "agas-thirty",
        "asset": "human",
        "label": "Thirty Agas",
        "zone": "front",
        "attributes": {},
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The companies are now assembled for departure; the thirty summoned Agas are explicit."
  },
  {
    "id": "description:behuriNdarja:0",
    "nodeId": "behuriNdarja",
    "lineIndex": 0,
    "placeId": "behuriNdarja",
    "text": "pas dy ditësh, ti ke ecur me Mujo dhe çetat; nuk keni gjetur asnjë armik.",
    "conditions": {
      "all": [
        "from:behuriJutbina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-company",
        "asset": "human",
        "label": "Mujo’s company",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mountain-road",
        "asset": "road",
        "label": "Mountain road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The company reaches a road after two days; there is explicitly no enemy yet."
  },
  {
    "id": "description:behuriNdarja:1",
    "nodeId": "behuriNdarja",
    "lineIndex": 1,
    "placeId": "behuriNdarja",
    "text": "Pranë rrugës, uji ngrin mes gurëve.",
    "conditions": {
      "all": [
        "season:winter"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-road",
        "asset": "road",
        "label": "Mountain road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-rocks",
        "asset": "rock",
        "label": "Rocks around the spring",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "frozen-road-water",
        "asset": "water",
        "label": "Frozen water between the stones",
        "zone": "near",
        "attributes": {
          "frozen": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain road, Rocks around the spring, Frozen water between the stones; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriNdarja:2",
    "nodeId": "behuriNdarja",
    "lineIndex": 2,
    "placeId": "behuriNdarja",
    "text": "kali i Mujos ul kokën dhe qan.",
    "conditions": {
      "all": [
        "flag:trustedMujosCourser"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s courser; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriNdarja:3",
    "nodeId": "behuriNdarja",
    "lineIndex": 3,
    "placeId": "behuriNdarja",
    "text": "Mujo thotë: kjo nuk është një shenjë e mirë. ka rrezik. mos merr rrugën për në Kotorrin e ri.",
    "conditions": {
      "all": [
        "flag:trustedMujosCourser"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo warns of danger on a future route; no enemy is presently seen."
  },
  {
    "id": "description:behuriNdarja:4",
    "nodeId": "behuriNdarja",
    "lineIndex": 4,
    "placeId": "behuriNdarja",
    "text": "Osmani pyet: a je dakord? Mujo thotë: jo.",
    "conditions": {
      "all": [
        "flag:trustedMujosCourser"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osman",
        "asset": "human",
        "label": "Osman",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The two speakers disagree."
  },
  {
    "id": "description:behuriNdarja:5",
    "nodeId": "behuriNdarja",
    "lineIndex": 5,
    "placeId": "behuriNdarja",
    "text": "Osmani thotë: nuk jam dakord. ne do të vazhdojmë. eja me mua. çeta e tij ndahet.",
    "conditions": {
      "all": [
        "flag:trustedMujosCourser"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osman",
        "asset": "human",
        "label": "Osman",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osman-company",
        "asset": "human",
        "label": "Osman’s departing company",
        "zone": "right",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Osman’s company visibly separates to the side."
  },
  {
    "id": "description:behuriNdarja:6",
    "nodeId": "behuriNdarja",
    "lineIndex": 6,
    "placeId": "behuriNdarja",
    "text": "Mujo thotë: eja me mua. kali i tij kthehet drejt kroit.",
    "conditions": {
      "all": [
        "flag:trustedMujosCourser"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Mujo and the horse turn toward the spring."
  },
  {
    "id": "description:behuriBurimi:0",
    "nodeId": "behuriBurimi",
    "lineIndex": 0,
    "placeId": "behuriBurimi",
    "text": "ti vjen te kroi me Mujo; tridhjetë roje me armë shoqërojnë vajzat e Behurit.",
    "conditions": {
      "all": [
        "from:behuriNdarja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-spring",
        "asset": "spring",
        "label": "Spring among the rocks",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-thirty-guards",
        "asset": "human",
        "label": "Thirty armed guards",
        "zone": "front",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-daughters",
        "asset": "human",
        "label": "Behuri’s daughters",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Thirty guards is exact; the unspecified number of daughters is represented by a sample."
  },
  {
    "id": "description:behuriBurimi:1",
    "nodeId": "behuriBurimi",
    "lineIndex": 1,
    "placeId": "behuriBurimi",
    "text": "ti kthehesh nga kulla te kroi me Mujo.",
    "conditions": {
      "all": [
        "from:behuriKulla"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-spring",
        "asset": "spring",
        "label": "Spring among the rocks",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Spring among the rocks; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimi:2",
    "nodeId": "behuriBurimi",
    "lineIndex": 2,
    "placeId": "behuriBurimi",
    "text": "Uji i kroit është i freskët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-spring",
        "asset": "spring",
        "label": "Spring among the rocks",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Spring among the rocks; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimi:3",
    "nodeId": "behuriBurimi",
    "lineIndex": 3,
    "placeId": "behuriBurimi",
    "text": "burrat e Mujos luftojnë dhe i mundin rojet. Halili merr vajzat me forcë.",
    "conditions": {
      "all": [
        "from:behuriNdarja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-company",
        "asset": "human",
        "label": "Mujo’s company",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-thirty-guards",
        "asset": "human",
        "label": "Defeated thirty guards",
        "zone": "front",
        "attributes": {
          "pose": "lying"
        },
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-daughters",
        "asset": "human",
        "label": "Captured daughters",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The forced capture is an immediate visible consequence, not a freely offered companion."
  },
  {
    "id": "description:behuriBurimi:4",
    "nodeId": "behuriBurimi",
    "lineIndex": 4,
    "placeId": "behuriBurimi",
    "text": "ti kthehesh me Mujo për armët e lëna pranë kroit.",
    "conditions": {
      "all": [
        "from:behuriNdarja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-spring",
        "asset": "spring",
        "label": "Spring among the rocks",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "spring-weapons",
        "asset": "sword",
        "label": "Weapons left by the spring",
        "zone": "near",
        "attributes": {},
        "count": 6,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Spring among the rocks, Weapons left by the spring; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimi:5",
    "nodeId": "behuriBurimi",
    "lineIndex": 5,
    "placeId": "behuriBurimi",
    "text": "Mujo përkulet mbi ujë. një zë i qetë vjen nga gurët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "bending"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-spring",
        "asset": "spring",
        "label": "Spring among the rocks",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-rocks",
        "asset": "rock",
        "label": "Rocks around the spring",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Spring among the rocks, Rocks around the spring; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimi:6",
    "nodeId": "behuriBurimi",
    "lineIndex": 6,
    "placeId": "behuriBurimi",
    "text": "Ora e tij i pëshpërit: mos pi.",
    "conditions": {
      "all": [
        "flag:heardBehuriOra"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo-ora",
        "asset": "spirit",
        "label": "Mujo’s Ora",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Ora’s warning is heard at the rocks; no drink has been taken."
  },
  {
    "id": "description:behuriBurimi:7",
    "nodeId": "behuriBurimi",
    "lineIndex": 7,
    "placeId": "behuriBurimi",
    "text": "ajo lë dy çelësa për Mujon. uji është një kurth; burrat e Behurit presin pas gurëve.",
    "conditions": {
      "all": [
        "flag:heardBehuriOra"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo-ora",
        "asset": "spirit",
        "label": "Mujo’s Ora",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "ora-keys",
        "asset": "key",
        "label": "Two steel keys",
        "zone": "near",
        "attributes": {
          "color": "#879098"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "behuri-rocks",
        "asset": "rock",
        "label": "Rocks around the spring",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-hidden-men",
        "asset": "human",
        "label": "Behuri’s men behind the rocks",
        "zone": "back",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "behuri-hidden-men",
        "kind": "behind",
        "target": "behuri-rocks"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s Ora, Two steel keys, Rocks around the spring, Behuri’s men behind the rocks; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimi:8",
    "nodeId": "behuriBurimi",
    "lineIndex": 8,
    "placeId": "behuriBurimi",
    "text": "ti mban dy çelësat e Orës.",
    "conditions": {
      "all": [
        "celesatOras"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-keys",
        "asset": "key",
        "label": "Two steel keys",
        "zone": "near",
        "attributes": {
          "color": "#879098"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two steel keys; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimi:9",
    "nodeId": "behuriBurimi",
    "lineIndex": 9,
    "placeId": "behuriBurimi",
    "text": "Pas gurëve rri kulla e Behurit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-tower",
        "asset": "tower",
        "label": "Behuri’s tower",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-rocks",
        "asset": "rock",
        "label": "Rocks around the spring",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "behuri-tower",
        "kind": "behind",
        "target": "behuri-rocks"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Behuri’s tower, Rocks around the spring; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:0",
    "nodeId": "behuriKulla",
    "lineIndex": 0,
    "placeId": "behuriKulla",
    "text": "porta e Behurit rri e hapur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-gate",
        "asset": "gate",
        "label": "Behuri’s gate",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Behuri’s gate; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:1",
    "nodeId": "behuriKulla",
    "lineIndex": 1,
    "placeId": "behuriKulla",
    "text": "ti mban dy çelësat e Orës për Mujon.",
    "conditions": {
      "all": [
        "celesatOras"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-keys",
        "asset": "key",
        "label": "Two steel keys",
        "zone": "near",
        "attributes": {
          "color": "#879098"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two steel keys; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:2",
    "nodeId": "behuriKulla",
    "lineIndex": 2,
    "placeId": "behuriKulla",
    "text": "natën, era e ftohtë vjen nga porta e hapur.",
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
        "key": "behuri-gate",
        "asset": "gate",
        "label": "Behuri’s gate",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Cold wind enters the open gate at night."
  },
  {
    "id": "description:behuriKulla:3",
    "nodeId": "behuriKulla",
    "lineIndex": 3,
    "placeId": "behuriKulla",
    "text": "Behuri nuk është këtu ende.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "absence",
    "rationale": "Behuri is explicitly not here yet."
  },
  {
    "id": "description:behuriKulla:4",
    "nodeId": "behuriKulla",
    "lineIndex": 4,
    "placeId": "behuriKulla",
    "text": "Mujo pyet: cila derë?",
    "conditions": {
      "all": [
        "flag:behuriDoorNamed"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo asks which physical door to open."
  },
  {
    "id": "description:behuriKulla:5",
    "nodeId": "behuriKulla",
    "lineIndex": 5,
    "placeId": "behuriKulla",
    "text": "ti përgjigjesh: dera e ahurit.",
    "conditions": {
      "all": [
        "arrival:action:behuri-name-stable-door"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player names the stable door before opening it."
  },
  {
    "id": "description:behuriKulla:6",
    "nodeId": "behuriKulla",
    "lineIndex": 6,
    "placeId": "behuriKulla",
    "text": "dera e ahurit është e kyçur.",
    "conditions": {
      "all": [
        "flag:behuriStableOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-stable-door",
        "asset": "door",
        "label": "Locked stable door",
        "zone": "front",
        "attributes": {
          "locked": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Locked stable door; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:7",
    "nodeId": "behuriKulla",
    "lineIndex": 7,
    "placeId": "behuriKulla",
    "text": "ti hap derën e ahurit me çelësat.",
    "conditions": {
      "all": [
        "flag:behuriStableOpened"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-keys",
        "asset": "key",
        "label": "Two steel keys",
        "zone": "near",
        "attributes": {
          "color": "#879098"
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "behuri-stable-door",
        "asset": "door",
        "label": "Open stable door",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two steel keys, Open stable door; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:8",
    "nodeId": "behuriKulla",
    "lineIndex": 8,
    "placeId": "behuriKulla",
    "text": "brenda varen tridhjetë shpata dhe tridhjetë koka.",
    "conditions": {
      "all": [
        "flag:behuriStableOpened"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-thirty-swords",
        "asset": "sword",
        "label": "Thirty hanging swords",
        "zone": "front",
        "attributes": {},
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "behuri-thirty-heads",
        "asset": "head",
        "label": "Thirty hanging heads",
        "zone": "back",
        "attributes": {},
        "count": 30,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Both explicit quantities are preserved as separate modeled objects."
  },
  {
    "id": "description:behuriKulla:9",
    "nodeId": "behuriKulla",
    "lineIndex": 9,
    "placeId": "behuriKulla",
    "text": "baruti është brenda. Mujo bën një fitil.",
    "conditions": {
      "all": [
        "flag:behuriStableOpened"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-powder",
        "asset": "gunpowder",
        "label": "Gunpowder in the tower",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "behuri-fuse",
        "asset": "fuse",
        "label": "Gunpowder fuse",
        "zone": "near",
        "attributes": {
          "burning": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Gunpowder in the tower, Gunpowder fuse, Mujo; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:10",
    "nodeId": "behuriKulla",
    "lineIndex": 10,
    "placeId": "behuriKulla",
    "text": "Mujo thotë: ne duhet të ikim. Behuri po vjen.",
    "conditions": {
      "all": [
        "flag:behuriStableOpened"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Behuri is approaching offstage; Mujo’s warning does not place him inside yet."
  },
  {
    "id": "description:behuriKulla:11",
    "nodeId": "behuriKulla",
    "lineIndex": 11,
    "placeId": "behuriKulla",
    "text": "brenda kullës, fitili digjet pranë barutit.",
    "conditions": {
      "all": [
        "flag:behuriFuseLit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-powder",
        "asset": "gunpowder",
        "label": "Gunpowder in the tower",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "behuri-fuse",
        "asset": "fuse",
        "label": "Gunpowder fuse",
        "zone": "near",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "behuri-fuse",
        "kind": "beside",
        "target": "behuri-powder"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Gunpowder in the tower, Gunpowder fuse; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKulla:12",
    "nodeId": "behuriKulla",
    "lineIndex": 12,
    "placeId": "behuriKulla",
    "text": "ti ndiz fitilin.",
    "conditions": {
      "all": [
        "arrival:action:story:behuri-kulla:ndiz-fitil"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-fuse",
        "asset": "fuse",
        "label": "Gunpowder fuse",
        "zone": "near",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Gunpowder fuse; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriMejdan:0",
    "nodeId": "behuriMejdan",
    "lineIndex": 0,
    "placeId": "behuriMejdan",
    "text": "ti ik nga kulla me Mujo, ndërsa fitili digjet pas teje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-tower",
        "asset": "tower",
        "label": "Behuri’s tower",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-fuse",
        "asset": "fuse",
        "label": "Gunpowder fuse",
        "zone": "near",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "behuri-tower",
        "kind": "behind",
        "target": "actor:mujo"
      }
    ],
    "disposition": "physical",
    "rationale": "The burning tower is behind the fleeing company."
  },
  {
    "id": "description:behuriMejdan:1",
    "nodeId": "behuriMejdan",
    "lineIndex": 1,
    "placeId": "behuriMejdan",
    "text": "në mejdan, Behuri sulmon Mujo.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-duel-ground",
        "asset": "field",
        "label": "Open duel ground",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Behuri, Open duel ground; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriMejdan:2",
    "nodeId": "behuriMejdan",
    "lineIndex": 2,
    "placeId": "behuriMejdan",
    "text": "Behuri mban duart e Mujos në tokë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Behuri pins Mujo to the ground."
  },
  {
    "id": "description:behuriMejdan:3",
    "nodeId": "behuriMejdan",
    "lineIndex": 3,
    "placeId": "behuriMejdan",
    "text": "Ora e Mujos pëshpërit: kërko të shohësh diellin për një herë të fundit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo-ora",
        "asset": "spirit",
        "label": "Mujo’s Ora",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Ora advises Mujo before his final appeal."
  },
  {
    "id": "description:behuriMejdan:4",
    "nodeId": "behuriMejdan",
    "lineIndex": 4,
    "placeId": "behuriMejdan",
    "text": "më parë i besove kalit. tani e njeh zërin e qetë të Orës.",
    "conditions": {
      "all": [
        "flag:trustedMujosCourser"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Recognition of the Ora’s voice recalls the prior courser warning."
  },
  {
    "id": "description:behuriMejdan:5",
    "nodeId": "behuriMejdan",
    "lineIndex": 5,
    "placeId": "behuriMejdan",
    "text": "Mujo të pyet: çfarë duhet të bëj?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo asks from his pinned position."
  },
  {
    "id": "description:behuriMejdan:6",
    "nodeId": "behuriMejdan",
    "lineIndex": 6,
    "placeId": "behuriMejdan",
    "text": "Mujo nuk thotë gjë ende.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "His silence is not a new physical prop."
  },
  {
    "id": "description:behuriMejdanKeshilla:0",
    "nodeId": "behuriMejdanKeshilla",
    "lineIndex": 0,
    "placeId": "behuriMejdan",
    "text": "ti thua: shiko diellin. Mujo kërkon ta shohë për një herë të fundit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The player advises Mujo and he speaks before the attack."
  },
  {
    "id": "description:behuriMejdanKeshilla:1",
    "nodeId": "behuriMejdanKeshilla",
    "lineIndex": 1,
    "placeId": "behuriMejdan",
    "text": "Behuri kthehet drejt diellit. Mujo merr thikën dhe godet. Behuri bie, dhe fitili digjet; kulla e tij bie.",
    "conditions": {
      "all": [
        "flag:watchedMujoDefeatBehuri"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "heldItem": "knife"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-tower",
        "asset": "tower",
        "label": "Behuri’s tower",
        "zone": "far",
        "attributes": {
          "broken": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Mujo holds the dagger; Behuri is fallen and his tower collapses after the lit fuse."
  },
  {
    "id": "description:behuriMejdanKeshilla:2",
    "nodeId": "behuriMejdanKeshilla",
    "lineIndex": 2,
    "placeId": "behuriMejdan",
    "text": "Mujo thotë: eja me mua; kthehemi në shtëpi në Jutbinë.",
    "conditions": {
      "all": [
        "flag:watchedMujoDefeatBehuri"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo invites the return; Jutbina remains a destination."
  },
  {
    "id": "description:behuriFund:0",
    "nodeId": "behuriFund",
    "lineIndex": 0,
    "placeId": "behuriFund",
    "text": "ti kthehesh me Mujo në Jutbina para natës.",
    "conditions": {
      "all": [
        "from:behuriMejdanKeshilla"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Jutbina towers; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKotorHumbur:0",
    "nodeId": "behuriKotorHumbur",
    "lineIndex": 0,
    "placeId": "behuriNdarja",
    "text": "ti merr rrugën për në Kotorrin e ri me Osmanin.",
    "conditions": {
      "all": [
        "from:behuriNdarja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osman",
        "asset": "human",
        "label": "Osman",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "kotor-road",
        "asset": "road",
        "label": "Road to New Kotor",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Osman, Road to New Kotor; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKotorHumbur:1",
    "nodeId": "behuriKotorHumbur",
    "lineIndex": 1,
    "placeId": "behuriNdarja",
    "text": "pas teje, kali i Mujos ende qan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "back",
        "attributes": {
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s courser; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKotorHumbur:2",
    "nodeId": "behuriKotorHumbur",
    "lineIndex": 2,
    "placeId": "behuriNdarja",
    "text": "burrat e Behurit mbyllin rrugën para jush dhe kapin çetën e Osmanit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:osman",
        "asset": "human",
        "label": "Osman",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osman-company",
        "asset": "human",
        "label": "Captured company",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-men",
        "asset": "human",
        "label": "Behuri’s captors",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Osman, Captured company, Behuri’s captors; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimHumbur:0",
    "nodeId": "behuriBurimHumbur",
    "lineIndex": 0,
    "placeId": "behuriBurimi",
    "text": "ti pi. pas gurëve, burrat e Behurit ngrihen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-spring",
        "asset": "spring",
        "label": "Spring among the rocks",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-rocks",
        "asset": "rock",
        "label": "Rocks around the spring",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "behuri-men",
        "asset": "human",
        "label": "Men rising behind the stones",
        "zone": "back",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Spring among the rocks, Rocks around the spring, Men rising behind the stones; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriBurimHumbur:1",
    "nodeId": "behuriBurimHumbur",
    "lineIndex": 1,
    "placeId": "behuriBurimi",
    "text": "ti nuk dëgjove fjalën e Orës, dhe burrat e Behurit të kap.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "behuri-men",
        "asset": "human",
        "label": "The player’s captors",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The ignored warning is past knowledge; the captors are present."
  },
  {
    "id": "description:behuriKullaHumbur:0",
    "nodeId": "behuriKullaHumbur",
    "lineIndex": 0,
    "placeId": "behuriKulla",
    "text": "ti pret brenda kullës. Behuri hyn nga porta.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-gate",
        "asset": "gate",
        "label": "Behuri’s gate",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Behuri, Behuri’s gate; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKullaHumbur:1",
    "nodeId": "behuriKullaHumbur",
    "lineIndex": 1,
    "placeId": "behuriKulla",
    "text": "dera mbyllet pas tij.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-gate",
        "asset": "gate",
        "label": "Behuri’s gate",
        "zone": "front",
        "attributes": {
          "open": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Behuri, Behuri’s gate; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriKullaHumbur:2",
    "nodeId": "behuriKullaHumbur",
    "lineIndex": 2,
    "placeId": "behuriKulla",
    "text": "Behuri mbyll daljen e vetme dhe të kap.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "behuri-gate",
        "asset": "gate",
        "label": "Behuri’s gate",
        "zone": "front",
        "attributes": {
          "open": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Behuri blocks the closed exit."
  },
  {
    "id": "description:behuriMejdanHumbur:0",
    "nodeId": "behuriMejdanHumbur",
    "lineIndex": 0,
    "placeId": "behuriMejdan",
    "text": "Mujo dorëzohet. Behuri nuk e lë të ikë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:behuri",
        "asset": "human",
        "label": "Behuri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Behuri; the camera remains at the canonical place."
  },
  {
    "id": "description:behuriMejdanHumbur:1",
    "nodeId": "behuriMejdanHumbur",
    "lineIndex": 1,
    "placeId": "behuriMejdan",
    "text": "dielli bie, dhe rruga në Jutbina bëhet e errët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-return-road",
        "asset": "road",
        "label": "Darkening road to Jutbina",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Darkening road to Jutbina; the camera remains at the canonical place."
  },
  {
    "id": "description:kengaJutbina:0",
    "nodeId": "kengaJutbina",
    "lineIndex": 0,
    "placeId": "jutbina",
    "text": "ti këndon me lahutën për Mujon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-lute",
        "asset": "lute",
        "label": "Sounding lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player performs with the actual lahuta; no duplicate player body is shown."
  },
  {
    "id": "description:kengaJutbina:1",
    "nodeId": "kengaJutbina",
    "lineIndex": 1,
    "placeId": "jutbina",
    "text": "burra rrinë dhe dëgjojnë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Men gathered in the oda; the camera remains at the canonical place."
  },
  {
    "id": "description:kengaJutbina:2",
    "nodeId": "kengaJutbina",
    "lineIndex": 2,
    "placeId": "jutbina",
    "text": "Mujo dhe Halili dëgjojnë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Halil; the camera remains at the canonical place."
  },
  {
    "id": "description:kengaJutbina:3",
    "nodeId": "kengaJutbina",
    "lineIndex": 3,
    "placeId": "jutbina",
    "text": "ti këndon me lahutën. burra japin tetëqind lekë.",
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
        "key": "jutbina-lute",
        "asset": "lute",
        "label": "Sounding lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "oda-men",
        "asset": "human",
        "label": "Men gathered in the oda",
        "zone": "near",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "song-payment",
        "asset": "money",
        "label": "Payment of 800 nominal lek",
        "zone": "near",
        "attributes": {
          "amount": 800,
          "currency": "lek"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The exact monetary amount is metadata on one payment, not 800 invented coins."
  },
  {
    "id": "description:kengaJutbina:4",
    "nodeId": "kengaJutbina",
    "lineIndex": 4,
    "placeId": "jutbina",
    "text": "Mujo thotë: ti këndon si një trim!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo praises the completed performance."
  },
  {
    "id": "description:kengaJutbina:5",
    "nodeId": "kengaJutbina",
    "lineIndex": 5,
    "placeId": "jutbina",
    "text": "Rruga ngjitet nga kullat drejt majës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "summit-path",
        "asset": "road",
        "label": "Climbing path to the summit",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Climbing path to the summit, Jutbina towers; the camera remains at the canonical place."
  },
  {
    "id": "description:mujiZana1:0",
    "nodeId": "mujiZana1",
    "lineIndex": 0,
    "placeId": "mujiZana1",
    "text": "natën një gur i madh është këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-strength-stone",
        "asset": "rock",
        "label": "Large stone",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Large stone; the camera remains at the canonical place."
  },
  {
    "id": "description:mujiZana1:1",
    "nodeId": "mujiZana1",
    "lineIndex": 1,
    "placeId": "mujiZana1",
    "text": "hëna bie mbi gurin dhe mbi djepet.",
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
        "key": "mujo-strength-stone",
        "asset": "rock",
        "label": "Large stone",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "zana-cradles",
        "asset": "cradle",
        "label": "Two cradles",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Large stone, Two cradles; the camera remains at the canonical place."
  },
  {
    "id": "description:mujiZana1:2",
    "nodeId": "mujiZana1",
    "lineIndex": 2,
    "placeId": "mujiZana1",
    "text": "këtu janë dy djepe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zana-cradles",
        "asset": "cradle",
        "label": "Two cradles",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two cradles; the camera remains at the canonical place."
  },
  {
    "id": "description:mujiZana1:3",
    "nodeId": "mujiZana1",
    "lineIndex": 3,
    "placeId": "mujiZana1",
    "text": "dy fëmijë kanë lot: askush nuk vjen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zana-babies",
        "asset": "child",
        "label": "Two crying children",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "tears": true
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zana-cradles",
        "asset": "cradle",
        "label": "Two cradles",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "zana-babies",
        "kind": "inside",
        "target": "zana-cradles"
      }
    ],
    "disposition": "physical",
    "rationale": "Exactly two crying children lie in the two cradles; no adult has arrived."
  },
  {
    "id": "description:mujiZana2:0",
    "nodeId": "mujiZana2",
    "lineIndex": 0,
    "placeId": "mujiZana1",
    "text": "ti tund djepet deri në agim.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zana-cradles",
        "asset": "cradle",
        "label": "Two cradles",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "zana-babies",
        "asset": "child",
        "label": "Two crying children",
        "zone": "near",
        "attributes": {
          "pose": "lying",
          "tears": true
        },
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied player rocks the two cradles until dawn."
  },
  {
    "id": "description:mujiZana2:1",
    "nodeId": "mujiZana2",
    "lineIndex": 1,
    "placeId": "mujiZana1",
    "text": "dy zana vijnë si dy drita.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The two Zanas arrive; their comparison to light does not create two extra lamps."
  },
  {
    "id": "description:mujiZana2:2",
    "nodeId": "mujiZana2",
    "lineIndex": 2,
    "placeId": "mujiZana1",
    "text": "zanat janë nëna.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The two present Zanas identify themselves and speak."
  },
  {
    "id": "description:mujiZana2:3",
    "nodeId": "mujiZana2",
    "lineIndex": 3,
    "placeId": "mujiZana1",
    "text": "zanat thonë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The two present Zanas identify themselves and speak."
  },
  {
    "id": "description:mujiZana2:4",
    "nodeId": "mujiZana2",
    "lineIndex": 4,
    "placeId": "mujiZana1",
    "text": "Mujo tund djepet këtu. zanat thonë: zgjedh një gjë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zana-cradles",
        "asset": "cradle",
        "label": "Two cradles",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo is the embodied player; the Zanas offer one future gift."
  },
  {
    "id": "description:mujiZana2:5",
    "nodeId": "mujiZana2",
    "lineIndex": 5,
    "placeId": "mujiZana1",
    "text": "kush ka dije, dëgjon zogun.",
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
    "rationale": "Hearing a bird is the described power of wisdom, not an actual bird arriving now."
  },
  {
    "id": "description:mujiZana2:6",
    "nodeId": "mujiZana2",
    "lineIndex": 6,
    "placeId": "mujiZana1",
    "text": "zgjedh: fuqi, pasuri, ose dije.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Strength, wealth and wisdom are alternatives before the player chooses."
  },
  {
    "id": "description:mujiFund:0",
    "nodeId": "mujiFund",
    "lineIndex": 0,
    "placeId": "mujiZana1",
    "text": "Zanat të japin qumësht.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "milk-cup",
        "asset": "cup",
        "label": "Cup of milk",
        "zone": "near",
        "attributes": {
          "contents": "milk"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two mother Zanas, Cup of milk; the camera remains at the canonical place."
  },
  {
    "id": "description:mujiFund:1",
    "nodeId": "mujiFund",
    "lineIndex": 1,
    "placeId": "mujiZana1",
    "text": "ti ke fuqi të madhe.",
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
    "rationale": "Strength is a changed capability of the embodied player."
  },
  {
    "id": "description:mujiFund:2",
    "nodeId": "mujiFund",
    "lineIndex": 2,
    "placeId": "mujiZana1",
    "text": "ti ngre gurin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-strength-stone",
        "asset": "rock",
        "label": "Large stone",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The lifted stone is above ground; do not duplicate the embodied lifter."
  },
  {
    "id": "description:mujiFund:3",
    "nodeId": "mujiFund",
    "lineIndex": 3,
    "placeId": "mujiZana1",
    "text": "zanat janë mike.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Zanas establish friendship."
  },
  {
    "id": "description:mujiPasuri:0",
    "nodeId": "mujiPasuri",
    "lineIndex": 0,
    "placeId": "mujiZana1",
    "text": "Zanat të japin pasurinë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zana-wealth",
        "asset": "gold",
        "label": "Wealth given by the Zanas",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two mother Zanas, Wealth given by the Zanas; the camera remains at the canonical place."
  },
  {
    "id": "description:mujiPasuri:1",
    "nodeId": "mujiPasuri",
    "lineIndex": 1,
    "placeId": "mujiZana1",
    "text": "por ti nuk je i fortë.",
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
    "rationale": "The player lacks the unchosen strength gift."
  },
  {
    "id": "description:mujiDije:0",
    "nodeId": "mujiDije",
    "lineIndex": 0,
    "placeId": "mujiZana1",
    "text": "Zanat të japin dije.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:two-mother-zanas",
        "asset": "fairy",
        "label": "Two mother Zanas",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Wisdom is a nonvisual gift from the two actual speakers."
  },
  {
    "id": "description:mujiDije:1",
    "nodeId": "mujiDije",
    "lineIndex": 1,
    "placeId": "mujiZana1",
    "text": "por ti nuk je i fortë.",
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
    "rationale": "The wisdom choice does not grant strength."
  },
  {
    "id": "description:tomor3:0",
    "nodeId": "tomor3",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "Tomor thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Tomor is the present narrator."
  },
  {
    "id": "description:tomor3:1",
    "nodeId": "tomor3",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "kulshedra ka shumë koka: ti pret një, dhe vjen një tjetër.",
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
    "rationale": "Tomor reports the distant monster’s regenerating heads; it is not on the summit."
  },
  {
    "id": "description:tomor3:2",
    "nodeId": "tomor3",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "një pus i vjetër zbret poshtë, në errësirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-well",
        "asset": "well",
        "label": "Old well descending into darkness",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Old well descending into darkness; the camera remains at the canonical place."
  },
  {
    "id": "description:sari1:0",
    "nodeId": "sari1",
    "lineIndex": 0,
    "placeId": "sari1",
    "text": "një kulshedër do bijën e mbretit.",
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
    "rationale": "The Kulshedra’s demand concerns the king’s daughter elsewhere."
  },
  {
    "id": "description:sari1:1",
    "nodeId": "sari1",
    "lineIndex": 1,
    "placeId": "sari1",
    "text": "ti vjen te shpella me dervishin.",
    "conditions": {
      "all": [
        "from:pusi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "sari-cave",
        "asset": "cave",
        "label": "Kulshedra’s cave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sari Salltëk, Kulshedra’s cave; the camera remains at the canonical place."
  },
  {
    "id": "description:sari1:2",
    "nodeId": "sari1",
    "lineIndex": 2,
    "placeId": "sari1",
    "text": "Era fishkëllen te hyrja e shpellës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sari-cave",
        "asset": "cave",
        "label": "Whistling cave entrance",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Whistling cave entrance; the camera remains at the canonical place."
  },
  {
    "id": "description:sari1:3",
    "nodeId": "sari1",
    "lineIndex": 3,
    "placeId": "sari1",
    "text": "atje dervishi vret kulshedrën me një shpatë druri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:sari-kulshedra",
        "asset": "dragon",
        "label": "Dead Kulshedra",
        "zone": "front",
        "attributes": {
          "dead": true,
          "heads": 7
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "sari-wooden-sword",
        "asset": "sword",
        "label": "Wooden sword",
        "zone": "near",
        "attributes": {
          "color": "#937044",
          "material": "wood"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sari Salltëk, Dead Kulshedra, Wooden sword; the camera remains at the canonical place."
  },
  {
    "id": "description:sari1:4",
    "nodeId": "sari1",
    "lineIndex": 4,
    "placeId": "sari1",
    "text": "pastaj ai ia pret të shtatë kokat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "kulshedra-seven-heads",
        "asset": "dragon",
        "label": "Seven severed Kulshedra heads",
        "zone": "near",
        "attributes": {
          "variant": "heads",
          "heads": 1
        },
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:sari-kulshedra",
        "asset": "dragon",
        "label": "Headless dead Kulshedra",
        "zone": "front",
        "attributes": {
          "dead": true,
          "heads": 0
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sari Salltëk, Seven severed Kulshedra heads, Headless dead Kulshedra; the camera remains at the canonical place."
  },
  {
    "id": "description:sari1:5",
    "nodeId": "sari1",
    "lineIndex": 5,
    "placeId": "sari1",
    "text": "dervishi merr shtatë gjuhë si provë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "kulshedra-seven-tongues",
        "asset": "tongue",
        "label": "Seven tongues kept as proof",
        "zone": "near",
        "attributes": {},
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sari Salltëk, Seven tongues kept as proof; the camera remains at the canonical place."
  },
  {
    "id": "description:sari1:6",
    "nodeId": "sari1",
    "lineIndex": 6,
    "placeId": "sari1",
    "text": "emri i tij është Sari Salltëk.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The dervish identifies himself and invites the next journey; no king appears in the cave."
  },
  {
    "id": "description:sari1:7",
    "nodeId": "sari1",
    "lineIndex": 7,
    "placeId": "sari1",
    "text": "Dervishi thotë: eja me mua para mbretit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The dervish identifies himself and invites the next journey; no king appears in the cave."
  },
  {
    "id": "description:sari1:8",
    "nodeId": "sari1",
    "lineIndex": 8,
    "placeId": "sari1",
    "text": "Rruga e shpellës kthehet te pusi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sari-well-road",
        "asset": "road",
        "label": "Cave road back to the well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Cave road back to the well; the camera remains at the canonical place."
  },
  {
    "id": "description:sari2:0",
    "nodeId": "sari2",
    "lineIndex": 0,
    "placeId": "sari1",
    "text": "ti vjen te mbreti me dervishin dhe shtatë gjuhët.",
    "conditions": {
      "all": [
        "from:sari1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "kulshedra-seven-tongues",
        "asset": "tongue",
        "label": "Seven tongues kept as proof",
        "zone": "near",
        "attributes": {},
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sari Salltëk, The Krajl, Seven tongues kept as proof; the camera remains at the canonical place."
  },
  {
    "id": "description:sari2:1",
    "nodeId": "sari2",
    "lineIndex": 1,
    "placeId": "sari1",
    "text": "një trim merr shtatë koka.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:false-dragon-slayer",
        "asset": "human",
        "label": "False claimant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "kulshedra-seven-heads",
        "asset": "dragon",
        "label": "Seven severed Kulshedra heads",
        "zone": "near",
        "attributes": {
          "variant": "heads",
          "heads": 1
        },
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes False claimant, Seven severed Kulshedra heads; the camera remains at the canonical place."
  },
  {
    "id": "description:sari2:2",
    "nodeId": "sari2",
    "lineIndex": 2,
    "placeId": "sari1",
    "text": "trimi thotë: unë vras kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:false-dragon-slayer",
        "asset": "human",
        "label": "False claimant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The false claimant speaks; the killing he claims is not repeated."
  },
  {
    "id": "description:sari2:3",
    "nodeId": "sari2",
    "lineIndex": 3,
    "placeId": "sari1",
    "text": "por dervishi ka shtatë gjuhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "kulshedra-seven-tongues",
        "asset": "tongue",
        "label": "Seven tongues kept as proof",
        "zone": "near",
        "attributes": {},
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sari Salltëk, Seven tongues kept as proof; the camera remains at the canonical place."
  },
  {
    "id": "description:sari2:4",
    "nodeId": "sari2",
    "lineIndex": 4,
    "placeId": "sari1",
    "text": "mbreti jep bijën, por dervishi thotë: jo.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:sari-princess",
        "asset": "human",
        "label": "King’s daughter",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The king offers his daughter and the dervish refuses; she does not become a transferred object."
  },
  {
    "id": "description:sari2:5",
    "nodeId": "sari2",
    "lineIndex": 5,
    "placeId": "sari1",
    "text": "mbreti thotë: dervishi ka shtatë varre në shtatë vende.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Seven graves in seven places are the king’s reported lore, not seven graves in his room."
  },
  {
    "id": "description:sari2:6",
    "nodeId": "sari2",
    "lineIndex": 6,
    "placeId": "sari1",
    "text": "Rruga nga mbreti kthehet te pusi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "king-well-road",
        "asset": "road",
        "label": "Road back to the well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Road back to the well; the camera remains at the canonical place."
  },
  {
    "id": "description:sariFund:0",
    "nodeId": "sariFund",
    "lineIndex": 0,
    "placeId": "sari1",
    "text": "ti shiko shtatë gjuhët dhe shtatë kokat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "kulshedra-seven-tongues",
        "asset": "tongue",
        "label": "Seven tongues kept as proof",
        "zone": "near",
        "attributes": {},
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "kulshedra-seven-heads",
        "asset": "dragon",
        "label": "Seven severed Kulshedra heads",
        "zone": "near",
        "attributes": {
          "variant": "heads",
          "heads": 1
        },
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Seven tongues kept as proof, Seven severed Kulshedra heads; the camera remains at the canonical place."
  },
  {
    "id": "description:sariFund:1",
    "nodeId": "sariFund",
    "lineIndex": 1,
    "placeId": "sari1",
    "text": "shtatë gjuhë nga shtatë koka.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "kulshedra-seven-tongues",
        "asset": "tongue",
        "label": "Seven tongues kept as proof",
        "zone": "near",
        "attributes": {},
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "kulshedra-seven-heads",
        "asset": "dragon",
        "label": "Seven severed Kulshedra heads",
        "zone": "near",
        "attributes": {
          "variant": "heads",
          "heads": 1
        },
        "count": 7,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Seven tongues kept as proof, Seven severed Kulshedra heads; the camera remains at the canonical place."
  },
  {
    "id": "description:sariFund:2",
    "nodeId": "sariFund",
    "lineIndex": 2,
    "placeId": "sari1",
    "text": "dervishi është trimi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The seven matching proofs establish the actual hero and his refusal."
  },
  {
    "id": "description:sariFund:3",
    "nodeId": "sariFund",
    "lineIndex": 3,
    "placeId": "sari1",
    "text": "dervishi nuk do bijën e mbretit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sari-salltek",
        "asset": "human",
        "label": "Sari Salltëk",
        "zone": "near",
        "attributes": {
          "beard": true,
          "heldItem": "sword",
          "heldAttributes": {
            "color": "#937044",
            "material": "wood"
          }
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The seven matching proofs establish the actual hero and his refusal."
  },
  {
    "id": "description:tsHyrje:0",
    "nodeId": "tsHyrje",
    "lineIndex": 0,
    "placeId": "tsHyrje",
    "text": "ti shko nëpër rrugën që zbret nga maja dhe arrin te dy malet mbi qytetin.",
    "conditions": {
      "all": [
        "from:maja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-shpirag-pair",
        "asset": "mountain",
        "label": "Two mountains above the city",
        "zone": "far",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two mountains above the city, City below the two mountains; the camera remains at the canonical place."
  },
  {
    "id": "description:tsHyrje:1",
    "nodeId": "tsHyrje",
    "lineIndex": 1,
    "placeId": "tsHyrje",
    "text": "këtu një mal dhe një mal tjetër rrinë mbi qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-shpirag-pair",
        "asset": "mountain",
        "label": "Two mountains above the city",
        "zone": "far",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Two mountains above the city, City below the two mountains; the camera remains at the canonical place."
  },
  {
    "id": "description:tsHyrje:2",
    "nodeId": "tsHyrje",
    "lineIndex": 2,
    "placeId": "tsHyrje",
    "text": "ti je një burrë i madh.",
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
    "rationale": "The great man is the embodied player, not a second body before the eye."
  },
  {
    "id": "description:tsHyrje:3",
    "nodeId": "tsHyrje",
    "lineIndex": 3,
    "placeId": "tsHyrje",
    "text": "një plak me mjekër. katër shqiponja janë lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-elder",
        "asset": "human",
        "label": "Mountain elder",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mountain elder, Four eagles; the camera remains at the canonical place."
  },
  {
    "id": "description:tsHyrje:4",
    "nodeId": "tsHyrje",
    "lineIndex": 4,
    "placeId": "tsHyrje",
    "text": "Bukura shkon me erën mes malit dhe detit.",
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
    "rationale": "The Beauty’s recurring travel between mountain and sea is a pattern, not simultaneous bodies at both places."
  },
  {
    "id": "description:tsHyrje:5",
    "nodeId": "tsHyrje",
    "lineIndex": 5,
    "placeId": "tsHyrje",
    "text": "natën Bukura është lart në mal.",
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
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:tsHyrje:6",
    "nodeId": "tsHyrje",
    "lineIndex": 6,
    "placeId": "tsHyrje",
    "text": "ditën Bukura është në det.",
    "conditions": {
      "all": [
        "day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The Beauty is in the sea during this condition, outside the mountain scene."
  },
  {
    "id": "description:tsHyrje:7",
    "nodeId": "tsHyrje",
    "lineIndex": 7,
    "placeId": "tsHyrje",
    "text": "ti zgjedh qytetin.",
    "conditions": {
      "all": [
        "arrival:action:choose-shpirag-city"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The choice of the city is an intention."
  },
  {
    "id": "description:tsHyrje:8",
    "nodeId": "tsHyrje",
    "lineIndex": 8,
    "placeId": "tsHyrje",
    "text": "një rrugë shkon nga këtu te mal tjetër mbi qytetin.",
    "conditions": {
      "all": [
        "flag:jamShpirag"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "other-mountain-road",
        "asset": "road",
        "label": "Road to the other mountain",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Road to the other mountain, The other mountain; the camera remains at the canonical place."
  },
  {
    "id": "description:tsNuse:0",
    "nodeId": "tsNuse",
    "lineIndex": 0,
    "placeId": "tsHyrje",
    "text": "ti merr Bukurën për grua.",
    "conditions": {
      "all": [
        "from:tsHyrje"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty becomes the viewpoint’s wife; marriage is a relationship, not a prop."
  },
  {
    "id": "description:tsNuse:1",
    "nodeId": "tsNuse",
    "lineIndex": 1,
    "placeId": "tsHyrje",
    "text": "poshtë ti sheh qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes City below the two mountains; the camera remains at the canonical place."
  },
  {
    "id": "description:tsNuse:2",
    "nodeId": "tsNuse",
    "lineIndex": 2,
    "placeId": "tsHyrje",
    "text": "nata vjen. era sjell Bukurën lart në mal.",
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
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:tsNuse:3",
    "nodeId": "tsNuse",
    "lineIndex": 3,
    "placeId": "tsHyrje",
    "text": "dielli vjen. era sjell Bukurën poshtë në det.",
    "conditions": {
      "all": [
        "became:dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The Beauty departs down to the sea with daylight; no copy remains on the mountain."
  },
  {
    "id": "description:tsRoje:0",
    "nodeId": "tsRoje",
    "lineIndex": 0,
    "placeId": "tsHyrje",
    "text": "ti sheh qytetin. ti do qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The city is visible below; wanting it is nonvisual."
  },
  {
    "id": "description:tsRoje:1",
    "nodeId": "tsRoje",
    "lineIndex": 1,
    "placeId": "tsHyrje",
    "text": "mal tjetër sheh qytetin. mal tjetër do qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The other mountain’s desire is personified lore; it is one mountain, not another human body."
  },
  {
    "id": "description:tsRoje:2",
    "nodeId": "tsRoje",
    "lineIndex": 2,
    "placeId": "tsHyrje",
    "text": "katër shqiponjat janë lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Four eagles; the camera remains at the canonical place."
  },
  {
    "id": "description:tsRoje:3",
    "nodeId": "tsRoje",
    "lineIndex": 3,
    "placeId": "tsHyrje",
    "text": "natën Bukura është lart në mal me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:tsZgjim:0",
    "nodeId": "tsZgjim",
    "lineIndex": 0,
    "placeId": "tsHyrje",
    "text": "dielli vjen.",
    "conditions": {
      "all": [
        "became:dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn light touches the mountain landscape."
  },
  {
    "id": "description:tsZgjim:1",
    "nodeId": "tsZgjim",
    "lineIndex": 1,
    "placeId": "tsHyrje",
    "text": "mal tjetër zbret në qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The rival mountain visibly moves down toward the city."
  },
  {
    "id": "description:tsZgjim:2",
    "nodeId": "tsZgjim",
    "lineIndex": 2,
    "placeId": "tsHyrje",
    "text": "katër shqiponjat vijnë. ti zgjohesh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Four eagles; the camera remains at the canonical place."
  },
  {
    "id": "description:tsZgjim:3",
    "nodeId": "tsZgjim",
    "lineIndex": 3,
    "placeId": "tsHyrje",
    "text": "Bukura është lart në mal. era është këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Beauty is on the mountain in the wind."
  },
  {
    "id": "description:tsZgjim:4",
    "nodeId": "tsZgjim",
    "lineIndex": 4,
    "placeId": "tsHyrje",
    "text": "Gurët bien drejt Bukurës; ajo është në rrezik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "falling-stones",
        "asset": "stone",
        "label": "Falling stones endangering the Beauty",
        "zone": "above",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Beauty, Falling stones endangering the Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:tsZgjim:5",
    "nodeId": "tsZgjim",
    "lineIndex": 5,
    "placeId": "tsHyrje",
    "text": "ti thirr katër shqiponjat. ata fluturojnë lart dhe thirr.",
    "conditions": {
      "all": [
        "arrival:action:tomor-call-eagles"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same four eagles circle above the embodied player."
  },
  {
    "id": "description:tsShpeto:0",
    "nodeId": "tsShpeto",
    "lineIndex": 0,
    "placeId": "tsHyrje",
    "text": "ti shpëton Bukurën me erën dhe e sjell poshtë në det.",
    "conditions": {
      "all": [
        "arrival:action:tomor-save-beauty"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "beauty-sea",
        "asset": "sea",
        "label": "Sea reached with the Beauty",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The rescue resolves beside the sea; only one Beauty remains."
  },
  {
    "id": "description:tsShpeto:1",
    "nodeId": "tsShpeto",
    "lineIndex": 1,
    "placeId": "tsHyrje",
    "text": "Bukura është në det. Bukura është mirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "beauty-sea",
        "asset": "sea",
        "label": "Sea sheltering the Beauty",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Beauty, Sea sheltering the Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:tsShpeto:2",
    "nodeId": "tsShpeto",
    "lineIndex": 2,
    "placeId": "tsHyrje",
    "text": "mal tjetër zbret në qytetin. kosa është këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-scythe",
        "asset": "scythe",
        "label": "Tomor’s scythe",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The other mountain, City below the two mountains, Tomor’s scythe; the camera remains at the canonical place."
  },
  {
    "id": "description:tsShpeto:3",
    "nodeId": "tsShpeto",
    "lineIndex": 3,
    "placeId": "tsHyrje",
    "text": "ti mban kosën e Tomorit.",
    "conditions": {
      "all": [
        "kose"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-scythe",
        "asset": "scythe",
        "label": "Tomor’s scythe",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Tomor’s scythe; the camera remains at the canonical place."
  },
  {
    "id": "description:shpirag1:0",
    "nodeId": "shpirag1",
    "lineIndex": 0,
    "placeId": "shpirag1",
    "text": "ti vjen te mali tjetër. ti je Shpirag.",
    "conditions": {
      "all": [
        "from:tsHyrje"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Shpirag is the embodied viewpoint; no extra Shpirag body is created."
  },
  {
    "id": "description:shpirag1:1",
    "nodeId": "shpirag1",
    "lineIndex": 1,
    "placeId": "shpirag1",
    "text": "ti sheh qytetin. ti do qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes City below the two mountains; the camera remains at the canonical place."
  },
  {
    "id": "description:shpirag1:2",
    "nodeId": "shpirag1",
    "lineIndex": 2,
    "placeId": "shpirag1",
    "text": "mal tjetër ka Bukurën. katër shqiponjat janë lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "far",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The other mountain, The Beauty, Four eagles; the camera remains at the canonical place."
  },
  {
    "id": "description:shpirag1:3",
    "nodeId": "shpirag1",
    "lineIndex": 3,
    "placeId": "shpirag1",
    "text": "natën mal tjetër fle me Bukurën.",
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
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "far",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The other mountain, The Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:shpirag1:4",
    "nodeId": "shpirag1",
    "lineIndex": 4,
    "placeId": "shpirag1",
    "text": "është agim: një dritë e artë bie mbi mal tjetër me Bukurën.",
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
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "far",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The other mountain, The Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:shpirag1:5",
    "nodeId": "shpirag1",
    "lineIndex": 5,
    "placeId": "shpirag1",
    "text": "është muzg: qielli bëhet i kuq mbi qytetin. qyteti është i bukur.",
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
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes City below the two mountains; the camera remains at the canonical place."
  },
  {
    "id": "description:tsRast:0",
    "nodeId": "tsRast",
    "lineIndex": 0,
    "placeId": "tsRast",
    "text": "dielli vjen. mal tjetër fle me Bukurën.",
    "conditions": {
      "all": [
        "became:dawn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "far",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The other mountain, The Beauty; the camera remains at the canonical place."
  },
  {
    "id": "description:tsRast:1",
    "nodeId": "tsRast",
    "lineIndex": 1,
    "placeId": "tsRast",
    "text": "ti zbret në qytetin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "shpirag-descent",
        "asset": "road",
        "label": "Road descending into the city",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes City below the two mountains, Road descending into the city; the camera remains at the canonical place."
  },
  {
    "id": "description:tsRast:2",
    "nodeId": "tsRast",
    "lineIndex": 2,
    "placeId": "tsRast",
    "text": "katër shqiponjat vijnë. mal tjetër zgjohet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "rival-mountain",
        "asset": "mountain",
        "label": "The other mountain",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Four eagles, The other mountain; the camera remains at the canonical place."
  },
  {
    "id": "description:tsRast:3",
    "nodeId": "tsRast",
    "lineIndex": 3,
    "placeId": "tsRast",
    "text": "pranë rrugës rri shkop i Shpirag.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shpirag-cudgel",
        "asset": "cudgel",
        "label": "Shpirag’s heavy cudgel",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "shpirag-descent",
        "asset": "road",
        "label": "Road descending into the city",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "shpirag-cudgel",
        "kind": "beside",
        "target": "shpirag-descent"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Shpirag’s heavy cudgel, Road descending into the city; the camera remains at the canonical place."
  },
  {
    "id": "description:tsRast:4",
    "nodeId": "tsRast",
    "lineIndex": 4,
    "placeId": "tsRast",
    "text": "Lufta është në fund e rrugës.",
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
    "rationale": "The battle is at the road’s destination, not the current position."
  },
  {
    "id": "description:tsRast:5",
    "nodeId": "tsRast",
    "lineIndex": 5,
    "placeId": "tsRast",
    "text": "ti merr shkopin e Shpiragut.",
    "conditions": {
      "all": [
        "arrival:action:shpirag-take-cudgel"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shpirag-cudgel",
        "asset": "cudgel",
        "label": "Shpirag’s heavy cudgel",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Shpirag’s heavy cudgel; the camera remains at the canonical place."
  },
  {
    "id": "description:tsBeteje:0",
    "nodeId": "tsBeteje",
    "lineIndex": 0,
    "placeId": "tsRast",
    "text": "ti shkon nga rruga në luftë me shkopin e Shpiragut. Tomor rri para teje me kosën.",
    "conditions": {
      "all": [
        "from:tsRast"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shpirag-cudgel",
        "asset": "cudgel",
        "label": "Shpirag’s heavy cudgel",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "actor:battle-tomor",
        "asset": "human",
        "label": "Tomor",
        "zone": "near",
        "attributes": {
          "heldItem": "scythe"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tomor-scythe",
        "asset": "scythe",
        "label": "Tomor’s scythe",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewpoint is Shpirag; Tomor is the opposing visible man."
  },
  {
    "id": "description:tsBeteje:1",
    "nodeId": "tsBeteje",
    "lineIndex": 1,
    "placeId": "tsRast",
    "text": "dy burra të mëdhenj luftojnë. toka dridhet.",
    "conditions": {
      "all": [
        "from:tsShpeto"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:battle-tomor",
        "asset": "human",
        "label": "Tomor",
        "zone": "near",
        "attributes": {
          "heldItem": "scythe"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The two fighters include the embodied player; avoid adding a second Shpirag."
  },
  {
    "id": "description:tsBeteje:2",
    "nodeId": "tsBeteje",
    "lineIndex": 2,
    "placeId": "tsRast",
    "text": "kosa bie në mal. shkopi bie në mal.",
    "conditions": {
      "all": [
        "from:tsShpeto"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-scythe",
        "asset": "scythe",
        "label": "Tomor’s scythe",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "shpirag-cudgel",
        "asset": "cudgel",
        "label": "Shpirag’s heavy cudgel",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "tomor-shpirag-pair",
        "asset": "mountain",
        "label": "Two mountains above the city",
        "zone": "far",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Tomor’s scythe, Shpirag’s heavy cudgel, Two mountains above the city; the camera remains at the canonical place."
  },
  {
    "id": "description:tsBeteje:3",
    "nodeId": "tsBeteje",
    "lineIndex": 3,
    "placeId": "tsRast",
    "text": "qyteti është poshtë. katër shqiponjat janë lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-city",
        "asset": "house",
        "label": "City below the two mountains",
        "zone": "far",
        "attributes": {},
        "count": 5,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "four-eagles",
        "asset": "eagle",
        "label": "Four eagles",
        "zone": "above",
        "attributes": {},
        "count": 4,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes City below the two mountains, Four eagles; the camera remains at the canonical place."
  },
  {
    "id": "description:tsFundTomor:0",
    "nodeId": "tsFundTomor",
    "lineIndex": 0,
    "placeId": "tsRast",
    "text": "dy burra të mëdhenj vdesin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:fallen-rival",
        "asset": "human",
        "label": "Fallen rival mountain-man",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Both men die; one is the embodied viewpoint, so only the other is a separate body."
  },
  {
    "id": "description:tsFundTomor:1",
    "nodeId": "tsFundTomor",
    "lineIndex": 1,
    "placeId": "tsRast",
    "text": "ti bëhesh një mal. njerëzit thonë: për baba Tomor.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The embodied Tomor becomes the mountain under the viewpoint; devotion is spoken by unspecified people."
  },
  {
    "id": "description:tsFundTomor:2",
    "nodeId": "tsFundTomor",
    "lineIndex": 2,
    "placeId": "tsRast",
    "text": "Bukura vdes. lotët bëhen një lumë. lumi quhet Osum.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osum-river",
        "asset": "river",
        "label": "Osum formed from the Beauty’s tears",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "actor:beauty",
        "property": "dead",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The dead Beauty and newly formed river are the final transformation."
  },
  {
    "id": "description:shpiragFund:0",
    "nodeId": "shpiragFund",
    "lineIndex": 0,
    "placeId": "tsRast",
    "text": "dy burra të mëdhenj vdesin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:fallen-rival",
        "asset": "human",
        "label": "Fallen rival mountain-man",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Both men die; one is the embodied viewpoint, so only the other is a separate body."
  },
  {
    "id": "description:shpiragFund:1",
    "nodeId": "shpiragFund",
    "lineIndex": 1,
    "placeId": "tsRast",
    "text": "ti bëhesh një mal. kosa e Tomorit është në mal.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shpirag-mountain",
        "asset": "mountain",
        "label": "Shpirag transformed into a mountain",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-scythe",
        "asset": "scythe",
        "label": "Tomor’s scythe",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Shpirag transformed into a mountain, Tomor’s scythe; the camera remains at the canonical place."
  },
  {
    "id": "description:shpiragFund:2",
    "nodeId": "shpiragFund",
    "lineIndex": 2,
    "placeId": "tsRast",
    "text": "Bukura vdes. lotët bëhen një lumë. lumi quhet Osum.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:beauty",
        "asset": "human",
        "label": "The Beauty",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "osum-river",
        "asset": "river",
        "label": "Osum formed from the Beauty’s tears",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "actor:beauty",
        "property": "dead",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The dead Beauty and newly formed river are the final transformation."
  },
  {
    "id": "description:dhia1:0",
    "nodeId": "dhia1",
    "lineIndex": 0,
    "placeId": "dhia1",
    "text": "Era fishkëllen mes njerëzve prej guri: një dasmë pa zë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "stone-wedding",
        "asset": "human",
        "label": "Petrified wedding party",
        "zone": "front",
        "attributes": {
          "color": "#90978d",
          "skinColor": "#90978d",
          "clothingColor": "#90978d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Wind moves through a silent petrified wedding; eight statues are representative."
  },
  {
    "id": "description:dhia1:1",
    "nodeId": "dhia1",
    "lineIndex": 1,
    "placeId": "dhia1",
    "text": "Shiu rrjedh mbi njerëzit prej guri pa zë.",
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
        "key": "stone-wedding",
        "asset": "human",
        "label": "Petrified wedding party",
        "zone": "front",
        "attributes": {
          "color": "#90978d",
          "skinColor": "#90978d",
          "clothingColor": "#90978d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
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
    "rationale": "This visible moment establishes Petrified wedding party; the camera remains at the canonical place."
  },
  {
    "id": "description:dhia1:2",
    "nodeId": "dhia1",
    "lineIndex": 2,
    "placeId": "dhia1",
    "text": "Njerëzit guri ishin një dasmë. zanat bënë dasmën gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "stone-wedding",
        "asset": "human",
        "label": "Petrified wedding party",
        "zone": "front",
        "attributes": {
          "color": "#90978d",
          "skinColor": "#90978d",
          "clothingColor": "#90978d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible statues support the past transformation; the transforming Zanas are not additionally placed here."
  },
  {
    "id": "description:dhia1:3",
    "nodeId": "dhia1",
    "lineIndex": 3,
    "placeId": "dhia1",
    "text": "zanat kanë fuqi në një dhi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zana-gold-goat",
        "asset": "goat",
        "label": "Goat with golden horns",
        "zone": "near",
        "attributes": {
          "hornColor": "#dcbe52"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The goat is present; its possession of Zana power is lore."
  },
  {
    "id": "description:dhia1:4",
    "nodeId": "dhia1",
    "lineIndex": 4,
    "placeId": "dhia1",
    "text": "dhia ka brirë ari.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zana-gold-goat",
        "asset": "goat",
        "label": "Goat with golden horns",
        "zone": "near",
        "attributes": {
          "hornColor": "#dcbe52"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Goat with golden horns; the camera remains at the canonical place."
  },
  {
    "id": "description:dhia1:5",
    "nodeId": "dhia1",
    "lineIndex": 5,
    "placeId": "dhia1",
    "text": "poshtë dasmës prej guri është rruga e malit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "stone-wedding-path",
        "asset": "road",
        "label": "Path beneath the stone wedding",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "stone-wedding",
        "asset": "human",
        "label": "Petrified wedding party",
        "zone": "front",
        "attributes": {
          "color": "#90978d",
          "skinColor": "#90978d",
          "clothingColor": "#90978d"
        },
        "count": 8,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "stone-wedding-path",
        "kind": "below",
        "target": "stone-wedding"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Path beneath the stone wedding, Petrified wedding party; the camera remains at the canonical place."
  },
  {
    "id": "description:dhiaFund:0",
    "nodeId": "dhiaFund",
    "lineIndex": 0,
    "placeId": "dhia1",
    "text": "ti merr dhinë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "zana-gold-goat",
        "asset": "goat",
        "label": "Goat with golden horns",
        "zone": "near",
        "attributes": {
          "hornColor": "#dcbe52"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Goat with golden horns; the camera remains at the canonical place."
  },
  {
    "id": "description:dhiaFund:1",
    "nodeId": "dhiaFund",
    "lineIndex": 1,
    "placeId": "dhia1",
    "text": "një zanë premton një besë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:goat-zana",
        "asset": "fairy",
        "label": "Zana offering her oath",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zana is a present speaker; besa is a promise."
  },
  {
    "id": "description:dhiaFund:2",
    "nodeId": "dhiaFund",
    "lineIndex": 2,
    "placeId": "dhia1",
    "text": "njerëzit marrin frymë dhe zgjohen përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "stone-wedding",
        "asset": "human",
        "label": "Wedding guests restored to life",
        "zone": "front",
        "attributes": {},
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Living bodies replace the stone forms."
  },
  {
    "id": "description:tomorProva:0",
    "nodeId": "tomorProva",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "Tomor thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Tomor is the present source of lore."
  },
  {
    "id": "description:tomorProva:1",
    "nodeId": "tomorProva",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "një dragua ka fuqinë e rrufesë.",
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
    "rationale": "The Drangue’s lightning power is reported before the storm."
  },
  {
    "id": "description:tomorProva:2",
    "nodeId": "tomorProva",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "një re e madhe dhe e zezë vjen mbi mal.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "storm-cloud",
        "asset": "cloud",
        "label": "Large black cloud",
        "zone": "above",
        "attributes": {
          "color": "#353d49"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Large black cloud; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorStuhi:0",
    "nodeId": "tomorStuhi",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "era vjen e fortë dhe rrufeja ndez qiellin.",
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
        "property": "weather",
        "value": "storm"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Strong wind and lightning illuminate the sky."
  },
  {
    "id": "description:tomorStuhi:1",
    "nodeId": "tomorStuhi",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "një dragua lufton kulshedrën në re.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:cloud-drangue",
        "asset": "human",
        "label": "Drangue in the cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:cloud-kulshedra",
        "asset": "dragon",
        "label": "Kulshedra in the cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "storm-cloud",
        "asset": "cloud",
        "label": "Storm cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Drangue in the cloud, Kulshedra in the cloud, Storm cloud; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorStuhi:2",
    "nodeId": "tomorStuhi",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "ti nuk ik.",
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
    "rationale": "The embodied player remains instead of fleeing."
  },
  {
    "id": "description:peri1:0",
    "nodeId": "peri1",
    "lineIndex": 0,
    "placeId": "peri1",
    "text": "ti ecën nëpër malin te Peria që është afër.",
    "conditions": {
      "all": [
        "from:mali1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Peri wearing white; the camera remains at the canonical place."
  },
  {
    "id": "description:peri1:1",
    "nodeId": "peri1",
    "lineIndex": 1,
    "placeId": "peri1",
    "text": "këtu rri një Peri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Peri wearing white; the camera remains at the canonical place."
  },
  {
    "id": "description:peri1:2",
    "nodeId": "peri1",
    "lineIndex": 2,
    "placeId": "peri1",
    "text": "Peria është e uritur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Hunger is the present Peri’s state."
  },
  {
    "id": "description:peri1:3",
    "nodeId": "peri1",
    "lineIndex": 3,
    "placeId": "peri1",
    "text": "këtu është bukë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "peri-bread",
        "asset": "bread",
        "label": "Bread for the Peri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Bread for the Peri; the camera remains at the canonical place."
  },
  {
    "id": "description:peri1:4",
    "nodeId": "peri1",
    "lineIndex": 4,
    "placeId": "peri1",
    "text": "Peria thotë: bukë është e shenjtë. zanat shohin bukën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Peri reports the Zanas’ guardianship; no Zana arrives here."
  },
  {
    "id": "description:periFund:0",
    "nodeId": "periFund",
    "lineIndex": 0,
    "placeId": "peri1",
    "text": "ti jep bukë Perisë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "peri-bread",
        "asset": "bread",
        "label": "Bread for the Peri",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Peri wearing white, Bread for the Peri; the camera remains at the canonical place."
  },
  {
    "id": "description:periFund:1",
    "nodeId": "periFund",
    "lineIndex": 1,
    "placeId": "peri1",
    "text": "Peria të jep një bekim.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Peri speaks a blessing without materializing an extra token."
  },
  {
    "id": "description:periFund:2",
    "nodeId": "periFund",
    "lineIndex": 2,
    "placeId": "peri1",
    "text": "ti je i sigurt.",
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
    "rationale": "Safety is a status, not physical geometry."
  },
  {
    "id": "description:periKeq:0",
    "nodeId": "periKeq",
    "lineIndex": 0,
    "placeId": "peri1",
    "text": "ti hedh bukën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "peri-bread",
        "asset": "bread",
        "label": "Bread for the Peri",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The thrown bread lies away from the embodied player."
  },
  {
    "id": "description:periKeq:1",
    "nodeId": "periKeq",
    "lineIndex": 1,
    "placeId": "peri1",
    "text": "Peria të mallkon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mountain-peri",
        "asset": "fairy",
        "label": "Peri wearing white",
        "zone": "near",
        "attributes": {
          "clothingColor": "#f4eee1"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Peri speaks a curse."
  },
  {
    "id": "description:periKeq:2",
    "nodeId": "periKeq",
    "lineIndex": 2,
    "placeId": "peri1",
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
    "rationale": "Game over is a UI/state consequence."
  },
  {
    "id": "description:rusha1:0",
    "nodeId": "rusha1",
    "lineIndex": 0,
    "placeId": "rusha1",
    "text": "ti hyn në kullën e krajlit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "krajl-tower-room",
        "asset": "interior",
        "label": "Interior of the Krajl’s tower",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Interior of the Krajl’s tower; the camera remains at the canonical place."
  },
  {
    "id": "description:rusha1:1",
    "nodeId": "rusha1",
    "lineIndex": 1,
    "placeId": "rusha1",
    "text": "Rusha, bija e krajlit, jep kafe me dorë të qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "rusha-coffee",
        "asset": "cup",
        "label": "Coffee offered by Rusha",
        "zone": "near",
        "attributes": {
          "contents": "coffee"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Rusha, Coffee offered by Rusha; the camera remains at the canonical place."
  },
  {
    "id": "description:rusha1:2",
    "nodeId": "rusha1",
    "lineIndex": 2,
    "placeId": "rusha1",
    "text": "Rusha është e bukur: sytë e saj rrinë mbi ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Rusha; the camera remains at the canonical place."
  },
  {
    "id": "description:rusha1:3",
    "nodeId": "rusha1",
    "lineIndex": 3,
    "placeId": "rusha1",
    "text": "Rusha thotë: a premton një besë? vjen me zemër, ose rri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Rusha invites a freely chosen oath; leaving is still a future action."
  },
  {
    "id": "description:rusha1:4",
    "nodeId": "rusha1",
    "lineIndex": 4,
    "placeId": "rusha1",
    "text": "Besa besë e fjala fjalë.",
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
    "rationale": "The oath formula is speech, not a visible object."
  },
  {
    "id": "description:rusha1:5",
    "nodeId": "rusha1",
    "lineIndex": 5,
    "placeId": "rusha1",
    "text": "Shiu troket në dritaren e kullës; kafeja rri e ngrohtë.",
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
        "key": "rusha-window",
        "asset": "window",
        "label": "Rain-tapped tower window",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "rusha-coffee",
        "asset": "cup",
        "label": "Warm coffee",
        "zone": "near",
        "attributes": {
          "contents": "coffee"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
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
    "rationale": "This visible moment establishes Rain-tapped tower window, Warm coffee; the camera remains at the canonical place."
  },
  {
    "id": "description:rushaFund:0",
    "nodeId": "rushaFund",
    "lineIndex": 0,
    "placeId": "rusha1",
    "text": "Rusha jep një besë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Rusha speaks her oath."
  },
  {
    "id": "description:rushaFund:1",
    "nodeId": "rushaFund",
    "lineIndex": 1,
    "placeId": "rusha1",
    "text": "Rusha vjen me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Rusha; the camera remains at the canonical place."
  },
  {
    "id": "description:rushaFund:2",
    "nodeId": "rushaFund",
    "lineIndex": 2,
    "placeId": "rusha1",
    "text": "ti dhe Rusha ecni në Jutbina.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Rusha remains the same companion on arrival at Jutbina."
  },
  {
    "id": "description:rushaKeq:0",
    "nodeId": "rushaKeq",
    "lineIndex": 0,
    "placeId": "rusha1",
    "text": "ti merr Rushën pa besë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rusha",
        "asset": "human",
        "label": "Rusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The unwilling taking is visible coercion, not an agreed companion state."
  },
  {
    "id": "description:rushaKeq:1",
    "nodeId": "rushaKeq",
    "lineIndex": 1,
    "placeId": "rusha1",
    "text": "krajli të godit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {
          "pose": "attacking"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Krajl; the camera remains at the canonical place."
  },
  {
    "id": "description:rushaKeq:2",
    "nodeId": "rushaKeq",
    "lineIndex": 2,
    "placeId": "rusha1",
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
    "rationale": "The ending notice is nonvisual."
  },
  {
    "id": "description:maliHumbur:0",
    "nodeId": "maliHumbur",
    "lineIndex": 0,
    "placeId": "maliHumbur",
    "text": "ti je lart në mal. një re e madhe dhe e ftohtë vjen dhe fsheh rrugën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "lost-mountain-cloud",
        "asset": "cloud",
        "label": "Cold cloud hiding the path",
        "zone": "front",
        "attributes": {
          "color": "#838c95"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mount Tomorr, Cold cloud hiding the path; the camera remains at the canonical place."
  },
  {
    "id": "description:maliHumbur:1",
    "nodeId": "maliHumbur",
    "lineIndex": 1,
    "placeId": "maliHumbur",
    "text": "reja fsheh diellin.",
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
        "key": "lost-mountain-cloud",
        "asset": "cloud",
        "label": "Cloud hiding the sun",
        "zone": "above",
        "attributes": {
          "color": "#838c95"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Cloud hiding the sun; the camera remains at the canonical place."
  },
  {
    "id": "description:maliHumbur:2",
    "nodeId": "maliHumbur",
    "lineIndex": 2,
    "placeId": "maliHumbur",
    "text": "natën nuk sheh yll, nuk sheh hënë: është errët.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Clouds hide both moon and stars, leaving a dark sky."
  },
  {
    "id": "description:maliHumbur:3",
    "nodeId": "maliHumbur",
    "lineIndex": 3,
    "placeId": "maliHumbur",
    "text": "Shiu bie nëpër renë dhe bën gurët e malit të errët.",
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
        "key": "wet-mountain-stones",
        "asset": "stone",
        "label": "Rain-darkened mountain stones",
        "zone": "near",
        "attributes": {
          "color": "#535d5f"
        },
        "count": 6,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
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
    "rationale": "This visible moment establishes Rain-darkened mountain stones; the camera remains at the canonical place."
  },
  {
    "id": "description:maliHumbur:4",
    "nodeId": "maliHumbur",
    "lineIndex": 4,
    "placeId": "maliHumbur",
    "text": "larg poshtë është udhëkryq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "distant-crossroads",
        "asset": "road",
        "label": "Crossroads far below",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Crossroads far below; the camera remains at the canonical place."
  },
  {
    "id": "description:maliStuhi:0",
    "nodeId": "maliStuhi",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "era godet malin, dhe rrufeja bie.",
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
        "property": "weather",
        "value": "storm"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Wind and lightning strike the mountain."
  },
  {
    "id": "description:maliStuhi:1",
    "nodeId": "maliStuhi",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "një zjarr i madh vjen nga qielli.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-fire",
        "asset": "fire",
        "label": "Great fire descending from the sky",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Great fire descending from the sky; the camera remains at the canonical place."
  },
  {
    "id": "description:maliStuhi:2",
    "nodeId": "maliStuhi",
    "lineIndex": 2,
    "placeId": "mali3",
    "text": "në re rri Shurdhi.",
    "conditions": {
      "all": [
        "fact:hailAverted"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:shurdhi",
        "asset": "human",
        "label": "Shurdhi in the cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "shurdhi-cloud",
        "asset": "cloud",
        "label": "Cloud carrying Shurdhi",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Shurdhi in the cloud, Cloud carrying Shurdhi; the camera remains at the canonical place."
  },
  {
    "id": "description:maliStuhi:3",
    "nodeId": "maliStuhi",
    "lineIndex": 3,
    "placeId": "mali3",
    "text": "njerëzit godasin hekur.",
    "conditions": {
      "all": [
        "fact:hailAverted"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "iron-strikers",
        "asset": "human",
        "label": "People striking iron",
        "zone": "near",
        "attributes": {
          "heldItem": "hammer"
        },
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "struck-iron",
        "asset": "stone",
        "label": "Iron being struck",
        "zone": "near",
        "attributes": {
          "color": "#686e76",
          "material": "iron"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes People striking iron, Iron being struck; the camera remains at the canonical place."
  },
  {
    "id": "description:maliStuhi:4",
    "nodeId": "maliStuhi",
    "lineIndex": 4,
    "placeId": "mali3",
    "text": "breshri është larg. rruga e malit është e hapur.",
    "conditions": {
      "all": [
        "fact:hailAverted"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "open-mountain-road",
        "asset": "road",
        "label": "Open mountain road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Hail is explicitly distant; the actual road is open."
  },
  {
    "id": "description:maliStuhi:5",
    "nodeId": "maliStuhi",
    "lineIndex": 5,
    "placeId": "mali3",
    "text": "zjarri është i Verbti.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-fire",
        "asset": "fire",
        "label": "Fire identified as the Verbti",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The lore identifies the seen fire; do not add an unrelated human body."
  },
  {
    "id": "description:majaEagle:0",
    "nodeId": "majaEagle",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "shqiponjat e Tomorit fluturojnë lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-eagles",
        "asset": "eagle",
        "label": "Tomor’s soaring eagles",
        "zone": "above",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Tomor’s soaring eagles; the camera remains at the canonical place."
  },
  {
    "id": "description:majaEagle:1",
    "nodeId": "majaEagle",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "një plak rri lart, mbi mjegull.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "summit-mist",
        "asset": "cloud",
        "label": "Mist below Tomor",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The elder is Tomor, preserving one identity and his white beard."
  },
  {
    "id": "description:majaEagle:2",
    "nodeId": "majaEagle",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "plaku ka mjekër të bardhë si re.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "summit-mist",
        "asset": "cloud",
        "label": "Mist below Tomor",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The elder is Tomor, preserving one identity and his white beard."
  },
  {
    "id": "description:majaEagle:3",
    "nodeId": "majaEagle",
    "lineIndex": 3,
    "placeId": "maja",
    "text": "plaku është Tomor.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "summit-mist",
        "asset": "cloud",
        "label": "Mist below Tomor",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The elder is Tomor, preserving one identity and his white beard."
  },
  {
    "id": "description:tomorBekim:0",
    "nodeId": "tomorBekim",
    "lineIndex": 0,
    "placeId": "maja",
    "text": "Tomor thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tomor",
        "asset": "human",
        "label": "Baba Tomor",
        "zone": "near",
        "attributes": {
          "beard": true,
          "hairColor": "#eee8d9"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Tomor is the present speaker."
  },
  {
    "id": "description:tomorBekim:1",
    "nodeId": "tomorBekim",
    "lineIndex": 1,
    "placeId": "maja",
    "text": "Tomor është mali poshtë teje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The named mountain lies beneath the embodied viewpoint."
  },
  {
    "id": "description:tomorBekim:2",
    "nodeId": "tomorBekim",
    "lineIndex": 2,
    "placeId": "maja",
    "text": "poshtë është një dash i bardhë dhe një dash i zi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-ram",
        "asset": "ram",
        "label": "White ram",
        "zone": "near",
        "attributes": {
          "color": "#f1eedf"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "black-ram",
        "asset": "ram",
        "label": "Black ram",
        "zone": "near",
        "attributes": {
          "color": "#25292c"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes White ram, Black ram; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorBekim:3",
    "nodeId": "tomorBekim",
    "lineIndex": 3,
    "placeId": "maja",
    "text": "dashi i bardhë shkon lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-ram",
        "asset": "ram",
        "label": "White ram climbing upward",
        "zone": "front",
        "attributes": {
          "color": "#f1eedf"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes White ram climbing upward; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorBekim:4",
    "nodeId": "tomorBekim",
    "lineIndex": 4,
    "placeId": "maja",
    "text": "dashi i zi shkon poshtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "black-ram",
        "asset": "ram",
        "label": "Black ram descending",
        "zone": "back",
        "attributes": {
          "color": "#25292c"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Black ram descending; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorBekim:5",
    "nodeId": "tomorBekim",
    "lineIndex": 5,
    "placeId": "maja",
    "text": "merr dashin e bardhë!",
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
    "rationale": "The instruction to take the white ram precedes that action."
  },
  {
    "id": "description:tomorBekim:6",
    "nodeId": "tomorBekim",
    "lineIndex": 6,
    "placeId": "maja",
    "text": "ti merr shpatë",
    "conditions": {
      "all": [
        "arrival:action:story:tomor2:merr-shpate"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-sword",
        "asset": "sword",
        "label": "Sword taken from Tomor",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Sword taken from Tomor; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorBekim:7",
    "nodeId": "tomorBekim",
    "lineIndex": 7,
    "placeId": "maja",
    "text": "ti mos e merr shpatën.",
    "conditions": {
      "all": [
        "arrival:action:story:tomor2:mos-e_obj-merr-shpate"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Declining the sword does not add a held sword."
  },
  {
    "id": "description:tomorZbritje:0",
    "nodeId": "tomorZbritje",
    "lineIndex": 0,
    "placeId": "tomorZbritje",
    "text": "ti zbret nga mali drejt një pusi të thellë dhe të errët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-well",
        "asset": "well",
        "label": "Deep dark well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "tomor-well-descent",
        "asset": "road",
        "label": "Descending road to the well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Deep dark well, Descending road to the well; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorZbritje:1",
    "nodeId": "tomorZbritje",
    "lineIndex": 1,
    "placeId": "tomorZbritje",
    "text": "Era fishkëllen në pus.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-well",
        "asset": "well",
        "label": "Whistling well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Whistling well; the camera remains at the canonical place."
  },
  {
    "id": "description:tomorZbritje:2",
    "nodeId": "tomorZbritje",
    "lineIndex": 2,
    "placeId": "tomorZbritje",
    "text": "Në stuhi, era fishkëllen me një zë të madh në pus.",
    "conditions": {
      "all": [
        "weather:storm"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tomor-well",
        "asset": "well",
        "label": "Well sounding in the storm",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "storm"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Well sounding in the storm; the camera remains at the canonical place."
  },
  {
    "id": "description:katallan1:0",
    "nodeId": "katallan1",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "ti hyn në shpellën.",
    "conditions": {
      "all": [
        "from:mali1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-cave",
        "asset": "cave",
        "label": "Katallan’s cave",
        "zone": "around",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player explicitly enters the Katallan’s cave; the enclosed rock interior surrounds the viewpoint."
  },
  {
    "id": "description:katallan1:1",
    "nodeId": "katallan1",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "në shpellën rri një katallan: katallani ka një sy dhe nuk ka gju.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "katallan-cave",
        "asset": "cave",
        "label": "Katallan’s cave",
        "zone": "around",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Katallan occupies the same cave interior entered in the preceding arrival. This unconditional setting persists through the same-place encounters."
  },
  {
    "id": "description:katallan1:2",
    "nodeId": "katallan1",
    "lineIndex": 2,
    "placeId": "katallan1",
    "text": "një udhëtar rri pranë një zjarri, por një gur i madh mbyll derën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-traveller",
        "asset": "human",
        "label": "Captive traveller",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "katallan-fire",
        "asset": "fire",
        "label": "Cave fire",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "katallan-door-stone",
        "asset": "rock",
        "label": "Huge stone blocking the cave entrance",
        "zone": "back",
        "attributes": {
          "blocksEntrance": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "scale": [
          5,
          5,
          5
        ],
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "katallan-traveller",
        "kind": "beside",
        "target": "katallan-fire"
      },
      {
        "subject": "katallan-door-stone",
        "kind": "at-entrance",
        "target": "katallan-cave"
      }
    ],
    "disposition": "physical",
    "rationale": "The traveller sits by the interior fire, while the large stone blocks the cave entrance behind the viewpoint. The stone belongs at the opening, not beside the forward cave wall."
  },
  {
    "id": "description:katallan1:3",
    "nodeId": "katallan1",
    "lineIndex": 3,
    "placeId": "katallan1",
    "text": "Udhëtari thotë: katallani ha udhëtarë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-traveller",
        "asset": "human",
        "label": "Captive traveller",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveller reports the giant’s habit; no unspecified victim appears."
  },
  {
    "id": "description:katallan1:4",
    "nodeId": "katallan1",
    "lineIndex": 4,
    "placeId": "katallan1",
    "text": "nata vjen.",
    "conditions": {
      "all": [
        "became:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Night darkens the cave."
  },
  {
    "id": "description:katallan1:5",
    "nodeId": "katallan1",
    "lineIndex": 5,
    "placeId": "katallan1",
    "text": "katallani fle.",
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
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "pose": "sleeping"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees; the camera remains at the canonical place."
  },
  {
    "id": "description:katallan1:6",
    "nodeId": "katallan1",
    "lineIndex": 6,
    "placeId": "katallan1",
    "text": "katallani nuk fle.",
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
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "pose": "standing"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees; the camera remains at the canonical place."
  },
  {
    "id": "description:katallan1:7",
    "nodeId": "katallan1",
    "lineIndex": 7,
    "placeId": "katallan1",
    "text": "kur bie shi, uji hyn në shpellë.",
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
        "key": "cave-rainwater",
        "asset": "water",
        "label": "Rainwater entering the cave",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
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
    "rationale": "This visible moment establishes Rainwater entering the cave; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanRob:0",
    "nodeId": "katallanRob",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "udhëtari flet ngadalë, sepse katallani rri afër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-traveller",
        "asset": "human",
        "label": "Captive traveller",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The captive lowers his voice because the giant is physically nearby."
  },
  {
    "id": "description:katallanRob:1",
    "nodeId": "katallanRob",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "udhëtari thotë: verbo syrin!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-traveller",
        "asset": "human",
        "label": "Captive traveller",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveller gives future escape instructions; the blinding and ram escape have not happened."
  },
  {
    "id": "description:katallanRob:2",
    "nodeId": "katallanRob",
    "lineIndex": 2,
    "placeId": "katallan1",
    "text": "udhëtari thotë: ik me dash!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-traveller",
        "asset": "human",
        "label": "Captive traveller",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveller gives future escape instructions; the blinding and ram escape have not happened."
  },
  {
    "id": "description:katallanGur:0",
    "nodeId": "katallanGur",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "ti prek gurin: është i ftohtë dhe i madh si një shtëpi; me dy duart, guri nuk lëviz.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-door-stone",
        "asset": "rock",
        "label": "Huge stone blocking the cave entrance",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "scale": [
          5,
          5,
          5
        ],
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The boulder is compared to a house in size, not an actual house at the cave mouth."
  },
  {
    "id": "description:katallanGur:1",
    "nodeId": "katallanGur",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "vetëm katallani mund të ngre një gur si ky.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-door-stone",
        "asset": "rock",
        "label": "Huge stone blocking the cave entrance",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "scale": [
          5,
          5,
          5
        ],
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Only the giant can move this actual boulder; no successful movement happens yet."
  },
  {
    "id": "description:katallanZjarr:0",
    "nodeId": "katallanZjarr",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "një zjarr rri këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-fire",
        "asset": "fire",
        "label": "Cave fire",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Cave fire; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanZjarr:1",
    "nodeId": "katallanZjarr",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "këtu është dru për një hu.",
    "conditions": {
      "all": [
        "hu"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "stake-wood",
        "asset": "woodpile",
        "label": "Wood for a stake",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Wood for a stake; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanZjarr:2",
    "nodeId": "katallanZjarr",
    "lineIndex": 2,
    "placeId": "katallan1",
    "text": "huri rri në zjarr.",
    "conditions": {
      "all": [
        "hu"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "heated-stake",
        "asset": "rod",
        "label": "Wooden stake in the fire",
        "zone": "near",
        "attributes": {
          "color": "#795431"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "katallan-fire",
        "asset": "fire",
        "label": "Cave fire",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "heated-stake",
        "kind": "inside",
        "target": "katallan-fire"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Wooden stake in the fire, Cave fire; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanZjarr:3",
    "nodeId": "katallanZjarr",
    "lineIndex": 3,
    "placeId": "katallan1",
    "text": "natën katallani fle: gjumi i tij është i thellë.",
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
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "pose": "sleeping"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanZjarr:4",
    "nodeId": "katallanZjarr",
    "lineIndex": 4,
    "placeId": "katallan1",
    "text": "katallani sheh me një sy të madh.",
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
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "pose": "standing"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanVerbim:0",
    "nodeId": "katallanVerbim",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "ti godit syrin; katallani nuk sheh, rri në derën dhe kërkon me duart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "back",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "katallan-doorway",
        "asset": "door",
        "label": "Cave doorway",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:katallan",
        "kind": "inside",
        "target": "katallan-doorway"
      },
      {
        "subject": "actor:katallan",
        "kind": "at-entrance",
        "target": "katallan-cave"
      }
    ],
    "disposition": "physical",
    "rationale": "The blinded Katallan remains at the cave doorway feeling with his hands; the established entrance is behind the interior viewpoint."
  },
  {
    "id": "description:katallanVerbim:1",
    "nodeId": "katallanVerbim",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "një dash i madh rri këtu. nën dashin mund të fshihet një njeri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-ram",
        "asset": "ram",
        "label": "Large escape ram",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The space under the ram is an escape affordance, not an extra person already hidden there."
  },
  {
    "id": "description:katallanFund:0",
    "nodeId": "katallanFund",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "ti verbon katallanin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanFund:1",
    "nodeId": "katallanFund",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "ti ikën me dashin.",
    "conditions": {
      "all": [
        "from:katallanVerbim"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "katallan-ram",
        "asset": "ram",
        "label": "Large escape ram",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "katallan-cave",
        "asset": "cave",
        "label": "Katallan’s cave",
        "zone": "back",
        "attributes": {
          "interior": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player escapes with the ram; the cave is now behind the departing viewpoint, so the inherited interior enclosure is overridden for this escape beat."
  },
  {
    "id": "description:katallanVdes:0",
    "nodeId": "katallanVdes",
    "lineIndex": 0,
    "placeId": "katallan1",
    "text": "ti lufton katallanin, por katallani të kap me një dorë.",
    "conditions": {
      "all": [
        "from:katallan1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "pose": "attacking",
          "blinded": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanVdes:1",
    "nodeId": "katallanVdes",
    "lineIndex": 1,
    "placeId": "katallan1",
    "text": "ti ikën vetëm, por katallani të gjen në derën.",
    "conditions": {
      "all": [
        "from:katallanVerbim"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false,
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "katallan-doorway",
        "asset": "door",
        "label": "Blocked cave doorway",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes One-eyed Katallan without knees, Blocked cave doorway; the camera remains at the canonical place."
  },
  {
    "id": "description:katallanVdes:2",
    "nodeId": "katallanVdes",
    "lineIndex": 2,
    "placeId": "katallan1",
    "text": "katallani të ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:katallan",
        "asset": "giant",
        "label": "One-eyed Katallan without knees",
        "zone": "front",
        "attributes": {
          "eyes": 1,
          "knees": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The giant eats the embodied player; do not fabricate a separate player victim in front of the camera."
  },
  {
    "id": "description:katallanVdes:3",
    "nodeId": "katallanVdes",
    "lineIndex": 3,
    "placeId": "katallan1",
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
    "rationale": "The ending notice is nonvisual."
  },
  {
    "id": "description:zuku1:0",
    "nodeId": "zuku1",
    "lineIndex": 0,
    "placeId": "zuku1",
    "text": "ti shko nëpër rrugën nga Jutbina dhe arrin te trimi mbi gur.",
    "conditions": {
      "all": [
        "from:jutbina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zuku-seat",
        "asset": "stone",
        "label": "Stone beneath Zuku",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "zuku-path",
        "asset": "road",
        "label": "Path from Jutbina",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Zuku, Stone beneath Zuku, Path from Jutbina; the camera remains at the canonical place."
  },
  {
    "id": "description:zuku1:1",
    "nodeId": "zuku1",
    "lineIndex": 1,
    "placeId": "zuku1",
    "text": "këtu një trim rri në një gur: trimi është i madh dhe i fortë, por sytë e tij nuk shohin dhe ecën si një fëmijë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zuku-seat",
        "asset": "stone",
        "label": "Stone beneath Zuku",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:zuku",
        "kind": "on",
        "target": "zuku-seat"
      }
    ],
    "disposition": "physical",
    "rationale": "Childlike gait is a comparison, not a second child; his blindness is real."
  },
  {
    "id": "description:zuku1:2",
    "nodeId": "zuku1",
    "lineIndex": 2,
    "placeId": "zuku1",
    "text": "një nënë verboi trimin.",
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
    "rationale": "His mother’s prior blinding action is narrated history."
  },
  {
    "id": "description:zuku1:3",
    "nodeId": "zuku1",
    "lineIndex": 3,
    "placeId": "zuku1",
    "text": "trimi quhet Zuku.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present hero is identified as Zuku."
  },
  {
    "id": "description:zuku1:4",
    "nodeId": "zuku1",
    "lineIndex": 4,
    "placeId": "zuku1",
    "text": "nëna kishte një mik: një kapidan. nëna verboi birin për kapidanin.",
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
    "rationale": "The mother and enemy captain belong to the cause of Zuku’s injury, not this current encounter."
  },
  {
    "id": "description:zuku1:5",
    "nodeId": "zuku1",
    "lineIndex": 5,
    "placeId": "zuku1",
    "text": "një Ora vjen me një bar në dorë, dhe ta jep.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku-ora",
        "asset": "spirit",
        "label": "Ora bringing the herb",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zuku-healing-herb",
        "asset": "flower",
        "label": "Healing herb",
        "zone": "near",
        "attributes": {
          "color": "#709157"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Ora bringing the herb, Healing herb; the camera remains at the canonical place."
  },
  {
    "id": "description:zuku1:6",
    "nodeId": "zuku1",
    "lineIndex": 6,
    "placeId": "zuku1",
    "text": "se nëna ime më ka verbuar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Zuku names the past cause of his injury in speech."
  },
  {
    "id": "description:zuku1:7",
    "nodeId": "zuku1",
    "lineIndex": 7,
    "placeId": "zuku1",
    "text": "Bora mbulon gurin, por Zuku nuk lëviz.",
    "conditions": {
      "all": [
        "weather:snow"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zuku-seat",
        "asset": "stone",
        "label": "Stone beneath Zuku",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "zuku-snow",
        "asset": "snow",
        "label": "Snow on Zuku’s stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "snow"
      }
    ],
    "relations": [
      {
        "subject": "zuku-snow",
        "kind": "on",
        "target": "zuku-seat"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Zuku, Stone beneath Zuku, Snow on Zuku’s stone; the camera remains at the canonical place."
  },
  {
    "id": "description:zuku2:0",
    "nodeId": "zuku2",
    "lineIndex": 0,
    "placeId": "zuku1",
    "text": "ti jep barin, dhe sytë e trimit hapen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "zuku-healing-herb",
        "asset": "flower",
        "label": "Healing herb",
        "zone": "near",
        "attributes": {
          "color": "#709157"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Zuku, Healing herb; the camera remains at the canonical place."
  },
  {
    "id": "description:zuku2:1",
    "nodeId": "zuku2",
    "lineIndex": 1,
    "placeId": "zuku1",
    "text": "trimi sheh përsëri: sheh malin, diellin, dhe ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tomorr-mountain",
        "asset": "mountain",
        "label": "Mount Tomorr",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Zuku now sees; the player remains the viewpoint and the sun is environmental light."
  },
  {
    "id": "description:zuku2:2",
    "nodeId": "zuku2",
    "lineIndex": 2,
    "placeId": "zuku1",
    "text": "lotët bien. trimi premton një besë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": false,
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Visible tears accompany the oath."
  },
  {
    "id": "description:zuku2:3",
    "nodeId": "zuku2",
    "lineIndex": 3,
    "placeId": "zuku1",
    "text": "besën e zotit djali ua kishte dhënë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The oath is a commitment from the same present hero."
  },
  {
    "id": "description:zukuFund:0",
    "nodeId": "zukuFund",
    "lineIndex": 0,
    "placeId": "zuku1",
    "text": "trimi jep besë. dhe rri mik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zuku",
        "asset": "human",
        "label": "Zuku",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "blinded": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Zuku remains a living friend after the oath."
  },
  {
    "id": "description:shurdhi1:0",
    "nodeId": "shurdhi1",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "një re e zezë vjen mbi mal: në re rri Shurdhi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:shurdhi",
        "asset": "human",
        "label": "Shurdhi in the cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "shurdhi-cloud",
        "asset": "cloud",
        "label": "Black cloud over the mountain",
        "zone": "above",
        "attributes": {
          "color": "#343c46"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Shurdhi in the cloud, Black cloud over the mountain; the camera remains at the canonical place."
  },
  {
    "id": "description:shurdhi1:1",
    "nodeId": "shurdhi1",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "Shurdhi ka rrufe dhe breshër, dhe qielli dridhet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:shurdhi",
        "asset": "human",
        "label": "Shurdhi in the cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "storm"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Shurdhi in the cloud; the camera remains at the canonical place."
  },
  {
    "id": "description:shurdhi1:2",
    "nodeId": "shurdhi1",
    "lineIndex": 2,
    "placeId": "mali3",
    "text": "njerëzit godasin hekur, dhe zhurma hip në qiell.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "iron-strikers",
        "asset": "human",
        "label": "People striking iron",
        "zone": "near",
        "attributes": {
          "heldItem": "hammer"
        },
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "struck-iron",
        "asset": "stone",
        "label": "Iron struck against the storm",
        "zone": "near",
        "attributes": {
          "color": "#69747c",
          "material": "iron"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes People striking iron, Iron struck against the storm; the camera remains at the canonical place."
  },
  {
    "id": "description:shurdhiFund:0",
    "nodeId": "shurdhiFund",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "ti godit hekurin; zhurma hip nëpër stuhinë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "struck-iron",
        "asset": "stone",
        "label": "Iron struck against the storm",
        "zone": "near",
        "attributes": {
          "color": "#69747c",
          "material": "iron"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "player-hammer",
        "asset": "hammer",
        "label": "Hammer striking iron",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied player causes the loud iron strike during the storm."
  },
  {
    "id": "description:shurdhiFund:1",
    "nodeId": "shurdhiFund",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "Shurdhi ikën; retë rrinë, por fshati është i sigurt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shurdhi-cloud",
        "asset": "cloud",
        "label": "Clouds remaining after Shurdhi flees",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "actor:shurdhi",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The clouds remain, while Shurdhi explicitly leaves."
  },
  {
    "id": "description:kali1:0",
    "nodeId": "kali1",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "këtu rri një kalë: kali flet, sheh rrezik dhe ikën nga një dorë e keqe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The same present courser has speech and danger perception; no cruel hand is already attacking it."
  },
  {
    "id": "description:kali1:1",
    "nodeId": "kali1",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "Kali thotë: unë jam kali i Mujos.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The courser identifies itself as Mujo’s horse."
  },
  {
    "id": "description:kali1:2",
    "nodeId": "kali1",
    "lineIndex": 2,
    "placeId": "mali3",
    "text": "Në agim, fryma e kalit bëhet e bardhë.",
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
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {
          "breath": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s courser; the camera remains at the canonical place."
  },
  {
    "id": "description:kaliIkur:0",
    "nodeId": "kaliIkur",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "ti prek kalin, por kali sheh dorën tënde dhe ikën poshtë. ti rri këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The horse flees downhill while the camera remains at the original place."
  },
  {
    "id": "description:kaliFund:0",
    "nodeId": "kaliFund",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "kali ecën me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo’s courser; the camera remains at the canonical place."
  },
  {
    "id": "description:kaliFund:1",
    "nodeId": "kaliFund",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "kali sheh rrezik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mujo-courser",
        "asset": "horse",
        "label": "Mujo’s courser",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The horse senses danger; no unnamed enemy is invented."
  },
  {
    "id": "description:mujo1:0",
    "nodeId": "mujo1",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "ti shko nëpër rrugën nga Jutbina dhe arrin te Mujo dhe Halili.",
    "conditions": {
      "all": [
        "from:jutbina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Exactly the two identified heroes stand at the meeting place."
  },
  {
    "id": "description:mujo1:1",
    "nodeId": "mujo1",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "këtu jetojnë dy trima: një është Mujo, dhe tjetri është Halili.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Exactly the two identified heroes stand at the meeting place."
  },
  {
    "id": "description:mujo1:2",
    "nodeId": "mujo1",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "Halili do një nuse.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil’s wish does not make his desired bride present."
  },
  {
    "id": "description:mujo1:3",
    "nodeId": "mujo1",
    "lineIndex": 3,
    "placeId": "mujo1",
    "text": "Mujo ka një bir: Omer.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo’s son is family knowledge, not an actual child beside him in this line."
  },
  {
    "id": "description:mujo1:4",
    "nodeId": "mujo1",
    "lineIndex": 4,
    "placeId": "mujo1",
    "text": "Bora rri mbi kullat e Jutbinës.",
    "conditions": {
      "all": [
        "weather:snow"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "jutbina-roof-snow",
        "asset": "snow",
        "label": "Snow on the towers",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "snow"
      }
    ],
    "relations": [
      {
        "subject": "jutbina-roof-snow",
        "kind": "on",
        "target": "jutbina-towers"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Jutbina towers, Snow on the towers; the camera remains at the canonical place."
  },
  {
    "id": "description:mujo2:0",
    "nodeId": "mujo2",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "Halili thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil is the current speaker."
  },
  {
    "id": "description:mujo2:1",
    "nodeId": "mujo2",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "Tanusha rri larg.",
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
    "rationale": "Halil reports the distant Tanusha, her family and the road’s guardians; none is visibly here."
  },
  {
    "id": "description:mujo2:2",
    "nodeId": "mujo2",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "Tanusha është bija e mbretit.",
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
    "rationale": "Halil reports the distant Tanusha, her family and the road’s guardians; none is visibly here."
  },
  {
    "id": "description:mujo2:3",
    "nodeId": "mujo2",
    "lineIndex": 3,
    "placeId": "mujo1",
    "text": "dielli hëna dhe zana ruajnë rrugën.",
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
    "rationale": "Halil reports the distant Tanusha, her family and the road’s guardians; none is visibly here."
  },
  {
    "id": "description:mujo2:4",
    "nodeId": "mujo2",
    "lineIndex": 4,
    "placeId": "mujo1",
    "text": "unë e dua.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil describes desire and his intended concealment; maidens are not yet present."
  },
  {
    "id": "description:mujo2:5",
    "nodeId": "mujo2",
    "lineIndex": 5,
    "placeId": "mujo1",
    "text": "unë fshihem me vajzat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Halil describes desire and his intended concealment; maidens are not yet present."
  },
  {
    "id": "description:mujo3:0",
    "nodeId": "mujo3",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "ti ndihmo Halili të fshihet me vajzat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tanusha-maidens",
        "asset": "human",
        "label": "Tanusha’s maidens",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, Tanusha’s maidens; the camera remains at the canonical place."
  },
  {
    "id": "description:mujo3:1",
    "nodeId": "mujo3",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "Tanusha ka një unazë: unaza ka fytyrën e halilit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:tanusha",
        "asset": "human",
        "label": "Tanusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "tanusha-ring",
        "asset": "ring",
        "label": "Ring bearing Halil’s face",
        "zone": "near",
        "attributes": {
          "portrait": "halil"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The ring bears an image of Halil; no extra Halil body is created from it."
  },
  {
    "id": "description:mujo3:2",
    "nodeId": "mujo3",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "por mbreti merr halilin!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The king captures the same Halil who hid among the maidens."
  },
  {
    "id": "description:mujo4:0",
    "nodeId": "mujo4",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "mbreti lë halilin në errësirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "halil-dark-cell",
        "asset": "interior",
        "label": "Dark cell",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
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
    "rationale": "This visible moment establishes Halil, Dark cell; the camera remains at the canonical place."
  },
  {
    "id": "description:mujo4:1",
    "nodeId": "mujo4",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "Halili këndon me lahutë; Mujo e dëgjon nga larg dhe vjen me agallarët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {
          "heldItem": "lute"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "jutbina-lute",
        "asset": "lute",
        "label": "Sounding lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "rescuing-agas",
        "asset": "human",
        "label": "Agas arriving with Mujo",
        "zone": "front",
        "attributes": {},
        "count": 6,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Mujo hears the song and arrives; the final visible state preserves the rescue company."
  },
  {
    "id": "description:mujoFund:0",
    "nodeId": "mujoFund",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "ti lufton pranë Mujo kundër burrave e mbretit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "krajl-men",
        "asset": "human",
        "label": "The king’s men",
        "zone": "front",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, The king’s men; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoFund:1",
    "nodeId": "mujoFund",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "Halili vret mbretin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {
          "heldItem": "sword"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:krajl",
        "asset": "human",
        "label": "The Krajl",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, The Krajl; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoFund:2",
    "nodeId": "mujoFund",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "Halili merr tanushën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:halili",
        "asset": "human",
        "label": "Halil",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:tanusha",
        "asset": "human",
        "label": "Tanusha",
        "zone": "near",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Halil, Tanusha; the camera remains at the canonical place."
  },
  {
    "id": "description:mujoFund:3",
    "nodeId": "mujoFund",
    "lineIndex": 3,
    "placeId": "mujo1",
    "text": "ti je një trim.",
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
    "rationale": "The player’s heroic status is not a second visible actor."
  },
  {
    "id": "description:verbti1:0",
    "nodeId": "verbti1",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "një zjarr vjen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:verbti",
        "asset": "fire",
        "label": "The Blind One’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes The Blind One’s fire; the camera remains at the canonical place."
  },
  {
    "id": "description:verbti1:1",
    "nodeId": "verbti1",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "zjarri është i Verbti.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:verbti",
        "asset": "fire",
        "label": "The Blind One’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Blind One is the present fire speaker; blindness, hearing, taboo and the dry village are nonvisual or reported knowledge."
  },
  {
    "id": "description:verbti1:2",
    "nodeId": "verbti1",
    "lineIndex": 2,
    "placeId": "mali3",
    "text": "i Verbti nuk sheh, por dëgjon gjithë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:verbti",
        "asset": "fire",
        "label": "The Blind One’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Blind One is the present fire speaker; blindness, hearing, taboo and the dry village are nonvisual or reported knowledge."
  },
  {
    "id": "description:verbti1:3",
    "nodeId": "verbti1",
    "lineIndex": 3,
    "placeId": "mali3",
    "text": "i Verbti nuk do një fjalë të keqe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:verbti",
        "asset": "fire",
        "label": "The Blind One’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Blind One is the present fire speaker; blindness, hearing, taboo and the dry village are nonvisual or reported knowledge."
  },
  {
    "id": "description:verbti1:4",
    "nodeId": "verbti1",
    "lineIndex": 4,
    "placeId": "mali3",
    "text": "i Verbti thotë: poshtë fshati është i thatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:verbti",
        "asset": "fire",
        "label": "The Blind One’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Blind One is the present fire speaker; blindness, hearing, taboo and the dry village are nonvisual or reported knowledge."
  },
  {
    "id": "description:verbtiFund:0",
    "nodeId": "verbtiFund",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "i Verbti të jep zjarr; shiu fillon, dhe fshati ka ujë përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "verbti-fire-gift",
        "asset": "torch",
        "label": "Fire given by the Blind One",
        "zone": "near",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
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
    "rationale": "The fire is received while rain starts; the village water recovery is remote."
  },
  {
    "id": "description:verbtiVdes:0",
    "nodeId": "verbtiVdes",
    "lineIndex": 0,
    "placeId": "mali3",
    "text": "i Verbti të verbon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:verbti",
        "asset": "fire",
        "label": "The Blind One’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The fire blinds the embodied viewpoint."
  },
  {
    "id": "description:verbtiVdes:1",
    "nodeId": "verbtiVdes",
    "lineIndex": 1,
    "placeId": "mali3",
    "text": "ti nuk sheh.",
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
    "rationale": "Loss of vision is the embodied player’s condition; no new entity is implied."
  },
  {
    "id": "description:omer1:0",
    "nodeId": "omer1",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "ti pyet Mujo për Omer.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Mujo is asked and answers about his absent son."
  },
  {
    "id": "description:omer1:1",
    "nodeId": "omer1",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "Mujo thotë: Omer është biri i im.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Mujo is asked and answers about his absent son."
  },
  {
    "id": "description:omer1:2",
    "nodeId": "omer1",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "Ai është ende vetëm një fëmijë.",
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
    "rationale": "Mujo recounts Omer’s childhood, wounds and death; the story does not put a living and dead Omer beside the speaker."
  },
  {
    "id": "description:omer1:3",
    "nodeId": "omer1",
    "lineIndex": 3,
    "placeId": "mujo1",
    "text": "Por Omer lufton dhe ka shumë plagë.",
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
    "rationale": "Mujo recounts Omer’s childhood, wounds and death; the story does not put a living and dead Omer beside the speaker."
  },
  {
    "id": "description:omer1:4",
    "nodeId": "omer1",
    "lineIndex": 4,
    "placeId": "mujo1",
    "text": "Në fund ai vdes, dhe Mujo e mban.",
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
    "rationale": "Mujo recounts Omer’s childhood, wounds and death; the story does not put a living and dead Omer beside the speaker."
  },
  {
    "id": "description:omer2:0",
    "nodeId": "omer2",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "Mujo bën një varr në mal.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Mujo, Omer’s mountain grave; the camera remains at the canonical place."
  },
  {
    "id": "description:omer2:1",
    "nodeId": "omer2",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "një gur mbi varrin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "omer-gravestone",
        "asset": "stone",
        "label": "Stone over Omer’s grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "omer-gravestone",
        "kind": "on",
        "target": "omer-grave"
      }
    ],
    "disposition": "physical",
    "rationale": "This visible moment establishes Omer’s mountain grave, Stone over Omer’s grave; the camera remains at the canonical place."
  },
  {
    "id": "description:omer2:2",
    "nodeId": "omer2",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "kanë lënë këngën zogjtë e malit.",
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
    "rationale": "The mountain birds cease singing; silence does not prove visible birds."
  },
  {
    "id": "description:omer2:3",
    "nodeId": "omer2",
    "lineIndex": 3,
    "placeId": "mujo1",
    "text": "Mujo fsheh omerin nga nëna.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:mujo",
        "asset": "human",
        "label": "Mujo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Mujo hides the burial from the absent mother; the interred child is not displayed as an exposed body."
  },
  {
    "id": "description:omer2:4",
    "nodeId": "omer2",
    "lineIndex": 4,
    "placeId": "mujo1",
    "text": "por nëna dëgjon. hëna di dhe nuk flet.",
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
    "rationale": "The mother hears of the burial elsewhere; the moon’s knowledge is personification."
  },
  {
    "id": "description:omer2:5",
    "nodeId": "omer2",
    "lineIndex": 5,
    "placeId": "mujo1",
    "text": "Në vjeshtë, gjethet bien mbi tokën e ftohtë.",
    "conditions": {
      "all": [
        "season:autumn"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "omer-autumn-leaves",
        "asset": "leaves",
        "label": "Autumn leaves on cold ground",
        "zone": "near",
        "attributes": {
          "color": "#a47643"
        },
        "count": 8,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "season",
        "value": "autumn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Autumn leaves on cold ground; the camera remains at the canonical place."
  },
  {
    "id": "description:omerFund:0",
    "nodeId": "omerFund",
    "lineIndex": 0,
    "placeId": "mujo1",
    "text": "nëna ka lot.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Omer’s mother; the camera remains at the canonical place."
  },
  {
    "id": "description:omerFund:1",
    "nodeId": "omerFund",
    "lineIndex": 1,
    "placeId": "mujo1",
    "text": "nëna shkon në varr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Omer’s mother, Omer’s mountain grave; the camera remains at the canonical place."
  },
  {
    "id": "description:omerFund:2",
    "nodeId": "omerFund",
    "lineIndex": 2,
    "placeId": "mujo1",
    "text": "nëna mallkon hënën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The mother curses the moon in grief; no extra moon-person is created."
  },
  {
    "id": "description:omerFund:3",
    "nodeId": "omerFund",
    "lineIndex": 3,
    "placeId": "mujo1",
    "text": "nëna thotë: t'u shkimtë drita, o hënë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The mother curses the moon in grief; no extra moon-person is created."
  },
  {
    "id": "description:omerFund:4",
    "nodeId": "omerFund",
    "lineIndex": 4,
    "placeId": "mujo1",
    "text": "yjet rrinë ftohtë mbi varr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Omer’s mountain grave; the camera remains at the canonical place."
  },
  {
    "id": "description:omerFund:5",
    "nodeId": "omerFund",
    "lineIndex": 5,
    "placeId": "mujo1",
    "text": "nëna vajton omerin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The mother laments her son; the plural in lament does not prove additional graves here."
  },
  {
    "id": "description:omerFund:6",
    "nodeId": "omerFund",
    "lineIndex": 6,
    "placeId": "mujo1",
    "text": "nëna vajton bijtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "omer-grave",
        "asset": "grave",
        "label": "Omer’s mountain grave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The mother laments her son; the plural in lament does not prove additional graves here."
  },
  {
    "id": "description:omerFund:7",
    "nodeId": "omerFund",
    "lineIndex": 7,
    "placeId": "mujo1",
    "text": "Orët e malit vijnë te nëna.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mountain-oras",
        "asset": "spirit",
        "label": "Mountain fate-spirits",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This visible moment establishes Omer’s mother, Mountain fate-spirits; the camera remains at the canonical place."
  },
  {
    "id": "description:omerFund:8",
    "nodeId": "omerFund",
    "lineIndex": 8,
    "placeId": "mujo1",
    "text": "ato thonë: mos qaj më.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mountain-oras",
        "asset": "spirit",
        "label": "Mountain fate-spirits",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The fate-spirits speak to the grieving mother."
  },
  {
    "id": "description:omerFund:9",
    "nodeId": "omerFund",
    "lineIndex": 9,
    "placeId": "mujo1",
    "text": "ato marrin lotët nga sytë e saj.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mountain-oras",
        "asset": "spirit",
        "label": "Mountain fate-spirits",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same mother’s tears stop; do not duplicate her crying form."
  },
  {
    "id": "description:omerFund:10",
    "nodeId": "omerFund",
    "lineIndex": 10,
    "placeId": "mujo1",
    "text": "Orët e sjellin nënën në Jutbina.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:omer-mother",
        "asset": "human",
        "label": "Omer’s mother",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "tears": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mountain-oras",
        "asset": "spirit",
        "label": "Mountain fate-spirits",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "jutbina-towers",
        "asset": "tower",
        "label": "Jutbina towers",
        "zone": "far",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The final escorted arrival is at Jutbina."
  }
])
