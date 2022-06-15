import Express, { Request, Response } from 'express'
import { BASE_URL_SERVER } from '@constants/ConstBaseURL'
import { NODE_ENV } from '@utils/env'

const route = Express.Router()

interface IndexResponseData {
  message: string
  maintainer: string
  source: string
  docs?: string
}

// index route
route.get('/', function (req: Request, res: Response) {
  let data: IndexResponseData = {
    message: 'Welcome to Fahmidyt Backend API Service!',
    maintainer: 'fahmidyt, <fmidyt@gmail.com> <https://github.com/fahmidyt>',
    source: 'https://github.com/fahmidyt/fahmidyt-be/',
  }

  if (NODE_ENV !== 'production') {
    data = {
      ...data,
      docs: `${BASE_URL_SERVER}/v1/api-docs`,
    }
  }

  return res.status(200).json(data)
})

require('@controllers/Lifestory/controller')
require('@controllers/Portofolio/controller')

export default route
