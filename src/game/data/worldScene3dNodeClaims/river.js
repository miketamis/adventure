// Exact reviewed physical claims and explicit nonvisual dispositions; no token-to-object inference.
export default Object.freeze([
  {
    "id": "description:binoshetLumi:0",
    "nodeId": "binoshetLumi",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "Shiu bie mbi gurët e lumit, por uji nuk vjen.",
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
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "rock",
        "key": "twins-river-stone",
        "label": "River stones",
        "zone": "near",
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
    "rationale": "Rain falls on the exposed stones of the dry river; rain does not restore the river."
  },
  {
    "id": "description:binoshetLumi:1",
    "nodeId": "binoshetLumi",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "ti je Zjerma. Handa është vëllai.",
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
    "rationale": "Zjerma is the embodied viewpoint. Naming the brother does not place Handa at this river."
  },
  {
    "id": "description:binoshetLumi:2",
    "nodeId": "binoshetLumi",
    "lineIndex": 2,
    "placeId": "lumi",
    "text": "lumi është i thatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetLumi:3",
    "nodeId": "binoshetLumi",
    "lineIndex": 3,
    "placeId": "lumi",
    "text": "një kulshedër rri në lumë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "dragon",
        "key": "actor:twins-kulshedra",
        "label": "Seven-headed Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 7,
          "wings": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel, Seven-headed Kulshedra at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetLumi:4",
    "nodeId": "binoshetLumi",
    "lineIndex": 4,
    "placeId": "lumi",
    "text": "kulshedra ka shtatë koka. një kokë ka kurorë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "dragon",
        "key": "actor:twins-kulshedra",
        "label": "Seven-headed Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 7,
          "wings": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "crown",
        "key": "twins-dragon-crown",
        "label": "Crown on one dragon head",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "twins-dragon-crown",
        "kind": "on",
        "target": "actor:twins-kulshedra"
      }
    ],
    "disposition": "physical",
    "rationale": "Exactly seven heads and one crown are established."
  },
  {
    "id": "description:binoshetLumi:5",
    "nodeId": "binoshetLumi",
    "lineIndex": 5,
    "placeId": "lumi",
    "text": "kulshedra merr ujin dhe mban Bardhakuqja.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "dragon",
        "key": "actor:twins-kulshedra",
        "label": "Seven-headed Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 7,
          "wings": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Kulshedra holds back water and keeps Bardhakuqja here; she is not freed yet."
  },
  {
    "id": "description:binoshetLumi:6",
    "nodeId": "binoshetLumi",
    "lineIndex": 6,
    "placeId": "lumi",
    "text": "Bardhakuqja është bija e mbretit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The captive’s royal parentage does not place her father here yet."
  },
  {
    "id": "description:binoshetLumi:7",
    "nodeId": "binoshetLumi",
    "lineIndex": 7,
    "placeId": "lumi",
    "text": "ti mendon: lufto kulshedrën, ose ik?",
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
    "rationale": "The unchosen fight or retreat is deliberation, not an enacted visual outcome."
  },
  {
    "id": "description:binoshetFund:0",
    "nodeId": "binoshetFund",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "ti lufton kulshedrën. kulshedra vdes.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "dragon",
        "key": "actor:twins-kulshedra",
        "label": "Defeated Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 7,
          "wings": false,
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The fought Kulshedra is now dead."
  },
  {
    "id": "description:binoshetFund:1",
    "nodeId": "binoshetFund",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "uji vjen. lumi jeton.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetFund:2",
    "nodeId": "binoshetFund",
    "lineIndex": 2,
    "placeId": "lumi",
    "text": "Bardhakuqja merr kokën me kurorë dhe gjuhët.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "head",
        "key": "twins-crowned-head",
        "label": "Severed crowned dragon head",
        "zone": "near",
        "attributes": {
          "variant": "dragon"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "crown",
        "key": "twins-dragon-crown",
        "label": "Crown retained with the head",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "tongue",
        "key": "twins-tongues",
        "label": "Dragon tongues retained as proof",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [
      {
        "key": "actor:twins-kulshedra",
        "property": "heads",
        "value": 6
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Bardhakuqja takes the crowned head and tongues as proof. Removing that one head from the established seven-headed body leaves six attached until the remaining heads are also brought away."
  },
  {
    "id": "description:binoshetFund:3",
    "nodeId": "binoshetFund",
    "lineIndex": 3,
    "placeId": "lumi",
    "text": "babai i saj, mbreti, vjen te lumi me rojet.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardha-father",
        "label": "Bardhakuqja’s father, the king",
        "zone": "near",
        "attributes": {
          "headwear": "crown"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "human",
        "key": "actor:twins-guards",
        "label": "Royal guards",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Bardhakuqja’s father, the king, Royal guards, River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetFund:4",
    "nodeId": "binoshetFund",
    "lineIndex": 4,
    "placeId": "lumi",
    "text": "Barkulku vjen me kokat tjetër. ai thotë: unë vrava kulshedrën.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:barkulku",
        "label": "Barkulku",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "head",
        "key": "barkulku-heads",
        "label": "Other severed heads",
        "zone": "near",
        "attributes": {
          "variant": "dragon"
        },
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [
      {
        "key": "actor:twins-kulshedra",
        "property": "heads",
        "value": 0
      }
    ],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Barkulku brings the other severed heads, complementing the crowned head already taken by Bardhakuqja. The defeated body therefore retains no attached heads in this exact post-fight arrival branch; Barkulku’s claim to the kill remains false."
  },
  {
    "id": "description:binoshetFund:5",
    "nodeId": "binoshetFund",
    "lineIndex": 5,
    "placeId": "lumi",
    "text": "por Barkulku nuk ka kokën me kurorë ose gjuhët.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:barkulku",
        "label": "Barkulku",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "barkulku-crowned-head",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "barkulku-tongues",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The crowned head and tongues are explicitly absent from Barkulku’s possession; they are not duplicated."
  },
  {
    "id": "description:binoshetFund:6",
    "nodeId": "binoshetFund",
    "lineIndex": 6,
    "placeId": "lumi",
    "text": "Barkulku të sulmon; rojet e mbretit e godasin.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:barkulku",
        "label": "Barkulku",
        "zone": "near",
        "attributes": {
          "pose": "attacking"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "human",
        "key": "actor:twins-guards",
        "label": "Striking royal guards",
        "zone": "near",
        "attributes": {
          "pose": "attacking"
        },
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Barkulku, Striking royal guards at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetFund:7",
    "nodeId": "binoshetFund",
    "lineIndex": 7,
    "placeId": "lumi",
    "text": "kurora është gati.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "crown",
        "key": "twins-marriage-crown",
        "label": "Prepared crown",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Prepared crown at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetFund:8",
    "nodeId": "binoshetFund",
    "lineIndex": 8,
    "placeId": "lumi",
    "text": "por unaza jote bëhet e errët: Handa është në rrezik.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "ring",
        "key": "item:twins-warning-ring",
        "label": "Dark warning ring",
        "zone": "near",
        "attributes": {
          "color": "dark"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The ring darkens; Handa’s danger is distant and is not staged at this river."
  },
  {
    "id": "description:binoshetFund:9",
    "nodeId": "binoshetFund",
    "lineIndex": 9,
    "placeId": "lumi",
    "text": "Bardhakuqja thotë: kërko Handa te shtëpia e tij. unë pres një vit, një muaj dhe një ditë.",
    "conditions": {
      "all": [
        "from:binoshetLumi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Bardhakuqja waits here and directs the player toward Handa’s home; the home and waiting interval are future/distant."
  },
  {
    "id": "description:binoshetFund:10",
    "nodeId": "binoshetFund",
    "lineIndex": 10,
    "placeId": "lumi",
    "text": "ti kthehesh nga shtëpia e Handa te lumi i gjallë.",
    "conditions": {
      "all": [
        "from:binoshetKasollja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The arrival returns from Handa’s house to the restored river; the house is not moved here."
  },
  {
    "id": "description:binoshetFund:11",
    "nodeId": "binoshetFund",
    "lineIndex": 11,
    "placeId": "lumi",
    "text": "Bardhakuqja pret ende, dhe unaza jote e errët tregon: Handa është në rrezik.",
    "conditions": {
      "all": [
        "from:binoshetKasollja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "ring",
        "key": "item:twins-warning-ring",
        "label": "Dark warning ring",
        "zone": "near",
        "attributes": {
          "color": "dark"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Bardhakuqja and the dark ring are local; Handa remains elsewhere."
  },
  {
    "id": "description:binoshetHije:0",
    "nodeId": "binoshetHije",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "ti ik. Bardhakuqja rri me kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "dragon",
        "key": "actor:twins-kulshedra",
        "label": "Seven-headed Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 7,
          "wings": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player retreats while the captive remains with the dragon."
  },
  {
    "id": "description:binoshetHije:1",
    "nodeId": "binoshetHije",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "lumi rri i thatë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:binoshetHije:2",
    "nodeId": "binoshetHije",
    "lineIndex": 2,
    "placeId": "lumi",
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
    "rationale": "The game-ending status adds no physical object."
  },
  {
    "id": "description:binoshetZjarri:0",
    "nodeId": "binoshetZjarri",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "ti je mirë. ti vjen në mëngjes. ti mendon të vrasësh ata.",
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
    "rationale": "Morning is visible; thoughts about killing do not enact that attack."
  },
  {
    "id": "description:binoshetZjarri:1",
    "nodeId": "binoshetZjarri",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "por ti sheh shpatën mes tyre. ti qesh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "sword",
        "key": "twins-separating-sword",
        "label": "Sword between Handa and Bardhakuqja",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "human",
        "key": "actor:handa",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "twins-separating-sword",
        "kind": "between",
        "target": "actor:handa",
        "secondTarget": "actor:bardhakuqja"
      }
    ],
    "disposition": "physical",
    "rationale": "The sword is between Handa and Bardhakuqja, with both endpoints explicitly identified. The player laughs rather than killing the pair."
  },
  {
    "id": "description:binoshetZjarri:2",
    "nodeId": "binoshetZjarri",
    "lineIndex": 2,
    "placeId": "lumi",
    "text": "Bardhakuqja kalon në flakë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "fire",
        "key": "twins-trial-fire",
        "label": "Trial flames",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:bardhakuqja",
        "kind": "through",
        "target": "twins-trial-fire"
      }
    ],
    "disposition": "physical",
    "rationale": "Bardhakuqja passes through the flames."
  },
  {
    "id": "description:binoshetZjarri:3",
    "nodeId": "binoshetZjarri",
    "lineIndex": 3,
    "placeId": "lumi",
    "text": "ajo del më e bukur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same woman emerges; beauty is evaluative and does not introduce a new person."
  },
  {
    "id": "description:binoshetZjarri:4",
    "nodeId": "binoshetZjarri",
    "lineIndex": 4,
    "placeId": "lumi",
    "text": "nëna rri në mbretëri.",
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
    "rationale": "The mother remains in the distant kingdom; this line does not bring her to the river."
  },
  {
    "id": "description:binoshetZjarri:5",
    "nodeId": "binoshetZjarri",
    "lineIndex": 5,
    "placeId": "lumi",
    "text": "rruga te nëna kalon një urë.",
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
    "rationale": "Directions describe a bridge on the route to the mother, rather than a second unlocated bridge here."
  },
  {
    "id": "description:binoshetDyKurorat:0",
    "nodeId": "binoshetDyKurorat",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "pas tre muaj, ti dhe Bardhakuqja ktheheni.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardhakuqja",
        "label": "Bardhakuqja",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player and Bardhakuqja arrive together after the stated interval."
  },
  {
    "id": "description:binoshetDyKurorat:1",
    "nodeId": "binoshetDyKurorat",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "mbreti i vjetër të jep shkopin dhe kurorën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bardha-father",
        "label": "Bardhakuqja’s father, the king",
        "zone": "near",
        "attributes": {
          "headwear": "crown"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "rod",
        "key": "twins-sceptre",
        "label": "Royal staff",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "crown",
        "key": "twins-final-crown",
        "label": "Royal crown",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The old king gives the staff and crown in the completed return scene."
  },
  {
    "id": "description:lumi:0",
    "nodeId": "lumi",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "ti vjen nga udhëkryqi.",
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
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives from the crossroads at the river; the source is not relocated. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:1",
    "nodeId": "lumi",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "lumi është i thatë.",
    "conditions": {
      "all": [
        "fact:riverRestored"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lumi:2",
    "nodeId": "lumi",
    "lineIndex": 2,
    "placeId": "lumi",
    "text": "uji lëviz në lumë përsëri.",
    "conditions": {
      "all": [
        "fact:riverRestored"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lumi:3",
    "nodeId": "lumi",
    "lineIndex": 3,
    "placeId": "lumi",
    "text": "lart është maja, poshtë është deti.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "mountain",
        "key": "place:maja",
        "label": "Summit above the river",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "sea",
        "key": "place:deti",
        "label": "Distant sea",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The distant summit and sea remain topographical references, staged far from the observer."
  },
  {
    "id": "description:lumi:4",
    "nodeId": "lumi",
    "lineIndex": 4,
    "placeId": "lumi",
    "text": "por ti sheh një zanë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lumi:5",
    "nodeId": "lumi",
    "lineIndex": 5,
    "placeId": "lumi",
    "text": "një gjarpër fle në lumë.",
    "conditions": {
      "all": [
        "fact:bollaSlain"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "actor:river-bolla",
        "label": "River serpent",
        "zone": "near",
        "attributes": {
          "pose": "sleeping"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River serpent, River channel at the present location; dimensions and unmeasured offsets are illustrative. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:6",
    "nodeId": "lumi",
    "lineIndex": 6,
    "placeId": "lumi",
    "text": "gjarpri nuk është më këtu. vendi pranë lumit është i sigurt.",
    "conditions": {
      "all": [
        "fact:bollaSlain"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "actor:river-bolla",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The serpent has left; the empty safe bank is shown without a serpent. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:7",
    "nodeId": "lumi",
    "lineIndex": 7,
    "placeId": "lumi",
    "text": "larg, qyteti i Zjermës ka ujë përsëri.",
    "conditions": {
      "all": [
        "fact:binoshetKulshedraDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The water-restored city is explicitly far away; the report does not build it on this riverbank."
  },
  {
    "id": "description:lumi:8",
    "nodeId": "lumi",
    "lineIndex": 8,
    "placeId": "lumi",
    "text": "larg një plak rri mbi një gur dhe flet për ar.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": true,
      "none": [
        "arrival:action:observation:river-old-man"
      ],
      "observationId": "river-old-man"
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "Distant seated elder",
        "zone": "far",
        "attributes": {
          "age": "old",
          "beard": true,
          "pose": "sitting"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "rock",
        "key": "treasure-seat-stone",
        "label": "Distant elder’s stone",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The elder sits far away, speaking about gold; the gold is not visible beside him."
  },
  {
    "id": "description:lumi:9",
    "nodeId": "lumi",
    "lineIndex": 9,
    "placeId": "lumi",
    "text": "natën plaku nuk është këtu.",
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
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "actor:treasure-old-man",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "At night the elder is explicitly absent. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:10",
    "nodeId": "lumi",
    "lineIndex": 10,
    "placeId": "lumi",
    "text": "larg rri një liqen i qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "lake",
        "key": "river-distant-lake",
        "label": "Distant quiet lake",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Distant quiet lake at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lumi:11",
    "nodeId": "lumi",
    "lineIndex": 11,
    "placeId": "lumi",
    "text": "poshtë është një urë e vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The known bridge is below along the river, not a separate bridge beside the camera."
  },
  {
    "id": "description:lumi:12",
    "nodeId": "lumi",
    "lineIndex": 12,
    "placeId": "lumi",
    "text": "rruga ngjitet përsëri te udhëkryqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "river-crossroads-road",
        "label": "Ascending road to the crossroads",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Ascending road to the crossroads at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lumi:13",
    "nodeId": "lumi",
    "lineIndex": 13,
    "placeId": "lumi",
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
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Night arrives at the river."
  },
  {
    "id": "description:lumi:14",
    "nodeId": "lumi",
    "lineIndex": 14,
    "placeId": "lumi",
    "text": "natën uji është i bardhë nën hënë.",
    "conditions": {
      "all": [
        "night",
        "fact:riverRestored"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "moon",
        "key": "sky:moon",
        "label": "Moon over the river",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "river:main",
        "property": "color",
        "value": "white"
      },
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Moonlight whitens the water surface."
  },
  {
    "id": "description:lumi:15",
    "nodeId": "lumi",
    "lineIndex": 15,
    "placeId": "lumi",
    "text": "natën lumi është i bardhë nën hënë.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [
        "fact:riverRestored"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "moon",
        "key": "sky:moon",
        "label": "Moon over the river",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "river:main",
        "property": "color",
        "value": "white"
      },
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Moonlight whitens the water surface. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:16",
    "nodeId": "lumi",
    "lineIndex": 16,
    "placeId": "lumi",
    "text": "dielli del mbi malet.",
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
        "asset": "sun",
        "key": "sky:sun",
        "label": "Rising sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "mountain",
        "key": "river-dawn-mountains",
        "label": "Mountains on the horizon",
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
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Dawn rises above the mountain skyline."
  },
  {
    "id": "description:lumi:17",
    "nodeId": "lumi",
    "lineIndex": 17,
    "placeId": "lumi",
    "text": "një dritë bie në lumin.",
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
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Visible light falls onto the river water. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:18",
    "nodeId": "lumi",
    "lineIndex": 18,
    "placeId": "lumi",
    "text": "është muzg: liqeni larg bëhet i kuq dhe i artë.",
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
        "asset": "lake",
        "key": "river-distant-lake",
        "label": "Distant red-gold lake",
        "zone": "far",
        "attributes": {
          "color": "gold"
        },
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
    "rationale": "The distant lake reflects dusk light."
  },
  {
    "id": "description:lumi:19",
    "nodeId": "lumi",
    "lineIndex": 19,
    "placeId": "lumi",
    "text": "ti ecën larg nga liqeni dhe kthehesh te lumi.",
    "conditions": {
      "all": [
        "from:flocka1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The return leaves the lake behind and reaches the river again. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:lumi:20",
    "nodeId": "lumi",
    "lineIndex": 20,
    "placeId": "lumi",
    "text": "larg një plak rri mbi një gur dhe flet për ar.",
    "conditions": {
      "all": [
        "arrival:action:observation:river-old-man"
      ],
      "negate": false,
      "none": [
        "night"
      ],
      "observationId": "river-old-man"
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "Distant seated elder",
        "zone": "far",
        "attributes": {
          "age": "old",
          "beard": true,
          "pose": "sitting"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "rock",
        "key": "treasure-seat-stone",
        "label": "Distant elder’s stone",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The elder sits far away, speaking about gold; the gold is not visible beside him."
  },
  {
    "id": "description:zana1:0",
    "nodeId": "zana1",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "zana është e bukur dhe e fortë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zana is visible; beauty and strength are descriptive qualities."
  },
  {
    "id": "description:zana1:1",
    "nodeId": "zana1",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "zana ruan ujë, pyll dhe dhitë. fuqia e zanës rri në tre dhi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "forest",
        "key": "zana-forest",
        "label": "Zana’s forest",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "goat",
        "key": "zana-goats",
        "label": "Three goats",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": true
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Three goats are visible; the Zana’s power is not an extra object. Guarding water does not assert flowing water or restore the river; its dry/restored state follows the canonical river condition."
  },
  {
    "id": "description:zana1:2",
    "nodeId": "zana1",
    "lineIndex": 2,
    "placeId": "lumi",
    "text": "natën yjet japin dritë.",
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
        "asset": "starfield",
        "key": "sky:stars",
        "label": "Night stars",
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
    "rationale": "Stars light this night scene."
  },
  {
    "id": "description:zana1:3",
    "nodeId": "zana1",
    "lineIndex": 3,
    "placeId": "lumi",
    "text": "është agim: një dritë e artë vjen nga malet.",
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
        "property": "light",
        "value": "golden-dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Golden dawn comes from the mountain horizon."
  },
  {
    "id": "description:zana1:4",
    "nodeId": "zana1",
    "lineIndex": 4,
    "placeId": "lumi",
    "text": "është muzg: qielli bëhet i kuq mbi malin.",
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
        "asset": "mountain",
        "key": "zana-mountain",
        "label": "Mountain under red sky",
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
      },
      {
        "key": "environment",
        "property": "skyColor",
        "value": "red"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Dusk colors the sky above the mountain."
  },
  {
    "id": "description:zana1:5",
    "nodeId": "zana1",
    "lineIndex": 5,
    "placeId": "lumi",
    "text": "zana thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible Zana speaks to the embodied player about identity, wings, heart and the future trial; no duplicate player or internal heart is staged."
  },
  {
    "id": "description:zana1:6",
    "nodeId": "zana1",
    "lineIndex": 6,
    "placeId": "lumi",
    "text": "ti je një dragua.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible Zana speaks to the embodied player about identity, wings, heart and the future trial; no duplicate player or internal heart is staged."
  },
  {
    "id": "description:zana1:7",
    "nodeId": "zana1",
    "lineIndex": 7,
    "placeId": "lumi",
    "text": "ti ke krahë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible Zana speaks to the embodied player about identity, wings, heart and the future trial; no duplicate player or internal heart is staged."
  },
  {
    "id": "description:zana1:8",
    "nodeId": "zana1",
    "lineIndex": 8,
    "placeId": "lumi",
    "text": "ti ke një zemër e ar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible Zana speaks to the embodied player about identity, wings, heart and the future trial; no duplicate player or internal heart is staged."
  },
  {
    "id": "description:zana1:9",
    "nodeId": "zana1",
    "lineIndex": 9,
    "placeId": "lumi",
    "text": "Zana thotë: nëse ti beson mua, shko sonte te guri i madh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible Zana speaks to the embodied player about identity, wings, heart and the future trial; no duplicate player or internal heart is staged."
  },
  {
    "id": "description:zanaQumesht:0",
    "nodeId": "zanaQumesht",
    "lineIndex": 0,
    "placeId": "zanaProva",
    "text": "Tri dhitë rrinë qetë në bar pranë Zanës.",
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
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "goat",
        "key": "zana-goats",
        "label": "Three calm goats",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": true
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana, Three calm goats at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaQumesht:1",
    "nodeId": "zanaQumesht",
    "lineIndex": 1,
    "placeId": "zanaProva",
    "text": "zana jep qumësht nga tri dhi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "goat",
        "key": "zana-goats",
        "label": "Three goats",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": true
      },
      {
        "asset": "milk",
        "key": "zana-milk",
        "label": "Goat milk",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana, Three goats, Goat milk at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaQumesht:2",
    "nodeId": "zanaQumesht",
    "lineIndex": 2,
    "placeId": "zanaProva",
    "text": "qumështi është i ëmbël dhe jep fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "milk",
        "key": "zana-milk",
        "label": "Goat milk",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Milk is present; sweetness and strength are nonvisual effects."
  },
  {
    "id": "description:zanaKripe:0",
    "nodeId": "zanaKripe",
    "lineIndex": 0,
    "placeId": "zanaProva",
    "text": "zana jep kripë.",
    "conditions": {
      "all": [
        "flag:zanaSaltDecision"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "salt",
        "key": "item:zana-salt",
        "label": "Salt offered by the Zana",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana, Salt offered by the Zana at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaKripe:1",
    "nodeId": "zanaKripe",
    "lineIndex": 1,
    "placeId": "zanaProva",
    "text": "kripa është për bukë.",
    "conditions": {
      "all": [
        "flag:zanaSaltDecision"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "salt",
        "key": "item:zana-salt",
        "label": "Salt",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Salt is for bread; this purpose does not create unmentioned bread."
  },
  {
    "id": "description:zanaKripe:2",
    "nodeId": "zanaKripe",
    "lineIndex": 2,
    "placeId": "zanaProva",
    "text": "ti mban kripën në dorë.",
    "conditions": {
      "all": [
        "flag:zanaSaltTaken"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "salt",
        "key": "item:zana-salt",
        "label": "Salt held by the viewer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Salt held by the viewer at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaKripe:3",
    "nodeId": "zanaKripe",
    "lineIndex": 3,
    "placeId": "zanaProva",
    "text": "kripa rri me zanën.",
    "conditions": {
      "all": [
        "flag:zanaSaltLeft"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "salt",
        "key": "item:zana-salt",
        "label": "Salt remaining with the Zana",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana, Salt remaining with the Zana at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaKripe:4",
    "nodeId": "zanaKripe",
    "lineIndex": 4,
    "placeId": "zanaProva",
    "text": "Zana thotë: eja me mua lart te foleja.",
    "conditions": {
      "all": [
        "flag:zanaSaltDecision"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zana invites a future ascent to the nest; arrival has not occurred yet."
  },
  {
    "id": "description:zanaKripe:5",
    "nodeId": "zanaKripe",
    "lineIndex": 5,
    "placeId": "zanaProva",
    "text": "ti merr qumësht",
    "conditions": {
      "all": [
        "arrival:action:story:zana-qumesht:merr-qumesht"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "milk",
        "key": "zana-milk",
        "label": "Taken milk",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana, Taken milk at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaKripe:6",
    "nodeId": "zanaKripe",
    "lineIndex": 6,
    "placeId": "zanaProva",
    "text": "ti mos e merr qumështin.",
    "conditions": {
      "all": [
        "arrival:action:story:zana-qumesht:mos-e_obj-merr-qumesht"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The milk is refused; no carried milk is added."
  },
  {
    "id": "description:zanaKripe:7",
    "nodeId": "zanaKripe",
    "lineIndex": 7,
    "placeId": "zanaProva",
    "text": "ti merr kripë",
    "conditions": {
      "all": [
        "arrival:action:story:zana-kripe:merr-kripe"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "salt",
        "key": "item:zana-salt",
        "label": "Taken salt",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana, Taken salt at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaKripe:8",
    "nodeId": "zanaKripe",
    "lineIndex": 8,
    "placeId": "zanaProva",
    "text": "ti mos e merr kripën.",
    "conditions": {
      "all": [
        "arrival:action:story:zana-kripe:mos-e_obj-merr-kripe"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The salt is refused; no carried salt is added."
  },
  {
    "id": "description:rrethi:0",
    "nodeId": "rrethi",
    "lineIndex": 0,
    "placeId": "rrethi",
    "text": "Pranë Zanës, një rrugë e errët zbret drejt pusit.",
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
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "road",
        "key": "river-well-road",
        "label": "Dark descending road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The wellward road descends beside the Zana; its endpoint is not moved to the observer."
  },
  {
    "id": "description:rrethi:1",
    "nodeId": "rrethi",
    "lineIndex": 1,
    "placeId": "rrethi",
    "text": "zana thotë: kulshedra është poshtë në një pus të thellë dhe të errët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zana reports the dragon deep below in the well; the dragon is not visible on this bank."
  },
  {
    "id": "description:rrethi:2",
    "nodeId": "rrethi",
    "lineIndex": 2,
    "placeId": "rrethi",
    "text": "ti zbret me shqiponjën pranë Zanës.",
    "conditions": {
      "all": [
        "from:foleShpetuar"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "eagle",
        "key": "actor:helper-eagle",
        "label": "Helping eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The eagle descends with the viewer beside the Zana."
  },
  {
    "id": "description:fshehur:0",
    "nodeId": "fshehur",
    "lineIndex": 0,
    "placeId": "fshehur",
    "text": "këtu rri një plak i vjetër me mjekër të bardhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes White-bearded elder at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:fshehur:1",
    "nodeId": "fshehur",
    "lineIndex": 1,
    "placeId": "fshehur",
    "text": "plaku thotë: shpella ka një qytet të vjetër me një treg dhe ar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder describes the hidden city, market, treasure and guardian. These are reported interior contents, not visible possessions beside him."
  },
  {
    "id": "description:fshehur:2",
    "nodeId": "fshehur",
    "lineIndex": 2,
    "placeId": "fshehur",
    "text": "një gjarpër ruan arin në errësirë. nëse ti prek arin, errësira të ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder describes the hidden city, market, treasure and guardian. These are reported interior contents, not visible possessions beside him."
  },
  {
    "id": "description:fshehur:3",
    "nodeId": "fshehur",
    "lineIndex": 3,
    "placeId": "fshehur",
    "text": "një rrugë e errët kalon përmes shpellës drejt qytetit të vjetër.",
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
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "road",
        "key": "treasure-cavern-road",
        "label": "Dark road through the cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Dark descending cavern, Dark road through the cavern at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:fshehur:4",
    "nodeId": "fshehur",
    "lineIndex": 4,
    "placeId": "fshehur",
    "text": "jashtë shpellës Gjakovë është e gjallë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "village",
        "key": "place:sheshi",
        "label": "Living Gjakova outside the cavern",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The living town is outside the cavern, separate from the dead city below."
  },
  {
    "id": "description:fshehur:5",
    "nodeId": "fshehur",
    "lineIndex": 5,
    "placeId": "fshehur",
    "text": "një udhëtar rri jashtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Road traveler at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:thesarOra:0",
    "nodeId": "thesarOra",
    "lineIndex": 0,
    "placeId": "fshehur",
    "text": "Pranë hyrjes së shpellës së errët, plaku ul zërin.",
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
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes White-bearded elder, Dark descending cavern at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:thesarOra:1",
    "nodeId": "thesarOra",
    "lineIndex": 1,
    "placeId": "fshehur",
    "text": "plaku rri ende pranë hyrjes së shpellës së errët.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes White-bearded elder, Dark descending cavern at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:thesarOra:2",
    "nodeId": "thesarOra",
    "lineIndex": 2,
    "placeId": "fshehur",
    "text": "plaku flet:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:thesarOra:3",
    "nodeId": "thesarOra",
    "lineIndex": 3,
    "placeId": "fshehur",
    "text": "gjarpri është një vitore.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:thesarOra:4",
    "nodeId": "thesarOra",
    "lineIndex": 4,
    "placeId": "fshehur",
    "text": "vitorja lindi ar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:thesarOra:5",
    "nodeId": "thesarOra",
    "lineIndex": 5,
    "placeId": "fshehur",
    "text": "njerëz vranë vitoren.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:thesarOra:6",
    "nodeId": "thesarOra",
    "lineIndex": 6,
    "placeId": "fshehur",
    "text": "zjarri hëngri shtëpinë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:thesarOra:7",
    "nodeId": "thesarOra",
    "lineIndex": 7,
    "placeId": "fshehur",
    "text": "tani ari vret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:thesarOra:8",
    "nodeId": "thesarOra",
    "lineIndex": 8,
    "placeId": "fshehur",
    "text": "plaku thotë: brenda janë tri rrugë. vetëm rruga e dyta shkon në qytet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:treasure-old-man",
        "label": "White-bearded elder",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": true,
          "hairColor": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder narrates past events, danger and route instructions. No dead guardian, burning house or three-path interior is materialized beside the narrator."
  },
  {
    "id": "description:shpellaHyrje:0",
    "nodeId": "shpellaHyrje",
    "lineIndex": 0,
    "placeId": "shpellaHyrje",
    "text": "ti zbret në shpellën.",
    "conditions": {
      "all": [
        "from:shpellaRruget"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player descends into the cavern, rather than remaining at its outside mouth."
  },
  {
    "id": "description:shpellaHyrje:1",
    "nodeId": "shpellaHyrje",
    "lineIndex": 1,
    "placeId": "shpellaHyrje",
    "text": "rruga djathtas vjen mbrapa te hyrja.",
    "conditions": {
      "all": [
        "from:shpellaRruget"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "cavern-return-road",
        "label": "Return passage on the right",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Return passage on the right at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:shpellaHyrje:2",
    "nodeId": "shpellaHyrje",
    "lineIndex": 2,
    "placeId": "shpellaHyrje",
    "text": "brenda është errët si në varr, dhe ti nuk sheh asgjë.",
    "conditions": {
      "all": [
        "pishtar"
      ],
      "negate": true,
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
    "rationale": "The unlit cavern is too dark to reveal its contents; the grave is a simile."
  },
  {
    "id": "description:shpellaHyrje:3",
    "nodeId": "shpellaHyrje",
    "lineIndex": 3,
    "placeId": "shpellaHyrje",
    "text": "pishtari jep dritë, dhe ti sheh një qytet të vjetër.",
    "conditions": {
      "all": [
        "pishtar"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "torch",
        "key": "item:torch",
        "label": "Lit torch",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "village",
        "key": "treasure-dead-city",
        "label": "Old underground city",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Torchlight reveals the old city within the cavern."
  },
  {
    "id": "description:shpellaHyrje:4",
    "nodeId": "shpellaHyrje",
    "lineIndex": 4,
    "placeId": "shpellaHyrje",
    "text": "uji në shpellë është i keq tani.",
    "conditions": {
      "all": [
        "fact:gjakovaCavernWaterFouled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "water",
        "key": "cavern-tainted-water",
        "label": "Unsafe cavern water",
        "zone": "near",
        "attributes": {
          "color": "dark"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water is visible; its bad quality is retained as source knowledge."
  },
  {
    "id": "description:shpellaRruget:0",
    "nodeId": "shpellaRruget",
    "lineIndex": 0,
    "placeId": "shpellaRruget",
    "text": "ti kthehesh te tri rrugët. pishtari jep ende pak dritë.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "torch",
        "key": "item:torch",
        "label": "Low torch",
        "zone": "near",
        "attributes": {
          "intensity": "dying"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player returns to the same fork carrying the dim torch."
  },
  {
    "id": "description:shpellaRruget:1",
    "nodeId": "shpellaRruget",
    "lineIndex": 1,
    "placeId": "shpellaRruget",
    "text": "tri rrugë në errësirë: një majtas, një në mes, një djathtas.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "cavern-left-path",
        "label": "Left passage",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "road",
        "key": "cavern-middle-path",
        "label": "Middle passage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "road",
        "key": "cavern-right-path",
        "label": "Right passage",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Exactly three differently oriented passages are established."
  },
  {
    "id": "description:shpellaRruget:2",
    "nodeId": "shpellaRruget",
    "lineIndex": 2,
    "placeId": "shpellaRruget",
    "text": "pishtari jep pak dritë: hijet luajnë mbi gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "torch",
        "key": "item:torch",
        "label": "Low torch",
        "zone": "near",
        "attributes": {
          "intensity": "dying"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "rock",
        "key": "cavern-wet-stone",
        "label": "Cavern stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Torchlight casts changing shadows on stone."
  },
  {
    "id": "description:shpellaRruget:3",
    "nodeId": "shpellaRruget",
    "lineIndex": 3,
    "placeId": "shpellaRruget",
    "text": "uji pikon mbi gurin e lagësht.",
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
        "asset": "rock",
        "key": "cavern-wet-stone",
        "label": "Wet cavern stone",
        "zone": "near",
        "attributes": {
          "wet": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "water",
        "key": "cavern-drips",
        "label": "Dripping water",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water drips on wet stone; increased rain changes dripping, not the underground location."
  },
  {
    "id": "description:shpellaRruget:4",
    "nodeId": "shpellaRruget",
    "lineIndex": 4,
    "placeId": "shpellaRruget",
    "text": "kur bie shi, uji pikon më shpejt mbi gur.",
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
        "asset": "rock",
        "key": "cavern-wet-stone",
        "label": "Wet cavern stone",
        "zone": "near",
        "attributes": {
          "wet": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "water",
        "key": "cavern-drips",
        "label": "Dripping water",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water drips on wet stone; increased rain changes dripping, not the underground location."
  },
  {
    "id": "description:qytetiUdhetar:0",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 0,
    "placeId": "qytetiUdhetar",
    "text": "ti ecën nga plaku te udhëtari në rrugën jashtë shpellës.",
    "conditions": {
      "all": [
        "from:fshehur"
      ],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "road",
        "key": "town-outside-road",
        "label": "Road outside the cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewer walks from the elder to the traveler outside the cave."
  },
  {
    "id": "description:qytetiUdhetar:1",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 1,
    "placeId": "qytetiUdhetar",
    "text": "jashtë shpellës, rruga për në Gjakovën e gjallë është e lagësht.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "town-outside-road",
        "label": "Wet town road",
        "zone": "front",
        "attributes": {
          "wet": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Wet town road, Dark descending cavern at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:qytetiUdhetar:2",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 2,
    "placeId": "qytetiUdhetar",
    "text": "udhëtari pret ende në rrugën në Gjakovë jashtë shpellës.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "road",
        "key": "town-outside-road",
        "label": "Road outside the cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Road traveler, Road outside the cavern at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:qytetiUdhetar:3",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 3,
    "placeId": "qytetiUdhetar",
    "text": "udhëtari flet shpejt: fjalët vijnë si shi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:4",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 4,
    "placeId": "qytetiUdhetar",
    "text": "udhëtari thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:5",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 5,
    "placeId": "qytetiUdhetar",
    "text": "tung! hajde!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:6",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 6,
    "placeId": "qytetiUdhetar",
    "text": "unë vij nga një vend i largët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:7",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 7,
    "placeId": "qytetiUdhetar",
    "text": "çfarë po kërkon? a po kërkon punë?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:8",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 8,
    "placeId": "qytetiUdhetar",
    "text": "çfarë punë bën?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:9",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 9,
    "placeId": "qytetiUdhetar",
    "text": "mua më pëlqen ky vend, por natyrisht duhet të nisem.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:10",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 10,
    "placeId": "qytetiUdhetar",
    "text": "deti është shumë larg!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:11",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 11,
    "placeId": "qytetiUdhetar",
    "text": "epo, ti je gati?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:qytetiUdhetar:12",
    "nodeId": "qytetiUdhetar",
    "lineIndex": 12,
    "placeId": "qytetiUdhetar",
    "text": "eja me mua deri te dera e vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler speaks, asks questions and proposes onward travel; spoken destinations and rain simile do not create scenery here."
  },
  {
    "id": "description:udhaUdhetari:0",
    "nodeId": "udhaUdhetari",
    "lineIndex": 0,
    "placeId": "sheshi",
    "text": "ti ecën me udhëtarin tek dera e vjetër.",
    "conditions": {
      "all": [
        "from:qytetiUdhetar"
      ],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Road traveler, Old wooden town gate at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:udhaUdhetari:1",
    "nodeId": "udhaUdhetari",
    "lineIndex": 1,
    "placeId": "sheshi",
    "text": "një rojë ruan derën; Gjakova është brenda.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "village",
        "key": "gjakova-town",
        "label": "Gjakova inside the guarded gate",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The guard stands at the old gate; Gjakova is inside it, behind the entrance."
  },
  {
    "id": "description:udhaUdhetari:2",
    "nodeId": "udhaUdhetari",
    "lineIndex": 2,
    "placeId": "sheshi",
    "text": "roja thotë: për të kaluar, duhet një biletë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard requires a ticket and states a price; payment has not yet happened."
  },
  {
    "id": "description:udhaUdhetari:3",
    "nodeId": "udhaUdhetari",
    "lineIndex": 3,
    "placeId": "sheshi",
    "text": "një biletë kushton pesëqind lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard requires a ticket and states a price; payment has not yet happened."
  },
  {
    "id": "description:udhaUdhetari:4",
    "nodeId": "udhaUdhetari",
    "lineIndex": 4,
    "placeId": "sheshi",
    "text": "udhëtari jep pesëqind lekë dhe merr një biletë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "traveler-ticket-payment",
        "label": "Ticket payment",
        "zone": "near",
        "attributes": {
          "amount": 500
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "paper",
        "key": "traveler-ticket",
        "label": "Purchased ticket",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Road traveler, Town gate guard, Ticket payment, Purchased ticket at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:udhaUdhetari:5",
    "nodeId": "udhaUdhetari",
    "lineIndex": 5,
    "placeId": "sheshi",
    "text": "udhëtari thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler discusses the crossing and future departure; these are not completed player actions."
  },
  {
    "id": "description:udhaUdhetari:6",
    "nodeId": "udhaUdhetari",
    "lineIndex": 6,
    "placeId": "sheshi",
    "text": "nuk ka problem. unë di si kalojmë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler discusses the crossing and future departure; these are not completed player actions."
  },
  {
    "id": "description:udhaUdhetari:7",
    "nodeId": "udhaUdhetari",
    "lineIndex": 7,
    "placeId": "sheshi",
    "text": "a ke para? a do të vish?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler discusses the crossing and future departure; these are not completed player actions."
  },
  {
    "id": "description:udhaUdhetari:8",
    "nodeId": "udhaUdhetari",
    "lineIndex": 8,
    "placeId": "sheshi",
    "text": "unë kam edhe bukë për rrugë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bread",
        "key": "traveler-road-bread",
        "label": "Traveler’s bread",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The traveler explicitly has bread for the road."
  },
  {
    "id": "description:udhaUdhetari:9",
    "nodeId": "udhaUdhetari",
    "lineIndex": 9,
    "placeId": "sheshi",
    "text": "siç thashë, nisemi pas pak. dakord?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "rendezvous:seaRoadWalk:known",
        "visited:lamtumira"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler discusses the crossing and future departure; these are not completed player actions."
  },
  {
    "id": "description:rrugaDetit:0",
    "nodeId": "rrugaDetit",
    "lineIndex": 0,
    "placeId": "rrugaDetit",
    "text": "roja hap derën, dhe ti del në rrugën e vjetër dhe të vështirë.",
    "conditions": {
      "all": [
        "from:udhaShenja|udhaUdhetari"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Opened town gate",
        "zone": "back",
        "attributes": {
          "open": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "road",
        "key": "road:sea-route",
        "label": "Old road toward the sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Town gate guard, Opened town gate, Old road toward the sea at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:rrugaDetit:1",
    "nodeId": "rrugaDetit",
    "lineIndex": 1,
    "placeId": "rrugaDetit",
    "text": "ti je jashtë, në rrugën e vjetër dhe të vështirë.",
    "conditions": {
      "all": [
        "from:udhaShenja|udhaUdhetari"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "road:sea-route",
        "label": "Old road toward the sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Old road toward the sea at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:rrugaDetit:2",
    "nodeId": "rrugaDetit",
    "lineIndex": 2,
    "placeId": "rrugaDetit",
    "text": "një gur i madh tregon rrugën: mali është majtas, deti djathtas.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "rock",
        "key": "sea-route-marker",
        "label": "Large route-marker stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "mountain",
        "key": "sea-route-mountain",
        "label": "Mountain on the left",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "sea",
        "key": "place:deti",
        "label": "Sea direction on the right",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The stone orients the real route: mountain left and sea right."
  },
  {
    "id": "description:rrugaDetit:3",
    "nodeId": "rrugaDetit",
    "lineIndex": 3,
    "placeId": "rrugaDetit",
    "text": "ditën rruga e bardhë shkon larg nën diell.",
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
        "asset": "road",
        "key": "road:sea-route",
        "label": "White sunlit road",
        "zone": "front",
        "attributes": {
          "color": "white"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "sun",
        "key": "sky:sun",
        "label": "Sun above the route",
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
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Daylight shows the road continuing far away."
  },
  {
    "id": "description:rrugaDetit:4",
    "nodeId": "rrugaDetit",
    "lineIndex": 4,
    "placeId": "rrugaDetit",
    "text": "natën ti dëgjon detin larg.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [
        "arrival:action:observation:old-road-sea"
      ],
      "observationId": "old-road-sea"
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The distant sea is heard at night; sound alone does not establish a visible sea surface in this view."
  },
  {
    "id": "description:rrugaDetit:5",
    "nodeId": "rrugaDetit",
    "lineIndex": 5,
    "placeId": "rrugaDetit",
    "text": "udhëtari ecën përpara dhe flet:",
    "conditions": {
      "all": [
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Traveler walking ahead",
        "zone": "front",
        "attributes": {
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Traveler walking ahead at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:rrugaDetit:6",
    "nodeId": "rrugaDetit",
    "lineIndex": 6,
    "placeId": "rrugaDetit",
    "text": "rruga vazhdon drejt.",
    "conditions": {
      "all": [
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Directions and a report about the empty seashore do not place the narrator at that shore."
  },
  {
    "id": "description:rrugaDetit:7",
    "nodeId": "rrugaDetit",
    "lineIndex": 7,
    "placeId": "rrugaDetit",
    "text": "kaloj këtej herë pas herë.",
    "conditions": {
      "all": [
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Directions and a report about the empty seashore do not place the narrator at that shore."
  },
  {
    "id": "description:rrugaDetit:8",
    "nodeId": "rrugaDetit",
    "lineIndex": 8,
    "placeId": "rrugaDetit",
    "text": "pranë detit nuk ka fare njeri.",
    "conditions": {
      "all": [
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Directions and a report about the empty seashore do not place the narrator at that shore."
  },
  {
    "id": "description:rrugaDetit:9",
    "nodeId": "rrugaDetit",
    "lineIndex": 9,
    "placeId": "rrugaDetit",
    "text": "Në fillim të rrugës, fshati është ende pranë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "village",
        "key": "sea-route-village",
        "label": "Village still near the start of the road",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Village still near the start of the road at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:rrugaDetit:10",
    "nodeId": "rrugaDetit",
    "lineIndex": 10,
    "placeId": "rrugaDetit",
    "text": "Shiu bie në rrugë.",
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
        "asset": "road",
        "key": "road:sea-route",
        "label": "Old road toward the sea",
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
    "rationale": "Rain falls on the road independently of the traveler’s presence."
  },
  {
    "id": "description:rrugaDetit:11",
    "nodeId": "rrugaDetit",
    "lineIndex": 11,
    "placeId": "rrugaDetit",
    "text": "Udhëtari ka shkuar përpara.",
    "conditions": {
      "all": [
        "rendezvous:seaRoadWalk:missed"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "actor:road-traveler",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "absence",
    "rationale": "The missed traveler has gone ahead and is absent from this road segment."
  },
  {
    "id": "description:rrugaDetit:12",
    "nodeId": "rrugaDetit",
    "lineIndex": 12,
    "placeId": "rrugaDetit",
    "text": "ti pi ujin nga shishja.",
    "conditions": {
      "all": [
        "arrival:action:world-item:drink-bottle-rruga-detit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bottle",
        "key": "item:water-bottle",
        "label": "Drinking bottle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Drinking bottle at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:rrugaDetit:13",
    "nodeId": "rrugaDetit",
    "lineIndex": 13,
    "placeId": "rrugaDetit",
    "text": "çadra të mban të thatë.",
    "conditions": {
      "all": [
        "flag:umbrellaOpen:rrugaDetit",
        "weather:rain"
      ],
      "negate": false,
      "none": [
        "arrival:action:world-item:open-umbrella-rruga-detit-rain"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The opened umbrella shelters the viewer; rain remains outside its canopy."
  },
  {
    "id": "description:rrugaDetit:14",
    "nodeId": "rrugaDetit",
    "lineIndex": 14,
    "placeId": "rrugaDetit",
    "text": "çadra të mban të thatë në stuhi.",
    "conditions": {
      "all": [
        "flag:umbrellaOpen:rrugaDetit",
        "weather:storm"
      ],
      "negate": false,
      "none": [
        "arrival:action:world-item:open-umbrella-rruga-detit-storm"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The opened umbrella shelters the viewer; rain remains outside its canopy."
  },
  {
    "id": "description:rrugaDetit:15",
    "nodeId": "rrugaDetit",
    "lineIndex": 15,
    "placeId": "rrugaDetit",
    "text": "ti hap çadrën në rrugën e detit; ajo të mban të thatë.",
    "conditions": {
      "all": [
        "arrival:action:world-item:open-umbrella-rruga-detit-rain"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The opened umbrella shelters the viewer; rain remains outside its canopy."
  },
  {
    "id": "description:rrugaDetit:16",
    "nodeId": "rrugaDetit",
    "lineIndex": 16,
    "placeId": "rrugaDetit",
    "text": "ti hap çadrën në rrugën e detit; ajo të mban të thatë.",
    "conditions": {
      "all": [
        "arrival:action:world-item:open-umbrella-rruga-detit-storm"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The opened umbrella shelters the viewer; rain remains outside its canopy."
  },
  {
    "id": "description:rrugaDetit:17",
    "nodeId": "rrugaDetit",
    "lineIndex": 17,
    "placeId": "rrugaDetit",
    "text": "natën ti dëgjon detin larg.",
    "conditions": {
      "all": [
        "night",
        "observed:old-road-sea",
        "arrival:action:observation:old-road-sea"
      ],
      "negate": false,
      "none": [],
      "observationId": "old-road-sea"
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The distant sea is heard at night; sound alone does not establish a visible sea surface in this view."
  },
  {
    "id": "description:lamtumira:0",
    "nodeId": "lamtumira",
    "lineIndex": 0,
    "placeId": "guriUdhes",
    "text": "ti vjen me udhëtarin tek guri i madh.",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "rock",
        "key": "sea-route-marker",
        "label": "Great roadside stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The shared arrival occurs only while the same traveler is present at the stone."
  },
  {
    "id": "description:lamtumira:1",
    "nodeId": "lamtumira",
    "lineIndex": 1,
    "placeId": "guriUdhes",
    "text": "Guri i madh është pranë teje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "rock",
        "key": "sea-route-marker",
        "label": "Great roadside stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Great roadside stone at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lamtumira:2",
    "nodeId": "lamtumira",
    "lineIndex": 2,
    "placeId": "guriUdhes",
    "text": "larg, poshtë, ti sheh detin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "sea",
        "key": "place:deti",
        "label": "Distant sea",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The sea is independently visible far below the stone, including after the traveler has gone."
  },
  {
    "id": "description:lamtumira:3",
    "nodeId": "lamtumira",
    "lineIndex": 3,
    "placeId": "guriUdhes",
    "text": "udhëtari thotë:",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present traveler begins speaking beside the stone."
  },
  {
    "id": "description:lamtumira:4",
    "nodeId": "lamtumira",
    "lineIndex": 4,
    "placeId": "guriUdhes",
    "text": "ulu, mik! unë të jap ca ujë. merre!",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "traveler-offered-water",
        "label": "Offered drinking water",
        "zone": "near",
        "attributes": {
          "drink": "water"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler offers water and a seat while present; the invitation itself does not move the viewpoint."
  },
  {
    "id": "description:lamtumira:5",
    "nodeId": "lamtumira",
    "lineIndex": 5,
    "placeId": "guriUdhes",
    "text": "udhëtari thotë: unë të jap pak bukë.",
    "conditions": {
      "all": [
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [
        "buke"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bread",
        "key": "traveler-road-bread",
        "label": "Bread offered by the traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The traveler offers bread only when present and the player lacks it. The bread remains with the traveler until acceptance."
  },
  {
    "id": "description:lamtumira:6",
    "nodeId": "lamtumira",
    "lineIndex": 6,
    "placeId": "guriUdhes",
    "text": "një muaj dhe një javë duhen për rrugën.",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present traveler explains the coming separation and says goodbye. Duration, friendship and farewells add no extra mesh."
  },
  {
    "id": "description:lamtumira:7",
    "nodeId": "lamtumira",
    "lineIndex": 7,
    "placeId": "guriUdhes",
    "text": "ti nuk vjen dot me mua.",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present traveler explains the coming separation and says goodbye. Duration, friendship and farewells add no extra mesh."
  },
  {
    "id": "description:lamtumira:8",
    "nodeId": "lamtumira",
    "lineIndex": 8,
    "placeId": "guriUdhes",
    "text": "pse? nuk ka rëndësi.",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present traveler explains the coming separation and says goodbye. Duration, friendship and farewells add no extra mesh."
  },
  {
    "id": "description:lamtumira:9",
    "nodeId": "lamtumira",
    "lineIndex": 9,
    "placeId": "guriUdhes",
    "text": "ne ecëm pak bashkë. tani ti je miku im.",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present traveler explains the coming separation and says goodbye. Duration, friendship and farewells add no extra mesh."
  },
  {
    "id": "description:lamtumira:10",
    "nodeId": "lamtumira",
    "lineIndex": 10,
    "placeId": "guriUdhes",
    "text": "paç fat! udhë të mbarë! mirupafshim!",
    "conditions": {
      "all": [
        "from:rrugaDetit",
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present traveler explains the coming separation and says goodbye. Duration, friendship and farewells add no extra mesh."
  },
  {
    "id": "description:lamtumira:11",
    "nodeId": "lamtumira",
    "lineIndex": 11,
    "placeId": "guriUdhes",
    "text": "udhëtari është gati për rrugën e detit.",
    "conditions": {
      "all": [
        "npc:seaRoadTraveller"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "road",
        "key": "road:sea-route",
        "label": "Old road toward the sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The traveler remains here ready to leave; readiness is not departure or a distant walking body."
  },
  {
    "id": "description:lamtumira:12",
    "nodeId": "lamtumira",
    "lineIndex": 12,
    "placeId": "guriUdhes",
    "text": "ti merr bukën nga udhëtari.",
    "conditions": {
      "all": [
        "arrival:action:lamtumira:merr-buke"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:road-traveler",
        "label": "Road traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bread",
        "key": "traveler-road-bread",
        "label": "Bread taken from the traveler",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This exact accepted-action arrival transfers the bread to the viewer; the offer did not pre-enact the taking."
  },
  {
    "id": "description:guriUdhes:0",
    "nodeId": "guriUdhes",
    "lineIndex": 0,
    "placeId": "guriUdhes",
    "text": "ti je tek guri i madh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "rock",
        "key": "sea-route-marker",
        "label": "Great roadside stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Great roadside stone at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:guriUdhes:1",
    "nodeId": "guriUdhes",
    "lineIndex": 1,
    "placeId": "guriUdhes",
    "text": "mbi gurin e madh janë shkruar shumë shenja.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "inscription",
        "key": "sea-stone-signs",
        "label": "Marks on the great stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Marks on the great stone at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:guriUdhes:2",
    "nodeId": "guriUdhes",
    "lineIndex": 2,
    "placeId": "guriUdhes",
    "text": "rruga shkon djathtas, poshtë, larg: djathtas është det.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "road:sea-route",
        "label": "Road descending rightward",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "sea",
        "key": "place:deti",
        "label": "Distant sea",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Road descending rightward, Distant sea at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:guriUdhes:3",
    "nodeId": "guriUdhes",
    "lineIndex": 3,
    "placeId": "guriUdhes",
    "text": "ditën deti larg është një dritë nën diell.",
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
        "asset": "sea",
        "key": "place:deti",
        "label": "Distant sea",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "sun",
        "key": "sky:sun",
        "label": "Sun above the distant sea",
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
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Daylight glints on the distant sea."
  },
  {
    "id": "description:guriUdhes:4",
    "nodeId": "guriUdhes",
    "lineIndex": 4,
    "placeId": "guriUdhes",
    "text": "natën ti dëgjon detin larg.",
    "conditions": {
      "all": [
        "night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The sea is heard at night; sound alone does not create a new visible object."
  },
  {
    "id": "description:sheshi:0",
    "nodeId": "sheshi",
    "lineIndex": 0,
    "placeId": "sheshi",
    "text": "ti hyn në Gjakovë. shpella është jashtë qytetit; qyteti poshtë është i vdekur.",
    "conditions": {
      "all": [
        "from:fshehur|qytetiUdhetar|udhaUdhetari"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "village",
        "key": "gjakova-town",
        "label": "Living Gjakova",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player enters the living town; the cave outside and dead city below remain separate locations."
  },
  {
    "id": "description:sheshi:1",
    "nodeId": "sheshi",
    "lineIndex": 1,
    "placeId": "sheshi",
    "text": "këtu mblidhen njerëz të gjallë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "gjakova-people",
        "label": "Living townspeople",
        "zone": "around",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Living townspeople at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:sheshi:2",
    "nodeId": "sheshi",
    "lineIndex": 2,
    "placeId": "sheshi",
    "text": "burra dhe gra flasin, ndërsa një tregtar thërret dhe shet mish dhe perime.",
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
        "asset": "human",
        "key": "gjakova-men",
        "label": "Men talking",
        "zone": "left",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "asset": "human",
        "key": "gjakova-women",
        "label": "Women talking",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "meat",
        "key": "market-meat",
        "label": "Meat for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "vegetables",
        "key": "market-vegetables",
        "label": "Vegetables for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Men talking, Women talking, Gjakova merchant, Meat for sale, Vegetables for sale at the present location; dimensions and unmeasured offsets are illustrative. The women speaking in the public gathering are staged in the open foreground, not behind the unrelated nearby inn."
  },
  {
    "id": "description:sheshi:3",
    "nodeId": "sheshi",
    "lineIndex": 3,
    "placeId": "sheshi",
    "text": "natën tregu është mbyllur, qyteti rri i qetë.",
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
        "asset": "stall",
        "key": "town-market-stall",
        "label": "Closed market stall",
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
    "rationale": "At night the market is closed; active sellers and buyers are not added."
  },
  {
    "id": "description:sheshi:4",
    "nodeId": "sheshi",
    "lineIndex": 4,
    "placeId": "sheshi",
    "text": "afër është një restorant: vjen erë mishi; një bujtinë ka dhomë, dhe një shërues ka bar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "house",
        "key": "town-restaurant",
        "label": "Nearby restaurant",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "house",
        "key": "town-inn",
        "label": "Nearby inn",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "house",
        "key": "town-healer-house",
        "label": "Healer’s house",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The nearby buildings are visible; meat smell and available room or medicine do not reveal their interiors."
  },
  {
    "id": "description:sheshi:5",
    "nodeId": "sheshi",
    "lineIndex": 5,
    "placeId": "sheshi",
    "text": "një udhëtar vjen prej larg, ndërsa një derë e madhe dhe e vjetër rri mbyllur këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:city-old-door"
      ],
      "observationId": "city-old-door"
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Arriving traveler",
        "zone": "front",
        "attributes": {
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "town-old-gate",
        "property": "open",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The traveler arrives while the old gate stays closed."
  },
  {
    "id": "description:sheshi:6",
    "nodeId": "sheshi",
    "lineIndex": 6,
    "placeId": "sheshi",
    "text": "te dera rri një njeri pa bukë dhe pa lek.",
    "conditions": {
      "all": [
        "flag:bukaDhene"
      ],
      "negate": true,
      "none": [],
      "observationId": "city-old-door"
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The man stands without bread or money; neither is invented in his hands."
  },
  {
    "id": "description:sheshi:7",
    "nodeId": "sheshi",
    "lineIndex": 7,
    "placeId": "sheshi",
    "text": "njeriu ha bukë te dera.",
    "conditions": {
      "all": [
        "flag:bukaDhene"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {
          "pose": "eating"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "bread",
        "key": "beggar-bread",
        "label": "Bread being eaten",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Man at the town gate, Old wooden town gate, Bread being eaten at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:sheshi:8",
    "nodeId": "sheshi",
    "lineIndex": 8,
    "placeId": "sheshi",
    "text": "ti pi ujin nga shishja.",
    "conditions": {
      "all": [
        "arrival:action:world-item:drink-bottle-sheshi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bottle",
        "key": "item:water-bottle",
        "label": "Drinking bottle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Drinking bottle at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:sheshi:9",
    "nodeId": "sheshi",
    "lineIndex": 9,
    "placeId": "sheshi",
    "text": "çadra të mban të thatë.",
    "conditions": {
      "all": [
        "flag:umbrellaOpen:sheshi",
        "weather:rain"
      ],
      "negate": false,
      "none": [
        "arrival:action:world-item:open-umbrella-sheshi-rain"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The umbrella shelters the viewer in the square."
  },
  {
    "id": "description:sheshi:10",
    "nodeId": "sheshi",
    "lineIndex": 10,
    "placeId": "sheshi",
    "text": "çadra të mban të thatë në stuhi.",
    "conditions": {
      "all": [
        "flag:umbrellaOpen:sheshi",
        "weather:storm"
      ],
      "negate": false,
      "none": [
        "arrival:action:world-item:open-umbrella-sheshi-storm"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The umbrella shelters the viewer in the square."
  },
  {
    "id": "description:sheshi:11",
    "nodeId": "sheshi",
    "lineIndex": 11,
    "placeId": "sheshi",
    "text": "ti hap çadrën në shesh; ajo të mban të thatë.",
    "conditions": {
      "all": [
        "arrival:action:world-item:open-umbrella-sheshi-rain"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The umbrella shelters the viewer in the square."
  },
  {
    "id": "description:sheshi:12",
    "nodeId": "sheshi",
    "lineIndex": 12,
    "placeId": "sheshi",
    "text": "ti hap çadrën në shesh; ajo të mban të thatë.",
    "conditions": {
      "all": [
        "arrival:action:world-item:open-umbrella-sheshi-storm"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "umbrella",
        "key": "item:umbrella",
        "label": "Opened umbrella",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The umbrella shelters the viewer in the square."
  },
  {
    "id": "description:sheshi:13",
    "nodeId": "sheshi",
    "lineIndex": 13,
    "placeId": "sheshi",
    "text": "një udhëtar vjen prej larg, ndërsa një derë e madhe dhe e vjetër rri mbyllur këtu.",
    "conditions": {
      "all": [
        "observed:city-old-door",
        "arrival:action:observation:city-old-door"
      ],
      "negate": false,
      "none": [],
      "observationId": "city-old-door"
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Arriving traveler",
        "zone": "front",
        "attributes": {
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "town-old-gate",
        "property": "open",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The traveler arrives while the old gate stays closed."
  },
  {
    "id": "description:sheshiMjek:0",
    "nodeId": "sheshiMjek",
    "lineIndex": 0,
    "placeId": "sheshi",
    "text": "një grua të dëgjon dhe tregon shtëpinë e shëruesit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-directions-woman",
        "label": "Woman giving directions",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "house",
        "key": "town-healer-house",
        "label": "Indicated healer’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The woman points toward the actual house; the treatment has not happened."
  },
  {
    "id": "description:lemoshaBuke:0",
    "nodeId": "lemoshaBuke",
    "lineIndex": 0,
    "placeId": "sheshi",
    "text": "ti jep bukë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bread",
        "key": "beggar-bread",
        "label": "Donated bread",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Man at the town gate, Donated bread at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lemoshaBuke:1",
    "nodeId": "lemoshaBuke",
    "lineIndex": 1,
    "placeId": "sheshi",
    "text": "njeriu ha bukën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {
          "pose": "eating"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bread",
        "key": "beggar-bread",
        "label": "Bread being eaten",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Man at the town gate, Bread being eaten at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lemoshaBuke:2",
    "nodeId": "lemoshaBuke",
    "lineIndex": 2,
    "placeId": "sheshi",
    "text": "njeriu thotë: faleminderit! ti je një mik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The same recipient thanks the player."
  },
  {
    "id": "description:lemoshaBuke:3",
    "nodeId": "lemoshaBuke",
    "lineIndex": 3,
    "placeId": "sheshi",
    "text": "tregtari rri ende në shesh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lemoshaFund:0",
    "nodeId": "lemoshaFund",
    "lineIndex": 0,
    "placeId": "sheshi",
    "text": "ti jep njëqind lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "beggar-donation",
        "label": "Donated money",
        "zone": "near",
        "attributes": {
          "amount": 100
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Man at the town gate, Donated money at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:lemoshaFund:1",
    "nodeId": "lemoshaFund",
    "lineIndex": 1,
    "placeId": "sheshi",
    "text": "njeriu thotë: faleminderit! ti je një mik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-beggar",
        "label": "Man at the town gate",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The recipient thanks the player after the donation."
  },
  {
    "id": "description:tregtari:0",
    "nodeId": "tregtari",
    "lineIndex": 0,
    "placeId": "tregtari",
    "text": "ti kalon sheshin dhe arrin te tregtari.",
    "conditions": {
      "all": [
        "from:sheshi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtari:1",
    "nodeId": "tregtari",
    "lineIndex": 1,
    "placeId": "tregtari",
    "text": "tregtari thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:2",
    "nodeId": "tregtari",
    "lineIndex": 2,
    "placeId": "tregtari",
    "text": "mirëmëngjes!",
    "conditions": {
      "all": [
        "greeting:morning"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:3",
    "nodeId": "tregtari",
    "lineIndex": 3,
    "placeId": "tregtari",
    "text": "mirëdita!",
    "conditions": {
      "all": [
        "greeting:day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:4",
    "nodeId": "tregtari",
    "lineIndex": 4,
    "placeId": "tregtari",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:evening"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:5",
    "nodeId": "tregtari",
    "lineIndex": 5,
    "placeId": "tregtari",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:6",
    "nodeId": "tregtari",
    "lineIndex": 6,
    "placeId": "tregtari",
    "text": "si jeni? çfarë dëshironi?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:7",
    "nodeId": "tregtari",
    "lineIndex": 7,
    "placeId": "tregtari",
    "text": "unë shes mish, peshk, perime. gjithashtu shes gjalpë. mishi është i shtrenjtë, perimet janë të lira.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "meat",
        "key": "market-meat",
        "label": "Meat for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "fish",
        "key": "market-fish",
        "label": "Fish for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "vegetables",
        "key": "market-vegetables",
        "label": "Vegetables for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "butter",
        "key": "market-butter",
        "label": "Butter for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Meat for sale, Fish for sale, Vegetables for sale, Butter for sale at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtari:8",
    "nodeId": "tregtari",
    "lineIndex": 8,
    "placeId": "tregtari",
    "text": "një bukë kushton njëqind lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:9",
    "nodeId": "tregtari",
    "lineIndex": 9,
    "placeId": "tregtari",
    "text": "sa kushton një çaj? një çaj, dyqind lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:10",
    "nodeId": "tregtari",
    "lineIndex": 10,
    "placeId": "tregtari",
    "text": "një birrë, treqind lekë. kripë, njëqind lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:11",
    "nodeId": "tregtari",
    "lineIndex": 11,
    "placeId": "tregtari",
    "text": "a do të blesh gjë? më jep paratë këtu.",
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
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:12",
    "nodeId": "tregtari",
    "lineIndex": 12,
    "placeId": "tregtari",
    "text": "më jep pesëqind lekë. unë të jap kusurin.",
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
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:13",
    "nodeId": "tregtari",
    "lineIndex": 13,
    "placeId": "tregtari",
    "text": "ai ka edhe një dyqan me rroba.",
    "conditions": {
      "all": [
        "visited:tregtari2"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant mentions a separate clothes shop; its interior is not placed in this market beat."
  },
  {
    "id": "description:tregtari:14",
    "nodeId": "tregtari",
    "lineIndex": 14,
    "placeId": "tregtari",
    "text": "faleminderit! ejani përsëri!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:15",
    "nodeId": "tregtari",
    "lineIndex": 15,
    "placeId": "tregtari",
    "text": "ti thua: mirëmëngjes!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtrader:morning:mirmengjes"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:16",
    "nodeId": "tregtari",
    "lineIndex": 16,
    "placeId": "tregtari",
    "text": "ti thua: mirëdita!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtrader:day:mirdita"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:17",
    "nodeId": "tregtari",
    "lineIndex": 17,
    "placeId": "tregtari",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtrader:evening:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:18",
    "nodeId": "tregtari",
    "lineIndex": 18,
    "placeId": "tregtari",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtrader:night:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtari:19",
    "nodeId": "tregtari",
    "lineIndex": 19,
    "placeId": "tregtari",
    "text": "natën, kur ikën, thua: natën e mirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant conversation contains greetings, prices, requests and farewells; no unaccepted sale or player payment is depicted."
  },
  {
    "id": "description:tregtariBiseda:0",
    "nodeId": "tregtariBiseda",
    "lineIndex": 0,
    "placeId": "tregtari",
    "text": "Tregtari lë çantën me para dhe të dëgjon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bag",
        "key": "merchant-money-bag",
        "label": "Merchant’s money bag",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Merchant’s money bag at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtariBiseda:1",
    "nodeId": "tregtariBiseda",
    "lineIndex": 1,
    "placeId": "tregtari",
    "text": "ai thotë: ti mund të marrësh bukë; është më e lirë se mishi.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-trader:response:cheaper"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Advice and opening time are spoken by the merchant; recommended purchases are not already acquired."
  },
  {
    "id": "description:tregtariBiseda:2",
    "nodeId": "tregtariBiseda",
    "lineIndex": 2,
    "placeId": "tregtari",
    "text": "ai thotë: Merrni bukë dhe ujë; rruga është e gjatë.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-trader:response:road"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Advice and opening time are spoken by the merchant; recommended purchases are not already acquired."
  },
  {
    "id": "description:tregtariBiseda:3",
    "nodeId": "tregtariBiseda",
    "lineIndex": 3,
    "placeId": "tregtari",
    "text": "ai thotë: Dyqani hapet fiks në orën shtatë.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-trader:response:opening"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Advice and opening time are spoken by the merchant; recommended purchases are not already acquired."
  },
  {
    "id": "description:blerjaBuke:0",
    "nodeId": "blerjaBuke",
    "lineIndex": 0,
    "placeId": "tregtari",
    "text": "ti jep njëqind lekë dhe merr një bukë.",
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
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "purchase-payment",
        "label": "Bread payment",
        "zone": "near",
        "attributes": {
          "amount": 100
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bread",
        "key": "item:purchased-bread",
        "label": "Purchased bread",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Bread payment, Purchased bread at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:blerjaBuke:1",
    "nodeId": "blerjaBuke",
    "lineIndex": 1,
    "placeId": "tregtari",
    "text": "tregtari thotë: faleminderit! eja përsëri!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant thanks the player after the sale."
  },
  {
    "id": "description:blerjaKripe:0",
    "nodeId": "blerjaKripe",
    "lineIndex": 0,
    "placeId": "tregtari",
    "text": "ti jep njëqind lekë dhe merr kripën.",
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
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "purchase-payment",
        "label": "Salt payment",
        "zone": "near",
        "attributes": {
          "amount": 100
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "salt",
        "key": "item:purchased-salt",
        "label": "Purchased salt",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Salt payment, Purchased salt at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:blerjaKripe:1",
    "nodeId": "blerjaKripe",
    "lineIndex": 1,
    "placeId": "tregtari",
    "text": "tregtari thotë: faleminderit!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant thanks the player after the sale."
  },
  {
    "id": "description:shitjaCaj:0",
    "nodeId": "shitjaCaj",
    "lineIndex": 0,
    "placeId": "tregtari",
    "text": "ti shet çaj dhe tregtari të jep pesëqind lekë.",
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
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "leaves",
        "key": "item:mountain-tea",
        "label": "Sold mountain tea",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "tea-sale-payment",
        "label": "Tea sale payment",
        "zone": "near",
        "attributes": {
          "amount": 500
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Sold mountain tea, Tea sale payment at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:shitjaCaj:1",
    "nodeId": "shitjaCaj",
    "lineIndex": 1,
    "placeId": "tregtari",
    "text": "tregtari thotë: çaj nga mali është bar i mirë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes the tea’s medicinal value."
  },
  {
    "id": "description:shitjaCaj:2",
    "nodeId": "shitjaCaj",
    "lineIndex": 2,
    "placeId": "tregtari",
    "text": "Sheshi është prapa tregtarit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "village",
        "key": "gjakova-town",
        "label": "Living Gjakova",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "gjakova-town",
        "kind": "behind",
        "target": "actor:gjakova-merchant"
      }
    ],
    "disposition": "physical",
    "rationale": "The town square lies behind the merchant."
  },
  {
    "id": "description:tregtari2:0",
    "nodeId": "tregtari2",
    "lineIndex": 0,
    "placeId": "tregtari2",
    "text": "ti hyn në dyqan. tregtari thotë:",
    "conditions": {
      "all": [
        "from:tregtari"
      ],
      "negate": false,
      "none": [
        "again"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "interior",
        "key": "merchant-shop-room",
        "label": "Merchant’s shop interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "merchant-shop-room"
      },
      {
        "subject": "actor:gjakova-merchant",
        "kind": "inside",
        "target": "merchant-shop-room"
      }
    ],
    "disposition": "physical",
    "rationale": "This observed beat establishes Merchant’s shop interior, Gjakova merchant at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtari2:1",
    "nodeId": "tregtari2",
    "lineIndex": 1,
    "placeId": "tregtari2",
    "text": "ti kthehesh në dyqan. tregtari është ende këtu dhe thotë:",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "interior",
        "key": "merchant-shop-room",
        "label": "Merchant’s shop interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "merchant-shop-room"
      },
      {
        "subject": "actor:gjakova-merchant",
        "kind": "inside",
        "target": "merchant-shop-room"
      }
    ],
    "disposition": "physical",
    "rationale": "This observed beat establishes Merchant’s shop interior, Gjakova merchant at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtari2:2",
    "nodeId": "tregtari2",
    "lineIndex": 2,
    "placeId": "tregtari2",
    "text": "sa para ke? dy mijë lekë?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes price, workmanship and availability; a hypothetical horse and money totals are not local acquired objects."
  },
  {
    "id": "description:tregtari2:3",
    "nodeId": "tregtari2",
    "lineIndex": 3,
    "placeId": "tregtari2",
    "text": "një gjë e mirë kushton një mijë lekë. një kalë kushton njëqind mijë lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes price, workmanship and availability; a hypothetical horse and money totals are not local acquired objects."
  },
  {
    "id": "description:tregtari2:4",
    "nodeId": "tregtari2",
    "lineIndex": 4,
    "placeId": "tregtari2",
    "text": "por nëse ke zero lekë, nuk ka problem: uji nuk kushton para.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes price, workmanship and availability; a hypothetical horse and money totals are not local acquired objects."
  },
  {
    "id": "description:tregtari2:5",
    "nodeId": "tregtari2",
    "lineIndex": 5,
    "placeId": "tregtari2",
    "text": "në dyqanin im ka gjëra të mira.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes price, workmanship and availability; a hypothetical horse and money totals are not local acquired objects."
  },
  {
    "id": "description:tregtari2:6",
    "nodeId": "tregtari2",
    "lineIndex": 6,
    "placeId": "tregtari2",
    "text": "unë shes edhe rroba: një plis i bardhë, një xhubletë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "hat",
        "key": "shop-plis",
        "label": "White felt plis",
        "zone": "near",
        "attributes": {
          "color": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "skirt",
        "key": "shop-xhubleta",
        "label": "Xhubleta for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, White felt plis, Xhubleta for sale at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtari2:7",
    "nodeId": "tregtari2",
    "lineIndex": 7,
    "placeId": "tregtari2",
    "text": "plisi bëhet me dorë.",
    "conditions": {
      "all": [
        "visited:plisiFund"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes price, workmanship and availability; a hypothetical horse and money totals are not local acquired objects."
  },
  {
    "id": "description:tregtari2:8",
    "nodeId": "tregtari2",
    "lineIndex": 8,
    "placeId": "tregtari2",
    "text": "xhubleta është e zezë dhe ka diell, hënë dhe yll. një vajzë e vesh kur bëhet grua.",
    "conditions": {
      "all": [
        "visited:xhubletaFund"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "skirt",
        "key": "shop-xhubleta",
        "label": "Black xhubleta with woven celestial motifs",
        "zone": "near",
        "attributes": {
          "color": "black"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Sun, moon and star are woven motifs on the garment, not full celestial bodies in the shop."
  },
  {
    "id": "description:tregtari2:9",
    "nodeId": "tregtari2",
    "lineIndex": 9,
    "placeId": "tregtari2",
    "text": "unë shes edhe një lahutë: pesë mijë lekë.",
    "conditions": {
      "all": [
        "visited:blerjaLahuta"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "lute",
        "key": "shop-lahuta",
        "label": "Lahuta for sale",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Lahuta for sale at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:tregtari2:10",
    "nodeId": "tregtari2",
    "lineIndex": 10,
    "placeId": "tregtari2",
    "text": "faleminderit dhe mirupafshim!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant describes price, workmanship and availability; a hypothetical horse and money totals are not local acquired objects."
  },
  {
    "id": "description:sendetDites:0",
    "nodeId": "sendetDites",
    "lineIndex": 0,
    "placeId": "tregtari2",
    "text": "tregtari pyet: çfarë lloji kërkon?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant asks what type is wanted."
  },
  {
    "id": "description:sendetDites:1",
    "nodeId": "sendetDites",
    "lineIndex": 1,
    "placeId": "tregtari2",
    "text": "ai thotë: kam një çakmak dhe një shishe, një çadër dhe një litar, një batanije, sapun dhe një peshqir.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "lighter",
        "key": "shop-lighter",
        "label": "Lighter",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bottle",
        "key": "shop-bottle",
        "label": "Bottle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "umbrella",
        "key": "shop-umbrella",
        "label": "Umbrella",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "rope",
        "key": "shop-rope",
        "label": "Rope",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cloth",
        "key": "shop-blanket",
        "label": "Blanket",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "soap",
        "key": "shop-soap",
        "label": "Soap",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "towel",
        "key": "shop-towel",
        "label": "Towel",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The merchant explicitly lists current stock; illustrative staging separates the ordinary objects for inspection."
  },
  {
    "id": "description:sendetDites:2",
    "nodeId": "sendetDites",
    "lineIndex": 2,
    "placeId": "tregtari2",
    "text": "ai thotë: ka mbetur vetëm një çakmak.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "lighter",
        "key": "shop-lighter",
        "label": "The single remaining lighter",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, The single remaining lighter at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:sendetDites:3",
    "nodeId": "sendetDites",
    "lineIndex": 3,
    "placeId": "tregtari2",
    "text": "Tregtari tregon çakmakun dhe thotë: pesë mijë të vjetra. Pastaj tregon pesëqind lekë: kaq paguan.",
    "conditions": {
      "all": [
        "cakmak"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "lighter",
        "key": "shop-lighter",
        "label": "Indicated lighter",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "lighter-price-example",
        "label": "Displayed 500 nominal lek",
        "zone": "near",
        "attributes": {
          "amount": 500
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant shows a current-money price and explains old lek conversion; this is a display, not payment before purchase."
  },
  {
    "id": "description:blerjaLahuta:0",
    "nodeId": "blerjaLahuta",
    "lineIndex": 0,
    "placeId": "tregtari2",
    "text": "ti jep pesë mijë lekë dhe merr lahutën.",
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
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "lute",
        "key": "item:lahuta",
        "label": "Purchased lahuta",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "lahuta-payment",
        "label": "Lahuta payment",
        "zone": "near",
        "attributes": {
          "amount": 5000
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjakova merchant, Purchased lahuta, Lahuta payment at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:blerjaLahuta:1",
    "nodeId": "blerjaLahuta",
    "lineIndex": 1,
    "placeId": "tregtari2",
    "text": "tregtari thotë: këndo për trima!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant suggests future singing; no performance is yet enacted."
  },
  {
    "id": "description:plisiFund:0",
    "nodeId": "plisiFund",
    "lineIndex": 0,
    "placeId": "tregtari2",
    "text": "ti vesh plisin e bardhë.",
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
    "rationale": "The first-person player wears the white cap above the camera; no duplicate player or floating hat before the face is created."
  },
  {
    "id": "description:plisiFund:1",
    "nodeId": "plisiFund",
    "lineIndex": 1,
    "placeId": "tregtari2",
    "text": "tregtari thotë: i bukur!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-merchant",
        "label": "Gjakova merchant",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The merchant comments on the worn cap."
  },
  {
    "id": "description:xhubletaFund:0",
    "nodeId": "xhubletaFund",
    "lineIndex": 0,
    "placeId": "tregtari2",
    "text": "ti sheh xhubletën e zezë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "skirt",
        "key": "shop-xhubleta",
        "label": "Black xhubleta with woven sun, moon and star motifs",
        "zone": "near",
        "attributes": {
          "color": "black"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The woven motifs remain garment details rather than astronomical objects."
  },
  {
    "id": "description:xhubletaFund:1",
    "nodeId": "xhubletaFund",
    "lineIndex": 1,
    "placeId": "tregtari2",
    "text": "xhubleta ka diell, hënë dhe yll.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "skirt",
        "key": "shop-xhubleta",
        "label": "Black xhubleta with woven sun, moon and star motifs",
        "zone": "near",
        "attributes": {
          "color": "black"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The woven motifs remain garment details rather than astronomical objects."
  },
  {
    "id": "description:bujtina:0",
    "nodeId": "bujtina",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "ti shkon në bujtinën.",
    "conditions": {
      "all": [
        "from:kafeja1|bujtina"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "interior",
        "key": "inn-room",
        "label": "Inn interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "inn-room"
      }
    ],
    "disposition": "physical",
    "rationale": "This observed beat establishes Inn interior, Innkeeper at the present location; dimensions and unmeasured offsets are illustrative. The player is in this inn room; its enclosure surrounds the actual viewpoint rather than standing as a detached room ahead."
  },
  {
    "id": "description:bujtina:1",
    "nodeId": "bujtina",
    "lineIndex": 1,
    "placeId": "bujtina",
    "text": "ti je përsëri në bujtinën.",
    "conditions": {
      "all": [
        "from:kafeja1|bujtina"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "interior",
        "key": "inn-room",
        "label": "Inn interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "inn-room"
      }
    ],
    "disposition": "physical",
    "rationale": "This observed beat establishes Inn interior, Innkeeper at the present location; dimensions and unmeasured offsets are illustrative. The player is in this inn room; its enclosure surrounds the actual viewpoint rather than standing as a detached room ahead."
  },
  {
    "id": "description:bujtina:2",
    "nodeId": "bujtina",
    "lineIndex": 2,
    "placeId": "bujtina",
    "text": "një grua thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:3",
    "nodeId": "bujtina",
    "lineIndex": 3,
    "placeId": "bujtina",
    "text": "mirëmëngjes!",
    "conditions": {
      "all": [
        "greeting:morning"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:4",
    "nodeId": "bujtina",
    "lineIndex": 4,
    "placeId": "bujtina",
    "text": "mirëdita!",
    "conditions": {
      "all": [
        "greeting:day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:5",
    "nodeId": "bujtina",
    "lineIndex": 5,
    "placeId": "bujtina",
    "text": "mirëmbrëma! është pothuajse koha për darkë.",
    "conditions": {
      "all": [
        "greeting:evening"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:6",
    "nodeId": "bujtina",
    "lineIndex": 6,
    "placeId": "bujtina",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:7",
    "nodeId": "bujtina",
    "lineIndex": 7,
    "placeId": "bujtina",
    "text": "një bujtinë e madhe është një hotel.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:8",
    "nodeId": "bujtina",
    "lineIndex": 8,
    "placeId": "bujtina",
    "text": "Bujtina ka tetë dhoma; kjo ka një shtrat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "interior",
        "key": "inn-room",
        "label": "Inn interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "bed",
        "key": "inn-bed",
        "label": "Guest bed",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "inn-bed",
        "kind": "inside",
        "target": "inn-room"
      },
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "inn-room"
      }
    ],
    "disposition": "physical",
    "rationale": "The inn has eight rooms but this view is one room with one bed; the other rooms are source-level building capacity, not eight beds here. The player is in this inn room; its enclosure surrounds the actual viewpoint rather than standing as a detached room ahead."
  },
  {
    "id": "description:bujtina:9",
    "nodeId": "bujtina",
    "lineIndex": 9,
    "placeId": "bujtina",
    "text": "nata kushton dy mijë lekë. këtu është çelës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "key",
        "key": "inn-room-key",
        "label": "Offered room key",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:innkeeper",
        "kind": "holds",
        "target": "inn-room-key"
      }
    ],
    "disposition": "physical",
    "rationale": "The innkeeper presents the key here; the stated night price is not already paid."
  },
  {
    "id": "description:bujtina:10",
    "nodeId": "bujtina",
    "lineIndex": 10,
    "placeId": "bujtina",
    "text": "fle mirë! natën e mirë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:11",
    "nodeId": "bujtina",
    "lineIndex": 11,
    "placeId": "bujtina",
    "text": "gruaja thotë: udha e mbarë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:12",
    "nodeId": "bujtina",
    "lineIndex": 12,
    "placeId": "bujtina",
    "text": "tymi i zjarrit mbush bujtinën, ndërsa gruaja bën kafe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "hearth",
        "key": "inn-hearth",
        "label": "Inn hearth",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "smoke",
        "key": "inn-hearth-smoke",
        "label": "Hearth smoke",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-coffee",
        "label": "Coffee being made",
        "zone": "near",
        "attributes": {
          "drink": "coffee"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "inn-hearth",
        "kind": "inside",
        "target": "inn-room"
      },
      {
        "subject": "inn-hearth-smoke",
        "kind": "above",
        "target": "inn-hearth"
      },
      {
        "subject": "actor:innkeeper",
        "kind": "holds",
        "target": "inn-coffee"
      }
    ],
    "disposition": "physical",
    "rationale": "Smoke from the hearth fills the inn while the innkeeper prepares the coffee."
  },
  {
    "id": "description:bujtina:13",
    "nodeId": "bujtina",
    "lineIndex": 13,
    "placeId": "bujtina",
    "text": "gruaja thotë: raki është për mik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:14",
    "nodeId": "bujtina",
    "lineIndex": 14,
    "placeId": "bujtina",
    "text": "gruaja thotë: dhoma është këtu. një natën kushton dy mijë lekë.",
    "conditions": {
      "all": [
        "flag:askedRoom"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:15",
    "nodeId": "bujtina",
    "lineIndex": 15,
    "placeId": "bujtina",
    "text": "ti thua: mirëmëngjes!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedinnkeeper:morning:mirmengjes"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:16",
    "nodeId": "bujtina",
    "lineIndex": 16,
    "placeId": "bujtina",
    "text": "ti thua: mirëdita!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedinnkeeper:day:mirdita"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:17",
    "nodeId": "bujtina",
    "lineIndex": 17,
    "placeId": "bujtina",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedinnkeeper:evening:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:18",
    "nodeId": "bujtina",
    "lineIndex": 18,
    "placeId": "bujtina",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedinnkeeper:night:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:19",
    "nodeId": "bujtina",
    "lineIndex": 19,
    "placeId": "bujtina",
    "text": "natën, kur ikën, thua: natën e mirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:20",
    "nodeId": "bujtina",
    "lineIndex": 20,
    "placeId": "bujtina",
    "text": "gruaja thotë: ju të lutem, qëndroni një moment. çfarë pije dëshironi: kafe, çaj apo ujë?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtina:21",
    "nodeId": "bujtina",
    "lineIndex": 21,
    "placeId": "bujtina",
    "text": "ti thua: kam nevojë për një dhomë sonte. sa kushton një natë?",
    "conditions": {
      "all": [
        "arrival:action:story:bujtina:ka-nevoje-per-nje-dhome-sonte-sa-kushton-nje-naten"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper converses, describes lodging and offers drinks. Offers, definitions, greetings and requests do not create chosen drinks or eight simultaneous rooms in the current view."
  },
  {
    "id": "description:bujtinariBiseda:0",
    "nodeId": "bujtinariBiseda",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "Gruaja vendos çelësat pranë zjarrit dhe të dëgjon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "hearth",
        "key": "inn-hearth",
        "label": "Inn hearth",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "key",
        "key": "inn-room-key",
        "label": "Keys set beside the fire",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "inn-room-key",
        "kind": "beside",
        "target": "inn-hearth"
      }
    ],
    "disposition": "physical",
    "rationale": "The innkeeper sets the keys beside the hearth."
  },
  {
    "id": "description:bujtinariBiseda:1",
    "nodeId": "bujtinariBiseda",
    "lineIndex": 1,
    "placeId": "bujtina",
    "text": "ajo thotë: po. ka mjaft ujë të ngrohtë pranë zjarrit.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-innkeeper:response:hotWater"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "hearth",
        "key": "inn-hearth",
        "label": "Inn hearth",
        "zone": "left",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "bucket",
        "key": "inn-warm-water",
        "label": "Warm water by the hearth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "inn-warm-water",
        "kind": "beside",
        "target": "inn-hearth"
      }
    ],
    "disposition": "mixed",
    "rationale": "The innkeeper identifies water by the hearth; warmth is source information."
  },
  {
    "id": "description:bujtinariBiseda:2",
    "nodeId": "bujtinariBiseda",
    "lineIndex": 2,
    "placeId": "bujtina",
    "text": "ajo thotë: Mëngjesi fillon fiks në orën shtatë.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-innkeeper:response:breakfast"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The breakfast schedule is spoken, not a meal currently served."
  },
  {
    "id": "description:bujtinariBiseda:3",
    "nodeId": "bujtinariBiseda",
    "lineIndex": 3,
    "placeId": "bujtina",
    "text": "Gruaja tregon derën. Ja pra. Lëreni çantën pranë derës.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-innkeeper:response:bag"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "inn-door",
        "label": "Inn door",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper points to the door and allows the bag to be left there; the instruction does not complete the player’s placement."
  },
  {
    "id": "description:bujtinariBiseda:4",
    "nodeId": "bujtinariBiseda",
    "lineIndex": 4,
    "placeId": "bujtina",
    "text": "Gruaja buzëqesh. Pa merak. Lëreni këtu; është e sigurt.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-innkeeper:response:leaveBag"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "inn-door",
        "label": "Inn door",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper points to the door and allows the bag to be left there; the instruction does not complete the player’s placement."
  },
  {
    "id": "description:gjumiBujtina:0",
    "nodeId": "gjumiBujtina",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "ti jep dy mijë lekë dhe fle në një shtrat.",
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
        "asset": "interior",
        "key": "inn-room",
        "label": "Inn interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "bed",
        "key": "inn-bed",
        "label": "Guest bed",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "money",
        "key": "inn-payment",
        "label": "Lodging payment",
        "zone": "near",
        "attributes": {
          "amount": 2000
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "inn-room"
      },
      {
        "subject": "inn-bed",
        "kind": "inside",
        "target": "inn-room"
      }
    ],
    "disposition": "physical",
    "rationale": "The paid sleep occurs in the guest bed; the player is not duplicated as another sleeper."
  },
  {
    "id": "description:gjumiBujtina:1",
    "nodeId": "gjumiBujtina",
    "lineIndex": 1,
    "placeId": "bujtina",
    "text": "gjumi vjen shpejt dhe ti fle mirë.",
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
    "rationale": "The embodied player falls asleep; no extra human mesh is created."
  },
  {
    "id": "description:gjumiBujtina:2",
    "nodeId": "gjumiBujtina",
    "lineIndex": 2,
    "placeId": "bujtina",
    "text": "tani është agim: drita vjen në dhomë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "interior",
        "key": "inn-room",
        "label": "Inn interior",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "bed",
        "key": "inn-bed",
        "label": "Guest bed",
        "zone": "right",
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
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "inn-room"
      },
      {
        "subject": "inn-bed",
        "kind": "inside",
        "target": "inn-room"
      }
    ],
    "disposition": "physical",
    "rationale": "Dawn enters the same guest room."
  },
  {
    "id": "description:gjumiBujtina:3",
    "nodeId": "gjumiBujtina",
    "lineIndex": 3,
    "placeId": "bujtina",
    "text": "gruaja bën kafe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-coffee",
        "label": "Coffee being prepared",
        "zone": "near",
        "attributes": {
          "drink": "coffee"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Innkeeper, Coffee being prepared at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:kafeja1:0",
    "nodeId": "kafeja1",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "gruaja bën një kafe e vogël.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-coffee",
        "label": "Small coffee",
        "zone": "near",
        "attributes": {
          "drink": "coffee"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Innkeeper, Small coffee at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:kafeja1:1",
    "nodeId": "kafeja1",
    "lineIndex": 1,
    "placeId": "bujtina",
    "text": "gruaja të jep kafenë dhe një gotë ujë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-coffee",
        "label": "Served coffee",
        "zone": "near",
        "attributes": {
          "drink": "coffee"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-drinking-water",
        "label": "Glass of water",
        "zone": "near",
        "attributes": {
          "drink": "water"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Innkeeper, Served coffee, Glass of water at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:kafeja1:2",
    "nodeId": "kafeja1",
    "lineIndex": 2,
    "placeId": "bujtina",
    "text": "gruaja thotë: pi ngadalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper explains drinking and fortune-telling; no foretold scene is materialized."
  },
  {
    "id": "description:kafeja1:3",
    "nodeId": "kafeja1",
    "lineIndex": 3,
    "placeId": "bujtina",
    "text": "kafe vjen përpara, pas vijnë fjalët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper explains drinking and fortune-telling; no foretold scene is materialized."
  },
  {
    "id": "description:kafeja1:4",
    "nodeId": "kafeja1",
    "lineIndex": 4,
    "placeId": "bujtina",
    "text": "unë shoh fat në kafe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper explains drinking and fortune-telling; no foretold scene is materialized."
  },
  {
    "id": "description:kafejaFund:0",
    "nodeId": "kafejaFund",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "ti pi kafenë ngadalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "cup",
        "key": "inn-coffee",
        "label": "Coffee being drunk",
        "zone": "near",
        "attributes": {
          "drink": "coffee"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Coffee being drunk at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:fallFund:0",
    "nodeId": "fallFund",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "gruaja sheh në kafenë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-coffee",
        "label": "Cup being examined",
        "zone": "near",
        "attributes": {
          "drink": "coffee"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Innkeeper, Cup being examined at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:fallFund:1",
    "nodeId": "fallFund",
    "lineIndex": 1,
    "placeId": "bujtina",
    "text": "gruaja thotë: një mik vjen për ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The arriving friend is foretold and not currently visible."
  },
  {
    "id": "description:gezuarFund:0",
    "nodeId": "gezuarFund",
    "lineIndex": 0,
    "placeId": "bujtina",
    "text": "gruaja jep raki dhe thotë: gëzuar!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "inn-raki",
        "label": "Served raki",
        "zone": "near",
        "attributes": {
          "drink": "water"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Innkeeper, Served raki at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:gezuarFund:1",
    "nodeId": "gezuarFund",
    "lineIndex": 1,
    "placeId": "bujtina",
    "text": "ajo qesh dhe thotë: po bëj shaka. po skuqesh nga raki! nejse, gëzuar prapë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:innkeeper",
        "label": "Innkeeper",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The innkeeper jokes about the player’s flushing; the first-person player is not duplicated."
  },
  {
    "id": "description:sheruesi:0",
    "nodeId": "sheruesi",
    "lineIndex": 0,
    "placeId": "sheruesi",
    "text": "shëruesi thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:1",
    "nodeId": "sheruesi",
    "lineIndex": 1,
    "placeId": "sheruesi",
    "text": "kur bie shi, shëruesi mban barin brenda.",
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
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "leaves",
        "key": "healer-herbs",
        "label": "Medicinal herbs",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "rain"
      }
    ],
    "relations": [
      {
        "subject": "healer-herbs",
        "kind": "inside",
        "target": "town-healer-house"
      }
    ],
    "disposition": "physical",
    "rationale": "During rain the healer keeps herbs inside the same house whose garden is described later in this scene. The stored herbs do not place the viewer indoors or create a separate overlapping shelter."
  },
  {
    "id": "description:sheruesi:2",
    "nodeId": "sheruesi",
    "lineIndex": 2,
    "placeId": "sheruesi",
    "text": "mirëmëngjes!",
    "conditions": {
      "all": [
        "greeting:morning"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:3",
    "nodeId": "sheruesi",
    "lineIndex": 3,
    "placeId": "sheruesi",
    "text": "mirëdita!",
    "conditions": {
      "all": [
        "greeting:day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:4",
    "nodeId": "sheruesi",
    "lineIndex": 4,
    "placeId": "sheruesi",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:evening"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:5",
    "nodeId": "sheruesi",
    "lineIndex": 5,
    "placeId": "sheruesi",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:6",
    "nodeId": "sheruesi",
    "lineIndex": 6,
    "placeId": "sheruesi",
    "text": "shëruesi pyet: a je i sëmurë? a ndien dhimbje? ku të dhemb?",
    "conditions": {
      "all": [
        "flag:askedForHelp"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:7",
    "nodeId": "sheruesi",
    "lineIndex": 7,
    "placeId": "sheruesi",
    "text": "shëruesi thotë: çdo dhimbje ka një arsye.",
    "conditions": {
      "all": [
        "flag:askedForHelp"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:8",
    "nodeId": "sheruesi",
    "lineIndex": 8,
    "placeId": "sheruesi",
    "text": "pas shtëpisë është një kopsht me bar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "house",
        "key": "town-healer-house",
        "label": "Healer’s house",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "garden",
        "key": "healer-herb-garden",
        "label": "Herb garden behind the house",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "healer-herb-garden",
        "kind": "behind",
        "target": "town-healer-house"
      }
    ],
    "disposition": "physical",
    "rationale": "The herb garden is behind the same house."
  },
  {
    "id": "description:sheruesi:9",
    "nodeId": "sheruesi",
    "lineIndex": 9,
    "placeId": "sheruesi",
    "text": "në qytet nuk ka mjek: vetëm unë dhe bar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:10",
    "nodeId": "sheruesi",
    "lineIndex": 10,
    "placeId": "sheruesi",
    "text": "unë të ndihmoj.",
    "conditions": {
      "all": [
        "flag:askedForHelp"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:11",
    "nodeId": "sheruesi",
    "lineIndex": 11,
    "placeId": "sheruesi",
    "text": "ti bëhesh mirë!",
    "conditions": {
      "all": [
        "flag:askedForHelp"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:12",
    "nodeId": "sheruesi",
    "lineIndex": 12,
    "placeId": "sheruesi",
    "text": "shëruesi thotë: u bëfsh njëqind vjeç!",
    "conditions": {
      "all": [
        "flag:askedForHelp"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:13",
    "nodeId": "sheruesi",
    "lineIndex": 13,
    "placeId": "sheruesi",
    "text": "shëruesi di shenja.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:14",
    "nodeId": "sheruesi",
    "lineIndex": 14,
    "placeId": "sheruesi",
    "text": "kur thika bie, vjen një burrë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer tells an omen about a falling knife and a visitor; neither event is enacted by the report."
  },
  {
    "id": "description:sheruesi:15",
    "nodeId": "sheruesi",
    "lineIndex": 15,
    "placeId": "sheruesi",
    "text": "ti thua: mirëmëngjes!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedhealer:morning:mirmengjes"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:16",
    "nodeId": "sheruesi",
    "lineIndex": 16,
    "placeId": "sheruesi",
    "text": "ti thua: mirëdita!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedhealer:day:mirdita"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:17",
    "nodeId": "sheruesi",
    "lineIndex": 17,
    "placeId": "sheruesi",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedhealer:evening:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:18",
    "nodeId": "sheruesi",
    "lineIndex": 18,
    "placeId": "sheruesi",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedhealer:night:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:19",
    "nodeId": "sheruesi",
    "lineIndex": 19,
    "placeId": "sheruesi",
    "text": "natën, kur ikën, thua: natën e mirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesi:20",
    "nodeId": "sheruesi",
    "lineIndex": 20,
    "placeId": "sheruesi",
    "text": "shëruesi ka një fashë të pastër.",
    "conditions": {
      "all": [
        "flag:askedForHelp"
      ],
      "negate": false,
      "none": [
        "flag:handBandaged"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bandage",
        "key": "item:bandage",
        "label": "Clean bandage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Town healer, Clean bandage at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:sheruesi:21",
    "nodeId": "sheruesi",
    "lineIndex": 21,
    "placeId": "sheruesi",
    "text": "shëruesi ta lidh dorën me një fashë.",
    "conditions": {
      "all": [
        "flag:handBandaged"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bandage",
        "key": "item:bandage",
        "label": "Clean bandage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The healer bandages the viewer’s hand; a duplicate player is not created."
  },
  {
    "id": "description:sheruesi:22",
    "nodeId": "sheruesi",
    "lineIndex": 22,
    "placeId": "sheruesi",
    "text": "ti lidh dorën me një fashë.",
    "conditions": {
      "all": [
        "arrival:action:world-item:bandage-right-hand"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bandage",
        "key": "item:bandage",
        "label": "Clean bandage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewer binds their own hand with the bandage."
  },
  {
    "id": "description:sheruesi:23",
    "nodeId": "sheruesi",
    "lineIndex": 23,
    "placeId": "sheruesi",
    "text": "ti thua: më dhemb këtu. kam nevojë për ndihmë.",
    "conditions": {
      "all": [
        "arrival:action:story:sheruesi:me_obj-dhemb-ketu-ka-nevoje-per-ndihmo"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The healer is the local speaker; greetings, symptoms, medical advice, well-wishes and player requests do not create extra actors or treatment effects."
  },
  {
    "id": "description:sheruesiBiseda:0",
    "nodeId": "sheruesiBiseda",
    "lineIndex": 0,
    "placeId": "sheruesi",
    "text": "Shëruesi lan duart dhe të dëgjon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "cup",
        "key": "healer-wash-water",
        "label": "Hand-washing water",
        "zone": "near",
        "attributes": {
          "drink": "water"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The healer washes hands before listening; water is present for that completed action."
  },
  {
    "id": "description:sheruesiBiseda:1",
    "nodeId": "sheruesiBiseda",
    "lineIndex": 1,
    "placeId": "sheruesi",
    "text": "ai thotë: Kthehu nesër në mëngjes.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-healer:response:return"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Follow-up advice and narrated beliefs do not summon witches, salt-fire rituals or a personal Ora into this room."
  },
  {
    "id": "description:sheruesiBiseda:2",
    "nodeId": "sheruesiBiseda",
    "lineIndex": 2,
    "placeId": "sheruesi",
    "text": "ai thotë: po, por bëj kujdes me dorën tënde.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-healer:response:work"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Follow-up advice and narrated beliefs do not summon witches, salt-fire rituals or a personal Ora into this room."
  },
  {
    "id": "description:sheruesiBiseda:3",
    "nodeId": "sheruesiBiseda",
    "lineIndex": 3,
    "placeId": "sheruesi",
    "text": "ai thotë: po. Mbaje fashën të pastër dhe të thatë.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-healer:response:bandage"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Follow-up advice and narrated beliefs do not summon witches, salt-fire rituals or a personal Ora into this room."
  },
  {
    "id": "description:sheruesiBiseda:4",
    "nodeId": "sheruesiBiseda",
    "lineIndex": 4,
    "placeId": "sheruesi",
    "text": "Shëruesi thotë: natën, një shtrigë ikën nga kripa që hidhet në zjarr. çdo njeri ka një Ora.",
    "conditions": {
      "all": [
        "flag:conversation:gjakova-healer:response:forestLore"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Follow-up advice and narrated beliefs do not summon witches, salt-fire rituals or a personal Ora into this room."
  },
  {
    "id": "description:kopshtiBar:0",
    "nodeId": "kopshtiBar",
    "lineIndex": 0,
    "placeId": "kopshtiBar",
    "text": "pas shtëpisë, kopshti ka bar të mirë për ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "garden",
        "key": "healer-herb-garden",
        "label": "Herb garden behind the house",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "house",
        "key": "town-healer-house",
        "label": "Healer’s house",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "leaves",
        "key": "healer-herbs",
        "label": "Medicinal herbs",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "healer-herb-garden",
        "kind": "behind",
        "target": "town-healer-house"
      }
    ],
    "disposition": "physical",
    "rationale": "Herbs grow in the garden behind the healer’s house."
  },
  {
    "id": "description:kopshtiBar:1",
    "nodeId": "kopshtiBar",
    "lineIndex": 1,
    "placeId": "kopshtiBar",
    "text": "bar kushton një mijë lekë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Medicine price and tea origin are spoken by the healer; the mountain is not moved here."
  },
  {
    "id": "description:kopshtiBar:2",
    "nodeId": "kopshtiBar",
    "lineIndex": 2,
    "placeId": "kopshtiBar",
    "text": "shëruesi thotë: çaj i mirë vjen nga mali.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Medicine price and tea origin are spoken by the healer; the mountain is not moved here."
  },
  {
    "id": "description:kopshtiBar:3",
    "nodeId": "kopshtiBar",
    "lineIndex": 3,
    "placeId": "kopshtiBar",
    "text": "natën drita e hënës bie mbi kopshtin dhe era vjen nga mali.",
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
        "asset": "garden",
        "key": "healer-herb-garden",
        "label": "Herb garden behind the house",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "moon",
        "key": "sky:moon",
        "label": "Moon over the garden",
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
    "rationale": "Moonlight reaches the garden; the mountain wind is nonvisual air movement."
  },
  {
    "id": "description:sherimiBar:0",
    "nodeId": "sherimiBar",
    "lineIndex": 0,
    "placeId": "kopshtiBar",
    "text": "ti jep një mijë lekë për ilaçin.",
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
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "money",
        "key": "medicine-payment",
        "label": "Medicine payment",
        "zone": "near",
        "attributes": {
          "amount": 1000
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "medicine",
        "key": "healer-medicine",
        "label": "Purchased medicine",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Town healer, Medicine payment, Purchased medicine at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:sherimiBar:1",
    "nodeId": "sherimiBar",
    "lineIndex": 1,
    "placeId": "kopshtiBar",
    "text": "shëruesi mbush një lugë me ilaç dhe ta jep. ai thotë: lëngu është i ngrohtë. merr vetëm një lugë; mos pi tepër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "medicine",
        "key": "healer-medicine",
        "label": "Warm medicine",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "spoon",
        "key": "healer-dose-spoon",
        "label": "One spoon of medicine",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The healer fills and gives one spoon; the spoken dose restriction does not make an extra bowl to drink."
  },
  {
    "id": "description:sherimiBar:2",
    "nodeId": "sherimiBar",
    "lineIndex": 2,
    "placeId": "kopshtiBar",
    "text": "kur dora të ha, vjen para.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Itching-hand and falling-spoon omens are reported beliefs, not a payout or arriving woman here."
  },
  {
    "id": "description:sherimiBar:3",
    "nodeId": "sherimiBar",
    "lineIndex": 3,
    "placeId": "kopshtiBar",
    "text": "kur luga bie, vjen një grua.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjakova-healer",
        "label": "Town healer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Itching-hand and falling-spoon omens are reported beliefs, not a payout or arriving woman here."
  },
  {
    "id": "description:sherimiBar:4",
    "nodeId": "sherimiBar",
    "lineIndex": 4,
    "placeId": "kopshtiBar",
    "text": "ti e merr ilaçin me lugë; prandaj bëhesh mirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spoon",
        "key": "healer-dose-spoon",
        "label": "Spoon used for the dose",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "medicine",
        "key": "healer-medicine",
        "label": "Taken medicine",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The medicine is taken using the spoon; recovery is a player-state consequence."
  },
  {
    "id": "description:besimeFund:0",
    "nodeId": "besimeFund",
    "lineIndex": 0,
    "placeId": "sheruesi",
    "text": "ti di shenjat.",
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
    "rationale": "Knowing the signs is knowledge, not geometry."
  },
  {
    "id": "description:besimeFund:1",
    "nodeId": "besimeFund",
    "lineIndex": 1,
    "placeId": "sheruesi",
    "text": "kur thika bie, një mik vjen.",
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
    "rationale": "The knife omen is a belief statement, not a knife dropping or friend arriving now."
  },
  {
    "id": "description:udhetariHuaj:0",
    "nodeId": "udhetariHuaj",
    "lineIndex": 0,
    "placeId": "udhetariHuaj",
    "text": "ti kalon sheshin dhe arrin te udhëtari.",
    "conditions": {
      "all": [
        "from:sheshi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Gjon, the traveling young man at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:udhetariHuaj:1",
    "nodeId": "udhetariHuaj",
    "lineIndex": 1,
    "placeId": "udhetariHuaj",
    "text": "udhëtari hap çantën, nxjerr një hartë dhe thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bag",
        "key": "gjon-bag",
        "label": "Gjon’s travel bag",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "paper",
        "key": "gjon-map",
        "label": "Map drawn from the opened bag",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Gjon opens the bag and draws out the map before speaking."
  },
  {
    "id": "description:udhetariHuaj:2",
    "nodeId": "udhetariHuaj",
    "lineIndex": 2,
    "placeId": "udhetariHuaj",
    "text": "Në vjeshtë, një gjethe e thatë bie në çantën e hapur.",
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
        "asset": "bag",
        "key": "gjon-bag",
        "label": "Gjon’s travel bag",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "leaf",
        "key": "gjon-fallen-leaf",
        "label": "Dry autumn leaf",
        "zone": "near",
        "attributes": {
          "color": "brown"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "gjon-fallen-leaf",
        "kind": "inside",
        "target": "gjon-bag"
      }
    ],
    "disposition": "physical",
    "rationale": "A leaf falls into the open bag."
  },
  {
    "id": "description:udhetariHuaj:3",
    "nodeId": "udhetariHuaj",
    "lineIndex": 3,
    "placeId": "udhetariHuaj",
    "text": "mirëmëngjes!",
    "conditions": {
      "all": [
        "greeting:morning"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:4",
    "nodeId": "udhetariHuaj",
    "lineIndex": 4,
    "placeId": "udhetariHuaj",
    "text": "mirëdita!",
    "conditions": {
      "all": [
        "greeting:day"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:5",
    "nodeId": "udhetariHuaj",
    "lineIndex": 5,
    "placeId": "udhetariHuaj",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:evening"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:6",
    "nodeId": "udhetariHuaj",
    "lineIndex": 6,
    "placeId": "udhetariHuaj",
    "text": "mirëmbrëma!",
    "conditions": {
      "all": [
        "greeting:night"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:7",
    "nodeId": "udhetariHuaj",
    "lineIndex": 7,
    "placeId": "udhetariHuaj",
    "text": "nuk kuptoj. flisni ngadalë dhe qartë, ju lutem. përsërite, ju lutem.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:8",
    "nodeId": "udhetariHuaj",
    "lineIndex": 8,
    "placeId": "udhetariHuaj",
    "text": "si thuhet kjo? a ka kjo fjalë një kuptim tjetër? nuk e di si ta shkruaj.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:9",
    "nodeId": "udhetariHuaj",
    "lineIndex": 9,
    "placeId": "udhetariHuaj",
    "text": "unë quhem Gjon. jam njëzet vjeç.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:10",
    "nodeId": "udhetariHuaj",
    "lineIndex": 10,
    "placeId": "udhetariHuaj",
    "text": "unë kam një familje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:11",
    "nodeId": "udhetariHuaj",
    "lineIndex": 11,
    "placeId": "udhetariHuaj",
    "text": "po shkoj larg për punë, në kurbet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:12",
    "nodeId": "udhetariHuaj",
    "lineIndex": 12,
    "placeId": "udhetariHuaj",
    "text": "shpresoj që një ditë do të kthehem.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:13",
    "nodeId": "udhetariHuaj",
    "lineIndex": 13,
    "placeId": "udhetariHuaj",
    "text": "faleminderit!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:14",
    "nodeId": "udhetariHuaj",
    "lineIndex": 14,
    "placeId": "udhetariHuaj",
    "text": "ti thua: mirëmëngjes!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtraveller:morning:mirmengjes"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:15",
    "nodeId": "udhetariHuaj",
    "lineIndex": 15,
    "placeId": "udhetariHuaj",
    "text": "ti thua: mirëdita!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtraveller:day:mirdita"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:16",
    "nodeId": "udhetariHuaj",
    "lineIndex": 16,
    "placeId": "udhetariHuaj",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtraveller:evening:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:17",
    "nodeId": "udhetariHuaj",
    "lineIndex": 17,
    "placeId": "udhetariHuaj",
    "text": "ti thua: mirëmbrëma!",
    "conditions": {
      "all": [
        "arrival:action:context-greeting:greetedtraveller:night:mirembrema"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:udhetariHuaj:18",
    "nodeId": "udhetariHuaj",
    "lineIndex": 18,
    "placeId": "udhetariHuaj",
    "text": "natën, kur ikën, thua: natën e mirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon, the traveling young man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Gjon is visibly speaking; his family, future job, distant destination and hope of return remain reported rather than additional people on the square."
  },
  {
    "id": "description:kurbetiFund:0",
    "nodeId": "kurbetiFund",
    "lineIndex": 0,
    "placeId": "udhetariHuaj",
    "text": "rruga e çon udhëtarin larg për punë, ndërsa nëna e tij pret birin e dashur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:gjon",
        "label": "Gjon departing for work",
        "zone": "far",
        "attributes": {
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "road",
        "key": "road:sea-route",
        "label": "Old road toward the sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The traveler departs on the road; his waiting mother is elsewhere and is not placed beside him."
  },
  {
    "id": "description:udhaShenja:0",
    "nodeId": "udhaShenja",
    "lineIndex": 0,
    "placeId": "sheshi",
    "text": "Te dera e vjetër, ti shikon shumë shenja mbi dru, dhe polici i qytetit ruan derën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "inscription",
        "key": "gate-wood-signs",
        "label": "Marks on the old wooden gate",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "gate-wood-signs",
        "kind": "on",
        "target": "town-old-gate"
      }
    ],
    "disposition": "physical",
    "rationale": "The physical marks are on wood at the guarded gate."
  },
  {
    "id": "description:udhaShenja:1",
    "nodeId": "udhaShenja",
    "lineIndex": 1,
    "placeId": "sheshi",
    "text": "polici thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard describes entrances, mechanisms and payment rules; pushing, pulling and buying are not enacted before choice."
  },
  {
    "id": "description:udhaShenja:2",
    "nodeId": "udhaShenja",
    "lineIndex": 2,
    "placeId": "sheshi",
    "text": "këtu është hyrje. atje është dalje.",
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
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard describes entrances, mechanisms and payment rules; pushing, pulling and buying are not enacted before choice."
  },
  {
    "id": "description:udhaShenja:3",
    "nodeId": "udhaShenja",
    "lineIndex": 3,
    "placeId": "sheshi",
    "text": "dera është mbyllur. ndalohet!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "town-old-gate",
        "property": "open",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The gate remains closed."
  },
  {
    "id": "description:udhaShenja:4",
    "nodeId": "udhaShenja",
    "lineIndex": 4,
    "placeId": "sheshi",
    "text": "për brenda, shtyj: për jashtë, tërhiq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard describes entrances, mechanisms and payment rules; pushing, pulling and buying are not enacted before choice."
  },
  {
    "id": "description:udhaShenja:5",
    "nodeId": "udhaShenja",
    "lineIndex": 5,
    "placeId": "sheshi",
    "text": "për rrugën, jep një biletë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard describes entrances, mechanisms and payment rules; pushing, pulling and buying are not enacted before choice."
  },
  {
    "id": "description:udhaShenja:6",
    "nodeId": "udhaShenja",
    "lineIndex": 6,
    "placeId": "sheshi",
    "text": "ka një mënyrë të lehtë për të kaluar. paguaj pesëqind lekë për biletën; pas kësaj, mund ta tërheqësh derën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard describes entrances, mechanisms and payment rules; pushing, pulling and buying are not enacted before choice."
  },
  {
    "id": "description:udhaShenja:7",
    "nodeId": "udhaShenja",
    "lineIndex": 7,
    "placeId": "sheshi",
    "text": "roja qëndron pranë derës të vjetër dhe thotë: paguaj biletën ose largohu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:town-gate-guard",
        "label": "Town gate guard",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "door",
        "key": "town-old-gate",
        "label": "Old wooden town gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The guard describes entrances, mechanisms and payment rules; pushing, pulling and buying are not enacted before choice."
  },
  {
    "id": "description:ura:0",
    "nodeId": "ura",
    "lineIndex": 0,
    "placeId": "ura",
    "text": "ti kalon urën mbrapa.",
    "conditions": {
      "all": [
        "from:uraFshaj"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives on the same old bridge from the named predecessor; another bridge is not invented."
  },
  {
    "id": "description:ura:1",
    "nodeId": "ura",
    "lineIndex": 1,
    "placeId": "ura",
    "text": "ti kthehesh nga Syri i kaltër nëpër rrugën e lumit dhe arrin te ura e vjetër.",
    "conditions": {
      "all": [
        "from:udhaSyri"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives on the same old bridge from the named predecessor; another bridge is not invented."
  },
  {
    "id": "description:ura:2",
    "nodeId": "ura",
    "lineIndex": 2,
    "placeId": "ura",
    "text": "ti ikën nga burimi, ecën nëpër rrugën e lumit dhe arrin te ura e vjetër.",
    "conditions": {
      "all": [
        "from:syriKanali"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives on the same old bridge from the named predecessor; another bridge is not invented."
  },
  {
    "id": "description:ura:3",
    "nodeId": "ura",
    "lineIndex": 3,
    "placeId": "ura",
    "text": "ti je në një urë.",
    "conditions": {
      "all": [
        "from:uraFshaj|udhaSyri|syriKanali"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives on the same old bridge from the named predecessor; another bridge is not invented."
  },
  {
    "id": "description:ura:4",
    "nodeId": "ura",
    "lineIndex": 4,
    "placeId": "ura",
    "text": "lumi poshtë është i thatë.",
    "conditions": {
      "all": [
        "fact:riverRestored"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "feature:fshaj-river-below",
        "label": "River below the old bridge",
        "zone": "below",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "feature:fshaj-river-below",
        "kind": "below",
        "target": "feature:fshaj-bridge"
      }
    ],
    "disposition": "physical",
    "rationale": "The river is dry below the bridge."
  },
  {
    "id": "description:ura:5",
    "nodeId": "ura",
    "lineIndex": 5,
    "placeId": "ura",
    "text": "Poshtë, uji lëviz në lumë përsëri.",
    "conditions": {
      "all": [
        "fact:riverRestored"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "feature:fshaj-river-below",
        "label": "River below the old bridge",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "feature:fshaj-river-below",
        "kind": "below",
        "target": "feature:fshaj-bridge"
      }
    ],
    "disposition": "physical",
    "rationale": "Water moves again below the same bridge."
  },
  {
    "id": "description:ura:6",
    "nodeId": "ura",
    "lineIndex": 6,
    "placeId": "ura",
    "text": "Shiu bie mbi urën e vjetër dhe bën gurët të errët.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {
          "wet": true
        },
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
    "rationale": "Rain wets and darkens the bridge stones."
  },
  {
    "id": "description:ura:7",
    "nodeId": "ura",
    "lineIndex": 7,
    "placeId": "ura",
    "text": "një plak thotë një gjëegjëzë.",
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
        "asset": "human",
        "key": "actor:bridge-riddler",
        "label": "Elder at the bridge",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The local elder asks a riddle; its objects are not established by the question."
  },
  {
    "id": "description:ura:8",
    "nodeId": "ura",
    "lineIndex": 8,
    "placeId": "ura",
    "text": "natën ura rri vetëm.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "actor:bridge-riddler",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The bridge is alone at night; the elder is absent."
  },
  {
    "id": "description:ura:9",
    "nodeId": "ura",
    "lineIndex": 9,
    "placeId": "ura",
    "text": "është natë, hëna është mbi lumin.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "feature:fshaj-river-below",
        "label": "River below the old bridge",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "moon",
        "key": "sky:moon",
        "label": "Moon above the river",
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
    "rationale": "The moon is above the river at night."
  },
  {
    "id": "description:ura:10",
    "nodeId": "ura",
    "lineIndex": 10,
    "placeId": "ura",
    "text": "është agim, një dritë bie në urën.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
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
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Dawn light reaches the bridge."
  },
  {
    "id": "description:ura:11",
    "nodeId": "ura",
    "lineIndex": 11,
    "placeId": "ura",
    "text": "është muzg: qielli bëhet i kuq mbi lumin e thatë.",
    "conditions": {
      "all": [
        "dusk"
      ],
      "negate": false,
      "none": [
        "fact:riverRestored"
      ],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "feature:fshaj-river-below",
        "label": "River below the old bridge",
        "zone": "below",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "light",
        "value": "dusk"
      },
      {
        "key": "environment",
        "property": "skyColor",
        "value": "red"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The river remains dry beneath a red dusk sky."
  },
  {
    "id": "description:ura:12",
    "nodeId": "ura",
    "lineIndex": 12,
    "placeId": "ura",
    "text": "është muzg: qielli bëhet i kuq mbi lumin, ku uji lëviz përsëri.",
    "conditions": {
      "all": [
        "dusk",
        "fact:riverRestored"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "feature:fshaj-river-below",
        "label": "River below the old bridge",
        "zone": "below",
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
      },
      {
        "key": "environment",
        "property": "skyColor",
        "value": "red"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Moving water lies below the bridge at red dusk."
  },
  {
    "id": "description:zanaProva:0",
    "nodeId": "zanaProva",
    "lineIndex": 0,
    "placeId": "zanaProva",
    "text": "ti shkon nga Zana dhe arrin te guri i madh.",
    "conditions": {
      "all": [
        "from:zana1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "rock",
        "key": "zana-trial-rock",
        "label": "Great rock",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives from the Zana at the great rock, rather than carrying the Zana into the trial."
  },
  {
    "id": "description:zanaProva:1",
    "nodeId": "zanaProva",
    "lineIndex": 1,
    "placeId": "zanaProva",
    "text": "natën është e errët dhe e ftohtë.",
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
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The night is visibly dark; cold is nonvisual source information."
  },
  {
    "id": "description:zanaProva:2",
    "nodeId": "zanaProva",
    "lineIndex": 2,
    "placeId": "zanaProva",
    "text": "në një gur të madh është një djep.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "rock",
        "key": "zana-trial-rock",
        "label": "Great rock",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "cradle",
        "key": "zana-trial-cradle",
        "label": "Cradle on the rock",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "zana-trial-cradle",
        "kind": "on",
        "target": "zana-trial-rock"
      }
    ],
    "disposition": "physical",
    "rationale": "The cradle rests on the great rock."
  },
  {
    "id": "description:zanaProva:3",
    "nodeId": "zanaProva",
    "lineIndex": 3,
    "placeId": "zanaProva",
    "text": "ti sheh një fëmijë dhe një fëmijë tjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "child",
        "key": "zana-trial-children",
        "label": "Two children",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": true
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Two children at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaProva:4",
    "nodeId": "zanaProva",
    "lineIndex": 4,
    "placeId": "zanaProva",
    "text": "fëmijët nuk flenë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "child",
        "key": "zana-trial-children",
        "label": "Two awake children",
        "zone": "near",
        "attributes": {
          "pose": "alert"
        },
        "count": 2,
        "persistence": "scene",
        "countExact": true
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same children are awake, not sleeping."
  },
  {
    "id": "description:zanaProva2:0",
    "nodeId": "zanaProva2",
    "lineIndex": 0,
    "placeId": "zanaProva",
    "text": "nata mbaroi dhe dita vjen mbi gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "rock",
        "key": "zana-trial-rock",
        "label": "Great rock",
        "zone": "near",
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
    "rationale": "Dawn replaces the night at the rock."
  },
  {
    "id": "description:zanaProva2:1",
    "nodeId": "zanaProva2",
    "lineIndex": 1,
    "placeId": "zanaProva",
    "text": "zana vjen dhe thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River Zana at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:zanaProva2:2",
    "nodeId": "zanaProva2",
    "lineIndex": 2,
    "placeId": "zanaProva",
    "text": "qumështi im bën trima. Mujo piu këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zana reports Mujo’s past drinking and offers alternative gifts; neither Mujo nor all gifts materialize here."
  },
  {
    "id": "description:zanaProva2:3",
    "nodeId": "zanaProva2",
    "lineIndex": 3,
    "placeId": "zanaProva",
    "text": "merr ar, dije ose fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Zana reports Mujo’s past drinking and offers alternative gifts; neither Mujo nor all gifts materialize here."
  },
  {
    "id": "description:zanaGold:0",
    "nodeId": "zanaGold",
    "lineIndex": 0,
    "placeId": "zanaProva",
    "text": "ti merr arin; ari vezullon në duart e tua kur shkon në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "gold",
        "key": "item:zana-gold",
        "label": "Gold held by the viewer",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Gold is acquired and glints in the viewer’s hands; the homeward direction does not add a house to the trial rock."
  },
  {
    "id": "description:zanaGold:1",
    "nodeId": "zanaGold",
    "lineIndex": 1,
    "placeId": "zanaProva",
    "text": "ti nuk je një dragua.",
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
    "rationale": "Denied heroic identity and game-end state add no physical objects."
  },
  {
    "id": "description:zanaGold:2",
    "nodeId": "zanaGold",
    "lineIndex": 2,
    "placeId": "zanaProva",
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
    "rationale": "Denied heroic identity and game-end state add no physical objects."
  },
  {
    "id": "description:zanaDije:0",
    "nodeId": "zanaDije",
    "lineIndex": 0,
    "placeId": "zanaProva",
    "text": "ti ke dije.",
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
    "rationale": "Knowledge and denied identity are nonvisual outcomes."
  },
  {
    "id": "description:zanaDije:1",
    "nodeId": "zanaDije",
    "lineIndex": 1,
    "placeId": "zanaProva",
    "text": "por ti nuk je një dragua.",
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
    "rationale": "Knowledge and denied identity are nonvisual outcomes."
  },
  {
    "id": "description:zanaFole:0",
    "nodeId": "zanaFole",
    "lineIndex": 0,
    "placeId": "zanaFole",
    "text": "ti shkon me zanën te foleja.",
    "conditions": {
      "all": [
        "from:zanaKripe"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:river-zana",
        "label": "River Zana",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "tree",
        "key": "zana-nest-tree",
        "label": "Tree bearing the nest",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "nest",
        "key": "zana-eagle-nest",
        "label": "Nest in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Zana accompanies the viewer to the nest tree."
  },
  {
    "id": "description:zanaFole:1",
    "nodeId": "zanaFole",
    "lineIndex": 1,
    "placeId": "zanaFole",
    "text": "ti sheh një pemë me një fole.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "tree",
        "key": "zana-nest-tree",
        "label": "Tree bearing the nest",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "nest",
        "key": "zana-eagle-nest",
        "label": "Nest in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "zana-eagle-nest",
        "kind": "above",
        "target": "zana-nest-tree"
      }
    ],
    "disposition": "physical",
    "rationale": "The nest belongs to this tree."
  },
  {
    "id": "description:zanaFole:2",
    "nodeId": "zanaFole",
    "lineIndex": 2,
    "placeId": "zanaFole",
    "text": "një gjarpër i zi ngjit te foleja.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "zana-nest-snake",
        "label": "Black climbing snake",
        "zone": "above",
        "attributes": {
          "color": "black"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "tree",
        "key": "zana-nest-tree",
        "label": "Tree bearing the nest",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "nest",
        "key": "zana-eagle-nest",
        "label": "Nest in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "zana-nest-snake",
        "kind": "on",
        "target": "zana-nest-tree"
      }
    ],
    "disposition": "physical",
    "rationale": "The black snake climbs toward the nest."
  },
  {
    "id": "description:zanaFole:3",
    "nodeId": "zanaFole",
    "lineIndex": 3,
    "placeId": "zanaFole",
    "text": "gjarpri do të hajë një zog!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "zana-nest-snake",
        "label": "Black climbing snake",
        "zone": "above",
        "attributes": {
          "color": "black"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bird",
        "key": "zana-eaglet",
        "label": "Eaglet in the nest",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "nest",
        "key": "zana-eagle-nest",
        "label": "Nest in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "zana-eaglet",
        "kind": "inside",
        "target": "zana-eagle-nest"
      }
    ],
    "disposition": "physical",
    "rationale": "The snake threatens the eaglet; eating has not happened."
  },
  {
    "id": "description:foleShpetuar:0",
    "nodeId": "foleShpetuar",
    "lineIndex": 0,
    "placeId": "zanaFole",
    "text": "ti vret gjarprin dhe shpëton zogun.",
    "conditions": {
      "all": [
        "from:zanaFole"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "zana-nest-snake",
        "label": "Black climbing snake",
        "zone": "above",
        "attributes": {
          "color": "black",
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bird",
        "key": "zana-eaglet",
        "label": "Eaglet in the nest",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The slain snake and living saved chick show the consequence."
  },
  {
    "id": "description:foleShpetuar:1",
    "nodeId": "foleShpetuar",
    "lineIndex": 1,
    "placeId": "zanaFole",
    "text": "shqiponja zbret nga qielli dhe thotë:",
    "conditions": {
      "all": [
        "from:zanaFole"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "eagle",
        "key": "actor:helper-eagle",
        "label": "Helping eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The eagle descends to the viewer."
  },
  {
    "id": "description:foleShpetuar:2",
    "nodeId": "foleShpetuar",
    "lineIndex": 2,
    "placeId": "zanaFole",
    "text": "unë do të ndihmoj ty përsëri.",
    "conditions": {
      "all": [
        "from:zanaFole"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "eagle",
        "key": "actor:helper-eagle",
        "label": "Helping eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The same eagle promises future help."
  },
  {
    "id": "description:foleShpetuar:3",
    "nodeId": "foleShpetuar",
    "lineIndex": 3,
    "placeId": "zanaFole",
    "text": "Shqiponja pret pranë teje.",
    "conditions": {
      "all": [
        "shqiponja"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "eagle",
        "key": "actor:helper-eagle",
        "label": "Helping eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Helping eagle at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:foleShpetuar:4",
    "nodeId": "foleShpetuar",
    "lineIndex": 4,
    "placeId": "zanaFole",
    "text": "Shqiponja pret pranë teje dhe thotë: eja poshtë me mua.",
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
        "asset": "eagle",
        "key": "actor:helper-eagle",
        "label": "Helping eagle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The waiting eagle invites a future descent; no teleport occurs in the speech."
  },
  {
    "id": "description:lumiHumbur:0",
    "nodeId": "lumiHumbur",
    "lineIndex": 0,
    "placeId": "lumiHumbur",
    "text": "ti je në lumë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewer is physically in the river."
  },
  {
    "id": "description:lumiHumbur:1",
    "nodeId": "lumiHumbur",
    "lineIndex": 1,
    "placeId": "lumiHumbur",
    "text": "natën uji është i zi dhe i ftohtë.",
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
        "asset": "river",
        "key": "river:main",
        "label": "Black night water",
        "zone": "around",
        "attributes": {
          "color": "black"
        },
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
    "rationale": "The water is dark at night; cold is source information."
  },
  {
    "id": "description:lumiHumbur:2",
    "nodeId": "lumiHumbur",
    "lineIndex": 2,
    "placeId": "lumiHumbur",
    "text": "uji vjen shpejt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water rushes toward the viewer; the static surface represents its physical channel."
  },
  {
    "id": "description:lumiHumbur:3",
    "nodeId": "lumiHumbur",
    "lineIndex": 3,
    "placeId": "lumiHumbur",
    "text": "ti nuk sheh rrugën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "river-crossroads-road",
        "property": "visible",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "No road is visible from the water."
  },
  {
    "id": "description:lumiHumbur:4",
    "nodeId": "lumiHumbur",
    "lineIndex": 4,
    "placeId": "lumiHumbur",
    "text": "Shiu godet ujin dhe fsheh rrugën.",
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
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "rain"
      },
      {
        "key": "river-crossroads-road",
        "property": "visible",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Rain strikes the water and hides the road."
  },
  {
    "id": "description:lumiHumbur:5",
    "nodeId": "lumiHumbur",
    "lineIndex": 5,
    "placeId": "lumiHumbur",
    "text": "larg është udhëkryq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "place:udhekryq",
        "label": "Distant crossroads",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Distant crossroads at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:udhaSyri:0",
    "nodeId": "udhaSyri",
    "lineIndex": 0,
    "placeId": "udhaSyri",
    "text": "lumi është i thatë këtu.",
    "conditions": {
      "all": [
        "fact:blueEyeOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River channel at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:udhaSyri:1",
    "nodeId": "udhaSyri",
    "lineIndex": 1,
    "placeId": "udhaSyri",
    "text": "një plak jep një gomar me zjarr gjarprit.",
    "conditions": {
      "all": [
        "fact:blueEyeOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:blue-eye-elder",
        "label": "Blue Eye elder",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "donkey",
        "key": "blue-eye-donkey",
        "label": "Donkey bearing fire",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "fire",
        "key": "blue-eye-bait-fire",
        "label": "Fire used with the donkey",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "snake",
        "key": "blue-eye-serpent",
        "label": "Spring-blocking serpent",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "blue-eye-bait-fire",
        "kind": "on",
        "target": "blue-eye-donkey"
      }
    ],
    "disposition": "physical",
    "rationale": "The elder gives the fire-bearing donkey to the serpent."
  },
  {
    "id": "description:udhaSyri:2",
    "nodeId": "udhaSyri",
    "lineIndex": 2,
    "placeId": "udhaSyri",
    "text": "gjarpri ha gomar dhe vdes.",
    "conditions": {
      "all": [
        "fact:blueEyeOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "blue-eye-serpent",
        "label": "Dead serpent",
        "zone": "front",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "blue-eye-donkey",
        "property": "present",
        "value": false
      },
      {
        "key": "blue-eye-bait-fire",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The serpent has consumed the fire-bearing donkey and died. The completed visible outcome removes the intact donkey and its separate carried fire; the dead serpent remains."
  },
  {
    "id": "description:udhaSyri:3",
    "nodeId": "udhaSyri",
    "lineIndex": 3,
    "placeId": "udhaSyri",
    "text": "syri i gjarprit bie dhe bëhet ujë.",
    "conditions": {
      "all": [
        "fact:blueEyeOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The fallen serpent eye transforms into water; a separate ordinary human eye is not fabricated."
  },
  {
    "id": "description:udhaSyri:4",
    "nodeId": "udhaSyri",
    "lineIndex": 4,
    "placeId": "udhaSyri",
    "text": "uji është i thellë dhe i kaltër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The water is deep blue and receives its Blue Eye name; naming adds no extra spring."
  },
  {
    "id": "description:udhaSyri:5",
    "nodeId": "udhaSyri",
    "lineIndex": 5,
    "placeId": "udhaSyri",
    "text": "njerëzit e quajnë ujin: Syri i kaltër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The water is deep blue and receives its Blue Eye name; naming adds no extra spring."
  },
  {
    "id": "description:udhaSyri:6",
    "nodeId": "udhaSyri",
    "lineIndex": 6,
    "placeId": "udhaSyri",
    "text": "kanali merr ujë nga burimi në fshat.",
    "conditions": {
      "all": [
        "fact:blueEyeChannelOpened"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "blue-eye-channel",
        "label": "Channel toward the village",
        "zone": "right",
        "attributes": {
          "width": 1,
          "length": 16,
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The channel carries spring water toward the village; village placement remains distant."
  },
  {
    "id": "description:udhaSyri:7",
    "nodeId": "udhaSyri",
    "lineIndex": 7,
    "placeId": "udhaSyri",
    "text": "Rruga e lumit shkon nga Syri i kaltër te ura e vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "blue-eye-return-road",
        "label": "Riverside road to the old bridge",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Riverside road to the old bridge at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:udhaSyri:8",
    "nodeId": "udhaSyri",
    "lineIndex": 8,
    "placeId": "udhaSyri",
    "text": "Gjethet e vjeshtës bien mbi ujin e kaltër.",
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
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "leaves",
        "key": "blue-eye-autumn-leaves",
        "label": "Leaves falling onto blue water",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "blue-eye-autumn-leaves",
        "kind": "on",
        "target": "blue-eye-spring"
      }
    ],
    "disposition": "physical",
    "rationale": "Autumn leaves fall on this spring."
  },
  {
    "id": "description:syriKanali:0",
    "nodeId": "syriKanali",
    "lineIndex": 0,
    "placeId": "udhaSyri",
    "text": "uji është i ftohtë dhe i pastër. fshati është larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "village",
        "key": "blue-eye-village",
        "label": "Distant village",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The cold clean spring remains separate from the distant village."
  },
  {
    "id": "description:syriKanali:1",
    "nodeId": "syriKanali",
    "lineIndex": 1,
    "placeId": "udhaSyri",
    "text": "një kanal i thatë fillon pranë burimit dhe shkon drejt fshatit.",
    "conditions": {
      "all": [
        "fact:blueEyeChannelOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "blue-eye-channel",
        "label": "Channel toward the village",
        "zone": "right",
        "attributes": {
          "width": 1,
          "length": 16,
          "dry": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "A dry channel starts beside the source and leads toward the village."
  },
  {
    "id": "description:syriKanali:2",
    "nodeId": "syriKanali",
    "lineIndex": 2,
    "placeId": "udhaSyri",
    "text": "një plak sheh drejt fshatit që është larg dhe të pyet: ku do të shkojë uji?",
    "conditions": {
      "all": [
        "fact:blueEyeChannelOpened"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:blue-eye-elder",
        "label": "Blue Eye elder",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "village",
        "key": "blue-eye-village",
        "label": "Distant village",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder asks where the water will go; answering has not yet opened the channel."
  },
  {
    "id": "description:syriKanali:3",
    "nodeId": "syriKanali",
    "lineIndex": 3,
    "placeId": "udhaSyri",
    "text": "kanali është i hapur. uji shkon në fshat.",
    "conditions": {
      "all": [
        "fact:blueEyeChannelOpened"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "blue-eye-channel",
        "label": "Channel toward the village",
        "zone": "right",
        "attributes": {
          "width": 1,
          "length": 16,
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The opened channel now carries water toward the village."
  },
  {
    "id": "description:syriKanali:4",
    "nodeId": "syriKanali",
    "lineIndex": 4,
    "placeId": "udhaSyri",
    "text": "mbrapa, rruga e lumit kthehet nga burimi te ura e vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "road",
        "key": "blue-eye-return-road",
        "label": "Return road to the bridge",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes Return road to the bridge at the present location; dimensions and unmeasured offsets are illustrative."
  },
  {
    "id": "description:syriFund:0",
    "nodeId": "syriFund",
    "lineIndex": 0,
    "placeId": "udhaSyri",
    "text": "Kanali i hapur merr ujin e ftohtë dhe të pastër në fshat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "spring",
        "key": "blue-eye-spring",
        "label": "Deep Blue Eye spring",
        "zone": "front",
        "attributes": {
          "color": "blue"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "blue-eye-channel",
        "label": "Channel toward the village",
        "zone": "right",
        "attributes": {
          "width": 1,
          "length": 16,
          "dry": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The opened channel carries spring water to the village."
  },
  {
    "id": "description:syriFund:1",
    "nodeId": "syriFund",
    "lineIndex": 1,
    "placeId": "udhaSyri",
    "text": "fshati ka ujë përsëri.",
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
    "rationale": "The distant village has water again; the report does not bring the village into the source basin."
  },
  {
    "id": "description:uraFshaj:0",
    "nodeId": "uraFshaj",
    "lineIndex": 0,
    "placeId": "uraFshaj",
    "text": "Fjalët në një gur e urës thonë: ura binte natën, përsëri dhe përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "inscription",
        "key": "fshaj-bridge-inscription",
        "label": "Inscription on bridge stone",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "fshaj-bridge-inscription",
        "kind": "on",
        "target": "feature:fshaj-bridge"
      }
    ],
    "disposition": "physical",
    "rationale": "Words in the stone report past nightly collapse; the current bridge is not collapsing."
  },
  {
    "id": "description:uraFshaj:1",
    "nodeId": "uraFshaj",
    "lineIndex": 1,
    "placeId": "uraFshaj",
    "text": "një nënë rri në urën, në gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "human",
        "key": "actor:fshaj-mother",
        "label": "Mother embedded in bridge stone",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:fshaj-mother",
        "kind": "inside",
        "target": "feature:fshaj-bridge"
      }
    ],
    "disposition": "physical",
    "rationale": "The mother is embedded in bridge masonry, not standing free."
  },
  {
    "id": "description:uraFshaj:2",
    "nodeId": "uraFshaj",
    "lineIndex": 2,
    "placeId": "uraFshaj",
    "text": "natën ti dëgjon nënën në gur.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The mother is heard in the stone at night; sound does not create another visible mother."
  },
  {
    "id": "description:uraFshaj:3",
    "nodeId": "uraFshaj",
    "lineIndex": 3,
    "placeId": "uraFshaj",
    "text": "është agim: një dritë e ftohtë bie mbi urën.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
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
        "value": "cold-dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Cold dawn light reaches the bridge."
  },
  {
    "id": "description:uraFshaj:4",
    "nodeId": "uraFshaj",
    "lineIndex": 4,
    "placeId": "uraFshaj",
    "text": "Shiu rrjedh mbi gurët e urës.",
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
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {
          "wet": true
        },
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
    "rationale": "Rain runs over the bridge stones."
  },
  {
    "id": "description:uraFshaj:5",
    "nodeId": "uraFshaj",
    "lineIndex": 5,
    "placeId": "uraFshaj",
    "text": "ura është e fortë: ti mund të kalosh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The stable bridge permits crossing."
  },
  {
    "id": "description:uraFshaj:6",
    "nodeId": "uraFshaj",
    "lineIndex": 6,
    "placeId": "uraFshaj",
    "text": "Lumi është poshtë urës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "river",
        "key": "feature:fshaj-river-below",
        "label": "River below the old bridge",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "feature:fshaj-river-below",
        "kind": "below",
        "target": "feature:fshaj-bridge"
      }
    ],
    "disposition": "physical",
    "rationale": "The river is physically below the bridge."
  },
  {
    "id": "description:bolla1:0",
    "nodeId": "bolla1",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "një gjarpër fle në lumë: gjarpri është një bollë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "actor:river-bolla",
        "label": "River serpent",
        "zone": "near",
        "attributes": {
          "pose": "sleeping"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "This observed beat establishes River serpent, River channel at the present location; dimensions and unmeasured offsets are illustrative. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:bolla1:1",
    "nodeId": "bolla1",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "Nata e Shëngjergjit është e shenjtë; atë natë bolla hap sytë.",
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
    "rationale": "The sacred-night rule and predatory behavior describe a conditional danger, not an eye opening or person being eaten in this beat."
  },
  {
    "id": "description:bolla1:2",
    "nodeId": "bolla1",
    "lineIndex": 2,
    "placeId": "lumi",
    "text": "kur bolla sheh një njeri, bolla ha njeriun.",
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
    "rationale": "The sacred-night rule and predatory behavior describe a conditional danger, not an eye opening or person being eaten in this beat."
  },
  {
    "id": "description:bolla1:3",
    "nodeId": "bolla1",
    "lineIndex": 3,
    "placeId": "lumi",
    "text": "një gjë e tillë jeton në lumë. kur e sheh, vrapo!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "actor:river-bolla",
        "label": "River serpent",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The serpent lives in the river; the instruction to run is advice rather than a completed escape. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:bolla1:4",
    "nodeId": "bolla1",
    "lineIndex": 4,
    "placeId": "lumi",
    "text": "nën hënë, drita dridhet mbi lumin e qetë.",
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
        "asset": "river",
        "key": "river:main",
        "label": "River channel",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "asset": "moon",
        "key": "sky:moon",
        "label": "Moon over the still river",
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
    "rationale": "Moonlight shivers across the still water. This line names the river without asserting restored water; the canonical dry or restored channel state remains authoritative."
  },
  {
    "id": "description:bolla2:0",
    "nodeId": "bolla2",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "bolla hap sytë dhe të sheh!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "actor:river-bolla",
        "label": "River serpent",
        "zone": "near",
        "attributes": {
          "pose": "alert"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same serpent opens its eyes and sees the viewer."
  },
  {
    "id": "description:bolla2:1",
    "nodeId": "bolla2",
    "lineIndex": 1,
    "placeId": "lumi",
    "text": "bolla do të bëhet një kulshedër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "actor:river-bolla",
        "label": "River serpent",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Bolla may become a Kulshedra; it has not transformed yet."
  },
  {
    "id": "description:bollaFund:0",
    "nodeId": "bollaFund",
    "lineIndex": 0,
    "placeId": "lumi",
    "text": "ti vret bollën; një kulshedër nuk vjen kurrë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "snake",
        "key": "actor:river-bolla",
        "label": "River serpent",
        "zone": "near",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The killed Bolla prevents a future dragon; no dragon appears."
  },
  {
    "id": "description:thesarLeave:0",
    "nodeId": "thesarLeave",
    "lineIndex": 0,
    "placeId": "thesarLeave",
    "text": "ti ecën larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewer walks away toward the cavern exit."
  },
  {
    "id": "description:thesarLeave:1",
    "nodeId": "thesarLeave",
    "lineIndex": 1,
    "placeId": "thesarLeave",
    "text": "ari rri në shpellë.",
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
    "rationale": "The gold remains back in the cavern; it is not carried or relocated to the departing viewer."
  },
  {
    "id": "description:thesarLeave:2",
    "nodeId": "thesarLeave",
    "lineIndex": 2,
    "placeId": "thesarLeave",
    "text": "Drita zbardh hyrjen e shpellës para teje.",
    "conditions": {
      "all": [
        "dawn"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Light whitens the cave exit ahead."
  },
  {
    "id": "description:thesarLeave:3",
    "nodeId": "thesarLeave",
    "lineIndex": 3,
    "placeId": "thesarLeave",
    "text": "Në agim, drita zbardh hyrjen e shpellës para teje.",
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
        "asset": "cave",
        "key": "feature:cave-entrance",
        "label": "Dark descending cavern",
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
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Dawn whitens the same exit."
  },
  {
    "id": "description:riddle1:0",
    "nodeId": "riddle1",
    "lineIndex": 0,
    "placeId": "ura",
    "text": "një plak rri te ura dhe thotë një gjëegjëzë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bridge-riddler",
        "label": "Elder asking the riddle",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder asks the riddle at the bridge."
  },
  {
    "id": "description:riddle1:1",
    "nodeId": "riddle1",
    "lineIndex": 1,
    "placeId": "ura",
    "text": "ka samar por nuk është gomar.",
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
    "rationale": "The saddle and donkey occur inside a riddle, not as bridge objects."
  },
  {
    "id": "description:riddleGabim:0",
    "nodeId": "riddleGabim",
    "lineIndex": 0,
    "placeId": "ura",
    "text": "ti thotë: gomari.",
    "conditions": {
      "all": [
        "arrival:action:bridge-riddle-answer-donkey"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player speaks an answer; naming a donkey or serpent does not create one."
  },
  {
    "id": "description:riddleGabim:1",
    "nodeId": "riddleGabim",
    "lineIndex": 1,
    "placeId": "ura",
    "text": "ti thotë: gjarpri.",
    "conditions": {
      "all": [
        "arrival:action:bridge-riddle-answer-serpent"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player speaks an answer; naming a donkey or serpent does not create one."
  },
  {
    "id": "description:riddleGabim:2",
    "nodeId": "riddleGabim",
    "lineIndex": 2,
    "placeId": "ura",
    "text": "Plaku tund kokën. jo. është breshka. ti je akoma te ura.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bridge-riddler",
        "label": "Elder asking the riddle",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "asset": "bridge",
        "key": "feature:fshaj-bridge",
        "label": "Old Fshaj bridge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder shakes his head and supplies the tortoise answer; a named answer is not a present tortoise."
  },
  {
    "id": "description:riddleFund:0",
    "nodeId": "riddleFund",
    "lineIndex": 0,
    "placeId": "ura",
    "text": "breshka ka samar.",
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
    "rationale": "The tortoise saddle explains the riddle, rather than establishing a living tortoise here."
  },
  {
    "id": "description:riddleFund:1",
    "nodeId": "riddleFund",
    "lineIndex": 1,
    "placeId": "ura",
    "text": "plaku është një mik.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bridge-riddler",
        "label": "Elder asking the riddle",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder becomes a friend and recites a proverb; tongues and bones are figurative, not physical props."
  },
  {
    "id": "description:riddleFund:2",
    "nodeId": "riddleFund",
    "lineIndex": 2,
    "placeId": "ura",
    "text": "plaku thotë: gjuha eshtra s'ka, eshtra thyen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "asset": "human",
        "key": "actor:bridge-riddler",
        "label": "Elder asking the riddle",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The elder becomes a friend and recites a proverb; tongues and bones are figurative, not physical props."
  }
])
