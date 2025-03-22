import Image from "next/image"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { getArticleById } from "@/lib/api"

// Component to render different content types
function ArticleContent({ content }: { content: { type: string; value: string }[] }) {
  return (
    <div className="space-y-6">
      {content.map((item, index) => {
        switch (item.type) {
          case "text":
            return (
              <p key={index} className="text-base leading-relaxed">
                {item.value}
              </p>
            )
          case "image":
            return (
              <div key={index} className="relative w-full h-[400px] my-6">
                <Image src={item.value || "/placeholder.svg"} alt="Article image" fill className="object-contain" />
              </div>
            )
          case "quote":
            return (
              <blockquote key={index} className="border-l-4 border-primary pl-4 italic">
                {item.value}
              </blockquote>
            )
          case "video":
            return (
              <div key={index} className="relative aspect-video w-full my-6">
                <iframe
                  src={item.value}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  title="Embedded video"
                />
              </div>
            )
          case "list":
            try {
              const listItems = JSON.parse(item.value)
              return (
                <ul key={index} className="list-disc pl-6 space-y-2">
                  {listItems.map((listItem: string, i: number) => (
                    <li key={i}>{listItem}</li>
                  ))}
                </ul>
              )
            } catch {
              return <p key={index}>{item.value}</p>
            }
          default:
            return <p key={index}>{item.value}</p>
        }
      })}
    </div>
  )
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  // Add error handling
  let article = null
  try {
    article = await getArticleById(params.id)
  } catch (error) {
    console.error(`Error in ArticlePage for ID ${params.id}:`, error)
  }

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-6">
          <time dateTime={article.pubDate.toString()}>{formatDate(article.pubDate.toString())}</time>
          {article.source_name && (
            <>
              <span>•</span>
              <span>{article.source_name}</span>
            </>
          )}
        </div>

        {article.image_url && (
          <div className="relative w-full h-[400px] mb-8">
            <Image
              src={article.image_url || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {article.description && (
          <div className="text-xl font-medium mb-8 text-muted-foreground">{article.description}</div>
        )}

        {article.content ? (
          <ArticleContent content={article.content} />
        ) : (
          <p className="text-muted-foreground">No content available for this article.</p>
        )}

        {article.keywords && article.keywords.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-medium mb-2">Keywords:</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {article.link && (
          <div className="mt-8">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Read original article
            </a>
          </div>
        )}
      </article>
    </div>
  )
}

