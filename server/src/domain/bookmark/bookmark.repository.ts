import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, MoreThan, Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarkRepository extends Repository<Bookmark> {
  constructor(private dataSource: DataSource) {
    super(Bookmark, dataSource.createEntityManager());
  }

  async findAllByUserId(userId: number, lastId: number, size: number) {
    const bookmarks = await this.find({
      relations: [
        'user',
        'post',
        'post.images',
        'post.postToTags',
        'post.postToTags.tag',
      ],
      where: {
        id: lastId === -1 ? MoreThan(lastId) : LessThan(lastId),
        user: {
          id: userId,
        },
      },
      take: size + 1,
      order: {
        id: 'DESC',
      },
    });

    return bookmarks;
  }
}
