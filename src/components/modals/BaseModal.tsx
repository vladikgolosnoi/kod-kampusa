import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

type Props = {
  title: string
  children: React.ReactNode
  isOpen: boolean
  handleClose: () => void
}

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-full items-center justify-center px-4 py-6 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-slate-950/60 dark:bg-slate-950/80 fixed inset-0 min-h-screen backdrop-blur-sm transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block max-h-[calc(100dvh-2rem)] transform overflow-y-auto overflow-x-hidden rounded-[2rem] border border-slate-200 bg-white px-5 pb-5 pt-6 text-left align-bottom shadow-[0_30px_80px_rgba(14,35,56,0.18)] backdrop-blur-xl transition-all dark:border-white/10 dark:bg-slate-900 sm:my-8 sm:max-h-[min(90vh,48rem)] sm:w-full sm:max-w-lg sm:p-7 sm:align-middle">
              <button
                onClick={() => handleClose()}
                tabIndex={0}
                aria-pressed="false"
                className="absolute right-4 top-4 rounded-full text-slate-400 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              >
                <XCircleIcon className="h-7 w-7 cursor-pointer stroke-current" />
              </button>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="brand-title text-slate-950 pr-12 text-[clamp(1.75rem,6vw,2rem)] font-medium leading-[1.15] dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-3">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
