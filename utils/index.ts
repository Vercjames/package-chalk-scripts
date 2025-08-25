// Application || Define Exports
// =======================================================================================
// =======================================================================================
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const formatArgs = (args: any[]): string => {
  return args.map(arg => {
    if (typeof arg === "string") {
      return arg
    }
    if (typeof arg === "object" && arg !== null) {
      return JSON.stringify(arg)
    }
    return String(arg)
  }).join(" ")
}
