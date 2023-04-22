import { OrderCancelledEvent, Publisher, Subjects } from '@cloudtickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
