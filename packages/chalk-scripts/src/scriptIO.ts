// Application Structure || Define Imports
// =======================================================================================
// =======================================================================================
import { ELogType, ELogStyle, TSequence } from "./types"


// Application Structure || Define Inputs
// =======================================================================================
// =======================================================================================
export type TScriptInputs = {
  id?: string

  // CONFIG: Function Name
  name?: string

  // LOG: Sets Color Style
  logType?: ELogType

  // LOG: Sets Output Style
  logStyle?: ELogStyle

  // LOG: Sets Sequence of log and properties display
  logSequence?: TSequence

  // SAVING: Base Directory
  root?: string

  // SAVING: File name (.json will be appended)
  file?: string

  // SAVING: Folder path from root dir
  path?: string

  // SAVING: Sequence of save and properties to display
  saveSequence?: TSequence
}


// Application Structure || Define Outputs
// =======================================================================================
// =======================================================================================


// Application Structure || Define Constructor
// =======================================================================================
// =======================================================================================
export type TConstructor = {
  trace?: string,
  startTime?: number
} & TScriptInputs
