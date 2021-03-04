import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {GenreRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';
import {BaseModelSyncService} from './base-model-sync.service';

@injectable({scope: BindingScope.SINGLETON})
export class GenreSyncService extends BaseModelSyncService {
  constructor(@repository(GenreRepository) private repo: GenreRepository) {
    super()
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'catalog-service/sync-videos/genre',
    routingKey: 'model.genre.*'
  })

  async handler({data, message}: {data: any, message: Message}) {
    await this.sync({repo: this.repo, data, message})
  }
}
