import LexemeList from '@/ui/lexeme-list'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <section>
        <LexemeList slug={params.slug} />
      </section>
    </>
  )
}
