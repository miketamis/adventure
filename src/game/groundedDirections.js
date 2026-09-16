// Actionable directions are information gaps, not destination buttons. The
// learner asks in Albanian, receives route cues, leaves the conversation, and
// applies those cues through ordinary world movement. This registry is the
// shared authoring and release-audit contract for every player-owned location
// question; reviewed non-navigation questions remain explicit so a new `ku`
// option cannot silently bypass the rule.

import {
  ELIRA_GUEST_ROOM_ASKED_CONDITION,
  ELIRA_GUEST_ROOM_RESPONSE_CONDITION,
  ELIRA_MARKET_ASKED_CONDITION,
  ELIRA_MARKET_RESPONSE_CONDITION,
  RIVER_SPRING_ASKED_CONDITION,
  RIVER_SPRING_RESPONSE_CONDITION,
  SQUARE_WATER_ASKED_CONDITION,
  SQUARE_WATER_RESPONSE_CONDITION,
} from './groundedDirectionConditions.js'

const freezeList = (value) => Object.freeze([...(value || [])])

const routeStep = ({ nodeId, to, cueIds, requires = [], wrongTurns = [] }) => Object.freeze({
  nodeId,
  to,
  cueIds: freezeList(cueIds),
  requires: freezeList(requires),
  wrongTurns: Object.freeze((wrongTurns || []).map((turn) => Object.freeze({
    nodeId: turn.nodeId || nodeId,
    to: turn.to,
    cueIds: freezeList(turn.cueIds),
  }))),
})

const contract = ({
  id,
  questions,
  askedCondition,
  responseCondition,
  responseNodeId,
  exitTo,
  responseCueIds,
  destinationNodeId,
  route,
}) => Object.freeze({
  id,
  questions: Object.freeze(questions.map((question) => Object.freeze({
    nodeId: question.nodeId,
    cueIds: freezeList(question.cueIds),
  }))),
  askedCondition,
  responseCondition,
  responseNodeId,
  exitTo,
  responseCueIds: freezeList(responseCueIds),
  destinationNodeId,
  route: Object.freeze(route.map(routeStep)),
})

export const GROUNDED_DIRECTION_CONTRACTS = Object.freeze({
  eliraMarket: contract({
    id: 'elira-market',
    questions: [
      { nodeId: 'eliraBanore', cueIds: ['ku', 'treg'] },
      { nodeId: 'porosiaShesh', cueIds: ['ku', 'treg'] },
    ],
    askedCondition: ELIRA_MARKET_ASKED_CONDITION,
    responseCondition: ELIRA_MARKET_RESPONSE_CONDITION,
    responseNodeId: 'porosiaShesh',
    exitTo: 'fshatiSheshi',
    responseCueIds: ['prane', 'pus'],
    destinationNodeId: 'pazariFshatit',
    route: [
      { nodeId: 'fshatiSheshi', to: 'pusiThate', cueIds: ['pus'] },
      {
        nodeId: 'pusiThate',
        to: 'pazariFshatit',
        cueIds: ['treg'],
        requires: ['flag:eliraErrandAskedMarket', 'quest:elira-bread-salt:active'],
      },
    ],
  }),
  eliraGuestRoom: contract({
    id: 'elira-guest-room',
    questions: [
      { nodeId: 'eliraBanore', cueIds: ['ku', 'oda', 'majtas', 'djathtas'] },
      { nodeId: 'porosiaShesh', cueIds: ['ku', 'oda', 'majtas', 'djathtas'] },
    ],
    askedCondition: ELIRA_GUEST_ROOM_ASKED_CONDITION,
    responseCondition: ELIRA_GUEST_ROOM_RESPONSE_CONDITION,
    responseNodeId: 'porosiaShesh',
    exitTo: 'fshatiSheshi',
    responseCueIds: ['drejt', 'perpara', 'djathtas'],
    destinationNodeId: 'oda1',
    route: [
      {
        nodeId: 'fshatiSheshi',
        to: 'rrugaOdes',
        cueIds: ['drejt', 'perpara'],
      },
      {
        nodeId: 'rrugaOdes',
        to: 'oda1',
        cueIds: ['djathtas'],
        wrongTurns: [{ to: 'fshatiJeta', cueIds: ['majtas'] }],
      },
    ],
  }),
  squareWater: contract({
    id: 'square-water',
    questions: [{ nodeId: 'sheshiPlak', cueIds: ['ku', 'gjej', 'uje'] }],
    askedCondition: SQUARE_WATER_ASKED_CONDITION,
    responseCondition: SQUARE_WATER_RESPONSE_CONDITION,
    responseNodeId: 'sheshiPlak',
    exitTo: 'fshatiSheshi',
    responseCueIds: ['poshte', 'lume'],
    destinationNodeId: 'kroi1',
    route: [
      { nodeId: 'fshatiSheshi', to: 'fshatiLumi', cueIds: ['lume'] },
      { nodeId: 'fshatiLumi', to: 'kroi1', cueIds: ['poshte'] },
    ],
  }),
  riverSpring: contract({
    id: 'river-spring',
    questions: [{ nodeId: 'gruaUji1', cueIds: ['ku', 'krua'] }],
    askedCondition: RIVER_SPRING_ASKED_CONDITION,
    responseCondition: RIVER_SPRING_RESPONSE_CONDITION,
    responseNodeId: 'gruaUji1',
    exitTo: 'fshatiLumi',
    responseCueIds: ['poshte', 'lume'],
    destinationNodeId: 'kroi1',
    route: [{ nodeId: 'fshatiLumi', to: 'kroi1', cueIds: ['poshte'] }],
  }),
})

