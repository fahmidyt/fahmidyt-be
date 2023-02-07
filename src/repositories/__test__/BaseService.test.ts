import BaseService from '@repositories/BaseService'
import mockingoose from 'mockingoose'

// response data mock
const _id = '63e279c3abe43e45188913f1'
const _doc = [
  {
    _id,
    pageName: 'Hello World',
    detail: {
      title: 'This should be the title',
    },
  },
]
const yupMock: any = {
  validateSync: jest.fn(),
}

const schema = {
  create: yupMock,
  update: yupMock,
}

describe('[Repository] Base Service', () => {
  it('call [getAll] properly', async () => {
    const Page: any = {
      find: jest.fn().mockImplementationOnce(() => Promise.resolve(_doc)),
    }

    const baseService = new BaseService<any, any>(Page, '__Page__', schema)
    const res = await baseService.getAll()

    expect(res).toBe(_doc)
    expect(Page.find).toBeCalledTimes(1)
  })

  it('call [getOne] properly', async () => {
    const Page: any = {
      findById: jest
        .fn()
        .mockImplementationOnce((id) =>
          Promise.resolve(_doc.find((v) => v._id === id))
        ),
    }

    const baseService = new BaseService<any, any>(Page, '__Page__', schema)
    const res = await baseService.getOne(_id)

    expect(res).toBe(_doc[0])
  })

  it('call [getOne] thrown error when validate incorrect pattern id', async () => {
    const Page: any = {
      findById: jest.fn(),
    }

    const baseService = new BaseService<any, any>(Page, '__Page__', schema)
    const res = baseService.getOne(_id.slice(-4))

    await expect(res).rejects.toThrow('id must match with /^[0-9a-fA-F]{24}$/')
  })

  it('call [getOne] throw error when cannot find from database', async () => {
    const Page: any = {
      findById: jest.fn().mockImplementationOnce((id) => Promise.resolve(null)),
    }

    const baseService = new BaseService<any, any>(Page, '__Page__', schema)
    const res = baseService.getOne(_id)

    await expect(res).rejects.toThrow(`__Page__ with id: ${_id} couldn't be found.`)
  })
})
