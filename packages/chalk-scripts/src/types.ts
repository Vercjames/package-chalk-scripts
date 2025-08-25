export type TSequence = ("id" | "createdAt" | "timeElapsed" | "name" | "trace" | "type")[];

export enum ELogStyle {
  JSON = "json",
  STRING = "string",
}

export enum ELogType {
  DEFAULT = "DEFAULT",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  FAILURE = "FAILURE",
  INSIGHT = "INSIGHT",
  TRACKER = "TRACKER",
}


// Type for output of the saved log
export type TSaveOutput = {
  id?: string
  created?: string
  elapsed?: string
  func?: string
  trace?: string;
  logType: string,
  logText: string | null
}