export const LOCATION_QUESTION_REVIEWS = Object.freeze([
  ...Object.values(GROUNDED_DIRECTION_CONTRACTS).flatMap((entry) =>
    entry.questions.map((question) => Object.freeze({
      nodeId: question.nodeId,
      cueIds: question.cueIds,
      disposition: 'grounded-route',
      contractId: entry.id,
    }))),
  Object.freeze({
    nodeId: 'bisedaUra3',
    cueIds: freezeList(['si', 'quhem', 'nga', 'je']),
    disposition: 'non-navigation',
    reason: 'The player asks Elira’s identity and origin, not for a route to her homeland.',
  }),
  Object.freeze({
    nodeId: 'sofraMikut2',
    cueIds: freezeList(['si', 'quhem', 'nga', 'je']),
    disposition: 'non-navigation',
    reason: 'The guest is asked his identity and origin; his origin is not the player’s current destination.',
  }),
  Object.freeze({
    nodeId: 'sofraMikut2',
    cueIds: freezeList(['ku', 'jeto']),
    disposition: 'non-navigation',
    reason: 'The traveller is asked where he lives; his home is not the player’s current destination.',
  }),
  Object.freeze({
    nodeId: 'plakaPyllitBiseda',
    cueIds: freezeList(['ku', 'po_prog', 'shko']),
    disposition: 'non-navigation',
    reason: 'The player asks about the forest guest’s own destination, not for a route to follow.',
  }),
  Object.freeze({
    nodeId: 'dasmaBiseda',
    cueIds: freezeList(['ku', 'eshte', 'nuse']),
    disposition: 'observable-person-location',
    reason: 'The bride and her mother are already visible together in the wedding yard; the answer identifies the person to inspect rather than a travel route.',
  }),
  Object.freeze({
    nodeId: 'vajzaKroiBiseda',
    cueIds: freezeList(['a_q', 'eshte', 'fshat', 'larg']),
    disposition: 'non-navigation',
    reason: 'The player asks about relative distance after arriving from the village, not for an unknown route.',
  }),
])

export const groundedDirectionById = (id) =>
  Object.values(GROUNDED_DIRECTION_CONTRACTS).find((entry) => entry.id === id) || null
