import type { Article } from "./types"

// API base URL - replace with your actual API endpoint
const API_BASE_URL = "http://localhost:5000"

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?category=General`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    // Check if response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API did not return JSON, falling back to mock data")
      return mockArticles
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching articles:", error)
    // Fall back to mock data when API fails
    return mockArticles
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    // Check if response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API did not return JSON, falling back to mock data")
      const mockArticle = mockArticles.find((article) => article._id === id)
      return mockArticle || null
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error)
    // Try to find the article in mock data
    const mockArticle = mockArticles.find((article) => article._id === id)
    return mockArticle || null
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    // Check if response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API did not return JSON, falling back to mock data")
      // Filter mock data based on query
      if (!query) return []
      const lowerQuery = query.toLowerCase()
      return mockArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          (article.description && article.description.toLowerCase().includes(lowerQuery)),
      )
    }

    if (!response.ok) {
      throw new Error(`Failed to search articles: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching articles:", error)
    // Filter mock data based on query
    if (!query) return []
    const lowerQuery = query.toLowerCase()
    return mockArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        (article.description && article.description.toLowerCase().includes(lowerQuery)),
    )
  }
}

// Updated mock data to match your schema
const mockArticles: Article[] = [
  {
    _id: "67dd434b2b14e37ea7b490c1",
    title: "The Future of Artificial Intelligence in Healthcare",
    description: "AI is revolutionizing healthcare with improved diagnostics and personalized treatment plans.",
    pubDate: "2025-03-20T09:30:00.000Z",
    image_url: "/placeholder.svg?height=400&width=600",
    source_icon: "1",
    link: "https://example.com/ai-healthcare",
    content: [
      {
        type: "text",
        value:
          "Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic tools that can detect diseases earlier than human doctors to personalized treatment plans based on individual genetic profiles, AI is revolutionizing how we approach medicine.",
      },
      {
        type: "text",
        value:
          "Recent studies have shown that AI algorithms can detect certain cancers from medical images with greater accuracy than experienced radiologists. This doesn't mean AI will replace doctors, but rather augment their capabilities, allowing them to make better-informed decisions and focus more on patient care.",
      },
      { type: "image", value: "/placeholder.svg?height=400&width=600" },
      {
        type: "text",
        value:
          "The integration of AI in healthcare also promises to reduce costs and improve access to quality care, especially in underserved regions where medical professionals may be scarce.",
      },
    ],
    source_name: "Health Tech Today",
  },
  {
    _id: "67dd434b2b14e37ea7b490c2",
    title: "Global Markets React to New Economic Policies",
    description: "Stock markets worldwide show mixed reactions to the latest economic stimulus package.",
    pubDate: "2025-03-19T16:45:00.000Z",
    image_url: "/placeholder.svg?height=400&width=600",
    source_icon: "2",
    link: "https://example.com/global-markets",
    content: [
      {
        type: "text",
        value:
          "Global financial markets showed varied responses today following the announcement of a comprehensive economic stimulus package by major economies. Asian markets closed higher, with Japan's Nikkei index gaining 1.2% and South Korea's KOSPI up by 0.8%.",
      },
      {
        type: "text",
        value:
          "European markets, however, displayed more caution. The FTSE 100 in London dropped by 0.3%, while Germany's DAX remained relatively flat. Analysts attribute this hesitation to concerns about inflation and the long-term sustainability of the stimulus measures.",
      },
      {
        type: "quote",
        value:
          "The markets are still digesting the implications of these massive stimulus packages. There's optimism about economic recovery, but also concern about potential inflation.",
      },
      {
        type: "text",
        value:
          "In the United States, Wall Street opened with modest gains, with technology stocks leading the advance. The stimulus package, valued at approximately $1.9 trillion, aims to accelerate economic recovery post-pandemic through infrastructure investments and support for small businesses.",
      },
    ],
    source_name: "Financial Times",
  },
  {
    _id: "67dd434b2b14e37ea7b490c3",
    title: "Máy bay hạ cánh khẩn vì cháy sạc dự phòng trên khoang",
    description:
      "Chuyến bay của hãng Hong Kong Airlines phải hạ cánh khẩn xuống thành phố Phúc Châu, sau khi sạc dự phòng ở ngăn hành lý xách tay bốc cháy.",
    pubDate: "2025-03-21T10:15:53.000Z",
    image_url:
      "https://i1-vnexpress.vnecdn.net/2025/03/21/chay-may-bay-1742550902-174255-3888-5183-1742551432.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=9EqxPz6PjoqL6JHV0Q5NlA",
    source_icon: "1",
    link: "https://example.com/may-bay-ha-canh",
    content: [
      {
        type: "text",
        value:
          "Chuyến bay của hãng Hong Kong Airlines phải hạ cánh khẩn xuống thành phố Phúc Châu, sau khi sạc dự phòng ở ngăn hành lý xách tay bốc cháy.",
      },
      {
        type: "text",
        value:
          "Sự cố xảy ra trên chuyến bay HX246 từ Hong Kong đến Bắc Kinh hôm 20/3. Theo hãng hàng không, phi hành đoàn đã phát hiện khói bốc ra từ khoang hành khách và xác định nguồn là từ một pin sạc dự phòng trong túi hành lý xách tay.",
      },
      {
        type: "image",
        value:
          "https://i1-vnexpress.vnecdn.net/2025/03/21/chay-may-bay-1742550902-174255-3888-5183-1742551432.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=9EqxPz6PjoqL6JHV0Q5NlA",
      },
      {
        type: "text",
        value:
          "Phi công đã quyết định chuyển hướng và hạ cánh khẩn cấp xuống sân bay gần nhất là Phúc Châu. Máy bay đã hạ cánh an toàn và không có hành khách nào bị thương.",
      },
    ],
    source_name: "VnExpress",
  },
]

