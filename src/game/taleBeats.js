// ===========================================================================
// TALE BEATS — assembler. The actual tale data lives in ONE FILE PER TALE in
// src/game/data/tales/*.js (see data/tales/_SCHEMA.md for the contract).
// Record edits stay in their owning tale/NPC partitions. New or renamed tale
// partitions must also update taleRegistryData.js, the shared browser/Node
// assembler. The 3D release gate compares its explicit import manifest with
// the real directory; scripts/beatscoverage.mjs independently reads that same
// directory for lore coverage.
// ===========================================================================

export { TALES } from './taleRegistryData.js'

export { framesOf, coverageOf, taleQuote, playOf } from './taleLib.js'
