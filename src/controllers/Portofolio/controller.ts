import { Request, Response, NextFunction } from 'express'
import route from '@routes/public'
import PortofolioService from '@controllers/Portofolio/service'
import HttpResponse from '@modules/Response/BaseResponse'
import AsyncHandler from '@modules/AsyncHandler'

const Service = new PortofolioService()

route.get(
  '/portofolio',
  AsyncHandler(async function getAll(
    req: Request,
    res: Response
  ): Promise<Response> {
    const data = await Service.getAll()
    const httpRes = HttpResponse.get({ data })

    return res.status(200).json(httpRes)
  })
)

route.get(
  '/portofolio/:id',
  AsyncHandler(async function getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const id = req.params.id
    const data = await Service.getOne(id)

    const httpRes = HttpResponse.get({ data })
    return res.status(200).json(httpRes)
  })
)

route.post(
  '/portofolio',
  AsyncHandler(async function create(
    req: Request,
    res: Response
  ): Promise<Response> {
    const body = req.body
    const data = await Service.create(body)

    const httpRes = HttpResponse.create({ data })
    return res.status(201).json(httpRes)
  })
)

route.put(
  '/portofolio/:id',
  AsyncHandler(async function update(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = req.params.id
    const body = req.body

    const data = await Service.update(id, body)

    const httpRes = HttpResponse.update({ data })
    return res.status(200).json(httpRes)
  })
)

route.delete(
  '/portofolio/:id',
  AsyncHandler(async function del(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = req.params.id
    await Service.delete(id)

    const httpRes = HttpResponse.delete()
    return res.status(200).json(httpRes)
  })
)
