import schema from '../schema'

const perfectlyBody = {
  name: 'Fahmi',
  description: 'This is description of portofolio',
  type: 'This is type of portofolio',
  image: '/src/any',
}

const notGoodBody = {
  name: undefined,
  description: null,
  type: null,
  image: undefined,
}

describe('[Schema] Portofolio', () => {
  it('[validate] create', () => {
    expect(schema.create.isValidSync(perfectlyBody)).toBe(true)
    expect(schema.create.validateSync(perfectlyBody)).toEqual(perfectlyBody)
  })

  it('[validate] update', () => {
    expect(schema.update.isValidSync(perfectlyBody)).toBe(true)
    expect(schema.update.validateSync(perfectlyBody)).toEqual(perfectlyBody)
  })

  it('[validate] will throw if create schema not a good one', () => {
    expect(schema.create.isValidSync(notGoodBody)).toBe(false)
  })
})
