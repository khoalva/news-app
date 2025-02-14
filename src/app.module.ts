import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [UserModule, PrismaModule, ArticleModule, AuthModule, RedisModule],
})
export class AppModule {}
