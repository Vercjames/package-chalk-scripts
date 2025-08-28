import { TScriptInputs, TScriptOutputs } from "./scriptIO"

// Application Structure || Define Exports
// =======================================================================================
// =======================================================================================
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

export interface IScript {
  log(...args: any[]): Promise<TScriptOutputs>
  warn(...args: any[]): Promise<TScriptOutputs>
  error(...args: any[]): Promise<TScriptOutputs>
  values(...args: any[]): Promise<TScriptOutputs>
  extract(...args: any[]): Promise<TScriptOutputs>
  set(updates: Partial<TScriptInputs>): Promise<IScript>
  default(...args: any[]): Promise<TScriptOutputs>
  success(...args: any[]): Promise<TScriptOutputs>
  warning(...args: any[]): Promise<TScriptOutputs>
  failure(...args: any[]): Promise<TScriptOutputs>
  insight(...args: any[]): Promise<TScriptOutputs>
  tracker(...args: any[]): Promise<TScriptOutputs>
}

