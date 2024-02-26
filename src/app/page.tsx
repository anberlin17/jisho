import Search from '@/ui/search-panel'
import './page.scss'

export default function Page() {
  return (
    <>
      <search role="search">
        <Search />
      </search>

      <article style={{ margin: '2rem auto', maxWidth: '38rem' }}>
        <p>
          Jisho is a powerful Japanese-English dictionary. It lets you find words and kanji quickly
          and easily.
        </p>
        <p>
          Enter any Japanese or English word in the search box and Jisho will search a myriad of
          data for you.
        </p>
        <p>Here’s a few example searches to give you a taste of what Jisho can do.</p>
        <ul>
          <li>
            Great English search: <a href="/">house</a>
          </li>
          <li>
            Inflection information:{' '}
            <a href="/">
              <span lang="ja">走った</span>
            </a>
          </li>
          <li>
            Multi word search:{' '}
            <a href="/">
              <span lang="ja">日</span> sunlight
            </a>
          </li>
          <li>
            JLPT N3 adjectives: <a href="/">#jlpt-n3 #adjective</a>
          </li>
          <li>
            Grade 1 jōyō kanji: <a href="/">#grade:1 #kanji</a>
          </li>
          <li>
            Common words that end with <span lang="ja">家</span>:{' '}
            <a href="/">
              #word #common ?*<span lang="ja">家</span>
            </a>
          </li>
          <li>
            Convert Japanese years:{' '}
            <a href="/">
              <span lang="ja">昭和５２</span>
            </a>
          </li>
          <li>
            Convert Japanese numbers:{' '}
            <a href="/">
              <span lang="ja">４７７８万</span>
            </a>
          </li>
        </ul>
      </article>
    </>
  )
}
