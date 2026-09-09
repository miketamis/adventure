// Static accessibility/release guardrails for the interaction patterns that are
// easy to regress without a full browser. Run: node scripts/accessibilityaudit.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { STORY } from '../src/game/content.js'
import { playerMapLabel } from '../src/components/mapLabels.js'
import { nextMapMarker } from '../src/components/mapKeyboard.js'
import {
  effectLockText,
  formatCivilHour,
  interactionLockText,
  optionReadingVisible,
  sceneAnnouncement,
  storyReadingVisible,
} from '../src/components/storyMechanicsPresentation.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')
const token = read('src/components/Token.jsx')
const story = read('src/components/StoryView.jsx')
const embodimentFocus = read('src/components/EmbodimentFocus.jsx')
const achievements = read('src/components/AchievementsView.jsx')
const practice = read('src/components/PracticeView.jsx')
const practiceReturn = read('src/game/practiceReturn.js')
const phrasePractice = read('src/components/PhrasePracticeQuestion.jsx')
const phrasePracticeLogic = read('src/game/phrasePractice.js')
const scenePresentation = read('src/game/scenePresentation.js')
const audio = read('src/game/audio.js')
const dictionary = read('src/components/DictionaryView.jsx')
const comprehension = read('src/components/ComprehensionTest.jsx')
const atlas = read('src/components/AtlasView.jsx')
const timePassage = read('src/components/TimePassage.jsx')
const embodimentConfirm = read('src/components/EmbodimentConfirm.jsx')
const guide = read('src/components/GuideView.jsx')
const debug = read('src/components/DebugView.jsx')
const debugLearning = read('src/components/DebugLearningProgression.jsx')
const app = read('src/App.jsx')
const main = read('src/main.jsx')
const errorBoundary = read('src/components/ReleaseErrorBoundary.jsx')
const worldMap = read('src/components/WorldMapView.jsx')
const styles = read('src/styles.css')
const discovery = read('scripts/lib/discovery.mjs')
const playerMapLabels = Object.keys(STORY).map((id) => ({ id, label: playerMapLabel(id) }))

const checks = []
const check = (name, condition) => checks.push({ name, condition: Boolean(condition) })

check('undiscovered and known words are native buttons', (token.match(/<button/g) || []).length >= 2 && !token.includes('role="button"'))
check('word controls declare button type and markup-aware accessible labels', token.includes('type="button"') && token.includes('aria-labelledby={controlLabelId}'))
check('Albanian learning surfaces declare their language to assistive technology',
  token.includes('<span lang="sq">“{token.al}”</span>') &&
  token.includes('className="known-word" lang="sq"') &&
  practice.includes('className="known-word q-inflected" lang="sq"') &&
  practice.includes("lang={q.field === 'al' ? 'sq' : undefined}") &&
  dictionary.includes('className="dict-word" lang="sq"') &&
  comprehension.includes('className="comp-al" lang="sq"'))
check('keyboard focus exposes the same word hint as hover', token.includes('onFocus={() => setShowHint(true)}') && token.includes('role="tooltip"'))
check('word activation cannot accidentally choose its option', token.includes('event.stopPropagation()'))
check('story is a labelled region and focuses a changed scene', story.includes('aria-labelledby="story-scene-title"') && story.includes('sceneHeadingRef.current?.focus()'))
check('whole-line story English is debug-only while word controls remain available',
  story.includes('storyReadingVisible(i, state.debug)') &&
  story.includes('state.debug && lines[0]') &&
  story.includes('story-reading-label') &&
  story.includes('<Token') &&
  !storyReadingVisible('environment', false) &&
  !storyReadingVisible(0, false) &&
  storyReadingVisible('environment', true) &&
  storyReadingVisible(0, true))
check('options form a named list', story.includes('role="list" aria-label="Available actions"') && story.includes('role="listitem"'))
check('route selection is its own native, focusable control',
  story.includes('className="option-select"') &&
  story.includes('aria-disabled={!e.ok}') &&
  !/(?:^|\s)disabled=\{!e\.ok\}/m.test(story) &&
  story.includes('if (e.ok) e.onSelect()') &&
  story.includes('aria-describedby='))
