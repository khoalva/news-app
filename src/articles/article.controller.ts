import {
  Controller,
  Get,
  Query,
  NotFoundException,
  Post,
  Body,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBody,
} from "@nestjs/swagger";
import { ArticlesService } from "./article.service";
import { Article } from "../schemas/article.schema";
import { Types } from "mongoose";
import { CreateArticleDto } from "./dto/create-article.dto";

@ApiTags("articles") // Grouping API endpoints in Swagger
@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Retrieves a list of articles based on category.
   *
   * @param category - The category name of the articles (required).
   * @param limit - Number of articles to retrieve (default: 10).
   * @param lastPubDate - The publication date of the last retrieved article (optional).
   * @param direction - The pagination direction:
   *   - `older` (default) to get older articles.
   *   - `newer` to get newer articles.
   */
  @Get()
  @ApiOperation({
    summary: "Get list of articles",
    description: "Retrieves articles filtered by category.",
  })
  @ApiQuery({
    name: "category",
    type: String,
    required: true,
    description: "The category name of the articles (required)",
    example: "General",
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    example: 10,
    description: "Number of articles to retrieve (default: 10)",
  })
  @ApiQuery({
    name: "lastPubDate",
    type: String,
    required: false,
    description: "Publication date of the last retrieved article (optional)",
  })
  @ApiQuery({
    name: "direction",
    type: String,
    required: false,
    enum: ["newer", "older"],
    example: "older",
    description: "Pagination direction: 'older' (default) or 'newer'",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved list of articles.",
    type: [Article],
  })
  @ApiResponse({ status: 400, description: "Invalid query parameters." })
  async getArticles(
    @Query("category") category: string,
    @Query("limit") limit: number = 10,
    @Query("lastPubDate") lastPubDate?: string,
    @Query("direction") direction: "newer" | "older" = "older",
  ): Promise<Article[]> {
    return this.articlesService.getArticles(
      category,
      limit,
      lastPubDate,
      direction,
    );
  }

  /**
   * Retrieves the details of a specific article by its ID.
   *
   * @param id - The unique identifier of the article (required).
   * @returns The details of the article corresponding to the given ID.
   */
  @Get("article-detail")
  @ApiOperation({
    summary: "Get article details",
    description: "Retrieves details of a specific article by ID.",
  })
  @ApiQuery({
    name: "id",
    type: String,
    required: true,
    example: "67ffe1e8a2d76f31d1c230a9",
    description: "The unique identifier of the article (required)",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved article details.",
    type: Article,
  })
  @ApiResponse({ status: 400, description: "Invalid article ID." })
  @ApiResponse({ status: 404, description: "Article not found." })
  async getArticleById(@Query("id") id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Invalid article ID");
    }

    const article = await this.articlesService.getArticleById(id);
    if (!article) throw new NotFoundException("Article not found");

    return article;
  }

  @Post()
  @ApiOperation({
    summary: "Create new articles",
    description: "Creates one or more articles in the database",
  })
  @ApiBody({
    type: [CreateArticleDto], // Mảng DTO vì nhận nhiều article
    description: "Array of articles to create",
  })
  @ApiResponse({
    status: 201,
    description: "The articles have been successfully created",
    type: [Article], // Mảng Article làm response
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request - Invalid data or category not found",
  })
  async createArticle(
    @Body() createArticleDtos: CreateArticleDto[],
  ): Promise<Article[]> {
    return await this.articlesService.createArticles(createArticleDtos);
  }

  @Get("search")
  @ApiOperation({
    summary: "Get article details",
    description: "Retrieves details of a specific article by ID.",
  })
  @ApiQuery({
    name: "search",
    type: String,
    required: true,
    example: "đơn",
    description: "The content or title",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved article details.",
    type: [Article],
  })
  async search(@Query("search") query: string) {
    return this.articlesService.search(query);
  }
}
