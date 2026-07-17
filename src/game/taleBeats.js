// ===========================================================================
// TALE BEATS — assembler. The actual tale data lives in ONE FILE PER TALE in
// src/game/data/tales/*.js (see data/tales/_SCHEMA.md for the contract).
// This module just collects them, so adding a tale NEVER edits a shared file:
// parallel agents each own exactly one tale file + one data/npcs/tale-*.js
// file, and merges cannot conflict.
//
// Node scripts can't use import.meta.glob — scripts/beatscoverage.mjs does its
// own readdir over data/tales/ instead. Keep the two in sync conceptually.
// ===========================================================================

const modules = import.meta.glob('./data/tales/*.js', { eager: true })

export const TALES = {}
for (const m of Object.values(modules)) {
  const tale = m.default
  if (tale?.id) TALES[tale.id] = tale
}

export { framesOf, coverageOf, taleQuote, playOf } from './taleLib.js'
