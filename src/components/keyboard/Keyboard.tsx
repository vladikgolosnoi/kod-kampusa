import { FormEvent, useEffect, useRef } from 'react'

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
  onSetGuess: (value: string) => void
  currentGuess: string
  solution: string
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  onSetGuess,
  currentGuess,
  solution,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const normalizeGuess = (value: string) =>
    Array.from(localeAwareUpperCase(value))
      .filter((char) => ALLOWED_KEYS.has(char))
      .slice(0, solution.length)
      .join('')

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

  const handleMobileInput = (value: string) => {
    onSetGuess(normalizeGuess(value))
  }

  const handleMobileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onEnter()
  }

  return (
    <div className="mx-auto w-full max-w-[30rem]">
      <div className="mb-4 rounded-[1.5rem] border border-slate-200 bg-white/95 p-3 shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mono-label text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Ввод с телефона
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Печатай слово через обычную клавиатуру телефона.
            </p>
          </div>
          <button
            type="button"
            onClick={() => mobileInputRef.current?.focus()}
            className="shrink-0 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Открыть
          </button>
        </div>
        <form className="mt-3" onSubmit={handleMobileSubmit}>
          <input
            ref={mobileInputRef}
            value={currentGuess}
            maxLength={solution.length}
            autoCapitalize="characters"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            enterKeyHint="done"
            placeholder="Введите слово"
            onChange={(event) => handleMobileInput(event.target.value)}
            className="h-14 w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 text-lg font-semibold uppercase tracking-[0.24em] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onDelete}
              className="flex h-12 items-center justify-center rounded-[1rem] border border-slate-200 bg-white text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {DELETE_TEXT}
            </button>
            <button
              type="submit"
              className="flex h-12 items-center justify-center rounded-[1rem] bg-slate-900 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {ENTER_TEXT}
            </button>
          </div>
        </form>
      </div>

      <div className="hidden sm:block">
        <div className="mb-1.5 flex justify-center gap-1">
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
        <div className="mb-1.5 flex justify-center gap-1">
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
        <div className="flex justify-center gap-1">
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
        <div className="mt-1.5 flex justify-center gap-2">
          <Key
            width="clamp(5.2rem, 18vw, 7rem)"
            value="ENTER"
            onClick={onClick}
            solutionLength={solution.length}
          >
            {ENTER_TEXT}
          </Key>
          <Key
            width="clamp(5rem, 17vw, 6rem)"
            value="DELETE"
            onClick={onClick}
            solutionLength={solution.length}
          >
            {DELETE_TEXT}
          </Key>
        </div>
      </div>
    </div>
  )
}
