import {
  APP_PORT,
  NODE_ENV,
  URL_CLIENT_PRODUCTION,
  URL_CLIENT_STAGING,
  URL_SERVER_PRODUCTION,
  URL_SERVER_STAGING,
} from "../utils/env";

const URL_CLIENT = {
  development: "http://localhost:5000",
  staging: URL_CLIENT_STAGING,
  production: URL_CLIENT_PRODUCTION,
};

const URL_SERVER = {
  development: `http://localhost:${APP_PORT ?? 8000}`,
  staging: URL_SERVER_STAGING,
  production: URL_SERVER_PRODUCTION,
};

const BASE_URL_CLIENT: string = URL_CLIENT[NODE_ENV]
const BASE_URL_SERVER: string = URL_SERVER[NODE_ENV]

export { BASE_URL_CLIENT, BASE_URL_SERVER }
