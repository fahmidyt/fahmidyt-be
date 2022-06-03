import request from "supertest";
import app from "../../app";

const App = new app();

describe("Public Route", () => {
  it("responds with json", (done: jest.DoneCallback) => {
    request(App.application)
      .get("/")
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200, done)
  });
});
