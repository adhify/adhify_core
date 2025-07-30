import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','sub','email','name','avatar','createdAt','updatedAt','emailVerified','password','status','lastLoginAt','loginAttempts','lockedUntil']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','uuid','name','slug','description','createdAt','updatedAt','userSub']);

export const AppScalarFieldEnumSchema = z.enum(['id','uuid','projectId','envId','name','description','createdAt','updatedAt']);

export const DatabaseScalarFieldEnumSchema = z.enum(['id','uuid','projectId','envId','name','description','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserStatusSchema = z.enum(['ACTIVE','INACTIVE','SUSPENDED','PENDING_VERIFICATION']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  status: UserStatusSchema,
  id: z.string().cuid(),
  sub: z.string(),
  email: z.string(),
  name: z.string().nullish(),
  avatar: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.date().nullish(),
  password: z.string().nullish(),
  lastLoginAt: z.date().nullish(),
  loginAttempts: z.number().int(),
  lockedUntil: z.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  project: ProjectWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  project: z.lazy(() => ProjectWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string().cuid(),
  uuid: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userSub: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

// PROJECT RELATION SCHEMA
//------------------------------------------------------

export type ProjectRelations = {
  user: UserWithRelations;
  apps: AppWithRelations[];
  Database: DatabaseWithRelations[];
};

export type ProjectWithRelations = z.infer<typeof ProjectSchema> & ProjectRelations

export const ProjectWithRelationsSchema: z.ZodType<ProjectWithRelations> = ProjectSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  apps: z.lazy(() => AppWithRelationsSchema).array(),
  Database: z.lazy(() => DatabaseWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// APP SCHEMA
/////////////////////////////////////////

export const AppSchema = z.object({
  id: z.string(),
  uuid: z.string(),
  projectId: z.string(),
  envId: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type App = z.infer<typeof AppSchema>

// APP RELATION SCHEMA
//------------------------------------------------------

export type AppRelations = {
  project: ProjectWithRelations;
};

export type AppWithRelations = z.infer<typeof AppSchema> & AppRelations

export const AppWithRelationsSchema: z.ZodType<AppWithRelations> = AppSchema.merge(z.object({
  project: z.lazy(() => ProjectWithRelationsSchema),
}))

/////////////////////////////////////////
// DATABASE SCHEMA
/////////////////////////////////////////

export const DatabaseSchema = z.object({
  id: z.string(),
  uuid: z.string(),
  projectId: z.string(),
  envId: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Database = z.infer<typeof DatabaseSchema>

// DATABASE RELATION SCHEMA
//------------------------------------------------------

export type DatabaseRelations = {
  project: ProjectWithRelations;
};

export type DatabaseWithRelations = z.infer<typeof DatabaseSchema> & DatabaseRelations

export const DatabaseWithRelationsSchema: z.ZodType<DatabaseWithRelations> = DatabaseSchema.merge(z.object({
  project: z.lazy(() => ProjectWithRelationsSchema),
}))
