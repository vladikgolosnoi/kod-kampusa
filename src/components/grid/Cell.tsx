import classnames from 'classnames'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'xxshort:h-11 xxshort:w-11 short:h-12 short:w-12 mx-1 flex h-14 w-14 items-center justify-center rounded-[1.1rem] border-2 text-3xl font-bold shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition-colors duration-200 dark:text-white sm:h-16 sm:w-16 sm:text-4xl',
    {
      'border-white/70 bg-white/90 text-slate-900 dark:border-slate-700 dark:bg-slate-900':
        !status,
      'border-slate-700 dark:border-slate-100': value && !status,
      'absent bg-slate-400 text-white border-slate-400 dark:bg-slate-700 dark:border-slate-700':
        status === 'absent',
      'correct bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct bg-teal-500 text-white border-teal-500':
        status === 'correct' && !isHighContrast,
      'present bg-amber-400 text-slate-900 border-amber-400':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
