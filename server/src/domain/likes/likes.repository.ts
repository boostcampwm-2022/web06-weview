import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm/typeorm-ex.decorator';
import { Likes } from './likes.entity';

@CustomRepository(Likes)
export class LikesRepository extends Repository<Likes> {}
