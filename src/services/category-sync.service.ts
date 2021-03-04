import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CategoryRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';

@injectable({scope: BindingScope.SINGLETON})
export class CategorySyncService {
  constructor(@repository(CategoryRepository) private categoryRepo: CategoryRepository) {
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'catalog-service/sync-videos/category',
    routingKey: 'model.category.*'
  })

  async handler({data, message}: {data: any, message: Message}) {
    const action = message.fields.routingKey.split('.')[2];

    switch (action) {
      case 'created':
        await this.categoryRepo.create(data);
        break;
      case 'updated':
        await this.categoryRepo.updateById(data.id, data);
        break;
      case 'deleted':
        await this.categoryRepo.deleteById(data.id);
        break;
    }
  }
}