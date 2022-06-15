import Express, { Application, Request, Response } from 'express'
import http from 'http'
import Cors from 'cors'
import Helmet from 'helmet'
import Morgan from 'morgan'
import CookieParser from 'cookie-parser'
import Compression from 'compression'
import RequestIP from 'request-ip'
import UserAgent from 'express-useragent'
import hpp from 'hpp'
import path from 'path'
import swaggerUI from 'swagger-ui-express'

import publicRoutes from '@routes/public'
import allowedOrigins  from '@constants/ConstAllowedOrigins'
import { APP_NAME, APP_PORT, NODE_ENV } from '@utils/env'
import { optionsSwaggerUI, swaggerDoc } from '@utils/Swagger'

// set your cors options here!
const corsOpt: Cors.CorsOptions = {
  origin: allowedOrigins
}

// Class App start here
// TODO: EXPLAINATION TOBE UPDATE HERE!
class App {
  public readonly application: Application
  // port will be saved as private variable
  private readonly port: number | string

  // let's construct the app
  constructor(port?: number) {
    // you could configure with different value when init the "this Class"
    this.port = port || APP_PORT
    this.application = Express()
    this.plugins()

    // docs swagger will be desable for production
    if (NODE_ENV !== 'production') {
      this.docsSwagger()
    }

    this.routes()
  }

  
  // This is the place you could init your plugins here!
  // just use it and it will be ready to go
  private plugins(): void {
    this.application.use(Helmet())
    this.application.use(Cors(corsOpt))
    this.application.use(Morgan('combined'))
    this.application.use(Express.urlencoded({ extended: true }))
    this.application.use(
      Express.json({
        limit: '200mb',
        type: 'application/json'
      })
    )
    this.application.use(CookieParser())
    this.application.use(Compression())
    this.application.use(Express.static(path.resolve(`${__dirname}/../public`)))
    this.application.use(hpp())
    this.application.use(RequestIP.mw())
    this.application.use(UserAgent.express())
  }

  // This is config and init the swagger. You could see
  // details in 'src/utils/Swagger.ts' every config of the swagger is in there
  private docsSwagger(): void {
    this.application.get('/v1/api-docs.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerDoc)
    })

    this.application.use('/v1/api-docs', swaggerUI.serve)
    this.application.get(
      '/v1/api-docs',
      swaggerUI.setup(swaggerDoc, optionsSwaggerUI)
    )
  }

  private routes() {
    this.application.use(publicRoutes)

    // Catch error 404 when endpoint not found
    this.application.use('*', function (req: Request, res: Response) {
      return res.status(404).json({
        status: 404,
        message: `Sorry, HTTP resource you are looking for was not found.`
      })
    })
  }

  public run(): void {
    // error logging
    this.application.use(function (err: any, req: Request, res: Response) {
      const errStatus = err.status ?? 500
      const errMessage = err.message ?? 'UNKNOWN ERROR'

      res.locals.message = errMessage
      // only providing error in development!
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // TODO: create log
      console.error(`${errStatus} - ${errMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)

      res.status(errStatus).render('ERROR!')
      res.render('error')
    })

    this.application.set('port', this.port)
    const server = http.createServer(this.application)

    const onError = (error: { syscall: string, code: string }): void => {
      if (error.syscall !== 'listen') {
        throw error
      }

      const bind =
        typeof this.port === 'string'
          ? `Pipe ${this.port}`
          : `Port ${this.port}`

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`)
          process.exit(1)

        case 'EADDRINUSE':
          console.error(`${bind} is already in use`)
          process.exit(1)

        default:
          throw error
      }
    }

    const onListening = (): void => {
      const addr = server.address()
      const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`

      const msgType = `${APP_NAME}`
      const message = `Server listening on http://localhost:${bind} & ENV: ${NODE_ENV}`

      console.log(`[SERVER]: ${msgType} ${message}`)
    }

    server.listen(this.port)
    server.on('error', onError)
    server.on('listening', onListening)
  }
}

export default App