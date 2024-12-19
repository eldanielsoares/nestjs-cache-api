import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../dtos/create-post.dto';
import { PostEntity } from '../../entities/post.entity';
import { MainPostRepository } from '../post.repository';
import { PrismaService } from 'src/modules/prisma/prisma-service';

@Injectable()
export class PrismaPostRepository implements MainPostRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({ data });
  }
  findMany(): Promise<PostEntity[]> {
    return this.prisma.post.findMany();
  }
}
