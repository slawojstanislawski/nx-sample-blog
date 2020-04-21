import {DeleteWriteOpResultObject} from 'mongodb';

export interface IApiError {
  statusCode: number;
  message: string;
}

export interface ISharedDataAccessModuleConfig {
  apiBasePath: '/api';
}

export type MongooseDeleteResult = DeleteWriteOpResultObject['result'] & {
  deletedCount?: number;
};
