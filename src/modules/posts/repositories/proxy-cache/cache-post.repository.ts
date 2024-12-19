import { Injectable } from '@nestjs/common';
import {
  CachePostRepository,
  MainPostRepository,
  PostRepository,
} from '../post.repository';
import { PostEntity } from '../../entities/post.entity';

@Injectable()
export class ProxyCachePostRepository implements PostRepository {
  constructor(
    private readonly cachePostRepository: CachePostRepository,
    private readonly mainPostRepository: MainPostRepository,
  ) {}

  async findMany(): Promise<PostEntity[]> {
    const cachedPosts = await this.cachePostRepository.findMany();

    if (!cachedPosts) {
      const posts = await this.mainPostRepository.findMany();

      const CACHE_EXPIRATION_TIME = 25;

      await this.cachePostRepository.create(
        'posts',
        JSON.stringify(posts),
        CACHE_EXPIRATION_TIME,
      );

      console.log('FROM DB');

      return posts;
    }

    console.log('FROM CACHE');

    return cachedPosts;
  }
}
