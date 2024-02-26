import { IRadicalResponse } from '@/types'

export const clog = {
  request: (message = '', req?: unknown) =>
    console.debug(
      `%c Request: >> %c ${message} `,
      'background-color: #f9c600;color:#222;font-weight:bold;padding:0.1em;',
      'background-color: #fffbda;color:#222;font-weight:bold;padding:0.1em;',
      req
    ),
  response: (message = '', res?: unknown) =>
    console.debug(
      `%c << Response: %c ${message} `,
      'background-color: #4ed03a;color:#222;font-weight:bold;padding:0.1em;',
      'background-color: #d5f1cf;color:#222;font-weight:bold;padding:0.1em;',
      res
    ),
  error: (message = '', res?: unknown) =>
    console.debug(
      `%c << Error: %c ${message} `,
      'background-color: #f7204b;color:#222;font-weight:bold;padding:0.1em;',
      'background-color: #9b7d83;color:#222;font-weight:bold;padding:0.1em;',
      res
    )
}

export function processRadicalVariants(radicals: Array<IRadicalResponse> = []) {
  return radicals.map((radical, _, arr) => {
    if (radical.hasOwnProperty('variant')) {
      return {
        ...radical,
        meaning: [],
        variants: []
      }
    }

    const variants = arr.reduce<string[]>((acc, { character, variant }) => {
      if (variant === radical.character) {
        acc.push(character)
      }

      return acc
    }, [])

    return {
      ...radical,
      meaning: radical.meaning.split(','),
      variants
    }
  })
}
