import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Post } from './post.entity';
import { Likes } from '../likes/likes.entity';
import { Injectable } from '@nestjs/common';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { Review } from '../review/review.entity';

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
    this.executeIfPostDeleted(event);
  }
  private executeIfPostDeleted(event: UpdateEvent<Post>) {
    if (event.entity.isDeleted === true) {
      this.deleteLikesIfPostDeleted(event);
      this.deletePostToTagIfPostDeleted(event);
      // Report는 삭제 안하는게 나을거같음
      this.deleteReviewIfPostDeleted(event);
    }
  }

  private deleteLikesIfPostDeleted(event: UpdateEvent<Post>) {
    const likesRepository = event.manager.getRepository(Likes);
    likesRepository.delete({
      postId: event.entity.id,
    });
  }

  private deletePostToTagIfPostDeleted(event: UpdateEvent<Post>) {
    const postToTagRepository = event.manager.getRepository(PostToTag);
    postToTagRepository.delete({
      postId: event.entity.id,
    });
  }

  private deleteReviewIfPostDeleted(event: UpdateEvent<Post>) {
    const reviewRepository = event.manager.getRepository(Review);
    reviewRepository
      .createQueryBuilder()
      .update(Review)
      .set({
        isDeleted: true,
      })
      .where('postId=:postId', { postId: event.entity.id })
      .execute();
  }
}
