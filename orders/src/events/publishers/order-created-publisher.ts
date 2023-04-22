import { OrderCreatedEvent, Publisher, Subjects } from '@cloudtickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}
