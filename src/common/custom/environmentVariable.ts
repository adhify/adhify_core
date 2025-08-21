import { EnvironmentVariablesSchema } from '../validation/generated';

export const ZEnvironmentVariable = EnvironmentVariablesSchema;

export type IEnvironmentVariable = (typeof ZEnvironmentVariable)['_output'];

export const ZEnvironmentVariables = ZEnvironmentVariable.array();

export type IEnvironmentVariables = (typeof ZEnvironmentVariables)['_output'];

export const ZEnvironmentVariablesCreateInput = EnvironmentVariablesSchema.pick({
  key: true,
  value: true,
  appId: true,
}).array();

export type IEnvironmentVariablesCreateInput = (typeof ZEnvironmentVariablesCreateInput)['_output'];
