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
  },
{"id":"description:gjizarAnija:0","nodeId":"gjizarAnija","lineIndex":0,"placeId":null,"text":"ti shkon me kalë mbi qilimin e kuq, me Gjizar në dorë. kur arrin te anija, Bukura del dhe të pret.","conditions":{"all":["from:gjizarKthim","arrival:action:gjizar-ride-to-ship"],"negate":false,"none":[],"observationId":null},"objects":[{"key":"gjizar-beauty-ship","asset":"ship","label":"Beauty’s ship","zone":"front","attributes":{},"count":1,"persistence":"scene"},{"key":"gjizar-ride-horse","asset":"horse","label":"Horse for the journey","zone":"near","attributes":{},"count":1,"persistence":"scene"},{"key":"gjizar-red-carpet","asset":"cloth","label":"Red carpet leading to Beauty’s ship","zone":"front","attributes":{"variant":"rug","color":"#b73535"},"count":1,"persistence":"scene"},{"key":"animal:gjizar-bird","asset":"bird","label":"Gjizar","zone":"near","attributes":{},"count":1,"persistence":"scene"},{"key":"actor:gjizar-bukura","asset":"human","label":"Bukura","zone":"near","attributes":{"gender":"woman"},"count":1,"persistence":"scene"}],"states":[],"relations":[],"disposition":"physical","rationale":"After the ride the player reaches Beauty’s ship with Gjizar and Bukura comes out to welcome him. The source-bound local scene supplies no invented shoreline coordinates."},
{"id":"description:gjizarAnija:1","nodeId":"gjizarAnija","lineIndex":1,"placeId":null,"text":"Në anije, Bukura të pyet: si e ke marrë zogun? thuaj të drejtën.","conditions":{"all":[],"negate":false,"none":[],"observationId":null},"objects":[{"key":"gjizar-beauty-ship","asset":"ship","label":"Beauty’s ship","zone":"front","attributes":{},"count":1,"persistence":"scene"},{"key":"actor:gjizar-bukura","asset":"human","label":"Bukura","zone":"near","attributes":{"gender":"woman"},"count":1,"persistence":"scene"}],"states":[],"relations":[{"subject":"viewer","kind":"on","target":"gjizar-beauty-ship"},{"subject":"actor:gjizar-bukura","kind":"on","target":"gjizar-beauty-ship"}],"disposition":"mixed","rationale":"Aboard her ship, Bukura asks how the player obtained the bird; neither an answer nor a wedding precedes the tell-truth choice. UNCHARTED_SITES gjizar-beauty-ship and its exact zero-time gjizar-answer-on-ship transition preserve the already established ship during the question, answer and immediate promise. Viewer and Bukura stand on its deck; no world coordinate, coastline or later wedding venue is asserted."},
{"id":"description:gjizarFund:0","nodeId":"gjizarFund","lineIndex":0,"placeId":null,"text":"ti i tregon Bukurës të drejtën për zogun.","conditions":{"all":["arrival:action:gjizar-tell-truth"],"negate":false,"none":[],"observationId":null},"objects":[{"key":"gjizar-beauty-ship","asset":"ship","label":"Beauty’s ship","zone":"front","attributes":{},"count":1,"persistence":"scene"},{"key":"actor:gjizar-bukura","asset":"human","label":"Bukura","zone":"near","attributes":{"gender":"woman"},"count":1,"persistence":"scene"}],"states":[],"relations":[{"subject":"viewer","kind":"on","target":"gjizar-beauty-ship"},{"subject":"actor:gjizar-bukura","kind":"on","target":"gjizar-beauty-ship"}],"disposition":"mixed","rationale":"Only after the tell-truth action does the player answer the present Bukura; no king, rope or well is established here. UNCHARTED_SITES gjizar-beauty-ship and its exact zero-time gjizar-answer-on-ship transition preserve the already established ship during the question, answer and immediate promise. Viewer and Bukura stand on its deck; no world coordinate, coastline or later wedding venue is asserted."},
{"id":"description:gjizarFund:1","nodeId":"gjizarFund","lineIndex":1,"placeId":null,"text":"ajo thotë: unë do të martohem me ty. pastaj dasma vjen.","conditions":{"all":["arrival:action:gjizar-tell-truth"],"negate":false,"none":[],"observationId":null},"objects":[{"key":"gjizar-beauty-ship","asset":"ship","label":"Beauty’s ship","zone":"front","attributes":{},"count":1,"persistence":"scene"},{"key":"actor:gjizar-bukura","asset":"human","label":"Bukura","zone":"near","attributes":{"gender":"woman"},"count":1,"persistence":"scene"}],"states":[],"relations":[{"subject":"viewer","kind":"on","target":"gjizar-beauty-ship"},{"subject":"actor:gjizar-bukura","kind":"on","target":"gjizar-beauty-ship"}],"disposition":"mixed","rationale":"Bukura promises marriage and the wedding follows; unspecified guests, feast objects and ceremony locations are not invented. UNCHARTED_SITES gjizar-beauty-ship and its exact zero-time gjizar-answer-on-ship transition preserve the already established ship during the question, answer and immediate promise. Viewer and Bukura stand on its deck; no world coordinate, coastline or later wedding venue is asserted."},
{"id":"description:gjizarFund:2","nodeId":"gjizarFund","lineIndex":2,"placeId":null,"text":"Gjizar këndon, dhe përralla mbaron me një dasmë.","conditions":{"all":["arrival:action:gjizar-tell-truth"],"negate":true,"none":[],"observationId":null},"objects":[],"states":[],"relations":[],"disposition":"reported","rationale":"A legacy arrival retains the tale’s song and wedding without inventing the new ride, answer, ship arrival or current location; these concluding words add no actors or ceremony geometry."}
])
