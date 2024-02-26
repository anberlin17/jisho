import NovelArticle from '@/ui/novel-article'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main>
      <NovelArticle slug={params.slug} />
    </main>
  )
}
