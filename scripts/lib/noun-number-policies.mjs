// Audit-only editorial explanations for noun paradigms whose reviewed runtime
// inventory deliberately has one grammatical number. Runtime behavior remains
// owned solely by NOUN_FORMS; nounparadigmaudit proves every policy matches the
// actual forms and rejects missing, stale, or contradictory classifications.
const numberPolicy = (disposition, rationale) => Object.freeze({ disposition, rationale })

export const NOUN_NUMBER_POLICIES = Object.freeze({
  ar: numberPolicy('singular-only', 'Mass noun in this curriculum: gold.'),
  dhe_earth: numberPolicy('singular-only', 'Mass noun in this curriculum: earth or soil.'),
  erresire: numberPolicy('singular-only', 'Abstract mass noun in this curriculum: darkness.'),
  gjak: numberPolicy('singular-only', 'Mass noun in this curriculum: blood.'),
  mish: numberPolicy('singular-only', 'Mass noun in this curriculum: generic edible meat or flesh.'),
  qumesht: numberPolicy('singular-only', 'Mass noun in this curriculum: milk.'),
  sane: numberPolicy('singular-only', 'Mass noun in this curriculum: hay.'),
  tomorr: numberPolicy('singular-only', 'Proper geographic name in this curriculum: Mount Tomorr.'),
  para_money: numberPolicy('plural-only', 'Lexically plural-only noun in this curriculum: money.'),
  pranga: numberPolicy('plural-only', 'Lexically plural-only noun in this curriculum: shackles.'),
})
