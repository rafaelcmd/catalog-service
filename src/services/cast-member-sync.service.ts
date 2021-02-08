import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CastMemberRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class CastMemberSyncService {
  constructor(@repository(CastMemberRepository) private categoryRepo: CastMemberRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x',
    routingKey: 'model.castmember.*'
  })

  handler({data}: {data: any}) {
    console.log(data);
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x1',
    routingKey: 'model.castmember1.*'
  })

  handler1({data}: {data: any}) {
    console.log(data);
  }
}
