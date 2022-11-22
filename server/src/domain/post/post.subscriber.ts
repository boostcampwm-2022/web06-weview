import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  ObjectLiteral,
  UpdateEvent,
} from 'typeorm';
import { Post } from './post.entity';
import { Likes } from '../likes/likes.entity';
import { Injectable } from '@nestjs/common';

function deleteLikesIfPostDeleted(event: UpdateEvent<Post>) {
  if (event.entity.isDeleted === true) {
    const likesRepository = event.manager.getRepository(Likes);
    likesRepository.delete({
      postId: event.entity.id,
    });
  }
}

@Injectable()
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Post;
  }

  afterUpdate(event: UpdateEvent<Post>) {
    deleteLikesIfPostDeleted(event);
  }
}
