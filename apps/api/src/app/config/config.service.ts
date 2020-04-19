import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  API_AUTH_ENABLED: boolean;
  BCRYPT_SALT_ROUNDS: number;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_SCHEMA: string;
  DB_USERNAME: string;
  JWT_SECRET: string;
  JWT_TIMEOUT?: number; // in ms
  MONGO_INITDB_ROOT_PASSWORD?: string;
  MONGO_INITDB_ROOT_USERNAME?: string;
  NODE_ENV?: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config: EnvConfig = (dotenv.parse(
      fs.readFileSync(filePath)
    ) as unknown) as EnvConfig;
    this.envConfig = this.validateConfig(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated object
   * including the applied default values if no overrides were provided
   */
  private validateConfig(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      API_AUTH_ENABLED: Joi.boolean().required(),
      BCRYPT_SALT_ROUNDS: Joi.number()
        .required()
        .default(10),
      DB_SCHEMA: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      JWT_TIMEOUT: Joi.number().default('3600'),
      JWT_SECRET: Joi.string().required(),
      MONGO_INITDB_ROOT_USERNAME: Joi.string().optional(),
      MONGO_INITDB_ROOT_PASSWORD: Joi.string().optional(),
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development')
    });

    const {error, value: validatedEnvConfig} = envVarsSchema.validate(
      envConfig
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: keyof EnvConfig): any {
    return this.envConfig[key];
  }

  get dbUri(): string {
    const {
      DB_SCHEMA,
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USERNAME,
      DB_PASSWORD
    } = this.envConfig;
    return `${DB_SCHEMA}${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}
