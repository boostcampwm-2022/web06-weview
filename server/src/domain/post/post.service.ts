import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  loadPostList(lastId: number, size: number) {
    return [];
  }
}