check('whole-action English is debug-only while word-by-word learning remains available',
  story.includes('optionReadingVisible(state.debug)') &&
  story.includes('className={\'option-reading\'') &&
  story.includes('option-gloss-label') &&
  story.includes('Word by word') &&
  !optionReadingVisible(false) && optionReadingVisible(true))
check('route controls announce Albanian rather than leaking the English answer',
  story.includes('const accessibleOptionPhrase = state.debug') &&
  story.includes(': albanianTextOf(e.tokens)') &&
  story.includes('aria-label={`${e.ok ? \'Choose\' : \'Locked\'}: ${accessibleOptionPhrase}`}'))
check('long story prose uses labelled native pagination without discarding core lines',
  story.includes('aria-label="Story pages"') &&
  story.includes('aria-live="polite"') &&
  story.includes('scenePresentation.pages.length > 1') &&
  scenePresentation.includes('Core prose is') &&
  scenePresentation.includes('pinnedLines'))
check('locked actions expose their exact mechanic reason through the native control',
  story.includes('interactionLockText(e.interaction)') &&
  story.includes('effectLockText(') &&
  story.includes('aria-describedby={[routeId, costId]') &&
  story.includes('aria-disabled={!e.ok}') &&
  styles.includes('.option-select[aria-disabled="true"]'))
check('every generalized interaction lock has concrete player wording',
  interactionLockText({ ok: false, reason: 'cooldown', remainingHours: 5 }) === 'ready in 5h' &&
  interactionLockText({ ok: false, reason: 'max-uses', spec: { scope: 'day' } }) === 'already done today' &&
  interactionLockText({ ok: false, reason: 'max-uses', spec: { scope: 'scene' } }) === 'already done here' &&
  interactionLockText({ ok: false, reason: 'max-uses', spec: { scope: 'tale' } }) === 'already done in this tale' &&
  interactionLockText({ ok: false, reason: 'max-uses', spec: { scope: 'run' } }) === 'already done this run' &&
  interactionLockText({ ok: false, reason: 'unbound-scene' }) === 'available only inside its scene' &&
  interactionLockText({ ok: false, reason: 'unbound-tale' }) === 'available only inside its tale')
check('every generalized effect lock has concrete player wording',
  effectLockText({ ok: false, reason: 'insufficient-lek', need: 4 }) === 'need 4 more lek' &&
  effectLockText({ ok: false, reason: 'missing-item', need: 2, itemId: 'bread' }, () => 'bread') === 'need 2 bread' &&
  effectLockText({ ok: false, reason: 'fixture-out-of-reach' }) === 'you must be beside it' &&
  effectLockText({ ok: false, reason: 'fixture-state', action: 'activate', fixtureStage: 'bright' }) === 'it is already lit' &&
  effectLockText({ ok: false, reason: 'fixture-state', action: 'refuel', fixtureStage: null }) === 'light it before refuelling' &&
  effectLockText({ ok: false, reason: 'invalid-effect' }) === 'action is unavailable')
check('civil-hour labels preserve midnight, dawn and late-night targets',
  formatCivilHour(0) === '00:00' && formatCivilHour(6) === '06:00' &&
  formatCivilHour(23) === '23:00' && formatCivilHour(24) === null)
check('ending focus announces fate without leaking comprehension-gated lore',
  story.includes('loreHidden: endingLoreHidden') &&
  sceneAnnouncement({ ending: 'good', title: 'The Road Home', summary: 'secret answer', loreHidden: true }) ===
    'Achievement ending reached: The Road Home. Complete the comprehension test to reveal its tale.' &&
  !sceneAnnouncement({ ending: 'secret', title: 'Hidden Path', summary: 'secret answer', loreHidden: true }).includes('secret answer'))
