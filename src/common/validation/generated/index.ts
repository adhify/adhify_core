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

export const ResourceScalarFieldEnumSchema = z.enum(['id','projectId','envId','type','resource_status','userSub']);

export const AppScalarFieldEnumSchema = z.enum(['id','uuid','name','description','git_repository','github_branch','build_pack','resouceId','createdAt','updatedAt','userSub']);

export const DatabaseScalarFieldEnumSchema = z.enum(['id','uuid','name','description','resouceId','createdAt','updatedAt','userSub','databaseType','databaseName','databaseUserName','databasePassword']);

export const DeploymentScalarFieldEnumSchema = z.enum(['id','uuid','appId','message','createdAt','updatedAt','userSub']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserStatusSchema = z.enum(['ACTIVE','INACTIVE','SUSPENDED','PENDING_VERIFICATION']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const ResourceTypeSchema = z.enum(['APP','DATABASE']);

export type ResourceTypeType = `${z.infer<typeof ResourceTypeSchema>}`

export const BuildPackSchema = z.enum(['nixpacks','static']);

export type BuildPackType = `${z.infer<typeof BuildPackSchema>}`

export const ResourceStatusSchema = z.enum(['running','stopped','error','deploying']);

export type ResourceStatusType = `${z.infer<typeof ResourceStatusSchema>}`

export const DatabaseTypeSchema = z.enum(['postgres','mysql','mongodb']);

export type DatabaseTypeType = `${z.infer<typeof DatabaseTypeSchema>}`

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
  resource: ResourceWithRelations[];
  app: AppWithRelations[];
  database: DatabaseWithRelations[];
  Deployment: DeploymentWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  project: z.lazy(() => ProjectWithRelationsSchema).array(),
  resource: z.lazy(() => ResourceWithRelationsSchema).array(),
  app: z.lazy(() => AppWithRelationsSchema).array(),
  database: z.lazy(() => DatabaseWithRelationsSchema).array(),
  Deployment: z.lazy(() => DeploymentWithRelationsSchema).array(),
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
  resources: ResourceWithRelations[];
};

export type ProjectWithRelations = z.infer<typeof ProjectSchema> & ProjectRelations

export const ProjectWithRelationsSchema: z.ZodType<ProjectWithRelations> = ProjectSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  resources: z.lazy(() => ResourceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// RESOURCE SCHEMA
/////////////////////////////////////////

export const ResourceSchema = z.object({
  type: ResourceTypeSchema,
  resource_status: ResourceStatusSchema,
  id: z.string(),
  projectId: z.string(),
  envId: z.string(),
  userSub: z.string(),
})

export type Resource = z.infer<typeof ResourceSchema>

// RESOURCE RELATION SCHEMA
//------------------------------------------------------

export type ResourceRelations = {
  project: ProjectWithRelations;
  app?: AppWithRelations | null;
  database?: DatabaseWithRelations | null;
  user: UserWithRelations;
};

export type ResourceWithRelations = z.infer<typeof ResourceSchema> & ResourceRelations

export const ResourceWithRelationsSchema: z.ZodType<ResourceWithRelations> = ResourceSchema.merge(z.object({
  project: z.lazy(() => ProjectWithRelationsSchema),
  app: z.lazy(() => AppWithRelationsSchema).nullish(),
  database: z.lazy(() => DatabaseWithRelationsSchema).nullish(),
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// APP SCHEMA
/////////////////////////////////////////

export const AppSchema = z.object({
  build_pack: BuildPackSchema,
  id: z.string(),
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  git_repository: z.string(),
  github_branch: z.string(),
  resouceId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userSub: z.string(),
})

export type App = z.infer<typeof AppSchema>

// APP RELATION SCHEMA
//------------------------------------------------------

export type AppRelations = {
  resource: ResourceWithRelations;
  user: UserWithRelations;
  deployment: DeploymentWithRelations[];
};

export type AppWithRelations = z.infer<typeof AppSchema> & AppRelations

export const AppWithRelationsSchema: z.ZodType<AppWithRelations> = AppSchema.merge(z.object({
  resource: z.lazy(() => ResourceWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
  deployment: z.lazy(() => DeploymentWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DATABASE SCHEMA
/////////////////////////////////////////

export const DatabaseSchema = z.object({
  databaseType: DatabaseTypeSchema,
  id: z.string(),
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  resouceId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userSub: z.string(),
  databaseName: z.string(),
  databaseUserName: z.string(),
  databasePassword: z.string(),
})

export type Database = z.infer<typeof DatabaseSchema>

// DATABASE RELATION SCHEMA
//------------------------------------------------------

export type DatabaseRelations = {
  resource: ResourceWithRelations;
  user: UserWithRelations;
};

export type DatabaseWithRelations = z.infer<typeof DatabaseSchema> & DatabaseRelations

export const DatabaseWithRelationsSchema: z.ZodType<DatabaseWithRelations> = DatabaseSchema.merge(z.object({
  resource: z.lazy(() => ResourceWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// DEPLOYMENT SCHEMA
/////////////////////////////////////////

export const DeploymentSchema = z.object({
  id: z.string().cuid(),
  uuid: z.string(),
  appId: z.string(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userSub: z.string(),
})

export type Deployment = z.infer<typeof DeploymentSchema>

// DEPLOYMENT RELATION SCHEMA
//------------------------------------------------------

export type DeploymentRelations = {
  app: AppWithRelations;
  user: UserWithRelations;
};

export type DeploymentWithRelations = z.infer<typeof DeploymentSchema> & DeploymentRelations

export const DeploymentWithRelationsSchema: z.ZodType<DeploymentWithRelations> = DeploymentSchema.merge(z.object({
  app: z.lazy(() => AppWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
}))
