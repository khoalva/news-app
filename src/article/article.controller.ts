import { Controller, Get, Query, Param } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getArticles(@Query() query) {
    return this.articleService.getArticles(query);
  }

  @Get(":id")
  getArticleById(@Param("id") id: string) {
    return this.articleService.getArticleById(id);
  }

  @Get("search")
  searchArticles(@Query("query") query: string) {
    return this.articleService.searchArticles(query);
  }

  @Get("category")
  getArticlesByCategory(@Query("category") category: string) {
    return this.articleService.getArticlesByCategory(category);
  }
}
