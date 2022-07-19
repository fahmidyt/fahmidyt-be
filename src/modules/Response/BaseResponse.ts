interface TBaseResponse {
  message?: string
  code?: number
}
type TDataResponse<T> = TBaseResponse & T

class HttpResponse {
  /**
   * Base Response HTTP Request
   * @param data - data of client request
   * @returns
   */
  private static baseResponse<T>(
    data: TDataResponse<T>
  ): TBaseResponse & Omit<TDataResponse<T>, 'message' | 'code'> {
    const { message = 'Request success', code = 200, ...rest } = data

    return {
      code,
      message,
      ...rest,
    }
  }

  /**
   * Response of GET HTTP Request
   * @param data - payload of client request
   * @returns
   */
  public static get<T>(
    data: TDataResponse<T>
  ): TBaseResponse & Omit<TDataResponse<T>, 'message' | 'code'> {
    const res = this.baseResponse({
      message: 'data retrieved successfully',
      ...data,
    })

    return res
  }

  public static create<T>(
    data: TDataResponse<T>
  ): TBaseResponse & Omit<TDataResponse<T>, 'message' | 'code'> {
    const res = this.baseResponse({
      code: 201,
      message: 'data successfully created',
      ...data,
    })

    return res
  }

  public static update<T>(
    data: TDataResponse<T>
  ): TBaseResponse & Omit<TDataResponse<T>, 'message' | 'code'> {
    const res = this.baseResponse({
      code: 200,
      message: 'data successfully updated',
      ...data,
    })

    return res
  }

  public static delete<T>(data?: TDataResponse<T>): TBaseResponse {
    const res = this.baseResponse({
      code: 200,
      message: 'data successfully deleted',
      ...data,
    })

    return res
  }
}

export default HttpResponse
