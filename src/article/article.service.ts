import { Injectable } from "@nestjs/common";

@Injectable()
export class ArticleService {
  getArticles(query) {
    return "This action returns all articles";
  }

  getArticleById(id: string) {
    return `This action returns a #${id} article`;
  }

  searchArticles(query: string) {
    return `This action returns articles containing the query: ${query}`;
  }

  getArticlesByCategory(category: string) {
    return `This action returns articles in the category: ${category}`;
  }
}
