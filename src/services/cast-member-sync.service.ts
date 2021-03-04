import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CastmemberRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';
import {BaseModelSyncService} from './base-model-sync.service';

@injectable({scope: BindingScope.SINGLETON})
export class CastMemberSyncService extends BaseModelSyncService {
  constructor(@repository(CastmemberRepository) private repo: CastmemberRepository) {
    super()
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'catalog-service/sync-videos/castmember',
    routingKey: 'model.castmember.*'
  })

  async handler({data, message}: {data: any, message: Message}) {
    await this.sync({repo: this.repo, data, message})
  }
}
