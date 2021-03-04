import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CastmemberRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';

@injectable({scope: BindingScope.SINGLETON})
export class CastMemberSyncService {
  constructor(@repository(CastmemberRepository) private castMemberRepo: CastmemberRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'catalog-service/sync-videos/castmember',
    routingKey: 'model.castmember.*'
  })

  async handler({data, message}: {data: any, message: Message}) {
    const action = message.fields.routingKey.split('.')[2];

    switch (action) {
      case 'created':
        await this.castMemberRepo.create(data);
        break;
      case 'updated':
        await this.castMemberRepo.updateById(data.id, data);
        break;
      case 'deleted':
        await this.castMemberRepo.deleteById(data.id);
        break;
    }
  }
}
