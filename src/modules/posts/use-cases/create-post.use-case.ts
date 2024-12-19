import { Injectable } from '@nestjs/common';
import { MainPostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly postRepository: MainPostRepository) {}

  execute(data: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.create(data);
  }
}
