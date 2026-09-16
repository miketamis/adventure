// Small runtime-safe condition ids shared by story authoring and the
// script-only grounded-direction registry. Keeping these strings separate
// avoids loading the full route-audit model into the player bundle.
export const ELIRA_MARKET_ASKED_CONDITION = 'flag:eliraErrandAskedMarket'
export const ELIRA_MARKET_RESPONSE_CONDITION = 'flag:eliraErrandResponseMarket'
export const ELIRA_GUEST_ROOM_ASKED_CONDITION = 'flag:eliraErrandAskedGuestRoom'
export const ELIRA_GUEST_ROOM_RESPONSE_CONDITION = 'flag:eliraErrandResponseGuestRoom'
export const SQUARE_WATER_ASKED_CONDITION = 'flag:conversation:square-elder:asked:water'
export const SQUARE_WATER_RESPONSE_CONDITION = 'flag:conversation:square-elder:response:water'
export const RIVER_SPRING_ASKED_CONDITION = 'flag:conversation:water-carrier-bank:asked:spring'
export const RIVER_SPRING_RESPONSE_CONDITION = 'flag:conversation:water-carrier-bank:response:spring'
