import {DefaultCrudRepository} from '@loopback/repository';
import {CastMember, CastMemberRelations} from '../models';
import {Esv7CastMemberDatasource} from '../datasources';
import {inject} from '@loopback/core';

export class CastmemberRepository extends DefaultCrudRepository<
  CastMember,
  typeof CastMember.prototype.id,
  CastMemberRelations
> {
  constructor(
    @inject('datasources.esv7CastMember') dataSource: Esv7CastMemberDatasource,
  ) {
    super(CastMember, dataSource);
  }
}
