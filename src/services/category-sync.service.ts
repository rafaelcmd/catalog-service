import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {rabbitmqSubscriber} from '../decorators/rabbitmq-subscribe.decorator';
import {CategoryRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class CategorySyncService {
  constructor(@repository(CategoryRepository) private categoryRepo: CategoryRepository) {}

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'create.category',
    routingKey: 'model.category.create'
  })

  async createCategory({data}: {data: any}) {
    try {
      await this.categoryRepo.create(data);
    } catch (e) {
      console.log(e);
    }
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'change',
    routingKey: 'model.category.change'
  })

  async changeCategory({data}: {data: any}) {
    try {
      await this.categoryRepo.updateById(data.id, data);
    } catch (e) {
      console.log(e);
    }
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'delete',
    routingKey: 'model.category.delete'
  })

  async deleteCategory({data}: {data: any}) {
    try {
      await this.categoryRepo.deleteById(data.id);
    } catch (e) {
      console.log(e);
    }
  }

}
