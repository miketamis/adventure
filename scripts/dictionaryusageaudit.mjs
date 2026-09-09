// Every public dictionary sense must be encountered through actual play. A
// definition is support for a saved word, never a hiding place for otherwise
// unused vocabulary.
import { DICT, HEART_LEVELS, ITEMS, STORY, lineOf } from '../src/game/content.js'
import { environmentStoryLine, purseStoryLine } from '../src/game/storyContext.js'

const uses = new Map(Object.keys(DICT).map((id) => [id, []]))

function addTokens(tokens, location) {
  for (const token of tokens || []) {
    if (!token?.id) continue
    if (!DICT[token.id]) throw new Error(`${location}: unknown dictionary sense ${token.id}`)
    uses.get(token.id).push(location)
  }
}

for (const [nodeId, node] of Object.entries(STORY)) {
  node.text.forEach((entry, index) => addTokens(lineOf(entry), `story:${nodeId}:line:${index + 1}`))
  node.options.forEach((option, index) => addTokens(option.text, `story:${nodeId}:option:${index + 1}`))
}

for (const [itemId, item] of Object.entries(ITEMS)) {
  if (item.use?.phrase) addTokens(item.use.phrase, `item:${itemId}:use`)
}

for (const [hearts, level] of Object.entries(HEART_LEVELS)) {
  addTokens(lineOf(level.line), `health:${hearts}:line`)
  if (level.heal?.phrase) addTokens(level.heal.phrase, `health:${hearts}:heal`)
}

// Generated environmental prose is story text too. Exercise every branch so a
// season or weather word does not need a redundant authored line solely to
// satisfy this invariant.
const clocks = [1, 7, 12, 15, 19]
const seasons = ['spring', 'summer', 'autumn', 'winter']
const weatherKinds = ['clear', 'cloud', 'rain', 'storm', 'snow']
const settings = ['outdoor', 'enclosed']
for (const clock of clocks) for (const season of seasons) {
  for (const weather of weatherKinds) for (const setting of settings) {
    addTokens(
      lineOf(environmentStoryLine({ clock, season, weather }, { setting })),
      `environment:${clock}:${season}:${weather}:${setting}`,
    )
  }
}
addTokens(lineOf(purseStoryLine(1)), 'purse:positive-balance')

const unused = [...uses]
  .filter(([, locations]) => locations.length === 0)
  .map(([id]) => `${id} (${DICT[id].al} — ${DICT[id].en})`)

if (unused.length) {
  console.error(`Dictionary usage failed: ${unused.length} senses never appear in playable language:`)
  for (const entry of unused) console.error(`  - ${entry}`)
  process.exit(1)
}

console.log(`✓ all ${uses.size} dictionary senses occur in playable language outside dictionary definitions.`)
