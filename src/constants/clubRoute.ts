export type ClubTrack = 'ai' | 'networks' | 'security'

export type ClubMission = {
  id: string
  word: string
  eyebrow: string
  title: string
  clue: string
  helper: string
  summary: string
  clubNote: string
  track: ClubTrack
  accentClass: string
}

export type TrackProfile = {
  track: ClubTrack | 'generalist'
  label: string
  title: string
  description: string
  action: string
}

export type ClubRouteHistory = Record<ClubTrack, string[]>

const routeHistoryKey = 'clubRouteHistory'

const TRACKS: ClubTrack[] = ['ai', 'networks', 'security']

const createHistory = (): ClubRouteHistory => ({
  ai: [],
  networks: [],
  security: [],
})

const normalizeHistory = (value: unknown): ClubRouteHistory => {
  const fallback = createHistory()

  if (!value || typeof value !== 'object') {
    return fallback
  }

  return TRACKS.reduce((history, track) => {
    const rawTrackHistory = (value as Record<string, unknown>)[track]
    history[track] = Array.isArray(rawTrackHistory)
      ? rawTrackHistory.filter(
          (missionId): missionId is string => typeof missionId === 'string'
        )
      : []
    return history
  }, fallback)
}

const accentByTrack: Record<ClubTrack, string> = {
  ai: 'from-[#12b5cb] to-[#71e5d1]',
  networks: 'from-[#4f74ff] to-[#8cc4ff]',
  security: 'from-[#ff8a5b] to-[#ffd166]',
}

const eyebrowByTrack: Record<ClubTrack, string> = {
  ai: 'AI и цифровые продукты',
  networks: 'Сети и телеком',
  security: 'Цифровая защита',
}

const mission = (
  track: ClubTrack,
  id: string,
  word: string,
  title: string,
  clue: string,
  helper: string,
  summary: string,
  clubNote: string
): ClubMission => ({
  id,
  word,
  title,
  clue,
  helper,
  summary,
  clubNote,
  track,
  eyebrow: eyebrowByTrack[track],
  accentClass: accentByTrack[track],
})

