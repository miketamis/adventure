// Proper names belong to the world's knowledge, not to the Albanian
// vocabulary ladder. Meaning-bearing titles and mythic kinds are different:
// they carry reusable Albanian meaning and remain ordinary Train targets.
//
// Keep this classification independent of noun paradigms. A place such as
// Mount Tomorr has reviewed case forms, but those forms do not turn its name
// into translatable vocabulary; an Ora has no personal identity to discover,
// but its title names a reusable kind of being.

export const LEXICAL_TRAINABILITY_KIND = Object.freeze({
  LEXICAL: 'lexical',
  LEXICAL_TITLE: 'lexical-title',
  PERSONAL_NAME: 'personal-name',
  PLACE_NAME: 'place-name',
})

const ids = (value) => value.trim().split(/\s+/).filter(Boolean)

export const PERSONAL_NAME_IDS = Object.freeze(ids(`
  ali aliPasha argjiro bardhakuqja barkulku behuri doruntine elira gjergj
  gjizar gjon halil handa kico kostandin kumaLisa lena lilo maro mehill mihal
  miraEmri mujo nereida omer osman osmani pano prende rozafa rusha sariSalltek
  shengjergj shurdhi skender tanusha tomor ymer zadran zjerma zojz zuku
`))

export const PLACE_NAME_IDS = Object.freeze(ids(`
  arta gjirokaster gjakove jutbina kotor kruje lezhe osum prespa shpirag tomorr
`))

export const TRAINABLE_LEXICAL_TITLE_IDS = Object.freeze(ids(`
  aga bukura dervish flocka lubia ora perendi peri stihi verbti xhind
`))

const descriptions = Object.freeze({
  [LEXICAL_TRAINABILITY_KIND.PERSONAL_NAME]:
    'Personal name: pronounce and recognise it in the story; it is world knowledge, not a translatable vocabulary target.',
  [LEXICAL_TRAINABILITY_KIND.PLACE_NAME]:
    'Place name: pronounce and recognise it in the story; it is world knowledge, not a translatable vocabulary target.',
  [LEXICAL_TRAINABILITY_KIND.LEXICAL_TITLE]:
    'Meaning-bearing Albanian title or mythic kind: this is reusable vocabulary and remains trainable.',
})

const classified = {}
const declare = (senseIds, kind, trainable) => {
  for (const id of senseIds) {
    if (classified[id]) throw new Error(`Duplicate lexical-trainability classification for ${id}`)
    classified[id] = Object.freeze({ id, kind, trainable, reason: descriptions[kind] })
  }
}

declare(PERSONAL_NAME_IDS, LEXICAL_TRAINABILITY_KIND.PERSONAL_NAME, false)
declare(PLACE_NAME_IDS, LEXICAL_TRAINABILITY_KIND.PLACE_NAME, false)
declare(TRAINABLE_LEXICAL_TITLE_IDS, LEXICAL_TRAINABILITY_KIND.LEXICAL_TITLE, true)

export const REVIEWED_LEXICAL_TRAINABILITY = Object.freeze(classified)
export const NON_TRAINABLE_NAMED_ENTITY_IDS = Object.freeze([
  ...PERSONAL_NAME_IDS,
  ...PLACE_NAME_IDS,
])

const ordinaryLexical = (id) => Object.freeze({
  id,
  trainable: true,
  kind: LEXICAL_TRAINABILITY_KIND.LEXICAL,
  reason: 'Trainable lexical sense.',
})

export function lexicalTrainability(id) {
  return REVIEWED_LEXICAL_TRAINABILITY[id] || ordinaryLexical(id)
}

export const isTrainableSense = (id) => lexicalTrainability(id).trainable
export const isNamedEntitySense = (id) => {
  const kind = lexicalTrainability(id).kind
  return kind === LEXICAL_TRAINABILITY_KIND.PERSONAL_NAME ||
    kind === LEXICAL_TRAINABILITY_KIND.PLACE_NAME
}
