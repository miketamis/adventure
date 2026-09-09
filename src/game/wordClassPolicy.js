import { NOUN_SENSE_IDS } from './nounRegistry.js'

// This is a curriculum classification, not a claim that every Albanian lexeme
// has one immutable part of speech. It tells Train what kind of form evidence it
// is allowed to present. Noun classification comes from nounRegistry.js and is
// independent of paradigm completion; the sets below identify reviewed
// non-noun inflecting senses.
export const WORD_CLASS = Object.freeze({
  NOUN: 'noun',
  VERB: 'verb',
  ADJECTIVE: 'adjective',
  PRONOUN: 'pronoun',
  OTHER_INFLECTING: 'other-inflecting',
  NON_INFLECTING: 'non-inflecting',
})

const words = (value) => new Set(value.trim().split(/\s+/).filter(Boolean))

// Only reviewed sense ids belong here. An omitted changing sense is kept in the
// honest `other-inflecting` bucket until its grammatical analysis is reviewed;
// it is never guessed into a noun declension or a verb conjugation.
export const VERB_SENSE_IDS = words(`
  arrij behet bej beso bie blej degjo dhemb di digjet dil do dorezohem dredh duhet
  duket ec eshte fal filloj fle flet fluturo fol fryj fsheh gaboj gjej
  gjen godit gurezohet ha hap harron heq hidh hip humbet hyr ik jam je jep jeto
  ka kafshon kalo kap ke
  kendo kerce kerko krijoj kthehu kuptoj lan laj le leh lejoj leviz lidh lind lufto
  largohem luan lut mallko marto mban mbetem mbjell mbledh mbulon mbush mbyll
  meso mbaroi merr mendoj mbyt mund mungon ndalo ndiej ndihmo ndiz ngjit ngre
  ngul nisem njoh ndodh nxjerr paguaj pelqen pergjigjet pi piqet pikon plas pre
  premto pres prit prish punon pyet qaj qendroj qep quhem rrethoj rri rron ruan
  sheh shembet shtrihet
  fus shes shiko shko shkruaj shpeton shpeto shpresoj shtrydh shuaj sjell skuqem shtyj
  sulmo shqetesohem takohem terheq therr thirr thote thyen tjerr tregon tregoj tremb troket
  ulu urdhero vazhdo vazhdon vajto varros ve verbo vdes vendos vesh vjen vonon
  vrit zbrit zgjedh zgjohu zhytet
`)

export const ADJECTIVE_SENSE_IDS = words(`
  arte bardhe besnik bukur cmendur dashur djathte drejt drejte eger embel erret
  etur forte ftohte gati gjalle gjate gjelber gurezuar hapur kalter keq kuq
  larg lart lehte lodhur lumtur madh mbare mire ngrohte qarte qete rendesishem
  ri rende sakte semur shendoshe shenjte shpejt sigurt shtrenjte thate thelle tille
  tjeter njejte uritur verber verdhe veshtire vjeter vogel zgjuar zi
`)

export const PRONOUN_SENSE_IDS = words(`
  ai ajo ata cili im ju juaj kesaj keta keto ky ma me_obj mua ne_we ti tone
  tona tuaj tyre une ua vete yne yt
`)

export function wordClassOf(id, entry, { hasAttestedVariant = false } = {}) {
  if (NOUN_SENSE_IDS.has(id)) return WORD_CLASS.NOUN
  if (VERB_SENSE_IDS.has(id)) return WORD_CLASS.VERB
  if (ADJECTIVE_SENSE_IDS.has(id)) return WORD_CLASS.ADJECTIVE
  if (PRONOUN_SENSE_IDS.has(id)) return WORD_CLASS.PRONOUN
  if (hasAttestedVariant || entry?.forms?.length) return WORD_CLASS.OTHER_INFLECTING
  return WORD_CLASS.NON_INFLECTING
}

export const wordClassLabel = (wordClass) => ({
  [WORD_CLASS.NOUN]: 'noun',
  [WORD_CLASS.VERB]: 'verb',
  [WORD_CLASS.ADJECTIVE]: 'adjective',
  [WORD_CLASS.PRONOUN]: 'pronoun',
  [WORD_CLASS.OTHER_INFLECTING]: 'reviewed changing form',
  [WORD_CLASS.NON_INFLECTING]: 'unchanging word',
}[wordClass] || 'word')
