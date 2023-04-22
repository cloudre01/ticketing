import { PaymentCreatedEvent, Publisher, Subjects } from '@cloudtickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}
