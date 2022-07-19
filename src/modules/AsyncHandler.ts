/* eslint-disable @typescript-eslint/no-invalid-void-type  */
/* eslint-disable @typescript-eslint/promise-function-async  */
import express from 'express'
import core from 'express-serve-static-core'

type TArgs<P, ResBody, ReqBody, ReqQuery> = Parameters<
  express.RequestHandler<P, ResBody, ReqBody, ReqQuery>
>

const asyncHandler = <
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
>(
  fn: (
    ...args: TArgs<P, ResBody, ReqBody, ReqQuery>
  ) => void | Promise<void> | core.Response | Promise<core.Response>
): express.RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  function asyncUtilWrap(...args: TArgs<P, ResBody, ReqBody, ReqQuery>) {
    const fnReturn = fn(...args)
    const next = args[args.length - 1]
    return Promise.resolve(fnReturn).catch(next as core.NextFunction)
  }

export default asyncHandler
