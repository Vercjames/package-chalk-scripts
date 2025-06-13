import fs from "fs"
import path from "path"
import chalk from "chalk"

// Application Component || Define Imports
// =================================================================================================
// =================================================================================================
import { TLogOrder, TSaveOrder, TLogType, TSaveOutput, TConfigOutput, TConstructor, TConfigInput } from "./types"

// Application Component || Define Exports
// =================================================================================================
// =================================================================================================
export { TLogOrder, TSaveOrder, TLogType, TSaveOutput, TConstructor, TConfigOutput, TConfigInput }

// Application Component || Script Class
// =================================================================================================
// =================================================================================================
class Script {
  private id: string = "xxxxxxxxxx"

  // WHAT: Where the files should be saved
  private root: string

  // WHAT: Name of the function logged
  private func: string | null = null

  // WHAT: Name of the file to be saved
  private file: string | null = null

  // WHAT: Stack Trace used to group logs with the same origin
  private stack: string | null = "xxxxxx"

  // WHAT: Stack Trace time since initiated
  private stackTime: number | null = null

  // WHAT: Name of the folder to store the log file in. (will create folder)
  private folder: string | null = null

  // WHAT: prevents a log regardless of scope. generally used to silence an unwanted log when deployed
  private silence: boolean = false

  // WHAT: The logged text
  private logText: string | null = null

  // WHAT: the logged order
  private logOrder: TLogOrder

  // WHAT: the save order
  private saveOrder: TSaveOrder

  // WHAT:The type of log (sets color)
  private logType: "default" | "success" | "warning" | "mistake" | "insight" = "default"

  private static defaults = new Script() // Store default values

  private static instance: Script = new Script()

  // eslint-disable-next-line
  private constructor() {
    const configPath = path.join("script.config.json")
    let config: TConstructor = {}
    if (fs.existsSync(configPath)) {
      try {
        const configFile = fs.readFileSync(configPath, { encoding: "utf8" })
        config = JSON.parse(configFile)
      } catch (error) {
        console.error("Error reading config file:", error)
      }
    }
    this.root = config.root || ".github/.logs"
    this.logOrder = config.logOrder || ["id", "elapsed", "stack", "func"]
    this.saveOrder = config.saveOrder || ["id", "created", "elapsed", "stack", "func"]
  }

  // NOTE: Static instance to allow for nuanced log creation
  public static get getInstance(): Script {
    // eslint-disable-next-line
    return this.instance || (this.instance = new this())
  }