check('story no longer emulates buttons with generic elements', !story.includes('role="button"'))
check('every blocking overlay uses modal semantics and isolates the app', app.includes('function BlockingModal') && app.includes('role="dialog"') && app.includes('aria-modal="true"') && app.includes('inert={blockingOverlay'))
check('game sections are named navigation and expose the current page', app.includes('<nav className="tabs" aria-label="Game sections">') && app.includes("aria-current={state.view === view ? 'page' : undefined}"))
check('the map navigation and atlas renderer are both debug-gated',
  app.includes("{state.debug && tab('map', '🗺 Map')}") &&
  app.includes("{state.debug && state.view === 'map' && <AtlasView state={state} />}") &&
  !app.includes("\n        {tab('map', '🗺 Map')}") &&
  !app.includes("\n          {state.view === 'map' && <AtlasView"))
check('the application exposes header, navigation, main and a visible-on-focus skip link',
  app.includes('<header className="topbar">') &&
  app.includes('<main id="main-content" tabIndex={-1}>') &&
  app.includes('<a className="skip-link" href="#main-content">') &&
  styles.includes('.skip-link:focus'))
check('every lazy top-level view exposes a level-two heading and labelled region',
  practice.includes('aria-labelledby="practice-title"') && practice.includes('<h2 id="practice-title"') &&
  dictionary.includes('aria-labelledby="dictionary-title"') && dictionary.includes('<h2 id="dictionary-title"') &&
  achievements.includes('aria-labelledby="achievements-title"') && achievements.includes('<h2 id="achievements-title"') &&
  atlas.includes('aria-labelledby="atlas-title"') && atlas.includes('<h2 id="atlas-title"') &&
  guide.includes('aria-labelledby="guide-title"') && guide.includes('<h2 id="guide-title"') &&
  debug.includes('aria-labelledby="debug-title"') && debug.includes('<h2 id="debug-title"'))
check('the debug learning graph is lazy, section-labelled and exposes text alongside status colour',
  debug.includes("lazy(() => import('./DebugLearningProgression.jsx'))") &&
  debug.includes('Loading learning progression…') &&
  debugLearning.includes('aria-labelledby="dbg-learning-example-title"') &&
  debugLearning.includes('aria-labelledby={`dbg-learning-${lane.id}`}') &&
  debugLearning.includes('className={`dbg-learning-status ${status}`}') &&
  styles.includes('@media (max-width: 560px)') &&
  styles.includes('.dbg-learning-flow'))
check('role badge moves visual and keyboard focus to persistent tale guidance', app.includes('focus?.scrollIntoView') && app.includes('focus?.focus()') && embodimentFocus.includes('tabIndex={-1}'))
check('role focus routing survives lazy Story mount and respects reduced motion',
  story.includes("document.activeElement?.classList.contains('embody-badge')") &&
  story.includes("document.getElementById('embodiment-focus') || sceneHeadingRef.current") &&
  app.includes("matchMedia?.('(prefers-reduced-motion: reduce)')"))
check('achievement retakes are unavailable while a character tale is bound', achievements.includes('disabled={roleTestLocked}') && achievements.includes('Finish this character&apos;s tale'))
check('training recommendations match visible, real, role-allowed actions',
  practice.includes('practiceReturnOption(state)') &&
  practiceReturn.includes('option.confuser') &&
  practiceReturn.includes('isOptionRevealed(practiceState, option, node)') &&
  practiceReturn.includes('embodimentOptionAccess(state, option, STORY[option.to]).ok'))
check('whole phrases use construction, listening, cloze, typing and matching instead of sentence multiple choice',
  practice.includes('<PhrasePracticeQuestion') &&
  !practice.includes('q.options.map((entry)') &&
  ['arrange', 'listen', 'cloze', 'type', 'match'].every((mode) => phrasePractice.includes(`${mode}:`)))
check('phrase exercise mode classes cannot inherit a child control layout',
  phrasePractice.includes('phrase-exercise phrase-mode-${q.mode}') &&
  !phrasePractice.includes('phrase-exercise phrase-${q.mode}') &&
  styles.includes('.phrase-exercise {'))
check('phrase listening uses one continuous authored recording',
  audio.includes('export function playPhrase(al)') &&
  phrasePractice.includes('playPhrase(q.target.al)') &&
  !phrasePractice.includes('playPhrase(q.answerWords)'))
