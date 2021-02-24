import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CastmemberRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class CastMemberSyncService {
  constructor(@repository(CastmemberRepository) private castMemberRepo: CastmemberRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'create.castmember',
    routingKey: 'model.castmember.create'
  })

  async createCastMember({data}: {data: any}) {
    try {
      await this.castMemberRepo.create(data);
    } catch (e) {
      console.log(e);
    }
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'change.castmember',
    routingKey: 'model.castmember.change'
  })

  async changeCastMember({data}: {data: any}) {
    try {
      await this.castMemberRepo.updateById(data.id, data);
    } catch (e) {
      console.log(e);
    }
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'delete.castmember',
    routingKey: 'model.castmember.delete'
  })

  async deleteCastMember({data}: {data: any}) {
    try {
      await this.castMemberRepo.deleteById(data.id);
    } catch (e) {
      console.log(e);
    }
  }
}
