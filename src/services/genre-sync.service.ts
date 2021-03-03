import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {GenreRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';

@injectable({scope: BindingScope.TRANSIENT})
export class GenreSyncService {
  constructor(@repository(GenreRepository) private genreRepo: GenreRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'catalog-service/sync-videos/genre',
    routingKey: 'model.genre.*'
  })

  async handler({data, message}: {data: any, message: Message}) {
    const action = message.fields.routingKey.split('.')[2];

    switch (action) {
      case 'created':
        await this.genreRepo.create(data);
        break;
      case 'updated':
        await this.genreRepo.updateById(data.id, data);
        break;
      case 'deleted':
        await this.genreRepo.deleteById(data.id);
        break;
    }
  }
}
