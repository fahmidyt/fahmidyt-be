import wording from '../wording'

describe('Utils: Wording', () => {
  // wording required
  it("should wording 'required' properly", () => {
    const word: string = wording.required("property")

    expect(word).toMatch('property is required')
  })

  // wording minLength
  it("should wording 'minLength' properly", () => {
    const word: string = wording.minLength("property", 12)

    expect(word).toMatch('property min length is 12')
  })

  // wording maxLength
  it("should wording 'maxLength' properly", () => {
    const word: string = wording.maxLength("property", 24)

    expect(word).toMatch('property max length is 24')
  })
 })