export const CLUB_MISSION_LIBRARY: Record<ClubTrack, ClubMission[]> = {
  ai: [
    mission(
      'ai',
      'robot',
      'РОБОТ',
      'Разбуди лабораторию',
      'Умная машина, которая выполняет команды и помогает человеку.',
      'С таких устройств многие впервые знакомятся с автоматикой и AI.',
      'Это миссия про умные системы, автоматику и продукты, которые умеют реагировать на человека.',
      'В клубе такие идеи быстро превращаются в демо, прототипы и интерактивные стенды.'
    ),
    mission(
      'ai',
      'neyro',
      'НЕЙРО',
      'Поймай идею нейросети',
      'Короткое слово, которым часто называют всё, что связано с нейросетями и генерацией.',
      'Его часто слышно рядом со словами «чат», «картинка» и «модель».',
      'Здесь начинается разговор про нейросети, генеративные сервисы и цифровые ассистенты.',
      'Для клуба это удобная точка входа в проекты про AI, тексты, изображения и автоматизацию.'
    ),
    mission(
      'ai',
      'drony',
      'ДРОНЫ',
      'Запусти автопилот',
      'Летающие устройства, которые могут снимать, искать объекты и идти по маршруту.',
      'Здесь вместе работают код, датчики и управление.',
      'Миссия связывает программирование с реальным железом, маршрутами и умной автоматикой.',
      'Такие темы отлично смотрятся на дне открытых дверей, потому что их легко показать вживую.'
    ),
    mission(
      'ai',
      'avatar',
      'АВАТАР',
      'Собери цифровой образ',
      'Образ пользователя в игре, приложении или онлайн-сервисе.',
      'Его выбирают, когда хотят показать себя в цифровой среде.',
      'Здесь в центре внимания интерфейсы, цифровые персонажи и продукты, которыми хочется пользоваться.',
      'В клубе это можно развивать в игровые, образовательные и медиапроекты.'
    ),
    mission(
      'ai',
      'poisk',
      'ПОИСК',
      'Найди нужный ответ',
      'То, с чего чаще всего начинается путь к информации в интернете.',
      'Умные алгоритмы делают этот процесс быстрым и точным.',
      'Эта миссия про то, как технологии помогают быстро находить, ранжировать и подсказывать нужное.',
      'Из таких идей вырастают сервисы, боты и полезные продукты для людей.'
    ),
    mission(
      'ai',
      'koder',
      'КОДЕР',
      'Собери прототип',
      'Так в разговорной речи называют человека, который превращает идеи в работающий код.',
      'Без таких людей не обходится ни один цифровой проект.',
      'Это маршрут про создание продукта руками: от мысли до живого экрана или сервиса.',
      'В клубе именно на таких ролях держатся хакатоны, мини-приложения и клубные демо.'
    ),
  ],
  networks: [
    mission(
      'networks',
      'modem',
      'МОДЕМ',
      'Подними связь',
      'Устройство, через которое дом, аудитория или ноутбук получают интернет.',
      'Это слово знакомо даже тем, кто просто настраивал Wi-Fi дома.',
      'Здесь начинается мир сетей, связи, маршрутов и цифровой инфраструктуры.',
      'Такие темы легко превращаются в наглядный стенд про телеком, интернет и умный кампус.'
    ),
    mission(
      'networks',
      'kabel',
      'КАБЕЛЬ',
      'Проведи линию',
      'Провод, по которому техника получает сигнал, интернет или передаёт данные.',
      'Иногда именно он незаметно держит всю систему в рабочем состоянии.',
      'Эта миссия про физическую сторону сетей: как устройства вообще соединяются друг с другом.',
      'На дне открытых дверей такие вещи хорошо показывают связь между техникой и цифровыми сервисами.'
    ),
    mission(
      'networks',
      'kanal',
      'КАНАЛ',
      'Открой маршрут сигнала',
      'Путь, по которому проходит сигнал, звук, видео или сетевой трафик.',
      'Это слово встречается и в связи, и в медиа, и в телеком-системах.',
      'Здесь важно понять, что цифровой мир держится на правильно настроенных маршрутах передачи.',
      'В клубе на этой базе можно собирать проекты про связь, стриминг и обмен данными.'
    ),
    mission(
      'networks',
      'domen',
      'ДОМЕН',
      'Найди адрес сайта',
      'Имя сайта в интернете, которое проще запомнить, чем набор цифр.',
      'Его набирают в адресной строке, когда хотят попасть на нужный ресурс.',
      'Миссия знакомит с тем, как веб связывает людей, сервисы и сетевую инфраструктуру.',
      'Это хороший вход в темы сайтов, веб-платформ и цифровых сервисов для клуба.'
    ),
    mission(
      'networks',
      'paket',
      'ПАКЕТ',
      'Отправь данные',
      'Так называют порцию данных, которая путешествует по сети от устройства к устройству.',
      'Обычное слово, но в сетях у него специальная роль.',
      'Здесь раскрывается идея, что интернет работает не магией, а последовательной передачей данных.',
      'Такие объяснения хорошо заходят на стендах, где нужно быстро и понятно показать основы сетей.'
    ),
    mission(
      'networks',
      'server',
      'СЕРВЕР',
      'Подними систему',
      'Компьютер или сервис, который хранит данные и отвечает на запросы других устройств.',
      'На нём могут жить сайты, приложения и целые платформы.',
      'Это миссия про инфраструктуру, которая незаметно держит на себе цифровые сервисы.',
      'В IT-клубе такие темы можно показать через веб-проекты, базы данных и реальные сервисы.'
    ),
  ],
  security: [
    mission(
      'security',
      'login',
      'ЛОГИН',
      'Открой доступ',
      'Имя, с которого начинается вход в личный кабинет, сервис или учебную систему.',
      'Если знаешь, как начинается безопасный вход, ты уже думаешь как человек из инфобеза.',
      'Эта миссия про цифровую идентичность, доступ и базовые правила защиты аккаунтов.',
      'В клубе из таких простых вещей быстро вырастают кейсы про права доступа и безопасность сервисов.'
    ),
    mission(
      'security',
      'parol',
      'ПАРОЛЬ',
      'Поставь защиту',
      'Секретное слово или набор символов, который нужен для входа в аккаунт.',
      'Его знают все, кто хоть раз регистрировался в сервисе.',
      'Здесь начинается разговор про защиту личных данных и привычки цифровой безопасности.',
      'Для клуба это удобная тема, чтобы объяснять инфобез не страшно, а понятно и жизненно.'
    ),
    mission(
      'security',
      'token',
      'ТОКЕН',
      'Подтверди вход',
      'Код или цифровой ключ, который помогает подтвердить личность пользователя.',
      'Его можно увидеть в приложении, сообщении или внутри сервиса.',
      'Миссия показывает, что современная защита строится не на одном слове, а на нескольких уровнях проверки.',
      'Такие механики легко превратить в интерактивные задания и мини-квесты на стенде клуба.'
    ),
    mission(
      'security',
      'virus',
      'ВИРУС',
      'Очисти систему',
      'Программа, которая мешает устройству работать нормально и может вредить данным.',
      'Её боятся и школьники, и админы.',
      'Это маршрут про угрозы, от которых цифровую среду приходится защищать каждый день.',
      'В клубе такая тема хорошо работает через наглядные разборы и игровые форматы.'
    ),
    mission(
      'security',
      'vzlom',
      'ВЗЛОМ',
      'Останови атаку',
      'Получение доступа к аккаунту или системе без разрешения владельца.',
      'Про это часто говорят в новостях про кибербезопасность.',
      'Здесь на первом плане внимательность, проверка доступа и умение думать на шаг вперёд.',
      'Из этой темы легко вырастают интересные клубные задания про защиту и анализ уязвимостей.'
    ),
    mission(
      'security',
      'dostup',
      'ДОСТУП',
      'Настрой права',
      'Возможность войти в систему, файл или сервис и работать с ними.',
      'Если он выдан неверно, начинаются проблемы с безопасностью.',
      'Миссия показывает, что инфобез часто начинается не со сложной атаки, а с правильных настроек.',
      'В клубе это можно связать с реальными кейсами про аккаунты, роли и безопасную работу сервисов.'
    ),
  ],
}

