'use client'

import { useState } from 'react'

export const useList = <T extends any[]>(
  list: T
): {
  item: (typeof list)[number]
  handleClick: (idx: number) => void
} => {
  const [itemId, setItemId] = useState(0)
  const handleClick = (idx: number) => setItemId(idx)

  return { item: list[itemId], handleClick }
}
