import Link from 'next/link'
import { fetchNovelsList } from '@/lib/data'
import './styles.scss'

export default async function Novels() {
  const novels = await fetchNovelsList()

  return (
    <main>
      <ul>
        {novels.map(({ id, title }, idx) => (
          <li key={idx}>
            <Link href={`novels/${id}`}>
              {title.en} ({title.ja})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
