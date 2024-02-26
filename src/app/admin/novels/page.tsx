'use client'

import { saveNovel } from '@/lib/data'
import { INovel } from '@/types'
import { FormEvent, useState } from 'react'

export default function Page() {
  const [docId, setDocId] = useState('')

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)

    const data: INovel = {
      id: docId,
      title: {
        ja: formData.get('ja-title') as string,
        en: formData.get('en-title') as string
      },
      content: formData.get('content') as string
    }

    saveNovel(data)
  }

  return (
    <main>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Novel</legend>

          <fieldset style={{ marginBottom: '10px' }}>
            <legend>Title</legend>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '5px',
                width: 'fit-content'
              }}
            >
              <div>
                <label htmlFor="ja">Japanese title</label>
                <input type="text" id="ja" name="ja-title" required />
              </div>
              <div>
                <label htmlFor="en">English title</label>
                <input
                  type="text"
                  id="en"
                  name="en-title"
                  onChange={ev => {
                    const value = ev.currentTarget.value
                    setDocId(value.toLowerCase().split(' ').join('-'))
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="id">Id</label>
                <input type="text" name="id" value={docId} disabled />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Content</legend>
            <div>
              <textarea name="content" rows={30} required />
            </div>
          </fieldset>
        </fieldset>
        <button type="submit" style={{ marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </main>
  )
}
