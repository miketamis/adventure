// Exact reviewed physical claims and nonvisual dispositions, one record per source line.
export default Object.freeze([
  {
    "id": "description:diellShtepi1:0",
    "nodeId": "diellShtepi1",
    "lineIndex": 0,
    "placeId": "diellShtepi1",
    "text": "ti ecën mbi rrezet e diellit.",
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
        "key": "sun-road-rays",
        "asset": "light-ray",
        "label": "Walkable rays of the Sun",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mythic approach is explicitly along sunlight rays, not an ordinary unmentioned bridge."
  },
  {
    "id": "description:diellShtepi1:1",
    "nodeId": "diellShtepi1",
    "lineIndex": 1,
    "placeId": "diellShtepi1",
    "text": "ti je në shtëpinë e diellit: gjithçka këtu është dritë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-house",
        "asset": "palace",
        "label": "House of the Sun",
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
        "value": "bright"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Light fills the Sun’s house."
  },
  {
    "id": "description:diellShtepi1:2",
    "nodeId": "diellShtepi1",
    "lineIndex": 2,
    "placeId": "diellShtepi1",
    "text": "një kulshedër rri te pragu, e madhe dhe e zezë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-house",
        "asset": "palace",
        "label": "House of the Sun",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-oda-door",
        "asset": "door",
        "label": "Door beside the guest-room",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes House of the Sun, Black Kulshedra, Door beside the guest-room; only the represented moment is staged."
  },
  {
    "id": "description:diellShtepi1:3",
    "nodeId": "diellShtepi1",
    "lineIndex": 3,
    "placeId": "diellShtepi1",
    "text": "kulshedra thotë: vajza mban erë mbreti!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Kulshedra speaks about the maiden’s scent; smell does not create a king in the house."
  },
  {
    "id": "description:diellShtepi1:4",
    "nodeId": "diellShtepi1",
    "lineIndex": 4,
    "placeId": "diellShtepi1",
    "text": "diell thotë: mos prek vajzën!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun",
        "asset": "sun",
        "label": "The Sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The present Sun forbids touching the maiden."
  },
  {
    "id": "description:diellShtepi1:5",
    "nodeId": "diellShtepi1",
    "lineIndex": 5,
    "placeId": "diellShtepi1",
    "text": "poshtë rri një kopsht i gjelbër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-garden",
        "asset": "garden",
        "label": "Green garden",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "sun-garden",
        "kind": "below",
        "target": "viewer"
      }
    ],
    "disposition": "physical",
    "rationale": "A green garden lies below the house viewpoint."
  },
  {
    "id": "description:diellKopsht:0",
    "nodeId": "diellKopsht",
    "lineIndex": 0,
    "placeId": "diellKopsht",
    "text": "këtu është një kopsht.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-garden",
        "asset": "garden",
        "label": "Green garden",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Green garden; only the represented moment is staged."
  },
  {
    "id": "description:diellKopsht:1",
    "nodeId": "diellKopsht",
    "lineIndex": 1,
    "placeId": "diellKopsht",
    "text": "vajza merr një lakër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-cabbage",
        "asset": "cabbage",
        "label": "Cabbage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The maiden, Cabbage; only the represented moment is staged."
  },
  {
    "id": "description:diellKopsht:2",
    "nodeId": "diellKopsht",
    "lineIndex": 2,
    "placeId": "diellKopsht",
    "text": "lakra thyhet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-cabbage",
        "asset": "cabbage",
        "label": "Cabbage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "sun-cabbage",
        "property": "broken",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The cabbage breaks in the current action."
  },
  {
    "id": "description:diellKopsht:3",
    "nodeId": "diellKopsht",
    "lineIndex": 3,
    "placeId": "diellKopsht",
    "text": "vajza thotë: zemra e nënës thyhet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The mother’s broken heart is the maiden’s metaphor; do not draw a literal severed heart."
  },
  {
    "id": "description:diellKopsht:4",
    "nodeId": "diellKopsht",
    "lineIndex": 4,
    "placeId": "diellKopsht",
    "text": "vajza vajton.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The same maiden visibly weeps."
  },
  {
    "id": "description:diellKopsht:5",
    "nodeId": "diellKopsht",
    "lineIndex": 5,
    "placeId": "diellKopsht",
    "text": "kur vjen pranvera, lulet hapen pranë lakrës.",
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
        "key": "sun-cabbage",
        "asset": "cabbage",
        "label": "Cabbage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-flowers",
        "asset": "flowers",
        "label": "Flowers beside the cabbage",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Cabbage, Flowers beside the cabbage; only the represented moment is staged."
  },
  {
    "id": "description:diellKopshtFol:0",
    "nodeId": "diellKopshtFol",
    "lineIndex": 0,
    "placeId": "diellKopsht",
    "text": "ajo përgjigjet: po, unë dua nënën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maiden tells her past and directs the player; her remembered mother and the Sun’s past demand are not reenacted in the garden."
  },
  {
    "id": "description:diellKopshtFol:1",
    "nodeId": "diellKopshtFol",
    "lineIndex": 1,
    "placeId": "diellKopsht",
    "text": "pastaj vajza tregon: në rrugën e shkollës Dielli tha: unë dua vajzën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maiden tells her past and directs the player; her remembered mother and the Sun’s past demand are not reenacted in the garden."
  },
  {
    "id": "description:diellKopshtFol:2",
    "nodeId": "diellKopshtFol",
    "lineIndex": 2,
    "placeId": "diellKopsht",
    "text": "nëna e saj u përgjigj: vajza është ende e vogël.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maiden tells her past and directs the player; her remembered mother and the Sun’s past demand are not reenacted in the garden."
  },
  {
    "id": "description:diellKopshtFol:3",
    "nodeId": "diellKopshtFol",
    "lineIndex": 3,
    "placeId": "diellKopsht",
    "text": "Në fund, ajo të thotë: dielli është në odë; fol me të.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maiden tells her past and directs the player; her remembered mother and the Sun’s past demand are not reenacted in the garden."
  },
  {
    "id": "description:diellOda:0",
    "nodeId": "diellOda",
    "lineIndex": 0,
    "placeId": "diellOda",
    "text": "ti del nga kopsht dhe hyn në odën e diellit.",
    "conditions": {
      "all": [
        "from:diellKopshtFol"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-oda",
        "asset": "room",
        "label": "Sun’s guest-room",
        "zone": "center",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-garden",
        "asset": "garden",
        "label": "Green garden",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The viewpoint enters the guest-room after leaving the garden."
  },
  {
    "id": "description:diellOda:1",
    "nodeId": "diellOda",
    "lineIndex": 1,
    "placeId": "diellOda",
    "text": "Dielli rri në odë: fytyra e tij është zjarr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-oda",
        "asset": "room",
        "label": "Sun’s guest-room",
        "zone": "center",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:sun-human",
        "asset": "human",
        "label": "Seated Sun with a face of fire",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "face": "fire"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sun’s guest-room, Seated Sun with a face of fire; only the represented moment is staged."
  },
  {
    "id": "description:diellOda:2",
    "nodeId": "diellOda",
    "lineIndex": 2,
    "placeId": "diellOda",
    "text": "ti e lut Diellin për vajzën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-human",
        "asset": "human",
        "label": "The seated Sun",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "face": "fire"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The player pleads and the Sun replies before any animal is called."
  },
  {
    "id": "description:diellOda:3",
    "nodeId": "diellOda",
    "lineIndex": 3,
    "placeId": "diellOda",
    "text": "Dielli thotë: thirr një kafshë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-human",
        "asset": "human",
        "label": "The seated Sun",
        "zone": "near",
        "attributes": {
          "pose": "sitting",
          "face": "fire"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The player pleads and the Sun replies before any animal is called."
  },
  {
    "id": "description:diellOda:4",
    "nodeId": "diellOda",
    "lineIndex": 4,
    "placeId": "diellOda",
    "text": "Dera rri pranë odës.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-oda-door",
        "asset": "door",
        "label": "Door beside the guest-room",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-oda",
        "asset": "room",
        "label": "Sun’s guest-room",
        "zone": "center",
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
    "rationale": "The visible beat establishes Door beside the guest-room, Sun’s guest-room; only the represented moment is staged."
  },
  {
    "id": "description:diellThirrKul:0",
    "nodeId": "diellThirrKul",
    "lineIndex": 0,
    "placeId": "diellThirrKul",
    "text": "ti del nga oda dhe shko te dera.",
    "conditions": {
      "all": [
        "from:diellOda"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-oda-door",
        "asset": "door",
        "label": "Door beside the guest-room",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-oda",
        "asset": "room",
        "label": "Sun’s guest-room",
        "zone": "center",
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
    "rationale": "The visible beat establishes Door beside the guest-room, Sun’s guest-room; only the represented moment is staged."
  },
  {
    "id": "description:diellThirrKul:1",
    "nodeId": "diellThirrKul",
    "lineIndex": 1,
    "placeId": "diellThirrKul",
    "text": "asnjë kafshë nuk pret jashtë derës ende.",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "sun-door-kulshedra",
        "property": "present",
        "value": false
      },
      {
        "key": "sun-stag",
        "property": "present",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "absence",
    "rationale": "No animal has arrived beyond the door yet."
  },
  {
    "id": "description:diellThirrKul:2",
    "nodeId": "diellThirrKul",
    "lineIndex": 2,
    "placeId": "diellThirrKul",
    "text": "ti thirr: kafshë, hajde!",
    "conditions": {
      "all": [
        "arrival:action:diell-call-animal"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player calls before the animal arrives; the call alone does not create an animal."
  },
  {
    "id": "description:diellThirrKul:3",
    "nodeId": "diellThirrKul",
    "lineIndex": 3,
    "placeId": "diellThirrKul",
    "text": "një kulshedër vjen te dera, dhe oda bëhet e errët.",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-oda-door",
        "asset": "door",
        "label": "Door beside the guest-room",
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
    "rationale": "The called Kulshedra arrives and the room darkens."
  },
  {
    "id": "description:diellThirrKul:4",
    "nodeId": "diellThirrKul",
    "lineIndex": 4,
    "placeId": "diellThirrKul",
    "text": "kulshedra thotë: unë ha vajzën!",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Kulshedra threatens eating and drinking blood; neither threatened outcome is rendered as already completed."
  },
  {
    "id": "description:diellThirrKul:5",
    "nodeId": "diellThirrKul",
    "lineIndex": 5,
    "placeId": "diellThirrKul",
    "text": "kulshedra thotë: unë pi gjakun!",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Kulshedra threatens eating and drinking blood; neither threatened outcome is rendered as already completed."
  },
  {
    "id": "description:diellThirrKul:6",
    "nodeId": "diellThirrKul",
    "lineIndex": 6,
    "placeId": "diellThirrKul",
    "text": "Dielli thotë: jo kulshedra!",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-human",
        "asset": "human",
        "label": "The Sun",
        "zone": "near",
        "attributes": {
          "face": "fire"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Sun rejects one animal and calls another."
  },
  {
    "id": "description:diellThirrKul:7",
    "nodeId": "diellThirrKul",
    "lineIndex": 7,
    "placeId": "diellThirrKul",
    "text": "Dielli thirr një kafshë tjetër.",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-human",
        "asset": "human",
        "label": "The Sun",
        "zone": "near",
        "attributes": {
          "face": "fire"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The Sun rejects one animal and calls another."
  },
  {
    "id": "description:diellThirrKul:8",
    "nodeId": "diellThirrKul",
    "lineIndex": 8,
    "placeId": "diellThirrKul",
    "text": "vajza thotë: unë zgjedh një dre.",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The maiden chooses a stag before it arrives."
  },
  {
    "id": "description:diellThirrKul:9",
    "nodeId": "diellThirrKul",
    "lineIndex": 9,
    "placeId": "diellThirrKul",
    "text": "një dre vjen te dera dhe pret të ikë me ty në rrugë.",
    "conditions": {
      "all": [
        "flag:diellAnimalCalled"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-oda-door",
        "asset": "door",
        "label": "Door beside the guest-room",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The arriving stag waits at the door for departure."
  },
  {
    "id": "description:diellKulVdes:0",
    "nodeId": "diellKulVdes",
    "lineIndex": 0,
    "placeId": "diellThirrKul",
    "text": "ti mban kulshedrën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The kept monster takes the maiden after the committed choice."
  },
  {
    "id": "description:diellKulVdes:1",
    "nodeId": "diellKulVdes",
    "lineIndex": 1,
    "placeId": "diellThirrKul",
    "text": "kulshedra merr vajzën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-door-kulshedra",
        "asset": "dragon",
        "label": "Black Kulshedra",
        "zone": "front",
        "attributes": {
          "color": "#24262b",
          "size": "large"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The kept monster takes the maiden after the committed choice."
  },
  {
    "id": "description:diellKulVdes:2",
    "nodeId": "diellKulVdes",
    "lineIndex": 2,
    "placeId": "diellThirrKul",
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
    "id": "description:rrugaDielli1:0",
    "nodeId": "rrugaDielli1",
    "lineIndex": 0,
    "placeId": "rrugaDielli1",
    "text": "ti del nga shtëpia e diellit me drerin dhe arrin në rrugën e gjatë.",
    "conditions": {
      "all": [
        "from:diellThirrKul"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road",
        "asset": "road",
        "label": "Long road from the Sun’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Long road from the Sun’s house, Stag with antlers; only the represented moment is staged."
  },
  {
    "id": "description:rrugaDielli1:1",
    "nodeId": "rrugaDielli1",
    "lineIndex": 1,
    "placeId": "rrugaDielli1",
    "text": "dreri thotë: unë ha bar dhe pi ujë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stag describes its diet and asks for hay; requested food must not appear automatically."
  },
  {
    "id": "description:rrugaDielli1:2",
    "nodeId": "rrugaDielli1",
    "lineIndex": 2,
    "placeId": "rrugaDielli1",
    "text": "për rrugën e gjatë, më duhet sanë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stag describes its diet and asks for hay; requested food must not appear automatically."
  },
  {
    "id": "description:rrugaDielli1:3",
    "nodeId": "rrugaDielli1",
    "lineIndex": 3,
    "placeId": "rrugaDielli1",
    "text": "nëna sjell sanë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-maiden-mother",
        "asset": "human",
        "label": "The maiden’s mother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "stag-hay",
        "asset": "hay",
        "label": "Hay brought for the stag",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The maiden’s mother, Hay brought for the stag; only the represented moment is staged."
  },
  {
    "id": "description:rrugaDielli1:4",
    "nodeId": "rrugaDielli1",
    "lineIndex": 4,
    "placeId": "rrugaDielli1",
    "text": "dreri merr vajzën në brirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:sun-maiden",
        "kind": "on",
        "target": "sun-stag"
      }
    ],
    "disposition": "physical",
    "rationale": "The maiden rides on the stag’s antlers."
  },
  {
    "id": "description:rrugaDielli1:5",
    "nodeId": "rrugaDielli1",
    "lineIndex": 5,
    "placeId": "rrugaDielli1",
    "text": "pas rrugës, ai është i uritur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The stag is hungry after the journey; no unheld food is supplied."
  },
  {
    "id": "description:rrugaDielli1:6",
    "nodeId": "rrugaDielli1",
    "lineIndex": 6,
    "placeId": "rrugaDielli1",
    "text": "pranë një peme, ai thotë: hip lart!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-road-tree",
        "asset": "tree",
        "label": "Tree beside the long road",
        "zone": "front",
        "attributes": {
          "height": 9
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stag asks the player to climb the tree before the climbing action."
  },
  {
    "id": "description:pemaDielli:0",
    "nodeId": "pemaDielli",
    "lineIndex": 0,
    "placeId": "pemaDielli",
    "text": "ti je lart në pemë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road-tree",
        "asset": "tree",
        "label": "Tree beside the long road",
        "zone": "front",
        "attributes": {
          "height": 9
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player’s camera is high in the tree, not standing beside a duplicate climber."
  },
  {
    "id": "description:pemaDielli:1",
    "nodeId": "pemaDielli",
    "lineIndex": 1,
    "placeId": "pemaDielli",
    "text": "Bora shkrihet nën pemë.",
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
        "key": "sun-road-tree",
        "asset": "tree",
        "label": "Tree beside the long road",
        "zone": "front",
        "attributes": {
          "height": 9
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-tree-snow",
        "asset": "snow",
        "label": "Melting snow beneath the tree",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Tree beside the long road, Melting snow beneath the tree; only the represented moment is staged."
  },
  {
    "id": "description:pemaDielli:2",
    "nodeId": "pemaDielli",
    "lineIndex": 2,
    "placeId": "pemaDielli",
    "text": "një kulshedër vjen poshtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road-kulshedra",
        "asset": "dragon",
        "label": "Kulshedra below the tree",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Kulshedra below the tree; only the represented moment is staged."
  },
  {
    "id": "description:pemaDielli:3",
    "nodeId": "pemaDielli",
    "lineIndex": 3,
    "placeId": "pemaDielli",
    "text": "kulshedra thotë me zë të ëmbël: zbrit, të flasim!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road-kulshedra",
        "asset": "dragon",
        "label": "Kulshedra below the tree",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The monster invites the player to descend; the invitation does not perform the descent."
  },
  {
    "id": "description:pemaDielli:4",
    "nodeId": "pemaDielli",
    "lineIndex": 4,
    "placeId": "pemaDielli",
    "text": "ti thotë: shko në shtëpi. kulshedra ikën nga pema.",
    "conditions": {
      "all": [
        "arrival:action:pema-send-kulshedra-home"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road-kulshedra",
        "asset": "dragon",
        "label": "Departing Kulshedra",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The rejected monster leaves the tree."
  },
  {
    "id": "description:pemaDielli:5",
    "nodeId": "pemaDielli",
    "lineIndex": 5,
    "placeId": "pemaDielli",
    "text": "Dreri pret nën pemë dhe thotë: eja me mua drejt fshatit.",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Waiting stag below the tree",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stag waits below and offers the next departure."
  },
  {
    "id": "description:pemaVdes:0",
    "nodeId": "pemaVdes",
    "lineIndex": 0,
    "placeId": "pemaDielli",
    "text": "vajza zbret.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-road-kulshedra",
        "asset": "dragon",
        "label": "Kulshedra beneath the tree",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The maiden descends and the chosen consequence lets the monster take her."
  },
  {
    "id": "description:pemaVdes:1",
    "nodeId": "pemaVdes",
    "lineIndex": 1,
    "placeId": "pemaDielli",
    "text": "kulshedra ha vajzën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-road-kulshedra",
        "asset": "dragon",
        "label": "Kulshedra beneath the tree",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The maiden descends and the chosen consequence lets the monster take her."
  },
  {
    "id": "description:pemaVdes:2",
    "nodeId": "pemaVdes",
    "lineIndex": 2,
    "placeId": "pemaDielli",
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
    "id": "description:rrugaDielli2:0",
    "nodeId": "rrugaDielli2",
    "lineIndex": 0,
    "placeId": "rrugaDielli2",
    "text": "ti shkon me drerin nga pema drejt fshatit.",
    "conditions": {
      "all": [
        "from:pemaDielli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road",
        "asset": "road",
        "label": "Long road from the Sun’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Long road from the Sun’s house, Stag with antlers; only the represented moment is staged."
  },
  {
    "id": "description:rrugaDielli2:1",
    "nodeId": "rrugaDielli2",
    "lineIndex": 1,
    "placeId": "rrugaDielli2",
    "text": "Dreri vjen përsëri.",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-road",
        "asset": "road",
        "label": "Long road from the Sun’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Long road from the Sun’s house, Stag with antlers; only the represented moment is staged."
  },
  {
    "id": "description:rrugaDielli2:2",
    "nodeId": "rrugaDielli2",
    "lineIndex": 2,
    "placeId": "rrugaDielli2",
    "text": "Dreri do sanë. Mbretëresha sjell sanë.",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sun-maiden-mother",
        "asset": "human",
        "label": "Queen bringing hay",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "stag-hay",
        "asset": "hay",
        "label": "Hay for the stag",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Stag with antlers, Queen bringing hay, Hay for the stag; only the represented moment is staged."
  },
  {
    "id": "description:rrugaDielli2:3",
    "nodeId": "rrugaDielli2",
    "lineIndex": 3,
    "placeId": "rrugaDielli2",
    "text": "një njeri thotë: vajza thirri drerin.",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "A voice reports the earlier call; no unspecified new speaker identity is fabricated."
  },
  {
    "id": "description:rrugaDielli2:4",
    "nodeId": "rrugaDielli2",
    "lineIndex": 4,
    "placeId": "rrugaDielli2",
    "text": "Dreri merr vajzën në brirë.",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:sun-maiden",
        "kind": "on",
        "target": "sun-stag"
      }
    ],
    "disposition": "physical",
    "rationale": "The maiden is carried on the stag’s antlers."
  },
  {
    "id": "description:rrugaDielli2:5",
    "nodeId": "rrugaDielli2",
    "lineIndex": 5,
    "placeId": "rrugaDielli2",
    "text": "Dreri ikën nga kulshedra.",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sun-stag",
        "asset": "deer",
        "label": "Stag with antlers",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The stag flees the pursuing monster; the line does not place the monster beside the rider."
  },
  {
    "id": "description:rrugaDielli2:6",
    "nodeId": "rrugaDielli2",
    "lineIndex": 6,
    "placeId": "rrugaDielli2",
    "text": "një njeri thotë: kulshedra ecën në një rrugë tjetër!",
    "conditions": {
      "all": [
        "flag:pemaKulshedraSentHome"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The Kulshedra is reported on another road; it must not be placed on this road."
  },
  {
    "id": "description:rrugaDielli2:7",
    "nodeId": "rrugaDielli2",
    "lineIndex": 7,
    "placeId": "rrugaDielli2",
    "text": "ti dhe vajza jeni afër fshatit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "village-sun-road",
        "asset": "road",
        "label": "Village approach road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-return-village",
        "asset": "village",
        "label": "Nearby village",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The maiden stands beside the player on the village road after the ride."
  },
  {
    "id": "description:rrugaDielli2:8",
    "nodeId": "rrugaDielli2",
    "lineIndex": 8,
    "placeId": "rrugaDielli2",
    "text": "Vajza merr dorën tënde dhe rri pranë teje në rrugën e fshatit.",
    "conditions": {
      "all": [
        "vajza"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun-maiden",
        "asset": "human",
        "label": "The maiden",
        "zone": "near",
        "attributes": {
          "gender": "woman",
          "hair": "long"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "village-sun-road",
        "asset": "road",
        "label": "Village approach road",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sun-return-village",
        "asset": "village",
        "label": "Nearby village",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The maiden stands beside the player on the village road after the ride."
  },
  {
    "id": "description:qiell1:0",
    "nodeId": "qiell1",
    "lineIndex": 0,
    "placeId": "qiell1",
    "text": "ti je në një mal të shenjtë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-mountain",
        "asset": "mountain",
        "label": "Sacred mountain",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sacred mountain; only the represented moment is staged."
  },
  {
    "id": "description:qiell1:1",
    "nodeId": "qiell1",
    "lineIndex": 1,
    "placeId": "qiell1",
    "text": "ti ke dëgjuar fjalët: ja mali i shenjtë.",
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
    "rationale": "The naming words were heard previously; they do not establish another current speaker."
  },
  {
    "id": "description:qiell1:2",
    "nodeId": "qiell1",
    "lineIndex": 2,
    "placeId": "qiell1",
    "text": "lart shqiponjat fluturojnë.",
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
        "key": "sky-eagles",
        "asset": "eagle",
        "label": "Eagles circling overhead",
        "zone": "above",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Eagles circling overhead; only the represented moment is staged."
  },
  {
    "id": "description:qiell1:3",
    "nodeId": "qiell1",
    "lineIndex": 3,
    "placeId": "qiell1",
    "text": "natën nuk sheh shqiponjat: vetëm yjet janë lart.",
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
        "key": "sky-stars",
        "asset": "stars",
        "label": "Stars above the mountain",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "sky-eagles",
        "property": "visible",
        "value": false
      },
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "At night only stars are visible; the eagles are not visible."
  },
  {
    "id": "description:qiell1:4",
    "nodeId": "qiell1",
    "lineIndex": 4,
    "placeId": "qiell1",
    "text": "është agim: qielli bëhet i kuq dhe i artë.",
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
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The dawn sky turns red and gold."
  },
  {
    "id": "description:qiell1:5",
    "nodeId": "qiell1",
    "lineIndex": 5,
    "placeId": "qiell1",
    "text": "është muzg: dielli bie dhe qielli bëhet i artë.",
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
        "property": "light",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The setting sun colors the sky gold."
  },
  {
    "id": "description:qiell1:6",
    "nodeId": "qiell1",
    "lineIndex": 6,
    "placeId": "qiell1",
    "text": "lart vjen erë dhe breshër.",
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
        "value": "hail"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Wind and hail strike the mountain viewpoint."
  },
  {
    "id": "description:qiell1:7",
    "nodeId": "qiell1",
    "lineIndex": 7,
    "placeId": "qiell1",
    "text": "bari thotë: njerëzit premtojnë: për qiell!",
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
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Old shepherd",
        "zone": "near",
        "attributes": {
          "age": "old",
          "held": "staff"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The shepherd tells the local oath; the oath does not create a crowd of oath-takers."
  },
  {
    "id": "description:qiell1:8",
    "nodeId": "qiell1",
    "lineIndex": 8,
    "placeId": "qiell1",
    "text": "shqiponja jote fluturon me shqiponjat.",
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
        "key": "companion:eagle",
        "asset": "eagle",
        "label": "Your eagle",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-eagles",
        "asset": "eagle",
        "label": "Wild eagles overhead",
        "zone": "above",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Your eagle, Wild eagles overhead; only the represented moment is staged."
  },
  {
    "id": "description:qiell1:9",
    "nodeId": "qiell1",
    "lineIndex": 9,
    "placeId": "qiell1",
    "text": "qiell dhe Perëndi kanë një emër: Perëndi.",
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
    "rationale": "The shared name for sky and deity is linguistic knowledge, not a second object."
  },
  {
    "id": "description:qiell1:10",
    "nodeId": "qiell1",
    "lineIndex": 10,
    "placeId": "qiell1",
    "text": "një bari rri me një dem të bardhë.",
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
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Old shepherd",
        "zone": "near",
        "attributes": {
          "age": "old",
          "held": "staff"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Old shepherd, White bull; only the represented moment is staged."
  },
  {
    "id": "description:qiell1:11",
    "nodeId": "qiell1",
    "lineIndex": 11,
    "placeId": "qiell1",
    "text": "natën bariu ikën me demin.",
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
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Departing shepherd",
        "zone": "far",
        "attributes": {
          "age": "old",
          "pose": "walking"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "Departing white bull",
        "zone": "far",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Departing shepherd, Departing white bull; only the represented moment is staged."
  },
  {
    "id": "description:qiellDem1:0",
    "nodeId": "qiellDem1",
    "lineIndex": 0,
    "placeId": "qiellDem1",
    "text": "ti kalo nëpër mal te bariu dhe dem i bardhë.",
    "conditions": {
      "all": [
        "from:qiell1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-mountain",
        "asset": "mountain",
        "label": "Sacred mountain",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Old shepherd",
        "zone": "near",
        "attributes": {
          "age": "old",
          "held": "staff"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sacred mountain, Old shepherd, White bull; only the represented moment is staged."
  },
  {
    "id": "description:qiellDem1:1",
    "nodeId": "qiellDem1",
    "lineIndex": 1,
    "placeId": "qiellDem1",
    "text": "bari është plak dhe ecën ngadalë pranë një demi të fortë dhe të qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-mountain",
        "asset": "mountain",
        "label": "Sacred mountain",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Old shepherd",
        "zone": "near",
        "attributes": {
          "age": "old",
          "held": "staff"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Sacred mountain, Old shepherd, White bull; only the represented moment is staged."
  },
  {
    "id": "description:qiellDem1:2",
    "nodeId": "qiellDem1",
    "lineIndex": 2,
    "placeId": "qiellDem1",
    "text": "majë është larg, lart në re.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-summit",
        "asset": "mountain",
        "label": "High summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "summit-cloud",
        "asset": "cloud",
        "label": "Cloud around the distant summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes High summit, Cloud around the distant summit; only the represented moment is staged."
  },
  {
    "id": "description:qiellDem1:3",
    "nodeId": "qiellDem1",
    "lineIndex": 3,
    "placeId": "qiellDem1",
    "text": "bari thotë: demi është një kurban për malin. merr demin në majë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Old shepherd",
        "zone": "near",
        "attributes": {
          "age": "old",
          "held": "staff"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The shepherd identifies the present bull as an offering before it is given at the summit."
  },
  {
    "id": "description:qiellDem1:4",
    "nodeId": "qiellDem1",
    "lineIndex": 4,
    "placeId": "qiellDem1",
    "text": "Në pranverë, mali është i gjelbër deri në majë.",
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
        "key": "sacred-mountain",
        "asset": "mountain",
        "label": "Sacred mountain",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sacred-summit",
        "asset": "mountain",
        "label": "High summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "season",
        "value": "spring"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mountain slopes are green in spring."
  },
  {
    "id": "description:qiellDem1:5",
    "nodeId": "qiellDem1",
    "lineIndex": 5,
    "placeId": "qiellDem1",
    "text": "Bariu jep litarin e demit. Demi i qetë pret pranë teje për ngjitjen.",
    "conditions": {
      "all": [
        "flag:bullOfferingAccepted"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-shepherd",
        "asset": "human",
        "label": "Old shepherd",
        "zone": "near",
        "attributes": {
          "age": "old",
          "held": "staff"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "bull-rope",
        "asset": "rope",
        "label": "Bull’s rope",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The rope has been handed over; the same quiet bull now waits beside the player."
  },
  {
    "id": "description:qiellErera1:0",
    "nodeId": "qiellErera1",
    "lineIndex": 0,
    "placeId": "qiellErera1",
    "text": "Shurdhi vjen me breshër.",
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
        "label": "Shurdhi",
        "zone": "near",
        "attributes": {
          "color": "#707b91"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "weather",
        "value": "hail"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Shurdhi arrives with visible hail."
  },
  {
    "id": "description:qiellErera1:1",
    "nodeId": "qiellErera1",
    "lineIndex": 1,
    "placeId": "qiellErera1",
    "text": "era është e fortë.",
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
        "value": "strong"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Strong wind is an environmental effect."
  },
  {
    "id": "description:qiellErera1:2",
    "nodeId": "qiellErera1",
    "lineIndex": 2,
    "placeId": "qiellErera1",
    "text": "njerëzit godasin hekur: hekuri këndon kundër breshrit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "hail-people",
        "asset": "human",
        "label": "People striking iron",
        "zone": "front",
        "attributes": {},
        "count": 3,
        "persistence": "scene",
        "countExact": false
      },
      {
        "key": "hail-iron",
        "asset": "iron",
        "label": "Iron struck against hail",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes People striking iron, Iron struck against hail; only the represented moment is staged."
  },
  {
    "id": "description:qiellErera2:0",
    "nodeId": "qiellErera2",
    "lineIndex": 0,
    "placeId": "qiellErera1",
    "text": "në erë vjen i Verbti: ai është zjarr dhe do sy.",
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
        "label": "Blind fire Verbti",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Verbti is the moving blind fire, not a sighted human with invented eyes."
  },
  {
    "id": "description:qiellErera2:1",
    "nodeId": "qiellErera2",
    "lineIndex": 1,
    "placeId": "qiellErera1",
    "text": "ti mbyll sytë, dhe zjarri i verbër kalon pa marrë i.",
    "conditions": {
      "all": [
        "arrival:action:verbti-close-eyes"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "environment",
        "property": "eyesClosed",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The player closes their eyes while the blind fire passes; the first-person visual comparison must show that blindness."
  },
  {
    "id": "description:qiellErera2:2",
    "nodeId": "qiellErera2",
    "lineIndex": 2,
    "placeId": "qiellErera1",
    "text": "Stuhia mbaroi, dhe rrugë në majë hapet lart.",
    "conditions": {
      "all": [
        "flag:verbtiPassed"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "summit-path",
        "asset": "road",
        "label": "Path opening toward the summit",
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
        "value": "clear"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The storm ends and the path is visible."
  },
  {
    "id": "description:qiell2:0",
    "nodeId": "qiell2",
    "lineIndex": 0,
    "placeId": "qiell2",
    "text": "ti je në majë të malit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-summit",
        "asset": "mountain",
        "label": "High summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player stands at the summit; this is the viewpoint’s high location."
  },
  {
    "id": "description:qiell2:1",
    "nodeId": "qiell2",
    "lineIndex": 1,
    "placeId": "qiell2",
    "text": "një plak me mjekër të bardhë rri këtu: plaku është Zojz.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zojz",
        "asset": "human",
        "label": "Zojz",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Zojz; only the represented moment is staged."
  },
  {
    "id": "description:qiell2:2",
    "nodeId": "qiell2",
    "lineIndex": 2,
    "placeId": "qiell2",
    "text": "një rrufe godit një pemë të lart.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "lightning-tree",
        "asset": "tree",
        "label": "Tall tree",
        "zone": "front",
        "attributes": {
          "height": 10
        },
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sky-thunderbolt",
        "asset": "lightning",
        "label": "Lightning striking the tree",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Tall tree, Lightning striking the tree; only the represented moment is staged."
  },
  {
    "id": "description:qiell2:3",
    "nodeId": "qiell2",
    "lineIndex": 3,
    "placeId": "qiell2",
    "text": "dielli sheh gjak.",
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
    "rationale": "The Sun’s seeing of blood is sacred agency, not a claim that loose blood lies at this viewpoint."
  },
  {
    "id": "description:qiell2:4",
    "nodeId": "qiell2",
    "lineIndex": 4,
    "placeId": "qiell2",
    "text": "plaku thotë: njerëzit premtojnë për këtë diell, se dielli sheh gjithë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zojz",
        "asset": "human",
        "label": "Zojz",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The old man explains the sun oath; the explanation does not populate a crowd."
  },
  {
    "id": "description:qiell2:5",
    "nodeId": "qiell2",
    "lineIndex": 5,
    "placeId": "qiell2",
    "text": "Zojz do një dem të bardhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zojz",
        "asset": "human",
        "label": "Zojz",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "Zojz requests the bull; no bull is supplied before the player brings one."
  },
  {
    "id": "description:qiell2:6",
    "nodeId": "qiell2",
    "lineIndex": 6,
    "placeId": "qiell2",
    "text": "Maja është goxha lart; era të godet në fytyrë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-summit",
        "asset": "mountain",
        "label": "High summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "environment",
        "property": "wind",
        "value": "strong"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The high summit is struck by wind."
  },
  {
    "id": "description:qiell2:7",
    "nodeId": "qiell2",
    "lineIndex": 7,
    "placeId": "qiell2",
    "text": "ti bie në tokë para Zojz. ai të merr, dhe një ylber rri te majë para teje. Prende rri pas ylberit.",
    "conditions": {
      "all": [
        "arrival:action:bow-before-zojz"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zojz",
        "asset": "human",
        "label": "Zojz",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "prende-rainbow",
        "asset": "rainbow",
        "label": "Rainbow at the summit",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende beyond the rainbow",
        "zone": "far",
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
        "subject": "actor:prende",
        "kind": "behind",
        "target": "prende-rainbow"
      }
    ],
    "disposition": "physical",
    "rationale": "Zojz receives the bow and Prende is explicitly visible beyond the rainbow."
  },
  {
    "id": "description:qiell2:8",
    "nodeId": "qiell2",
    "lineIndex": 8,
    "placeId": "qiell2",
    "text": "ti ngjitesh në majë me demin.",
    "conditions": {
      "all": [
        "from:qiellDem1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-summit",
        "asset": "mountain",
        "label": "High summit",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes High summit, White bull; only the represented moment is staged."
  },
  {
    "id": "description:qiell2:9",
    "nodeId": "qiell2",
    "lineIndex": 9,
    "placeId": "qiell2",
    "text": "ti ngjitesh nëpër stuhinë në majë.",
    "conditions": {
      "all": [
        "from:qiellErera2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sacred-summit",
        "asset": "mountain",
        "label": "High summit",
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
        "value": "cloud"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player arrives through a thinning storm."
  },
  {
    "id": "description:zojzBekim:0",
    "nodeId": "zojzBekim",
    "lineIndex": 0,
    "placeId": "qiell2",
    "text": "ti jep një dem të bardhë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zojz",
        "asset": "human",
        "label": "Zojz",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": "white"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The bull is given to the present Zojz."
  },
  {
    "id": "description:zojzBekim:1",
    "nodeId": "zojzBekim",
    "lineIndex": 1,
    "placeId": "qiell2",
    "text": "Zojz të bekon.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:zojz",
        "asset": "human",
        "label": "Zojz",
        "zone": "near",
        "attributes": {
          "age": "old",
          "beard": "white"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The blessing is the god’s act; it is not an invented transferable object."
  },
  {
    "id": "description:zojzBekim:2",
    "nodeId": "zojzBekim",
    "lineIndex": 2,
    "placeId": "qiell2",
    "text": "era të sjell në shtëpi.",
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
    "rationale": "The wind-borne return and safety change the viewpoint’s location and status, not a duplicated body flying ahead."
  },
  {
    "id": "description:zojzBekim:3",
    "nodeId": "zojzBekim",
    "lineIndex": 3,
    "placeId": "qiell2",
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
    "rationale": "The wind-borne return and safety change the viewpoint’s location and status, not a duplicated body flying ahead."
  },
  {
    "id": "description:diellShenjt:0",
    "nodeId": "diellShenjt",
    "lineIndex": 0,
    "placeId": "qiell2",
    "text": "ti fal gjak.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "offered-blood",
        "asset": "blood",
        "label": "Offered blood",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Offered blood; only the represented moment is staged."
  },
  {
    "id": "description:diellShenjt:1",
    "nodeId": "diellShenjt",
    "lineIndex": 1,
    "placeId": "qiell2",
    "text": "dielli të sheh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun",
        "asset": "sun",
        "label": "The Sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Sun is the visible recipient of the offering."
  },
  {
    "id": "description:diellShenjt:2",
    "nodeId": "diellShenjt",
    "lineIndex": 2,
    "placeId": "qiell2",
    "text": "ti je i bukur.",
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
    "rationale": "The player’s blessed beauty is not another visible player actor."
  },
  {
    "id": "description:zojzRrufe:0",
    "nodeId": "zojzRrufe",
    "lineIndex": 0,
    "placeId": "zojzRrufe",
    "text": "ti je krenar.",
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
    "rationale": "Pride is a player attitude, not a separate mesh."
  },
  {
    "id": "description:zojzRrufe:1",
    "nodeId": "zojzRrufe",
    "lineIndex": 1,
    "placeId": "zojzRrufe",
    "text": "një rrufe të godit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "punishing-lightning",
        "asset": "lightning",
        "label": "Thunderbolt",
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
        "value": "flash"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The thunderbolt strikes the viewpoint and turns the sky white."
  },
  {
    "id": "description:zojzRrufe:2",
    "nodeId": "zojzRrufe",
    "lineIndex": 2,
    "placeId": "zojzRrufe",
    "text": "Rrufeja zbardh qiellin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "punishing-lightning",
        "asset": "lightning",
        "label": "Thunderbolt",
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
        "value": "flash"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The thunderbolt strikes the viewpoint and turns the sky white."
  },
  {
    "id": "description:zojzRrufe:3",
    "nodeId": "zojzRrufe",
    "lineIndex": 3,
    "placeId": "zojzRrufe",
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
    "id": "description:qiellPrende:0",
    "nodeId": "qiellPrende",
    "lineIndex": 0,
    "placeId": "qiellPrende",
    "text": "ti kalo ylberin nga majë në qiell te Prende.",
    "conditions": {
      "all": [
        "from:qiell2"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "prende-rainbow",
        "asset": "rainbow",
        "label": "Rainbow at the summit",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "prende-court",
        "asset": "palace",
        "label": "Prende’s sky court",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rainbow at the summit, Prende, Prende’s sky court; only the represented moment is staged."
  },
  {
    "id": "description:qiellPrende:1",
    "nodeId": "qiellPrende",
    "lineIndex": 1,
    "placeId": "qiellPrende",
    "text": "Prende është bija e Zojz.",
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
    "rationale": "Prende is present; her genealogy, beauty and offered blessing do not create Zojz or a literal blessing object here."
  },
  {
    "id": "description:qiellPrende:2",
    "nodeId": "qiellPrende",
    "lineIndex": 2,
    "placeId": "qiellPrende",
    "text": "Prende është e bukur.",
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
    "rationale": "Prende is present; her genealogy, beauty and offered blessing do not create Zojz or a literal blessing object here."
  },
  {
    "id": "description:qiellPrende:3",
    "nodeId": "qiellPrende",
    "lineIndex": 3,
    "placeId": "qiellPrende",
    "text": "Prende mban një bekim para teje.",
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
    "rationale": "Prende is present; her genealogy, beauty and offered blessing do not create Zojz or a literal blessing object here."
  },
  {
    "id": "description:qiellPrende:4",
    "nodeId": "qiellPrende",
    "lineIndex": 4,
    "placeId": "qiellPrende",
    "text": "e premtja është dita e Prende.",
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
    "rationale": "Friday’s association is calendar knowledge, not geometry."
  },
  {
    "id": "description:qiellPrende:5",
    "nodeId": "qiellPrende",
    "lineIndex": 5,
    "placeId": "qiellPrende",
    "text": "Prende jep zemër dhe bekim për gra.",
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
    "rationale": "Prende’s blessing of women is described; no additional unmentioned women are staged."
  },
  {
    "id": "description:qiellPrende:6",
    "nodeId": "qiellPrende",
    "lineIndex": 6,
    "placeId": "qiellPrende",
    "text": "një ylber rri lart.",
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
        "label": "Rainbow at the summit",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Rainbow at the summit; only the represented moment is staged."
  },
  {
    "id": "description:qiellPrende:7",
    "nodeId": "qiellPrende",
    "lineIndex": 7,
    "placeId": "qiellPrende",
    "text": "ylberi është i Prende. thonë: kush kalon ylberin, burrë bëhet grua.",
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
        "label": "Rainbow at the summit",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The rainbow is present; the reported bodily change is conditional on a future crossing."
  },
  {
    "id": "description:qiellPrende:8",
    "nodeId": "qiellPrende",
    "lineIndex": 8,
    "placeId": "qiellPrende",
    "text": "është agim, Prende është e fortë.",
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
        "key": "actor:prende",
        "asset": "human",
        "label": "Prende",
        "zone": "near",
        "attributes": {
          "gender": "woman"
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
    "rationale": "Prende is present at dawn."
  },
  {
    "id": "description:qiellDiell:0",
    "nodeId": "qiellDiell",
    "lineIndex": 0,
    "placeId": "qiellDiell",
    "text": "Dielli është lart: të sheh ty dhe gjithë botën, dhe jep dritë dhe fuqi.",
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
        "key": "actor:sun",
        "asset": "sun",
        "label": "The Sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible Sun speaks about its sisters; the Earth and Sea Beauties are not placed in the sky."
  },
  {
    "id": "description:qiellDiell:1",
    "nodeId": "qiellDiell",
    "lineIndex": 1,
    "placeId": "qiellDiell",
    "text": "Dielli thotë: unë jam Bukura e qiellit. toka dhe deti kanë një Bukura.",
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
        "key": "actor:sun",
        "asset": "sun",
        "label": "The Sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible Sun speaks about its sisters; the Earth and Sea Beauties are not placed in the sky."
  },
  {
    "id": "description:qiellDiell:2",
    "nodeId": "qiellDiell",
    "lineIndex": 2,
    "placeId": "qiellDiell",
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
    "rationale": "Night comes in the sky."
  },
  {
    "id": "description:qiellDiell:3",
    "nodeId": "qiellDiell",
    "lineIndex": 3,
    "placeId": "qiellDiell",
    "text": "dielli vjen.",
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
        "key": "actor:sun",
        "asset": "sun",
        "label": "The Sun",
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
    "rationale": "The Sun returns with daylight."
  },
  {
    "id": "description:qiellDiell:4",
    "nodeId": "qiellDiell",
    "lineIndex": 4,
    "placeId": "qiellDiell",
    "text": "Dielli ikën; hëna është lart dhe jep dritë e qetë.",
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
        "key": "sky-moon",
        "asset": "moon",
        "label": "Moon overhead",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "actor:sun",
        "property": "present",
        "value": false
      },
      {
        "key": "environment",
        "property": "light",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The Sun is absent and the Moon lights the sky."
  },
  {
    "id": "description:qiellDiell:5",
    "nodeId": "qiellDiell",
    "lineIndex": 5,
    "placeId": "qiellDiell",
    "text": "Poshtë teje, rruga e malit të shenjtë zbret te udhëkryqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-descending-road",
        "asset": "road",
        "label": "Mountain road descending to the crossroads",
        "zone": "below",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Mountain road descending to the crossroads; only the represented moment is staged."
  },
  {
    "id": "description:demKeq:0",
    "nodeId": "demKeq",
    "lineIndex": 0,
    "placeId": "qiellDem1",
    "text": "ti merr demin me fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-white-bull",
        "asset": "bull",
        "label": "White bull",
        "zone": "near",
        "attributes": {
          "color": "#f0eee5"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player forcibly takes the actual white bull."
  },
  {
    "id": "description:demKeq:1",
    "nodeId": "demKeq",
    "lineIndex": 1,
    "placeId": "qiellDem1",
    "text": "një rrufe të godit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "bull-lightning",
        "asset": "lightning",
        "label": "Punishing thunderbolt",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Punishing thunderbolt; only the represented moment is staged."
  },
  {
    "id": "description:demKeq:2",
    "nodeId": "demKeq",
    "lineIndex": 2,
    "placeId": "qiellDem1",
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
    "id": "description:ereHumbur:0",
    "nodeId": "ereHumbur",
    "lineIndex": 0,
    "placeId": "qiellErera1",
    "text": "ti lufton erën. breshër bie mbi ty.",
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
        "value": "hail"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Hail strikes during the failed struggle against the wind."
  },
  {
    "id": "description:ereHumbur:1",
    "nodeId": "ereHumbur",
    "lineIndex": 1,
    "placeId": "qiellErera1",
    "text": "era të merr frymën. ti humbet rrugën.",
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
        "value": "strong"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The strong wind takes the player’s breath and hides the way."
  },
  {
    "id": "description:ereHumbur:2",
    "nodeId": "ereHumbur",
    "lineIndex": 2,
    "placeId": "qiellErera1",
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
    "id": "description:qiellVerbuar:0",
    "nodeId": "qiellVerbuar",
    "lineIndex": 0,
    "placeId": "qiellErera1",
    "text": "shih i Verbti.",
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
        "label": "Verbti’s fire",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Verbti’s fire; only the represented moment is staged."
  },
  {
    "id": "description:qiellVerbuar:1",
    "nodeId": "qiellVerbuar",
    "lineIndex": 1,
    "placeId": "qiellErera1",
    "text": "zjarr të verbon. bota bëhet errësirë.",
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
        "property": "eyesClosed",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The fire blinds the viewpoint; the render must be dark rather than a normal sighted panorama."
  },
  {
    "id": "description:qiellVerbuar:2",
    "nodeId": "qiellVerbuar",
    "lineIndex": 2,
    "placeId": "qiellErera1",
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
    "id": "description:prendeBekim:0",
    "nodeId": "prendeBekim",
    "lineIndex": 0,
    "placeId": "qiellPrende",
    "text": "ti merr bekimin nga Prende.",
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
    "rationale": "The player accepts Prende’s blessing from the present goddess."
  },
  {
    "id": "description:prendeBekim:1",
    "nodeId": "prendeBekim",
    "lineIndex": 1,
    "placeId": "qiellPrende",
    "text": "Prende të bekon.",
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
    "rationale": "The player accepts Prende’s blessing from the present goddess."
  },
  {
    "id": "description:prendeBekim:2",
    "nodeId": "prendeBekim",
    "lineIndex": 2,
    "placeId": "qiellPrende",
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
    "rationale": "Safety is a consequence, not an additional physical object."
  },
  {
    "id": "description:ylberKaprcim:0",
    "nodeId": "ylberKaprcim",
    "lineIndex": 0,
    "placeId": "ylberKaprcim",
    "text": "Trupi yt ndryshon ndërsa kalon ylberin.",
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
        "label": "Rainbow at the summit",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied viewpoint crosses the rainbow; its body changes without producing another actor."
  },
  {
    "id": "description:ylberKaprcim:1",
    "nodeId": "ylberKaprcim",
    "lineIndex": 1,
    "placeId": "ylberKaprcim",
    "text": "ti je i ri.",
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
    "rationale": "The changed player identity is not a separate visible body."
  },
  {
    "id": "description:diellApex:0",
    "nodeId": "diellApex",
    "lineIndex": 0,
    "placeId": "qiellDiell",
    "text": "ti rri në dritë.",
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
        "value": "bright"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The player stands in strong light."
  },
  {
    "id": "description:diellApex:1",
    "nodeId": "diellApex",
    "lineIndex": 1,
    "placeId": "qiellDiell",
    "text": "dielli të sheh.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:sun",
        "asset": "sun",
        "label": "The Sun",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The Sun; only the represented moment is staged."
  },
  {
    "id": "description:diellApex:2",
    "nodeId": "diellApex",
    "lineIndex": 2,
    "placeId": "qiellDiell",
    "text": "ti je i bukur.",
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
    "rationale": "The player’s blessed beauty is not a second actor."
  },
  {
    "id": "description:henaPaqe:0",
    "nodeId": "henaPaqe",
    "lineIndex": 0,
    "placeId": "qiellDiell",
    "text": "ti kërkon hënën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-moon",
        "asset": "moon",
        "label": "Moon",
        "zone": "above",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes Moon; only the represented moment is staged."
  },
  {
    "id": "description:henaPaqe:1",
    "nodeId": "henaPaqe",
    "lineIndex": 1,
    "placeId": "qiellDiell",
    "text": "në dritën e Hënës, zemra jote qetësohet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "sky-moon",
        "asset": "moon",
        "label": "Moon in the quiet sky",
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
    "rationale": "Moonlight is visible; the calmer heart is internal."
  }
])
