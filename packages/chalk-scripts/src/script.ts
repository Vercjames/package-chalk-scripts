import chalk from "chalk"

// Application Structure || Define Imports
// =======================================================================================
// =======================================================================================
import { formatArgs } from "../../../utils"
import { TConstructor, TScriptInputs, TScriptOutputs } from "./scriptIO"
import { ELogStyle, ELogType } from "./types"

// Application Structure || Define Export
// =======================================================================================
// =======================================================================================
export class Script {
  private options: TConstructor

  // NOTE: Configure Default Options
  constructor(options: TScriptInputs = {}) {
    this.options = {
      id: "xxxxxxxxxx",
      logStyle: ELogStyle.STRING,
      logSequence: ["id", "timeElapsed", "trace", "name"],
      saveSequence: ["id", "createdAt", "timeElapsed", "trace", "name"],
      startTime: Date.now(),
      trace: (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString(),
      ...options
    }
  }

  // NOTE: Calculate the elapsed time
  private getElapsedTime(): string {
    const now = Date.now()
    return ((now - this.options.startTime!) / 1000).toFixed(4).padStart(9, "0")
  }

  // NOTE: Build the standard return object
  private buildOutput(args: any[]): TScriptOutputs {
    return {
      ...this.options,
      timeElapsed: this.getElapsedTime(),
      logText: formatArgs(args)
    }
  }

  // NOTE: Handle logging based on logStyle
  private handleOutput(logType: ELogType, args: any[], output: TScriptOutputs): void {
    if (this.options.logStyle === ELogStyle.VALUES) {
      console.log(JSON.stringify(output, null, 2))
    } else {
      const consoleMessage = this.formatMessage({ logType, args, timeElapsed: output.timeElapsed })
      console.log(consoleMessage)
    }
  }

  // NOTE: Create the `String` handled by the console
  private formatMessage({ logType, timeElapsed, args }: { logType: ELogType; timeElapsed: string, args: any[] }): string {
    let consoleMessage: string = ""

    // Get color based on logType
    const getColor = (type: ELogType) => {
      switch (type) {
        case ELogType.SUCCESS:
          return chalk.green
        case ELogType.WARNING:
          return chalk.hex("#FFA500")
        case ELogType.FAILURE:
          return chalk.red
        case ELogType.INSIGHT:
          return chalk.blue
        case ELogType.TRACKER:
          return chalk.magenta
        case ELogType.DEFAULT:
        default:
          return (text: string) => text
      }
    }

    const color = getColor(logType)

    const formatMap = {
      id: () => `ID: ${chalk.yellow(`[${this.options.id}]`)} -> `,
      name: () => `Name: ${chalk.yellow(`[${this.options.name || "Unknown"}]`)} -> `,
      createdAt: () => `Created At: ${chalk.yellow((`[${this.options.startTime}]`))} -> `,
      timeElapsed: () => `Elapsed: ${chalk.yellow((`[${timeElapsed}]`))} -> `,
      trace: () => `Trace: ${chalk.yellow(`[${this.options.trace}]`)} -> `,
      type: () => `Type: ${color(`[${logType}]`)} -> `
    }

    this.options.logSequence?.forEach((key) => {
      consoleMessage += formatMap[key]?.() || ""
    })

    if (args.length > 0) {
      consoleMessage += color(formatArgs(args))
    }

    return consoleMessage
  }

  // Application Structure || OG Methods
  // =====================================================================================
  async log(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.DEFAULT, args, output)
    return output
  }

  async warn(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.WARNING, args, output)
    return output
  }

  async error(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.FAILURE, args, output)
    return output
  }

  // NOTE: Log buildOutput values as JSON
  async values(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    console.log(output)
    return output
  }

  // NOTE: Extract values from the script
  async extract(...args: any[]): Promise<TScriptOutputs> {
    return this.buildOutput(args)
  }

  // NOTE: Update script configuration
  async set(updates: Partial<TScriptInputs>): Promise<this> {
    this.options = {
      ...this.options,
      ...updates
    }
    return this
  }

  // Application Structure || Mono Methods
  // =====================================================================================
  async default(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.DEFAULT, args, output)
    return output
  }

  async success(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.SUCCESS, args, output)
    return output
  }

  async warning(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.WARNING, args, output)
    return output
  }

  async failure(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.FAILURE, args, output)
    return output
  }

  async insight(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.INSIGHT, args, output)
    return output
  }

  async tracker(...args: any[]): Promise<TScriptOutputs> {
    const output = this.buildOutput(args)
    this.handleOutput(ELogType.TRACKER, args, output)
    return output
  }
}
