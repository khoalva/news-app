import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { queryDto } from "./dto/get-query.dto";

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  // Lấy danh sách bài viết (có cache)
  async getArticles(query: queryDto) {
    const { page = 1, limit = 10 } = query;
    const cacheKey = `articles_page_${page}_limit_${limit}`;

    // Kiểm tra cache trước
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) return cachedData;

    // Nếu không có cache, lấy từ database
    const articles = await this.prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Lưu cache
    await this.redisService.set(cacheKey, articles);
    return articles;
  }

  // Lấy bài viết theo ID
  async getArticleById(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) throw new NotFoundException("Bài viết không tồn tại");
    return article;
  }

  // Tìm kiếm bài viết theo tiêu đề
  async searchArticles(query: string) {
    if (!query) return [];
    return await this.prisma.article.findMany({
      where: { title: { contains: query, mode: "insensitive" } },
      orderBy: { updatedAt: "desc" },
    });
  }

  // // Lọc bài viết theo thể loại
  // async getArticlesByCategory(category: string) {
  //   return await this.prisma.article.findMany({
  //     where: { category },
  //     orderBy: { updatedAt: "desc" },
  //   });
  // }
}
