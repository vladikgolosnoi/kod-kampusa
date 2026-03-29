import { CogIcon, InformationCircleIcon } from '@heroicons/react/outline'

import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="mb-6">
      <div className="dark:bg-slate-950/95 flex items-center justify-between rounded-full border border-white/60 bg-white/70 px-4 py-3 shadow-[0_20px_50px_rgba(14,35,56,0.1)] backdrop-blur-xl dark:border-white/10">
        <div className="flex">
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer stroke-slate-700 transition hover:scale-110 dark:stroke-slate-200"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-200 sm:inline-flex">
            SKF MTUCI · IT-клуб
          </div>
          <p className="brand-title text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            {GAME_TITLE}
          </p>
        </div>
        <div className="flex">
          <CogIcon
            className="h-6 w-6 cursor-pointer stroke-slate-700 transition hover:scale-110 dark:stroke-slate-200"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
    </div>
  )
}
