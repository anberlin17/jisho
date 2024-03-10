import { DictQualifier } from './lib/dictionaries'

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export enum KanaMode {
  Hiragana = 'hiragana',
  Katakana = 'katakana'
}

export enum DictInstance {
  Kanji = 'kanji',
  Radical = 'radical',
  DictEntry = 'dictEntry',
  Kana = 'kana'
}

export interface Store {
  isError: boolean
  isFetched: boolean
  isFetchedAfterMount: boolean
  isFetching: boolean
  isLoading: boolean
  isLoadingError: boolean
  isPaused: boolean
  isPending: boolean
  isPlaceholderData: boolean
  isRefetchError: boolean
  isRefetching: boolean
  isStale: boolean
  isSuccess: boolean
  data: {
    radicals: IRadicalResponse[]
    dictEntry: IDictEntryResponse[]
    kanji: IKanjiResponse[]
  }
}

export type Themes = Theme.Light | Theme.Dark
export type EitherArrayType<T> = T | T[]

export type Instances =
  | DictInstance.Kanji
  | DictInstance.Radical
  | DictInstance.DictEntry
  | DictInstance.Kana

export interface IRadicalResponse {
  character: string
  kangxiNumber?: number
  meaning: string
  strokes: number
  variant?: string
}

export interface IKanjiResponse {
  character: string
  grade: number | null
  heisig: string | null
  jlpt: number
  kunReadings: string[]
  nameReadings: string[]
  onReadings: string[]
  meaning: string[]
  strokes: number
  unicode: string
}

export interface IDictEntryKanji {
  keb: string
  ke_pri: string[]
  ke_inf?: string[]
}

export interface IDictEntryReading {
  reb: string
  re_pri: string[]
  re_inf?: string[]
}

export interface IDictEntrySense {
  gloss: {
    '_xml:lang': string
    __text: string
  }[]
  pos?: DictQualifier[]
  xref?: string[]
  misc?: DictQualifier[]
  s_inf?: string
  ant?: string[]
}

export type DictEntryTags = string[]

export interface IDictEntryResponse {
  _id: string
  ent_seq: string
  k_ele: IDictEntryKanji[]
  r_ele: IDictEntryReading[]
  sense: IDictEntrySense[]
  tags: DictEntryTags
}

export interface INovel {
  id: string
  title: {
    en: string
    ja: string
  }
  content: string
}
