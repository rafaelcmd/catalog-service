import {Entity, model, property} from '@loopback/repository';

@model()
export class Genre extends Entity {

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
    type: 'boolean',
    required: true,
  })
  isActive = true;

  @property({
    type: 'date',
    required: false,
  })
  deletedAt: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;


  constructor(data?: Partial<Genre>) {
    super(data);
  }
}

export interface GenreRelations {
  // describe navigational properties here
}

export type GenreWithRelations = Genre & GenreRelations;
