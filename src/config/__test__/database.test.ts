import mongoose, { Mongoose, ConnectOptions } from 'mongoose'
import { MongoError } from 'mongodb'
import connectDB, { DBCallback } from '../database'
import {
  MONGODB_AUTH,
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASSWORD,
  MONGODB_PORT,
  MONGODB_USERNAME,
} from '@utils/env'

jest.mock('mongoose')

describe('[CONFIG] Connect to Database', () => {
  const URI: string = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`
  const OPT: mongoose.ConnectOptions = {
    user: MONGODB_USERNAME,
    pass: MONGODB_PASSWORD,
    authSource: MONGODB_AUTH,
  }

  it('should connect database successfully', (done) => {
    const consoleSpy = jest.spyOn(console, 'log')
    const mongoConnectSpy = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      .mockImplementation(
        (
          uris: string,
          opt?: ConnectOptions,
          cb?: (err?: MongoError) => void
        ) => {
          if (cb) {
            cb()
            done()
          }

          return Promise.resolve(mongoose)
        }
      )

    connectDB()

    expect(mongoConnectSpy).toBeCalledWith(URI, OPT, DBCallback)
    expect(consoleSpy).toBeCalledWith(
      `Successfully connected to database: ${MONGODB_DATABASE}`
    )
    consoleSpy.mockRestore()
  })
})
