// Nominal (printed) lek values for the living-world economy. Albania's 1965
// redenomination removed one zero, but conversational "old lek" still
// multiplies the printed value by ten. Keep game effects on the current,
// printed value; old-lek wording is dialogue only.
export const OLD_LEK_MULTIPLIER = 10

export const ELIRA_ERRAND_ADVANCE = 800
export const BREAD_PRICE = 100
export const SALT_PRICE = 100
export const TEA_PRICE = 200
export const BEER_PRICE = 300
export const MARKET_TENDER = 500
export const ROAD_TICKET_PRICE = 500
export const ALMS_AMOUNT = 100
export const TEA_BUNDLE_PRICE = 500
export const LAHUTA_PRICE = 5_000
export const INN_NIGHT_PRICE = 2_000
export const HEALER_HERBS_PRICE = 1_000
export const ORDINARY_WORK_WAGE = 800
export const SONG_WAGE = 800

export const LEK_ECONOMY = Object.freeze({
  eliraErrandAdvance: ELIRA_ERRAND_ADVANCE,
  bread: BREAD_PRICE,
  salt: SALT_PRICE,
  tea: TEA_PRICE,
  beer: BEER_PRICE,
  marketTender: MARKET_TENDER,
  roadTicket: ROAD_TICKET_PRICE,
  alms: ALMS_AMOUNT,
  teaBundle: TEA_BUNDLE_PRICE,
  lahuta: LAHUTA_PRICE,
  innNight: INN_NIGHT_PRICE,
  healerHerbs: HEALER_HERBS_PRICE,
  ordinaryWork: ORDINARY_WORK_WAGE,
  songWage: SONG_WAGE,
})

export const EVERYDAY_GOOD_PRICES = Object.freeze({
  cakmak: 500,
  shishe: 300,
  cader: 1_500,
  litar: 1_000,
  batanije: 2_000,
  sapun: 200,
  peshqir: 600,
})

export const oldLekQuoteFor = (nominalLek) => nominalLek * OLD_LEK_MULTIPLIER
