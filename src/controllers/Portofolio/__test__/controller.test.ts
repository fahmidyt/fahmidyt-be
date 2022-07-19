import request from 'supertest'
import * as Service from '@controllers/Portofolio/service'
import app from '../../../app'

const App = new app()

// mock area
jest.mock('@controllers/Portofolio/service', () => {
  return jest.fn().mockImplementation(() => ({
    getAll: jest.fn().mockResolvedValueOnce([]),
    getOne: jest.fn().mockResolvedValueOnce({
      id: 'cb5b25d-09d9-45a7-9df8-e9546237f8cb',
      name: 'Portofolio Name',
      image: 'path/to/image.jpg',
      description: 'this gonna be a long text in it',
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

describe('[Controller] Portofolio', () => {
  it('[GET] /portofolio', async () => {
    const res = await request(App.application).get('/portofolio')
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

  it('[GET] /portofolio/:id', async () => {
    const id = 'cb5b25d-09d9-45a7-9df8-e9546237f8cb'
    const res = await request(App.application).get(`/portofolio/${id}`)

    // lets expect something here
    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: {
          id: expect.stringMatching(id),
          name: expect.stringMatching('Portofolio Name'),
          image: expect.stringMatching('path/to/image.jpg'),
          description: expect.stringMatching('this gonna be a long text in it'),
        },
      })
    )
    expect(res.statusCode).toBe(200)
  })

  it('[POST] /portofolio', async () => {
    const data = {
      id: 'cb5b25d-09d9-45a7-9df8-e9546237f8cb',
      name: 'Portofolio Name',
      image: 'path/to/image.jpg',
      description: 'this gonna be a long text in it',
    }

    const res = await request(App.application).post('/portofolio').send(data)

    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: {
          id: expect.stringMatching(data.id),
          name: expect.stringMatching(data.name),
          image: expect.stringMatching(data.image),
          description: expect.stringMatching(data.description),
        },
      })
    )
    expect(res.statusCode).toBe(201)
  })

  it('[PUT] /portofolio/:id', async () => {
    const id = 'cb5b25d-09d9-45a7-9df8-e9546237f8cb'
    const data = {
      name: 'Portofolio Name',
      image: 'path/to/image.jpg',
      description: 'this gonna be a long text in it',
    }
    const res = await request(App.application).put(`/portofolio/${id}`).send(data)

    // lets expect something here
    expect(res.type).toEqual('application/json')
    expect(res.body).toStrictEqual(
      expect.objectContaining({
        code: expect.any(Number),
        message: expect.any(String),
        data: {
          id: expect.stringMatching(id),
          name: expect.stringMatching(data.name),
          image: expect.stringMatching(data.image),
          description: expect.stringMatching(data.description),
        },
      })
    )
    expect(res.statusCode).toBe(200)
  })

  it('[DELETE] /portofolio/:id', async () => {
    const id = 'cb5b25d-09d9-45a7-9df8-e9546237f8cb'
    const res = await request(App.application).delete(`/portofolio/${id}`)

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
