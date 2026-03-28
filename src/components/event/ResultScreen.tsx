import { ClubMission, TrackProfile } from '../../constants/clubRoute'

export type MissionResult = {
  missionId: string
  track: ClubMission['track']
  solved: boolean
  attempts: number
  usedHint: boolean
}

type Props = {
  missions: ClubMission[]
  results: MissionResult[]
  profile: TrackProfile
  onRestart: () => void
  onShare: () => void
}

export const ResultScreen = ({
  missions,
  results,
  profile,
  onRestart,
  onShare,
}: Props) => {
  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_30px_80px_rgba(14,35,56,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 sm:p-8">
      <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
        Маршрут завершён
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-400">
            {profile.label}
          </div>
          <h2 className="brand-title mt-3 text-4xl leading-tight text-slate-900 dark:text-white sm:text-5xl">
            {profile.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {profile.description}
          </p>
          <div className="mt-6 rounded-[1.5rem] bg-slate-900 px-5 py-4 text-sm leading-7 text-slate-100 dark:bg-slate-950/90 dark:text-slate-100">
            {profile.action}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
            >
              Пройти новый маршрут
            </button>
            <button
              type="button"
              onClick={onShare}
              className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-100 dark:hover:bg-slate-900/95"
            >
              Скопировать результат
            </button>
            <a
              href="https://skf.mtuci.ru/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-100 dark:hover:bg-slate-900/95"
            >
              Сайт СКФ МТУСИ
            </a>
          </div>
        </div>
        <div className="grid gap-3">
          {missions.map((mission) => {
            const result = results.find((item) => item.missionId === mission.id)

            return (
              <div
                key={mission.id}
                className="rounded-[1.5rem] border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950/90"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-400">
                      {mission.eyebrow}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                      {mission.word}
                    </div>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-200">
                    {result?.solved ? 'Пройдено' : 'Разобрано'}
                  </div>
                </div>
                <div
                  className={`mt-3 h-2 rounded-full bg-gradient-to-r ${mission.accentClass}`}
                />
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="rounded-2xl bg-slate-50 px-3 py-3 dark:bg-slate-900/95">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-400">
                      Попытки
                    </div>
                    <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                      {result?.attempts ?? '-'}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-3 dark:bg-slate-900/95">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-400">
                      Подсказка
                    </div>
                    <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                      {result?.usedHint ? 'Да' : 'Нет'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