check('phrase listening is Albanian transcription without visible or assistive English answers',
  phrasePractice.includes("q.mode === 'listen'") &&
  phrasePractice.includes('aria-label="Play the Albanian phrase"') &&
  !phrasePractice.includes('q.showEnglishCue') &&
  !phrasePracticeLogic.includes('showEnglishCue'))
check('phrase tiles, audio, typing helpers and matching pairs are keyboard-native and named',
  phrasePractice.includes('<button') &&
  phrasePractice.includes('aria-label="Your answer"') &&
  phrasePractice.includes('aria-label="Available words"') &&
  phrasePractice.includes('aria-label="Play the Albanian phrase"') &&
  phrasePractice.includes('<form') &&
  phrasePractice.includes('<label htmlFor=') &&
  phrasePractice.includes('aria-pressed={matchLeft === entry.id}'))
check('phrase results announce feedback and itemise every earned word token',
  phrasePractice.includes('role="status"') &&
  phrasePractice.includes('aria-live="polite"') &&
  phrasePractice.includes('<RewardChips ids={q.rewardIds} />') &&
  phrasePractice.includes('word tokens earned'))
check('dismissible reset dialog returns focus to its trigger', app.includes('returnFocusRef={resetButtonRef}') && app.includes('const target = returnFocusRef?.current || previous'))
check('blocking dialogs place and contain keyboard focus', app.includes('headingRef.current?.focus()') && app.includes("event.key !== 'Tab'") && app.includes('document.addEventListener(\'keydown\''))
check('character confirmation blocks commitment until its exact tale and source record load',
  embodimentConfirm.includes("const taleReady = loadState === 'ready' && tale?.id === pending?.taleId") &&
  embodimentConfirm.includes('disabled={!taleReady}') &&
  embodimentConfirm.includes('aria-busy={loadState === \'loading\'}') &&
  embodimentConfirm.includes('role="alert"') &&
  embodimentConfirm.includes('Retry loading') &&
  embodimentConfirm.includes('Tale and source record ready.'))
check('character confirmation restores focus after the inert surface becomes interactive',
  embodimentConfirm.includes('setTimeout(() =>') && embodimentConfirm.includes('previous?.isConnected'))
check('changing quiz questions and answer results are announced',
  (practice.match(/role="status"/g) || []).length >= 2 &&
  (comprehension.match(/role="status"/g) || []).length >= 2 &&
  practice.includes('aria-atomic="true"') && comprehension.includes('aria-atomic="true"'))
check('map location markers use one roving Tab stop with keyboard-equivalent activation',
  worldMap.includes('const mapMarkerProps =') &&
  worldMap.includes("'data-map-marker': 'true'") &&
  worldMap.includes("event.key === 'Enter' || event.key === ' '") &&
  worldMap.includes("event.key.startsWith('Arrow')") &&
  worldMap.includes('nextMapMarker(markers, markerId, event.key)'))
check('map arrow navigation follows visual direction',
  nextMapMarker([
    { id: 'centre', x: 0, y: 0 },
    { id: 'right-near', x: 10, y: 2 },
    { id: 'right-far', x: 30, y: 0 },
    { id: 'down', x: 0, y: 12 },
  ], 'centre', 'ArrowRight')?.id === 'right-near' &&
  nextMapMarker([
    { id: 'centre', x: 0, y: 0 },
    { id: 'right', x: 10, y: 0 },
    { id: 'down', x: 1, y: 12 },
  ], 'centre', 'ArrowDown')?.id === 'down')
check('shared-place map controls do not duplicate an inspectable player host',
  worldMap.includes('const clusterInteractive = !player || !host || !canInspect(host)') &&
  worldMap.includes("aria-hidden={!clusterInteractive ? 'true' : undefined}") &&
  worldMap.includes('const isCurrentPlace = (id) =>') &&
  worldMap.includes("isCurrentPlace(sel) ? 'You are here'"))
