import * as wanakana from 'wanakana'
import { IDictEntryKanji, IDictEntryReading, IDictEntrySense } from '@/types'
import { getQualifierMeaning } from '@/lib/dictionaries'
import { WordLexem, WordType } from './types'

interface IDictEntrySenseReduced extends Omit<IDictEntrySense, 'pos' | 'misc'> {
  pos: string[]
  misc: string[]
}

function getMeaning(senses: IDictEntrySense[]) {
  return senses.reduce<IDictEntrySenseReduced[]>((acc, sense, i) => {
    if (sense.gloss[0]['_xml:lang'] !== 'eng') return acc

    acc.push({
      ...sense,
      pos: [],
      misc: []
    })

    if (sense.pos) acc[i].pos = sense.pos.map(getQualifierMeaning)

    if (sense.misc) {
      acc[i].misc = sense.misc.map(getQualifierMeaning)
    }

    if (sense.xref) {
      const xrefs = sense.xref.map(e => e.replace(/[・|・\d]/gi, ''))
      acc[i].misc.push(`see also: ${xrefs.join(', ')}`)
    }

    if (sense.s_inf) acc[i].misc.push(sense.s_inf)
    if (sense.ant) acc[i].misc.push(`antonym: ${sense.ant.join(', ')}`)

    return acc
  }, [])
}

function getSplitWord(word: string) {
  const parts: string[] = []

  for (let i = 0, glyphs = '', len = word.length; i < len; i++) {
    const char = word[i]
    const isKana = wanakana.isKana(char)
    const isNextKana = wanakana.isKana(word[i + 1])

    glyphs += char
    if ((!isKana && isNextKana) || (isKana && !isNextKana) || i === len - 1) {
      parts.push(glyphs)
      glyphs = ''
    }
  }

  return parts
}

export function mapReadingToKanji(
  kanjiElem: IDictEntryKanji[],
  readingElem: IDictEntryReading[]
): WordLexem[] {
  let reading = readingElem[0].reb
  if (!kanjiElem.length) {
    return [{ kana: reading }]
  }

  const word = kanjiElem[0].keb
  const splitWord = getSplitWord(word)

  const res: WordLexem[] = []
  const kanaCharacters = splitWord.reduce<string[]>((acc, char, idx, arr) => {
    const isKana = wanakana.isKana(char)
    if (idx === 0 && !isKana) {
      return acc
    }

    if (!isKana && idx === arr.length - 1 && arr.length < 3) {
      return acc
    }

    acc.push(isKana ? char : '')
    return acc
  }, [])

  for (let i = 0, readingElements = reading.length; i < splitWord.length; i++) {
    const peace = splitWord[i]
    const isKana = wanakana.isKana(peace)
    let nearestKanaIndex = reading.indexOf(kanaCharacters[i] ?? null)

    if (nearestKanaIndex < peace.length && !isKana) {
      nearestKanaIndex = reading.indexOf(kanaCharacters[i] ?? null, peace.length - 1)
    }

    let substringEnd = 0
    if (isKana) {
      if (nearestKanaIndex === 0) {
        substringEnd = peace.length
      }
    } else {
      substringEnd = nearestKanaIndex
    }

    substringEnd = substringEnd === 0 ? 1 : substringEnd === -1 ? readingElements : substringEnd
    const readingPeace = reading.substring(0, substringEnd)
    reading = reading.replace(new RegExp(`^(${readingPeace})`), '')

    if (isKana) {
      res.push({
        kana: peace
      })
    } else {
      res.push({
        kanji: peace,
        furigana: readingPeace
      })
    }
  }

  return res
}

function mapTags(tags: string[]) {
  return Array.from(
    tags.reduce((acc, tag) => {
      switch (true) {
        case /(news|ichi)|spec|gai\w/.test(tag):
          acc.add('common')
          break
        case /nf\w\w/.test(tag):
          const numbers = Number(tag.match(/\d/g)?.join(''))
          acc.add(`<${numbers * 500}`)
          break
        case /jlpt\w/.test(tag):
          acc.add(tag)
          break
      }

      return acc
    }, new Set<string>())
  )
}

export function parseWord(word: WordType) {
  const meanings = getMeaning(word.sense)
  const mappedWord = mapReadingToKanji(word.k_ele, word.r_ele)
  const tags = mapTags(word.r_ele[0].re_pri.concat(word.tags || []))

  return { meanings, mappedWord, tags }
}
