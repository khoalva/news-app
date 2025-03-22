import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import type { Article } from "@/lib/types"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article._id}`}>
      <div className="group rounded-lg border overflow-hidden h-full flex flex-col transition-colors hover:border-primary">
        <div className="relative h-48 w-full">
          <Image
            src={article.image_url || "/placeholder.svg?height=200&width=400"}
            alt={article.title}
            fill
            className="object-cover"
          />
          {article.source_icon && (
            <div className="absolute bottom-2 right-2 bg-background/80 rounded-full p-1">
              <span className="text-xs font-medium">{article.source_icon}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="text-sm text-muted-foreground mb-2">
            <time dateTime={article.pubDate.toString()}>{formatDate(article.pubDate.toString())}</time>
          </div>

          <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{article.title}</h3>

          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{article.description}</p>

          <div className="mt-auto flex items-center text-sm">
            <span className="text-muted-foreground">{article.source_name || "News Source"}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

