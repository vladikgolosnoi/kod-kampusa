import './App.css'

import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'

import { AlertContainer } from './components/alerts/AlertContainer'
import { IntroScreen } from './components/event/IntroScreen'
import { MissionCheckpointModal } from './components/event/MissionCheckpointModal'
import { MissionResult, ResultScreen } from './components/event/ResultScreen'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { Navbar } from './components/navbar/Navbar'
import {
  ClubMission,
  TRACK_PROFILES,
  getMissionPoolSize,
  getNextClubRoute,
} from './constants/clubRoute'
import {
  DISCOURAGE_INAPP_BROWSERS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
} from './constants/settings'
import {
  DISCOURAGE_INAPP_BROWSER_TEXT,
  GAME_COPIED_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
} from './constants/strings'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import { copyTextToClipboard } from './lib/clipboard'
import {
  getStoredIsHighContrastMode,
  setStoredIsHighContrastMode,
} from './lib/localStorage'
import {
  findFirstUnusedReveal,
  isWinningWord,
  isWordInWordList,
  unicodeLength,
} from './lib/words'

type Phase = 'intro' | 'playing' | 'checkpoint' | 'result'

const getRouteProfile = (results: MissionResult[]) => {
  const scores = {
    ai: 0,
    networks: 0,
    security: 0,
  }

  results.forEach((result) => {
    let points = result.solved ? Math.max(1, 7 - result.attempts) : 1
    if (result.usedHint) {
      points = Math.max(0, points - 1)
    }
    scores[result.track] += points
  })

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const isTie =
    ranked.length > 1 && ranked[0][1] === ranked[1][1] && ranked[0][1] > 0

  if (isTie || ranked[0][1] === 0) {
    return TRACK_PROFILES.find((item) => item.track === 'generalist')!
  }

  return TRACK_PROFILES.find((item) => item.track === ranked[0][0])!
}

