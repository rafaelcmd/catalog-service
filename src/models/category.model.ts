import {Entity, model, property} from '@loopback/repository';

@model()
export class Category extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive = true;

  @property({
    type: 'date',
    required: false
  })
  deletedAt: string;

  @property({
    type: 'date',
    required: true
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true
  })
  updatedAt: string;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
