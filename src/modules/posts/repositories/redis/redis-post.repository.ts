import { Injectable } from '@nestjs/common';
import { CachePostRepository } from '../post.repository';
import { PostEntity } from '../../entities/post.entity';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisPostsRepository implements CachePostRepository {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async create(
    key: string,
    data: string,
    expiresInSeconds?: number,
  ): Promise<void> {
    await this.redis.set(key, data, 'EX', expiresInSeconds);
  }
  async findMany(): Promise<PostEntity[]> {
    const posts = await this.redis.get('posts');
    return JSON.parse(posts);
  }
}
