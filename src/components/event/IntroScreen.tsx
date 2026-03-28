import { ClubMission } from '../../constants/clubRoute'

type Props = {
  missions: ClubMission[]
  poolSize: number
  onStart: () => void
}

export const IntroScreen = ({ missions, poolSize, onStart }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_30px_80px_rgba(14,35,56,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 sm:p-8">
      <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200">
        День открытых дверей · IT-клуб
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="brand-title max-w-xl text-4xl leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Найди свой IT-трек за 3 быстрые миссии
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Это короткая игра на 3-5 минут. Никакого сложного айтишного жаргона:
            только знакомые слова, одна бесплатная подсказка в каждой миссии и
            финальный результат, который подскажет, с чего начать знакомство с
            клубом.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-200">
            <div className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white dark:bg-teal-500 dark:text-slate-950">
              3 миссии подряд
            </div>
            <div className="rounded-full bg-white px-4 py-2 font-medium shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-white/10">
              1 подсказка на раунд
            </div>
            <div className="rounded-full bg-white px-4 py-2 font-medium shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-white/10">
              Финальный профиль трека
            </div>
            <div className="rounded-full bg-white px-4 py-2 font-medium shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-white/10">
              {poolSize} миссий в ротации
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            При каждом новом прохождении маршрут собирается заново, поэтому
            слова и подсказки меняются и не повторяются, пока не закончится
            весь пул.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-8 inline-flex items-center rounded-full bg-slate-900 px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
          >
            Начать маршрут
          </button>
        </div>
        <div className="grid gap-3">
          {missions.map((mission, index) => (
            <div
              key={mission.id}
              className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/80"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-400">
                  {mission.eyebrow}
                </div>
                <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800/90 dark:text-slate-200">
                  {index + 1}/3
                </div>
              </div>
              <div
                className={`mt-3 h-2 rounded-full bg-gradient-to-r ${mission.accentClass}`}
              />
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                {mission.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {mission.clue}
              </p>
              <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800/90 dark:text-slate-200">
                Слово из {mission.word.length} букв
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
