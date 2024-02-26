'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const params = useParams()
  const { replace } = useRouter()

  useEffect(() => {
    if (!params.slug) {
      replace('/')
    }
  }, [])

  return null
}
