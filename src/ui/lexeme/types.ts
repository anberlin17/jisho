import { IDictEntryKanji, IDictEntryReading, IDictEntrySense, DictEntryTags } from '@/types'

export type WordType = {
  k_ele: IDictEntryKanji[]
  r_ele: IDictEntryReading[]
  sense: IDictEntrySense[]
  tags?: DictEntryTags
}

export type KanjiLexem = {
  furigana: string
  kanji: string
}

export type KanaLexem = {
  kana: string
}

export type WordLexem = KanjiLexem | KanaLexem
