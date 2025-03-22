import { ArticleCard } from "@/components/article-card"
import { SearchBar } from "@/components/search-bar"
import { searchArticles } from "@/lib/api"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""
  const articles = await searchArticles(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results</h1>
      <SearchBar defaultValue={query} className="mb-8" />

      {query ? (
        <>
          <p className="mb-6 text-muted-foreground">
            Found {articles.length} results for "{query}"
          </p>

          {articles.length === 0 ? (
            <div className="text-center py-10">
              <p>No articles found for this search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p>Enter a search term to find articles</p>
        </div>
      )}
    </div>
  )
}

