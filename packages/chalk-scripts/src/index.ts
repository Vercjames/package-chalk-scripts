// Application Structure || Define Imports
// =======================================================================================
// =======================================================================================
import { Script } from "./script"
import { IScript, TSequence, ELogStyle, ELogType } from "./types"
import { TScriptInputs, TScriptOutputs } from "./scriptIO"


// Application Structure || Export Module
// =======================================================================================
// =======================================================================================
export const scripts = (config?: TScriptInputs): IScript => {
  return new Script(config)
}

// Application Structure || Export Types
// =======================================================================================
// =======================================================================================
export { ELogStyle, ELogType, TScriptInputs, TScriptOutputs, TSequence, IScript }
