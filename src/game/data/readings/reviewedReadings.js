import { EARLY_READINGS } from './early.js'
import { MIDDLE_READINGS } from './middle.js'
import { LATE_READINGS } from './late.js'
import { FINAL_READINGS } from './final.js'

const merged = {}
for (const tranche of [EARLY_READINGS, MIDDLE_READINGS, LATE_READINGS, FINAL_READINGS]) {
  for (const [address, review] of Object.entries(tranche)) {
    if (Object.hasOwn(merged, address))
      throw new Error(`Duplicate reviewed-reading address: ${address}`)
    merged[address] = review
  }
}

export const REVIEWED_READINGS = Object.freeze(merged)
