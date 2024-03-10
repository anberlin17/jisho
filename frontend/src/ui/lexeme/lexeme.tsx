import clsx from 'clsx'
import { Fragment } from 'react'
import { parseWord } from './helpers'
import { WordType } from './types'
import './styles.scss'

export interface LexemeProps {
  word: WordType
}

export default function Lexeme({ word }: LexemeProps) {
  const { meanings, mappedWord, tags } = parseWord(word)

  return (
    <div className="lexeme">
      <div className="lexeme__view-container">
        <div className="lexeme__view">
          {mappedWord.map((lexem, idx) => (
            <div
              className={clsx('lexeme__character-container', {
                'lexeme__character-container_with-furigana': 'furigana' in lexem
              })}
              key={idx}
            >
              {'kanji' in lexem && (
                <>
                  <span className="lexeme__furigana">{lexem.furigana}</span>
                  <span className="lexeme__character">{lexem.kanji}</span>
                </>
              )}
              {'kana' in lexem && <span className="lexeme__character">{lexem.kana}</span>}
            </div>
          ))}
        </div>
        {Boolean(tags.length) && (
          <div className="lexeme__tags">
            {tags.map((tag, idx) => (
              <div key={idx} className="lexeme__tag" data-tag-name={tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="lexeme__meanings">
        {meanings.map(({ pos, gloss, misc }, idx) => (
          <Fragment key={idx}>
            {Boolean(pos.length) && <div className="lexeme__meaning-tag">{pos.join(', ')}</div>}
            {gloss && (
              <div>
                <span className="lexeme__number-tag">{idx + 1}. </span>
                {gloss.map(e => e.__text).join(', ')}
                {Boolean(misc.length) && (
                  <span className="lexeme__meaning-tag"> {misc.join('; ')}</span>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
