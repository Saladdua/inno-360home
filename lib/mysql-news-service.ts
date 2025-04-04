import { prisma } from "./mysql-config"
import type { NewsItem } from "./news-service"

export async function getAllNewsMySQL(): Promise<NewsItem[]> {
  const news = await prisma.news.findMany({
    orderBy: { date: "desc" },
  })

  return news.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    content: item.content || undefined,
    image: item.image,
    date: item.date,
    icon: item.icon || undefined,
    link: item.link || undefined,
    author: item.author || undefined,
    category: item.category || undefined,
    featured: item.featured || false,
  }))
}

export async function getFeaturedNewsMySQL(count = 4): Promise<NewsItem[]> {
  const news = await prisma.news.findMany({
    where: { featured: true },
    orderBy: { date: "desc" },
    take: count,
  })

  return news.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    content: item.content || undefined,
    image: item.image,
    date: item.date,
    icon: item.icon || undefined,
    link: item.link || undefined,
    author: item.author || undefined,
    category: item.category || undefined,
    featured: item.featured || false,
  }))
}

export async function getNewsByIdMySQL(id: string): Promise<NewsItem | null> {
  const news = await prisma.news.findUnique({
    where: { id: Number.parseInt(id) },
  })

  if (!news) {
    return null
  }

  return {
    id: news.id.toString(),
    title: news.title,
    description: news.description,
    content: news.content || undefined,
    image: news.image,
    date: news.date,
    icon: news.icon || undefined,
    link: news.link || undefined,
    author: news.author || undefined,
    category: news.category || undefined,
    featured: news.featured || false,
  }
}

export async function createNewsMySQL(news: Omit<NewsItem, "id">): Promise<string> {
  const result = await prisma.news.create({
    data: {
      title: news.title,
      description: news.description,
      content: news.content || null,
      image: news.image,
      date: news.date instanceof Date ? news.date : new Date(news.date.toMillis()),
      icon: news.icon || null,
      link: news.link || null,
      author: news.author || null,
      category: news.category || null,
      featured: news.featured || false,
    },
  })

  return result.id.toString()
}

export async function updateNewsMySQL(id: string, news: Partial<NewsItem>): Promise<void> {
  await prisma.news.update({
    where: { id: Number.parseInt(id) },
    data: {
      ...(news.title && { title: news.title }),
      ...(news.description && { description: news.description }),
      ...(news.content !== undefined && { content: news.content || null }),
      ...(news.image && { image: news.image }),
      ...(news.date && { date: news.date instanceof Date ? news.date : new Date((news.date as any).toDate ? (news.date as any).toDate() : news.date) }),
      ...(news.icon !== undefined && { icon: news.icon || null }),
      ...(news.link !== undefined && { link: news.link || null }),
      ...(news.author !== undefined && { author: news.author || null }),
      ...(news.category !== undefined && { category: news.category || null }),
      ...(news.featured !== undefined && { featured: news.featured }),
    },
  })
}

export async function deleteNewsMySQL(id: string): Promise<void> {
  await prisma.news.delete({
    where: { id: Number.parseInt(id) },
  })
}

