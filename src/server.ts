import './moduleAlias'
import App from './app'
import InitDatabase from '@config/database'

const Server = new App()

InitDatabase()
  .then(() => console.log('Connected to Database'))
  .catch((err: any) => {
    console.error(err)
  })

Server.run()
