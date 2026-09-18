// Exact reviewed physical claims and nonvisual dispositions, one record per source line.
export default Object.freeze([
  {
    "id": "description:argjiroKala:0",
    "nodeId": "argjiroKala",
    "lineIndex": 0,
    "placeId": "argjiroKala",
    "text": "ti shko nëpër rrugën nga maja dhe arrin te kalaja larg.",
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
        "key": "argjiro-castle",
        "asset": "fortress",
        "label": "Argjiro’s besieged castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-road",
        "asset": "road",
        "label": "Road from the summit",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Argjiro’s besieged castle, Road from the summit; only the represented moment is staged."
  },
  {
    "id": "description:argjiroKala:1",
    "nodeId": "argjiroKala",
    "lineIndex": 1,
    "placeId": "argjiroKala",
    "text": "Në stuhi, shiu godet muret e kalasë.",
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
        "key": "argjiro-castle",
        "asset": "fortress",
        "label": "Argjiro’s besieged castle",
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
        "value": "storm"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Rain strikes the actual castle walls."
  },
  {
    "id": "description:argjiroKala:2",
    "nodeId": "argjiroKala",
    "lineIndex": 2,
    "placeId": "argjiroKala",
    "text": "ti je Argjiro.",
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
    "rationale": "Argjiro is the embodied viewpoint, not another woman facing the player."
  },
  {
    "id": "description:argjiroKala:3",
    "nodeId": "argjiroKala",
    "lineIndex": 3,
    "placeId": "argjiroKala",
    "text": "një armik i madh do kalanë.",
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
    "rationale": "The enemy’s desire to take the castle does not alone establish an enemy beside the player."
  },
  {
    "id": "description:argjiroKala:4",
    "nodeId": "argjiroKala",
    "lineIndex": 4,
    "placeId": "argjiroKala",
    "text": "një njeri hap derën. kala bie.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "argjiro-castle",
        "asset": "fortress",
        "label": "Argjiro’s besieged castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-gate",
        "asset": "gate",
        "label": "Opened castle gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "argjiro-gate",
        "property": "open",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The castle gate is open after the betrayal."
  },
  {
    "id": "description:argjiroKala:5",
    "nodeId": "argjiroKala",
    "lineIndex": 5,
    "placeId": "argjiroKala",
    "text": "një kullë rri lart. një djalë i vogël rri me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "feature:place-argjiroKala-tower",
        "asset": "tower",
        "label": "High castle tower",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-boy",
        "asset": "human",
        "label": "Argjiro’s little boy",
        "zone": "near",
        "attributes": {
          "age": "child"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes High castle tower, Argjiro’s little boy; only the represented moment is staged."
  },
  {
    "id": "description:argjiroKala:6",
    "nodeId": "argjiroKala",
    "lineIndex": 6,
    "placeId": "argjiroKala",
    "text": "ti mendon: kërcen nga kulla me djalin, ose prit armikun?",
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
    "rationale": "The possible leap and possible capture remain an unchosen decision."
  },
  {
    "id": "description:argjiroFund:0",
    "nodeId": "argjiroFund",
    "lineIndex": 0,
    "placeId": "argjiroKala",
    "text": "ti kërcen nga kulla me djalin.",
    "conditions": {
      "all": [
        "from:argjiroKala"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "feature:place-argjiroKala-tower",
        "asset": "tower",
        "label": "High castle tower",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-boy",
        "asset": "human",
        "label": "Argjiro’s little boy",
        "zone": "near",
        "attributes": {
          "age": "child"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The consequence depicts departure from the high tower with the boy; it does not create a second Argjiro."
  },
  {
    "id": "description:argjiroFund:1",
    "nodeId": "argjiroFund",
    "lineIndex": 1,
    "placeId": "argjiroKala",
    "text": "ti vdes në gur. por djali jeton.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "argjiro-rock",
        "asset": "rock",
        "label": "Rock beneath the tower",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-boy",
        "asset": "human",
        "label": "Argjiro’s little boy",
        "zone": "near",
        "attributes": {
          "age": "child"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The living child remains by the rock after the player’s death."
  },
  {
    "id": "description:argjiroFund:2",
    "nodeId": "argjiroFund",
    "lineIndex": 2,
    "placeId": "argjiroKala",
    "text": "guri jep qumësht. djali jeton.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "argjiro-rock",
        "asset": "rock",
        "label": "Milk-giving rock",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-boy",
        "asset": "human",
        "label": "Argjiro’s little boy",
        "zone": "near",
        "attributes": {
          "age": "child"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "argjiro-milk",
        "asset": "water",
        "label": "White milk emerging from stone",
        "zone": "near",
        "attributes": {
          "color": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Milk-giving rock, Argjiro’s little boy, White milk emerging from stone; only the represented moment is staged."
  },
  {
    "id": "description:argjiroFund:3",
    "nodeId": "argjiroFund",
    "lineIndex": 3,
    "placeId": "argjiroKala",
    "text": "kala quhet Gjirokastër.",
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
    "rationale": "The castle receives its name; naming adds no new structure."
  },
  {
    "id": "description:argjiroRob:0",
    "nodeId": "argjiroRob",
    "lineIndex": 0,
    "placeId": "argjiroKala",
    "text": "ti pret. armiku vjen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "argjiro-castle",
        "asset": "fortress",
        "label": "Argjiro’s besieged castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-enemy",
        "asset": "human",
        "label": "Capturing enemy",
        "zone": "near",
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
    "rationale": "The visible beat establishes Argjiro’s besieged castle, Capturing enemy; only the represented moment is staged."
  },
  {
    "id": "description:argjiroRob:1",
    "nodeId": "argjiroRob",
    "lineIndex": 1,
    "placeId": "argjiroKala",
    "text": "armiku të merr dhe kalanë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "argjiro-castle",
        "asset": "fortress",
        "label": "Argjiro’s besieged castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "argjiro-enemy",
        "asset": "human",
        "label": "Capturing enemy",
        "zone": "near",
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
    "rationale": "The visible beat establishes Argjiro’s besieged castle, Capturing enemy; only the represented moment is staged."
  },
  {
    "id": "description:argjiroRob:2",
    "nodeId": "argjiroRob",
    "lineIndex": 2,
    "placeId": "argjiroKala",
    "text": "kala nuk quhet Argjiro.",
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
    "rationale": "The absent commemorative name is a historical consequence, not a physical absence of the castle."
  },
  {
    "id": "description:binoshetLuftaFillon:0",
    "nodeId": "binoshetLuftaFillon",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "Në stuhi, era godet fushën, por trimat ecin përpara.",
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
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
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
    "rationale": "The heroes advance through the storm across this field."
  },
  {
    "id": "description:binoshetLuftaFillon:1",
    "nodeId": "binoshetLuftaFillon",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "ti vjen në mbretëri me Handa dhe trima.",
    "conditions": {
      "all": [
        "from:binoshetKuvendi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
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
    "rationale": "The visible beat establishes Ancestral battlefield, Handa, Companion heroes; only the represented moment is staged."
  },
  {
    "id": "description:binoshetLuftaFillon:2",
    "nodeId": "binoshetLuftaFillon",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "me ju vijnë pak trima. përpara ju shihni shumë armiq të fortë.",
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
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Few allies stand near the player and many enemies ahead; gaze-killing is an ability, not an invented weapon mesh."
  },
  {
    "id": "description:binoshetLuftaFillon:3",
    "nodeId": "binoshetLuftaFillon",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "mes armiqve ka trima që vrasin me sy.",
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
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Few allies stand near the player and many enemies ahead; gaze-killing is an ability, not an invented weapon mesh."
  },
  {
    "id": "description:binoshetLuftaFillon:4",
    "nodeId": "binoshetLuftaFillon",
    "lineIndex": 4,
    "placeId": "binoshetKurora",
    "text": "lufta filloi kur Handa kaloi fushën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa’s crossing begins the battle; the current battlefield retains the opposing groups."
  },
  {
    "id": "description:binoshetLuftaFillon:5",
    "nodeId": "binoshetLuftaFillon",
    "lineIndex": 5,
    "placeId": "binoshetKurora",
    "text": "tani ju hyni bashkë në luftë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Handa’s crossing begins the battle; the current battlefield retains the opposing groups."
  },
  {
    "id": "description:binoshetLuftaZgjat:0",
    "nodeId": "binoshetLuftaZgjat",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "Në dimër, një erë e ftohtë kalon fushën, kur lufta vazhdon.",
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
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:handa",
        "asset": "human",
        "label": "Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "season",
        "value": "winter"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The ongoing winter battle remains on this field."
  },
  {
    "id": "description:binoshetLuftaZgjat:1",
    "nodeId": "binoshetLuftaZgjat",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "një muaj kalon. Gjithsesi, ju vazhdoni luftën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ancestral battlefield, Enemy ranks; only the represented moment is staged."
  },
  {
    "id": "description:binoshetLuftaZgjat:2",
    "nodeId": "binoshetLuftaZgjat",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "ju shihni ende shumë armiq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-field",
        "asset": "field",
        "label": "Ancestral battlefield",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ancestral battlefield, Enemy ranks; only the represented moment is staged."
  },
  {
    "id": "description:binoshetLuftaZgjat:3",
    "nodeId": "binoshetLuftaZgjat",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "por ti, Handa dhe trimat rrini bashkë.",
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
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
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
    "rationale": "The visible beat establishes Handa, Companion heroes; only the represented moment is staged."
  },
  {
    "id": "description:binoshetLuftaZgjat:4",
    "nodeId": "binoshetLuftaZgjat",
    "lineIndex": 4,
    "placeId": "binoshetKurora",
    "text": "ti pyet Handa: edhe sa? Handa thotë: edhe dy muaj.",
    "conditions": {
      "all": [
        "arrival:action:binoshet-ask-war-duration"
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
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Handa answers the player here; the promised two months are not another visual scene."
  },
  {
    "id": "description:binoshetLuftaFund:0",
    "nodeId": "binoshetLuftaFund",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "pas disa muajsh, mbreti i huaj sheh se nuk ka shpëtim.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-king",
        "asset": "human",
        "label": "Foreign king",
        "zone": "near",
        "attributes": {
          "headwear": "crown"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The trapped king is present; his realization and lack of escape are not additional objects."
  },
  {
    "id": "description:binoshetLuftaFund:1",
    "nodeId": "binoshetLuftaFund",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "ai nuk mund të ikë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-king",
        "asset": "human",
        "label": "Foreign king",
        "zone": "near",
        "attributes": {
          "headwear": "crown"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The trapped king is present; his realization and lack of escape are not additional objects."
  },
  {
    "id": "description:binoshetLuftaFund:2",
    "nodeId": "binoshetLuftaFund",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "ai hyn në luftë, ku ka shumë gjak.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-king",
        "asset": "human",
        "label": "Foreign king",
        "zone": "near",
        "attributes": {
          "headwear": "crown"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "twins-enemies",
        "asset": "human",
        "label": "Enemy ranks",
        "zone": "far",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-blood",
        "asset": "blood",
        "label": "Blood on the battlefield",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Foreign king, Enemy ranks, Blood on the battlefield; only the represented moment is staged."
  },
  {
    "id": "description:binoshetLuftaFund:3",
    "nodeId": "binoshetLuftaFund",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "Handa rri pranë dhe ngre shpatën prej argjend.",
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
        "persistence": "scene"
      },
      {
        "key": "twins-sword",
        "asset": "sword",
        "label": "Raised silver sword",
        "zone": "near",
        "attributes": {
          "color": "silver"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Handa, Raised silver sword; only the represented moment is staged."
  },
  {
    "id": "description:binoshetKurora:0",
    "nodeId": "binoshetKurora",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "Handa vret mbretin e huaj.",
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
        "persistence": "scene"
      },
      {
        "key": "twins-king",
        "asset": "human",
        "label": "Defeated foreign king",
        "zone": "near",
        "attributes": {
          "pose": "lying"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Handa, Defeated foreign king; only the represented moment is staged."
  },
  {
    "id": "description:binoshetKurora:1",
    "nodeId": "binoshetKurora",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "trimat ia japin kurorën Handës, dhe Handa bëhet mbret.",
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
        "persistence": "scene"
      },
      {
        "key": "twins-heroes",
        "asset": "human",
        "label": "Companion heroes",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "twins-crown",
        "asset": "crown",
        "label": "Crown given to Handa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Handa, Companion heroes, Crown given to Handa; only the represented moment is staged."
  },
  {
    "id": "description:binoshetKurora:2",
    "nodeId": "binoshetKurora",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "njerëzit sjellin nënën në mbretëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-mother",
        "asset": "human",
        "label": "The twins’ mother",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "twins-people",
        "asset": "human",
        "label": "People escorting the mother",
        "zone": "front",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The twins’ mother, People escorting the mother; only the represented moment is staged."
  },
  {
    "id": "description:binoshetKurora:3",
    "nodeId": "binoshetKurora",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "Bukura vjen te Handa.",
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
        "persistence": "scene"
      },
      {
        "key": "earthly-beauty",
        "asset": "human",
        "label": "Earthly Beauty",
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
    "rationale": "The visible beat establishes Handa, Earthly Beauty; only the represented moment is staged."
  },
  {
    "id": "description:binoshetKurora:4",
    "nodeId": "binoshetKurora",
    "lineIndex": 4,
    "placeId": "binoshetKurora",
    "text": "kur sëmuresh, Handa shkon te Bardhakuqja në vendin tënd.",
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
    "rationale": "Handa’s departure to Bardhakuqja is narrated from the sick player’s kingdom; Bardhakuqja is not placed in the sickroom."
  },
  {
    "id": "description:binoshetKurora:5",
    "nodeId": "binoshetKurora",
    "lineIndex": 5,
    "placeId": "binoshetKurora",
    "text": "rruga te Bardhakuqja kalon një urë.",
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
    "rationale": "The bridge belongs to the described route to Bardhakuqja, not an observed bridge inside the kingdom scene."
  },
  {
    "id": "description:binoshetKurora:6",
    "nodeId": "binoshetKurora",
    "lineIndex": 6,
    "placeId": "binoshetKurora",
    "text": "ti pyet Handa: a do të mban shpatën? Handa thotë: po.",
    "conditions": {
      "all": [
        "arrival:action:binoshet-ask-handa-sword"
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
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Handa answers about taking the sword; this does not place Bardhakuqja at the conversation."
  },
  {
    "id": "description:binoshetShpata:0",
    "nodeId": "binoshetShpata",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "pas një vit, një muaj dhe një ditë, ti je ende sëmuret në mbretëri.",
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
    "rationale": "The player’s sickness and elapsed year do not create a second embodied hero."
  },
  {
    "id": "description:binoshetShpata:1",
    "nodeId": "binoshetShpata",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "larg, qyteti quan Handa: Zjerma.",
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
    "rationale": "The distant city’s mistaken identity and celebration happen offstage from the sick player."
  },
  {
    "id": "description:binoshetShpata:2",
    "nodeId": "binoshetShpata",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "dita shkon. qyteti qesh.",
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
    "rationale": "The distant city’s mistaken identity and celebration happen offstage from the sick player."
  },
  {
    "id": "description:binoshetShpata:3",
    "nodeId": "binoshetShpata",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "pas ditës, mbrëmja vjen.",
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
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Evening follows the day at the current location."
  },
  {
    "id": "description:binoshetNata:0",
    "nodeId": "binoshetNata",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "larg, mbrëmja vjen. Handa duhet të bjerë në shtrat me Bardhakuqja.",
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
    "rationale": "Handa, Bardhakuqja and the sword are in the distant city; the sleeping player remains in the ancestral kingdom."
  },
  {
    "id": "description:binoshetNata:1",
    "nodeId": "binoshetNata",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "Handa tregon të vërtetën. ai vendos shpatën mes vetes dhe Bardhakuqes.",
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
    "rationale": "Handa, Bardhakuqja and the sword are in the distant city; the sleeping player remains in the ancestral kingdom."
  },
  {
    "id": "description:binoshetNata:2",
    "nodeId": "binoshetNata",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "Handa fle. shpata rri mes tyre.",
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
    "rationale": "Handa, Bardhakuqja and the sword are in the distant city; the sleeping player remains in the ancestral kingdom."
  },
  {
    "id": "description:binoshetNata:3",
    "nodeId": "binoshetNata",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "ti fle në mbretëri.",
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
    "rationale": "The first-person player sleeps here; no duplicate player body is staged before the camera."
  },
  {
    "id": "description:binoshetNata:4",
    "nodeId": "binoshetNata",
    "lineIndex": 4,
    "placeId": "binoshetKurora",
    "text": "rruga nga mbretëri te Bardhakuqja kalon një urë.",
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
    "rationale": "The route description reports a bridge between the distant places, not a bridge in this sleeping scene."
  },
  {
    "id": "description:binoshetNata:5",
    "nodeId": "binoshetNata",
    "lineIndex": 5,
    "placeId": "binoshetKurora",
    "text": "mëngjesi vjen pas natën.",
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
    "rationale": "Morning follows the night."
  },
  {
    "id": "description:binoshetNata:6",
    "nodeId": "binoshetNata",
    "lineIndex": 6,
    "placeId": "binoshetKurora",
    "text": "ti pyet Handa: çfarë ndodhi? Handa thotë: shpata rri mes nesh.",
    "conditions": {
      "all": [
        "arrival:action:binoshet-ask-handa-happened"
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
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Handa reports what happened elsewhere; Bardhakuqja and the separation sword are not replayed as present here."
  },
  {
    "id": "description:binoshetTeNena:0",
    "nodeId": "binoshetTeNena",
    "lineIndex": 0,
    "placeId": "binoshetKurora",
    "text": "ti dhe Bardhakuqja shko te nëna.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-mother",
        "asset": "human",
        "label": "The twins’ mother",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "bardhakuqja",
        "asset": "human",
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
    "rationale": "The visible beat establishes The twins’ mother, Bardhakuqja; only the represented moment is staged."
  },
  {
    "id": "description:binoshetTeNena:1",
    "nodeId": "binoshetTeNena",
    "lineIndex": 1,
    "placeId": "binoshetKurora",
    "text": "nëna të pret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-mother",
        "asset": "human",
        "label": "The twins’ mother",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The twins’ mother; only the represented moment is staged."
  },
  {
    "id": "description:binoshetTeNena:2",
    "nodeId": "binoshetTeNena",
    "lineIndex": 2,
    "placeId": "binoshetKurora",
    "text": "ti dhe Bardhakuqja rri tre muaj.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "twins-mother",
        "asset": "human",
        "label": "The twins’ mother",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "bardhakuqja",
        "asset": "human",
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
    "rationale": "The visible beat establishes The twins’ mother, Bardhakuqja; only the represented moment is staged."
  },
  {
    "id": "description:binoshetTeNena:3",
    "nodeId": "binoshetTeNena",
    "lineIndex": 3,
    "placeId": "binoshetKurora",
    "text": "rruga te mbreti kalon urën.",
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
    "rationale": "The return route crosses a bridge elsewhere; the bridge is not moved into the mother’s room."
  },
  {
    "id": "description:kalaMjegull:0",
    "nodeId": "kalaMjegull",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "ti vjen në kala e Rozafa.",
    "conditions": {
      "all": [
        "from:udhaKthimit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-castle",
        "asset": "fortress",
        "label": "Rozafa castle",
        "zone": "front",
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
    "id": "description:kalaMjegull:1",
    "nodeId": "kalaMjegull",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "mjegulla bie mbi kala. era vjen dhe mjegulla shkon.",
    "conditions": {
      "all": [
        "from:udhaKthimit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-castle",
        "asset": "fortress",
        "label": "Rozafa castle",
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
        "value": "fog"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Fog lies over the castle and then clears in the wind."
  },
  {
    "id": "description:kalaMjegull:2",
    "nodeId": "kalaMjegull",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "ti je një vëlla.",
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
    "rationale": "The player embodies one builder; no duplicate player is created."
  },
  {
    "id": "description:kalaMjegull:3",
    "nodeId": "kalaMjegull",
    "lineIndex": 3,
    "placeId": "kalaMur",
    "text": "vëllezërit bëjnë një kala.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-castle",
        "asset": "fortress",
        "label": "Rozafa castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rozafa castle, Builder brothers, Castle wall; only the represented moment is staged."
  },
  {
    "id": "description:kalaMjegull:4",
    "nodeId": "kalaMjegull",
    "lineIndex": 4,
    "placeId": "kalaMur",
    "text": "nata vjen. muri bie.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "rozafa-wall",
        "property": "broken",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The failed wall lies collapsed at night and into dawn."
  },
  {
    "id": "description:kalaMjegull:5",
    "nodeId": "kalaMjegull",
    "lineIndex": 5,
    "placeId": "kalaMur",
    "text": "dielli vjen. muri është poshtë përsëri.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "rozafa-wall",
        "property": "broken",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The failed wall lies collapsed at night and into dawn."
  },
  {
    "id": "description:kalaMjegull:6",
    "nodeId": "kalaMjegull",
    "lineIndex": 6,
    "placeId": "kalaMur",
    "text": "vëllezërit vijnë në murin.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The builder brothers remain at the actual wall during their work or pause."
  },
  {
    "id": "description:kalaMjegull:7",
    "nodeId": "kalaMjegull",
    "lineIndex": 7,
    "placeId": "kalaMur",
    "text": "sot vëllezërit punojnë në murin.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The builder brothers remain at the actual wall during their work or pause."
  },
  {
    "id": "description:kalaMjegull:8",
    "nodeId": "kalaMjegull",
    "lineIndex": 8,
    "placeId": "kalaMur",
    "text": "është muzg. vëllezërit ndalojnë punën.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The builder brothers remain at the actual wall during their work or pause."
  },
  {
    "id": "description:kalaMjegull:9",
    "nodeId": "kalaMjegull",
    "lineIndex": 9,
    "placeId": "kalaMur",
    "text": "vëllezërit shohin murin me frikë.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The builder brothers remain at the actual wall during their work or pause."
  },
  {
    "id": "description:kalaMjegull:10",
    "nodeId": "kalaMjegull",
    "lineIndex": 10,
    "placeId": "kalaMur",
    "text": "natën vëllezërit janë në shtëpi.",
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
    "disposition": "reported",
    "rationale": "The brothers are at their house at night; this statement does not place them at the wall."
  },
  {
    "id": "description:kalaMjegull:11",
    "nodeId": "kalaMjegull",
    "lineIndex": 11,
    "placeId": "kalaMur",
    "text": "një plak flet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man is the visible speaker; his account of nightly collapse is not simultaneous with every daytime wall state."
  },
  {
    "id": "description:kalaMjegull:12",
    "nodeId": "kalaMjegull",
    "lineIndex": 12,
    "placeId": "kalaMur",
    "text": "Ditën punojmë e natën shembet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:mist-castle-old-man"
      ],
      "observationId": "mist-castle-old-man"
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man is the visible speaker; his account of nightly collapse is not simultaneous with every daytime wall state."
  },
  {
    "id": "description:kalaMjegull:13",
    "nodeId": "kalaMjegull",
    "lineIndex": 13,
    "placeId": "kalaMur",
    "text": "kjo kala ka një histori të gjatë.",
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
    "rationale": "The castle’s long history is reported knowledge, not additional past structures in the current view."
  },
  {
    "id": "description:kalaMjegull:14",
    "nodeId": "kalaMjegull",
    "lineIndex": 14,
    "placeId": "kalaMur",
    "text": "Ditën punojmë e natën shembet.",
    "conditions": {
      "all": [
        "observed:mist-castle-old-man",
        "arrival:action:observation:mist-castle-old-man"
      ],
      "negate": false,
      "none": [],
      "observationId": "mist-castle-old-man"
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man is the visible speaker; his account of nightly collapse is not simultaneous with every daytime wall state."
  },
  {
    "id": "description:kalaPlak:0",
    "nodeId": "kalaPlak",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "plaku thotë: muri do një grua në gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man gives the demand and oath; the demanded woman has not yet been immured."
  },
  {
    "id": "description:kalaPlak:1",
    "nodeId": "kalaPlak",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "plaku thotë: mos thuaj grua.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man gives the demand and oath; the demanded woman has not yet been immured."
  },
  {
    "id": "description:kalaPlak:2",
    "nodeId": "kalaPlak",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "Lidhni besë e lidhni fe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man gives the demand and oath; the demanded woman has not yet been immured."
  },
  {
    "id": "description:kalaBesa:0",
    "nodeId": "kalaBesa",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "ti premton besë.",
    "conditions": {
      "all": [
        "from:kalaPlak"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player’s spoken oath is an action consequence without a new object."
  },
  {
    "id": "description:kalaBesa:1",
    "nodeId": "kalaBesa",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "një rrugë shko nga mur në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-home-road",
        "asset": "road",
        "label": "Road from wall to house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road from wall to house; only the represented moment is staged."
  },
  {
    "id": "description:kalaBesa:2",
    "nodeId": "kalaBesa",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "ti pyet plakun: kush duhet të vjen? ai thotë: gruaja e parë që sjell bukë.",
    "conditions": {
      "all": [
        "arrival:action:rozafa-ask-old-man-who"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-elder",
        "asset": "human",
        "label": "Old man",
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
    "rationale": "The old man describes who must come; the first wife and bread are not yet standing in the scene."
  },
  {
    "id": "description:kalaNate:0",
    "nodeId": "kalaNate",
    "lineIndex": 0,
    "placeId": "kalaNate",
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
    "rationale": "Night falls at the house."
  },
  {
    "id": "description:kalaNate:1",
    "nodeId": "kalaNate",
    "lineIndex": 1,
    "placeId": "kalaNate",
    "text": "ti je në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-house",
        "asset": "house",
        "label": "Builders’ house",
        "zone": "center",
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
    "rationale": "The visible beat establishes Builders’ house; only the represented moment is staged."
  },
  {
    "id": "description:kalaNate:2",
    "nodeId": "kalaNate",
    "lineIndex": 2,
    "placeId": "kalaNate",
    "text": "gruaja fle.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-house",
        "asset": "house",
        "label": "Builders’ house",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-wife",
        "asset": "human",
        "label": "Sleeping wife",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "lying"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Builders’ house, Sleeping wife; only the represented moment is staged."
  },
  {
    "id": "description:kalaNate:3",
    "nodeId": "kalaNate",
    "lineIndex": 3,
    "placeId": "kalaNate",
    "text": "Besa e kalasë: mos i thuaj gruas.",
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
    "rationale": "The oath is remembered instruction, not a visible inscription unless separately authored."
  },
  {
    "id": "description:kalaMengjes:0",
    "nodeId": "kalaMengjes",
    "lineIndex": 0,
    "placeId": "kalaNate",
    "text": "ti i thua gruas: Mos shko në kala në mëngjes. Gruaja zgjohet.",
    "conditions": {
      "all": [
        "arrival:action:rozafa-warn-wife"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-house",
        "asset": "house",
        "label": "Builders’ house",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-wife",
        "asset": "human",
        "label": "Your wife",
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
    "rationale": "The player’s warning wakes the same wife."
  },
  {
    "id": "description:kalaMengjes:1",
    "nodeId": "kalaMengjes",
    "lineIndex": 1,
    "placeId": "kalaNate",
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
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The sun rises for morning."
  },
  {
    "id": "description:kalaMengjes:2",
    "nodeId": "kalaMengjes",
    "lineIndex": 2,
    "placeId": "kalaNate",
    "text": "Gruaja jote rri në shtëpi.",
    "conditions": {
      "all": [
        "flag:rozafaWifeWarned"
      ],
      "negate": false,
      "none": [
        "flag:besaMbajtur"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-house",
        "asset": "house",
        "label": "Builders’ house",
        "zone": "center",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-wife",
        "asset": "human",
        "label": "Your wife",
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
    "rationale": "The visible beat establishes Builders’ house, Your wife; only the represented moment is staged."
  },
  {
    "id": "description:kalaMengjes:3",
    "nodeId": "kalaMengjes",
    "lineIndex": 3,
    "placeId": "kalaNate",
    "text": "nëna sjell bukë në kala.",
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
    "rationale": "Bread is carried toward the distant castle; the house viewpoint does not acquire a second castle or bread carrier."
  },
  {
    "id": "description:kalaMengjes:4",
    "nodeId": "kalaMengjes",
    "lineIndex": 4,
    "placeId": "kalaNate",
    "text": "Rozafa sjell bukë.",
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
    "rationale": "Bread is carried toward the distant castle; the house viewpoint does not acquire a second castle or bread carrier."
  },
  {
    "id": "description:kalaMengjes:5",
    "nodeId": "kalaMengjes",
    "lineIndex": 5,
    "placeId": "kalaNate",
    "text": "Rruga nga shtëpia shkon në kala.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-home-road",
        "asset": "road",
        "label": "Road from house toward castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "rozafa-home-road",
        "property": "surface",
        "value": "wet"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same road leaves the house for the castle; at dawn its surface is damp."
  },
  {
    "id": "description:kalaMengjes:6",
    "nodeId": "kalaMengjes",
    "lineIndex": 6,
    "placeId": "kalaNate",
    "text": "Në agim, rruga nga shtëpia në kala është e lagësht.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "arrival:action:observation:rozafa-dawn-road"
      ],
      "observationId": "rozafa-dawn-road"
    },
    "objects": [
      {
        "key": "rozafa-home-road",
        "asset": "road",
        "label": "Road from house toward castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "rozafa-home-road",
        "property": "surface",
        "value": "wet"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same road leaves the house for the castle; at dawn its surface is damp."
  },
  {
    "id": "description:kalaMengjes:7",
    "nodeId": "kalaMengjes",
    "lineIndex": 7,
    "placeId": "kalaNate",
    "text": "ti mban besën",
    "conditions": {
      "all": [
        "arrival:action:story:kala-nate:mban-bese"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Keeping the oath is a moral consequence rather than a separate visible object."
  },
  {
    "id": "description:kalaMengjes:8",
    "nodeId": "kalaMengjes",
    "lineIndex": 8,
    "placeId": "kalaNate",
    "text": "Në agim, rruga nga shtëpia në kala është e lagësht.",
    "conditions": {
      "all": [
        "observed:rozafa-dawn-road",
        "arrival:action:observation:rozafa-dawn-road"
      ],
      "negate": false,
      "none": [],
      "observationId": "rozafa-dawn-road"
    },
    "objects": [
      {
        "key": "rozafa-home-road",
        "asset": "road",
        "label": "Road from house toward castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "rozafa-home-road",
        "property": "surface",
        "value": "wet"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same road leaves the house for the castle; at dawn its surface is damp."
  },
  {
    "id": "description:kalaNgjitje:0",
    "nodeId": "kalaNgjitje",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "Rozafa vjen në kala me bukë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-castle",
        "asset": "fortress",
        "label": "Rozafa castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "rozafa-bread",
        "asset": "bread",
        "label": "Bread brought by Rozafa",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rozafa castle, Rozafa, Bread brought by Rozafa; only the represented moment is staged."
  },
  {
    "id": "description:kalaNgjitje:1",
    "nodeId": "kalaNgjitje",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "vëllezërit thonë: muri do Rozafa.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa",
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
    "rationale": "The brothers speak before the sacrifice; their demand does not yet place Rozafa inside the wall."
  },
  {
    "id": "description:kalaNgjitje:2",
    "nodeId": "kalaNgjitje",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "Rozafa ka një fëmijë të vogël.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "rozafa-child",
        "asset": "human",
        "label": "Rozafa’s small child",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rozafa, Rozafa’s small child; only the represented moment is staged."
  },
  {
    "id": "description:kalaLutje:0",
    "nodeId": "kalaLutje",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "muri merr Rozafën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:rozafa",
        "kind": "inside",
        "target": "rozafa-wall"
      }
    ],
    "disposition": "physical",
    "rationale": "Rozafa is enclosed by masonry with the explicitly named eye, arm, leg and breast exposed."
  },
  {
    "id": "description:kalaLutje:1",
    "nodeId": "kalaLutje",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "Rozafa thotë: gji, sy, dorë dhe këmbë rrinë jashtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:rozafa",
        "kind": "inside",
        "target": "rozafa-wall"
      }
    ],
    "disposition": "physical",
    "rationale": "Rozafa is enclosed by masonry with the explicitly named eye, arm, leg and breast exposed."
  },
  {
    "id": "description:kalaLutje:2",
    "nodeId": "kalaLutje",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "sy sheh birin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "rozafa-child",
        "asset": "human",
        "label": "Rozafa’s child",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Castle wall, Rozafa in the wall, Rozafa’s child; only the represented moment is staged."
  },
  {
    "id": "description:kalaLutje:3",
    "nodeId": "kalaLutje",
    "lineIndex": 3,
    "placeId": "kalaMur",
    "text": "dorë mban birin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "rozafa-child",
        "asset": "human",
        "label": "Rozafa’s child",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Castle wall, Rozafa in the wall, Rozafa’s child; only the represented moment is staged."
  },
  {
    "id": "description:kalaLutje:4",
    "nodeId": "kalaLutje",
    "lineIndex": 4,
    "placeId": "kalaMur",
    "text": "këmbë tund djepin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "rozafa-cradle",
        "asset": "cradle",
        "label": "Child’s cradle",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Castle wall, Rozafa in the wall, Child’s cradle; only the represented moment is staged."
  },
  {
    "id": "description:kalaLutje:5",
    "nodeId": "kalaLutje",
    "lineIndex": 5,
    "placeId": "kalaMur",
    "text": "gji jep qumësht birit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "rozafa-child",
        "asset": "human",
        "label": "Nursing child",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Castle wall, Rozafa in the wall, Nursing child; only the represented moment is staged."
  },
  {
    "id": "description:kalaMur:0",
    "nodeId": "kalaMur",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "muri merr Rozafa në gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:rozafa",
        "kind": "inside",
        "target": "rozafa-wall"
      }
    ],
    "disposition": "physical",
    "rationale": "Rozafa remains enclosed in the wall."
  },
  {
    "id": "description:kalaMur:1",
    "nodeId": "kalaMur",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "sot qumësht i bardhë del nga muri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-milk",
        "asset": "milk",
        "label": "White milk running from the wall",
        "zone": "near",
        "attributes": {
          "variant": "wall-trickle",
          "color": "#f3eee3",
          "width": 0.12,
          "height": 1,
          "length": 0.035
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "rozafa-milk",
        "kind": "emitted-by",
        "target": "rozafa-wall"
      }
    ],
    "disposition": "physical",
    "rationale": "White milk emerges from the masonry as a localized surface trickle. Its small illustrative streak is attached to the wall, without a cup, basin or surrounding body of water."
  },
  {
    "id": "description:kalaMur:2",
    "nodeId": "kalaMur",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "nata vjen. muri rri lart.",
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
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
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
      },
      {
        "key": "rozafa-wall",
        "property": "broken",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The completed wall remains upright through the night."
  },
  {
    "id": "description:kalaFundBesa:0",
    "nodeId": "kalaFundBesa",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "Besa është mbajtur.",
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
    "rationale": "The kept oath and castle naming are consequences, not additional physical objects."
  },
  {
    "id": "description:kalaFundBesa:1",
    "nodeId": "kalaFundBesa",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "muri merr Rozafën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Castle wall, Rozafa in the wall; only the represented moment is staged."
  },
  {
    "id": "description:kalaFundBesa:2",
    "nodeId": "kalaFundBesa",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "muri rri lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "rozafa-wall",
        "property": "broken",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The completed wall stands."
  },
  {
    "id": "description:kalaFundBesa:3",
    "nodeId": "kalaFundBesa",
    "lineIndex": 3,
    "placeId": "kalaMur",
    "text": "kalaja ka emrin e Rozafës.",
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
    "rationale": "The kept oath and castle naming are consequences, not additional physical objects."
  },
  {
    "id": "description:kalaFundTurp:0",
    "nodeId": "kalaFundTurp",
    "lineIndex": 0,
    "placeId": "kalaMur",
    "text": "ti ikën nga muri; vëllezërit rrinë pranë Rozafës.",
    "conditions": {
      "all": [
        "from:kalaNgjitje"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player departs while the brothers and enclosed Rozafa remain at the wall."
  },
  {
    "id": "description:kalaFundTurp:1",
    "nodeId": "kalaFundTurp",
    "lineIndex": 1,
    "placeId": "kalaMur",
    "text": "ti shkon larg murit që mban Rozafën.",
    "conditions": {
      "all": [
        "from:kalaMur"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-brothers",
        "asset": "human",
        "label": "Builder brothers",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player departs while the brothers and enclosed Rozafa remain at the wall."
  },
  {
    "id": "description:kalaFundTurp:2",
    "nodeId": "kalaFundTurp",
    "lineIndex": 2,
    "placeId": "kalaMur",
    "text": "Besa është mbajtur. Rozafa është gruaja jote.",
    "conditions": {
      "all": [
        "flag:besaMbajtur"
      ],
      "negate": false,
      "none": [
        "flag:rozafaWifeWarned"
      ],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The wife identity, kept or broken oath, naming and refrain are narrative judgments, not additional geometry."
  },
  {
    "id": "description:kalaFundTurp:3",
    "nodeId": "kalaFundTurp",
    "lineIndex": 3,
    "placeId": "kalaMur",
    "text": "në agim gruaja rri te vatra.",
    "conditions": {
      "all": [
        "dawn",
        "flag:rozafaWifeWarned"
      ],
      "negate": false,
      "none": [
        "flag:besaMbajtur"
      ],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The wife at the home hearth is described from another place; she is not moved into the departure view beside the wall."
  },
  {
    "id": "description:kalaFundTurp:4",
    "nodeId": "kalaFundTurp",
    "lineIndex": 4,
    "placeId": "kalaMur",
    "text": "Gruaja jote rri te vatra në shtëpi.",
    "conditions": {
      "all": [
        "flag:rozafaWifeWarned"
      ],
      "negate": false,
      "none": [
        "dawn",
        "flag:besaMbajtur"
      ],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The wife at the home hearth is described from another place; she is not moved into the departure view beside the wall."
  },
  {
    "id": "description:kalaFundTurp:5",
    "nodeId": "kalaFundTurp",
    "lineIndex": 5,
    "placeId": "kalaMur",
    "text": "ti thyen besën.",
    "conditions": {
      "all": [
        "flag:rozafaWifeWarned"
      ],
      "negate": false,
      "none": [
        "flag:besaMbajtur"
      ],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The wife identity, kept or broken oath, naming and refrain are narrative judgments, not additional geometry."
  },
  {
    "id": "description:kalaFundTurp:6",
    "nodeId": "kalaFundTurp",
    "lineIndex": 6,
    "placeId": "kalaMur",
    "text": "muri merr Rozafën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "rozafa-wall",
        "asset": "wall",
        "label": "Castle wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:rozafa",
        "asset": "human",
        "label": "Rozafa in the wall",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "pose": "embedded",
          "exposed": [
            "eye",
            "arm",
            "leg",
            "breast"
          ]
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Castle wall, Rozafa in the wall; only the represented moment is staged."
  },
  {
    "id": "description:kalaFundTurp:7",
    "nodeId": "kalaFundTurp",
    "lineIndex": 7,
    "placeId": "kalaMur",
    "text": "kalaja ka emrin e Rozafës.",
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
    "rationale": "The wife identity, kept or broken oath, naming and refrain are narrative judgments, not additional geometry."
  },
  {
    "id": "description:kalaFundTurp:8",
    "nodeId": "kalaFundTurp",
    "lineIndex": 8,
    "placeId": "kalaMur",
    "text": "Prishi besë e prishi fe.",
    "conditions": {
      "all": [
        "flag:rozafaWifeWarned"
      ],
      "negate": false,
      "none": [
        "flag:besaMbajtur"
      ],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The wife identity, kept or broken oath, naming and refrain are narrative judgments, not additional geometry."
  },
  {
    "id": "description:shtepia:0",
    "nodeId": "shtepia",
    "lineIndex": 0,
    "placeId": "shtepia",
    "text": "ti vrave kulshedrën dhe shpëtove Bukurën.",
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
    "rationale": "The slain monster and rescued Beauty are remembered completed deeds; they are not moved into the home village."
  },
  {
    "id": "description:shtepia:1",
    "nodeId": "shtepia",
    "lineIndex": 1,
    "placeId": "shtepia",
    "text": "ti u ktheve në fshat, dhe fshati ka ujë tani.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "home-village",
        "asset": "village",
        "label": "Restored village",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "home-well",
        "asset": "well",
        "label": "Village well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "home-well",
        "property": "water",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Water has returned to the home village."
  },
  {
    "id": "description:shtepia:2",
    "nodeId": "shtepia",
    "lineIndex": 2,
    "placeId": "shtepia",
    "text": "Pranë pusit, një lule lulëzon tani.",
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
        "key": "home-well",
        "asset": "well",
        "label": "Village well",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "home-flower",
        "asset": "flowers",
        "label": "Flower beside the well",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "home-flower",
        "kind": "beside",
        "target": "home-well"
      }
    ],
    "disposition": "physical",
    "rationale": "A flower blooms beside the existing well."
  },
  {
    "id": "description:shtepia:3",
    "nodeId": "shtepia",
    "lineIndex": 3,
    "placeId": "shtepia",
    "text": "Njerëzit thonë: të lumtë krahu!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "home-people",
        "asset": "human",
        "label": "Grateful villagers",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The people are present and call out their blessing."
  },
  {
    "id": "description:udhaKthimit:0",
    "nodeId": "udhaKthimit",
    "lineIndex": 0,
    "placeId": "udhaKthimit",
    "text": "ti ecën në një rrugë drejt një kalaje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "homeward-road",
        "asset": "road",
        "label": "Road toward the castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "rozafa-distant",
        "asset": "fortress",
        "label": "Distant castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road toward the castle, Distant castle; only the represented moment is staged."
  },
  {
    "id": "description:udhaKthimit:1",
    "nodeId": "udhaKthimit",
    "lineIndex": 1,
    "placeId": "udhaKthimit",
    "text": "mbrapa, rruga kthehet në fshat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "homeward-road-back",
        "asset": "road",
        "label": "Road returning to the village",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road returning to the village; only the represented moment is staged."
  },
  {
    "id": "description:udhaKthimit:2",
    "nodeId": "udhaKthimit",
    "lineIndex": 2,
    "placeId": "udhaKthimit",
    "text": "pranë rrugës, uji lëviz nëpër botë përsëri.",
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
        "key": "homeward-road",
        "asset": "road",
        "label": "Road toward the castle",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "homeward-water",
        "asset": "river",
        "label": "Water beside the road",
        "zone": "right",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road toward the castle, Water beside the road; only the represented moment is staged."
  },
  {
    "id": "description:udhaKthimit:3",
    "nodeId": "udhaKthimit",
    "lineIndex": 3,
    "placeId": "udhaKthimit",
    "text": "natën kalaja është vetëm një hije e madhe.",
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
        "key": "rozafa-distant",
        "asset": "fortress",
        "label": "Castle silhouette",
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
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The castle is a dark silhouette at night."
  },
  {
    "id": "description:udhaKthimit:4",
    "nodeId": "udhaKthimit",
    "lineIndex": 4,
    "placeId": "udhaKthimit",
    "text": "është agim: një mjegull e bardhë rri mbi kalanë.",
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
        "label": "Distant castle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "fog"
      },
      {
        "key": "environment",
        "property": "light",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "White dawn fog hangs over the actual castle."
  },
  {
    "id": "description:udhaKthimit:5",
    "nodeId": "udhaKthimit",
    "lineIndex": 5,
    "placeId": "udhaKthimit",
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
        "label": "Distant castle",
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
    "rationale": "The dusk sky glows red above the castle."
  },
  {
    "id": "description:shqipe1:0",
    "nodeId": "shqipe1",
    "lineIndex": 0,
    "placeId": "shqipe1",
    "text": "lart, në një pemë të madhe, rri një fole.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-tree",
        "asset": "tree",
        "label": "Large eagle tree",
        "zone": "front",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "eagle-nest",
        "kind": "above",
        "target": "eagle-tree"
      }
    ],
    "disposition": "physical",
    "rationale": "The nest is high in the tree."
  },
  {
    "id": "description:shqipe1:1",
    "nodeId": "shqipe1",
    "lineIndex": 1,
    "placeId": "shqipe1",
    "text": "një shqiponjë vjen me një gjarpër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mother-eagle",
        "asset": "eagle",
        "label": "Mother eagle",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Snake in the nest",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The eagle arrives carrying the snake."
  },
  {
    "id": "description:shqipe1:2",
    "nodeId": "shqipe1",
    "lineIndex": 2,
    "placeId": "shqipe1",
    "text": "shqiponja hedh gjarprin në fole dhe fluturon larg.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Snake in the nest",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "mother-eagle",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [
      {
        "subject": "nest-snake",
        "kind": "inside",
        "target": "eagle-nest"
      }
    ],
    "disposition": "physical",
    "rationale": "The eagle has flown away after dropping the snake in the nest."
  },
  {
    "id": "description:shqipe1:3",
    "nodeId": "shqipe1",
    "lineIndex": 3,
    "placeId": "shqipe1",
    "text": "zogu rri këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Eaglet; only the represented moment is staged."
  },
  {
    "id": "description:shqipe1:4",
    "nodeId": "shqipe1",
    "lineIndex": 4,
    "placeId": "shqipe1",
    "text": "gjarpri fle.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Snake in the nest",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "nest-snake",
        "property": "pose",
        "value": "sleeping"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The snake is asleep, not dead."
  },
  {
    "id": "description:shqipe1:5",
    "nodeId": "shqipe1",
    "lineIndex": 5,
    "placeId": "shqipe1",
    "text": "Fjalët në pemë thonë: shqiponja bën një mbret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-tree",
        "asset": "tree",
        "label": "Large eagle tree",
        "zone": "front",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-inscription",
        "asset": "inscription",
        "label": "Words carved into the tree",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "eagle-inscription",
        "kind": "on",
        "target": "eagle-tree"
      }
    ],
    "disposition": "physical",
    "rationale": "The visible inscription reports the eagle’s king-making power."
  },
  {
    "id": "description:shqipe1:6",
    "nodeId": "shqipe1",
    "lineIndex": 6,
    "placeId": "shqipe1",
    "text": "Shiu bie mbi gjethet, por foleja rri e thatë.",
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
        "key": "eagle-tree",
        "asset": "tree",
        "label": "Large eagle tree",
        "zone": "front",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
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
      },
      {
        "key": "eagle-nest",
        "property": "surface",
        "value": "dry"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Rain falls on the canopy while the nest stays dry."
  },
  {
    "id": "description:shqipe1:7",
    "nodeId": "shqipe1",
    "lineIndex": 7,
    "placeId": "shqipe1",
    "text": "larg, rruga shkon drejt udhëkryqit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-road",
        "asset": "road",
        "label": "Distant road toward crossroads",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Distant road toward crossroads; only the represented moment is staged."
  },
  {
    "id": "description:shqipe2:0",
    "nodeId": "shqipe2",
    "lineIndex": 0,
    "placeId": "shqipe2",
    "text": "ti ngjitesh në folenë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-tree",
        "asset": "tree",
        "label": "Large eagle tree",
        "zone": "front",
        "attributes": {
          "size": "large"
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player reaches the nest; this node has the canonical climbed location."
  },
  {
    "id": "description:shqipe2:1",
    "nodeId": "shqipe2",
    "lineIndex": 1,
    "placeId": "shqipe2",
    "text": "por gjarpri nuk është i vdekur!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Snake in the nest",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "nest-snake",
        "property": "pose",
        "value": "alert"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The live snake wakes and threatens the eaglet; the potential eating is not shown as completed."
  },
  {
    "id": "description:shqipe2:2",
    "nodeId": "shqipe2",
    "lineIndex": 2,
    "placeId": "shqipe2",
    "text": "gjarpri zgjohet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Snake in the nest",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "nest-snake",
        "property": "pose",
        "value": "alert"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The live snake wakes and threatens the eaglet; the potential eating is not shown as completed."
  },
  {
    "id": "description:shqipe2:3",
    "nodeId": "shqipe2",
    "lineIndex": 3,
    "placeId": "shqipe2",
    "text": "gjarpri do të hajë zogun!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Snake in the nest",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "nest-snake",
        "property": "pose",
        "value": "alert"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The live snake wakes and threatens the eaglet; the potential eating is not shown as completed."
  },
  {
    "id": "description:shqipe2:4",
    "nodeId": "shqipe2",
    "lineIndex": 4,
    "placeId": "shqipe2",
    "text": "Foleja lëkundet nën këmbët e tua.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "eagle-nest",
        "kind": "below",
        "target": "viewer"
      }
    ],
    "disposition": "physical",
    "rationale": "The nest is physically beneath the player’s feet; swaying is an observed motion."
  },
  {
    "id": "description:shqipe2:5",
    "nodeId": "shqipe2",
    "lineIndex": 5,
    "placeId": "shqipe2",
    "text": "Poshtë folesë, rruga e gjatë shkon te udhëkryqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-road",
        "asset": "road",
        "label": "Road below the nest",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "eagle-road",
        "kind": "below",
        "target": "eagle-nest"
      }
    ],
    "disposition": "physical",
    "rationale": "The road lies below the elevated nest."
  },
  {
    "id": "description:shqipe3:0",
    "nodeId": "shqipe3",
    "lineIndex": 0,
    "placeId": "shqipe2",
    "text": "ti vret gjarprin dhe shpëton zogun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "nest-snake",
        "asset": "snake",
        "label": "Slain snake",
        "zone": "near",
        "attributes": {
          "pose": "dead"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Slain snake, Eaglet; only the represented moment is staged."
  },
  {
    "id": "description:shqipe3:1",
    "nodeId": "shqipe3",
    "lineIndex": 1,
    "placeId": "shqipe2",
    "text": "zogu është këtu me ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Eaglet; only the represented moment is staged."
  },
  {
    "id": "description:shqipeBarter:0",
    "nodeId": "shqipeBarter",
    "lineIndex": 0,
    "placeId": "shqipe2",
    "text": "ti merr zogun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The taken chick is held near the first-person player."
  },
  {
    "id": "description:shqipeBarter:1",
    "nodeId": "shqipeBarter",
    "lineIndex": 1,
    "placeId": "shqipe2",
    "text": "shqiponja vjen mbi folenë: hija e saj bie mbi ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mother-eagle",
        "asset": "eagle",
        "label": "Mother eagle",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-nest",
        "asset": "nest",
        "label": "Nest high in the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "mother-eagle",
        "kind": "above",
        "target": "eagle-nest"
      }
    ],
    "disposition": "physical",
    "rationale": "The mother eagle comes above the nest and casts a shadow."
  },
  {
    "id": "description:shqipeBarter:2",
    "nodeId": "shqipeBarter",
    "lineIndex": 2,
    "placeId": "shqipe2",
    "text": "shqiponja thotë: pse merr zogun?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mother-eagle",
        "asset": "eagle",
        "label": "Mother eagle",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible mother eagle asks for the chick; promised strength and identity are not material gifts already received."
  },
  {
    "id": "description:shqipeBarter:3",
    "nodeId": "shqipeBarter",
    "lineIndex": 3,
    "placeId": "shqipe2",
    "text": "shqiponja thotë: jep zogun. ti merr sy, fuqi dhe emrin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mother-eagle",
        "asset": "eagle",
        "label": "Mother eagle",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible mother eagle asks for the chick; promised strength and identity are not material gifts already received."
  },
  {
    "id": "description:shqipeFund:0",
    "nodeId": "shqipeFund",
    "lineIndex": 0,
    "placeId": "shqipe2",
    "text": "ti jep zogun. shqiponja të jep sy dhe fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mother-eagle",
        "asset": "eagle",
        "label": "Mother eagle",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The chick is returned to its mother; the granted strength is not a separate object."
  },
  {
    "id": "description:shqipeFund:1",
    "nodeId": "shqipeFund",
    "lineIndex": 1,
    "placeId": "shqipe2",
    "text": "zogu fluturon mbi ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet overhead",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Eaglet overhead; only the represented moment is staged."
  },
  {
    "id": "description:shqipeFund:2",
    "nodeId": "shqipeFund",
    "lineIndex": 2,
    "placeId": "shqipe2",
    "text": "ti je mbret. ti merr emrin e shqiponjës.",
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
    "rationale": "Kingship, the eagle-name and symbolic sonship are earned identities; they do not add an unmentioned crown or another player body."
  },
  {
    "id": "description:shqipeFund:3",
    "nodeId": "shqipeFund",
    "lineIndex": 3,
    "placeId": "shqipe2",
    "text": "ti je biri i shqiponjës.",
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
    "rationale": "Kingship, the eagle-name and symbolic sonship are earned identities; they do not add an unmentioned crown or another player body."
  },
  {
    "id": "description:shqipeKapur:0",
    "nodeId": "shqipeKapur",
    "lineIndex": 0,
    "placeId": "shqipe2",
    "text": "ti mban zogun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-chick",
        "asset": "bird",
        "label": "Eaglet",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Eaglet; only the represented moment is staged."
  },
  {
    "id": "description:shqipeKapur:1",
    "nodeId": "shqipeKapur",
    "lineIndex": 1,
    "placeId": "shqipe2",
    "text": "shqiponja fluturon larg. ti nuk merr emrin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mother-eagle",
        "asset": "eagle",
        "label": "Departing eagle",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mother flies away; the unearned name is not an object."
  },
  {
    "id": "description:shqipeKapur:2",
    "nodeId": "shqipeKapur",
    "lineIndex": 2,
    "placeId": "shqipe2",
    "text": "ti je një burrë. ti nuk je biri i shqiponjës.",
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
    "rationale": "The denied symbolic kinship is narrative identity, not a physical transformation."
  }
])
