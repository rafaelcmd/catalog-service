import {ApplicationConfig, inject, Server} from '@loopback/core';
import {Context} from '@loopback/context';
import {Channel, connect, Connection, Replies} from 'amqplib';
import AssertQueue = Replies.AssertQueue;
import AssertExchange = Replies.AssertExchange;
import {repository} from '@loopback/repository';
import {CategoryRepository} from '../repositories';
import {Category} from '../models';
import {RabbitmqBindings} from '../keys';

export class RabbitmqServer extends Context implements Server {
  private _listening: boolean;
  conn: Connection;
  channel: Channel;

  constructor(@repository(CategoryRepository) private categoryRepo: CategoryRepository,
              @inject(RabbitmqBindings.CONFIG) private config: {uri: string}) {
    super();
  }

  async start(): Promise<void> {
    this.conn = await connect(this.config.uri);
    this._listening = true;
    await this.boot();

  }

  async boot() {
    this.channel = await this.conn.createChannel();
    const queue: AssertQueue = await this.channel.assertQueue('catalog/sync-video');
    const exchange: AssertExchange = await this.channel.assertExchange('amq.topic', 'topic');

    await this.channel.bindQueue(queue.queue, exchange.exchange, 'model.*.*');

    await this.channel.consume(queue.queue, (message) => {
      if(!message) {
        return;
      }
      const data = JSON.parse(message.content.toString());
      const [model, event] = message.fields.routingKey.split('.').slice(1);

      this
        .sync({model, event, data})
        .then(() => this.channel.ack(message))
        .catch(() => {
          this.channel.reject(message, false)
        });
    });
  }


  async sync({model, event, data}: {model: string, event: string, data: Category}) {
    if(model === 'category') {
      switch (event) {
        case 'created':
          await this.categoryRepo.create({
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
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

  async stop(): Promise<void> {
    await this.conn.close();
    this._listening = false;
    return undefined;
  }

  get listening(): boolean {
    return this._listening;
  }

}