// Application Structure || Define Imports
// =======================================================================================
// =======================================================================================
import { Script } from "./script"
import { TScriptInputs } from "./scriptIO"
// import { TLogOrder, TSaveOrder, TLogType, TSaveOutput, TConfigOutput, TConstructor, TConfigInput } from "./types"


// Application Structure || Export Module
// =======================================================================================
// =======================================================================================
export const scripts = (config?: TScriptInputs): Script => {
  return new Script(config)
}

// Application Structure || Export Types
// =======================================================================================
// =======================================================================================
// export { TLogOrder, TSaveOrder, TLogType, TSaveOutput, TConstructor, TConfigOutput, TConfigInput }
