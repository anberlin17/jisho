import { fetchNovel } from '@/lib/data'

export default async function NovelArticle({ slug }: { slug: string }) {
  const novel = await fetchNovel(slug)

  if (!novel) {
    return null
  }

  return (
    <article>
      <h1>{novel.title.ja}</h1>
      <h2>{novel.title.en}</h2>
      <p style={{ fontSize: '1.5rem' }}>{novel.content}</p>
    </article>
  )
}
