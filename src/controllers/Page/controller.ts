import { Request, Response } from 'express'
import route from '@routes/public'
import PageService from '@controllers/Page/service'
import HttpResponse from '@modules/Response/BaseResponse'
import AsyncHandler from '@modules/AsyncHandler'

const Service = new PageService()

route.get(
  '/page',
  AsyncHandler(async function getAll(
    req: Request,
    res: Response
  ): Promise<Response> {
    const data = await Service.getAll()
    const httpRes = HttpResponse.get({ data })

    return res.status(200).json(httpRes)
  })
)
