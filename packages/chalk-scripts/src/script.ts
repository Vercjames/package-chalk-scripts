import chalk from "chalk"

// Application Structure || Define Imports
// =======================================================================================
// =======================================================================================
import { TConstructor } from "./scriptIO"
import { ELogType } from "./types"

// Application Structure || Define Export
// =======================================================================================
// =======================================================================================
export class Script {
  private options: TConstructor

  // NOTE: Configure Default Options
  constructor(options: TConstructor = {}) {
    this.options = {
      id: "xxxxxxxxxx",
      startTime: Date.now(),
      logSequence: ["id", "createdAt", "timeElapsed", "trace", "name", "type"],
      saveSequence: ["id", "createdAt", "timeElapsed", "trace", "name"],
      trace: (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString(),
      ...options,
    }
  }

  // NOTE: Calculate the elapsed time
  private getElapsedTime(): string {
    const now = Date.now()
    return ((now - this.options.startTime!) / 1000).toFixed(4).padStart(9, "0")
  }

  // NOTE: Create the `String` handled by the console
  private formatMessage({ logType, args }: { logType: ELogType; args: any[] }): string {
    let consoleMessage: string = ""

    // Get color based on logType
    const getColor = (type: ELogType) => {
      switch (type) {
        case ELogType.SUCCESS:
          return chalk.hex("#82d616")
        case ELogType.WARNING:
          return chalk.hex("#fbcf33")
        case ELogType.FAILURE:
          return chalk.hex("#ea0606")
        case ELogType.INSIGHT:
          return chalk.hex("#17c1e8")
        case ELogType.TRACKER:
          return chalk.hex("#cb0c9f")
        case ELogType.DEFAULT:
        default:
          return chalk.white
      }
    }

    const color = getColor(logType)

    const formatMap = {
      id: () => `ID: ${chalk.hex("#344767")(`[${this.options.id}]`)} -> `,
      name: () => `Name: ${chalk.hex("#344767")(`[${this.options.name || "Unknown"}]`)} -> `,
      createdAt: () => `Created At: ${chalk.hex("#344767")((`[${this.options.startTime}]`))} -> `,
      timeElapsed: () => `Elapsed: ${chalk.hex("#344767")((`[${this.getElapsedTime()}]`))} -> `,
      trace: () => `Trace: ${chalk.hex("#344767")(`[${this.options.trace}]`)} -> `,
      type: () => `Type: ${color(`[${logType}]`)} -> `
    }

    this.options.logSequence?.forEach((key) => {
      consoleMessage += formatMap[key]?.() || ""
    })

    if (args.length > 0) {
      const logText = args.map(arg => typeof arg === "string" ? arg : String(arg)).join(" ")
      consoleMessage += color(logText)
    }

    return consoleMessage
  }



  // Application Structure || OG Methods
  // =====================================================================================
  log(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.DEFAULT, args }))
  }

  warn(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.WARNING, args }))
  }

  error(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.FAILURE, args }))
  }


  // Application Structure || Mono Methods
  // =====================================================================================
  default(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.DEFAULT, args }))
  }

  success(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.SUCCESS, args }))
  }

  warning(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.WARNING, args }))
  }

  failure(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.FAILURE, args }))
  }

  insight(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.INSIGHT, args }))
  }

  tracker(...args: any[]): void {
    console.log(this.formatMessage({ logType: ELogType.TRACKER, args }))
  }
}
