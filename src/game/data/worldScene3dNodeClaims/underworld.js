// Exact reviewed physical claims and nonvisual dispositions, one record per source line.
export default Object.freeze([
  {
    "id": "description:pusi:0",
    "nodeId": "pusi",
    "lineIndex": 0,
    "placeId": "pusi",
    "text": "ti kthehesh nga rruga e shpellës te pusi.",
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
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "deep-well",
        "asset": "well",
        "label": "Deep well",
        "zone": "front",
        "attributes": {
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road through the lower world, Deep well; only the represented moment is staged."
  },
  {
    "id": "description:pusi:1",
    "nodeId": "pusi",
    "lineIndex": 1,
    "placeId": "pusi",
    "text": "ti ikën nga mbreti dhe kthehesh gjatë rrugës e shpellës te pusi.",
    "conditions": {
      "all": [
        "from:sari2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "deep-well",
        "asset": "well",
        "label": "Deep well",
        "zone": "front",
        "attributes": {
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road through the lower world, Deep well; only the represented moment is staged."
  },
  {
    "id": "description:pusi:2",
    "nodeId": "pusi",
    "lineIndex": 2,
    "placeId": "pusi",
    "text": "një pus i madh shkon poshtë në një botë të errët, dhe nga pusi vjen frymë e ftohtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-well",
        "asset": "well",
        "label": "Deep well",
        "zone": "front",
        "attributes": {
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "temperature",
        "value": "cold"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The shaft descends; cold breath is nonvisual."
  },
  {
    "id": "description:pusi:3",
    "nodeId": "pusi",
    "lineIndex": 3,
    "placeId": "pusi",
    "text": "larg rri një dervish i qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:dervish",
        "asset": "human",
        "label": "Dervish",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Dervish; only the represented moment is staged."
  },
  {
    "id": "description:pusi:4",
    "nodeId": "pusi",
    "lineIndex": 4,
    "placeId": "pusi",
    "text": "dervishi thotë: rruga për në Krujë është e sigurt tani.",
    "conditions": {
      "all": [
        "fact:krujeKulshedraDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:dervish",
        "asset": "human",
        "label": "Dervish",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The dervish speaks; his directions and proposed trip are not simultaneous scenery."
  },
  {
    "id": "description:pusi:5",
    "nodeId": "pusi",
    "lineIndex": 5,
    "placeId": "pusi",
    "text": "Dervishi thotë: eja me mua te shpella.",
    "conditions": {
      "all": [
        "fact:krujeKulshedraDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:dervish",
        "asset": "human",
        "label": "Dervish",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The dervish speaks; his directions and proposed trip are not simultaneous scenery."
  },
  {
    "id": "description:bota1:0",
    "nodeId": "bota1",
    "lineIndex": 0,
    "placeId": "bota1",
    "text": "bota e poshtë është e errët, dhe ti sheh një derë të madhe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
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
        "value": "dark"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Great door in the dark lower world."
  },
  {
    "id": "description:bota1:1",
    "nodeId": "bota1",
    "lineIndex": 1,
    "placeId": "bota1",
    "text": "toka është e lagësht dhe e ftohtë nën këmbët e tua.",
    "conditions": {
      "all": [
        "again"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "ground",
        "value": "wet"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Damp ground and cold air are local environmental properties."
  },
  {
    "id": "description:bota1:2",
    "nodeId": "bota1",
    "lineIndex": 2,
    "placeId": "bota1",
    "text": "një zë thotë: Bukura e Dheut rri këtu poshtë.",
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
    "rationale": "An audible, unseen speaker locates the Beauty farther below; she is not visible here."
  },
  {
    "id": "description:bota2:0",
    "nodeId": "bota2",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "ti je në një shpellë të madhe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-cave",
        "asset": "cave",
        "label": "Cave",
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
    "rationale": "The source explicitly places the player inside a large cave; its enclosing rock remains the same-place setting."
  },
  {
    "id": "description:bota2:1",
    "nodeId": "bota2",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "në një gur rri mish dhe ujë i ftohtë.",
    "conditions": {
      "all": [
        "mish"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "food-rock",
        "asset": "rock",
        "label": "Rock with food",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "cave-meat",
        "asset": "meat",
        "label": "Meat",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "cave-water",
        "asset": "water",
        "label": "Cold water",
        "zone": "front",
        "attributes": {
          "width": 0.7,
          "length": 0.6
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "cave-meat",
        "kind": "on",
        "target": "food-rock"
      },
      {
        "subject": "cave-water",
        "kind": "on",
        "target": "food-rock"
      }
    ],
    "disposition": "physical",
    "rationale": "Food and water rest on the rock."
  },
  {
    "id": "description:bota2:2",
    "nodeId": "bota2",
    "lineIndex": 2,
    "placeId": "bota2",
    "text": "zëri yt kthehet nga guri.",
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
    "rationale": "The player hears an echo from the already modeled rock."
  },
  {
    "id": "description:bota2:3",
    "nodeId": "bota2",
    "lineIndex": 3,
    "placeId": "bota2",
    "text": "larg në errësirë lëviz një gjarpër i madh.",
    "conditions": {
      "all": [
        "flag:underworldSerpentDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {
          "large": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Serpent is seen moving in the distant darkness."
  },
  {
    "id": "description:porta1:0",
    "nodeId": "porta1",
    "lineIndex": 0,
    "placeId": "porta1",
    "text": "këtu është një derë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guarded door; only the represented moment is staged."
  },
  {
    "id": "description:porta1:1",
    "nodeId": "porta1",
    "lineIndex": 1,
    "placeId": "porta1",
    "text": "dera kërcet, por luani dhe qengji nuk lëvizin.",
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
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "gate-lamb",
        "asset": "sheep",
        "label": "Lamb",
        "zone": "front",
        "attributes": {
          "young": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guarded door, Lion, Lamb; only the represented moment is staged."
  },
  {
    "id": "description:porta1:2",
    "nodeId": "porta1",
    "lineIndex": 2,
    "placeId": "porta1",
    "text": "një luan dhe një qengj ruajnë derën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "gate-lamb",
        "asset": "sheep",
        "label": "Lamb",
        "zone": "front",
        "attributes": {
          "young": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guarded door, Lion, Lamb; only the represented moment is staged."
  },
  {
    "id": "description:porta1:3",
    "nodeId": "porta1",
    "lineIndex": 3,
    "placeId": "porta1",
    "text": "afër tyre rri mish dhe sanë; kashtë e thatë mbulon tokën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "lion-meat",
        "asset": "meat",
        "label": "Meat",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "lamb-hay",
        "asset": "hay",
        "label": "Hay",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "gate-straw",
        "asset": "straw",
        "label": "Dry straw",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Meat, Hay, Dry straw; only the represented moment is staged."
  },
  {
    "id": "description:porta1:4",
    "nodeId": "porta1",
    "lineIndex": 4,
    "placeId": "porta1",
    "text": "luani dhe qengji janë të uritur dhe të shohin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "gate-lamb",
        "asset": "sheep",
        "label": "Lamb",
        "zone": "front",
        "attributes": {
          "young": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guarded door, Lion, Lamb; only the represented moment is staged."
  },
  {
    "id": "description:porta1:5",
    "nodeId": "porta1",
    "lineIndex": 5,
    "placeId": "porta1",
    "text": "Kafshët ha, lëvizin nga dera, dhe dera hapet.",
    "conditions": {
      "all": [
        "flag:underworldGateFed"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "gate-lamb",
        "asset": "sheep",
        "label": "Lamb",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "guarded-door",
        "property": "open",
        "value": true
      }
    ],
    "relations": [
      {
        "subject": "gate-lion",
        "kind": "left",
        "target": "guarded-door"
      },
      {
        "subject": "gate-lamb",
        "kind": "right",
        "target": "guarded-door"
      }
    ],
    "disposition": "physical",
    "rationale": "Fed animals move aside and the door opens."
  },
  {
    "id": "description:porta1:6",
    "nodeId": "porta1",
    "lineIndex": 6,
    "placeId": "porta1",
    "text": "ti jep mish luanit",
    "conditions": {
      "all": [
        "arrival:action:story:porta1:jep-mish-luan_noun"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "lion-meat",
        "asset": "meat",
        "label": "Meat",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Lion, Meat; only the represented moment is staged."
  },
  {
    "id": "description:porta1:7",
    "nodeId": "porta1",
    "lineIndex": 7,
    "placeId": "porta1",
    "text": "ti jep sanë qengjit",
    "conditions": {
      "all": [
        "arrival:action:story:porta1:jep-sane-qengj"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gate-lamb",
        "asset": "sheep",
        "label": "Lamb",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "lamb-hay",
        "asset": "hay",
        "label": "Hay",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Lamb, Hay; only the represented moment is staged."
  },
  {
    "id": "description:portaVdes:0",
    "nodeId": "portaVdes",
    "lineIndex": 0,
    "placeId": "porta1",
    "text": "luani është i uritur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Lion; only the represented moment is staged."
  },
  {
    "id": "description:portaVdes:1",
    "nodeId": "portaVdes",
    "lineIndex": 1,
    "placeId": "porta1",
    "text": "luani të ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gate-lion",
        "asset": "lion",
        "label": "Lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Lion; only the represented moment is staged."
  },
  {
    "id": "description:portaVdes:2",
    "nodeId": "portaVdes",
    "lineIndex": 2,
    "placeId": "porta1",
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
    "rationale": "Run ending is nonvisual."
  },
  {
    "id": "description:bukura1:0",
    "nodeId": "bukura1",
    "lineIndex": 0,
    "placeId": "bukura1",
    "text": "ti kalo nëpër derën dhe sheh Bukurën; kulshedra e mban këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guarded door, Beauty of the Earth; only the represented moment is staged."
  },
  {
    "id": "description:bukura1:1",
    "nodeId": "bukura1",
    "lineIndex": 1,
    "placeId": "bukura1",
    "text": "këtu ka pak dritë, por Bukura të sheh pa frikë.",
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
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
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
        "value": "dim"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Beauty is visible in dim light."
  },
  {
    "id": "description:bukura1:2",
    "nodeId": "bukura1",
    "lineIndex": 2,
    "placeId": "bukura1",
    "text": "Bukura thotë: prit, merr bekim. kush merr shpejt, merr gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty offers advice; the hypothetical stone is not present."
  },
  {
    "id": "description:bukura1:3",
    "nodeId": "bukura1",
    "lineIndex": 3,
    "placeId": "bukura1",
    "text": "Natën, drita e hënës hyn nga dera.",
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
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "door-moonlight",
        "asset": "light-ray",
        "label": "Moonlight through door",
        "zone": "front",
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
    "rationale": "Moonlight enters through the opening."
  },
  {
    "id": "description:bukura2:0",
    "nodeId": "bukura2",
    "lineIndex": 0,
    "placeId": "bukura1",
    "text": "Bukura thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:bukura2:1",
    "nodeId": "bukura2",
    "lineIndex": 1,
    "placeId": "bukura1",
    "text": "kulshedra vjen!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:bukura2:2",
    "nodeId": "bukura2",
    "lineIndex": 2,
    "placeId": "bukura1",
    "text": "ti linde me këmishë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:bukura2:3",
    "nodeId": "bukura2",
    "lineIndex": 3,
    "placeId": "bukura1",
    "text": "ti je një dragua.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:bukura2:4",
    "nodeId": "bukura2",
    "lineIndex": 4,
    "placeId": "bukura1",
    "text": "një dragua lufton me gurë rrufe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:bukura2:5",
    "nodeId": "bukura2",
    "lineIndex": 5,
    "placeId": "bukura1",
    "text": "vetëm një dragua vret kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:bukura2:6",
    "nodeId": "bukura2",
    "lineIndex": 6,
    "placeId": "bukura1",
    "text": "nga ky njeri nuk kam shpëtim unë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty speaks about the coming threat and the player’s nature; references are not additional nearby figures or stones."
  },
  {
    "id": "description:kulshedra1:0",
    "nodeId": "kulshedra1",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "ti ikën nga Bukura dhe arrin te Kulshedra.",
    "conditions": {
      "all": [
        "from:bukura2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshedra1:1",
    "nodeId": "kulshedra1",
    "lineIndex": 1,
    "placeId": "kulshedra1",
    "text": "kulshedra ka shumë koka.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshedra1:2",
    "nodeId": "kulshedra1",
    "lineIndex": 2,
    "placeId": "kulshedra1",
    "text": "toka lëkundet kur Kulshedra lëviz.",
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
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Her movement shakes the ground; vibration is temporal. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshedra1:3",
    "nodeId": "kulshedra1",
    "lineIndex": 3,
    "placeId": "kulshedra1",
    "text": "nga goja e saj del zjarr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "fire": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshedra1:4",
    "nodeId": "kulshedra1",
    "lineIndex": 4,
    "placeId": "kulshedra1",
    "text": "flokët e saj janë të kuq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "hairColor": "red",
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshedra1:5",
    "nodeId": "kulshedra1",
    "lineIndex": 5,
    "placeId": "kulshedra1",
    "text": "fshati jep një vajzë kulshedrës.",
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
    "rationale": "The village’s tribute practice is reported; no sacrificed girl is asserted to be standing in this scene."
  },
  {
    "id": "description:fitorja:0",
    "nodeId": "fitorja",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "ti pret kokë me zjarr.",
    "conditions": {
      "all": [
        "from:kulshLufte2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 4,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "severing-fire",
        "asset": "fire",
        "label": "Fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Fire; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:fitorja:1",
    "nodeId": "fitorja",
    "lineIndex": 1,
    "placeId": "kulshedra1",
    "text": "kulshedra bie.",
    "conditions": {
      "all": [
        "from:kulshLufte2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "dead": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:fitorja:2",
    "nodeId": "fitorja",
    "lineIndex": 2,
    "placeId": "kulshedra1",
    "text": "kulshedra vdes.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "dead": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:fitorja:3",
    "nodeId": "fitorja",
    "lineIndex": 3,
    "placeId": "kulshedra1",
    "text": "ujë vjen përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "river",
        "label": "Returning water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Returning water; only the represented moment is staged."
  },
  {
    "id": "description:dranguasi:0",
    "nodeId": "dranguasi",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "ti linde me këmishë.",
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
    "rationale": "Born with a caul is remembered origin, not a second birth here."
  },
  {
    "id": "description:dranguasi:1",
    "nodeId": "dranguasi",
    "lineIndex": 1,
    "placeId": "kulshedra1",
    "text": "guri vret kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "thunder-stone",
        "asset": "stone",
        "label": "Thunderstone",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "dead": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Thunderstone, Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:dranguasi:2",
    "nodeId": "dranguasi",
    "lineIndex": 2,
    "placeId": "kulshedra1",
    "text": "uji vjen përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-water",
        "asset": "river",
        "label": "Returning water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Returning water; only the represented moment is staged."
  },
  {
    "id": "description:dranguasi:3",
    "nodeId": "dranguasi",
    "lineIndex": 3,
    "placeId": "kulshedra1",
    "text": "ti je një dragua i fortë!",
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
    "rationale": "Player identity and strength do not introduce a second dragon body."
  },
  {
    "id": "description:qyteti:0",
    "nodeId": "qyteti",
    "lineIndex": 0,
    "placeId": "qyteti",
    "text": "ti del nga errësira në qytet.",
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
        "key": "empty-market",
        "asset": "market",
        "label": "Silent city market",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Silent city market; only the represented moment is staged."
  },
  {
    "id": "description:qyteti:1",
    "nodeId": "qyteti",
    "lineIndex": 1,
    "placeId": "qyteti",
    "text": "ti ecën në qytet.",
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
        "key": "empty-market",
        "asset": "market",
        "label": "Silent city market",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Silent city market; only the represented moment is staged."
  },
  {
    "id": "description:qyteti:2",
    "nodeId": "qyteti",
    "lineIndex": 2,
    "placeId": "qyteti",
    "text": "këtu nuk rri njeri, por një treg rri hapur, pa zhurmë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "empty-market",
        "asset": "market",
        "label": "Silent city market",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "No inhabitants are added to the empty market."
  },
  {
    "id": "description:qyteti:3",
    "nodeId": "qyteti",
    "lineIndex": 3,
    "placeId": "qyteti",
    "text": "tregu ka ende ar, mish, peshk, pemë dhe rroba.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "market-gold",
        "asset": "gold",
        "label": "Gold",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "market-meat",
        "asset": "meat",
        "label": "Meat",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "market-fish",
        "asset": "fish",
        "label": "Fish",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "market-fruit",
        "asset": "fruit",
        "label": "Fruit",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "market-clothes",
        "asset": "clothes",
        "label": "Clothes",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Gold, Meat, Fish, Fruit, Clothes; only the represented moment is staged."
  },
  {
    "id": "description:qyteti:4",
    "nodeId": "qyteti",
    "lineIndex": 4,
    "placeId": "qyteti",
    "text": "tregu është i qetë tani. gjarpërinjtë nuk kthehen.",
    "conditions": {
      "all": [
        "fact:gjakovaOraSlain"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "guardian-serpent",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The market stays quiet; the serpents are absent."
  },
  {
    "id": "description:thesar2:0",
    "nodeId": "thesar2",
    "lineIndex": 0,
    "placeId": "thesar2",
    "text": "ti gjen një treg të vdekur: asnjë njeri, vetëm ar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "empty-market",
        "asset": "market",
        "label": "Empty market",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "market-gold",
        "asset": "gold",
        "label": "Gold",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Empty market, Gold; only the represented moment is staged. The guardian and accessible treasure occupy illustrative open ground before the market wall, not the wall’s masonry."
  },
  {
    "id": "description:thesar2:1",
    "nodeId": "thesar2",
    "lineIndex": 1,
    "placeId": "thesar2",
    "text": "drita e pishtarit bie mbi arin, dhe një gjarpër i madh e ruan.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "market-torch",
        "asset": "torch",
        "label": "Torch",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "market-gold",
        "asset": "gold",
        "label": "Gold",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "near",
        "attributes": {
          "large": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Torch, Gold, Guardian serpent; only the represented moment is staged. The guardian and accessible treasure occupy illustrative open ground before the market wall, not the wall’s masonry."
  },
  {
    "id": "description:thesar2:2",
    "nodeId": "thesar2",
    "lineIndex": 2,
    "placeId": "thesar2",
    "text": "gjarpri është një Ora.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "near",
        "attributes": {
          "large": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The already visible serpent is identified as an Ora. The guardian and accessible treasure occupy illustrative open ground before the market wall, not the wall’s masonry."
  },
  {
    "id": "description:thesar2:3",
    "nodeId": "thesar2",
    "lineIndex": 3,
    "placeId": "thesar2",
    "text": "Fjalët në mur thonë: kush prek arin, drita vdes; kush vret një gjarpër të shtëpisë, nuk ka fat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "market-wall",
        "asset": "wall",
        "label": "Inscribed wall",
        "zone": "front",
        "attributes": {
          "inscription": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The inscription is present; its hypothetical actions are not performed."
  },
  {
    "id": "description:thesarKthyer:0",
    "nodeId": "thesarKthyer",
    "lineIndex": 0,
    "placeId": "thesarKthyer",
    "text": "ti del nga tregu; gjarpri rri i qetë dhe ti je i sigurt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guardian serpent; only the represented moment is staged."
  },
  {
    "id": "description:thesarKthyer:1",
    "nodeId": "thesarKthyer",
    "lineIndex": 1,
    "placeId": "thesarKthyer",
    "text": "drita e pishtarit lëkundet mbi gur, larg nga ari.",
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
        "key": "market-torch",
        "asset": "torch",
        "label": "Torch",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "market-rock",
        "asset": "rock",
        "label": "Stone",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Torch, Stone; only the represented moment is staged."
  },
  {
    "id": "description:thesarKthyer:2",
    "nodeId": "thesarKthyer",
    "lineIndex": 2,
    "placeId": "thesarKthyer",
    "text": "tani e sheh arin ndryshe.",
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
    "rationale": "The player’s changed judgment is nonvisual."
  },
  {
    "id": "description:gjarperVrare:0",
    "nodeId": "gjarperVrare",
    "lineIndex": 0,
    "placeId": "thesar2",
    "text": "shpata vret gjarprin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "player-sword",
        "asset": "sword",
        "label": "Sword",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "near",
        "attributes": {
          "dead": true,
          "large": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sword, Guardian serpent; only the represented moment is staged. The guardian and accessible treasure occupy illustrative open ground before the market wall, not the wall’s masonry."
  },
  {
    "id": "description:gjarperVrare:1",
    "nodeId": "gjarperVrare",
    "lineIndex": 1,
    "placeId": "thesar2",
    "text": "ti ke thesar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "market-gold",
        "asset": "gold",
        "label": "Treasure",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Treasure; only the represented moment is staged."
  },
  {
    "id": "description:gjarperVrare:2",
    "nodeId": "gjarperVrare",
    "lineIndex": 2,
    "placeId": "thesar2",
    "text": "por uji bëhet i keq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "spoiled-water",
        "asset": "water",
        "label": "Spoiled water",
        "zone": "front",
        "attributes": {
          "color": "#5c6650"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Spoiled water; only the represented moment is staged."
  },
  {
    "id": "description:gjarperVrare:3",
    "nodeId": "gjarperVrare",
    "lineIndex": 3,
    "placeId": "thesar2",
    "text": "natën ti dëgjon një gjarpër.",
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
    "rationale": "The serpent is heard at night, not claimed visible."
  },
  {
    "id": "description:gjarperNgrene:0",
    "nodeId": "gjarperNgrene",
    "lineIndex": 0,
    "placeId": "thesar2",
    "text": "ti prek arin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "market-gold",
        "asset": "gold",
        "label": "Gold",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Gold; only the represented moment is staged."
  },
  {
    "id": "description:gjarperNgrene:1",
    "nodeId": "gjarperNgrene",
    "lineIndex": 1,
    "placeId": "thesar2",
    "text": "drita e pishtarit vdes, dhe gjarpri të ha në errësirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "market-torch",
        "asset": "torch",
        "label": "Extinguished torch",
        "zone": "near",
        "attributes": {
          "burning": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "near",
        "attributes": {
          "large": true
        },
        "count": 1,
        "persistence": "scene"
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
    "rationale": "Torch goes out during the attack. The guardian and accessible treasure occupy illustrative open ground before the market wall, not the wall’s masonry."
  },
  {
    "id": "description:gjarperNgrene:2",
    "nodeId": "gjarperNgrene",
    "lineIndex": 2,
    "placeId": "thesar2",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:djegur:0",
    "nodeId": "djegur",
    "lineIndex": 0,
    "placeId": "djegur",
    "text": "ti ikën nga lufta, por flaka e Kulshedrës të kap.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "fire": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "fatal-fire",
        "asset": "fire",
        "label": "Fire",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Fire; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:djegur:1",
    "nodeId": "djegur",
    "lineIndex": 1,
    "placeId": "djegur",
    "text": "ti vdes në zjarr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "fire": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "fatal-fire",
        "asset": "fire",
        "label": "Fire",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Fire; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:djegur:2",
    "nodeId": "djegur",
    "lineIndex": 2,
    "placeId": "djegur",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:humbur:0",
    "nodeId": "humbur",
    "lineIndex": 0,
    "placeId": "humbur",
    "text": "Dashi i zi të hedh poshtë në errësirë, dhe ti humbet rrugën.",
    "conditions": {
      "all": [
        "from:udhetimi2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "black-ram",
        "asset": "ram",
        "label": "Black ram",
        "zone": "front",
        "attributes": {
          "color": "black"
        },
        "count": 1,
        "persistence": "scene"
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
    "rationale": "The ram throws the player into darkness."
  },
  {
    "id": "description:humbur:1",
    "nodeId": "humbur",
    "lineIndex": 1,
    "placeId": "humbur",
    "text": "Qeni vjen drejt teje. ti ikën në errësirë dhe humbet rrugën.",
    "conditions": {
      "all": [
        "from:qeniGate"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-dog",
        "asset": "dog",
        "label": "Pursuing dog",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Pursuing dog; only the represented moment is staged."
  },
  {
    "id": "description:humbur:2",
    "nodeId": "humbur",
    "lineIndex": 2,
    "placeId": "humbur",
    "text": "ti ikën nëpër botën poshtë deri kur humbet rrugën në errësirë.",
    "conditions": {
      "all": [
        "from:udhetimi2|qeniGate"
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
    "rationale": "Flight ends lost in darkness."
  },
  {
    "id": "description:humbur:3",
    "nodeId": "humbur",
    "lineIndex": 3,
    "placeId": "humbur",
    "text": "ti kujton: çdo njeri ka një Ora.",
    "conditions": {
      "all": [
        "knows:oraCompanion"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Remembered lore about Oras does not create a crowd."
  },
  {
    "id": "description:humbur:4",
    "nodeId": "humbur",
    "lineIndex": 4,
    "placeId": "humbur",
    "text": "një dritë vezullon para teje dhe thotë: unë jam një Ora.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-light",
        "asset": "light-ray",
        "label": "Ora’s visible light",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ora’s visible light; only the represented moment is staged."
  },
  {
    "id": "description:humbur:5",
    "nodeId": "humbur",
    "lineIndex": 5,
    "placeId": "humbur",
    "text": "Ora thotë: çdo njeri ka një Ora për gjithë jetën.",
    "conditions": {
      "all": [
        "knows:oraCompanion"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-light",
        "asset": "light-ray",
        "label": "Ora’s visible light",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The visible light speaks as the Ora; her statement is general lore."
  },
  {
    "id": "description:humbur:6",
    "nodeId": "humbur",
    "lineIndex": 6,
    "placeId": "humbur",
    "text": "Drita e Orës pasqyrohet në sytë e tu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-light",
        "asset": "light-ray",
        "label": "Ora’s visible light",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ora’s visible light; only the represented moment is staged."
  },
  {
    "id": "description:oraBardhe:0",
    "nodeId": "oraBardhe",
    "lineIndex": 0,
    "placeId": "humbur",
    "text": "Ora të ndihmon: drita e saj ecën para.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "ora-light",
        "asset": "light-ray",
        "label": "Ora’s visible light",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ora’s visible light; only the represented moment is staged."
  },
  {
    "id": "description:oraBardhe:1",
    "nodeId": "oraBardhe",
    "lineIndex": 1,
    "placeId": "humbur",
    "text": "ti del nga errësira: ti je i sigurt.",
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
    "rationale": "The player emerges from darkness."
  },
  {
    "id": "description:oraBardhe:2",
    "nodeId": "oraBardhe",
    "lineIndex": 2,
    "placeId": "humbur",
    "text": "ti jep bukë Orës",
    "conditions": {
      "all": [
        "arrival:action:story:humbur:jep-buke-ora"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:ora",
        "asset": "spirit",
        "label": "Ora",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "ora-bread",
        "asset": "bread",
        "label": "Bread",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ora, Bread; only the represented moment is staged."
  },
  {
    "id": "description:oraBardhe:3",
    "nodeId": "oraBardhe",
    "lineIndex": 3,
    "placeId": "humbur",
    "text": "ti jep kripë Orës",
    "conditions": {
      "all": [
        "arrival:action:story:humbur:jep-kripe-ora"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:ora",
        "asset": "spirit",
        "label": "Ora",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "ora-salt",
        "asset": "salt",
        "label": "Salt",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Ora, Salt; only the represented moment is staged."
  },
  {
    "id": "description:oraZeze:0",
    "nodeId": "oraZeze",
    "lineIndex": 0,
    "placeId": "humbur",
    "text": "ti humbet në errësirë.",
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
    "rationale": "The player is lost in darkness."
  },
  {
    "id": "description:oraZeze:1",
    "nodeId": "oraZeze",
    "lineIndex": 1,
    "placeId": "humbur",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:dera:0",
    "nodeId": "dera",
    "lineIndex": 0,
    "placeId": "bota1",
    "text": "ti hyn në një derë të madhe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guarded door; only the represented moment is staged."
  },
  {
    "id": "description:dera:1",
    "nodeId": "dera",
    "lineIndex": 1,
    "placeId": "bota1",
    "text": "brenda është një hije: ajo rri dhe nuk lëviz.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "door-shadow",
        "asset": "shadow",
        "label": "Motionless shadow",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Motionless shadow; only the represented moment is staged."
  },
  {
    "id": "description:dera:2",
    "nodeId": "dera",
    "lineIndex": 2,
    "placeId": "bota1",
    "text": "Fjalët në derën thonë: hija ruan derën e vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "guarded-door",
        "property": "inscription",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Words are inscribed on the door."
  },
  {
    "id": "description:sprova:0",
    "nodeId": "sprova",
    "lineIndex": 0,
    "placeId": "sprova",
    "text": "shumë hije rrinë këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "silent-shadows",
        "asset": "shadow",
        "label": "Silent shadows",
        "zone": "around",
        "attributes": {},
        "count": 5,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Silent shadows; only the represented moment is staged."
  },
  {
    "id": "description:sprova:1",
    "nodeId": "sprova",
    "lineIndex": 1,
    "placeId": "sprova",
    "text": "asgjë nuk lëviz përveç një drite të vogël që duket e çuditshme në mur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shadow-wall",
        "asset": "wall",
        "label": "Wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "wall-light",
        "asset": "light-ray",
        "label": "Small strange light",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Wall, Small strange light; only the represented moment is staged."
  },
  {
    "id": "description:sprova:2",
    "nodeId": "sprova",
    "lineIndex": 2,
    "placeId": "sprova",
    "text": "hijet nuk flasin: asnjë zë, asnjë frymë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "silent-shadows",
        "asset": "shadow",
        "label": "Silent shadows",
        "zone": "around",
        "attributes": {},
        "count": 5,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Silent shadows; only the represented moment is staged."
  },
  {
    "id": "description:sprova:3",
    "nodeId": "sprova",
    "lineIndex": 3,
    "placeId": "sprova",
    "text": "Fjalët në mur thonë: hija jeton pas njeriut.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "shadow-wall",
        "asset": "wall",
        "label": "Inscribed wall",
        "zone": "front",
        "attributes": {
          "inscription": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Inscribed wall; only the represented moment is staged."
  },
  {
    "id": "description:gjarpri:0",
    "nodeId": "gjarpri",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "ti ec nëpër dritën e çuditshme dhe hyr në një shpellë ku një gjarpër ruan rrugën.",
    "conditions": {
      "all": [
        "from:sprova"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-cave",
        "asset": "cave",
        "label": "Cave",
        "zone": "front",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player explicitly enters the serpent’s cave through the strange light."
  },
  {
    "id": "description:gjarpri:1",
    "nodeId": "gjarpri",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "një gjarpër i madh rri këtu, i qetë si gur.",
    "conditions": {
      "all": [
        "flag:underworldSerpentDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-cave",
        "asset": "cave",
        "label": "Cave",
        "zone": "front",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The guardian serpent remains in the cave interior established by this place and its explicit arrival; it is not moved outside."
  },
  {
    "id": "description:gjarpri:2",
    "nodeId": "gjarpri",
    "lineIndex": 2,
    "placeId": "bota2",
    "text": "gjarpri ka zjarr: e nxjerr nga goja.",
    "conditions": {
      "all": [
        "flag:underworldSerpentDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {
          "fire": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Guardian serpent; only the represented moment is staged."
  },
  {
    "id": "description:gjarpri:3",
    "nodeId": "gjarpri",
    "lineIndex": 3,
    "placeId": "bota2",
    "text": "gjarpri ruan rrugën për kulshedrën.",
    "conditions": {
      "all": [
        "flag:underworldSerpentDefeated"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present serpent guards the road; its distant mistress is not brought here."
  },
  {
    "id": "description:gjarpri:4",
    "nodeId": "gjarpri",
    "lineIndex": 4,
    "placeId": "bota2",
    "text": "ti godit gjarprin me shpatë. Gjarpri bie, dhe rruga nëpër shpellë hapet.",
    "conditions": {
      "all": [
        "arrival:action:underworld-serpent-sword"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The defeated serpent leaves the road open; the blessing and borrowed strength are nonvisual."
  },
  {
    "id": "description:gjarpri:5",
    "nodeId": "gjarpri",
    "lineIndex": 5,
    "placeId": "bota2",
    "text": "me fuqi e zanave, ti hedh gjarprin poshtë. ai bie, dhe rruga hapet.",
    "conditions": {
      "all": [
        "arrival:action:underworld-serpent-power"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The defeated serpent leaves the road open; the blessing and borrowed strength are nonvisual."
  },
  {
    "id": "description:gjarpri:6",
    "nodeId": "gjarpri",
    "lineIndex": 6,
    "placeId": "bota2",
    "text": "Bekimi të ruan nga zjarr. ti godit gjarprin; ai bie, dhe rruga hapet.",
    "conditions": {
      "all": [
        "arrival:action:underworld-serpent-blessing"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guardian-serpent",
        "asset": "snake",
        "label": "Guardian serpent",
        "zone": "front",
        "attributes": {
          "dead": true
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The defeated serpent leaves the road open; the blessing and borrowed strength are nonvisual."
  },
  {
    "id": "description:uji:0",
    "nodeId": "uji",
    "lineIndex": 0,
    "placeId": "uji",
    "text": "kulshedra mban shumë ujë; askush nuk mund të pijë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "held-water",
        "asset": "lake",
        "label": "Held body of water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Held body of water; only the represented moment is staged."
  },
  {
    "id": "description:uji:1",
    "nodeId": "uji",
    "lineIndex": 1,
    "placeId": "uji",
    "text": "Prende rri pranë ujit, e qetë dhe e bukur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "held-water",
        "asset": "lake",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:prende",
        "kind": "beside",
        "target": "held-water"
      }
    ],
    "disposition": "physical",
    "rationale": "Prende waits beside the water."
  },
  {
    "id": "description:uji:2",
    "nodeId": "uji",
    "lineIndex": 2,
    "placeId": "uji",
    "text": "një ylber vjen nga qielli dhe bie mbi ujin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "water-rainbow",
        "asset": "rainbow",
        "label": "Rainbow",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "held-water",
        "asset": "lake",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rainbow, Water; only the represented moment is staged."
  },
  {
    "id": "description:uji:3",
    "nodeId": "uji",
    "lineIndex": 3,
    "placeId": "uji",
    "text": "Uji vezullon nën ylber.",
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
        "key": "water-rainbow",
        "asset": "rainbow",
        "label": "Rainbow",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "held-water",
        "asset": "lake",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rainbow, Water; only the represented moment is staged."
  },
  {
    "id": "description:uji:4",
    "nodeId": "uji",
    "lineIndex": 4,
    "placeId": "uji",
    "text": "Ylberi pasqyrohet në ujë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "water-rainbow",
        "asset": "rainbow",
        "label": "Rainbow",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "held-water",
        "asset": "lake",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rainbow, Water; only the represented moment is staged."
  },
  {
    "id": "description:uji:5",
    "nodeId": "uji",
    "lineIndex": 5,
    "placeId": "uji",
    "text": "Dashi i bardhë të merr lart te uji nën qiellin.",
    "conditions": {
      "all": [
        "from:udhetimi2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "white-ram",
        "asset": "ram",
        "label": "White ram",
        "zone": "front",
        "attributes": {
          "color": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "held-water",
        "asset": "lake",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes White ram, Water; only the represented moment is staged."
  },
  {
    "id": "description:kthimi:0",
    "nodeId": "kthimi",
    "lineIndex": 0,
    "placeId": "kthimi",
    "text": "ti dhe Bukura ngjiteni lart.",
    "conditions": {
      "all": [
        "from:bukuraKthim",
        "flag:beautyClimbedWellTogether"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Earth, Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:kthimi:1",
    "nodeId": "kthimi",
    "lineIndex": 1,
    "placeId": "kthimi",
    "text": "ti lë Bukurën te ana, dhe ngjitesh vetëm drejt pusit.",
    "conditions": {
      "all": [
        "from:bukuraKthim",
        "flag:beautyClimbedWellAlone"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Beauty stays at the edge while the player climbs; no teleport to the well."
  },
  {
    "id": "description:kthimi:2",
    "nodeId": "kthimi",
    "lineIndex": 2,
    "placeId": "kthimi",
    "text": "shpella bie poshtë pas teje.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-cave",
        "asset": "cave",
        "label": "Cave",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "underworld-cave",
        "property": "broken",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The cave collapses behind the player."
  },
  {
    "id": "description:kthimi:3",
    "nodeId": "kthimi",
    "lineIndex": 3,
    "placeId": "kthimi",
    "text": "pusi është lart: një dritë e vogël, si yll.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "well-opening-light",
        "asset": "light-ray",
        "label": "Small well opening",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Small well opening; only the represented moment is staged."
  },
  {
    "id": "description:gjarperBurr1:0",
    "nodeId": "gjarperBurr1",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "natën një gjarpër lë lëkurën dhe bëhet një njeri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Serpent husband",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "shed-skin",
        "asset": "skin",
        "label": "Shed snakeskin",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "One actor has transformed into a man; the skin remains, not a second live snake."
  },
  {
    "id": "description:gjarperBurr1:1",
    "nodeId": "gjarperBurr1",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "njeriu thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Serpent husband",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The man asks for silence."
  },
  {
    "id": "description:gjarperBurr1:2",
    "nodeId": "gjarperBurr1",
    "lineIndex": 2,
    "placeId": "bota2",
    "text": "mos fol për mua, kurrë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Serpent husband",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The man asks for silence."
  },
  {
    "id": "description:gjarperBurrVdes:0",
    "nodeId": "gjarperBurrVdes",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "ti flet.",
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
    "rationale": "Player speech."
  },
  {
    "id": "description:gjarperBurrVdes:1",
    "nodeId": "gjarperBurrVdes",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "njeriu humbet përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "actor:serpent-man",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The man vanishes."
  },
  {
    "id": "description:gjarperBurrVdes:2",
    "nodeId": "gjarperBurrVdes",
    "lineIndex": 2,
    "placeId": "bota2",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:gjarperBurr2:0",
    "nodeId": "gjarperBurr2",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "ti nuk flet.",
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
    "rationale": "The player remains silent."
  },
  {
    "id": "description:gjarperBurr2:1",
    "nodeId": "gjarperBurr2",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "një kulshedër merr njeriun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Captured man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Captured man; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:gjarperKerkim:0",
    "nodeId": "gjarperKerkim",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "rruga është e gjatë dhe ngjitet nën qiellin e hapur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "underworld-cave",
        "property": "visibleToViewer",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The long road climbs beneath open sky. This explicit outdoor departure suppresses the cave interior otherwise inherited through the shared canonical bota2 place; it does not destroy the cave."
  },
  {
    "id": "description:gjarperKerkim:1",
    "nodeId": "gjarperKerkim",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "dielli dhe hëna thonë: nuk e shohim njeriun.",
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
    "rationale": "The Sun/Moon/wind speak about the missing man; this does not show the captive beside the player."
  },
  {
    "id": "description:gjarperKerkim:2",
    "nodeId": "gjarperKerkim",
    "lineIndex": 2,
    "placeId": "bota2",
    "text": "era të thërret.",
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
    "rationale": "Calling wind is audible."
  },
  {
    "id": "description:gjarperKerkim:3",
    "nodeId": "gjarperKerkim",
    "lineIndex": 3,
    "placeId": "bota2",
    "text": "era thotë: ai është në detin.",
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
    "rationale": "The Sun/Moon/wind speak about the missing man; this does not show the captive beside the player."
  },
  {
    "id": "description:gjarperKerkim:4",
    "nodeId": "gjarperKerkim",
    "lineIndex": 4,
    "placeId": "bota2",
    "text": "një re vesh detin me hije.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-cloud",
        "asset": "cloud",
        "label": "Cloud",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "husband-sea",
        "asset": "sea",
        "label": "Sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Cloud, Sea; only the represented moment is staged."
  },
  {
    "id": "description:gjarperKerkim:5",
    "nodeId": "gjarperKerkim",
    "lineIndex": 5,
    "placeId": "bota2",
    "text": "mbrapa, rruga e gjatë kthehet në udhëkryq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "return-road",
        "asset": "road",
        "label": "Road back to crossroads",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road back to crossroads; only the represented moment is staged."
  },
  {
    "id": "description:gjarperOrigin:0",
    "nodeId": "gjarperOrigin",
    "lineIndex": 0,
    "placeId": "bota2",
    "text": "një plakë ka një gjarpër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-mother",
        "asset": "human",
        "label": "Old woman",
        "zone": "near",
        "attributes": {
          "age": "old"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:serpent-man",
        "asset": "snake",
        "label": "Serpent son",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Old woman, Serpent son; only the represented moment is staged."
  },
  {
    "id": "description:gjarperOrigin:1",
    "nodeId": "gjarperOrigin",
    "lineIndex": 1,
    "placeId": "bota2",
    "text": "gjarpri do një vajzë të mbretit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "snake",
        "label": "Serpent son",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The serpent wants a king’s daughter; the wished-for bride is not added."
  },
  {
    "id": "description:gjarperOrigin:2",
    "nodeId": "gjarperOrigin",
    "lineIndex": 2,
    "placeId": "bota2",
    "text": "gjarpri bën një pallat.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "snake",
        "label": "Serpent son",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "serpent-palace",
        "asset": "palace",
        "label": "Palace",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Serpent son, Palace; only the represented moment is staged. The builder is staged on open ground beside the newly made palace, not embedded in its raised floor; unmeasured offsets are illustrative."
  },
  {
    "id": "description:gjarperOrigin:3",
    "nodeId": "gjarperOrigin",
    "lineIndex": 3,
    "placeId": "bota2",
    "text": "plaka thotë: natën, thonë, gjarpri bëhet një djalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-mother",
        "asset": "human",
        "label": "Old woman",
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
    "rationale": "The mother reports the nighttime transformation without performing it now."
  },
  {
    "id": "description:gjarperRefuz:0",
    "nodeId": "gjarperRefuz",
    "lineIndex": 0,
    "placeId": "gjarperRefuz",
    "text": "ti ikën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "departure-road",
        "asset": "road",
        "label": "Departure road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Departure road; only the represented moment is staged."
  },
  {
    "id": "description:gjarperRefuz:1",
    "nodeId": "gjarperRefuz",
    "lineIndex": 1,
    "placeId": "gjarperRefuz",
    "text": "gjarpri rri një gjarpër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "snake",
        "label": "Serpent",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Serpent; only the represented moment is staged."
  },
  {
    "id": "description:gjarperRefuz:2",
    "nodeId": "gjarperRefuz",
    "lineIndex": 2,
    "placeId": "gjarperRefuz",
    "text": "Pas teje, pallati bëhet i errët dhe dera mbyllet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "serpent-palace",
        "asset": "palace",
        "label": "Darkening palace",
        "zone": "back",
        "attributes": {
          "open": false
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Darkening palace; only the represented moment is staged."
  },
  {
    "id": "description:gjarperKulshedra:0",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 0,
    "placeId": "gjarperKulshedra",
    "text": "ti merr kripën nga guri.",
    "conditions": {
      "all": [
        "arrival:action:gjarper-take-sea-salt"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-salt",
        "asset": "salt",
        "label": "Salt",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "salt-rock",
        "asset": "rock",
        "label": "Salt rock",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Salt, Salt rock; only the represented moment is staged."
  },
  {
    "id": "description:gjarperKulshedra:1",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 1,
    "placeId": "gjarperKulshedra",
    "text": "ti je në det: vetëm ujë dhe qiell.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "husband-sea",
        "asset": "sea",
        "label": "Sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sea; only the represented moment is staged."
  },
  {
    "id": "description:gjarperKulshedra:2",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 2,
    "placeId": "gjarperKulshedra",
    "text": "një kulshedër mban njeriun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Captive man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Captive man; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:gjarperKulshedra:3",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 3,
    "placeId": "gjarperKulshedra",
    "text": "kulshedra do lotët e tu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The request for tears does not materialize tears. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:gjarperKulshedra:4",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 4,
    "placeId": "gjarperKulshedra",
    "text": "njeriu thotë: ujë me kripë bëhet lot.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Captive man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The man explains the salt-water trick."
  },
  {
    "id": "description:gjarperKulshedra:5",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 5,
    "placeId": "gjarperKulshedra",
    "text": "Kripa rri mbi një gur pranë detit.",
    "conditions": {
      "all": [
        "kripe"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sea-salt",
        "asset": "salt",
        "label": "Salt",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "salt-rock",
        "asset": "rock",
        "label": "Rock",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "husband-sea",
        "asset": "sea",
        "label": "Sea",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "sea-salt",
        "kind": "on",
        "target": "salt-rock"
      }
    ],
    "disposition": "physical",
    "rationale": "Salt is on the rock."
  },
  {
    "id": "description:gjarperKulshedra:6",
    "nodeId": "gjarperKulshedra",
    "lineIndex": 6,
    "placeId": "gjarperKulshedra",
    "text": "Shiu humbet në detin, dhe uji bëhet me i errët.",
    "conditions": {
      "all": [
        "weather:rain"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "rain"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Rain darkens the sea."
  },
  {
    "id": "description:gjarperKulVdes:0",
    "nodeId": "gjarperKulVdes",
    "lineIndex": 0,
    "placeId": "gjarperKulshedra",
    "text": "ti lufton kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:gjarperKulVdes:1",
    "nodeId": "gjarperKulVdes",
    "lineIndex": 1,
    "placeId": "gjarperKulshedra",
    "text": "kulshedra të ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:gjarperKulVdes:2",
    "nodeId": "gjarperKulVdes",
    "lineIndex": 2,
    "placeId": "gjarperKulshedra",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:gjarperBurrFund:0",
    "nodeId": "gjarperBurrFund",
    "lineIndex": 0,
    "placeId": "gjarperKulshedra",
    "text": "ti jep ujë me kripë njeriut.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Captive man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "salt-water",
        "asset": "cup",
        "label": "Salt water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Captive man, Salt water; only the represented moment is staged."
  },
  {
    "id": "description:gjarperBurrFund:1",
    "nodeId": "gjarperBurrFund",
    "lineIndex": 1,
    "placeId": "gjarperKulshedra",
    "text": "njeriu thotë: ujë me kripë bëhet lot.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The man speaks and deceives the captor."
  },
  {
    "id": "description:gjarperBurrFund:2",
    "nodeId": "gjarperBurrFund",
    "lineIndex": 2,
    "placeId": "gjarperKulshedra",
    "text": "njeriu mashtron kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The man speaks and deceives the captor."
  },
  {
    "id": "description:gjarperBurrFund:3",
    "nodeId": "gjarperBurrFund",
    "lineIndex": 3,
    "placeId": "gjarperKulshedra",
    "text": "kulshedra lë njeriun të ikë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:serpent-man",
        "asset": "human",
        "label": "Freed man",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Freed man; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:gjarperBurrFund:4",
    "nodeId": "gjarperBurrFund",
    "lineIndex": 4,
    "placeId": "gjarperKulshedra",
    "text": "njeriu kthehet në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "actor:serpent-man",
        "property": "present",
        "value": false
      },
      {
        "key": "salt-water",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "offstage",
    "rationale": "After being released, the man returns to his own home offstage. The canonical player remains at the Kulshedra’s shore; his departed body and transferred drink do not remain here, and his home is not moved beside the monster."
  },
  {
    "id": "description:gjarperBurrFund:5",
    "nodeId": "gjarperBurrFund",
    "lineIndex": 5,
    "placeId": "gjarperKulshedra",
    "text": "njeriu është i sigurt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "offstage",
    "rationale": "This is the departed man’s safe outcome at home. It neither moves the player to that home nor places the home beside the Kulshedra."
  },
  {
    "id": "description:gjizarUdha:0",
    "nodeId": "gjizarUdha",
    "lineIndex": 0,
    "placeId": "gjizarUdha",
    "text": "ti ecën larg në rrugën që nuk kthehet, dhe kërkon zogun kudo.",
    "conditions": {
      "all": [
        "from:gjizar2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:1",
    "nodeId": "gjizarUdha",
    "lineIndex": 1,
    "placeId": "gjizarUdha",
    "text": "mbrapa, rruga e gjatë kthehet te nëna e vjetër në fillim të rrugës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "return-road",
        "asset": "road",
        "label": "Road behind",
        "zone": "back",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The road returns to the mother; she is not depicted beside the player."
  },
  {
    "id": "description:gjizarUdha:2",
    "nodeId": "gjizarUdha",
    "lineIndex": 2,
    "placeId": "gjizarUdha",
    "text": "një grua e egër ka morra në flokë.",
    "conditions": {
      "all": [
        "flag:gjizarWomanHelped"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "road-woman",
        "asset": "human",
        "label": "Wild-haired woman",
        "zone": "near",
        "attributes": {
          "hair": "wild",
          "lice": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Wild-haired woman; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:3",
    "nodeId": "gjizarUdha",
    "lineIndex": 3,
    "placeId": "gjizarUdha",
    "text": "Flokët e saj janë pa morra, dhe ajo tregon rrugën te shtëpia e tigrit.",
    "conditions": {
      "all": [
        "flag:gjizarWomanHelped"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "road-woman",
        "asset": "human",
        "label": "Woman",
        "zone": "near",
        "attributes": {
          "lice": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Woman, Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:4",
    "nodeId": "gjizarUdha",
    "lineIndex": 4,
    "placeId": "gjizarUdha",
    "text": "Në shtëpinë e tigrit, gruaja digjet kur hap zjarrin e furrës; gjethe të thata rrinë pranë.",
    "conditions": {
      "all": [
        "flag:gjizarWomanHelped"
      ],
      "negate": false,
      "none": [
        "flag:gjizarTigerHelped"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "oven-woman",
        "asset": "human",
        "label": "Woman",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "tiger-house",
        "asset": "house",
        "label": "Tiger’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "tiger-oven",
        "asset": "oven",
        "label": "Open burning oven",
        "zone": "front",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "oven-leaves",
        "asset": "leaves",
        "label": "Dry leaves",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Woman, Tiger’s house, Open burning oven, Dry leaves; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:5",
    "nodeId": "gjizarUdha",
    "lineIndex": 5,
    "placeId": "gjizarUdha",
    "text": "Furra digjet pa rrezik. Tigri bëhet mik dhe tregon një luan të verbër.",
    "conditions": {
      "all": [
        "flag:gjizarTigerHelped"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "friendly-tiger",
        "asset": "tiger",
        "label": "Tiger",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "tiger-oven",
        "asset": "oven",
        "label": "Safely burning oven",
        "zone": "front",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Tiger, Safely burning oven; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:6",
    "nodeId": "gjizarUdha",
    "lineIndex": 6,
    "placeId": "gjizarUdha",
    "text": "Luani i verbër nuk mund të hapë sytë.",
    "conditions": {
      "all": [
        "flag:gjizarTigerHelped"
      ],
      "negate": false,
      "none": [
        "flag:gjizarLionHelped"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "blind-lion",
        "asset": "lion",
        "label": "Blind lion",
        "zone": "front",
        "attributes": {
          "eyesClosed": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Blind lion; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:7",
    "nodeId": "gjizarUdha",
    "lineIndex": 7,
    "placeId": "gjizarUdha",
    "text": "Luani sheh dhe tregon rrugën e Xhind. tre shqiponja të sulmojnë.",
    "conditions": {
      "all": [
        "flag:gjizarLionHelped"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "blind-lion",
        "asset": "lion",
        "label": "Sighted lion",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "three-eagles",
        "asset": "eagle",
        "label": "Three eagles",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sighted lion, Three eagles, Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:8",
    "nodeId": "gjizarUdha",
    "lineIndex": 8,
    "placeId": "gjizarUdha",
    "text": "tre shqiponjat ka plagë në një krah, një këmbë dhe një sqep.",
    "conditions": {
      "all": [
        "flag:gjizarEaglesDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "wounded-wing-eagle",
        "asset": "eagle",
        "label": "Eagle with wounded wing",
        "zone": "front",
        "attributes": {
          "wound": "wing"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "wounded-leg-eagle",
        "asset": "eagle",
        "label": "Eagle with wounded leg",
        "zone": "front",
        "attributes": {
          "wound": "leg"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "wounded-beak-eagle",
        "asset": "eagle",
        "label": "Eagle with wounded beak",
        "zone": "front",
        "attributes": {
          "wound": "beak"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Eagle with wounded wing, Eagle with wounded leg, Eagle with wounded beak; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:9",
    "nodeId": "gjizarUdha",
    "lineIndex": 9,
    "placeId": "gjizarUdha",
    "text": "në një shtëpi në fushë, një plakë të fsheh.",
    "conditions": {
      "all": [
        "flag:gjizarEaglesDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-house",
        "asset": "house",
        "label": "House in a field",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-field",
        "asset": "field",
        "label": "Field",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "eagle-old-woman",
        "asset": "human",
        "label": "Old woman",
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
    "disposition": "physical",
    "rationale": "The visible beat establishes House in a field, Field, Old woman; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:10",
    "nodeId": "gjizarUdha",
    "lineIndex": 10,
    "placeId": "gjizarUdha",
    "text": "shqiponjat hyjnë në ujë dhe bëhen tre vajza.",
    "conditions": {
      "all": [
        "flag:gjizarEaglesDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-sisters",
        "asset": "human",
        "label": "Three eagle sisters",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "eagle-bath",
        "asset": "water",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Eagles become three women, avoiding double-counting transformed identities."
  },
  {
    "id": "description:gjizarUdha:11",
    "nodeId": "gjizarUdha",
    "lineIndex": 11,
    "placeId": "gjizarUdha",
    "text": "vajzat betohen për plagët.",
    "conditions": {
      "all": [
        "flag:gjizarEaglesDefeated"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-sisters",
        "asset": "human",
        "label": "Three eagle sisters",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Three sisters swear and discuss the future journey; elapsed months and an hour are not geometry."
  },
  {
    "id": "description:gjizarUdha:12",
    "nodeId": "gjizarUdha",
    "lineIndex": 12,
    "placeId": "gjizarUdha",
    "text": "Motrat thonë: rri tre muaj me ne: një muaj me çdo motër.",
    "conditions": {
      "all": [
        "flag:gjizarEaglesDefeated"
      ],
      "negate": false,
      "none": [
        "flag:gjizarThreeMonthsStayed"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-sisters",
        "asset": "human",
        "label": "Three eagle sisters",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Three sisters swear and discuss the future journey; elapsed months and an hour are not geometry."
  },
  {
    "id": "description:gjizarUdha:13",
    "nodeId": "gjizarUdha",
    "lineIndex": 13,
    "placeId": "gjizarUdha",
    "text": "pas kësaj, ne do të fluturojmë me ty për një orë, motrat thonë.",
    "conditions": {
      "all": [
        "flag:gjizarEaglesDefeated"
      ],
      "negate": false,
      "none": [
        "flag:gjizarThreeMonthsStayed"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-sisters",
        "asset": "human",
        "label": "Three eagle sisters",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Three sisters swear and discuss the future journey; elapsed months and an hour are not geometry."
  },
  {
    "id": "description:gjizarUdha:14",
    "nodeId": "gjizarUdha",
    "lineIndex": 14,
    "placeId": "gjizarUdha",
    "text": "ti rri tre muaj me motrat.",
    "conditions": {
      "all": [
        "arrival:action:gjizar-three-month-stay"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-sisters",
        "asset": "human",
        "label": "Three eagle sisters",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Three eagle sisters; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:15",
    "nodeId": "gjizarUdha",
    "lineIndex": 15,
    "placeId": "gjizarUdha",
    "text": "tre motrat hapin krahët dhe thotë: tani fluturo me ne te pallati.",
    "conditions": {
      "all": [
        "flag:gjizarThreeMonthsStayed"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "eagle-sisters",
        "asset": "human",
        "label": "Three eagle sisters",
        "zone": "near",
        "attributes": {
          "wings": true
        },
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Three eagle sisters; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:16",
    "nodeId": "gjizarUdha",
    "lineIndex": 16,
    "placeId": "gjizarUdha",
    "text": "ti hap zjarrin e furrës me gjethe.",
    "conditions": {
      "all": [
        "arrival:action:story:gjizar-udha:hap-zjarr-e_link-furre-me-gjethe"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "tiger-oven",
        "asset": "oven",
        "label": "Oven",
        "zone": "front",
        "attributes": {
          "open": true,
          "burning": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "oven-leaves",
        "asset": "leaves",
        "label": "Leaves",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Oven, Leaves; only the represented moment is staged."
  },
  {
    "id": "description:gjizarUdha:17",
    "nodeId": "gjizarUdha",
    "lineIndex": 17,
    "placeId": "gjizarUdha",
    "text": "ti lufto shqiponjat.",
    "conditions": {
      "all": [
        "arrival:action:story:gjizar-udha:lufto-shqiponje"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "three-eagles",
        "asset": "eagle",
        "label": "Three eagles",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Three eagles; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:0",
    "nodeId": "gjizarPallat",
    "lineIndex": 0,
    "placeId": "bukura1",
    "text": "ti fluturon me tre shqiponjat për një orë dhe vjen në pallat.",
    "conditions": {
      "all": [
        "from:gjizarUdha"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "three-eagles",
        "asset": "eagle",
        "label": "Three eagles",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "gjizar-palace",
        "asset": "palace",
        "label": "Beauty’s palace",
        "zone": "front",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Three eagles, Beauty’s palace; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:1",
    "nodeId": "gjizarPallat",
    "lineIndex": 1,
    "placeId": "bukura1",
    "text": "ti je në pallatin e Bukurës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-palace",
        "asset": "palace",
        "label": "Beauty’s palace",
        "zone": "front",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty’s palace; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:2",
    "nodeId": "gjizarPallat",
    "lineIndex": 2,
    "placeId": "bukura1",
    "text": "zogu është në një kafaz.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "gjizar-cage",
        "asset": "cage",
        "label": "Bird cage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "gjizar-bird",
        "kind": "inside",
        "target": "gjizar-cage"
      }
    ],
    "disposition": "physical",
    "rationale": "Gjizar is inside the cage."
  },
  {
    "id": "description:gjizarPallat:3",
    "nodeId": "gjizarPallat",
    "lineIndex": 3,
    "placeId": "bukura1",
    "text": "zogu quhet Gjizar.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Gjizar; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:4",
    "nodeId": "gjizarPallat",
    "lineIndex": 4,
    "placeId": "bukura1",
    "text": "Kafazi vezullon në dritën e qirinjve.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-cage",
        "asset": "cage",
        "label": "Bird cage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "lit-candles",
        "asset": "candle",
        "label": "Lit candles",
        "zone": "around",
        "attributes": {},
        "count": 4,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Bird cage, Lit candles; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:5",
    "nodeId": "gjizarPallat",
    "lineIndex": 5,
    "placeId": "bukura1",
    "text": "katër qirinj kanë pak zjarr; katër qirinj nuk kanë zjarr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "lit-candles",
        "asset": "candle",
        "label": "Four burning candles",
        "zone": "left",
        "attributes": {
          "burning": true
        },
        "count": 4,
        "persistence": "scene"
      },
      {
        "key": "unlit-candles",
        "asset": "candle",
        "label": "Four unlit candles",
        "zone": "right",
        "attributes": {
          "burning": false
        },
        "count": 4,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Four burning candles, Four unlit candles; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:6",
    "nodeId": "gjizarPallat",
    "lineIndex": 6,
    "placeId": "bukura1",
    "text": "për të marrë kafazin pa zhurmë, duhet të ndezësh katër qirinj dhe të shuash katër.",
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
    "rationale": "Puzzle instructions do not prematurely change the candles."
  },
  {
    "id": "description:gjizarPallat:7",
    "nodeId": "gjizarPallat",
    "lineIndex": 7,
    "placeId": "bukura1",
    "text": "Në pallat, të gjithë flenë përveç zogut; Bukura fle një gjumë të thellë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "palace-beauty",
        "asset": "human",
        "label": "Sleeping Beauty",
        "zone": "near",
        "attributes": {
          "pose": "sleeping"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "palace-sleepers",
        "asset": "human",
        "label": "Sleeping palace residents",
        "zone": "around",
        "attributes": {
          "pose": "sleeping"
        },
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sleeping Beauty, Sleeping palace residents, Gjizar; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:8",
    "nodeId": "gjizarPallat",
    "lineIndex": 8,
    "placeId": "bukura1",
    "text": "katër qirinj tjetër kanë zjarr tani.",
    "conditions": {
      "all": [
        "flag:gjizarCandlesLit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "unlit-candles",
        "asset": "candle",
        "label": "Four newly lit candles",
        "zone": "right",
        "attributes": {
          "burning": true
        },
        "count": 4,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Four newly lit candles; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:9",
    "nodeId": "gjizarPallat",
    "lineIndex": 9,
    "placeId": "bukura1",
    "text": "katër qirinj nuk kanë zjarr tani; kafazi rri i qetë.",
    "conditions": {
      "all": [
        "flag:gjizarCandlesBalanced"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "lit-candles",
        "asset": "candle",
        "label": "Four extinguished candles",
        "zone": "left",
        "attributes": {
          "burning": false
        },
        "count": 4,
        "persistence": "scene"
      },
      {
        "key": "gjizar-cage",
        "asset": "cage",
        "label": "Bird cage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Four extinguished candles, Bird cage; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:10",
    "nodeId": "gjizarPallat",
    "lineIndex": 10,
    "placeId": "bukura1",
    "text": "ti mban kafazin. tre shqiponjat thotë: kthehemi bashkë te gurët.",
    "conditions": {
      "all": [
        "flag:gjizarCageTaken"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-cage",
        "asset": "cage",
        "label": "Bird cage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "three-eagles",
        "asset": "eagle",
        "label": "Three eagles",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "holds",
        "target": "gjizar-cage"
      }
    ],
    "disposition": "physical",
    "rationale": "The cage is held and the eagles invite departure."
  },
  {
    "id": "description:gjizarPallat:11",
    "nodeId": "gjizarPallat",
    "lineIndex": 11,
    "placeId": "bukura1",
    "text": "ti ndiz katër qirinj.",
    "conditions": {
      "all": [
        "arrival:action:story:gjizar-pallat:ndiz-kater-qiri"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "unlit-candles",
        "asset": "candle",
        "label": "Four newly lit candles",
        "zone": "right",
        "attributes": {
          "burning": true
        },
        "count": 4,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Four newly lit candles; only the represented moment is staged."
  },
  {
    "id": "description:gjizarPallat:12",
    "nodeId": "gjizarPallat",
    "lineIndex": 12,
    "placeId": "bukura1",
    "text": "ti merr kafazin ngadalë.",
    "conditions": {
      "all": [
        "arrival:action:story:gjizar-pallat:merr-kafaz-ngadale"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-cage",
        "asset": "cage",
        "label": "Bird cage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "holds",
        "target": "gjizar-cage"
      }
    ],
    "disposition": "physical",
    "rationale": "The player takes the cage."
  },
  {
    "id": "description:gjizarKap:0",
    "nodeId": "gjizarKap",
    "lineIndex": 0,
    "placeId": "bukura1",
    "text": "Bukura zgjohet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "palace-beauty",
        "asset": "human",
        "label": "Awakened Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Awakened Beauty; only the represented moment is staged."
  },
  {
    "id": "description:gjizarKap:1",
    "nodeId": "gjizarKap",
    "lineIndex": 1,
    "placeId": "bukura1",
    "text": "Bukura të merr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "palace-beauty",
        "asset": "human",
        "label": "Awakened Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Awakened Beauty; only the represented moment is staged."
  },
  {
    "id": "description:gjizarKap:2",
    "nodeId": "gjizarKap",
    "lineIndex": 2,
    "placeId": "bukura1",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:gjizarTradheti:0",
    "nodeId": "gjizarTradheti",
    "lineIndex": 0,
    "placeId": "gjizarTradheti",
    "text": "ti përgjigjesh: po. unë do të shkoj me ju te babai ynë.",
    "conditions": {
      "all": [
        "arrival:action:gjizar-agree-with-brothers"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Player accepts the invitation; no arrival is shown before the trip."
  },
  {
    "id": "description:gjizarTradheti:1",
    "nodeId": "gjizarTradheti",
    "lineIndex": 1,
    "placeId": "gjizarTradheti",
    "text": "ti merr zogun.",
    "conditions": {
      "all": [
        "from:gjizarPallat"
      ],
      "negate": false,
      "none": [
        "flag:gjizarCageTaken"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Gjizar; only the represented moment is staged."
  },
  {
    "id": "description:gjizarTradheti:2",
    "nodeId": "gjizarTradheti",
    "lineIndex": 2,
    "placeId": "gjizarTradheti",
    "text": "shqiponjat sjellin ty përsëri te tre gurët.",
    "conditions": {
      "all": [
        "from:gjizarPallat"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "three-eagles",
        "asset": "eagle",
        "label": "Three eagles",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "three-stones",
        "asset": "stone",
        "label": "Three stones",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Three eagles, Three stones; only the represented moment is staged."
  },
  {
    "id": "description:gjizarTradheti:3",
    "nodeId": "gjizarTradheti",
    "lineIndex": 3,
    "placeId": "gjizarTradheti",
    "text": "tre unazat e vëllezërve rrinë nën gurin.",
    "conditions": {
      "all": [
        "flag:gjizarRingsTaken"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "brothers-rings",
        "asset": "ring",
        "label": "Three rings",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "three-stones",
        "asset": "stone",
        "label": "Three stones",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "brothers-rings",
        "kind": "under",
        "target": "three-stones"
      }
    ],
    "disposition": "physical",
    "rationale": "Three rings are under a stone."
  },
  {
    "id": "description:gjizarTradheti:4",
    "nodeId": "gjizarTradheti",
    "lineIndex": 4,
    "placeId": "gjizarTradheti",
    "text": "vëllai i madh është berber në një qytet. vëllai tjetër mban një kafene në një qytet tjetër.",
    "conditions": {
      "all": [
        "flag:gjizarRingsTaken"
      ],
      "negate": false,
      "none": [
        "flag:gjizarWentWithBrothers"
      ],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Brothers’ occupations in separate towns are a report, not two shops here."
  },
  {
    "id": "description:gjizarTradheti:5",
    "nodeId": "gjizarTradheti",
    "lineIndex": 5,
    "placeId": "gjizarTradheti",
    "text": "Vëllezërit njohin unazat. dhe thonë: shkojmë bashkë te babai ynë.",
    "conditions": {
      "all": [
        "flag:gjizarRingsTaken"
      ],
      "negate": false,
      "none": [
        "flag:gjizarBrothersAgreement",
        "flag:gjizarWentWithBrothers"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-brothers",
        "asset": "human",
        "label": "Two brothers",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "persistence": "scene"
      },
      {
        "key": "brothers-rings",
        "asset": "ring",
        "label": "Three rings",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The brothers recognize the rings and invite the player."
  },
  {
    "id": "description:gjizarTradheti:6",
    "nodeId": "gjizarTradheti",
    "lineIndex": 6,
    "placeId": "gjizarTradheti",
    "text": "Vëllezërit përgjigjen: eja; ne shkojmë tani te babai ynë. ata presin pranë teje te rruga.",
    "conditions": {
      "all": [
        "flag:gjizarBrothersAgreement"
      ],
      "negate": false,
      "none": [
        "flag:gjizarWentWithBrothers"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-brothers",
        "asset": "human",
        "label": "Two brothers",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Brothers visibly wait beside the road and invite departure."
  },
  {
    "id": "description:gjizarTradheti:7",
    "nodeId": "gjizarTradheti",
    "lineIndex": 7,
    "placeId": "gjizarTradheti",
    "text": "ti shkon nga gurët me vëllezërit te babai yt. Në rrugë, ata kërkojnë ujë, marrin Gjizar dhe të hedhin në një pus.",
    "conditions": {
      "all": [
        "from:gjizarTradheti",
        "arrival:action:gjizar-go-with-brothers"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-well",
        "asset": "well",
        "label": "Deep well",
        "zone": "front",
        "attributes": {
          "depth": 18
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The journey culminates in the well after the brothers take the bird; the arrival does not place either brother or Gjizar at the trapped player’s level."
  },
  {
    "id": "description:gjizarTradheti:8",
    "nodeId": "gjizarTradheti",
    "lineIndex": 8,
    "placeId": "gjizarTradheti",
    "text": "pusi është i thellë dhe i errët.",
    "conditions": {
      "all": [
        "flag:gjizarWentWithBrothers"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-well",
        "asset": "well",
        "label": "Deep well",
        "zone": "front",
        "attributes": {
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
    "rationale": "The well is deep and dark."
  },
  {
    "id": "description:gjizarTradheti:9",
    "nodeId": "gjizarTradheti",
    "lineIndex": 9,
    "placeId": "gjizarTradheti",
    "text": "ti je në ujë.",
    "conditions": {
      "all": [
        "flag:gjizarWentWithBrothers"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-well-water",
        "asset": "water",
        "label": "Water in the well",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The trapped player is in water at the bottom of the well."
  },
  {
    "id": "description:gjizarTradheti:10",
    "nodeId": "gjizarTradheti",
    "lineIndex": 10,
    "placeId": "gjizarTradheti",
    "text": "Njerëzit e mbretit rrinë mbi pusin. një ul një litar.",
    "conditions": {
      "all": [
        "flag:gjizarWentWithBrothers"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-rescuers",
        "asset": "human",
        "label": "The king’s men above the well",
        "zone": "above",
        "attributes": {},
        "count": 2,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "rescue-rope",
        "asset": "rope",
        "label": "Lowered rescue rope",
        "zone": "above",
        "attributes": {
          "hanging": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The king’s men are visibly above the shaft and one lowers the rescue rope; neither the king nor Bukura is asserted at the rim."
  },
  {
    "id": "description:gjizarUnazatLena:0",
    "nodeId": "gjizarUnazatLena",
    "lineIndex": 0,
    "placeId": "gjizarTradheti",
    "text": "ti lë unazat nën gurin.",
    "conditions": {
      "all": [
        "arrival:action:gjizar-leave-rings"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "brothers-rings",
        "asset": "ring",
        "label": "Three rings",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "three-stones",
        "asset": "stone",
        "label": "Three stones",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "brothers-rings",
        "kind": "under",
        "target": "three-stones"
      }
    ],
    "disposition": "physical",
    "rationale": "Rings stay below stone."
  },
  {
    "id": "description:gjizarUnazatLena:1",
    "nodeId": "gjizarUnazatLena",
    "lineIndex": 1,
    "placeId": "gjizarTradheti",
    "text": "pa unazat, vëllezërit nuk të njohin, dhe Gjizar nuk flet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-brothers",
        "asset": "human",
        "label": "Two brothers",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "persistence": "scene"
      },
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The brothers do not recognize the player; the bird remains silent."
  },
  {
    "id": "description:gjizarVellezerRefuz:0",
    "nodeId": "gjizarVellezerRefuz",
    "lineIndex": 0,
    "placeId": "gjizarTradheti",
    "text": "ti përgjigjesh: jo. ti rri pranë gurëve me Gjizar.",
    "conditions": {
      "all": [
        "arrival:action:gjizar-refuse-brothers"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "three-stones",
        "asset": "stone",
        "label": "Three stones",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Three stones, Gjizar; only the represented moment is staged."
  },
  {
    "id": "description:gjizarVellezerRefuz:1",
    "nodeId": "gjizarVellezerRefuz",
    "lineIndex": 1,
    "placeId": "gjizarTradheti",
    "text": "Vëllezërit ikin pa zogun; tre shqiponjat të ruajnë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "three-eagles",
        "asset": "eagle",
        "label": "Three eagles",
        "zone": "around",
        "attributes": {},
        "count": 3,
        "persistence": "scene"
      },
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "gjizar-brothers",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Brothers have left without taking the bird."
  },
  {
    "id": "description:gjizarVellezerRefuz:2",
    "nodeId": "gjizarVellezerRefuz",
    "lineIndex": 2,
    "placeId": "gjizarTradheti",
    "text": "Në agim, Gjizar këndon për ty mes gurëve.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "gjizar-bird",
        "asset": "bird",
        "label": "Gjizar",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "three-stones",
        "asset": "stone",
        "label": "Three stones",
        "zone": "around",
        "attributes": {},
        "count": 3,
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
    "rationale": "Bird sings among stones at dawn."
  },
  {
    "id": "description:gjizarPus:0",
    "nodeId": "gjizarPus",
    "lineIndex": 0,
    "placeId": "gjizarTradheti",
    "text": "ti rri në pus, në errësirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "deep-well",
        "asset": "well",
        "label": "Deep well",
        "zone": "front",
        "attributes": {
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
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "deep-well"
      }
    ],
    "disposition": "physical",
    "rationale": "The player is trapped inside the dark shaft."
  },
  {
    "id": "description:gjizarPus:1",
    "nodeId": "gjizarPus",
    "lineIndex": 1,
    "placeId": "gjizarTradheti",
    "text": "Vëllezërit kanë zogun tani.",
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
    "rationale": "The brothers possess the bird away from the trapped player; do not put them at the shaft bottom."
  },
  {
    "id": "description:gjizarPus:2",
    "nodeId": "gjizarPus",
    "lineIndex": 2,
    "placeId": "gjizarTradheti",
    "text": "por zogu nuk flet.",
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
    "rationale": "The brothers possess the bird away from the trapped player; do not put them at the shaft bottom."
  },
  {
    "id": "description:gjizarPus:3",
    "nodeId": "gjizarPus",
    "lineIndex": 3,
    "placeId": "gjizarTradheti",
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
    "rationale": "The run-ending status has no physical geometry."
  },
  {
    "id": "description:tre1:0",
    "nodeId": "tre1",
    "lineIndex": 0,
    "placeId": "tre1",
    "text": "ti ec poshtë në botën tjetër. ti sheh një shtëpi me një dritë prej ari.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "first-beauty-house",
        "asset": "house",
        "label": "Golden-lit house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Golden-lit house; only the represented moment is staged."
  },
  {
    "id": "description:tre1:1",
    "nodeId": "tre1",
    "lineIndex": 1,
    "placeId": "tre1",
    "text": "brenda Bukura bën ar, dhe drita lëviz çuditshëm në mure.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "beauty-gold",
        "asset": "gold",
        "label": "Gold",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "golden-light",
        "asset": "light-ray",
        "label": "Golden light",
        "zone": "front",
        "attributes": {
          "color": "gold"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Earth, Gold, Golden light; only the represented moment is staged."
  },
  {
    "id": "description:tre1:2",
    "nodeId": "tre1",
    "lineIndex": 2,
    "placeId": "tre1",
    "text": "Natën, drita prej ar lëviz mbi mure.",
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
        "key": "golden-light",
        "asset": "light-ray",
        "label": "Golden light",
        "zone": "front",
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
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Golden light crosses walls at night."
  },
  {
    "id": "description:tre2:0",
    "nodeId": "tre2",
    "lineIndex": 0,
    "placeId": "tre1",
    "text": "ti sheh një shtëpi tjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "second-beauty-house",
        "asset": "house",
        "label": "Second house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Second house; only the represented moment is staged."
  },
  {
    "id": "description:tre2:1",
    "nodeId": "tre2",
    "lineIndex": 1,
    "placeId": "tre1",
    "text": "Bukura tjetër është më e bukur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "second-beauty",
        "asset": "human",
        "label": "Second Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Second Beauty; only the represented moment is staged."
  },
  {
    "id": "description:tre2:2",
    "nodeId": "tre2",
    "lineIndex": 2,
    "placeId": "tre1",
    "text": "Bukura thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "second-beauty",
        "asset": "human",
        "label": "Second Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The second Beauty reports the captor and water elsewhere."
  },
  {
    "id": "description:tre2:3",
    "nodeId": "tre2",
    "lineIndex": 3,
    "placeId": "tre1",
    "text": "kulshedra ka ujë dhe Bukurën",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "second-beauty",
        "asset": "human",
        "label": "Second Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The second Beauty reports the captor and water elsewhere."
  },
  {
    "id": "description:tre3:0",
    "nodeId": "tre3",
    "lineIndex": 0,
    "placeId": "tre1",
    "text": "një shtëpi tjetër është këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "third-beauty-house",
        "asset": "house",
        "label": "Third house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Third house; only the represented moment is staged."
  },
  {
    "id": "description:tre3:1",
    "nodeId": "tre3",
    "lineIndex": 1,
    "placeId": "tre1",
    "text": "Bukura rri këtu, më e bukur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "third-beauty",
        "asset": "human",
        "label": "Third Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Third Beauty; only the represented moment is staged."
  },
  {
    "id": "description:tre3:2",
    "nodeId": "tre3",
    "lineIndex": 2,
    "placeId": "tre1",
    "text": "Bukura thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "third-beauty",
        "asset": "human",
        "label": "Third Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The third Beauty speaks while the player listens; the proposed weapon is not conjured."
  },
  {
    "id": "description:tre3:3",
    "nodeId": "tre3",
    "lineIndex": 3,
    "placeId": "tre1",
    "text": "shpata vret kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "third-beauty",
        "asset": "human",
        "label": "Third Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The third Beauty speaks while the player listens; the proposed weapon is not conjured."
  },
  {
    "id": "description:tre3:4",
    "nodeId": "tre3",
    "lineIndex": 4,
    "placeId": "tre1",
    "text": "ti dëgjo Bukurën.",
    "conditions": {
      "all": [
        "arrival:action:tre3-listen-beauty"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "third-beauty",
        "asset": "human",
        "label": "Third Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The third Beauty speaks while the player listens; the proposed weapon is not conjured."
  },
  {
    "id": "description:tre3:5",
    "nodeId": "tre3",
    "lineIndex": 5,
    "placeId": "tre1",
    "text": "Bukura tregon një rrugë të errët që shkon poshtë.",
    "conditions": {
      "all": [
        "flag:heardBeautyDarkRoad"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "third-beauty",
        "asset": "human",
        "label": "Third Beauty",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Third Beauty, Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:udhetimi1:0",
    "nodeId": "udhetimi1",
    "lineIndex": 0,
    "placeId": "udhetimi1",
    "text": "ti merr rrugën e errët poshtë.",
    "conditions": {
      "all": [
        "from:tre3"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:udhetimi1:1",
    "nodeId": "udhetimi1",
    "lineIndex": 1,
    "placeId": "udhetimi1",
    "text": "Era fishkëllen mes gurëve të rrugës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Wind among road stones is audible."
  },
  {
    "id": "description:udhetimi1:2",
    "nodeId": "udhetimi1",
    "lineIndex": 2,
    "placeId": "udhetimi1",
    "text": "këtu rrinë shumë njerëz guri: askush nuk lëviz.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "stone-people",
        "asset": "statue",
        "label": "Stone people",
        "zone": "around",
        "attributes": {},
        "count": 5,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Stone people; only the represented moment is staged."
  },
  {
    "id": "description:udhetimi1:3",
    "nodeId": "udhetimi1",
    "lineIndex": 3,
    "placeId": "udhetimi1",
    "text": "por ti vazhdon.",
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
    "rationale": "The player continues; the same road persists."
  },
  {
    "id": "description:udhetimi2:0",
    "nodeId": "udhetimi2",
    "lineIndex": 0,
    "placeId": "udhetimi2",
    "text": "këtu rri një dash i bardhë dhe një dash i zi.",
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
        "zone": "front",
        "attributes": {
          "color": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "black-ram",
        "asset": "ram",
        "label": "Black ram",
        "zone": "front",
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
    "rationale": "The visible beat establishes White ram, Black ram; only the represented moment is staged."
  },
  {
    "id": "description:udhetimi2:1",
    "nodeId": "udhetimi2",
    "lineIndex": 1,
    "placeId": "udhetimi2",
    "text": "Dashi i bardhë pret qetë si mik; dashi i zi godet tokën.",
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
        "zone": "front",
        "attributes": {
          "color": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "black-ram",
        "asset": "ram",
        "label": "Black ram",
        "zone": "front",
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
    "rationale": "The visible beat establishes White ram, Black ram; only the represented moment is staged."
  },
  {
    "id": "description:udhetimi2:2",
    "nodeId": "udhetimi2",
    "lineIndex": 2,
    "placeId": "udhetimi2",
    "text": "Në agim, dashi i bardhë rri në dritën e parë.",
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
        "key": "white-ram",
        "asset": "ram",
        "label": "White ram",
        "zone": "front",
        "attributes": {
          "color": "white"
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
    "rationale": "The first light illuminates the white ram."
  },
  {
    "id": "description:bukuraThellesi:0",
    "nodeId": "bukuraThellesi",
    "lineIndex": 0,
    "placeId": "bukura1",
    "text": "Bukura thotë:",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and explains captivity and the robe; reported possessions remain with the captor."
  },
  {
    "id": "description:bukuraThellesi:1",
    "nodeId": "bukuraThellesi",
    "lineIndex": 1,
    "placeId": "bukura1",
    "text": "unë jam Bukura e Dheut.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and explains captivity and the robe; reported possessions remain with the captor."
  },
  {
    "id": "description:bukuraThellesi:2",
    "nodeId": "bukuraThellesi",
    "lineIndex": 2,
    "placeId": "bukura1",
    "text": "kulshedra ka mua dhe ujë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and explains captivity and the robe; reported possessions remain with the captor."
  },
  {
    "id": "description:bukuraThellesi:3",
    "nodeId": "bukuraThellesi",
    "lineIndex": 3,
    "placeId": "bukura1",
    "text": "kulshedra ka rrobën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and explains captivity and the robe; reported possessions remain with the captor."
  },
  {
    "id": "description:bukuraThellesi:4",
    "nodeId": "bukuraThellesi",
    "lineIndex": 4,
    "placeId": "bukura1",
    "text": "rroba ka fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and explains captivity and the robe; reported possessions remain with the captor."
  },
  {
    "id": "description:bukuraThellesi:5",
    "nodeId": "bukuraThellesi",
    "lineIndex": 5,
    "placeId": "bukura1",
    "text": "ti shpëto mua dhe ujë vjen përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and explains captivity and the robe; reported possessions remain with the captor."
  },
  {
    "id": "description:kulshLufte1:0",
    "nodeId": "kulshLufte1",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "dielli është lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "battle-sun",
        "asset": "sun",
        "label": "Sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sun; only the represented moment is staged."
  },
  {
    "id": "description:kulshLufte1:1",
    "nodeId": "kulshLufte1",
    "lineIndex": 1,
    "placeId": "kulshedra1",
    "text": "kulshedra e ha.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "battle-sun",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Kulshedra consumes the Sun; the visible solar disk is removed. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshLufte1:2",
    "nodeId": "kulshLufte1",
    "lineIndex": 2,
    "placeId": "kulshedra1",
    "text": "është errët si natën.",
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
    "rationale": "The consumed Sun leaves night-like darkness."
  },
  {
    "id": "description:kulshLufte1:3",
    "nodeId": "kulshLufte1",
    "lineIndex": 3,
    "placeId": "kulshedra1",
    "text": "nga qielli vjen një vajzë me rrufe.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-moon-daughter",
        "asset": "human",
        "label": "Daughter of Sun and Moon",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maiden-lightning",
        "asset": "lightning",
        "label": "Thunderbolt",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Daughter of Sun and Moon, Thunderbolt; only the represented moment is staged."
  },
  {
    "id": "description:kulshLufte1:4",
    "nodeId": "kulshLufte1",
    "lineIndex": 4,
    "placeId": "kulshedra1",
    "text": "ti lufto kulshedrën",
    "conditions": {
      "all": [
        "arrival:action:story:kulshedra1:lufto-kulshedra"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The battle is physical; strength and blessing are nonvisual support. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshLufte1:5",
    "nodeId": "kulshLufte1",
    "lineIndex": 5,
    "placeId": "kulshedra1",
    "text": "ti lufto me fuqi",
    "conditions": {
      "all": [
        "arrival:action:story:kulshedra1:lufto-me-fuqi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The battle is physical; strength and blessing are nonvisual support. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshLufte1:6",
    "nodeId": "kulshLufte1",
    "lineIndex": 6,
    "placeId": "kulshedra1",
    "text": "ti lufto me bekim",
    "conditions": {
      "all": [
        "arrival:action:story:kulshedra1:lufto-me-bekim"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The battle is physical; strength and blessing are nonvisual support. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:bijaHene1:0",
    "nodeId": "bijaHene1",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "vajza është bijë e Diellit dhe Hënës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-moon-daughter",
        "asset": "human",
        "label": "Daughter of Sun and Moon",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maiden’s parentage does not bring both parents into this scene."
  },
  {
    "id": "description:bijaHene1:1",
    "nodeId": "bijaHene1",
    "lineIndex": 1,
    "placeId": "kulshedra1",
    "text": "Vajza mban rrufenë në dorë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-moon-daughter",
        "asset": "human",
        "label": "Maiden",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maiden-lightning",
        "asset": "lightning",
        "label": "Thunderbolt",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:sun-moon-daughter",
        "kind": "holds",
        "target": "maiden-lightning"
      }
    ],
    "disposition": "physical",
    "rationale": "The maiden holds the thunderbolt."
  },
  {
    "id": "description:bijaHene1:2",
    "nodeId": "bijaHene1",
    "lineIndex": 2,
    "placeId": "kulshedra1",
    "text": "vajza do të luftojë kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-moon-daughter",
        "asset": "human",
        "label": "Maiden",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Intention to fight is not yet a defeat."
  },
  {
    "id": "description:bijaHeneFund:0",
    "nodeId": "bijaHeneFund",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "Rrufeja e vajzës vret kulshedrën. dielli vjen përsëri, dhe shiu fillon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "dead": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "battle-sun",
        "asset": "sun",
        "label": "Returned sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maiden-lightning",
        "asset": "lightning",
        "label": "Lightning",
        "zone": "front",
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
      },
      {
        "key": "environment",
        "property": "light",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The lightning kills the dragon; sun returns and rain starts. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshLufte2:0",
    "nodeId": "kulshLufte2",
    "lineIndex": 0,
    "placeId": "kulshedra1",
    "text": "kulshedra ka shumë kokë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Many heads remain/regrow; five is representative, not an invented exact canon count. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshLufte2:1",
    "nodeId": "kulshLufte2",
    "lineIndex": 1,
    "placeId": "kulshedra1",
    "text": "ti pret një kokë por kulshedra ka kokë përsëri.",
    "conditions": {
      "all": [
        "flag:kulshFirstHeadPlayer"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Many heads remain/regrow; five is representative, not an invented exact canon count. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:kulshLufte2:2",
    "nodeId": "kulshLufte2",
    "lineIndex": 2,
    "placeId": "kulshedra1",
    "text": "ti lufton pranë ujkut dhe ndaloni një kokë, por kulshedra ka një kokë tjetër.",
    "conditions": {
      "all": [
        "flag:kulshFirstHeadWolf"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "wolf-companion",
        "asset": "wolf",
        "label": "Wolf",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra, Wolf; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:springReturn:0",
    "nodeId": "springReturn",
    "lineIndex": 0,
    "placeId": "springReturn",
    "text": "kulshedra vdes.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:kulshedra",
        "asset": "dragon",
        "label": "Kulshedra",
        "zone": "front",
        "attributes": {
          "heads": 5,
          "dead": true,
          "headCountExact": false
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra; only the represented moment is staged. The pictured head count is representative: the source gives an unspecified plurality."
  },
  {
    "id": "description:springReturn:1",
    "nodeId": "springReturn",
    "lineIndex": 1,
    "placeId": "springReturn",
    "text": "ujë po vjen përsëri në botën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-river",
        "asset": "river",
        "label": "Restored water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Restored water; only the represented moment is staged."
  },
  {
    "id": "description:springReturn:2",
    "nodeId": "springReturn",
    "lineIndex": 2,
    "placeId": "springReturn",
    "text": "bota është gjallë përsëri.",
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
    "rationale": "World restoration is a conclusion; the next line supplies visible fields and flowers."
  },
  {
    "id": "description:springReturn:3",
    "nodeId": "springReturn",
    "lineIndex": 3,
    "placeId": "springReturn",
    "text": "Bukura është e sigurt.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Earth; only the represented moment is staged."
  },
  {
    "id": "description:springReturn:4",
    "nodeId": "springReturn",
    "lineIndex": 4,
    "placeId": "springReturn",
    "text": "Uji kthehet në arat e gjelbra, dhe lulet hapen.",
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
        "key": "restored-fields",
        "asset": "field",
        "label": "Green fields",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "restored-river",
        "asset": "river",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "restored-flowers",
        "asset": "flower",
        "label": "Flowers",
        "zone": "around",
        "attributes": {},
        "count": 8,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Green fields, Water, Flowers; only the represented moment is staged."
  },
  {
    "id": "description:springReturn:5",
    "nodeId": "springReturn",
    "lineIndex": 5,
    "placeId": "springReturn",
    "text": "pranë ujit, rruga ngjitet drejt pusit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "restored-river",
        "asset": "river",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Road through the lower world, Water; only the represented moment is staged."
  },
  {
    "id": "description:springReturn:6",
    "nodeId": "springReturn",
    "lineIndex": 6,
    "placeId": "springReturn",
    "text": "Bukura thotë: eja me mua te ana; unë kthehem poshtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty invites the climb; departure follows the choice."
  },
  {
    "id": "description:bukuraKthim:0",
    "nodeId": "bukuraKthim",
    "lineIndex": 0,
    "placeId": "bukuraKthim",
    "text": "ti ecën me Bukurën te ana. ajo sheh poshtë dhe thotë:",
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
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-road",
        "asset": "road",
        "label": "Road through the lower world",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Earth, Road through the lower world; only the represented moment is staged."
  },
  {
    "id": "description:bukuraKthim:1",
    "nodeId": "bukuraKthim",
    "lineIndex": 1,
    "placeId": "bukuraKthim",
    "text": "unë jam Bukura e Dheut.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and announces her return below."
  },
  {
    "id": "description:bukuraKthim:2",
    "nodeId": "bukuraKthim",
    "lineIndex": 2,
    "placeId": "bukuraKthim",
    "text": "unë kthehem poshtë përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Beauty identifies herself and announces her return below."
  },
  {
    "id": "description:bukuraKthim:3",
    "nodeId": "bukuraKthim",
    "lineIndex": 3,
    "placeId": "bukuraKthim",
    "text": "por uji qëndron në botë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-river",
        "asset": "river",
        "label": "Water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Water; only the represented moment is staged."
  },
  {
    "id": "description:bukuraKthim:4",
    "nodeId": "bukuraKthim",
    "lineIndex": 4,
    "placeId": "bukuraKthim",
    "text": "Bukura thotë: eja; ngjitemi bashkë te pusi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Invitation to climb together, no premature well arrival."
  },
  {
    "id": "description:botaHumbur:0",
    "nodeId": "botaHumbur",
    "lineIndex": 0,
    "placeId": "botaHumbur",
    "text": "ti je poshtë, në botën tjetër; errësira është kudo dhe ti nuk sheh rrugën.",
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
    "rationale": "Darkness prevents seeing the path; no visible path is added."
  },
  {
    "id": "description:botaHumbur:1",
    "nodeId": "botaHumbur",
    "lineIndex": 1,
    "placeId": "botaHumbur",
    "text": "Poshtë, bota ka një qiell tjetër.",
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
        "property": "sky",
        "value": "otherworld"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The lower world has its own sky."
  },
  {
    "id": "description:botaHumbur:2",
    "nodeId": "botaHumbur",
    "lineIndex": 2,
    "placeId": "botaHumbur",
    "text": "lart larg është udhëkryq.",
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
    "rationale": "The crossroads is far above, not beside this lost viewpoint."
  },
  {
    "id": "description:zbritjaThelle:0",
    "nodeId": "zbritjaThelle",
    "lineIndex": 0,
    "placeId": "zbritjaThelle",
    "text": "ti zbret poshtë në errësirë.",
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
    "rationale": "Descent into darkness."
  },
  {
    "id": "description:zbritjaThelle:1",
    "nodeId": "zbritjaThelle",
    "lineIndex": 1,
    "placeId": "zbritjaThelle",
    "text": "këtu është ftohtë si në varr.",
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
        "property": "temperature",
        "value": "cold"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Cold like a grave is a comparison, not a grave prop."
  },
  {
    "id": "description:zbritjaThelle:2",
    "nodeId": "zbritjaThelle",
    "lineIndex": 2,
    "placeId": "zbritjaThelle",
    "text": "Uji ngrin mbi gurë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "frozen-rock",
        "asset": "rock",
        "label": "Stones with frozen water",
        "zone": "front",
        "attributes": {
          "ice": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Stones with frozen water; only the represented moment is staged."
  },
  {
    "id": "description:zbritjaThelle:3",
    "nodeId": "zbritjaThelle",
    "lineIndex": 3,
    "placeId": "zbritjaThelle",
    "text": "shumë hije rrinë këtu, pa zë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "silent-shadows",
        "asset": "shadow",
        "label": "Silent shadows",
        "zone": "around",
        "attributes": {},
        "count": 5,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Silent shadows; only the represented moment is staged."
  },
  {
    "id": "description:zbritjaThelle:4",
    "nodeId": "zbritjaThelle",
    "lineIndex": 4,
    "placeId": "zbritjaThelle",
    "text": "një hije thotë: këtu vjen erë e një njeriu të gjallë!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "speaking-shadow",
        "asset": "shadow",
        "label": "Speaking shadow",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "A visible shadow speaks about the player’s smell."
  },
  {
    "id": "description:qeniGate:0",
    "nodeId": "qeniGate",
    "lineIndex": 0,
    "placeId": "bota1",
    "text": "një qen i madh rri këtu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-dog",
        "asset": "dog",
        "label": "Large dog",
        "zone": "front",
        "attributes": {
          "large": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Large dog; only the represented moment is staged."
  },
  {
    "id": "description:qeniGate:1",
    "nodeId": "qeniGate",
    "lineIndex": 1,
    "placeId": "bota1",
    "text": "qeni ruan derën e Bukurës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-dog",
        "asset": "dog",
        "label": "Dog",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Dog, Guarded door; only the represented moment is staged."
  },
  {
    "id": "description:qeniGate:2",
    "nodeId": "qeniGate",
    "lineIndex": 2,
    "placeId": "bota1",
    "text": "qeni nuk fle.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-dog",
        "asset": "dog",
        "label": "Awake dog",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Awake dog; only the represented moment is staged."
  },
  {
    "id": "description:qeniGate:3",
    "nodeId": "qeniGate",
    "lineIndex": 3,
    "placeId": "bota1",
    "text": "ti dëgjon frymën e qenit në errësirë.",
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
    "rationale": "Dog breath is heard in darkness, with the dog established by adjacent visible prose."
  },
  {
    "id": "description:qeniGate:4",
    "nodeId": "qeniGate",
    "lineIndex": 4,
    "placeId": "bota1",
    "text": "Fjalët në derën thonë: qeni që leh nuk kafshon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "guarded-door",
        "property": "inscription",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Door inscription states a proverb."
  },
  {
    "id": "description:qeniGate:5",
    "nodeId": "qeniGate",
    "lineIndex": 5,
    "placeId": "bota1",
    "text": "por qeni nuk leh.",
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
    "rationale": "Absence of barking is auditory."
  },
  {
    "id": "description:qeniGate:6",
    "nodeId": "qeniGate",
    "lineIndex": 6,
    "placeId": "bota1",
    "text": "ti thirr Orën. ajo rri para qenit; qeni ul kokën dhe lëviz nga dera.",
    "conditions": {
      "all": [
        "arrival:action:underworld-dog-call-ora"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:ora",
        "asset": "spirit",
        "label": "Ora",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "underworld-dog",
        "asset": "dog",
        "label": "Dog",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "underworld-dog",
        "kind": "beside",
        "target": "guarded-door"
      }
    ],
    "disposition": "physical",
    "rationale": "Ora stands before the dog and it clears the doorway."
  },
  {
    "id": "description:qeniGate:7",
    "nodeId": "qeniGate",
    "lineIndex": 7,
    "placeId": "bota1",
    "text": "ti jep bukën qenit. ai ha dhe lëviz nga dera.",
    "conditions": {
      "all": [
        "arrival:action:underworld-dog-give-bread"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-dog",
        "asset": "dog",
        "label": "Eating dog",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "dog-bread",
        "asset": "bread",
        "label": "Bread",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "guarded-door",
        "asset": "door",
        "label": "Guarded door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "underworld-dog",
        "kind": "beside",
        "target": "guarded-door"
      }
    ],
    "disposition": "physical",
    "rationale": "Fed dog clears the doorway."
  },
  {
    "id": "description:ujiShpella:0",
    "nodeId": "ujiShpella",
    "lineIndex": 0,
    "placeId": "ujiShpella",
    "text": "ti ecën në një shpellë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "underworld-cave",
        "asset": "cave",
        "label": "Cave",
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
    "rationale": "The player walks within a cave, whose following line explicitly establishes a dark interior."
  },
  {
    "id": "description:ujiShpella:1",
    "nodeId": "ujiShpella",
    "lineIndex": 1,
    "placeId": "ujiShpella",
    "text": "brenda është errët, dhe ti dëgjon ujë.",
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
    "rationale": "Water is heard in the dark cave; sound alone does not place a visible lake."
  },
  {
    "id": "description:ujiShpella:2",
    "nodeId": "ujiShpella",
    "lineIndex": 2,
    "placeId": "ujiShpella",
    "text": "ti sheh Bukurën në mur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "prison-wall",
        "asset": "wall",
        "label": "Wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:bukura",
        "kind": "near",
        "target": "prison-wall"
      }
    ],
    "disposition": "physical",
    "rationale": "Beauty is against the wall."
  },
  {
    "id": "description:bukuraLirim:0",
    "nodeId": "bukuraLirim",
    "lineIndex": 0,
    "placeId": "bukura1",
    "text": "Bukura është në mur, me hekur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "prison-wall",
        "asset": "wall",
        "label": "Wall",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "binding-iron",
        "asset": "chain",
        "label": "Iron bonds",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "binding-iron",
        "kind": "near",
        "target": "actor:bukura"
      }
    ],
    "disposition": "physical",
    "rationale": "Iron binds the Beauty to the wall."
  },
  {
    "id": "description:bukuraLirim:1",
    "nodeId": "bukuraLirim",
    "lineIndex": 1,
    "placeId": "bukura1",
    "text": "ti shpëton Bukurën; hekuri bie.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:bukura",
        "asset": "human",
        "label": "Beauty of the Earth",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "binding-iron",
        "asset": "chain",
        "label": "Fallen iron",
        "zone": "front",
        "attributes": {
          "fallen": true
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Beauty of the Earth, Fallen iron; only the represented moment is staged."
  },
  {
    "id": "description:oraVerdhe:0",
    "nodeId": "oraVerdhe",
    "lineIndex": 0,
    "placeId": "humbur",
    "text": "Ora flet, por zëri i saj vjen nga çdo rrugë.",
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
    "rationale": "Disembodied Ora voice comes from every road; not multiple visible Oras."
  },
  {
    "id": "description:oraVerdhe:1",
    "nodeId": "oraVerdhe",
    "lineIndex": 1,
    "placeId": "humbur",
    "text": "Drita e saj nuk është më, dhe ti je ende i humbur poshtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "ora-light",
        "property": "present",
        "value": false
      },
      {
        "key": "environment",
        "property": "light",
        "value": "dark"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Her light is gone and the player remains lost."
  },
  {
    "id": "description:prende1:0",
    "nodeId": "prende1",
    "lineIndex": 0,
    "placeId": "uji",
    "text": "këtu rri Prende, zonja e agimit, e bukur si agimi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Prende; only the represented moment is staged."
  },
  {
    "id": "description:prende1:1",
    "nodeId": "prende1",
    "lineIndex": 1,
    "placeId": "uji",
    "text": "ajo është ylli i mëngjesit që vjen përpara diellit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Morning-star identity is lore, not a duplicate star body beside Prende."
  },
  {
    "id": "description:prende1:2",
    "nodeId": "prende1",
    "lineIndex": 2,
    "placeId": "uji",
    "text": "një dallëndyshe fluturon me Prende.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "prende-swallow",
        "asset": "swallow",
        "label": "Swallow",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Prende, Swallow; only the represented moment is staged."
  },
  {
    "id": "description:prende1:3",
    "nodeId": "prende1",
    "lineIndex": 3,
    "placeId": "uji",
    "text": "një ylber vjen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "prende-rainbow",
        "asset": "rainbow",
        "label": "Rainbow",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rainbow; only the represented moment is staged."
  },
  {
    "id": "description:prendeFund:0",
    "nodeId": "prendeFund",
    "lineIndex": 0,
    "placeId": "uji",
    "text": "Prende të jep një bekim.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Prende gives a blessing, which is not a material prop."
  },
  {
    "id": "description:prendeFund:1",
    "nodeId": "prendeFund",
    "lineIndex": 1,
    "placeId": "uji",
    "text": "ujë vjen përsëri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "restored-river",
        "asset": "river",
        "label": "Returning water",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Returning water; only the represented moment is staged."
  }
])
