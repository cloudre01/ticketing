import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
  var signin: (id?: string) => string[]
}

jest.mock('../nats-wrapper')

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env['MONGO_URI']!)
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect()
})

global.signin = (id?: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  // Create the JWT!
  const token = jwt.sign(payload, process.env.jwt!)

  // Build session Object { jwt: MY_JWT }
  const session = { jwt: token }

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`]
}
