import { expect, test } from 'vitest'
import { mapReadingToKanji } from './helpers'

test('check combineKanjiReading for お冷や', () => {
  const k_ele = [
    { ke_pri: [], keb: 'お冷や' },
    { ke_pri: [], keb: 'お冷' }
  ]
  const r_ele = [{ re_pri: [], reb: 'おひや' }]
  const result = [{ kana: 'お' }, { kanji: '冷', furigana: 'ひ' }, { kana: 'や' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for もぬけの殻', () => {
  const k_ele = [
    { ke_pri: [], keb: 'もぬけの殻' },
    { ke_pri: [], keb: '蛻の殻' },
    { ke_pri: [], keb: '藻抜けの殻' },
    { ke_pri: [], keb: '蛻けの殻' },
    { ke_pri: [], keb: 'もぬけの空', ke_inf: ['iK'] },
    { ke_pri: [], keb: '蛻の空', ke_inf: ['iK'] }
  ]
  const r_ele = [{ re_pri: [], reb: 'もぬけのから' }]
  const result = [{ kana: 'もぬけの' }, { kanji: '殻', furigana: 'から' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 定めなき空', () => {
  const k_ele = [{ ke_pri: [], keb: '定めなき空' }]
  const r_ele = [{ re_pri: [], reb: 'さだめなきそら' }]
  const result = [{ kanji: '定', furigana: 'さだ' }, { kana: 'めなき' }, { kanji: '空', furigana: 'そら' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 快い', () => {
  const k_ele = [
    { ke_pri: ['ichi1', 'news1', 'nf22'], keb: '快い' },
    { ke_pri: [], keb: '心良い', ke_inf: ['iK'] }
  ]
  const r_ele = [{ re_pri: ['ichi1', 'news1', 'nf22'], reb: 'こころよい' }]
  const result = [{ kanji: '快', furigana: 'こころよ' }, { kana: 'い' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 心外', () => {
  const k_ele = [{ ke_pri: ['news1', 'nf24'], keb: '心外' }]
  const r_ele = [{ re_pri: ['news1', 'nf24'], reb: 'しんがい' }]
  const result = [{ kanji: '心外', furigana: 'しんがい' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 心の糧', () => {
  const k_ele = [{ ke_pri: [], keb: '心の糧' }]
  const r_ele = [{ re_pri: [], reb: 'こころのかて' }]
  const result = [{ kanji: '心', furigana: 'こころ' }, { kana: 'の' }, { kanji: '糧', furigana: 'かて' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 心変わり', () => {
  const k_ele = [
    { ke_pri: ['news2', 'nf42'], keb: '心変わり' },
    { ke_pri: [], keb: '心変り' }
  ]
  const r_ele = [{ re_pri: ['news2', 'nf42'], reb: 'こころがわり' }]
  const result = [{ kanji: '心変', furigana: 'こころが' }, { kana: 'わり' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 心を込めて', () => {
  const k_ele = [
    { ke_pri: ['spec1'], keb: '心を込めて' },
    { ke_pri: ['spec1'], keb: '心をこめて' },
    { ke_pri: [], keb: '心を籠めて' }
  ]
  const r_ele = [{ re_pri: ['spec1'], reb: 'こころをこめて' }]
  const result = [
    { kanji: '心', furigana: 'こころ' },
    { kana: 'を' },
    { kanji: '込', furigana: 'こ' },
    { kana: 'めて' }
  ]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 心臓の鼓動', () => {
  const k_ele = [{ ke_pri: [], keb: '心臓の鼓動' }]
  const r_ele = [{ re_pri: [], reb: 'しんぞうのこどう' }]
  const result = [{ kanji: '心臓', furigana: 'しんぞう' }, { kana: 'の' }, { kanji: '鼓動', furigana: 'こどう' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 瞬間湯沸し器', () => {
  const k_ele = [{ ke_pri: [], keb: '瞬間湯沸し器' }]
  const r_ele = [{ re_pri: [], reb: 'しゅんかんゆわかしき' }]
  const result = [{ kanji: '瞬間湯沸', furigana: 'しゅんかんゆわか' }, { kana: 'し' }, { kanji: '器', furigana: 'き' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for 命の綱', () => {
  const k_ele = [{ ke_pri: [], keb: '命の綱' }]
  const r_ele = [{ re_pri: [], reb: 'いのちのつな' }]
  const result = [{ kanji: '命', furigana: 'いのち' }, { kana: 'の' }, { kanji: '綱', furigana: 'つな' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})

test('check combineKanjiReading for どうも有難うございます', () => {
  const k_ele = [
    { ke_pri: [], keb: 'どうも有難うございます' },
    { ke_pri: [], keb: 'どうも有り難うございます' },
    { ke_pri: [], keb: 'どうも有難う御座います' },
    { ke_pri: [], keb: 'どうも有り難う御座います' }
  ]
  const r_ele = [{ re_pri: [], reb: 'どうもありがとうございます' }]
  const result = [{ kana: 'どうも' }, { kanji: '有難', furigana: 'ありがとう' }, { kana: 'ございます' }]

  expect(mapReadingToKanji(k_ele, r_ele)).toEqual(result)
})
