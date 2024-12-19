import { CreatePostDto } from '../dtos/create-post.dto';
import { PostEntity } from '../entities/post.entity';

export abstract class PostRepository {
  abstract findMany(): Promise<PostEntity[]>;
}

export abstract class MainPostRepository extends PostRepository {
  abstract create(data: CreatePostDto): Promise<PostEntity>;
}

export abstract class CachePostRepository extends PostRepository {
  abstract create(
    key: string,
    data: string,
    expiresInSeconds?: number,
  ): Promise<void>;
}
