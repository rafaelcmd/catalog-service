import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {GenreRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class GenreSyncService {
  constructor(@repository(GenreRepository) private categoryRepo: GenreRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x',
    routingKey: 'model.genre.*'
  })

  handler({data}: {data: any}) {
    console.log(data);
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x1',
    routingKey: 'model.genre1.*'
  })

  handler1({data}: {data: any}) {
    console.log(data);
  }
}
