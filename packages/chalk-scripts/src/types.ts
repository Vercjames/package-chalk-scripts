export type TSequence = ("id" | "createdAt" | "timeElapsed" | "name" | "trace" | "type")[];

export enum ELogStyle {
  VALUES = "values",
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
