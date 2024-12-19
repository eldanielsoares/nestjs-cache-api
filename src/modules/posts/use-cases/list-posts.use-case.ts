import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class ListPostsUsecase {
  constructor(private readonly postRepository: PostRepository) {}

  execute(): Promise<PostEntity[]> {
    return this.postRepository.findMany();
  }
}
