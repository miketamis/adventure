// Player-facing language has two deliberately separate layers:
//
//   token.en       a short, local gloss for discovering one Albanian word
//   line.reading   a natural English reading of the complete Albanian line
//
// A word-for-word gloss is useful scaffolding, but concatenating glosses does
// not produce English. Albanian places clitic objects and possessives before or
// after words differently, marks adjectives with linking articles, and does not
// share English subject/verb agreement. `englishReadingOf` is the single API for
// prose and comprehension. Authors should prefer R('…', tokens) in content.js;
// the conservative aligned-reading fallback keeps older lines readable while
// that explicit editorial layer is expanded.

const punctuation = (s) => /^[.,!?:;…—)]$/.test(s)
const openingPunctuation = (s) => /^[(“«]$/.test(s)

export function joinLanguageParts(parts) {
  let out = ''
  for (const raw of parts) {
    const part = String(raw ?? '').trim()
    if (!part) continue
    if (!out || punctuation(part)) out += part
    else if (openingPunctuation(part) || out.endsWith('(') || out.endsWith('“') || out.endsWith('«')) out += part
    else out += ` ${part}`
  }
  return out
    .replace(/\s+([.,!?:;…])/g, '$1')
    .replace(/([“«(])\s+/g, '$1')
    .replace(/\s+([”»])/g, '$1')
    .trim()
}

export const albanianTextOf = (line) =>
  joinLanguageParts((line || []).map((token) => (token.paren ? token.en : token.al)))

let reviewedReadingRevision = 0
export const englishReadingRevision = () => reviewedReadingRevision

// Attach a separately loaded editorial corpus to the live story. Each entry is
// pinned to its exact Albanian rendering so a later story edit cannot retain a
// stale English sentence. This function is idempotent for React development
// mode and for audits that deliberately load the same corpus more than once.
export function attachReviewedEnglishReadings(story, reviewedReadings) {
  let attached = 0
  for (const [address, review] of Object.entries(reviewedReadings || {})) {
    const match = /^(.+)\.text\[(\d+)\]$/.exec(address)
    if (!match) throw new Error(`Invalid reviewed-reading address: ${address}`)
    const [, nodeId, rawIndex] = match
    const index = Number(rawIndex)
    const entry = story?.[nodeId]?.text?.[index]
    if (!entry) throw new Error(`Reviewed reading points to no story line: ${address}`)
    const line = Array.isArray(entry) ? entry : entry.line
    const albanian = albanianTextOf(line)
    if (albanian !== review.al)
      throw new Error(`Stale reviewed reading at ${address}: expected “${review.al}”, found “${albanian}”`)
    if (line.reading && line.reading !== review.en)
      throw new Error(`Conflicting reviewed readings at ${address}`)
    if (!line.reading) attached++
    Object.assign(line, { reading: review.en, readingReview: review.review || 'editorial' })
  }
  if (attached > 0) reviewedReadingRevision++
  return attached
}

export const alignedEnglishOf = (line) =>
  joinLanguageParts((line || []).map((token) => token.en))

const ADJECTIVES = new Set([
  'madh', 'vogel', 'bukur', 'bardhe', 'zi', 'kuq', 'kalter', 'gjelber', 'arte',
  'erret', 'ftohte', 'ngrohte', 'nxehte', 'qete', 'forte', 'ri', 'vjeter',
  'uritur', 'lodhur', 'shendoshe', 'semur', 'verber', 'eger', 'shenjte',
  'thelle', 'gjate', 'gjalle', 'vdekur', 'huaj', 'vertete', 'mbyllur',
])

const ADJECTIVE_ARTICLES = new Set(['i_art', 'e_art', 'i_link', 'e_link', 'te_link'])
const POSSESSIVES = new Set(['im', 'yt', 'tij', 'saj', 'tone', 'yne', 'tona', 'tuaj', 'juaj', 'tyre'])
const OBJECT_CLITICS = new Set(['te_obj', 'e_obj', 'me_obj', 'na_obj', 'ju_obj', 'i_obj'])
const LINKING_VERBS = new Set(['je', 'eshte', 'behet'])
const NUMBERS = new Set(['dy', 'tre', 'kater', 'pese', 'gjashte', 'shtate', 'tete', 'nente', 'dhjete', 'dymbedhjete', 'dyzet', 'njeqind', 'shume', 'disa'])

export const VERB_IDS = new Set([
  'je', 'jam', 'eshte', 'ka', 'ke', 'bej', 'behet', 'vjen', 'shko', 'rri', 'prit',
  'ec', 'sheh', 'shiko', 'gjen', 'gjej', 'jep', 'merr', 'mban', 'do', 'bie',
  'vdes', 'jeto', 'hap', 'dil', 'hyr', 'kthehu', 'flet', 'fol', 'thote', 'tregoj',
  'sjell', 'lufto', 'vrit', 'shpeto', 'ha', 'pi', 'kendo', 'thirr', 'di', 'mendoj',
  'pyet', 'ruan', 'mbaj', 'prek', 'kalo', 'ngjit', 'zbrit', 'hidh', 'fsheh',
  'degjo', 'zgjohu', 'zgjedh', 'martoj', 'marto', 'mallko', 'fal', 'godit', 'pre',
  've', 'vazhdon', 'humbet', 'ndihmo', 'dhemb', 'skuqem', 'meso', 'lind', 'kerkoi', 'kerko', 'ndodh',
  'qaj', 'vajto', 'terheq', 'shtyj', 'fryj', 'shuaj', 'mbyt', 'krijoj', 'rrjedh',
])

// Only change forms we can identify unambiguously. This is not machine
// translation: it is a compatibility bridge for the old interlinear corpus.
const AGREEMENT = new Map([
  ['is', 'are'], ['has', 'have'], ['does', 'do'], ['says', 'say'], ['comes', 'come'],
  ['goes', 'go'], ['stays', 'stay'], ['waits', 'wait'], ['walks', 'walk'],
  ['sees', 'see'], ['finds', 'find'], ['gives', 'give'], ['takes', 'take'],
  ['keeps', 'keep'], ['wants', 'want'], ['needs', 'need'], ['gets', 'get'],
  ['becomes', 'become'], ['falls', 'fall'], ['dies', 'die'], ['lives', 'live'],
  ['opens', 'open'], ['leaves', 'leave'], ['enters', 'enter'], ['returns', 'return'],
  ['speaks', 'speak'], ['tells', 'tell'], ['brings', 'bring'], ['fights', 'fight'],
  ['kills', 'kill'], ['saves', 'save'], ['eats', 'eat'], ['drinks', 'drink'],
  ['sings', 'sing'], ['calls', 'call'], ['knows', 'know'], ['thinks', 'think'],
  ['asks', 'ask'], ['guards', 'guard'], ['holds', 'hold'], ['makes', 'make'],
  ['touches', 'touch'], ['crosses', 'cross'], ['passes', 'pass'], ['climbs', 'climb'],
  ['throws', 'throw'], ['hides', 'hide'], ['hears', 'hear'], ['wakes', 'wake'],
  ['wears', 'wear'], ['marries', 'marry'], ['curses', 'curse'], ['forgives', 'forgive'],
  ['strikes', 'strike'], ['cuts', 'cut'], ['puts', 'put'], ['runs', 'run'],
])

const THIRD_PERSON = new Map([...AGREEMENT].map(([third, base]) => [base, third]))
const PLURAL_AFTER_NUMBER = new Map([
  ['month', 'months'], ['year', 'years'], ['day', 'days'], ['night', 'nights'],
  ['hour', 'hours'], ['head', 'heads'], ['sister', 'sisters'], ['brother', 'brothers'],
  ['tongue', 'tongues'], ['wound', 'wounds'], ['tree', 'trees'], ['stone', 'stones'],
  ['road', 'roads'], ['house', 'houses'], ['man', 'men'], ['person', 'people'],
  ['maiden', 'maidens'], ['hero', 'heroes'], ['heart', 'hearts'], ['word', 'words'],
  ['ring', 'rings'], ['test', 'tests'], ['grave', 'graves'], ['land', 'lands'],
])

// Never guess English plurality from a trailing "s": singular words such as
// "dress", "glass" and names ending in s made that shortcut actively harmful.
// These are the only untagged plural glosses used often enough in the legacy
// corpus to recognise safely.
const PLURAL_GLOSSES = new Set([
  'men', 'people', 'children', 'brothers', 'sisters', 'heroes', 'warriors',
  'enemies', 'friends', 'elders', 'girls', 'boys', 'women', 'horses', 'dogs',
  'eagles', 'mountains', 'trees', 'roads', 'hands', 'eyes', 'days', 'nights',
  'months', 'years', 'leaves', 'crowns', 'tests', 'stones', 'lands', 'hearts',
])

const withArticle = (word, article) => {
  if (!word || /^(?:a|an|the|my|your|his|her|our|their|of|to|for|from|in|on|at)\b/i.test(word)) return word
  return `${article} ${word}`
}

const adjectiveBefore = (noun, adjective) => {
  const match = /^(a|an|the|my|your|his|her|our|their)\s+(.+)$/i.exec(noun)
  if (match) return `${match[1]} ${adjective} ${match[2]}`
  return `${adjective} ${noun}`
}

function contextualTokens(line) {
  const words = (line || []).map((token) => ({ ...token, value: token.en || '' }))

  // Definite Albanian noun forms carry their article as a suffix. The token's
  // form tag lets the sentence reading restore the English article without
  // changing the lexical gloss used by vocabulary practice.
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const previousId = [...words.slice(0, i)].reverse().find((candidate) => candidate.id)?.id
    if ((word.formTag === 'defNom' || word.formTag === 'defAcc') && word.value && !NUMBERS.has(previousId))
      word.value = withArticle(word.value, 'the')
  }

  // Albanian: "një vajzë e bukur" (a maiden [article] beautiful).
  // English:  "a beautiful maiden". Move only known adjectives across the
  // dedicated adjectival article, never across e/i/të source-linking words.
  for (let i = 1; i < words.length - 1; i++) {
    if (!ADJECTIVE_ARTICLES.has(words[i].id) || !ADJECTIVES.has(words[i + 1].id)) continue
    let nounIndex = i - 1
    while (nounIndex >= 0 && (!words[nounIndex].id || POSSESSIVES.has(words[nounIndex].id))) nounIndex--
    // Predicate adjective: "qielli është i kuq" -> "the sky is red". There
    // is no noun to cross; only the Albanian agreement article disappears.
    if (nounIndex < 0 || LINKING_VERBS.has(words[nounIndex].id) || words[nounIndex].id === 'dhe') {
      words[i].value = ''
      continue
    }
    words[nounIndex].value = adjectiveBefore(words[nounIndex].value, words[i + 1].value)
    words[i].value = ''
    words[i + 1].value = ''
  }

  // Albanian possessives normally follow the noun: "kali yt". A linking
  // article plus possessive ("hija e saj") is the same construction, not an
  // English "of her" phrase: both become "your horse" / "her shadow".
  for (let i = 1; i < words.length; i++) {
    if (!POSSESSIVES.has(words[i].id)) continue
    const linked = ['e_link', 'i_link', 'te_link'].includes(words[i - 1]?.id)
    let nounIndex = linked ? i - 2 : i - 1
    while (nounIndex >= 0 && !words[nounIndex].id) nounIndex--
    if (nounIndex < 0) continue
    const noun = words[nounIndex].value.replace(/^the\s+/i, '')
    words[nounIndex].value = `${words[i].value} ${noun}`
    if (linked) words[i - 1].value = ''
    words[i].value = ''
  }

  // Albanian object clitics precede their verb ("nëna të pret"). Moving an
  // isolated clitic behind that verb removes the most misleading gloss order.
  for (let i = 0; i < words.length - 1; i++) {
    if (!OBJECT_CLITICS.has(words[i].id) || !words[i + 1].id) continue
    const object = words[i].value
    words[i].value = words[i + 1].value
    words[i + 1].value = object
  }

  return words
}

function polishAgreement(words) {
  let subject = null
  let compoundSubject = false
  let expectSubject = true
  let predicateStarted = false
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (word.paren && /[.!?;]/.test(word.en || '')) {
      subject = null
      compoundSubject = false
      expectSubject = true
      predicateStarted = false
      continue
    }
    if (!word.id || !word.value) continue
    if (word.id === 'ti') { subject = 'you'; compoundSubject = false; expectSubject = false; continue }
    if (word.id === 'une') { subject = 'I'; compoundSubject = false; expectSubject = false; continue }
    if (word.id === 'ata') { subject = 'they'; compoundSubject = false; expectSubject = false; continue }
    if (word.id === 'ai') { subject = 'he'; compoundSubject = false; expectSubject = false; continue }
    if (word.id === 'ajo') { subject = 'she'; compoundSubject = false; expectSubject = false; continue }
    // "Handa and the heroes go" has a compound subject; "the dress is black
    // and has stars" does not. Only an and before the first predicate can
    // change subject number.
    if (word.id === 'dhe' && subject && !predicateStarted) { compoundSubject = true; continue }

    if (expectSubject && !VERB_IDS.has(word.id) && !['ne', 'nga', 'mbi', 'nen', 'tek', 'pas', 'para', 'larg', 'ketu', 'sot', 'naten', 'dite', 'agim', 'muzg', 'nje'].includes(word.id)) {
      const bareGloss = word.value.replace(/^(?:a|an|the|my|your|his|her|our|their)\s+/i, '').toLowerCase()
      subject = word.formTag === 'plDef' || word.formTag === 'plIndef' || PLURAL_GLOSSES.has(bareGloss)
        ? 'they'
        : 'it'
      expectSubject = false
    }

    const lower = word.value.toLowerCase()
    if (subject === 'you' || subject === 'I' || subject === 'they' || compoundSubject) {
      if (AGREEMENT.has(lower)) word.value = preserveCase(word.value, AGREEMENT.get(lower))
    } else if (subject === 'he' || subject === 'she' || subject === 'it') {
      if (THIRD_PERSON.has(lower)) word.value = preserveCase(word.value, THIRD_PERSON.get(lower))
    }
    if (VERB_IDS.has(word.id)) predicateStarted = true
  }
  return words
}

