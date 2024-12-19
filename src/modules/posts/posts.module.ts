import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostUseCase } from './use-cases/create-post.use-case';
import { PrismaPostRepository } from './repositories/prisma/prisma-post.repository';
import {
  CachePostRepository,
  MainPostRepository,
  PostRepository,
} from './repositories/post.repository';
import { PostsController } from './posts.controller';
import { PrismaService } from '../prisma/prisma-service';
import { ListPostsUsecase } from './use-cases/list-posts.use-case';
import { RedisPostsRepository } from './repositories/redis/redis-post.repository';
import { ProxyCachePostRepository } from './repositories/proxy-cache/cache-post.repository';

@Module({
  imports: [PrismaClient],
  controllers: [PostsController],
  providers: [
    PrismaService,
    CreatePostUseCase,
    ListPostsUsecase,
    PrismaPostRepository,
    ProxyCachePostRepository,
    RedisPostsRepository,
    {
      provide: MainPostRepository,
      useClass: PrismaPostRepository,
    },
    {
      provide: PostRepository,
      useClass: ProxyCachePostRepository,
    },
    {
      provide: CachePostRepository,
      useClass: RedisPostsRepository,
    },
  ],
})
export class PostsModule {}
