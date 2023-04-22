import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'
import { NotFoundError } from '@cloudtickets/common'

const router = express.Router()

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const tickets = await Ticket.findById(req.params.id)

  if (!tickets) {
    throw new NotFoundError()
  }

  res.send(tickets)
})

export { router as showTicketRouter }
