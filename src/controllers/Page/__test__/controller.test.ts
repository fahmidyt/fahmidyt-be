import request from 'supertest'
import * as Service from '@controllers/Page/service'
import app from '../../../app'

const App = new app()

// mock area
jest.mock('@controllers/Page/service', () => {
  return jest.fn().mockImplementation(() => ({
    getAll: jest.fn().mockResolvedValueOnce([]),
    getOne: jest.fn().mockResolvedValueOnce({
      id: 'cb5b25d-09d9-45a7-9df8-e9546237f8cb',
      pageName: 'Page Name',
      detail: 'this gonna be a long text in it',
    }),
    create: jest.fn().mockImplementation(async (data) => await data),
    update: jest.fn().mockImplementation(async (id, data) => {
      return await {
        id,
        ...data,
      }
    }),
    delete: jest.fn(),
  }))
})
const ServiceMock = <jest.Mock>Service.default

// before each
beforeEach(() => {
  ServiceMock.mockClear()
})

describe('[Controller] Page', () => {
  it('[GET] /page', async () => {
    const res = await request(App.application).get('/page')
    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: expect.any(Array),
      })
    )
    expect(res.statusCode).toBe(200)
  })

  it('[GET] /page/:id', async () => {
    const id = 'cb5b25d-09d9-45a7-9df8-e9546237f8cb'
    const res = await request(App.application).get(`/page/${id}`)

    // lets expect something here
    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: {
          id: expect.stringMatching(id),
          pageName: expect.stringMatching('Page Name'),
          detail: expect.stringMatching('this gonna be a long text in it'),
        },
      })
    )
    expect(res.statusCode).toBe(200)
  })

  it('[POST] /page', async () => {
    const data = {
      id: 'cb5b25d-09d9-45a7-9df8-e9546237f8cb',
      pageName: 'Page Name',
      detail: 'this gonna be a long text in it',
    }

    const res = await request(App.application).post('/page').send(data)

    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: {
          id: expect.stringMatching(data.id),
          pageName: expect.stringMatching(data.pageName),
          detail: expect.stringMatching(data.detail),
        },
      })
    )
    expect(res.statusCode).toBe(201)
  })

  it('[PUT] /page/:id', async () => {
    const id = 'cb5b25d-09d9-45a7-9df8-e9546237f8cb'
    const data = {
      pageName: 'Page Name',
      detail: 'this gonna be a long text in it',
    }
    const res = await request(App.application).put(`/page/${id}`).send(data)

    // lets expect something here
    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: {
          id: expect.stringMatching(id),
          pageName: expect.stringMatching(data.pageName),
          detail: expect.stringMatching(data.detail),
        },
      })
    )
    expect(res.statusCode).toBe(200)
  })

  it('[DELETE] /page/:id', async () => {
    const id = 'cb5b25d-09d9-45a7-9df8-e9546237f8cb'
    const res = await request(App.application).delete(`/page/${id}`)

    // lets expect something here
    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
      })
    )
    expect(res.statusCode).toBe(200)
  })
})
