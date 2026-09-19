// Exact per-line review of Maro’s village scenes. Player embodiment and invisible voices remain explicit.
export default Object.freeze([
  {
    "id": "description:maroShtepi:0",
    "nodeId": "maroShtepi",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti vjen te shtëpia e varfër, në fund të fshatit.",
    "conditions": {
      "all": [
        "from:fshatiJeta"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "This immediate scene establishes Poor house at the village edge. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtepi:1",
    "nodeId": "maroShtepi",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "ti je te shtëpia e varfër.",
    "conditions": {
      "all": [
        "from:fshatiJeta"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "This immediate scene establishes Poor house at the village edge. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtepi:2",
    "nodeId": "maroShtepi",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "këtu rri një njerkë me dy vajza: Lilo dhe Lena.",
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
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
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
    "rationale": "One stepmother and exactly two daughters are individually identified."
  },
  {
    "id": "description:maroShtepi:3",
    "nodeId": "maroShtepi",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "vajzat rrinë me rroba të mira dhe nuk punojnë.",
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
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
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
    "rationale": "This immediate scene establishes Lilo, Lena. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtepi:4",
    "nodeId": "maroShtepi",
    "lineIndex": 4,
    "placeId": "maroShtepi",
    "text": "një vajzë tjetër nuk është këtu: ajo është në punë, gjithmonë në punë.",
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
    "rationale": "The other girl is explicitly away working; do not add her at the house."
  },
  {
    "id": "description:maroShtepi:5",
    "nodeId": "maroShtepi",
    "lineIndex": 5,
    "placeId": "maroShtepi",
    "text": "te dera fle një qen i vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-old-dog",
        "asset": "dog",
        "label": "Old dog sleeping at the door",
        "zone": "near",
        "attributes": {
          "pose": "sleeping"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
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
        "subject": "maro-old-dog",
        "kind": "beside",
        "target": "maro-house-door"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Old dog sleeping at the door, Door of Maro’s house. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtepi:6",
    "nodeId": "maroShtepi",
    "lineIndex": 6,
    "placeId": "maroShtepi",
    "text": "në muzg njerka rri te dera me një thes drithë.",
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
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Maro’s stepmother, Door of Maro’s house, Sack of grain. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtepi:7",
    "nodeId": "maroShtepi",
    "lineIndex": 7,
    "placeId": "maroShtepi",
    "text": "vajzat thonë: jo! natën në mulli rrinë xhindët!",
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
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
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
    "rationale": "The girls report night-spirits at the separate mill."
  },
  {
    "id": "description:maroShtepi:8",
    "nodeId": "maroShtepi",
    "lineIndex": 8,
    "placeId": "maroShtepi",
    "text": "njerka thërret në errësirë: Maro! ku je? merr drithin!",
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
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stepmother calls the embodied Maro, keeping the sack at the door."
  },
  {
    "id": "description:maroShtepi:9",
    "nodeId": "maroShtepi",
    "lineIndex": 9,
    "placeId": "maroShtepi",
    "text": "natën njerka rri ende te dera me thesin: Maro! ku je?",
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
        "key": "actor:maro-stepmother",
        "asset": "human",
        "label": "Maro’s stepmother",
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
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The stepmother calls the embodied Maro, keeping the sack at the door."
  },
  {
    "id": "description:maroShtepi:10",
    "nodeId": "maroShtepi",
    "lineIndex": 10,
    "placeId": "maroShtepi",
    "text": "qeni leh: vjen Maro Përhitura veshur në flori.",
    "conditions": {
      "all": [
        "embodying:maro-perhitura",
        "flori"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-old-dog",
        "asset": "dog",
        "label": "Barking old dog",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
    "rationale": "The dog announces the returning embodied Maro and her gold; no duplicate Maro NPC is created."
  },
  {
    "id": "description:maroShtepi:11",
    "nodeId": "maroShtepi",
    "lineIndex": 11,
    "placeId": "maroShtepi",
    "text": "njerka hap derën dhe sheh florinjtë.",
    "conditions": {
      "all": [
        "embodying:maro-perhitura",
        "flori"
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
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
    "rationale": "This immediate scene establishes Maro’s stepmother, Door of Maro’s house, Gold received from the spirits. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtepi:12",
    "nodeId": "maroShtepi",
    "lineIndex": 12,
    "placeId": "maroShtepi",
    "text": "ajo rri pa fjalë. pastaj thotë me zë të ëmbël: trego! si?",
    "conditions": {
      "all": [
        "embodying:maro-perhitura",
        "flori"
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
    "rationale": "The same stepmother breaks her silence to ask what happened."
  },
  {
    "id": "description:maroNjerka:0",
    "nodeId": "maroNjerka",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti flet me njerkën.",
    "conditions": {
      "all": [
        "from:maroShtepi"
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
    "rationale": "The stepmother is the present conversation partner."
  },
  {
    "id": "description:maroNjerka:1",
    "nodeId": "maroNjerka",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "ajo thotë: burri im vdiq. tani unë e mbaj shtëpinë.",
    "conditions": {
      "all": [
        "flag:conversation:maro-stepmother:response:house"
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
    "rationale": "The stepmother recounts family history and the absent girl’s labor; her dead husband, village suitors and working girl are not in this conversation."
  },
  {
    "id": "description:maroNjerka:2",
    "nodeId": "maroNjerka",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "ajo thotë: vajzat e mia janë Lilo dhe Lena.",
    "conditions": {
      "all": [
        "flag:conversation:maro-stepmother:response:daughters"
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
    "rationale": "The stepmother recounts family history and the absent girl’s labor; her dead husband, village suitors and working girl are not in this conversation."
  },
  {
    "id": "description:maroNjerka:3",
    "nodeId": "maroNjerka",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "ajo thotë: vajza tjetër mban ujë, mban dru, dhe punon për ne.",
    "conditions": {
      "all": [
        "flag:conversation:maro-stepmother:response:work"
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
    "rationale": "The stepmother recounts family history and the absent girl’s labor; her dead husband, village suitors and working girl are not in this conversation."
  },
  {
    "id": "description:maroNjerka:4",
    "nodeId": "maroNjerka",
    "lineIndex": 4,
    "placeId": "maroShtepi",
    "text": "po ajo nuk është vajza ime. djemtë e fshatit duan vajzën tjetër, jo vajzat e mia.",
    "conditions": {
      "all": [
        "flag:conversation:maro-stepmother:response:work"
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
    "rationale": "The stepmother recounts family history and the absent girl’s labor; her dead husband, village suitors and working girl are not in this conversation."
  },
  {
    "id": "description:maroNisja:0",
    "nodeId": "maroNisja",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti thua: unë jam Maro.",
    "conditions": {
      "all": [
        "from:maroShtepi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The player identifies as Maro; no second Maro body is drawn."
  },
  {
    "id": "description:maroNisja:1",
    "nodeId": "maroNisja",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "Njerka vë thesin me drithë te këmbët e tua.",
    "conditions": {
      "all": [
        "drithe"
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
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
    "rationale": "The sack is placed at the embodied player’s feet."
  },
  {
    "id": "description:maroNisja:2",
    "nodeId": "maroNisja",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "vajzat qeshin te dera.",
    "conditions": {
      "all": [
        "from:maroShtepi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
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
    "rationale": "This immediate scene establishes Lilo, Lena, Door of Maro’s house. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroNisja:3",
    "nodeId": "maroNisja",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "njerka thotë: mos u tremb, se s' të ha as kukudhi.",
    "conditions": {
      "all": [
        "from:maroShtepi"
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
    "rationale": "The stepmother invokes a kukudh as a taunt; no kukudh appears."
  },
  {
    "id": "description:maroNisja:4",
    "nodeId": "maroNisja",
    "lineIndex": 4,
    "placeId": "maroShtepi",
    "text": "te dera rri furka me li.",
    "conditions": {
      "all": [
        "furke"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-distaff",
        "asset": "distaff",
        "label": "Distaff with flax",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-flax",
        "asset": "flax",
        "label": "Flax to spin",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
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
        "subject": "maro-distaff",
        "kind": "beside",
        "target": "maro-house-door"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Distaff with flax, Flax to spin, Door of Maro’s house. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroNisja:5",
    "nodeId": "maroNisja",
    "lineIndex": 5,
    "placeId": "maroShtepi",
    "text": "ti mban thesin me drithë.",
    "conditions": {
      "all": [
        "drithe"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
    "rationale": "This immediate scene establishes Sack of grain. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroNisja:6",
    "nodeId": "maroNisja",
    "lineIndex": 6,
    "placeId": "maroShtepi",
    "text": "rruga në mulli zbret në errësirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mill-road",
        "asset": "road",
        "label": "Dark road to the mill",
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
    "rationale": "This immediate scene establishes Dark road to the mill. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroNisja:7",
    "nodeId": "maroNisja",
    "lineIndex": 7,
    "placeId": "maroShtepi",
    "text": "ti merr thesin me drithë.",
    "conditions": {
      "all": [
        "arrival:action:story:maro-nisja:merr-thes-me-drithe"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
    "rationale": "This immediate scene establishes Sack of grain. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroNisja:8",
    "nodeId": "maroNisja",
    "lineIndex": 8,
    "placeId": "maroShtepi",
    "text": "ti merr furkën dhe lirin",
    "conditions": {
      "all": [
        "arrival:action:story:maro-nisja:merr-furke-dhe-li"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-distaff",
        "asset": "distaff",
        "label": "Distaff with flax",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-flax",
        "asset": "flax",
        "label": "Flax to spin",
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
    "rationale": "This immediate scene establishes Distaff with flax, Flax to spin. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroMulli1:0",
    "nodeId": "maroMulli1",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "nata bie. rruga poshtë është e zezë, dhe vetëm uji flet larg.",
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
        "key": "maro-mill-road",
        "asset": "road",
        "label": "Dark road to the mill",
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
    "rationale": "The dark descending road is seen; distant water is audible and does not imply water underfoot."
  },
  {
    "id": "description:maroMulli1:1",
    "nodeId": "maroMulli1",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "ti hyn në mulli me thesin.",
    "conditions": {
      "all": [
        "from:mulli1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-mill",
        "asset": "mill",
        "label": "Mill in Maro’s tale",
        "zone": "front",
        "attributes": {
          "interior": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
        "subject": "viewer",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "Maro enters the mill carrying the grain sack; the mill interior encloses the embodied viewpoint."
  },
  {
    "id": "description:maroMulli1:2",
    "nodeId": "maroMulli1",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "dera rri e hapur. brenda nuk është njeri.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mill-door",
        "asset": "door",
        "label": "Night mill door",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-night-mill",
        "asset": "mill",
        "label": "Interior of Maro’s mill",
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
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "maro-night-mill"
      },
      {
        "subject": "maro-mill-door",
        "kind": "part-of",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "The open door and explicitly empty interior establish the same mill enclosure after arrival; no unseen night-spirit bodies are invented."
  },
  {
    "id": "description:maroMulli1:3",
    "nodeId": "maroMulli1",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "drita e plakut rri te muri, pa zjarr.",
    "conditions": {
      "all": [
        "fixture:millLamp:live"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mill-lamp",
        "asset": "lamp",
        "label": "Miller’s lamp",
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
        "key": "maro-mill-wall",
        "asset": "wall",
        "label": "Wall beside the miller’s lamp",
        "zone": "front",
        "attributes": {
          "componentPartId": "back-wall"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-mill-wall",
        "kind": "part-of",
        "target": "maro-night-mill"
      },
      {
        "subject": "maro-mill-lamp",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Miller’s lamp, Wall beside the miller’s lamp. The embodied player is the viewpoint, not a second visible body. The mentioned wall is a panel of this same mill, not a free-standing slab across its occupants. The chosen back panel is an illustrative side; the text does not name a compass side."
  },
  {
    "id": "description:maroMulli1:4",
    "nodeId": "maroMulli1",
    "lineIndex": 4,
    "placeId": "maroMulli1",
    "text": "drita bën hije mbi mur.",
    "conditions": {
      "all": [
        "fixture:millLamp:live"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mill-lamp",
        "asset": "lamp",
        "label": "Miller’s lamp",
        "zone": "near",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-mill-wall",
        "asset": "wall",
        "label": "Wall carrying lamplight shadows",
        "zone": "front",
        "attributes": {
          "componentPartId": "back-wall"
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-mill-wall",
        "kind": "part-of",
        "target": "maro-night-mill"
      },
      {
        "subject": "maro-mill-lamp",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Miller’s lamp, Wall carrying lamplight shadows. The embodied player is the viewpoint, not a second visible body. The mentioned wall is a panel of this same mill, not a free-standing slab across its occupants. The chosen back panel is an illustrative side; the text does not name a compass side."
  },
  {
    "id": "description:maroMulli1:5",
    "nodeId": "maroMulli1",
    "lineIndex": 5,
    "placeId": "maroMulli1",
    "text": "mulliri rri i qetë. uji flet nën gur.",
    "conditions": {
      "all": [
        "flag:bluarje"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-mill",
        "asset": "mill",
        "label": "Mill in Maro’s tale",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-millstone",
        "asset": "millstone",
        "label": "Maro’s millstone",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-mill-water",
        "asset": "river",
        "label": "Water running beneath the millstone",
        "zone": "below",
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
        "subject": "maro-mill-water",
        "kind": "under",
        "target": "maro-millstone"
      },
      {
        "subject": "maro-millstone",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Mill in Maro’s tale, Maro’s millstone, Water running beneath the millstone. The embodied player is the viewpoint, not a second visible body. The working grinding stone belongs within the same entered mill, while the source-stated water remains beneath it. Its unmeasured indoor position is illustrative."
  },
  {
    "id": "description:maroMulli1:6",
    "nodeId": "maroMulli1",
    "lineIndex": 6,
    "placeId": "maroMulli1",
    "text": "ditën plaku vë drithë te guri; natën guri fle.",
    "conditions": {
      "all": [
        "flag:bluarje"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The old miller’s daytime routine is narrated at the empty night mill; he is not physically present now."
  },
  {
    "id": "description:maroMulli1:7",
    "nodeId": "maroMulli1",
    "lineIndex": 7,
    "placeId": "maroMulli1",
    "text": "furka me li rri në dorën tënde: natën e gjatë, kush rri, tjerr.",
    "conditions": {
      "all": [
        "furke"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-distaff",
        "asset": "distaff",
        "label": "Distaff with flax",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-flax",
        "asset": "flax",
        "label": "Flax to spin",
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
    "rationale": "This immediate scene establishes Distaff with flax, Flax to spin. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroMulli1:8",
    "nodeId": "maroMulli1",
    "lineIndex": 8,
    "placeId": "maroMulli1",
    "text": "mulliri punon me drithin tënd.",
    "conditions": {
      "all": [
        "flag:bluarje"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-millstone",
        "asset": "millstone",
        "label": "Maro’s millstone",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
        "subject": "maro-millstone",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Maro’s millstone, Sack of grain. The embodied player is the viewpoint, not a second visible body. The working grinding stone belongs within the same entered mill, while the source-stated water remains beneath it. Its unmeasured indoor position is illustrative."
  },
  {
    "id": "description:maroMulli1:9",
    "nodeId": "maroMulli1",
    "lineIndex": 9,
    "placeId": "maroMulli1",
    "text": "dikush ecën në errësirë afër derës.",
    "conditions": {
      "all": [
        "npcAt:xhindet:mulli1"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Unidentified footsteps in darkness are audible; the source does not reveal a body to model."
  },
  {
    "id": "description:maroMulli1:10",
    "nodeId": "maroMulli1",
    "lineIndex": 10,
    "placeId": "maroMulli1",
    "text": "ti ndiz dritën",
    "conditions": {
      "all": [
        "arrival:action:story:maro-mulli1:ndiz-drite"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mill-lamp",
        "asset": "lamp",
        "label": "Miller’s lamp",
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
    "rationale": "This immediate scene establishes Miller’s lamp. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroMulli1:11",
    "nodeId": "maroMulli1",
    "lineIndex": 11,
    "placeId": "maroMulli1",
    "text": "ti vër drithin në mulli",
    "conditions": {
      "all": [
        "arrival:action:story:maro-mulli1:ve-drithe-ne-mulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-millstone",
        "asset": "millstone",
        "label": "Maro’s millstone",
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
        "subject": "maro-grain-sack",
        "kind": "near",
        "target": "maro-millstone"
      },
      {
        "subject": "maro-millstone",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Sack of grain, Maro’s millstone. The embodied player is the viewpoint, not a second visible body. The working grinding stone belongs within the same entered mill, while the source-stated water remains beneath it. Its unmeasured indoor position is illustrative."
  },
  {
    "id": "description:maroXhindet1:0",
    "nodeId": "maroXhindet1",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "drita rri ndezur te dera.",
    "conditions": {
      "all": [
        "fixture:millLamp:live"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mill-lamp",
        "asset": "lamp",
        "label": "Miller’s lamp",
        "zone": "near",
        "attributes": {
          "burning": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-mill-door",
        "asset": "door",
        "label": "Night mill door",
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
        "subject": "maro-mill-lamp",
        "kind": "beside",
        "target": "maro-mill-door"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Miller’s lamp, Night mill door. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroXhindet1:1",
    "nodeId": "maroXhindet1",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "zëra vijnë nga errësira.",
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
    "rationale": "The night-spirits surround and address Maro but the exact source explicitly says she sees nobody. Audible presence is recorded without fabricated visible humanoids."
  },
  {
    "id": "description:maroXhindet1:2",
    "nodeId": "maroXhindet1",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "xhindët këndojnë dhe qeshin në errësirë, po ti nuk sheh njeri.",
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
    "rationale": "The night-spirits surround and address Maro but the exact source explicitly says she sees nobody. Audible presence is recorded without fabricated visible humanoids."
  },
  {
    "id": "description:maroXhindet1:3",
    "nodeId": "maroXhindet1",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "ata të vënë në mes, po nuk të bëjnë gjë.",
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
    "rationale": "The night-spirits surround and address Maro but the exact source explicitly says she sees nobody. Audible presence is recorded without fabricated visible humanoids."
  },
  {
    "id": "description:maroXhindet1:4",
    "nodeId": "maroXhindet1",
    "lineIndex": 4,
    "placeId": "maroMulli1",
    "text": "xhindët pyesin: ç' është ajo, që tjerr?",
    "conditions": {
      "all": [
        "furke"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The night-spirits surround and address Maro but the exact source explicitly says she sees nobody. Audible presence is recorded without fabricated visible humanoids."
  },
  {
    "id": "description:maroXhindet1:5",
    "nodeId": "maroXhindet1",
    "lineIndex": 5,
    "placeId": "maroMulli1",
    "text": "xhindët pyesin: ç' bën ti këtu natën?",
    "conditions": {
      "all": [
        "furke"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "The night-spirits surround and address Maro but the exact source explicitly says she sees nobody. Audible presence is recorded without fabricated visible humanoids."
  },
  {
    "id": "description:maroXhindet1:6",
    "nodeId": "maroXhindet1",
    "lineIndex": 6,
    "placeId": "maroMulli1",
    "text": "ti nuk ke as furkë, as li.",
    "conditions": {
      "all": [
        "furke"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "maro-distaff",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "maro-flax",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "absence",
    "rationale": "The player explicitly lacks both spinning tools."
  },
  {
    "id": "description:maroXhindet1:7",
    "nodeId": "maroXhindet1",
    "lineIndex": 7,
    "placeId": "maroMulli1",
    "text": "kjo natë ka vetëm li dhe mundim.",
    "conditions": {
      "all": [
        "furke"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-flax",
        "asset": "flax",
        "label": "Flax to spin",
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
    "rationale": "The flax is present; hardship is a nonvisual judgment."
  },
  {
    "id": "description:maroLitani1:0",
    "nodeId": "maroLitani1",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "ti thua: kjo është gjë, që ka shumë mundim.",
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
    "rationale": "Maro speaks of hardship before recounting the work."
  },
  {
    "id": "description:maroLitani1:1",
    "nodeId": "maroLitani1",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "xhindët thonë: të thuash, se ç' mundim ka.",
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
    "rationale": "The still unseen voices ask about the work; no bodies are described in this sentence."
  },
  {
    "id": "description:maroLitani1:2",
    "nodeId": "maroLitani1",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "ti tregon nga fusha:",
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
    "rationale": "Maro recounts growing, gathering and tying flax in the field; those past field actions do not happen inside the mill."
  },
  {
    "id": "description:maroLitani1:3",
    "nodeId": "maroLitani1",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "pa e mbjellim, pa e mbledhim, pa e lidhim.",
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
    "rationale": "Maro recounts growing, gathering and tying flax in the field; those past field actions do not happen inside the mill."
  },
  {
    "id": "description:maroLitani1:4",
    "nodeId": "maroLitani1",
    "lineIndex": 4,
    "placeId": "maroMulli1",
    "text": "xhindët rrinë me gojë hapur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This later source explicitly gives the spirits visible open mouths, establishing their forms at this beat."
  },
  {
    "id": "description:maroLitani1:5",
    "nodeId": "maroLitani1",
    "lineIndex": 5,
    "placeId": "maroMulli1",
    "text": "një Xhind vë një gjë të artë mbi ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-giving-spirit",
        "asset": "spirit",
        "label": "Spirit placing a golden ornament",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
        "subject": "maro-giving-spirit",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "A single spirit is now explicitly witnessed giving actual gold. The spirit giving the gift participates in the same indoor mill encounter, rather than standing beyond the mill wall."
  },
  {
    "id": "description:maroLitani1:6",
    "nodeId": "maroLitani1",
    "lineIndex": 6,
    "placeId": "maroMulli1",
    "text": "ata pyesin përsëri: po furka? vazhdo, mos ndalo! ata duan më.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "mixed",
    "rationale": "The present spirits ask to continue the story of the distaff."
  },
  {
    "id": "description:maroLitani2:0",
    "nodeId": "maroLitani2",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "ti tregon për furkën:",
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
    "rationale": "Maro tells how flax is put on the distaff and spun; the recounted workflow is not separate laborers in the mill."
  },
  {
    "id": "description:maroLitani2:1",
    "nodeId": "maroLitani2",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "pa e vëmë në furkë, pa e tjerrim.",
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
    "rationale": "Maro tells how flax is put on the distaff and spun; the recounted workflow is not separate laborers in the mill."
  },
  {
    "id": "description:maroLitani2:2",
    "nodeId": "maroLitani2",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "xhindët vënë flori mbi flori mbi ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Night-spirits around Maro, Gold received from the spirits. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLitani2:3",
    "nodeId": "maroLitani2",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "nata shkon; ti flet dhe flet.",
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
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Time passes through the night while the player speaks."
  },
  {
    "id": "description:maroLitani2:4",
    "nodeId": "maroLitani2",
    "lineIndex": 4,
    "placeId": "maroMulli1",
    "text": "ata pyesin: po rrobat e vjetra? vazhdo, mos ndalo! ata duan më.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "mixed",
    "rationale": "The spirits request the next part of the narrated clothing process."
  },
  {
    "id": "description:maroLitani3:0",
    "nodeId": "maroLitani3",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "pa e lajmë, pa e presim, pa e qepim, pa e veshim.",
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
    "rationale": "Washing, cutting, sewing and wearing are the narrated flax litany, not four simultaneous modeled actions."
  },
  {
    "id": "description:maroLitani3:1",
    "nodeId": "maroLitani3",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "gjeli këndon. xhindët ikin si era.",
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
    "rationale": "The rooster is heard offscreen and the spirits disappear; their departure does not leave visible copies."
  },
  {
    "id": "description:maroLitani3:2",
    "nodeId": "maroLitani3",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "ti je veshur në flori, nga koka te këmbët.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
    "rationale": "The embodied player wears the gold; the gold is inspectable without adding a duplicate body."
  },
  {
    "id": "description:maroLitani3:3",
    "nodeId": "maroLitani3",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "mielli yt është gati. drita e ditës vjen.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-flour",
        "asset": "flour",
        "label": "Maro’s finished flour",
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
        "property": "phase",
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Maro’s finished flour. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLitani3:4",
    "nodeId": "maroLitani3",
    "lineIndex": 4,
    "placeId": "maroMulli1",
    "text": "ti mban miellin dhe floririn.",
    "conditions": {
      "all": [
        "flag:maroFlourTaken"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-flour",
        "asset": "flour",
        "label": "Maro’s finished flour",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
    "rationale": "This immediate scene establishes Maro’s finished flour, Gold received from the spirits. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLitani3:5",
    "nodeId": "maroLitani3",
    "lineIndex": 5,
    "placeId": "maroMulli1",
    "text": "ti lë miellin pranë gurit e mullirit.",
    "conditions": {
      "all": [
        "arrival:action:maro-put-down-flour"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-flour",
        "asset": "flour",
        "label": "Maro’s finished flour",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-millstone",
        "asset": "millstone",
        "label": "Maro’s millstone",
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
        "subject": "maro-flour",
        "kind": "beside",
        "target": "maro-millstone"
      },
      {
        "subject": "maro-millstone",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Maro’s finished flour, Maro’s millstone. The embodied player is the viewpoint, not a second visible body. The working grinding stone belongs within the same entered mill, while the source-stated water remains beneath it. Its unmeasured indoor position is illustrative."
  },
  {
    "id": "description:maroLitani3:6",
    "nodeId": "maroLitani3",
    "lineIndex": 6,
    "placeId": "maroMulli1",
    "text": "Në dritën e ditës, ti sheh rrugën për në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-home-road",
        "asset": "road",
        "label": "Daylit road home",
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
        "value": "day"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Daylit road home. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtremberDore:0",
    "nodeId": "maroShtremberDore",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "fjala jote bie si gur.",
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
    "rationale": "The harsh word falling like stone is a metaphor, not a thrown rock."
  },
  {
    "id": "description:maroShtremberDore:1",
    "nodeId": "maroShtremberDore",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "xhindët të marrin dorën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "The spirits seize the embodied player’s hand; no independent hand or duplicate player is invented."
  },
  {
    "id": "description:maroShtremberDore:2",
    "nodeId": "maroShtremberDore",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "dora bëhet e shtrembër. ajo rri si dru i vjetër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "viewer:hand",
        "asset": "hand",
        "label": "Maro’s twisted hand",
        "zone": "near",
        "attributes": {
          "twisted": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "embodiment",
        "offset": [
          -0.35,
          1.05,
          -0.8
        ]
      }
    ],
    "states": [
      {
        "key": "viewer",
        "property": "handTwisted",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied player can see this twisted hand close to the eye. One hand mesh represents the exact bodily state without inventing another player body."
  },
  {
    "id": "description:maroShtremberDore:3",
    "nodeId": "maroShtremberDore",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "ata pyesin përsëri: po furka?",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "mixed",
    "rationale": "The present spirits request the flax story and explain the taboo."
  },
  {
    "id": "description:maroShtremberDore:4",
    "nodeId": "maroShtremberDore",
    "lineIndex": 4,
    "placeId": "maroMulli1",
    "text": "ata duan mundimin e lirit, jo fjalë të këqija. trego, ose mos thuaj më.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "mixed",
    "rationale": "The present spirits request the flax story and explain the taboo."
  },
  {
    "id": "description:maroDoraFalje:0",
    "nodeId": "maroDoraFalje",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "ti tregon mundimin deri në fund.",
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
    "rationale": "Maro finishes her spoken account."
  },
  {
    "id": "description:maroDoraFalje:1",
    "nodeId": "maroDoraFalje",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "xhindët dëgjojnë pa zë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
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
    "rationale": "This immediate scene establishes Night-spirits around Maro. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroDoraFalje:2",
    "nodeId": "maroDoraFalje",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "gjeli këndon. ata ikin.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "maro-night-spirits",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "absence",
    "rationale": "The rooster is heard and spirits depart."
  },
  {
    "id": "description:maroDoraFalje:3",
    "nodeId": "maroDoraFalje",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "dora jote është e drejtë përsëri. flori nuk ka.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "viewer:hand",
        "asset": "hand",
        "label": "Maro’s healed hand",
        "zone": "near",
        "attributes": {
          "twisted": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "embodiment",
        "offset": [
          -0.35,
          1.05,
          -0.8
        ]
      }
    ],
    "states": [
      {
        "key": "viewer",
        "property": "handTwisted",
        "value": false
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied player can see this restored hand close to the eye. One hand mesh represents the exact bodily state without inventing another player body."
  },
  {
    "id": "description:maroLiloNis:0",
    "nodeId": "maroLiloNis",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti tregon gjithçka: mulliri, nata, xhindët, floriri.",
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
    "rationale": "Maro recounts the completed mill encounter; spirits and mill remain elsewhere."
  },
  {
    "id": "description:maroLiloNis:1",
    "nodeId": "maroLiloNis",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "njerka thotë: sonte shkon Lilo! nesër ajo vjen me flori!",
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
    "rationale": "The stepmother predicts a future gold return before Lilo leaves."
  },
  {
    "id": "description:maroLiloNis:2",
    "nodeId": "maroLiloNis",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "Në muzg, Lilo merr drithë dhe furkën dhe bëhet gati për të shkuar në mulli.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-distaff",
        "asset": "distaff",
        "label": "Distaff with flax",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-flax",
        "asset": "flax",
        "label": "Flax to spin",
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
        "property": "phase",
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Lilo, Sack of grain, Distaff with flax, Flax to spin. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLiloNis:3",
    "nodeId": "maroLiloNis",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "Shtëpia është e qetë si gur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "Quiet as stone is a simile, not a stone house transformation."
  },
  {
    "id": "description:maroLiloKthim:0",
    "nodeId": "maroLiloKthim",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti fle, ndërsa Lilo shkon vetëm në mulli.",
    "conditions": {
      "all": [
        "arrival:action:maro-sleep-while-lilo-goes"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Lilo’s night journey occurs offstage while the viewpoint sleeps at home."
  },
  {
    "id": "description:maroLiloKthim:1",
    "nodeId": "maroLiloKthim",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "ti i thua Lilos, por ajo qesh dhe shkon vetëm në mulli.",
    "conditions": {
      "all": [
        "arrival:action:maro-warn-lilo"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "far",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
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
    "rationale": "The player warns Lilo as she departs alone."
  },
  {
    "id": "description:maroLiloKthim:2",
    "nodeId": "maroLiloKthim",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "në mëngjes njerëzit e mullirit sjellin Lilon mbi një kalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883",
          "twisted": true,
          "pose": "sitting"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "lilo-return-horse",
        "asset": "horse",
        "label": "Horse carrying Lilo",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "mill-return-men",
        "asset": "human",
        "label": "Mill people bringing Lilo home",
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
        "value": "day"
      }
    ],
    "relations": [
      {
        "subject": "actor:lilo",
        "kind": "on",
        "target": "lilo-return-horse"
      },
      {
        "subject": "mill-return-men",
        "kind": "beside",
        "target": "lilo-return-horse"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Lilo, Horse carrying Lilo, Mill people bringing Lilo home. The embodied player is the viewpoint, not a second visible body. The arriving mill workers remain alongside the horse that carries Lilo, in the visible homecoming group."
  },
  {
    "id": "description:maroLiloKthim:3",
    "nodeId": "maroLiloKthim",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "Lilo është e shtrembër: duart, këmbët, koka.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883",
          "twisted": true
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
    "rationale": "This immediate scene establishes Lilo. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLiloKthim:4",
    "nodeId": "maroLiloKthim",
    "lineIndex": 4,
    "placeId": "maroShtepi",
    "text": "njerka qan me zë të madh.",
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
        "label": "Crying stepmother",
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
    "rationale": "This immediate scene establishes Crying stepmother. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLiloKthim:5",
    "nodeId": "maroLiloKthim",
    "lineIndex": 5,
    "placeId": "maroShtepi",
    "text": "ti je veshur në flori.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
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
    "rationale": "The embodied Maro still wears her own gold."
  },
  {
    "id": "description:maroLiloKthim:6",
    "nodeId": "maroLiloKthim",
    "lineIndex": 6,
    "placeId": "maroShtepi",
    "text": "priftërinjtë ndihmojnë, po dora e Lilos rri ende e shtrembër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883",
          "twisted": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "lilo-priests",
        "asset": "human",
        "label": "Priests helping Lilo",
        "zone": "near",
        "attributes": {
          "clothingColor": "#333c42"
        },
        "count": 2,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The plural priests are a representative pair; Lilo’s hand remains twisted."
  },
  {
    "id": "description:maroLiloKthim:7",
    "nodeId": "maroLiloKthim",
    "lineIndex": 7,
    "placeId": "maroShtepi",
    "text": "njerka thotë: ti punon si gjithmonë!",
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
    "rationale": "The stepmother assigns work rather than narrating its completion early."
  },
  {
    "id": "description:maroLiloKthim:8",
    "nodeId": "maroLiloKthim",
    "lineIndex": 8,
    "placeId": "maroShtepi",
    "text": "Mbrëmja është afër, por puna rri.",
    "conditions": {
      "all": [
        "flag:maroReturnWorkDone"
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
        "value": "dusk"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Evening approaches while work remains."
  },
  {
    "id": "description:maroLiloKthim:9",
    "nodeId": "maroLiloKthim",
    "lineIndex": 9,
    "placeId": "maroShtepi",
    "text": "ti mbaron punën që ajo të jep. Në muzg, shtëpia bëhet e qetë.",
    "conditions": {
      "all": [
        "flag:maroReturnWorkDone"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "The assigned work is completed and the home grows quiet."
  },
  {
    "id": "description:maroLiloKthim:10",
    "nodeId": "maroLiloKthim",
    "lineIndex": 10,
    "placeId": "maroShtepi",
    "text": "pas punës, një lajm për Lilo mund të vjen.",
    "conditions": {
      "all": [
        "flag:maroReturnWorkDone"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "nonvisual",
    "rationale": "Future news is an opportunity, not a new present messenger."
  },
  {
    "id": "description:maroLajmi:0",
    "nodeId": "maroLajmi",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti del nga shtëpia e tetos dhe kthehesh në shtëpi nëpër rrugët e fundit.",
    "conditions": {
      "all": [
        "from:maroTetua"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-last-lanes",
        "asset": "road",
        "label": "Last lanes of the village",
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
    "rationale": "This immediate scene establishes Poor house at the village edge, Last lanes of the village. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLajmi:1",
    "nodeId": "maroLajmi",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "një lajm vjen në fshat: një princ nga larg rri në një han, te udhëkryqi.",
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
    "rationale": "Village news reports the distant prince, dream shoes and nightly inn celebration; they are not present at Maro’s home."
  },
  {
    "id": "description:maroLajmi:2",
    "nodeId": "maroLajmi",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "princi sheh një vajzë në ëndërr. tani ai kërkon nusen me një këpucë.",
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
    "rationale": "Village news reports the distant prince, dream shoes and nightly inn celebration; they are not present at Maro’s home."
  },
  {
    "id": "description:maroLajmi:3",
    "nodeId": "maroLajmi",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "çdo natë në han është festë: çdo vajzë e re mund të vijë.",
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
    "rationale": "Village news reports the distant prince, dream shoes and nightly inn celebration; they are not present at Maro’s home."
  },
  {
    "id": "description:maroLajmi:4",
    "nodeId": "maroLajmi",
    "lineIndex": 4,
    "placeId": "maroShtepi",
    "text": "njerka dhe vajzat vishen me rroba të mira dhe qeshin me ty.",
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
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
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
    "rationale": "This immediate scene establishes Maro’s stepmother, Lilo, Lena. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroLajmi:5",
    "nodeId": "maroLajmi",
    "lineIndex": 5,
    "placeId": "maroShtepi",
    "text": "njerka thotë: ti s' je për atje.",
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
    "rationale": "The stepmother directly excludes Maro."
  },
  {
    "id": "description:maroLajmi:6",
    "nodeId": "maroLajmi",
    "lineIndex": 6,
    "placeId": "maroShtepi",
    "text": "ata ikin. ti rri vetëm në shtëpi.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
        "key": "actor:maro-stepmother",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "actor:lilo",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "actor:lena",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "Maro remains alone after the stepmother and girls depart."
  },
  {
    "id": "description:maroLajmi:7",
    "nodeId": "maroLajmi",
    "lineIndex": 7,
    "placeId": "maroShtepi",
    "text": "tetua jote, motra e nënës, rri afër, në rrugët e fundit.",
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
    "rationale": "The aunt’s nearby home is a destination; she is not in Maro’s house."
  },
  {
    "id": "description:maroTetua:0",
    "nodeId": "maroTetua",
    "lineIndex": 0,
    "placeId": "maroTetua",
    "text": "ti shkon te tetua me lot në sy.",
    "conditions": {
      "all": [
        "from:maroLajmi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-aunt-house",
        "asset": "house",
        "label": "Aunt’s house",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
    "rationale": "This immediate scene establishes Aunt’s house, Maro’s aunt. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroTetua:1",
    "nodeId": "maroTetua",
    "lineIndex": 1,
    "placeId": "maroTetua",
    "text": "Tetua sheh lot në sy të tuaj dhe pyet: do të shkosh ti te princi?",
    "conditions": {
      "all": [
        "from:maroLajmi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
    "rationale": "The aunt sees the embodied player’s tears and offers help; the prince stays offstage."
  },
  {
    "id": "description:maroTetua:2",
    "nodeId": "maroTetua",
    "lineIndex": 2,
    "placeId": "maroTetua",
    "text": "ajo është magjistare dhe thotë: kap dy minj, sill një kungull të madh.",
    "conditions": {
      "all": [
        "from:maroLajmi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
    "rationale": "She instructs Maro to collect exactly two mice and a pumpkin; the command precedes collecting them."
  },
  {
    "id": "description:maroTetua:3",
    "nodeId": "maroTetua",
    "lineIndex": 3,
    "placeId": "maroTetua",
    "text": "Shtëpia jote është prapa, në fund të rrugëve.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-last-lanes",
        "asset": "road",
        "label": "Lanes leading home",
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
    "rationale": "This immediate scene establishes Lanes leading home. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroTetua:4",
    "nodeId": "maroTetua",
    "lineIndex": 4,
    "placeId": "maroTetua",
    "text": "dy minj lëvizin pranë murit.",
    "conditions": {
      "all": [
        "minjte"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mice",
        "asset": "mouse",
        "label": "Two mice",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-aunt-wall",
        "asset": "wall",
        "label": "Wall beside the mice",
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
        "subject": "maro-mice",
        "kind": "beside",
        "target": "maro-aunt-wall"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Two mice, Wall beside the mice. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroTetua:5",
    "nodeId": "maroTetua",
    "lineIndex": 5,
    "placeId": "maroTetua",
    "text": "një kungull i madh rri pranë derës.",
    "conditions": {
      "all": [
        "kungulli"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-pumpkin",
        "asset": "pumpkin",
        "label": "Large pumpkin",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-aunt-door",
        "asset": "door",
        "label": "Aunt’s door",
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
        "subject": "maro-pumpkin",
        "kind": "beside",
        "target": "maro-aunt-door"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Large pumpkin, Aunt’s door. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroTetua:6",
    "nodeId": "maroTetua",
    "lineIndex": 6,
    "placeId": "maroTetua",
    "text": "tetua bën minjtë kuaj dhe kungullin karrocë.",
    "conditions": {
      "all": [
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
        "key": "maro-carriage-horses",
        "asset": "horse",
        "label": "Two transformed carriage horses",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-carriage",
        "asset": "cart",
        "label": "Magical carriage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [
      {
        "key": "maro-mice",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "maro-pumpkin",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The mice and pumpkin transform into the two horses and one carriage; their original forms must not remain alongside them."
  },
  {
    "id": "description:maroTetua:7",
    "nodeId": "maroTetua",
    "lineIndex": 7,
    "placeId": "maroTetua",
    "text": "ajo të vesh me rroba të arta.",
    "conditions": {
      "all": [
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
        "key": "maro-golden-clothes",
        "asset": "clothes",
        "label": "Golden clothing for Maro",
        "zone": "near",
        "attributes": {
          "color": "#d9b765"
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
    "rationale": "This immediate scene establishes Maro’s aunt, Golden clothing for Maro. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroTetua:8",
    "nodeId": "maroTetua",
    "lineIndex": 8,
    "placeId": "maroTetua",
    "text": "tetua thotë: hip në karrocë! hani është te udhëkryqi.",
    "conditions": {
      "all": [
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
        "key": "maro-carriage",
        "asset": "cart",
        "label": "Magical carriage",
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
    "rationale": "The aunt points to the actual carriage; the inn is a future destination."
  },
  {
    "id": "description:maroTetua:9",
    "nodeId": "maroTetua",
    "lineIndex": 9,
    "placeId": "maroTetua",
    "text": "kur të bjerë mesnata, kuajt bëhen minj, karroca bëhet kungull.",
    "conditions": {
      "all": [
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:maro-aunt",
        "asset": "human",
        "label": "Maro’s aunt",
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
    "rationale": "The midnight reversion is a future warning, not mice and pumpkin already present beside their transformed forms."
  },
  {
    "id": "description:maroTetua:10",
    "nodeId": "maroTetua",
    "lineIndex": 10,
    "placeId": "maroTetua",
    "text": "ti kap dy minj",
    "conditions": {
      "all": [
        "arrival:action:story:maro-tetua:kap-dy-mi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-mice",
        "asset": "mouse",
        "label": "Two mice",
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
    "rationale": "This immediate scene establishes Two mice. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroTetua:11",
    "nodeId": "maroTetua",
    "lineIndex": 11,
    "placeId": "maroTetua",
    "text": "ti merr një kungull",
    "conditions": {
      "all": [
        "arrival:action:story:maro-tetua:merr-nje-kungull"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-pumpkin",
        "asset": "pumpkin",
        "label": "Large pumpkin",
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
    "rationale": "This immediate scene establishes Large pumpkin. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroHani:0",
    "nodeId": "maroHani",
    "lineIndex": 0,
    "placeId": "maroHani",
    "text": "nata bie mbi rrugën.",
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
    "rationale": "Night falls over the road."
  },
  {
    "id": "description:maroHani:1",
    "nodeId": "maroHani",
    "lineIndex": 1,
    "placeId": "maroHani",
    "text": "karroca të sjell në han si një zonjë e madhe.",
    "conditions": {
      "all": [
        "from:maroTetua"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-carriage",
        "asset": "cart",
        "label": "Magical carriage",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-carriage-horses",
        "asset": "horse",
        "label": "Two transformed carriage horses",
        "zone": "front",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-han-interior",
        "asset": "interior",
        "label": "Interior of the crossroads han",
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
    "rationale": "This immediate scene establishes Magical carriage, Two transformed carriage horses, Interior of the crossroads han. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroHani:2",
    "nodeId": "maroHani",
    "lineIndex": 2,
    "placeId": "maroHani",
    "text": "ti shkon drejt në han me floririn që xhindët të dhanë.",
    "conditions": {
      "all": [
        "from:maroLajmi"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-gold",
        "asset": "gold",
        "label": "Gold received from the spirits",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-han-interior",
        "asset": "interior",
        "label": "Interior of the crossroads han",
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
    "rationale": "This arrival uses the spirits’ gold and does not imply the aunt’s carriage."
  },
  {
    "id": "description:maroHani:3",
    "nodeId": "maroHani",
    "lineIndex": 3,
    "placeId": "maroHani",
    "text": "brenda është festë: dritë, zëra, vajza me rroba të mira.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-han-interior",
        "asset": "interior",
        "label": "Interior of the crossroads han",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-inn-maidens",
        "asset": "human",
        "label": "Young women at the celebration",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#a97786"
        },
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "han-lights",
        "asset": "lamp",
        "label": "Lights inside the celebration",
        "zone": "front",
        "attributes": {
          "burning": true
        },
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "prop"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "maro-han-interior"
      },
      {
        "subject": "maro-inn-maidens",
        "kind": "inside",
        "target": "maro-han-interior"
      },
      {
        "subject": "han-lights",
        "kind": "inside",
        "target": "maro-han-interior"
      }
    ],
    "disposition": "physical",
    "rationale": "The celebration takes place inside the han: the embodied viewer, young women and lights occupy that room."
  },
  {
    "id": "description:maroHani:4",
    "nodeId": "maroHani",
    "lineIndex": 4,
    "placeId": "maroHani",
    "text": "princi të sheh dhe të merr pranë.",
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
        "label": "Maro’s prince",
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
    "rationale": "This immediate scene establishes Maro’s prince. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroHani:5",
    "nodeId": "maroHani",
    "lineIndex": 5,
    "placeId": "maroHani",
    "text": "ai nxjerr këpucët e ëndrrës. vajzat vënë këpucët në këmbë: jo, dhe jo, dhe jo.",
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
        "label": "Maro’s prince",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-inn-maidens",
        "asset": "human",
        "label": "Young women at the celebration",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#a97786"
        },
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-dream-shoes",
        "asset": "shoe",
        "label": "Pair of dream shoes",
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
    "rationale": "This immediate scene establishes Maro’s prince, Young women at the celebration, Pair of dream shoes. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroHani:6",
    "nodeId": "maroHani",
    "lineIndex": 6,
    "placeId": "maroHani",
    "text": "Princi vë këpucët në këmbët e tua: të rrinë mirë.",
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
        "label": "Maro’s prince",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-dream-shoes",
        "asset": "shoe",
        "label": "Pair of dream shoes",
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
    "rationale": "The shoes fit the embodied player; no duplicate Maro appears."
  },
  {
    "id": "description:maroHani:7",
    "nodeId": "maroHani",
    "lineIndex": 7,
    "placeId": "maroHani",
    "text": "princi thotë: rri edhe pak, edhe pak!",
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
        "label": "Maro’s prince",
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
    "rationale": "The prince asks Maro to stay."
  },
  {
    "id": "description:maroHani:8",
    "nodeId": "maroHani",
    "lineIndex": 8,
    "placeId": "maroHani",
    "text": "nata shkon. mesnata vjen afër.",
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
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "Midnight approaches as the party continues."
  },
  {
    "id": "description:maroHani:9",
    "nodeId": "maroHani",
    "lineIndex": 9,
    "placeId": "maroHani",
    "text": "ti mban mend fjalët e tetos: ik para mesnatës!",
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
    "rationale": "Maro remembers her aunt’s warning; her aunt is not inside the han."
  },
  {
    "id": "description:maroIkja:0",
    "nodeId": "maroIkja",
    "lineIndex": 0,
    "placeId": "maroIkja",
    "text": "ti ikën para mesnatës. njerëzit e princit vijnë pas teje me kuaj.",
    "conditions": {
      "all": [
        "from:maroHani"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-prince-men",
        "asset": "human",
        "label": "The prince’s men",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "prince-pursuit-horses",
        "asset": "horse",
        "label": "Pursuing riders’ horses",
        "zone": "back",
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
    "rationale": "The pursuing men and horses follow the embodied player."
  },
  {
    "id": "description:maroIkja:1",
    "nodeId": "maroIkja",
    "lineIndex": 1,
    "placeId": "maroIkja",
    "text": "te dera e tetos, mesnata bie: karroca bëhet kungull para syve të tyre.",
    "conditions": {
      "all": [
        "from:maroHani",
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-aunt-door",
        "asset": "door",
        "label": "Aunt’s door",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-pumpkin",
        "asset": "pumpkin",
        "label": "Large pumpkin",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-mice",
        "asset": "mouse",
        "label": "Two mice",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-prince-men",
        "asset": "human",
        "label": "The prince’s men",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [
      {
        "key": "maro-carriage",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "maro-carriage-horses",
        "property": "presence",
        "value": "absent"
      },
      {
        "key": "environment",
        "property": "phase",
        "value": "night"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The midnight transformation replaces the carriage and horses with their original local forms."
  },
  {
    "id": "description:maroIkja:2",
    "nodeId": "maroIkja",
    "lineIndex": 2,
    "placeId": "maroIkja",
    "text": "ti ikën në këmbë. Njerëzit e princit vijnë pas teje gjatë rrugës dhe shohin në cilën shtëpi ti hyn.",
    "conditions": {
      "all": [
        "from:maroHani"
      ],
      "negate": false,
      "none": [
        "minjte",
        "kungulli"
      ],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-prince-men",
        "asset": "human",
        "label": "The prince’s men",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-home-road",
        "asset": "road",
        "label": "Road home",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "relations": [
      {
        "subject": "viewer",
        "kind": "inside",
        "target": "maro-poor-house"
      },
      {
        "subject": "maro-prince-men",
        "kind": "outside",
        "target": "maro-poor-house"
      }
    ],
    "disposition": "physical",
    "rationale": "This alternative flight is on foot; no carriage is assumed. The player has entered the identified house while the followers remain outside on the road. Their architectural occlusion from this indoor viewpoint is intentional; entering does not bring the pursuers inside."
  },
  {
    "id": "description:maroIkja:3",
    "nodeId": "maroIkja",
    "lineIndex": 3,
    "placeId": "maroIkja",
    "text": "njerëzit shikojnë dhe mbajnë mend shtëpinë tënde.",
    "conditions": {
      "all": [
        "from:maroHani",
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-prince-men",
        "asset": "human",
        "label": "The prince’s men",
        "zone": "front",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "This immediate scene establishes The prince’s men, Poor house at the village edge. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroIkja:4",
    "nodeId": "maroIkja",
    "lineIndex": 4,
    "placeId": "maroIkja",
    "text": "gjithçka ndryshon para syve të tyre, por shtëpia jote rri e njëjtë.",
    "conditions": {
      "all": [
        "from:maroHani",
        "minjte",
        "kungulli"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "The house remains stable as the already described magical forms change."
  },
  {
    "id": "description:maroMesnata:0",
    "nodeId": "maroMesnata",
    "lineIndex": 0,
    "placeId": "maroHani",
    "text": "mesnata bie në han: rroba e tua bëhen të vjetra para të gjitha.",
    "conditions": {
      "all": [
        "from:maroHani"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-han-interior",
        "asset": "interior",
        "label": "Interior of the crossroads han",
        "zone": "around",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-old-clothes",
        "asset": "clothes",
        "label": "Maro’s old clothing",
        "zone": "near",
        "attributes": {
          "color": "#827568"
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
        "value": "night"
      },
      {
        "key": "maro-golden-clothes",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Interior of the crossroads han, Maro’s old clothing. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroMesnata:1",
    "nodeId": "maroMesnata",
    "lineIndex": 1,
    "placeId": "maroHani",
    "text": "vajzat qeshin. po princi sheh këmbën tënde, jo rroba.",
    "conditions": {
      "all": [
        "from:maroHani"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-inn-maidens",
        "asset": "human",
        "label": "Young women at the celebration",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#a97786"
        },
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "Maro’s prince",
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
    "rationale": "The prince still notices the embodied player’s foot despite the old clothes."
  },
  {
    "id": "description:maroMesnata:2",
    "nodeId": "maroMesnata",
    "lineIndex": 2,
    "placeId": "maroHani",
    "text": "Dera hapet. Vajzat qeshin dhe dalin jashtë; princi i thotë njerëzve e tij: shkoni pas saj kur ajo ikën.",
    "conditions": {
      "all": [
        "from:maroHani"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-han-door",
        "asset": "door",
        "label": "Open han door",
        "zone": "front",
        "attributes": {
          "open": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-inn-maidens",
        "asset": "human",
        "label": "Young women at the celebration",
        "zone": "far",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#a97786"
        },
        "count": 5,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "Maro’s prince",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-prince-men",
        "asset": "human",
        "label": "The prince’s men",
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
    "rationale": "The girls visibly leave while the prince directs his actual men to follow later."
  },
  {
    "id": "description:maroMesnata:3",
    "nodeId": "maroMesnata",
    "lineIndex": 3,
    "placeId": "maroHani",
    "text": "pas mesnatës, askush nuk vjen.",
    "conditions": {
      "all": [
        "from:maroHani"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "absence",
    "rationale": "No one arrives after midnight."
  },
  {
    "id": "description:maroMesnata:4",
    "nodeId": "maroMesnata",
    "lineIndex": 4,
    "placeId": "maroHani",
    "text": "Rruga në shtëpi është e hapur.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-home-road",
        "asset": "road",
        "label": "Open road home",
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
    "rationale": "This immediate scene establishes Open road home. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroKthyerShtepi:0",
    "nodeId": "maroKthyerShtepi",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "ti vjen në shtëpi pas ikjes në mesnatë. Njerëzit e princit e njohin shtëpinë, por nuk janë kthyer ende.",
    "conditions": {
      "all": [
        "from:maroIkja"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "Maro has arrived home. The prince’s men are explicitly not back yet, so none is placed outside."
  },
  {
    "id": "description:maroKthyerShtepi:1",
    "nodeId": "maroKthyerShtepi",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "ti del nga han dhe kthehesh në shtëpi pas mesnatës. Njerëzit e princit e njohin shtëpinë, por nuk janë kthyer ende.",
    "conditions": {
      "all": [
        "from:maroMesnata"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
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
    "rationale": "Maro has arrived home. The prince’s men are explicitly not back yet, so none is placed outside."
  },
  {
    "id": "description:maroKthyerShtepi:2",
    "nodeId": "maroKthyerShtepi",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "Dera rri e hapur.",
    "conditions": {
      "all": [
        "flag:maroHomeDoorClosed"
      ],
      "negate": true,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
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
    "rationale": "This immediate scene establishes Door of Maro’s house. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroKthyerShtepi:3",
    "nodeId": "maroKthyerShtepi",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "ti mbyll derën. Njerëzit e princit nuk vijnë ende.",
    "conditions": {
      "all": [
        "arrival:action:maro-close-home-door"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-house-door",
        "asset": "door",
        "label": "Door of Maro’s house",
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
    "rationale": "The embodied player closes the door before the men arrive."
  },
  {
    "id": "description:maroKrushqit:0",
    "nodeId": "maroKrushqit",
    "lineIndex": 0,
    "placeId": "maroShtepi",
    "text": "pas shumë ditësh, një zhurmë e madhe vjen rrugës: princi vjen me këngë dhe me shumë njerëz.",
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
        "label": "Maro’s prince",
        "zone": "near",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-wedding-company",
        "asset": "human",
        "label": "Prince’s large wedding company",
        "zone": "front",
        "attributes": {},
        "count": 12,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The unspecified large company is represented by twelve people, not claimed as exactly twelve."
  },
  {
    "id": "description:maroKrushqit:1",
    "nodeId": "maroKrushqit",
    "lineIndex": 1,
    "placeId": "maroShtepi",
    "text": "ata rrinë rreth shtëpisë. këpucët janë për këmbën tënde. rroba të arta janë për ty.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-poor-house",
        "asset": "house",
        "label": "Poor house at the village edge",
        "zone": "front",
        "attributes": {},
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-wedding-company",
        "asset": "human",
        "label": "Wedding company around the house",
        "zone": "around",
        "attributes": {},
        "count": 12,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-dream-shoes",
        "asset": "shoe",
        "label": "Pair of dream shoes",
        "zone": "near",
        "attributes": {},
        "count": 2,
        "countExact": true,
        "persistence": "scene",
        "role": "prop"
      },
      {
        "key": "maro-golden-clothes",
        "asset": "clothes",
        "label": "Golden clothing offered to Maro",
        "zone": "near",
        "attributes": {
          "color": "#d9b765"
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
    "rationale": "This immediate scene establishes Poor house at the village edge, Wedding company around the house, Pair of dream shoes, Golden clothing offered to Maro. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroKrushqit:2",
    "nodeId": "maroKrushqit",
    "lineIndex": 2,
    "placeId": "maroShtepi",
    "text": "princi thotë: ti je gruaja ime.",
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
        "label": "Maro’s prince",
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
    "rationale": "The present prince declares the marriage."
  },
  {
    "id": "description:maroKrushqit:3",
    "nodeId": "maroKrushqit",
    "lineIndex": 3,
    "placeId": "maroShtepi",
    "text": "njerka rri pa fjalë prapa. vajzat qajnë me lot të mëdhenj— po sytë e tyre janë të thatë.",
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
        "zone": "back",
        "attributes": {
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883",
          "tears": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
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
    "rationale": "The sisters feign tears but their eyes are explicitly dry."
  },
  {
    "id": "description:maroKrushqit:4",
    "nodeId": "maroKrushqit",
    "lineIndex": 4,
    "placeId": "maroShtepi",
    "text": "motrat thonë: premto! na merr edhe ne afër teje!",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
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
    "rationale": "The sisters ask for a future promise."
  },
  {
    "id": "description:maroKrushqit:5",
    "nodeId": "maroKrushqit",
    "lineIndex": 5,
    "placeId": "maroShtepi",
    "text": "Njerëzit bëjnë goxha zhurmë nën dritare.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-wedding-company",
        "asset": "human",
        "label": "Noisy wedding company beneath the window",
        "zone": "front",
        "attributes": {},
        "count": 12,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-house-window",
        "asset": "window",
        "label": "Maro’s house window",
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
        "subject": "maro-wedding-company",
        "kind": "below",
        "target": "maro-house-window"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Noisy wedding company beneath the window, Maro’s house window. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroKrushqit:6",
    "nodeId": "maroKrushqit",
    "lineIndex": 6,
    "placeId": "maroShtepi",
    "text": "ti premton se motrat dhe njerka mund të rrinë afër. Princi pret pranë teje, gati për të ikur në pallat.",
    "conditions": {
      "all": [
        "flag:maroFamilyPromised"
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
          "variant": "woman"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lilo",
        "asset": "human",
        "label": "Lilo",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#996883"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:lena",
        "asset": "human",
        "label": "Lena",
        "zone": "near",
        "attributes": {
          "variant": "woman",
          "clothingColor": "#7b91ad"
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "actor:maro-prince",
        "asset": "human",
        "label": "Maro’s prince",
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
    "rationale": "The prince remains physically beside the player and ready to leave; the palace is a future arrival."
  },
  {
    "id": "description:maroNataHumbur:0",
    "nodeId": "maroNataHumbur",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "ti ikën nga mulliri në errësirë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-mill",
        "asset": "mill",
        "label": "Mill in Maro’s tale",
        "zone": "front",
        "attributes": {
          "interior": false
        },
        "count": 1,
        "countExact": true,
        "persistence": "place",
        "role": "setting"
      },
      {
        "key": "maro-mill-road",
        "asset": "road",
        "label": "Dark road to the mill",
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
    "relations": [
      {
        "subject": "viewer",
        "kind": "outside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Mill in Maro’s tale, Dark road to the mill. The embodied player is the viewpoint, not a second visible body. The player has left the mill; the earlier indoor viewpoint no longer applies to the departing scene."
  },
  {
    "id": "description:maroNataHumbur:1",
    "nodeId": "maroNataHumbur",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "thesi rri gati, po mielli nuk bëhet.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-grain-sack",
        "asset": "grain",
        "label": "Sack of grain",
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
    "rationale": "The sack remains grain; no finished flour is produced."
  },
  {
    "id": "description:maroNataHumbur:2",
    "nodeId": "maroNataHumbur",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "njerka të sheh dhe nuk thotë asgjë.",
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
    "rationale": "This immediate scene establishes Maro’s stepmother. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroNataHumbur:3",
    "nodeId": "maroNataHumbur",
    "lineIndex": 3,
    "placeId": "maroMulli1",
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
    "rationale": "The game-over notice is nonvisual."
  },
  {
    "id": "description:maroDoraShtember:0",
    "nodeId": "maroDoraShtember",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "ti rri deri në agim. gjeli këndon.",
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
        "property": "phase",
        "value": "dawn"
      }
    ],
    "relations": [],
    "disposition": "environment",
    "rationale": "The rooster is heard at dawn while the embodied player remains."
  },
  {
    "id": "description:maroDoraShtember:1",
    "nodeId": "maroDoraShtember",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "xhindët ikin pa fjalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "maro-night-spirits",
        "property": "presence",
        "value": "absent"
      }
    ],
    "relations": [],
    "disposition": "absence",
    "rationale": "The spirits leave silently."
  },
  {
    "id": "description:maroDoraShtember:2",
    "nodeId": "maroDoraShtember",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "dora jote rri e shtrembër.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "viewer:hand",
        "asset": "hand",
        "label": "Maro’s twisted hand",
        "zone": "near",
        "attributes": {
          "twisted": true
        },
        "count": 1,
        "countExact": true,
        "persistence": "scene",
        "role": "embodiment",
        "offset": [
          -0.35,
          1.05,
          -0.8
        ]
      }
    ],
    "states": [
      {
        "key": "viewer",
        "property": "handTwisted",
        "value": true
      }
    ],
    "relations": [],
    "disposition": "physical",
    "rationale": "The embodied player can see this twisted hand close to the eye. One hand mesh represents the exact bodily state without inventing another player body."
  },
  {
    "id": "description:maroDoraShtember:3",
    "nodeId": "maroDoraShtember",
    "lineIndex": 3,
    "placeId": "maroMulli1",
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
    "id": "description:maroShtrember:0",
    "nodeId": "maroShtrember",
    "lineIndex": 0,
    "placeId": "maroMulli1",
    "text": "ti thua: ju plasshin sytë!",
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
    "rationale": "Maro speaks the curse; no eyes are literally removed from the spirits."
  },
  {
    "id": "description:maroShtrember:1",
    "nodeId": "maroShtrember",
    "lineIndex": 1,
    "placeId": "maroMulli1",
    "text": "xhindët të marrin dorën tjetër, këmbët, kokën.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "maro-night-spirits",
        "asset": "spirit",
        "label": "Night-spirits around Maro",
        "zone": "near",
        "attributes": {},
        "count": 4,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      }
    ],
    "states": [],
    "relations": [
      {
        "subject": "maro-night-spirits",
        "kind": "inside",
        "target": "maro-night-mill"
      }
    ],
    "disposition": "physical",
    "rationale": "The spirits seize the embodied player; the cursed player is not duplicated as an NPC."
  },
  {
    "id": "description:maroShtrember:2",
    "nodeId": "maroShtrember",
    "lineIndex": 2,
    "placeId": "maroMulli1",
    "text": "ti sheh prapa, jo para.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [
      {
        "key": "viewer",
        "property": "facing",
        "value": "back"
      }
    ],
    "relations": [],
    "disposition": "mixed",
    "rationale": "The embodied head is turned backwards; this is a viewpoint state rather than a second person."
  },
  {
    "id": "description:maroShtrember:3",
    "nodeId": "maroShtrember",
    "lineIndex": 3,
    "placeId": "maroMulli1",
    "text": "në mëngjes njerëzit e mullirit të vënë mbi një kalë.",
    "conditions": {
      "all": [],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [
      {
        "key": "mill-return-men",
        "asset": "human",
        "label": "Mill people lifting Maro",
        "zone": "near",
        "attributes": {},
        "count": 3,
        "countExact": false,
        "persistence": "scene",
        "role": "participant"
      },
      {
        "key": "maro-return-horse",
        "asset": "horse",
        "label": "Horse carrying the injured viewpoint",
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
        "property": "phase",
        "value": "day"
      }
    ],
    "relations": [
      {
        "subject": "mill-return-men",
        "kind": "inside",
        "target": "maro-night-mill"
      },
      {
        "subject": "maro-return-horse",
        "kind": "inside",
        "target": "maro-night-mill"
      },
      {
        "subject": "viewer",
        "kind": "on",
        "target": "maro-return-horse"
      }
    ],
    "disposition": "physical",
    "rationale": "This immediate scene establishes Mill people lifting Maro, Horse carrying the injured viewpoint. The embodied player is the viewpoint, not a second visible body."
  },
  {
    "id": "description:maroShtrember:4",
    "nodeId": "maroShtrember",
    "lineIndex": 4,
    "placeId": "maroMulli1",
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
  }
])
