// Machine-readable ownership map for every top-level rule in AGENTS.md.
//
// IDs are semantic and remain stable when prose moves. Source coordinates and
// fingerprints deliberately fail the companion audit when a rule is added,
// removed, reordered, or edited without an explicit coverage decision.

export const RULE_ENFORCEMENT_CLASSES = Object.freeze(['executable', 'process', 'editorial'])
// executable: a deterministic release gate must fail on a violation.
// process: a contributor/release workflow obligation requires explicit review.
// editorial: human judgment remains authoritative; named audits are supporting
// signals rather than a claim of complete semantic proof.
export const RULE_COVERAGE_REQUIREMENTS = Object.freeze({
  executable: 'release-gate',
  process: 'workflow-review',
  editorial: 'editorial-review',
})

const record = (section, bullet, [id, line, fingerprint, enforcementClass, owner, owningAudits = []]) =>
  Object.freeze({
    id,
    source: Object.freeze({ file: 'AGENTS.md', section, bullet, line, fingerprint }),
    enforcementClass,
    owner,
    owningAudits: Object.freeze(owningAudits.map((name) => `scripts/${name}audit.mjs`)),
    coverageRequirement: RULE_COVERAGE_REQUIREMENTS[enforcementClass],
  })

const section = (name, rows) => rows.map((row, index) => record(name, index + 1, row))
const executable = (id, line, fingerprint, owner, audits) => [id, line, fingerprint, 'executable', owner, audits]
const process = (id, line, fingerprint, owner, audits = []) => [id, line, fingerprint, 'process', owner, audits]
const editorial = (id, line, fingerprint, owner, audits = []) => [id, line, fingerprint, 'editorial', owner, audits]

