// Application Structure || Define Imports
// =======================================================================================
// =======================================================================================
import { Script } from "./scripts"
import { TLogOrder, TSaveOrder, TLogType, TSaveOutput, TConfigOutput, TConstructor, TConfigInput } from "./types"

// Application Structure || Define Factory Function
// =======================================================================================
// =======================================================================================
export const scripts = (config?: TConstructor): Script => {
  return new Script(config)
}

// Application Structure || Define Exports
// =======================================================================================
// =======================================================================================
export { TLogOrder, TSaveOrder, TLogType, TSaveOutput, TConstructor, TConfigOutput, TConfigInput }
