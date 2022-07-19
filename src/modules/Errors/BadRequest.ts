import { BAD_REQUEST } from '@constants/ConstStatusCode'
import BaseError from './BaseError'

class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, BAD_REQUEST)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
}

export default BadRequest