const preserveCase = (from, to) => /^[A-Z]/.test(from) ? to[0].toUpperCase() + to.slice(1) : to

function polishText(text) {
  let out = text
    .replace(/\ba ([aeiou][\w-]*)\b/gi, 'an $1')
    .replace(/\b(can|must|should) to\b/gi, '$1')
    .replace(/\bnot (is|are|has|have|can|will|does|do)\b/gi, '$1 not')
    .replace(/\b(is|are) yet sickens\b/gi, '$1 still sick')
    .replace(/\b(in|to|at) house\b/gi, '$1 the house')
    .replace(/\b(in|to) village\b/gi, '$1 the village')
    .replace(/\b(in|to) forest\b/gi, '$1 the forest')
    .replace(/\b(in|to) sea\b/gi, '$1 the sea')
    .replace(/\b(in|to) sky\b/gi, '$1 the sky')
    .replace(/\b(in|to) kingdom\b/gi, '$1 the kingdom')
    .replace(/\bfor all the life\b/gi, 'for a whole lifetime')
    .replace(/\bnot comes out\b/gi, 'does not come out')
    .replace(/\bnot comes\b/gi, 'does not come')
    .replace(/\bnot has\b/gi, 'does not have')
    .replace(/\bnot keeps\b/gi, 'does not keep')
    .replace(/\bnot forgets\b/gi, 'does not forget')
    .replace(/\bnot returns\b/gi, 'does not return')
    .replace(/\bnot gives\b/gi, 'does not give')
    .replace(/\bnot wants\b/gi, 'does not want')
    .replace(/\bnot knows\b/gi, 'does not know')
    .replace(/\bnot sees\b/gi, 'does not see')
    .replace(/\bnot speaks\b/gi, 'does not speak')
    .replace(/\bnot stays\b/gi, 'does not stay')
    .replace(/\bnot dies\b/gi, 'does not die')
    .replace(/\bnot lives\b/gi, 'does not live')
    .replace(/\bnot ([a-z]+)s\b/gi, 'does not $1')
    .replace(/\byou not\b/gi, 'you do not')
    .replace(/\bI not\b/g, 'I do not')
    .replace(/\bthey not\b/gi, 'they do not')
    .replace(/\bhe not\b/gi, 'he does not')
    .replace(/\bshe not\b/gi, 'she does not')
    .replace(/\ba oath\b/gi, 'an oath')
    .replace(/\bcan not\b/gi, 'cannot')
    .replace(/\b(Is (?:dawn|day|dusk|night))\b/g, 'It $1')
    .replace(/(^|[.!?]\s+)[Nn]ight (?=(?:the|a|an|[A-Z]))/g, '$1At night, ')
    .replace(/(^|[.!?]\s+)[Tt]he by day\b/g, '$1By day')
    .replace(/\bwaits you\b/gi, 'waits for you')
    .replace(/\bwait you\b/gi, 'wait for you')
    .replace(/\bwaits yet\b/gi, 'is still waiting')
    .replace(/\bstay yet\b/gi, 'remain')
    .replace(/\b(in|on|under|to|from|at) (lake|city|cave|mountain|sun|grave|home|castle|sky|ground|bed|wall|door|palace|market|kingdom)\b/gi, '$1 the $2')
    .replace(/\b(many) (gold|water|blood|milk|bread|meat|salt)\b/gi, 'much $2')
    .replace(/\bthe gold hair\b|\bhair the gold\b/gi, 'golden hair')
    .replace(/\b([Aa]n?|[Tt]he) ([\w-]+) other\b/g, (_, article, noun) => article.toLowerCase() === 'the' ? `the other ${noun}` : `another ${noun}`)
    .replace(/\b(says?|said): not\b/gi, '$1: no')
    .replace(/\b(walk|speak|drink|leave) slow\b/gi, '$1 slowly')
    .replace(/\bthree the\b/gi, 'three')
    .replace(/\bfour the\b/gi, 'four')
    .replace(/\bseven the\b/gi, 'seven')
    .replace(/\btwo the\b/gi, 'two')
    .replace(/\bone more one\b/gi, 'one more')
    .replace(/\bthe the\b/gi, 'the')
    .replace(/\ba a\b/gi, 'a')
    .replace(/\bto to\b/gi, 'to')

  // Albanian nouns remain morphologically singular after cardinal numbers;
  // English nouns do not. Correct only the compact, high-confidence glossary.
  for (const [one, many] of PLURAL_AFTER_NUMBER)
    out = out.replace(new RegExp(`\\b(two|three|four|five|six|seven|eight|nine|ten|twelve|forty|hundred|several|many) ${one}\\b`, 'gi'), `$1 ${many}`)

  if (out) {
    out = out[0].toUpperCase() + out.slice(1)
    out = out.replace(/([.!?]\s+)([a-z])/g, (_, stop, letter) => stop + letter.toUpperCase())
  }
  return out
}

