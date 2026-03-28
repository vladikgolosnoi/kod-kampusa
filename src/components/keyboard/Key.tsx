import classnames from 'classnames'
import { ReactNode } from 'react'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: string
  width?: number | string
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
  solutionLength: number
}

export const Key = ({
  children,
  status,
  width = 'clamp(1.35rem, 6.4vw, 2.5rem)',
  value,
  onClick,
  isRevealing,
  solutionLength,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * solutionLength
  const isHighContrast = getStoredIsHighContrastMode()
  const label =
    typeof children === 'string' && children.length > 0 ? children : value
  const statusLabel =
    status === 'correct'
      ? 'на своём месте'
      : status === 'present'
      ? 'есть в слове'
      : status === 'absent'
      ? 'нет в слове'
      : ''

  const classes = classnames(
    'mx-[2px] mb-[4px] flex h-[clamp(2.55rem,9vw,3.5rem)] items-center justify-center rounded-[1rem] border border-transparent px-1 text-[clamp(0.66rem,2.8vw,0.9rem)] font-bold shadow-[0_10px_20px_rgba(15,23,42,0.05)] transition duration-200 cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-100 text-slate-800 hover:-translate-y-0.5 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700':
        !status,
      'bg-slate-400 text-white dark:bg-slate-800': status === 'absent',
      'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
        status === 'correct' && isHighContrast,
      'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white':
        status === 'present' && isHighContrast,
      'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white':
        status === 'correct' && !isHighContrast,
      'bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-900':
        status === 'present' && !isHighContrast,
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: typeof width === 'number' ? `${width}px` : width,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={styles}
      aria-label={`${label}${statusLabel ? ' ' + statusLabel : ''}`}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
