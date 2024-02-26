import { IDictEntryResponse } from '@/types'
import { fetchLexemes } from '@/lib/data'
import Lexeme from '../lexeme'
import './styles.scss'

export default async function LexemeList({ slug }: { slug: string }) {
  const lexemes: IDictEntryResponse[] = await fetchLexemes(slug)

  return (
    <div className="lexeme-list">
      {lexemes.map(({ k_ele, r_ele, sense, tags }: IDictEntryResponse, idx) => (
        <Lexeme word={{ k_ele, r_ele, sense, tags }} key={idx} />
      ))}
    </div>
  )
}
