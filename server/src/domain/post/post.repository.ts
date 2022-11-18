import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CustomRepository } from '../../typeorm/typeorm-ex.decorator';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {}
