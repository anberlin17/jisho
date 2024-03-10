import { kanaRegExp } from './const'

export const isHiragana = (glyph: string) => glyph.length === glyph.match(kanaRegExp.hiragana)?.length
export const isKatakana = (glyph: string) => glyph.length === glyph.match(kanaRegExp.katakana)?.length
export const isKana = (glyph: string) => isHiragana(glyph) || isKatakana(glyph)
