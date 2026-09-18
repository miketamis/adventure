// Exact reviewed source claims for princeland.
export default Object.freeze([
  {
    "id": "description:maroPallati:0",
    "nodeId": "maroPallati",
    "lineIndex": 0,
    "placeId": "maroPallati",
    "text": "ti shkon me princin në pallatin. dasmë e madhe bëhet me këngë.",
    "conditions": {
      "all": [
        "from:maroKrushqit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-palace",
        "asset": "palace",
        "label": "Prince’s palace",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-guests",
        "asset": "human",
        "label": "Wedding guests",
        "zone": "front",
        "attributes": {},
        "count": 5,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The chosen arrival reaches the prince’s actual palace, where wedding guests sing."
  },
  {
    "id": "description:maroPallati:1",
    "nodeId": "maroPallati",
    "lineIndex": 1,
    "placeId": "maroPallati",
    "text": "pas rreth dy muajsh, njerka dhe motrat vijnë afër. njerka thotë: ti premtove!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-sisters",
        "asset": "human",
        "label": "Maro’s stepsisters",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 2,
        "persistence": "scene",
        "countExact": false
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stepmother and sisters arrive at the palace after two months; the stepmother speaks here."
  },
  {
    "id": "description:maroPallati:2",
    "nodeId": "maroPallati",
    "lineIndex": 2,
    "placeId": "maroPallati",
    "text": "një djalë rri nën zemrën tënde.",
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
    "rationale": "The unborn child is inside the embodied player; do not depict an already born infant beside her."
  },
  {
    "id": "description:maroPallati:3",
    "nodeId": "maroPallati",
    "lineIndex": 3,
    "placeId": "maroPallati",
    "text": "njerka vjen çdo ditë me fjalë të ëmbla.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
    "rationale": "The stepmother speaks her request before the player gives any money."
  },
  {
    "id": "description:maroPallati:4",
    "nodeId": "maroPallati",
    "lineIndex": 4,
    "placeId": "maroPallati",
    "text": "njerka kërkon njëqind para për Lenën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [
        "flag:maroPalaceCoinsGiven",
        "flag:maroPaymentRefused"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
    "rationale": "The stepmother speaks her request before the player gives any money."
  },
  {
    "id": "description:maroPallati:5",
    "nodeId": "maroPallati",
    "lineIndex": 5,
    "placeId": "maroPallati",
    "text": "ti i jep njerkës njëqind para nga pallati. ajo merr paratë dhe ikën.",
    "conditions": {
      "all": [
        "arrival:action:maro-give-palace-coins"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-payment",
        "asset": "money",
        "label": "Hundred-coin payment",
        "zone": "near",
        "attributes": {
          "value": 100
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The authorized payment has been handed over and the stepmother departs; value is not a claim about rendered coin count."
  },
  {
    "id": "description:maroPallati:6",
    "nodeId": "maroPallati",
    "lineIndex": 6,
    "placeId": "maroPallati",
    "text": "ti thotë: jo. Njerka pret te dera e pallatit, ndërsa ti bëhesh gati për të ikur para se fëmija të lindë.",
    "conditions": {
      "all": [
        "arrival:action:maro-refuse-palace-payment"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-gate",
        "asset": "gate",
        "label": "Palace gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "actor:maro-stepmother",
        "kind": "beside",
        "target": "maro-gate"
      }
    ],
    "disposition": "physical",
    "rationale": "After the refusal the stepmother waits at the gate; the child is still unborn."
  },
  {
    "id": "description:maroPallati:7",
    "nodeId": "maroPallati",
    "lineIndex": 7,
    "placeId": "maroPallati",
    "text": "Dera e pallatit është e hapur. ti mund të ikësh para se fëmija të lindë.",
    "conditions": {
      "all": [
        "flag:maroPaymentRefused"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-gate",
        "asset": "gate",
        "label": "Palace gate",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "maro-gate",
        "property": "open",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The actual palace gate is open."
  },
  {
    "id": "description:maroGjilpera:0",
    "nodeId": "maroGjilpera",
    "lineIndex": 0,
    "placeId": "maroPallati",
    "text": "pas dhjetë ditësh, njerka vjen përsëri.",
    "conditions": {
      "all": [
        "flag:maroStrangeMidwifeRefused"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
    "rationale": "The visible beat establishes Maro’s stepmother; only the represented moment is staged."
  },
  {
    "id": "description:maroGjilpera:1",
    "nodeId": "maroGjilpera",
    "lineIndex": 1,
    "placeId": "maroPallati",
    "text": "ajo sjell një mami e re.",
    "conditions": {
      "all": [
        "flag:maroStrangeMidwifeRefused"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:maro-midwife",
        "asset": "human",
        "label": "Strange midwife",
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
    "rationale": "The visible beat establishes Maro’s stepmother, Strange midwife; only the represented moment is staged."
  },
  {
    "id": "description:maroGjilpera:2",
    "nodeId": "maroGjilpera",
    "lineIndex": 2,
    "placeId": "maroPallati",
    "text": "dita vjen: një djalë rri nën zemrën tënde.",
    "conditions": {
      "all": [
        "flag:maroStrangeMidwifeRefused"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player is pregnant; the unborn boy must not be rendered outside the body."
  },
  {
    "id": "description:maroGjilpera:3",
    "nodeId": "maroGjilpera",
    "lineIndex": 3,
    "placeId": "maroPallati",
    "text": "mami e huaj pyet: a të ndihmoj kur fëmija të lindë?",
    "conditions": {
      "all": [
        "flag:maroStrangeMidwifeRefused"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-midwife",
        "asset": "human",
        "label": "Strange midwife",
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
    "rationale": "The midwife asks to help before the player accepts or refuses."
  },
  {
    "id": "description:maroGjilpera:4",
    "nodeId": "maroGjilpera",
    "lineIndex": 4,
    "placeId": "maroPallati",
    "text": "ti thua: jo. mami e huaj ikën, dhe djali lind i sigurt.",
    "conditions": {
      "all": [
        "arrival:action:maro-refuse-strange-midwife"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-son",
        "asset": "human",
        "label": "Maro’s newborn son",
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
        "key": "actor:maro-midwife",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "After refusal the midwife leaves and the child is born safely."
  },
  {
    "id": "description:maroGjilpera:5",
    "nodeId": "maroGjilpera",
    "lineIndex": 5,
    "placeId": "maroPallati",
    "text": "Djali yt pret pranë teje te dera e pallatit, gati për të ikur.",
    "conditions": {
      "all": [
        "flag:maroStrangeMidwifeRefused"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-son",
        "asset": "human",
        "label": "Maro’s newborn son",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-door",
        "asset": "door",
        "label": "Palace chamber door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The born child waits beside the player at the palace door."
  },
  {
    "id": "description:maroLindja:0",
    "nodeId": "maroLindja",
    "lineIndex": 0,
    "placeId": "maroPallati",
    "text": "djali lind. ti je e lumtur dhe pa fuqi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-son",
        "asset": "human",
        "label": "Maro’s newborn son",
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
    "rationale": "The child has now been born; weakness belongs to the embodied viewpoint."
  },
  {
    "id": "description:maroLindja:1",
    "nodeId": "maroLindja",
    "lineIndex": 1,
    "placeId": "maroPallati",
    "text": "njerka dhe mami rrinë afër teje. dera është e mbyllur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:maro-midwife",
        "asset": "human",
        "label": "Strange midwife",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-door",
        "asset": "door",
        "label": "Palace chamber door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "maro-door",
        "property": "open",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The stepmother and midwife stand beside the player behind the closed door."
  },
  {
    "id": "description:maroLindja:2",
    "nodeId": "maroLindja",
    "lineIndex": 2,
    "placeId": "maroPallati",
    "text": "njerka nxjerr një gjilpërë dhe ta fut në kokë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-needle",
        "asset": "needle",
        "label": "Needle placed in the player’s head",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The needle is the concrete instrument of the transformation, not a second player body."
  },
  {
    "id": "description:maroLindja:3",
    "nodeId": "maroLindja",
    "lineIndex": 3,
    "placeId": "maroPallati",
    "text": "me gjilpërën të futur në kokë, bota bëhet e madhe, dhe duart e tua bëhen krahë.",
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
    "rationale": "The embodied player transforms into a bird; change of bodily scale belongs to the viewpoint, not another bird standing in the room."
  },
  {
    "id": "description:maroLindja:4",
    "nodeId": "maroLindja",
    "lineIndex": 4,
    "placeId": "maroPallati",
    "text": "ti bëhesh zog. dritarja është e hapur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-window",
        "asset": "window",
        "label": "Child’s window",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [
      {
        "key": "maro-window",
        "property": "open",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The transformed bird can leave through the open window."
  },
  {
    "id": "description:maroLindja:5",
    "nodeId": "maroLindja",
    "lineIndex": 5,
    "placeId": "maroPallati",
    "text": "njerka vë Lenën në shtratin tënd.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-bed",
        "asset": "bed",
        "label": "Maro’s bed",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena in Maro’s bed",
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
    "relations": [
      {
        "subject": "actor:lena",
        "kind": "on",
        "target": "maro-bed"
      }
    ],
    "disposition": "physical",
    "rationale": "The impostor occupies Maro’s actual bed."
  },
  {
    "id": "description:maroZogu:0",
    "nodeId": "maroZogu",
    "lineIndex": 0,
    "placeId": "maroPallati",
    "text": "ti je zog tani. çdo ditë ti vjen te dritarja e djalit.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-window",
        "asset": "window",
        "label": "Child’s window",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied bird returns to the same child’s window; no second Maro-bird is created."
  },
  {
    "id": "description:maroZogu:1",
    "nodeId": "maroZogu",
    "lineIndex": 1,
    "placeId": "maroPallati",
    "text": "nga dritarja vjen një zë: ciu ciu, djal' i mëmës.",
    "conditions": {
      "all": [
        "from:maroLindja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The audible call is not another child or bird mesh."
  },
  {
    "id": "description:maroZogu:2",
    "nodeId": "maroZogu",
    "lineIndex": 2,
    "placeId": "maroPallati",
    "text": "brenda djali qan: Lena nuk ka qumësht për djalin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-son",
        "asset": "human",
        "label": "Maro’s newborn son",
        "zone": "near",
        "attributes": {
          "age": "baby"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "gender": "woman"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-window",
        "asset": "window",
        "label": "Child’s window",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "maro-window-room",
        "asset": "interior",
        "label": "Room inside the child’s window",
        "zone": "front",
        "attributes": {
          "cutaway": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-son",
        "kind": "inside",
        "target": "maro-window-room"
      }
    ],
    "disposition": "physical",
    "rationale": "The crying child and Lena are inside the window; the absence of milk does not create a milk container. The word inside establishes a room behind the window; the same child occupies that enclosure."
  },
  {
    "id": "description:maroZogu:3",
    "nodeId": "maroZogu",
    "lineIndex": 3,
    "placeId": "maroPallati",
    "text": "njerka thotë: ky zog është një hije e keqe!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
    "rationale": "The stepmother speaks about the embodied bird; the claimed evil shadow is an accusation, not another creature."
  },
  {
    "id": "description:maroZogu:4",
    "nodeId": "maroZogu",
    "lineIndex": 4,
    "placeId": "maroPallati",
    "text": "princi dhe njerëzit e tij duan të vrasin zogun.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-prince-men",
        "asset": "human",
        "label": "Prince’s men",
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
    "rationale": "The prince and men intend to attack; wanting to kill is not a completed killing."
  },
  {
    "id": "description:maroZogu:5",
    "nodeId": "maroZogu",
    "lineIndex": 5,
    "placeId": "maroPallati",
    "text": "zjarri kaloi afër krahut tënd.",
    "conditions": {
      "all": [
        "flag:zogPlage"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-near-fire",
        "asset": "fire",
        "label": "Fire passing near the wing",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "Fire passes near the embodied bird’s wing."
  },
  {
    "id": "description:maroZogu:6",
    "nodeId": "maroZogu",
    "lineIndex": 6,
    "placeId": "maroPallati",
    "text": "jashtë nga dritarja ti sheh një pyll.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-window",
        "asset": "window",
        "label": "Child’s window",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "maro-forest",
        "asset": "forest",
        "label": "Forest outside the palace",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The forest is seen outside the palace window."
  },
  {
    "id": "description:maroKopshti:0",
    "nodeId": "maroKopshti",
    "lineIndex": 0,
    "placeId": "maroKopshti",
    "text": "ti fluturon nëpër pyllin dhe, pas disa ditësh, vjen në kopshtin e pallatit.",
    "conditions": {
      "all": [
        "from:maroZogu"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-forest",
        "asset": "forest",
        "label": "Forest outside the palace",
        "zone": "far",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "maro-garden",
        "asset": "garden",
        "label": "Palace garden",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "maro-palace",
        "asset": "palace",
        "label": "Prince’s palace",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The bird travels through the forest and reaches the palace garden."
  },
  {
    "id": "description:maroKopshti:1",
    "nodeId": "maroKopshti",
    "lineIndex": 1,
    "placeId": "maroKopshti",
    "text": "ditët shkojnë. Lena rri në shtratin tënd, po princi nuk e njeh gruan.",
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
    "rationale": "Lena remains indoors in Maro’s bed while the bird observes from outside; do not move her bed into the garden."
  },
  {
    "id": "description:maroKopshti:2",
    "nodeId": "maroKopshti",
    "lineIndex": 2,
    "placeId": "maroKopshti",
    "text": "ti sheh nga larg, nga një pemë e lartë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-tree",
        "asset": "tree",
        "label": "High tree overlooking the garden",
        "zone": "front",
        "attributes": {
          "height": 10
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The bird observes from the high tree; the camera must use the elevated viewpoint."
  },
  {
    "id": "description:maroKopshti:3",
    "nodeId": "maroKopshti",
    "lineIndex": 3,
    "placeId": "maroKopshti",
    "text": "një ditë princi ecën në kopsht, vetëm dhe pa zjarr.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-garden",
        "asset": "garden",
        "label": "Palace garden",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      },
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "maro-near-fire",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The prince walks alone through the garden without fire."
  },
  {
    "id": "description:maroKopshti:4",
    "nodeId": "maroKopshti",
    "lineIndex": 4,
    "placeId": "maroKopshti",
    "text": "ai të sheh: një zog më i bukur se çdo zog. dora e tij rri e hapur dhe e qetë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "actor:maro-prince",
        "property": "pose",
        "value": "offering"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The prince holds his hand open toward the bird viewpoint."
  },
  {
    "id": "description:maroKopshti:5",
    "nodeId": "maroKopshti",
    "lineIndex": 5,
    "placeId": "maroKopshti",
    "text": "ai do të të kapë të gjallë, jo të të vrasë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "His intention is to catch the bird alive; the capture has not occurred yet."
  },
  {
    "id": "description:maroKopshti:6",
    "nodeId": "maroKopshti",
    "lineIndex": 6,
    "placeId": "maroKopshti",
    "text": "Princit i rrëshqet këmba mbi një gur, por ai e mban dorën të hapur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-garden-stone",
        "asset": "rock",
        "label": "Stone beneath the prince’s foot",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [
      {
        "key": "actor:maro-prince",
        "property": "pose",
        "value": "offering"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The prince slips on a stone while keeping his hand open."
  },
  {
    "id": "description:maroFundi:0",
    "nodeId": "maroFundi",
    "lineIndex": 0,
    "placeId": "maroKopshti",
    "text": "ti fluturon në duart e tij.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied bird lands in the prince’s hands."
  },
  {
    "id": "description:maroFundi:1",
    "nodeId": "maroFundi",
    "lineIndex": 1,
    "placeId": "maroKopshti",
    "text": "ai të prek në kokë, gjen gjilpërën dhe e heq.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-removed-needle",
        "asset": "needle",
        "label": "Needle removed by the prince",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The visible beat establishes The prince, Needle removed by the prince; only the represented moment is staged."
  },
  {
    "id": "description:maroFundi:2",
    "nodeId": "maroFundi",
    "lineIndex": 2,
    "placeId": "maroKopshti",
    "text": "princi të njeh dhe thotë: tani ti je gruaja ime.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The prince recognizes the restored player; identity recognition adds no second wife."
  },
  {
    "id": "description:maroFundi:3",
    "nodeId": "maroFundi",
    "lineIndex": 3,
    "placeId": "maroKopshti",
    "text": "Princi mëson gjithçka; njerka, Lena, magjistarja dhe mami marrin çfarë dhanë.",
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
    "rationale": "The later judgment of the stepmother, Lena, sorceress and midwife is narrated aftermath, not their physical presence in the garden."
  },
  {
    "id": "description:maroFundi:4",
    "nodeId": "maroFundi",
    "lineIndex": 4,
    "placeId": "maroKopshti",
    "text": "edhe janë sot e gjithë ditën.",
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
    "rationale": "The closing formula asserts continued life, not an additional scene."
  },
  {
    "id": "description:maroCiuCiu:0",
    "nodeId": "maroCiuCiu",
    "lineIndex": 0,
    "placeId": "maroKopshti",
    "text": "ti rri larg, mbi pemë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-tree",
        "asset": "tree",
        "label": "High tree overlooking the garden",
        "zone": "front",
        "attributes": {
          "height": 10
        },
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied bird remains far away in the tree."
  },
  {
    "id": "description:maroCiuCiu:1",
    "nodeId": "maroCiuCiu",
    "lineIndex": 1,
    "placeId": "maroKopshti",
    "text": "princi pret dhe pret, pastaj shkon brenda.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "The prince",
        "zone": "near",
        "attributes": {
          "gender": "man"
        },
        "count": 1,
        "persistence": "scene"
      },
      {
        "key": "maro-palace",
        "asset": "palace",
        "label": "Prince’s palace",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The prince waits, then goes indoors; the scene’s end must not leave him duplicated outside."
  },
  {
    "id": "description:maroCiuCiu:2",
    "nodeId": "maroCiuCiu",
    "lineIndex": 2,
    "placeId": "maroKopshti",
    "text": "çdo ditë një zog vjen te dritarja: ciu ciu.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-window",
        "asset": "window",
        "label": "Child’s window",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "persistence": "place"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The repeated bird visit is the embodied player’s routine at the same window."
  },
  {
    "id": "description:maroCiuCiu:3",
    "nodeId": "maroCiuCiu",
    "lineIndex": 3,
    "placeId": "maroKopshti",
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
  }
])
