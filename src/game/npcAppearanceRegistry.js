// Browser assembler for partitioned first-encounter portraits. Each source
// file self-registers through the shared contract, so parallel portrait passes
// add or edit only their own partition module.

import {
  NPC_FIRST_ENCOUNTERS,
  planNpcFirstEncounterLines,
  projectNpcFirstEncounterLines,
} from './npcAppearance.js'

const modules = import.meta.glob('./data/npcAppearances/*.js', { eager: true })
void modules

export { NPC_FIRST_ENCOUNTERS, planNpcFirstEncounterLines, projectNpcFirstEncounterLines }
