import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UserModule, PrismaModule, ArticleModule, AuthModule],
})
export class AppModule {}
