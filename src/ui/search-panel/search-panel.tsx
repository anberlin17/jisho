'use client'

import clsx from 'clsx'
import { useState, useRef, useEffect, FormEvent, ChangeEvent, useContext } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import * as wanakana from 'wanakana'
import styles from './styles.module.css'

export default function SearchPanel() {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const [searchValue, setSearchValue] = useState(
    params.slug ? decodeURI(params.slug as string) : ''
  )
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    if (pathname === '/') {
      router.push(`search/${searchValue}`)
    } else {
      router.replace(`${window.location.origin}/search/${searchValue}`)
    }
  }

  function handleInput({ target }: ChangeEvent<HTMLInputElement>) {
    return setSearchValue(target.value.trim())
  }

  function handleClearInput() {
    setSearchValue('')
  }

  useEffect(() => {
    wanakana.bind(inputRef.current!)
    inputRef.current!.focus()
  }, [])

  return (
    <div className={styles.searchPanel}>
      <form onSubmit={handleSubmit}>
        <button className={clsx(styles.searchPanelButton, !searchValue && styles.buttonDisabled)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451 451">
            <path d="M447.05 428l-109.6-109.6c29.4-33.8 47.2-77.9 47.2-126.1C384.65 86.2 298.35 0 192.35 0 86.25 0 .05 86.3.05 192.3s86.3 192.3 192.3 192.3c48.2 0 92.3-17.8 126.1-47.2L428.05 447c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.2-5.2 5.2-13.8 0-19zM26.95 192.3c0-91.2 74.2-165.3 165.3-165.3 91.2 0 165.3 74.2 165.3 165.3s-74.1 165.4-165.3 165.4c-91.1 0-165.3-74.2-165.3-165.4z" />
          </svg>
        </button>

        <input
          type="text"
          placeholder="English, Japanese, Romaji, words"
          ref={inputRef}
          value={searchValue}
          onInput={handleInput}
          onChange={() => false}
        />

        <button
          className={clsx(styles.searchPanelButton, !searchValue && styles.buttonDisabled)}
          type="button"
          onClick={handleClearInput}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.2 475.2">
            <path d="M405.6 69.6C360.7 24.7 301.1 0 237.6 0s-123.1 24.7-168 69.6S0 174.1 0 237.6s24.7 123.1 69.6 168 104.5 69.6 168 69.6 123.1-24.7 168-69.6 69.6-104.5 69.6-168-24.7-123.1-69.6-168zm-19.1 316.9c-39.8 39.8-92.7 61.7-148.9 61.7s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7 0-297.8C128.5 48.9 181.4 27 237.6 27s109.1 21.9 148.9 61.7c82.1 82.1 82.1 215.7 0 297.8z" />
            <path d="M342.3 132.9c-5.3-5.3-13.8-5.3-19.1 0l-85.6 85.6-85.6-85.6c-5.3-5.3-13.8-5.3-19.1 0-5.3 5.3-5.3 13.8 0 19.1l85.6 85.6-85.6 85.6c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l85.6-85.6 85.6 85.6c2.6 2.6 6.1 4 9.5 4 3.5 0 6.9-1.3 9.5-4 5.3-5.3 5.3-13.8 0-19.1l-85.4-85.6 85.6-85.6c5.3-5.3 5.3-13.8 0-19.1z" />
          </svg>
        </button>
      </form>
    </div>
  )
}