  // NOTE: Allow for stackName and folder to be set ahead of time for stacking
  public async start(config: TConfigInput): Promise<TConfigOutput> {
    return {
      id: config?.id ?? this.id,
      root: config?.root ?? this.root,
      file: config?.file ?? this.file,
      func: config?.func ?? this.func,
      stack: (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString(),
      stackTime: Date.now(),
      silence: config?.silence ?? this.silence,
      folder: config?.folder ?? this.folder,
      logText: config?.logText ?? this.logText,
      logOrder: config?.logOrder ?? this.logOrder,
      saveOrder: config?.saveOrder ?? this.saveOrder,
      logType: config?.logType ?? this.logType
    }
  }

  public config(config: TConfigInput): this {
    // Iterate over all keys in the config object
    Object.entries(config).forEach(([key, value]) => {
      if (value !== undefined && key in this) {
        // @ts-expect-error
        this[key] = value
      }
    })

    // Reset unspecified properties to their defaults
    Object.keys(this).forEach((key) => {
      if (!(key in config)) {
        // @ts-expect-error
        this[key] = Script.defaults[key]
      }
    })

    return this
  }

  // NOTE: Get the time difference between "stackTime" and the time the log is called
  private getElapsedTime(): string {
    const now = Date.now()
    const start = this.stackTime || Date.now()
    return ((now - start) / 1000).toFixed(4).padStart(9, "0")
  }

  // NOTE: Function to set id
  public sid(idNumber: number | string) {
    if (idNumber) {
      const idStr = idNumber.toString()
      // Pad the ID number with zeros to ensure a total length of 10 characters
      this.id = idStr.padStart(10, "x")
    }
    return this
  }

  public default(text: string) {
    this.logType = "default"
    this.logText = text
    return this
  }

  public success(text: string) {
    this.logType = "success"
    this.logText = text
    return this
  }

  public warning(text: string) {
    this.logType = "warning"
    this.logText = text
    return this
  }

  public mistake(text: string) {
    this.logType = "mistake"
    this.logText = text
    return this
  }

  public insight(text: string) {
    this.logType = "insight"
    this.logText = text
    return this
  }

  private getColor = (color: TLogType, text: string) => {
    switch (color) {
      case "success":
        return chalk.green(text)
      case "warning":
        return chalk.hex("#FFA500")(text)
      case "mistake":
        return chalk.red(text)
      case "insight":
        return chalk.blue(text)
      case "default":
        return text
      default:
        return text
    }
  }

  public async log({ mute = false }: { mute?: boolean } = {}) {
    if (mute) return this
    if (this.silence) return this

    let consoleMessage: string = ""
    const elapsed: string = this.getElapsedTime()

    const formatMap = {
      id: () => `ID: ${chalk.yellow(`[${this.id}]`)} -> `,
      elapsed: () => `Elapsed: ${chalk.yellow(`[${elapsed}]`)} -> `,
      func: () => `Fn: ${chalk.yellow(`[${this.func}]`)} -> `,
      stack: () => (this.stack ? `Stack: ${chalk.yellow(`[${this.stack}]`)} -> ` : ""),
      type: () => (this.logType ? `Type: ${this.getColor(this.logType, `[${this.logType.toUpperCase()}]`)} -> ` : "")
    }

    this.logOrder.forEach((key) => {
      consoleMessage += formatMap[key]?.() || ""
    })

    if (this.logText) {
      consoleMessage += this.getColor(this.logType, this.logText)
    }

    console.log(consoleMessage)
    return this
  }

  public async save(folder?: string | null, fileName?: string | null): Promise<TSaveOutput> {
    const dateFolder = new Date().toISOString().split("T")[0]
    const logFolder = this.folder || folder
    const directoryPath: string = logFolder
      ? path.join(this.root, dateFolder, logFolder)
      : path.join(this.root, dateFolder)

    // eslint-disable-next-line no-nested-ternary
    const getFileName = () => {
      if (fileName) {
        return fileName.endsWith(".json") ? fileName : `${fileName}.json`
      }
      if (this.file) {
        return this.file.endsWith(".json") ? this.file : `${this.file}.json`
      }
      return "catch.json"
    }

    fs.mkdirSync(directoryPath, { recursive: true })
    const filePath = path.join(directoryPath, getFileName())

    // NOTE: Handle edge case of a blank JSON file
    let existingData = []
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }))
    }

    const logData: TSaveOutput = <TSaveOutput>{}
    const valueMap = {
      id: this.id,
      created: new Date().toISOString(),
      elapsed: this.getElapsedTime(),
      func: this.func,
      stack: this.stack,
      type: this.logType
    }

    this.saveOrder.forEach((key) => {
      // @ts-expect-error
      logData[key] = valueMap[key]
    })

    // These are always at the end and cannot be moved.
    logData.logType = this.logType

    // Assuming `this.logText` is in the format '[SOMETHING] text'
    if (this.logText) {
      logData.logText = this.logText.includes("]")
        ? this.logText.split("]")[1].trim() // Get the text after ']' and trim any leading/trailing spaces
        : this.logText // If no ']' is found, use the whole string
    }

    existingData.unshift(logData) // Insert at the beginning
    const jsonData = `[\n  ${existingData.map((item: string) => JSON.stringify(item)).join(",\n  ")}\n]`
    fs.writeFileSync(filePath, jsonData) // Write with custom formatting

    return logData
  }

  public async record(): Promise<TSaveOutput> {
    await this.log()
    return this.save()
  }
}

// Application Component || Define Exports
// =================================================================================================
// =================================================================================================
export const script = Script.getInstance
export const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})
