import { ArticleCard } from "@/components/article-card"
import { SearchBar } from "@/components/search-bar"
import { getArticles } from "@/lib/api"

export default async function HomePage() {
  // Add error handling for the page level

  let articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest News</h1>
      <SearchBar className="mb-8" />

      {articles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

