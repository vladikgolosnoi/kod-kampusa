import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'error'
  topMost?: boolean
}

export const Alert = ({
  isOpen,
  message,
  variant = 'error',
  topMost = false,
}: Props) => {
  const classes = classNames(
    'fixed left-1/2 top-8 z-20 max-w-sm -translate-x-1/2 overflow-hidden rounded-full shadow-[0_20px_50px_rgba(14,35,56,0.18)] pointer-events-auto ring-1 ring-black/5',
    {
      'bg-[#ff7d6b] text-white': variant === 'error',
      'bg-[#14263c] text-white': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="px-5 py-3">
          <p className="text-center text-sm font-medium tracking-[0.02em]">
            {message}
          </p>
        </div>
      </div>
    </Transition>
  )
}