export const getMissionPoolSize = () =>
  Object.values(CLUB_MISSION_LIBRARY).reduce(
    (total, missions) => total + missions.length,
    0
  )

const cloneHistory = (history: ClubRouteHistory): ClubRouteHistory => ({
  ai: [...history.ai],
  networks: [...history.networks],
  security: [...history.security],
})

const pickRandomItem = <T,>(items: T[], random: () => number) => {
  const index = Math.floor(random() * items.length)
  return items[index]
}

const shuffleItems = <T,>(items: T[], random: () => number) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

const consumeTrackMission = (
  track: ClubTrack,
  history: ClubRouteHistory,
  random: () => number
) => {
  const trackHistory = history[track]
  const pool = CLUB_MISSION_LIBRARY[track]
  const availableMissions = pool.filter(
    (mission) => !trackHistory.includes(mission.id)
  )
  const source = availableMissions.length > 0 ? availableMissions : pool
  const selectedMission = pickRandomItem(source, random)

  history[track] = availableMissions.length > 0
    ? [...trackHistory, selectedMission.id]
    : [selectedMission.id]

  return selectedMission
}

export const buildClubRoute = (
  history: ClubRouteHistory = createHistory(),
  random: () => number = Math.random
) => {
  const nextHistory = cloneHistory(history)
  const route = TRACKS.map((track) =>
    consumeTrackMission(track, nextHistory, random)
  )

  return {
    route: shuffleItems(route, random),
    history: nextHistory,
  }
}

const readRouteHistory = () => {
  if (typeof window === 'undefined') {
    return createHistory()
  }

  try {
    const rawHistory = localStorage.getItem(routeHistoryKey)
    return normalizeHistory(rawHistory ? JSON.parse(rawHistory) : null)
  } catch (error) {
    console.warn(error)
    return createHistory()
  }
}

const writeRouteHistory = (history: ClubRouteHistory) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(routeHistoryKey, JSON.stringify(history))
}

export const getNextClubRoute = (random: () => number = Math.random) => {
  const { route, history } = buildClubRoute(readRouteHistory(), random)
  writeRouteHistory(history)
  return route
}

export const TRACK_PROFILES: TrackProfile[] = [
  {
    track: 'ai',
    label: 'AI',
    title: 'Твой трек: AI и умные продукты',
    description:
      'Тебя цепляют идеи, где технологии взаимодействуют с человеком: боты, автоматизация, генерация и цифровые сервисы.',
    action: 'Подойди к зоне клуба, где показывают AI, приложения и программные проекты.',
  },
  {
    track: 'networks',
    label: 'Сети',
    title: 'Твой трек: сети и телеком',
    description:
      'Тебе ближе инфраструктура, интернет и связь. Это направление про то, как цифровой мир работает под капотом.',
    action: 'Ищи стенд, где рассказывают про телеком, сети, веб и связь в реальных системах.',
  },
  {
    track: 'security',
    label: 'Кибер',
    title: 'Твой трек: цифровая защита',
    description:
      'Ты быстро считываешь темы про доступ, безопасность и надёжность. Это хороший вход в мир инфобеза.',
    action: 'Загляни к ребятам, которые показывают кейсы по защите данных, доступу и кибербезопасности.',
  },
  {
    track: 'generalist',
    label: 'Mix',
    title: 'Твой трек: универсал IT-клуба',
    description:
      'Ты одинаково уверенно прошёл разные темы. Значит, тебе подойдёт формат клуба, где можно попробовать всё понемногу.',
    action: 'Начни с общего стенда клуба и выбери, какой проект хочется потрогать первым.',
  },
]
