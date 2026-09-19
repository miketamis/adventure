import { enumerateTrainActivityCandidateSteps } from './game/trainCandidateContract.js'

// This changes only when work runs, never which candidates the canonical
// builder enumerates. Yield between targets so navigation/paint can proceed.
export const TRAIN_CANDIDATE_WORK_SLICE_MS = 12

export async function completeTrainCandidateWork(options, {
  isCancelled = () => false,
  clock = () => performance.now(),
  yieldControl,
  measureSlice = (work) => work(),
} = {}) {
  const steps = enumerateTrainActivityCandidateSteps(options)
  let channel = null
  let resume = null
  // Posted tasks yield to input/rendering without the nested-timer minimum
  // delay, which otherwise adds hundreds of milliseconds to a large bank.
  const nextTask = yieldControl || (() => new Promise((resolve) => {
    if (typeof MessageChannel !== 'function') {
      setTimeout(resolve, 0)
      return
    }
    if (!channel) {
      channel = new MessageChannel()
      channel.port1.onmessage = () => {
        const continueWork = resume
        resume = null
        continueWork?.()
      }
    }
    resume = resolve
    channel.port2.postMessage(null)
  }))
  try {
    while (!isCancelled()) {
      const result = measureSlice(() => {
        const started = clock()
        let step
        do {
          if (isCancelled()) return null
          step = steps.next()
        } while (!step.done && clock() - started < TRAIN_CANDIDATE_WORK_SLICE_MS)
        return step
      })
      if (!result || isCancelled()) return null
      if (result.done) return result.value
      await nextTask()
    }
    return null
  } finally {
    steps.return()
    channel?.port1.close()
    channel?.port2.close()
  }
}
