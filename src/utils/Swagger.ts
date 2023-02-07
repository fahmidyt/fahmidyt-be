import fs from 'fs'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
import { capitalize } from 'lodash'

import { BASE_URL_SERVER } from '../constants/ConstBaseURL'
import {
  APP_NAME,
  NODE_ENV,
  URL_SERVER_PRODUCTION,
  URL_SERVER_STAGING,
} from './env'

const DOCS_PATH = `${__dirname}/../../../docs/routes`

// create docs directory if not exist!
if (!fs.existsSync(DOCS_PATH)) fs.mkdirSync(DOCS_PATH, { recursive: true })

const baseRoutes = path.resolve(DOCS_PATH)

// get every docs inside
const getDocs = (basePath: string | Buffer): any => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require(`${baseRoutes}/${file}`)
    acc = {
      ...acc,
      ...data,
    }
    return acc
  }, {})
}

const docsSources = getDocs(baseRoutes)

let baseURLServer = []
let swaggerOptURL = []

switch (NODE_ENV) {
  case 'development':
    baseURLServer = [
      {
        url: `${BASE_URL_SERVER}/v1`,
        description: `${capitalize(NODE_ENV)} Server`,
      },
      {
        url: `${URL_SERVER_STAGING}/v1`,
        description: 'Staging Server',
      },
      {
        url: `${URL_SERVER_PRODUCTION}/v1`,
        description: 'Production Server',
      },
    ]

    swaggerOptURL = [
      {
        url: `${BASE_URL_SERVER}/v1/api-docs.json`,
        name: `${capitalize(NODE_ENV)} Server`,
      },
      {
        url: `${URL_SERVER_STAGING}/v1/api-docs.json`,
        name: 'Staging Server',
      },
      {
        url: `${URL_SERVER_PRODUCTION}/v1/api-docs.json`,
        name: 'Production Server',
      },
    ]
    break

  default:
    baseURLServer = [
      {
        url: `${BASE_URL_SERVER}/v1`,
        description: `${capitalize(NODE_ENV)} Server`,
      },
    ]

    swaggerOptURL = [
      {
        url: `${BASE_URL_SERVER}/v1/api-docs.json`,
        name: `${capitalize(NODE_ENV)} Server`,
      },
    ]
    break
}

export const swaggerOptions = {
  definition: {
    info: {
      title: `Api ${APP_NAME} Docs`,
      description: `This is Api Documentation - ${APP_NAME}`,
      version: '1.0.0',
    },
    openapi: '3.0.1',
    servers: baseURLServer,
    paths: docsSources,
  },
  apis: [],
}

export const swaggerDoc = swaggerJSDoc(swaggerOptions)
export const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: { urls: swaggerOptURL },
}
