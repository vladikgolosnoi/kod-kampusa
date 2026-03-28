import classnames from 'classnames'

type Props = {
  settingName: string
  flag: boolean
  handleFlag: Function
  description?: string
}

export const SettingsToggle = ({
  settingName,
  flag,
  handleFlag,
  description,
}: Props) => {
  const toggleHolder = classnames(
    'flex h-8 w-14 shrink-0 items-center rounded-full bg-slate-200 p-1 duration-300 ease-in-out cursor-pointer dark:bg-slate-700',
    {
      'bg-teal-500 dark:bg-teal-400': flag,
    }
  )
  const toggleButton = classnames(
    'h-6 w-6 cursor-pointer rounded-full bg-white shadow-md transform duration-300 ease-in-out dark:bg-slate-950',
    {
      'translate-x-6': flag,
    }
  )

  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="mt-1 text-left text-slate-700 dark:text-slate-200">
          <p className="leading-none">{settingName}</p>
          {description && (
            <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        <div className={toggleHolder} onClick={() => handleFlag(!flag)}>
          <div className={toggleButton} />
        </div>
      </div>
    </>
  )
}
