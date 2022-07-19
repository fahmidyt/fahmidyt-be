import ResponseError from '@modules/Response/ResponseError'
import wording from '@utils/wording'
import { FilterQuery, HydratedDocument, Model } from 'mongoose'
import * as yup from 'yup'

const YUP_VALIDATE_OPTION = {
  abortEarly: false,
  stripUnknown: true,
}

const ValidateId = (id: string): string =>
  yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, wording.match('id', '/^[0-9a-fA-F]{24}$/'))
    .required(wording.required('id'))
    .validateSync(id, YUP_VALIDATE_OPTION)

interface BaseSchema<T> {
  create: yup.SchemaOf<T>
  update: yup.SchemaOf<Partial<T>>
  [key: string]: yup.SchemaOf<T> | yup.SchemaOf<Partial<T>> | yup.SchemaOf<any>
}

class BaseService<T, M> {
  __model: Model<T>
  __name: string
  __schema: BaseSchema<M>

  constructor(model: Model<T>, name: string, schema: BaseSchema<M>) {
    this.__model = model
    this.__name = name
    this.__schema = schema
  }

  /**
   * Get all of the document
   * @returns Array of Hydrated Document
   */
  async getAll(): Promise<Array<HydratedDocument<T>>> {
    const data = await this.__model.find()
    return data
  }

  /**
   * Get one document
   * @param id - model id
   * @returns Hydrated Document
   */
  async getOne(id: any): Promise<HydratedDocument<T>> {
    const validateId: string = ValidateId(id)
    const data = await this.__model.findById(validateId)

    if (!data) {
      throw new ResponseError.NotFound(
        `${this.__name} with id: ${id} couldn't be found.`
      )
    }

    return data
  }

  /**
   * Find document with the filter
   * @param filter - filter of the data
   * @returns Hydrated Document
   */
  async findOne(filter: FilterQuery<T>): Promise<HydratedDocument<T>> {
    const data = await this.__model.findOne(filter)

    if (!data) {
      throw new ResponseError.NotFound(`${this.__name} couldn't be found.`)
    }

    return data
  }

  /**
   * Get documents with more than one id
   * @param ids - model id's
   * @returns Hydrated Document
   */
  async getByIds(ids: any[]): Promise<Array<HydratedDocument<T>>> {
    const data = await this.__model.find({ _id: { $in: ids } })

    if (!data) {
      throw new ResponseError.NotFound(
        `${this.__name} with id: ${ids.join(', ')} couldn't be found.`
      )
    }

    return data
  }

  /**
   * Create Document
   * @param body Document
   * @returns HydratedDocument
   */
  async create(body: T): Promise<HydratedDocument<T>> {
    const validatedBody = this.__schema.create.validateSync(
      body,
      YUP_VALIDATE_OPTION
    )

    const data = await this.__model.create(validatedBody)

    return data
  }

  /**
   * Update Document
   * @param id - Document ID
   * @param body Document
   * @returns HydratedDocument
   */
  async update(id: string, body: Partial<T>): Promise<HydratedDocument<T>> {
    const validatedBody = this.__schema.update.validateSync(
      body,
      YUP_VALIDATE_OPTION
    )

    const data = await this.__model.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        `${this.__name} with id: ${id} couldn't be found.`
      )
    }

    await data.update(validatedBody)
    return data
  }

  async delete(id: string): Promise<void> {
    const data = await this.__model.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        `${this.__name} with id: ${id} couldn't be found.`
      )
    }

    await data.delete()
  }
}

export default BaseService