export function fallbackEnglishReadingOf(line) {
  return polishText(joinLanguageParts(polishAgreement(contextualTokens(line)).map((word) => word.value)))
}

export function englishReadingOf(line) {
  const authored = String(line?.reading || '').trim()
  return authored || fallbackEnglishReadingOf(line)
}

export const hasAuthoredEnglishReading = (line) => Boolean(
  String(line?.reading || '').trim(),
)

// These are deliberately narrow blockers, not a claim that a regex can edit
// prose. Comprehension must never teach an answer that is visibly a stack of
// glosses. Anything subtle remains an editorial review item; these patterns
// catch the damaging mixed-grammar constructions the old quiz emitted.
const READING_BLOCKERS = [
  ['agreement after you', /\byou\s+(?:is|has|does|says|comes|goes|stays|waits|walks|sees|finds|gives|takes|wants|becomes|falls|dies|lives|speaks|brings|fights|kills|eats|sings|makes|touches|crosses)\b/i],
  ['agreement after I', /\bI\s+(?:is|has|does|says|comes|goes|stays|waits|walks|sees|finds|gives|takes|wants|becomes|falls|dies|lives|speaks|brings|fights|kills|eats|sings|makes|touches|crosses)\b/],
  ['raw Albanian negation order', /\b(?:you|I|they|he|she|it|(?!(?:Do|Does|Did|Can|Could|Should|Would|Will|Must)\b)[A-Z][\w-]*) not\b/],
  ['raw object-clitic order', /\b(?:mother|father|king|queen|man|woman|guest|hero|serpent|dragon|enemy|Ora|Zana) (?:you|me|him|her|them) (?:give|gives|wait|waits|kill|kills|eat|eats|help|helps|see|sees|touch|touches|strike|strikes|bring|brings)\b/i],
  ['article before adjective predicate', /\b(?:is|are|becomes|become|stay|stays) (?:the|of) (?:big|small|beautiful|black|white|red|dark|cold|warm|calm|strong|old|new|hungry|tired|healthy|sick|blind|wild|holy|deep|long|alive|dead)\b(?!\s+one\b)/i],
  ['postposed possessive', /\b(?:horse|house|wife|husband|mother|father|brother|sister|ring|sword|hand|road|name|heart|eyes?) (?:my|your|his|her|our|their)\b/i],
  ['singular counted noun', /\b(?:two|three|four|five|six|seven|eight|nine|ten|twelve|forty|hundred|several|many) (?:month|year|day|night|hour|head|sister|brother|tongue|wound|tree|stone(?!\s+figures\b)|road|house|man|person|maiden|hero|heart|word|ring|test|grave|land)\b/i],
  ['broken article', /\b(?:a [aeiou]|a a|the the|to to|an the)\b/i],
  ['bare gloss connective', /\b(?:will to|can to|must to|of of|not has|not is|not are|not comes|not keeps|not forgets)\b/i],
]

export function englishReadingIssues(lineOrReading) {
  const reading = typeof lineOrReading === 'string' ? lineOrReading : englishReadingOf(lineOrReading)
  const issues = []
  if (!reading.trim()) issues.push('empty reading')
  for (const [label, pattern] of READING_BLOCKERS) if (pattern.test(reading)) issues.push(label)
  return issues
}

// A quiz answer is a teaching assertion, so "looks plausible to a regex" is
// not a sufficient publication standard. Legacy fallback readings remain
// useful as visibly-labelled reading aids, but only an authored reading or a
// documented source-quote translation can be assessed as the correct answer.
export const isComprehensionReadyLine = (line) =>
  Boolean(line?.length) && hasAuthoredEnglishReading(line) && englishReadingIssues(line).length === 0
