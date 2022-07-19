import request from 'supertest'
import app from '../../app'

const App = new app()

describe('[Routes] Public', () => {
  it('[GET] /', (done: jest.DoneCallback) => {
    request(App.application)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
