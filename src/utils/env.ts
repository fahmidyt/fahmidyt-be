import dotenv from "dotenv";

dotenv.config();

/**
 * NODE ENV ENUM. You could add/delete enum value to meet your needed ;)
 */
enum NodeENV {
  "development" = "development",
  "staging" = "staging",
  "production" = "development",
}

/**
 * Node Environment variable
 * @default 'development'
 * @returns Should be 'development' | 'staging' | 'production'
 */
export const NODE_ENV: keyof typeof NodeENV =
  (process.env.NODE_ENV as keyof typeof NodeENV) ?? "development";

/**
 * App name variable.
 * You could configure your APP_NAME inside .env
 * @default "backend" - by default the value is 'backend'
 */
export const APP_NAME: string = process.env.APP_NAME ?? "backend";

/**
 * Server Port
 * @default 8000 - this value is default of the server will be listen
 */
export const APP_PORT: number | string = process.env.APP_PORT ?? 8000;

// URL AREA
/**
 * URL Client for staging. You probably need to change this to meet your needed
 */
export const URL_CLIENT_STAGING: string = "http://localhost:5000";
/**
 * URL Client for Production. You probably need to change this to meet your needed
 */
export const URL_CLIENT_PRODUCTION: string = "http://localhost:5000";
/**
 * URL Server for staging. You probably need to change this to meet your needed
 */
export const URL_SERVER_STAGING: string = "http://localhost:8000";
/**
 * URL Server for Production. You probably need to change this to meet your needed
 */
export const URL_SERVER_PRODUCTION: string = "http://localhost:8000";

// DATABASE ENV AREA
/**
 * Mongo DB Host
 * @default "127.0.0.1" - this default value of the host
 */
export const MONGODB_HOST: string = process.env.MONGODB_HOST ?? "127.0.0.1";

/**
 * Mongo DB Port
 * @default 27017 - this default value of port host mongo db
 */
export const MONGODB_PORT: number = Number(process.env.MONGODB_PORT) ?? 27017;

/**
 * Mongo DB Auth
 * @default 'admin' - this default value of auth
 */
export const MONGODB_AUTH: string = process.env.MONGODB_AUTH ?? "admin";

/**
 * Mongo DB Username
 * @default undefined - this default value of username
 */
export const MONGODB_USERNAME: string | undefined =
  process.env.MONGODB_USERNAME ?? undefined;

/**
 * Mongo DB Password
 * @default undefined - this default value of password
 */
export const MONGODB_PASSWORD: string | undefined =
  process.env.MONGODB_PASSWORD ?? undefined;

/**
 * Mongo DB Database name
 * @default 'db' - this default value of the database name
 */
export const MONGODB_DATABASE: string = process.env.MONGODB_DATABASE ?? "db";
