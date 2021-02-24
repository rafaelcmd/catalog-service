import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {categoryConfig} from './configs/category.config';
import {genreConfig} from './configs/genre.config';
import {castMemberConfig} from './configs/cast-member.config';


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html

@lifeCycleObserver('datasource')
export class Esv7CategoryDatasource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7Category';
  static readonly categoryConfig = categoryConfig;
  static readonly genreConfig = genreConfig;

  constructor() {
    super(categoryConfig);
  }
}

@lifeCycleObserver('datasource')
export class Esv7GenreDatasource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7Genre';
  static readonly genreConfig = genreConfig;

  constructor() {
    super(genreConfig);
  }
}

@lifeCycleObserver('datasource')
export class Esv7CastMemberDatasource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7CastMember';
  static readonly castMemberConfig = castMemberConfig;

  constructor() {
    super(castMemberConfig);
  }
}
