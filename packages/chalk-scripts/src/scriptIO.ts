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

// Application Structure || Define Constructor
// =======================================================================================
// =======================================================================================
export type TConstructor = {
  trace: string
  startTime: number
} & TScriptInputs



// Application Structure || Define Outputs
// =======================================================================================
// =======================================================================================
export type TScriptOutputs = {
  logText: string
  timeElapsed: string
} & TConstructor

// Application Structure || Define Public Interface
// =======================================================================================
// =======================================================================================
export interface IScript {
  log(...args: any[]): Promise<TScriptOutputs>
  warn(...args: any[]): Promise<TScriptOutputs>
  error(...args: any[]): Promise<TScriptOutputs>
  values(...args: any[]): Promise<TScriptOutputs>
  extract(...args: any[]): Promise<TScriptOutputs>
  set(updates: Partial<TScriptInputs>): Promise<void>
  default(...args: any[]): Promise<TScriptOutputs>
  success(...args: any[]): Promise<TScriptOutputs>
  warning(...args: any[]): Promise<TScriptOutputs>
  failure(...args: any[]): Promise<TScriptOutputs>
  insight(...args: any[]): Promise<TScriptOutputs>
  tracker(...args: any[]): Promise<TScriptOutputs>
}