export const RULE_GATE_MANIFEST = Object.freeze([
  ...section('Checkpoint discipline', [
    process('checkpoint.coherent-verified-increments', 5, '0326c17f8e2f8769', 'release-engineering'),
    process('checkpoint.push-and-verify-upstream', 6, '32fd72b4b9be7f14', 'release-engineering'),
    process('checkpoint.verify-exact-deployment', 7, '5c3a83c6a6269277', 'release-engineering'),
    process('checkpoint.inspect-staged-change', 8, 'f297eaef68ef7e59', 'release-engineering'),
    process('checkpoint.focused-outcome-message', 9, '84895a3a3b326008', 'release-engineering'),
    executable('checkpoint.release-gate-reachability', 10, '1984083c8a537f75', 'release-engineering', ['releasegatecoverage']),
    executable('checkpoint.substantive-lore-certification', 11, '9bafa66f94e61c1b', 'lore', ['source']),
    executable('checkpoint.structured-audit-exceptions', 12, '5f999e0bbf2942cb', 'release-engineering', ['auditexceptioncoverage']),
  ]),
  ...section('Private research boundary', [
    executable('privacy.no-private-material-in-repository', 16, 'f6462267896e46c2', 'privacy', ['privacyboundary']),
    executable('privacy.private-roots-stay-ignored', 17, '6c5d30b8fbc12d14', 'privacy', ['privacyboundary']),
    editorial('privacy.aggregate-findings-only', 18, '132243a92fcdb8ac', 'privacy', ['privacyboundary']),
    process('privacy.precommit-language-content-scan', 19, '634783bb063a8f46', 'privacy', ['privacyboundary']),
  ]),
  ...section('Learning-surface answer boundary', [
    executable('answer-boundary.english-readings-debug-only', 23, 'c7ce7e51902f4a15', 'learning-experience', ['storypresentation', 'accessibility', 'playerjourney']),
    executable('answer-boundary.accessible-names-do-not-leak', 24, '9776706794f0b743', 'learning-experience', ['accessibility', 'choiceactor']),
    executable('answer-boundary.accepted-action-karaoke', 25, '5657366fd8241534', 'audio', ['actionaudio', 'actionpipeline']),
    executable('answer-boundary.waveform-aligned-action-timing', 26, '670e2e40c638f0bc', 'audio', ['actionaudioalignment']),
    executable('answer-boundary.reviewed-train-english-cues', 27, '77cbb36067763280', 'learning', ['trainanswervalidity', 'formprogression', 'trainfeedback']),
    executable('answer-boundary.shared-train-card-and-debug-metadata', 28, '5a7abb9f6ed67bad', 'learning-experience', ['accessibility', 'learningprogression', 'trainfeedback']),
  ]),
  ...section('Scene prose and density', [
    editorial('scene-prose.coherent-lived-beats', 32, '7d60fe0e8c5285e9', 'narrative', ['storypresentation', 'worldtexture']),
    executable('scene-prose.presentation-classification', 33, 'aca80af351799718', 'narrative', ['storypresentation', 'observation']),
    executable('scene-prose.shared-progressive-observation', 34, '045c368792a46c88', 'narrative', ['observation']),
    executable('scene-prose.continuous-scroll-projection', 35, '8856ba6ae519d352', 'learning-experience', ['storypresentation']),
    editorial('scene-prose.single-sensory-environment-line', 36, '8ff7458dfe378fdc', 'narrative', ['storycontext', 'environmentnarration']),
  ]),
  ...section('Player causality and knowledge provenance', [
    executable('causality.exact-action-consequence', 40, 'e214c0d7753b9ca5', 'narrative-systems', ['playercausality', 'consequencecoherence']),
    executable('causality.affordance-continuity', 41, '1dbb529797a3a02d', 'narrative-systems', ['actionpresupposition', 'playercausality']),
    executable('causality.predecessor-specific-arrival', 42, '769d2cee4f771afd', 'narrative-systems', ['playercausality']),
    executable('causality.choice-outcome-after-action', 43, '605aae7cf6682fb1', 'narrative-systems', ['playeractionprovenance']),
    executable('causality.earned-payment-before-agency', 44, '9742f5f68d013755', 'narrative-systems', ['economy', 'narrativeflow']),
    editorial('causality.identifiable-lore-source', 45, '05695d5099c34245', 'lore', ['source', 'playeractionprovenance']),
    executable('causality.self-loop-arrival-gating', 46, '58697d099e13fb15', 'narrative-systems', ['playercausality', 'narrativeflow']),
    executable('causality.resolve-choice-semantics-backlog', 47, '15edb0486feaf68d', 'narrative-systems', ['compoundintent']),
    executable('causality.confusers-require-prior-exposure', 48, '16dcb1d3684c69ed', 'learning', ['reveal', 'actionpipeline']),
  ]),
  ...section('Immersive environment narration', [
    editorial('environment.authored-sensory-state', 52, '6199dd04c80e235d', 'narrative', ['environmentcoverage', 'worldtexture']),
    executable('environment.transition-fallback-snapshot', 53, 'ee3d5e22ebc5ab7e', 'world-systems', ['environmentnarration', 'storycontext']),
    executable('environment.metadata-driven-dimensions', 54, 'e839ab7379f6b9f5', 'world-systems', ['environmentnarration']),
    process('environment.pin-authored-environment-cases', 55, '6bb96473f21309eb', 'world-systems', ['storycontext']),
  ]),
  ...section('World texture and responsive description', [
    editorial('world-texture.sensory-place-identity', 59, 'a8c9a9639b7010b2', 'narrative', ['worldtexture']),
    editorial('world-texture.useful-albanian-description', 60, '27e93586f2e8dffd', 'curriculum', ['worldtexture', 'dictionaryusage', 'definitionquality']),
    executable('world-texture.state-responsive-prose', 61, '31a3a21f19dca2df', 'world-systems', ['worldtexture', 'storycontext']),
    editorial('world-texture.consistent-npc-identity', 62, '8013db837094bfd9', 'narrative', ['npcappearance', 'worldentity']),
    editorial('world-texture.description-preserves-agency', 63, 'f12652e95a2d40e7', 'narrative', ['playeractionprovenance', 'observation']),
    editorial('world-texture.avoid-repeated-templates', 64, 'e2f75b1d0b95c3d7', 'narrative', ['worldtexture']),
    executable('world-texture.whole-world-coverage', 65, 'dcb99acdc33e51c3', 'world-systems', ['worldtexture']),
    executable('world-texture.honest-place-signals', 66, 'c7f033cf3ca64a38', 'world-systems', ['worldtexture']),
    executable('world-texture.bounded-duplicate-exceptions', 67, 'cfe5b6e9619d50ad', 'world-systems', ['worldtexture']),
    executable('world-texture.clock-domain-transition-state', 68, '9fd461edbaf956cd', 'world-systems', ['environmentnarration', 'storycontext']),
    executable('world-texture.opening-versus-transition-wording', 69, '5d25188e0b89fdb9', 'world-systems', ['environmentnarration']),
  ]),
  ...section('Immersive health narration', [
    executable('health.transition-context-snapshot', 73, '47fa2eeec755881d', 'world-systems', ['storycontext']),
    executable('health.atomic-explained-heart-loss', 74, '9fcdc7c1025a3607', 'learning-systems', ['heartconsequence', 'consequencecoherence']),
  ]),
  ...section('Immersive inventory narration', [
    executable('inventory.remembered-context-snapshot', 78, '4d94af7957bdb779', 'world-systems', ['inventorynarration', 'storycontext']),
    executable('inventory.canonical-actionable-holdings', 79, 'e4db599d90571fc7', 'world-systems', ['inventorynarration', 'itemaffordance']),
  ]),
  ...section('Train progression integrity', [
    executable('train.disambiguated-contextual-senses', 83, '26b4b3dff9ffe456', 'learning', ['contextquestion']),
    executable('train.saved-word-recognition-sequence', 84, '8e0362333b6ef64e', 'learning', ['wordprogression', 'wordformstatepath']),
    executable('train.named-entity-trainability', 85, 'b52f2a4f14e4b9bc', 'learning', ['namedentitylearning']),
    executable('train.disjoint-remediation-without-proof-loss', 86, '0cad3a4d07337cea', 'learning', ['wordprogression', 'wordformstatepath', 'adaptivelearning']),
    executable('train.independent-word-aspects', 87, '2069c6c89ffdcce7', 'learning', ['wordaspect']),
    executable('train.passive-exposure-is-not-mastery', 88, '4c434899cd1762f5', 'learning', ['wordaspect', 'resetpolicy']),
    executable('train.phrase-specific-unlocks', 89, 'f0dfa728497ba797', 'learning', ['phrasepractice']),
    executable('train.restart-preserves-learner-profile', 90, 'ae650aa4ead58c31', 'learning-systems', ['resetpolicy']),
    executable('train.visited-and-death-reset-policy', 91, '4ce69fc101f29e3b', 'learning-systems', ['resetpolicy']),
    executable('train.shared-progression-registries', 92, '474e3a341312b35f', 'learning', ['learningprogression', 'wordprogression']),
    executable('train.whole-bank-production-planner-path', 93, 'b26a7f58cd3be46b', 'learning', ['traincandidatecontract', 'trainfutureplanner', 'trainanswervalidity']),
    executable('train.no-consecutive-shared-word', 94, '0f85907b67906fcc', 'learning', ['trainfutureplanner', 'phrasepractice', 'wordprogression']),
    executable('train.separate-evidence-tracks-and-remediation', 95, '3331b1c0a2d3f1ff', 'learning', ['phrasepractice', 'adaptivelearning']),
    executable('train.sound-led-spelling-sequence', 96, 'a845b02f338514bc', 'learning', ['auditorywordspelling', 'wordaudiorecognition']),
    executable('train.aspect-level-health-policy', 97, '4099e7e98b152d62', 'learning-systems', ['trainhealthpolicy']),
    executable('train.visible-health-risk-and-recovery', 98, '6dc575b0d73eec8e', 'learning-experience', ['trainhealthpolicy', 'trainfeedback']),
    executable('train.adaptive-five-pair-matching', 99, 'ca476b6f817e502e', 'learning', ['wordmatching']),
    executable('train.debug-graph-updated-with-new-kinds', 100, '2d43027f6ab05e8b', 'learning', ['learningprogression']),
    executable('train.debug-current-activity-trace', 101, '0aa2d079c1d7027e', 'learning-experience', ['trainactivityinspector']),
    executable('train.single-unambiguous-target', 102, '1d45b6fd71681083', 'learning-experience', ['contexttargetidentification', 'trainanswervalidity']),
    executable('train.shared-context-target-presentation', 103, 'bce9ce9372c880ce', 'learning-experience', ['contexttargetidentification', 'contextquestion']),
    executable('train.staged-reviewed-form-contrast', 104, 'b7abbb0e0f2067b1', 'learning', ['formprogression', 'wordformstatepath']),
    executable('train.grammar-phase-answer-boundary', 105, 'd1a7b11b3c79926e', 'learning-experience', ['formprogression', 'trainfeedback']),
    executable('train.blocking-leeway-comparison', 106, 'd603942f75a5b9e5', 'learning-experience', ['trainfeedback', 'trainanswervalidity']),
    executable('train.defensible-distractors-only', 107, 'a29c6eb337dae62f', 'learning', ['trainanswervalidity', 'distractorplanning']),
    executable('train.shared-odd-one-out-refresher', 108, '93a0cf22b0571b5f', 'learning-experience', ['reviewedformoddoneout', 'nounendingrefresher']),
    executable('train.noun-classification-independent-of-paradigm', 109, 'dd7b7abb0458fa5d', 'language', ['nounparadigm', 'inflectionpolicy']),
  ]),
  ...section('Practical-language grounding', [
    editorial('practical.reusable-present-day-priority', 113, '899e717517cb50b4', 'curriculum', ['conversation', 'earlylanguage']),
    executable('practical.world-bound-directions', 114, 'ad97af6d6ad483c1', 'narrative-systems', ['conversationhub']),
    editorial('practical.folklore-reinforces-language', 115, '3ab90eb3ce042314', 'curriculum', ['conversation', 'everydayitem']),
    executable('practical.designated-object-affordance', 116, 'cdd4865bdffffadf', 'curriculum', ['everydayitem']),
    executable('practical.focused-rewards-and-continuous-listening', 117, '8c69ba7cdd1329be', 'learning', ['phrasepractice']),
    executable('practical.construction-distractors-and-phrase-scope', 118, 'd4e8d12d219cb45f', 'learning', ['phrasepractice', 'trainanswervalidity']),
  ]),
  ...section('Dictionary and grammatical-form integrity', [
    executable('dictionary.used-distinct-quality-senses', 122, 'b61b968355a5d70b', 'language', ['dictionaryusage', 'definitionquality']),
    editorial('dictionary.reviewed-word-class-inflection', 123, '834774d42f1bb2cd', 'language', ['inflectionpolicy', 'nounparadigm']),
    executable('dictionary.sense-pinned-reachable-forms', 124, '1e453f12901f6dd2', 'language', ['inflectionpolicy', 'nounendingrefresher', 'formprogression']),
    executable('dictionary.explicit-coverage-scope', 125, 'bee16dd36ff6d1fb', 'language', ['inflectionpolicy', 'nounparadigm']),
  ]),
  ...section('Immersion and debug boundaries', [
    executable('immersion.story-prose-owns-world-status', 129, '09ba7800f45ae3eb', 'learning-experience', ['storycontext', 'storypresentation', 'accessibility']),
    executable('immersion.no-reward-preview-and-joined-balance', 130, '147d1418a5abe884', 'world-systems', ['economy', 'inventorynarration']),
    executable('immersion.nominal-lek-values', 131, '1d8bfb1fe27f0749', 'world-systems', ['economy']),
    executable('immersion.movement-and-appointment-continuity', 132, 'e4f38e7cf9804284', 'narrative-systems', ['speechmovement', 'state', 'playercausality']),
    executable('immersion.local-sentence-gate', 133, '20bd2b0f959b1b33', 'narrative-systems', ['reveal']),
    executable('immersion.runtime-npc-identity-policy', 134, '5f91acefcce55f29', 'narrative-systems', ['worldentity', 'npcappearance']),
    executable('immersion.no-mandatory-continue-chains', 135, 'c0cc940443d247ac', 'narrative-systems', ['narrativeflow']),
    executable('immersion.choice-answer-boundary', 136, '6d2a722ef8cec0f7', 'learning-experience', ['accessibility', 'storypresentation']),
    executable('immersion.runtime-normal-debug-boundary', 137, '8439cd4a355b79d8', 'learning-experience', ['accessibility', 'cefrdebug', 'trainactivityinspector']),
  ]),
  ...section('Conversation agency and character presence', [
    executable('conversation.single-intent-no-speech-travel', 141, '3478c09abd6d9371', 'narrative-systems', ['speechmovement', 'compoundintent']),
    executable('conversation.in-place-voluntary-topic-hub', 142, '29cda904cf013719', 'narrative-systems', ['conversationhub']),
    executable('conversation.detect-speak-monologue-exit', 143, '492a4412ae4fe859', 'narrative-systems', ['conversationhub']),
    executable('conversation.condition-aware-agency', 144, 'a0ff036d59fe7a2a', 'narrative-systems', ['narrativeflow']),
    executable('conversation.no-ask-again-page-chain', 145, 'f55d7c6221a43627', 'narrative-systems', ['conversationhub']),
    executable('conversation.no-supplied-player-reply', 146, '260d0c1cee082e9f', 'narrative-systems', ['conversationhub', 'playeractionprovenance']),
    executable('conversation.player-owned-choice-actor-and-label', 147, '2055bcaebdb370b5', 'narrative-systems', ['choiceactor']),
    executable('conversation.exact-player-action-provenance', 148, '122c74f789830c5b', 'narrative-systems', ['playeractionprovenance']),
    editorial('conversation.distinctive-canonical-npc-portrait', 149, 'f5fbeeaf192aa0d7', 'narrative', ['npcappearance']),
    executable('conversation.persisted-npc-portrait-retirement', 150, 'd0e85915eb95a2a4', 'narrative-systems', ['npcappearance']),
    editorial('conversation.merge-adjacent-perception', 151, 'c138ea81145addf3', 'narrative', ['worldtexture', 'npcappearance']),
  ]),
  ...section('Quest and stateful-mechanics integrity', [
    executable('quest.shared-concurrent-lifecycle', 155, 'd9daef3a096b17b9', 'world-systems', ['quest']),
    executable('quest.live-objective-readiness', 156, 'ec75049152d48da4', 'world-systems', ['quest']),
    executable('quest.atomic-idempotent-effects', 157, '149524df3d7040cd', 'world-systems', ['quest', 'canonicalstate']),
    executable('quest.acceptance-returns-free-roam', 158, 'd604898b169772f3', 'narrative-systems', ['quest', 'narrativeflow']),
    executable('quest.canonical-mechanic-authorities', 159, '8c66c856e2b943d6', 'world-systems', ['canonicalstate', 'resetpolicy']),
    process('quest.extend-lifecycle-and-state-audits', 160, 'b584d062e17cb9d0', 'world-systems', ['quest', 'canonicalstate']),
  ]),
  ...section('Holistic A2 learning evidence', [
    executable('a2.non-compensatory-mode-profile', 164, '8c58c5e88d9dcb02', 'assessment', ['cefrassessment', 'cefrvalidation']),
    executable('a2.separate-learning-transfer-readiness', 165, '00039d907a058fef', 'assessment', ['cefrassessment', 'cefrpreparation']),
    executable('a2.replay-safe-support-exposure', 166, '8baeee643c14ffd6', 'assessment', ['cefrassessment', 'cefrpreparation']),
    executable('a2.completed-continuous-listening-evidence', 167, '3c4996878114388f', 'assessment', ['cefrassessment', 'audio']),
    executable('a2.world-gap-or-lore-rehearsal', 168, 'c7080bf51f93e6d0', 'assessment', ['cefrtask', 'cefrpreparation']),
    executable('a2.open-response-low-stakes-diagnosis', 169, 'c4ad4b40c6c01b55', 'assessment', ['openresponsefeedback', 'cefrvalidation']),
    executable('a2.authored-task-floors-and-real-turns', 170, 'b2c903ece7b34138', 'assessment', ['cefrtask', 'openresponsefeedback']),
    executable('a2.authored-anchors-revision-and-focus', 171, 'd6c660794a2be4e4', 'assessment', ['openresponsefeedback', 'cefrpreparationui']),
    executable('a2.unvalidated-ai-cannot-award-readiness', 172, 'feb9686a1b1bd877', 'assessment', ['cefrvalidation']),
    editorial('a2.caveated-public-readiness-claim', 173, '43040e3e8131a57a', 'assessment', ['cefrvalidation']),
  ]),
])
