import { replayCheckpointHash } from './playtestAnalytics.js'

const STRUCTURED_EVENTS = new Set([
  'playtest_session_started',
  'playtest_session_ended',
  'surface_presented',
  'story_choice_presented',
  'state_transition_committed',
  'run_checkpoint_recorded',
  'train_scheduler_decided',
  'train_question_presented',
  'train_option_presented',
  'train_attempt_completed',
  'audio_playback_completed',
  'playtest_feedback_prompted',
  'playtest_feedback_submitted',
  'playtest_feedback_dismissed',
  'technical_issue_occurred',
])

const asProperties = (value) => {
  if (!value) return {}
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
      return {}
    }
  }
  return typeof value === 'object' ? value : {}
}

const asSequence = (value) => {
  const sequence = Number(value)
  return Number.isSafeInteger(sequence) && sequence >= 0 ? sequence : null
}

const asTimestamp = (value) => {
  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? timestamp : 0
}

export function normalizePlaytestExport(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map((row, exportIndex) => {
      const properties = asProperties(row?.properties)
      const event = row?.event || row?.event_name || properties.event
      if (!STRUCTURED_EVENTS.has(event)) return null
      return {
        exportIndex,
        event,
        timestamp: row?.timestamp || row?.created_at || properties.timestamp || null,
        properties,
        sessionId: properties.analytics_session_id || 'unknown-session',
        runId: properties.game_run_id || null,
        sequence: asSequence(properties.state_sequence),
        receipt: properties.event_receipt || null,
      }
    })
    .filter(Boolean)
    .sort((left, right) => {
      const timeDifference = asTimestamp(left.timestamp) - asTimestamp(right.timestamp)
      return timeDifference || left.exportIndex - right.exportIndex
    })
}

const timelineEntry = (entry) => {
  const properties = entry.properties
  return {
    timestamp: entry.timestamp,
    sequence: entry.sequence,
    event: entry.event,
    receipt: entry.receipt,
    view: properties.view_after || properties.view || null,
    nodeId: properties.destination_node_id || properties.node_id || null,
    actionType: properties.action_type || null,
    actionId: properties.action_id || null,
    questionId: properties.question_id || null,
    targetIds: properties.target_ids || null,
    selectedOptionId: properties.selected_option_id || null,
    correct: typeof properties.correct === 'boolean' ? properties.correct : null,
    beforeStateHash: properties.before_state_hash || null,
    afterStateHash: properties.after_state_hash || null,
    stateDelta: properties.state_delta || null,
    checkpointReason: properties.checkpoint_reason || null,
  }
}

const issue = (type, detail) => ({ type, ...detail })

export function verifyStructuredReplay(events) {
  const normalized = normalizePlaytestExport(events)
  const issues = []
  const receipts = new Set()
  const runEntries = new Map()

  for (const entry of normalized) {
    if (entry.receipt) {
      if (receipts.has(entry.receipt)) issues.push(issue('duplicate-receipt', { receipt: entry.receipt }))
      receipts.add(entry.receipt)
    }
    const runId = entry.runId || `${entry.sessionId}:unscoped`
    if (!runEntries.has(runId)) runEntries.set(runId, [])
    runEntries.get(runId).push(entry)

    if (entry.event === 'run_checkpoint_recorded') {
      const expected = entry.properties.after_state_hash
      const checkpoint = entry.properties.checkpoint_state
      if (!checkpoint || !expected) {
        issues.push(issue('incomplete-checkpoint', { runId, receipt: entry.receipt }))
      } else {
        const actual = replayCheckpointHash(checkpoint)
        if (actual !== expected) issues.push(issue('checkpoint-hash-mismatch', {
          runId,
          receipt: entry.receipt,
          expected,
          actual,
        }))
      }
    }
  }

  const runs = [...runEntries.entries()].map(([runId, entries]) => {
    const transitions = entries
      .filter(({ event }) => event === 'state_transition_committed')
      .sort((left, right) => (left.sequence ?? Number.MAX_SAFE_INTEGER) - (right.sequence ?? Number.MAX_SAFE_INTEGER))
    let previous = null
    for (const transition of transitions) {
      if (transition.sequence == null) {
        issues.push(issue('missing-transition-sequence', { runId, receipt: transition.receipt }))
      } else if (previous?.sequence != null && transition.sequence !== previous.sequence + 1) {
        issues.push(issue('transition-sequence-gap', {
          runId,
          previous: previous.sequence,
          next: transition.sequence,
        }))
      }
      if (previous?.properties.after_state_hash && transition.properties.before_state_hash &&
        previous.properties.after_state_hash !== transition.properties.before_state_hash) {
        issues.push(issue('transition-hash-chain-mismatch', {
          runId,
          previousReceipt: previous.receipt,
          nextReceipt: transition.receipt,
        }))
      }
      previous = transition
    }
    return {
      runId,
      sessionId: entries[0]?.sessionId || 'unknown-session',
      buildCommits: [...new Set(entries.map(({ properties }) => properties.build_commit).filter(Boolean))],
      schemaVersions: [...new Set(entries.map(({ properties }) => properties.event_schema_version).filter(Boolean))],
      eventCount: entries.length,
      transitionCount: transitions.length,
      timeline: entries.map(timelineEntry),
    }
  })

  return {
    valid: issues.length === 0,
    eventCount: normalized.length,
    runCount: runs.length,
    issues,
    runs,
  }
}
