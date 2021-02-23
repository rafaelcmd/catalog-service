import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {GenreRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class GenreSyncService {
  constructor(@repository(GenreRepository) private genreRepo: GenreRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'create.genre',
    routingKey: 'model.genre.create'
  })

  async createGenre({data}: {data: any}) {
    try {
      await this.genreRepo.create(data);
    } catch (e) {
      console.log(e);
    }
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'change',
    routingKey: 'model.genre.change'
  })

  async changeGenre({data}: {data: any}) {
    try {
      await this.genreRepo.updateById(data.id, data);
    } catch (e) {
      console.log(e);
    }
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'delete',
    routingKey: 'model.genre.delete'
  })

  async deleteGenre({data}: {data: any}) {
    try {
      await this.genreRepo.deleteById(data.id);
    } catch (e) {
      console.log(e);
    }
  }
}