function App() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [route, setRoute] = useState<ClubMission[]>(() => getNextClubRoute())
  const [missionIndex, setMissionIndex] = useState(0)
  const [missionResults, setMissionResults] = useState<MissionResult[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<string[]>([])
  const [usedHint, setUsedHint] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [checkpoint, setCheckpoint] = useState<{
    solved: boolean
    attempts: number
    usedHint: boolean
  } | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  const {
    hideAlert,
    showError: showErrorAlert,
    showSuccess: showSuccessAlert,
  } = useAlert()

  const currentMission = route[missionIndex]
  const solution = currentMission.word
  const isPlaying = phase === 'playing'
  const currentMissionTitle = `Миссия ${missionIndex + 1}. ${
    currentMission.title
  }`
  const wordMask = Array.from(solution)
    .map(() => '●')
    .join(' ')

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  const resetRoundState = () => {
    setCurrentGuess('')
    setGuesses([])
    setUsedHint(false)
    setCurrentRowClass('')
    setIsRevealing(false)
    setCheckpoint(null)
  }

  const startRoute = () => {
    hideAlert()
    if (phase === 'result') {
      setRoute(getNextClubRoute())
    }
    setMissionResults([])
    setMissionIndex(0)
    resetRoundState()
    setPhase('playing')
  }

  const moveToNextMission = () => {
    hideAlert()
    if (missionIndex === route.length - 1) {
      setCheckpoint(null)
      setPhase('result')
      return
    }

    setMissionIndex((value) => value + 1)
    resetRoundState()
    setPhase('playing')
  }

  const storeMissionResult = (solved: boolean, attempts: number) => {
    const nextResult: MissionResult = {
      missionId: currentMission.id,
      track: currentMission.track,
      solved,
      attempts,
      usedHint,
    }
    const nextResults = [
      ...missionResults.filter((item) => item.missionId !== currentMission.id),
      nextResult,
    ]

    setMissionResults(nextResults)
    setCheckpoint({
      solved,
      attempts,
      usedHint,
    })

    if (missionIndex === route.length - 1) {
      setPhase('result')
      return
    }

    setPhase('checkpoint')
  }

  const handleHint = () => {
    if (!isPlaying || usedHint) {
      return
    }

    setUsedHint(true)
    showSuccessAlert(`Подсказка: слово начинается на «${solution[0]}»`)
  }

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const onChar = (value: string) => {
    if (
      !isPlaying ||
      isRevealing ||
      unicodeLength(`${currentGuess}${value}`) > solution.length ||
      guesses.length >= MAX_CHALLENGES
    ) {
      return
    }

    setCurrentGuess(`${currentGuess}${value}`)
  }

  const onDelete = () => {
    if (!isPlaying || isRevealing) {
      return
    }

    setCurrentGuess((value) => value.slice(0, -1))
  }

  const onSetGuess = (value: string) => {
    if (
      !isPlaying ||
      isRevealing ||
      guesses.length >= MAX_CHALLENGES ||
      unicodeLength(value) > solution.length
    ) {
      return
    }

    setCurrentGuess(value)
  }

  const onEnter = () => {
    if (!isPlaying || isRevealing) {
      return
    }

    if (unicodeLength(currentGuess) !== solution.length) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(
        solution,
        currentGuess,
        guesses
      )
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    const nextGuesses = [...guesses, currentGuess]
    const winningWord = isWinningWord(solution, currentGuess)
    const isLastAttempt = nextGuesses.length === MAX_CHALLENGES
    const revealDelayMs = REVEAL_TIME_MS * solution.length

    setGuesses(nextGuesses)
    setCurrentGuess('')
    setIsRevealing(true)

    window.setTimeout(() => {
      setIsRevealing(false)

      if (winningWord) {
        storeMissionResult(true, nextGuesses.length)
        return
      }

      if (isLastAttempt) {
        storeMissionResult(false, nextGuesses.length)
      }
    }, revealDelayMs + 120)
  }

  const handleShareProfile = () => {
    const profile = getRouteProfile(missionResults)
    const solvedCount = missionResults.filter((item) => item.solved).length
    copyTextToClipboard(
      `Я прошёл маршрут «${'Код Кампуса'}» в СКФ МТУСИ. Мой результат: ${
        profile.title
      }. Пройдено миссий: ${solvedCount}/3.`
    )
    showSuccessAlert(GAME_COPIED_MESSAGE)
  }

  return (
    <Div100vh>
      <div className="event-shell min-h-full">
        <div className="event-orb event-orb-a" />
        <div className="event-orb event-orb-b" />
        <div className="event-orb event-orb-c" />
        <div className="event-frame mx-auto flex min-h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <Navbar
            setIsInfoModalOpen={setIsInfoModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />

          <main className="flex grow flex-col justify-start pb-6 pt-2 lg:justify-center">
            {phase === 'intro' && (
              <IntroScreen
                missions={route}
                poolSize={getMissionPoolSize()}
                onStart={startRoute}
              />
            )}

            {phase === 'result' && (
              <ResultScreen
                missions={route}
                results={missionResults}
                profile={getRouteProfile(missionResults)}
                onRestart={startRoute}
                onShare={handleShareProfile}
              />
            )}

            {(phase === 'playing' || phase === 'checkpoint') && (
              <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:gap-6">
                <section className="relative hidden min-w-0 overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-[0_30px_80px_rgba(14,35,56,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 lg:block lg:p-6">
                  <div
                    className={`absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r ${currentMission.accentClass}`}
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="dark:text-slate-950 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white dark:bg-teal-500">
                      Маршрут {missionIndex + 1}/3
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-200">
                      {currentMission.eyebrow}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-2">
                    {route.map((mission, index) => (
                      <div
                        key={mission.id}
                        className={`h-2 flex-1 rounded-full ${
                          index < missionIndex
                            ? 'bg-slate-900'
                            : index === missionIndex
                            ? `bg-gradient-to-r ${mission.accentClass}`
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                      {currentMissionTitle}
                    </div>
                    <h1 className="brand-title mt-3 text-3xl leading-tight text-slate-900 dark:text-white sm:text-4xl">
                      Найди слово
                    </h1>
                    <div className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 font-mono text-sm font-semibold tracking-[0.35em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-200">
                      {wordMask}
                    </div>
                    <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
                      {currentMission.clue}
                    </p>
                    <p className="mt-4 rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 dark:bg-slate-900/80 dark:text-slate-300">
                      {currentMission.helper}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-slate-900/80">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                        Попытки
                      </div>
                      <div className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                        {guesses.length}/{MAX_CHALLENGES}
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-slate-900/80">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                        Подсказка
                      </div>
                      <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                        {usedHint
                          ? `Первая буква: ${solution[0]}`
                          : 'Ещё не открыта'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleHint}
                      disabled={usedHint || !isPlaying}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800/90 sm:flex-none"
                    >
                      Открыть первую букву
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsInfoModalOpen(true)}
                      className="dark:text-slate-950 inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-400 sm:flex-none"
                    >
                      Как это работает
                    </button>
                  </div>
                </section>

                <section className="min-w-0 overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-3 shadow-[0_30px_80px_rgba(14,35,56,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 sm:p-6 lg:order-2">
                  <div className="mb-5 lg:hidden">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="dark:text-slate-950 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white dark:bg-teal-500">
                        Маршрут {missionIndex + 1}/3
                      </div>
                      <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-200">
                        {currentMission.eyebrow}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {route.map((mission, index) => (
                        <div
                          key={mission.id}
                          className={`h-2 flex-1 rounded-full ${
                            index < missionIndex
                              ? 'bg-slate-900'
                              : index === missionIndex
                              ? `bg-gradient-to-r ${mission.accentClass}`
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                      {currentMissionTitle}
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-3">
                      <h1 className="brand-title text-3xl leading-tight text-slate-900 dark:text-white">
                        Найди слово
                      </h1>
                      <div className="shrink-0 rounded-full bg-slate-100 px-3 py-2 font-mono text-xs font-semibold tracking-[0.32em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-200">
                        {wordMask}
                      </div>
                    </div>
                    <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-200">
                      {currentMission.clue}
                    </p>
                    <p className="mt-3 rounded-[1.25rem] bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 dark:bg-slate-900/80 dark:text-slate-300">
                      {currentMission.helper}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900/80">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                          Попытки
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                          {guesses.length}/{MAX_CHALLENGES}
                        </div>
                      </div>
                      <div className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900/80">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                          Подсказка
                        </div>
                        <div className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                          {usedHint
                            ? `Первая буква: ${solution[0]}`
                            : 'Ещё не открыта'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={handleHint}
                        disabled={usedHint || !isPlaying}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800/90"
                      >
                        Открыть первую букву
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsInfoModalOpen(true)}
                        className="dark:text-slate-950 inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-400"
                      >
                        Как играть
                      </button>
                    </div>
                  </div>
                  <div className="grid-board-shell mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[32rem]">
                    <div className="mobile-board-stage flex flex-col justify-between gap-4 sm:min-h-[520px]">
                      <div className="flex grow flex-col justify-center pb-6">
                        <Grid
                          solution={solution}
                          guesses={guesses}
                          currentGuess={currentGuess}
                          isRevealing={isRevealing}
                          currentRowClassName={currentRowClass}
                        />
                      </div>
                      <Keyboard
                        onChar={onChar}
                        onDelete={onDelete}
                        onEnter={onEnter}
                        onSetGuess={onSetGuess}
                        currentGuess={currentGuess}
                        solution={solution}
                        guesses={guesses}
                        isRevealing={isRevealing}
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>

        <MissionCheckpointModal
          isOpen={phase === 'checkpoint'}
          mission={phase === 'checkpoint' ? currentMission : null}
          solved={checkpoint?.solved ?? false}
          attempts={checkpoint?.attempts ?? guesses.length}
          usedHint={checkpoint?.usedHint ?? usedHint}
          isLastMission={missionIndex === route.length - 1}
          handleClose={moveToNextMission}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isHardMode={isHardMode}
          handleHardMode={handleHardMode}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
        />
        <AlertContainer />
      </div>
    </Div100vh>
  )
}

export default App
