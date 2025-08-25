import chalk from "chalk"

export interface LoggerOptions {
  timestamp?: boolean;
  prefix?: string;
}

export class ChalkScripts {
  private options: LoggerOptions

  constructor(options: LoggerOptions = {}) {
    this.options = {
      timestamp: true,
      ...options,
    }
  }

  private formatMessage(level: string, message: string, color: (text: string) => string): string {
    const parts: string[] = []

    if (this.options.timestamp) {
      parts.push(chalk.gray(`[${new Date().toISOString()}]`))
    }

    if (this.options.prefix) {
      parts.push(chalk.cyan(`[${this.options.prefix}]`))
    }

    parts.push(color(`[${level}]`))
    parts.push(message)

    return parts.join(" ")
  }

  info(message: string): void {
    console.log(this.formatMessage("INFO", message, chalk.blue))
  }

  success(message: string): void {
    console.log(this.formatMessage("SUCCESS", message, chalk.green))
  }

  warn(message: string): void {
    console.log(this.formatMessage("WARN", message, chalk.yellow))
  }

  error(message: string): void {
    console.log(this.formatMessage("ERROR", message, chalk.red))
  }

  debug(message: string): void {
    console.log(this.formatMessage("DEBUG", message, chalk.magenta))
  }
}

export const logger = new ChalkScripts()

export default ChalkScripts
