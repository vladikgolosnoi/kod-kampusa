import { useEffect } from 'react'

import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings'
import { getStatuses } from '../../lib/statuses'
import { localeAwareUpperCase } from '../../lib/words'
import { Key } from './Key'

const KEYBOARD_ROWS = [
  ['Ё', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
  ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
  ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'],
]

const ALLOWED_KEYS = new Set(KEYBOARD_ROWS.flat())

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        if (key.length === 1 && ALLOWED_KEYS.has(key)) {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div className="mx-auto w-full max-w-[22rem] sm:max-w-[30rem]">
      <div className="mb-1 flex justify-center">
        {KEYBOARD_ROWS[0].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solutionLength={solution.length}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {KEYBOARD_ROWS[1].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solutionLength={solution.length}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {KEYBOARD_ROWS[2].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solutionLength={solution.length}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-center">
        <Key
          width="clamp(4.4rem, 22vw, 6.875rem)"
          value="ENTER"
          onClick={onClick}
          solutionLength={solution.length}
        >
          {ENTER_TEXT}
        </Key>
        <Key
          width="clamp(4rem, 20vw, 5.75rem)"
          value="DELETE"
          onClick={onClick}
          solutionLength={solution.length}
        >
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
