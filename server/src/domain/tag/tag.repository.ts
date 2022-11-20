import { CustomRepository } from '../../typeorm/typeorm-ex.decorator';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';

@CustomRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findById(id: number) {
    return this.findOneOrFail({ where: { id: id } });
  }
}
