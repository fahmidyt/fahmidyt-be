import { NOT_FOUND } from '@constants/ConstStatusCode'
import BaseError from './BaseError'

class NotFound extends BaseError {
  constructor(message: string) {
    super(message, NOT_FOUND)
    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

export default NotFound
