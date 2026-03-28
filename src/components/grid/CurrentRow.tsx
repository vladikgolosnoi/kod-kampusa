import { unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
  solutionLength: number
}

export const CurrentRow = ({ guess, className, solutionLength }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solutionLength - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
