import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreatePostUseCase } from './use-cases/create-post.use-case';
import { CreatePostDto } from './dtos/create-post.dto';
import { ListPostsUsecase } from './use-cases/list-posts.use-case';

@Controller('posts')
export class PostsController {
  @Inject(CreatePostUseCase)
  private readonly createPostUseCase: CreatePostUseCase;

  @Inject(ListPostsUsecase)
  private readonly listPostsUseCase: ListPostsUsecase;

  @Post()
  createPost(@Body() data: CreatePostDto) {
    return this.createPostUseCase.execute(data);
  }

  @Get()
  listPosts() {
    return this.listPostsUseCase.execute();
  }
}
