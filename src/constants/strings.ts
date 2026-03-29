export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Отлично!', 'Так держать!', 'Сильная попытка!']
export const GAME_COPIED_MESSAGE = 'Результат скопирован'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Нужно заполнить все клетки'
export const WORD_NOT_FOUND_MESSAGE = 'Такого слова нет в словаре'
export const HARD_MODE_ALERT_MESSAGE =
  'Сложный режим можно включить только в начале игры'
export const HARD_MODE_DESCRIPTION =
  'Все открытые подсказки нужно использовать в следующих попытках'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'Повышенная различимость цветов'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `Загаданное слово: ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Буква ${guess} должна стоять на позиции ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `В слове должна быть буква ${letter}`
export const ENTER_TEXT = 'Ввод'
export const DELETE_TEXT = 'Стереть'
export const STATISTICS_TITLE = 'Статистика'
export const GUESS_DISTRIBUTION_TEXT = 'Распределение попыток'
export const NEW_WORD_TEXT = 'Новое слово через'
export const SHARE_TEXT = 'Поделиться'
export const NEXT_WORD_BUTTON_TEXT = 'Следующее слово'
export const CURRENT_ROUND_TEXT = 'Текущий раунд'
export const PRACTICE_MODE_TEXT = 'Практика'
export const SHARE_FAILURE_TEXT =
  'Не удалось отправить результат. Эта функция работает только в защищённом контексте HTTPS и поддерживается не во всех браузерах.'
export const MIGRATE_BUTTON_TEXT = 'Перенести'
export const MIGRATE_DESCRIPTION_TEXT =
  'Перенесите статистику на другое устройство.'
export const TOTAL_TRIES_TEXT = 'Игр'
export const SUCCESS_RATE_TEXT = 'Процент побед'
export const CURRENT_STREAK_TEXT = 'Текущая серия'
export const BEST_STREAK_TEXT = 'Лучшая серия'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  'Игра открыта во встроенном браузере. Сохранение и отправка результатов могут работать нестабильно, лучше открыть её в обычном браузере.'

export const DATEPICKER_TITLE = 'Выберите дату игры'
export const DATEPICKER_CHOOSE_TEXT = 'Выбрать'
export const DATEPICKER_TODAY_TEXT = 'сегодня'
export const ARCHIVE_GAMEDATE_TEXT = 'Дата игры'
