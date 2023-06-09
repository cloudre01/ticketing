import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { natsWrapper } from '../../nats-wrapper'

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asldkf',
      price: 20,
    })
    .expect(404)
})

it('returns 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app).put(`/api/tickets/${id}`).send().expect(401)
})

it('returns 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: 'asldkf',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signin())
    .send({
      title: 'asldkf2',
      price: 1000,
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkf',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400)
})

it('updates the ticket provided valid inputs', async () => {
  const cookie = signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkf',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 1000,
    })

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

  expect(ticketResponse.body.title).toEqual('new title')
  expect(ticketResponse.body.price).toEqual(1000)
})

it('publishes an event', async () => {
  const cookie = signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkf',
      price: 20,
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 1000,
    })

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
