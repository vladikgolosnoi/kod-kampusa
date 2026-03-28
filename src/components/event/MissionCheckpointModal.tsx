import { ClubMission } from '../../constants/clubRoute'
import { BaseModal } from '../modals/BaseModal'

type Props = {
  isOpen: boolean
  mission: ClubMission | null
  solved: boolean
  attempts: number
  usedHint: boolean
  isLastMission: boolean
  handleClose: () => void
}

export const MissionCheckpointModal = ({
  isOpen,
  mission,
  solved,
  attempts,
  usedHint,
  isLastMission,
  handleClose,
}: Props) => {
  if (!mission) {
    return null
  }

  const title = solved ? 'Миссия пройдена' : 'Разведка завершена'
  const buttonText = isLastMission ? 'Смотреть результат' : 'К следующей миссии'

  return (
    <BaseModal title={title} isOpen={isOpen} handleClose={handleClose}>
      <div className="text-left">
        <div
          className={`mb-4 h-2 rounded-full bg-gradient-to-r ${mission.accentClass}`}
        />
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
          {mission.eyebrow}
        </div>
        <h4 className="text-2xl font-semibold text-slate-900 dark:text-white">{mission.word}</h4>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{mission.summary}</p>
        <p className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600 dark:bg-slate-900/95 dark:text-slate-300">
          {mission.clubNote}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900/95">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-400">
              Попытки
            </div>
            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              {attempts}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900/95">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-400">
              Подсказка
            </div>
            <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              {usedHint ? 'Да' : 'Нет'}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
        >
          {buttonText}
        </button>
      </div>
    </BaseModal>
  )
}
