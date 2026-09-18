// Exact reviewed physical claims and nonvisual dispositions, one record per source line.
export default Object.freeze([
  {
    "id": "description:maroPrincesha:0",
    "nodeId": "maroPrincesha",
    "lineIndex": 0,
    "placeId": null,
    "text": "ti ikën vetëm nga dasma. Princi nuk vjen pas teje, dhe njerka mbetet te shtëpia.",
    "conditions": {
      "all": [
        "from:maroKrushqit"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "Departure is known, but the destination is unlocated. The prince and stepmother remain elsewhere and are not present in this view."
  },
  {
    "id": "description:maroPrincesha:1",
    "nodeId": "maroPrincesha",
    "lineIndex": 1,
    "placeId": null,
    "text": "ti ikën nga pallati para se fëmija të lindë. Njerka nuk ka paratë e pallatit, dhe asnjë mami e huaj nuk vjen afër teje.",
    "conditions": {
      "all": [
        "from:maroPallati"
      ],
      "negate": false,
      "none": [],
      "observationId": null
    },
    "objects": [],
    "states": [],
    "relations": [],
    "disposition": "reported",
    "rationale": "The safe departure has no located destination; the absent midwife and unpaid stepmother must not be staged nearby."
  },
  {
    "id": "description:maroPrincesha:2",
    "nodeId": "maroPrincesha",
    "lineIndex": 2,
    "placeId": null,
    "text": "larg pallatit, fëmija lind i sigurt.",
    "conditions": {
      "all": [
        "from:maroPallati"
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
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The born child is physically with the player, but the story does not locate this safe place on the world chart."
  },
  {
    "id": "description:maroPrincesha:3",
    "nodeId": "maroPrincesha",
    "lineIndex": 3,
    "placeId": null,
    "text": "ti ikën nga pallat me djalin tënd. tani jeni të sigurt, larg pallatit.",
    "conditions": {
      "all": [
        "from:maroGjilpera",
        "arrival:action:maro-leave-with-son"
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
    "states": [],
    "relations": [],
    "disposition": "physical",
    "rationale": "The player leaves with the existing son; only their companionship is located relative to the viewer, not a invented destination."
  }
])
