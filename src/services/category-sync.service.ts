import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CategoryRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';
import {BaseModelSyncService} from './base-model-sync.service';

@injectable({scope: BindingScope.SINGLETON})
export class CategorySyncService extends BaseModelSyncService {
  constructor(@repository(CategoryRepository) private repo: CategoryRepository) {
    super()
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'catalog-service/sync-videos/category',
    routingKey: 'model.category.*'
  })

  async handler({data, message}: {data: any, message: Message}) {
    await this.sync({repo: this.repo, data, message})
  }
}