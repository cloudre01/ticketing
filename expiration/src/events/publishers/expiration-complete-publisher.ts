import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@cloudtickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
