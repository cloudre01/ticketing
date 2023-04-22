import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
  var signin: () => Promise<string[]>
}

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env['MONGO_URI']!)
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect()
})

global.signin = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie
}
