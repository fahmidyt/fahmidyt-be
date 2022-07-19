import { INTERNAL_SERVER_ERROR } from '@constants/ConstStatusCode'

class BaseError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = INTERNAL_SERVER_ERROR) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    Object.setPrototypeOf(this, BaseError.prototype)
  }
}

export default BaseError
