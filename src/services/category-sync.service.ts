import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CategoryRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class CategorySyncService {
  constructor(@repository(CategoryRepository) private categoryRepo: CategoryRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x',
    routingKey: 'model.category.*'
  })

  handler({data}: {data: any}) {
    console.log(data);
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x1',
    routingKey: 'model.category1.*'
  })

  handler1({data}: {data: any}) {
    console.log(data);
  }
}
