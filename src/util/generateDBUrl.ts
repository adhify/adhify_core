import { IResource } from '@/common/custom/project';
import { decryptPassword } from './encryptPassword';

export function generateDBUrl(resource: IResource) {
  if (!resource.database) {
    throw new Error('Resource does not have a database configuration');
  }
  const { databaseType, databaseName, databaseUserName, databasePassword } = resource.database;

  // Assume a decrypt function is available
  const dbPassword = decryptPassword(databasePassword);

  switch (databaseType) {
    case 'postgres':
      return `postgresql://${databaseUserName}:${dbPassword}@${resource.database.uuid}:5432/${databaseName}`;
    case 'mysql':
      return `mysql://${databaseUserName}:${dbPassword}@${resource.database.uuid}:3306/${databaseName}`;
    case 'mongodb':
      return `mongodb://${databaseUserName}:${dbPassword}@${resource.database.uuid}:27017/${databaseName}/?directConnection=true`;
    default:
      throw new Error(`Unsupported database type: ${databaseType}`);
  }
}
