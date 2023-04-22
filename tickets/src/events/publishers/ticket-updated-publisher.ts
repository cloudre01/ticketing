import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
  TicketUpdatedEvent,
} from '@cloudtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
