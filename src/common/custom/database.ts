import z from 'zod';
import { DatabaseSchema } from '../validation/generated';

export const ZDatabase = DatabaseSchema;

export type IDatabase = (typeof ZDatabase)['_output'];

export const ZDatabases = ZDatabase.array();

export type IDatabases = (typeof ZDatabases)['_output'];

export const ZDatabaseCreateInput = DatabaseSchema.pick({
  name: true,
  description: true,
  databaseType: true,
  databaseName: true,
  databaseUserName: true,
  databasePassword: true,
}).extend({
  project_id: z.string(),
});

export type IDatabaseCreateInput = (typeof ZDatabaseCreateInput)['_output'];
