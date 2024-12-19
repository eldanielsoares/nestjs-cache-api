import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { PrismaService } from './modules/prisma/prisma-service';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://redis:6379',
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