check(
  `all player map labels are natural and hide authoring ids (${playerMapLabels.length}/${playerMapLabels.length})`,
  playerMapLabels.every(({ id, label }) => typeof label === 'string' && label.trim() && label.trim() !== id) &&
    worldMap.includes('aria-label={`${playerMapLabel(d.id)}') &&
    !worldMap.includes('aria-label={`${d.id}'),
)
check(
  'player map hover text hides authoring ids for places, routes and NPC positions',
  worldMap.includes('? playerMapLabel(pl.id)') &&
    worldMap.includes('? playerMapLabel(d.id)') &&
    worldMap.includes('? playerMapLabel(lm.id)') &&
    worldMap.includes('`${playerMapLabel(u)} → ${playerMapLabel(v)}`') &&
    worldMap.includes('near ${playerMapLabel(n.node)}') &&
    !worldMap.includes('<title>{pl.id}') &&
    !worldMap.includes('<title>{d.id}') &&
    !worldMap.includes('<title>{lm.id}') &&
    !worldMap.includes('<title>{n.name} — {n.node}</title>'),
)
check('focused SVG locations receive a visible cue', styles.includes('svg [role="button"]:focus-visible'))
check('a paused role exposes its waiting scene as a named map target with textual directions',
  atlas.includes('const objective = state.embodying && state.embodimentPaused ? state.embodimentFocusNode : null') &&
  atlas.includes('playerMapLabel(objective)') &&
  atlas.includes('chartDirection(dx, dy)?.label') &&
  atlas.includes('distanceBand(Math.hypot(dx, dy))') &&
  atlas.includes('Look for its violet double ring') &&
  worldMap.includes('violet double ring marks where your character&apos;s tale is waiting') &&
  worldMap.includes('your character tale waits here'))
check('ending folklore is loaded on demand', story.includes("lazy(() => import('./FactoidLore.jsx'))") && story.includes('<Suspense'))
check('root and lazy views recover accessibly from rendering failures', main.includes('<ReleaseErrorBoundary') && app.includes('<ReleaseErrorBoundary') && errorBoundary.includes('componentDidCatch') && errorBoundary.includes('role="alert"') && errorBoundary.includes('Reload safely'))
check('rendering-failure recovery moves focus to its explanation', errorBoundary.includes('this.headingRef.current?.focus()') && errorBoundary.includes('ref={this.headingRef} tabIndex={-1}'))
check('one shared resolver drives UI and graph analysis', story.includes("from '../game/revealResolver.js'") && discovery.includes("from '../../src/game/revealResolver.js'"))
check('keyboard focus is strongly visible', /outline:\s*3px solid #9bd3f0/.test(styles))
check('touch actions meet a 44px target floor', /@media \(pointer: coarse\)[\s\S]*min-height:\s*44px/.test(styles))
check('mobile option actions expand to full width', /@media \(max-width: 560px\)[\s\S]*\.option-select \{ width:\s*100%/.test(styles))
check('long-passage dialogs use the dynamic viewport and flexible mobile actions', styles.includes('max-height: calc(100dvh - 16px)') && styles.includes('.time-passage-actions .btn { flex: 1 1 190px; }') && timePassage.includes('aria-modal="true"'))
check('long-passage progress is reducer-owned and focus returns to the story',
  timePassage.includes("type: 'ADVANCE_TIME_PASSAGE'") &&
  timePassage.includes('passageId: passage.id') &&
  timePassage.includes('expectedStep: step') &&
  timePassage.includes("document.getElementById('story-scene-title')?.focus()"))
check('reduced motion suppresses all animation and transition loops', /prefers-reduced-motion: reduce[\s\S]*animation-duration:\s*0\.01ms !important[\s\S]*transition-duration:\s*0\.01ms !important/.test(styles))
check('onboarding, guide and completion panels are styled', ['.onboarding-banner', '.guide-view', '.guide-section', '.collection-progress', '.anthology-complete'].every((selector) => styles.includes(selector)))

const failed = checks.filter(({ condition }) => !condition)
for (const { name, condition } of checks) console.log(`${condition ? '✓' : '✗'} ${name}`)
console.log(`\n${checks.length - failed.length}/${checks.length} accessibility guardrails pass.`)
if (failed.length) process.exitCode = 1
