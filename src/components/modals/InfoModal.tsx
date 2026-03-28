import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Как пройти маршрут" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        В игре 3 короткие миссии по темам IT-клуба. В каждой миссии нужно
        угадать слово максимум за 6 попыток. Маршрут меняется при каждом новом
        прохождении, поэтому слова и подсказки ротируются.
      </p>

      <div className="mb-1 mt-5 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="Н"
          status="correct"
        />
        <Cell value="А" isCompleted={true} />
        <Cell value="У" isCompleted={true} />
        <Cell value="К" isCompleted={true} />
        <Cell value="А" isCompleted={true} />
      </div>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        Бирюзовая клетка: буква есть в слове и стоит на своём месте.
      </p>

      <div className="mb-1 mt-5 flex justify-center">
        <Cell value="П" isCompleted={true} />
        <Cell value="И" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="Т"
          status="present"
        />
        <Cell value="О" isCompleted={true} />
        <Cell value="Н" isCompleted={true} />
      </div>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        Жёлтая клетка: буква есть в слове, но пока стоит не там.
      </p>

      <div className="mb-1 mt-5 flex justify-center">
        <Cell value="Ф" isCompleted={true} />
        <Cell value="О" isCompleted={true} />
        <Cell value="Р" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="У" status="absent" />
        <Cell value="М" isCompleted={true} />
      </div>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        Серо-синяя клетка: такой буквы в ответе нет.
      </p>

      <p className="mt-6 text-sm italic leading-7 text-slate-600 dark:text-slate-400">
        В каждой миссии можно открыть первую букву. Даже если не угадали слово,
        маршрут всё равно продолжится, а в финале игра покажет, какой IT-трек
        вам ближе.
      </p>
    </BaseModal>
  )
}
