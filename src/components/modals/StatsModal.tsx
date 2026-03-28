import { ArrowRightIcon, ClockIcon, ShareIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'

import {
  DATE_LOCALE,
  ENABLE_MIGRATE_STATS,
} from '../../constants/settings'
import {
  ARCHIVE_GAMEDATE_TEXT,
  CURRENT_ROUND_TEXT,
  GUESS_DISTRIBUTION_TEXT,
  NEXT_WORD_BUTTON_TEXT,
  PRACTICE_MODE_TEXT,
  SHARE_TEXT,
  STATISTICS_TITLE,
} from '../../constants/strings'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { Histogram } from '../stats/Histogram'
import { MigrationIntro } from '../stats/MigrationIntro'
import { StatBar } from '../stats/StatBar'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solutionIndex: number
  solutionGameDate: Date
  isPracticeRound: boolean
  solution: string
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleShareFailure: () => void
  handleMigrateStatsButton: () => void
  handleNextWord: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
  isOpen,
  handleClose,
  solutionIndex,
  solutionGameDate,
  isPracticeRound,
  solution,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleShareFailure,
  handleMigrateStatsButton,
  handleNextWord,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram
        isLatestGame={true}
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 columns-2 items-center items-stretch justify-center text-center dark:text-white sm:mt-6">
          <div className="inline-block w-full text-left">
            <div className="mb-3">
              <h5>{CURRENT_ROUND_TEXT}</h5>
              <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                #{solutionIndex + 1}
              </div>
            </div>
            <div className="mt-2 inline-flex">
              <ClockIcon className="mr-1 mt-2 mt-1 h-5 w-5 stroke-black dark:stroke-white" />
              <div className="mt-1 ml-1 text-center text-sm sm:text-base">
                <strong>
                  {isPracticeRound ? 'Режим' : ARCHIVE_GAMEDATE_TEXT}:
                </strong>
                <br />
                {isPracticeRound
                  ? PRACTICE_MODE_TEXT
                  : format(solutionGameDate, 'd MMMM yyyy', {
                      locale: DATE_LOCALE,
                    })}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:text-base"
              onClick={handleNextWord}
            >
              <ArrowRightIcon className="mr-2 h-6 w-6" />
              {NEXT_WORD_BUTTON_TEXT}
            </button>
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
              onClick={() => {
                shareStatus(
                  solutionIndex,
                  solution,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  handleShareToClipboard,
                  handleShareFailure
                )
              }}
            >
              <ShareIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
              {SHARE_TEXT}
            </button>
          </div>
        </div>
      )}
      {ENABLE_MIGRATE_STATS && (
        <div>
          <hr className="mt-4 -mb-4 border-gray-500" />
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        </div>
      )}
    </BaseModal>
  )
}
