// LEGO Robotics Lessons - Advanced Module (Lessons 9-12)
import { Lesson } from '@/types/lesson';

export const legoRoboticsLessonsAdvanced: Lesson[] = [
    {
        id: 'lego-lesson-9',
        number: 9,
        title: 'Сложные алгоритмы. PID и перекрёстки',
        description: 'PID-регулятор, конечные автоматы, массивы траекторий',
        level: 'advanced',
        duration: '75 мин',
        sections: [
            {
                id: 'pid',
                title: 'Эволюция регулятора: P → PD → PID',
                blocks: [
                    {
                        type: 'list', ordered: false, items: [
                            'P (Пропорциональный) — реагирует на текущую ошибку',
                            'D (Дифференциальный) — реагирует на скорость изменения ошибки',
                            'I (Интегральный) — реагирует на накопленную ошибку'
                        ]
                    },
                    { type: 'text', content: 'Формула PID: Коррекция = (P × Kp) + (I × Ki) + (D × Kd)' },
                    { type: 'note', variant: 'info', content: 'Начните с Kp=1.0, Ki=0.001, Kd=0.1 и подбирайте.' }
                ]
            },
            {
                id: 'crossroads',
                title: 'Следование по линии с перекрёстками',
                blocks: [
                    { type: 'text', content: 'Проблема: На перекрёстке оба датчика видят чёрное.' },
                    { type: 'heading', level: 3, content: 'Конечный автомат (State Machine)' },
                    {
                        type: 'list', ordered: false, items: [
                            'СЛЕДУЕМ — оба датчика на белом, работает PID',
                            'ЛЕВЫЙ НА ЧЁРНОМ — поворот вправо',
                            'ПРАВЫЙ НА ЧЁРНОМ — поворот влево',
                            'ПЕРЕКРЁСТОК — оба на чёрном: проехать прямо или повернуть'
                        ]
                    }
                ]
            },
            {
                id: 'arrays',
                title: 'Массивы для хранения траекторий',
                blocks: [
                    { type: 'text', content: 'Создайте два массива:' },
                    { type: 'text', content: 'Углы[] = [90, -45, 0, 180]\nДистанции[] = [50, 30, 100, 20]' },
                    { type: 'text', content: 'Программа-интерпретатор: Цикл по элементам, для каждой пары выполняет проехать + повернуть.' },
                    { type: 'note', variant: 'info', content: 'Чтобы изменить маршрут, меняете данные, а не код!' }
                ]
            },
            {
                id: 'odometry',
                title: 'Одометрия (Dead Reckoning)',
                blocks: [
                    { type: 'text', content: 'Расчёт позиции (x, y) на основе энкодеров и гироскопа.' },
                    { type: 'note', variant: 'warning', content: 'Ошибка накапливается. Нужна периодическая коррекция по ориентирам.' }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Счётчик перекрёстков', description: 'Программа с конечным автоматом, считающая перекрёстки' },
            { type: 'task', title: 'Программируемый маршрут', description: 'Система на массивах для прямоугольника и буквы Z' }
        ],
        quiz: [
            { id: 'lq9-1', question: 'Что добавляет D-компонент в PID?', options: ['Скорость', 'Предсказание отклонения', 'Яркость', 'Звук'], correctAnswer: 1, explanation: 'D-компонент реагирует на скорость изменения ошибки, предсказывая отклонение.' },
            { id: 'lq9-2', question: 'Зачем нужен конечный автомат?', options: ['Для красоты', 'Для обработки разных состояний', 'Для ускорения', 'Не нужен'], correctAnswer: 1, explanation: 'Конечный автомат позволяет роботу правильно реагировать в разных ситуациях.' }
        ]
    },
    {
        id: 'lego-lesson-10',
        number: 10,
        title: 'Оптимизация и тайм-менеджмент',
        description: 'Сокращение времени выполнения миссий и планирование заезда',
        level: 'advanced',
        duration: '65 мин',
        sections: [
            {
                id: 'time-analysis',
                title: 'Анализ временных затрат',
                blocks: [
                    { type: 'heading', level: 3, content: 'Пожиратели времени' },
                    {
                        type: 'list', ordered: false, items: [
                            'Избыточная точность: 20% вместо 50%',
                            'Лишние ожидания: wait(0.5) «для уверенности»',
                            'Лишние манёвры: Поворот для выравнивания',
                            'Последовательные действия: Два выезда вместо одного'
                        ]
                    }
                ]
            },
            {
                id: 'optimization',
                title: 'Принципы оптимизации',
                blocks: [
                    {
                        type: 'list', ordered: false, items: [
                            'Диагонали короче «прямоугольного» пути',
                            'Совмещение миссий в одном выезде',
                            'Неполный возврат в базу — ближе к следующей миссии',
                            '«Горячий» старт — движение манипулятора во время езды'
                        ]
                    }
                ]
            },
            {
                id: 'speed-balance',
                title: 'Баланс скорости и точности',
                blocks: [
                    { type: 'heading', level: 3, content: 'Метод «Быстро-Медленно»' },
                    {
                        type: 'list', ordered: false, items: [
                            'Фаза разгона: 60-80%, умеренная точность',
                            'Фаза позиционирования: 20-30%, высокая точность'
                        ]
                    }
                ]
            },
            {
                id: 'state-machine-run',
                title: 'Многоэтапная программа',
                blocks: [
                    { type: 'text', content: 'Одна программа на весь 2,5-минутный раунд вместо отдельных для каждого выезда.' },
                    { type: 'text', content: 'Управление через переменную current_mission_stage.' },
                    { type: 'note', variant: 'info', content: 'Преимущество: Нет пауз на перезагрузку программ.' }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Хронометрист', description: 'Замерьте время 3 миссий, рассчитайте среднее и разброс' },
            { type: 'task', title: 'Оптимизатор выезда', description: 'Сравните время для раздельных и совмещённых выездов' }
        ],
        quiz: [
            { id: 'lq10-1', question: 'Какой путь короче между двумя точками?', options: ['Прямоугольный', 'Диагональный', 'Одинаковый', 'Зависит от робота'], correctAnswer: 1, explanation: 'Диагональ всегда короче «прямоугольного» маршрута (север, потом восток).' },
            { id: 'lq10-2', question: 'Что даёт совмещение миссий?', options: ['Больше баллов', 'Экономию времени', 'Меньше кода', 'Красивый маршрут'], correctAnswer: 1, explanation: 'Совмещение экономит время на возврат в базу и повторный выезд.' }
        ]
    },
    {
        id: 'lego-lesson-11',
        number: 11,
        title: 'PyBricks (Python для LEGO)',
        description: 'Введение в текстовое программирование на Python',
        level: 'advanced',
        duration: '70 мин',
        sections: [
            {
                id: 'why-python',
                title: 'Почему Python?',
                blocks: [
                    {
                        type: 'list', ordered: false, items: [
                            'Читаемость: PID в 20 строк вместо 50 блоков',
                            'Мощность: Словари, классы, математика',
                            'Востребованность: Один из популярнейших языков'
                        ]
                    },
                    { type: 'note', variant: 'info', content: 'PyBricks — специальная версия Python для LEGO хабов.' }
                ]
            },
            {
                id: 'first-program',
                title: 'Первая программа на PyBricks',
                blocks: [
                    {
                        type: 'code', language: 'python', content: `from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Color

hub = PrimeHub()
left_motor = Motor(Port.A)
right_motor = Motor(Port.B)

hub.light.on(Color.GREEN)
hub.speaker.beep()

left_motor.run_time(500, 2000)
right_motor.run_time(500, 2000)` }
                ]
            },
            {
                id: 'drivebase',
                title: 'DriveBase для движения',
                blocks: [
                    {
                        type: 'code', language: 'python', content: `from pybricks.robotics import DriveBase

robot = DriveBase(left_motor, right_motor, 
                  wheel_diameter=56, axle_track=114)

robot.straight(500)  # 500 мм вперёд
robot.turn(90)       # поворот 90°
robot.curve(200, 45) # дуга радиусом 200 мм` }
                ]
            },
            {
                id: 'functions',
                title: 'Функции — аналог My Blocks',
                blocks: [
                    {
                        type: 'code', language: 'python', content: `def turn_gyro(angle, speed=100):
    """Поворот на заданный угол по гироскопу"""
    hub.imu.reset_heading(0)
    while abs(hub.imu.heading()) < abs(angle):
        if angle > 0:
            left_motor.run(speed)
            right_motor.run(-speed)
        else:
            left_motor.run(-speed)
            right_motor.run(speed)
    left_motor.stop()
    right_motor.stop()

# Использование
turn_gyro(90)
turn_gyro(-45)` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Переводчик', description: 'Переведите блочную программу квадрата на Python' },
            { type: 'task', title: 'Библиотека на Python', description: 'Создайте robot_lib.py с drive_cm, turn_gyro, follow_line' }
        ],
        quiz: [
            { id: 'lq11-1', question: 'Что такое PyBricks?', options: ['Новый LEGO набор', 'Python для LEGO хабов', 'Блочный язык', 'Операционная система'], correctAnswer: 1, explanation: 'PyBricks — микроверсия Python для программирования SPIKE/EV3 хабов.' },
            { id: 'lq11-2', question: 'Что делает DriveBase?', options: ['Подключает датчики', 'Упрощает управление движением', 'Включает звук', 'Калибрует гироскоп'], correctAnswer: 1, explanation: 'DriveBase предоставляет удобные методы для движения робота.' }
        ]
    },
    {
        id: 'lego-lesson-12',
        number: 12,
        title: 'Код как часть Robot Design',
        description: 'Документация, объяснение судьям и профессиональный подход',
        level: 'advanced',
        duration: '55 мин',
        sections: [
            {
                id: 'documentation',
                title: 'Документация кода',
                blocks: [
                    { type: 'heading', level: 3, content: 'Виды документации' },
                    {
                        type: 'list', ordered: false, items: [
                            'Комментарии: Объясняют ПОЧЕМУ, а не что',
                            'Схемы алгоритмов (Flowcharts): Визуальное представление логики',
                            'README: Имя, миссии, особенности, версия'
                        ]
                    },
                    { type: 'text', content: 'Плохо: # повернуть на 90°\nХорошо: # Поворот к миссии M5; угол 92° для компенсации люфта' }
                ]
            },
            {
                id: 'explanation',
                title: 'Объяснение судьям: Проблема — Решение — Результат',
                blocks: [
                    {
                        type: 'list', ordered: true, items: [
                            'Проблема: «При повороте по энкодерам робот приезжал в разные точки»',
                            'Исследованные решения: «Пробовали уменьшить мощность, менять покрытие»',
                            'Выбранное решение: «Использовали гироскоп — измеряет угол робота»',
                            'Результат: «Точность +/- 2°, подтверждено тестами»'
                        ]
                    }
                ]
            },
            {
                id: 'code-quality',
                title: 'Чистота и читаемость',
                blocks: [
                    {
                        type: 'list', ordered: false, items: [
                            'Именование: Осмысленные имена (AlignToWall)',
                            'Структурирование: Инициализация, функции, основная программа',
                            'Без «магических чисел»: DISTANCE_TO_MISSION = 1023'
                        ]
                    }
                ]
            },
            {
                id: 'demo',
                title: 'Демонстрация для судей',
                blocks: [
                    {
                        type: 'list', ordered: false, items: [
                            'Показ изюминки: 1-2 крутых решения за 60 секунд',
                            'Отказоустойчивость: Подтолкните робота — вернётся ли?',
                            'Инструменты отладки: Экран хаба во время заезда'
                        ]
                    }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Документируй это', description: 'Добавьте комментарии, README и блок-схему к программе' },
            { type: 'task', title: 'Питч-презентация', description: '2-минутное объяснение главного технического решения' }
        ],
        quiz: [
            { id: 'lq12-1', question: 'Что должны объяснять комментарии?', options: ['Что делает код', 'Почему так сделано', 'Имя переменной', 'Версию программы'], correctAnswer: 1, explanation: 'Комментарии должны объяснять ПОЧЕМУ, а не что — код сам показывает что.' },
            { id: 'lq12-2', question: 'Что такое «магические числа»?', options: ['Особые константы', 'Числа без объяснения в коде', 'Случайные числа', 'Нумерация строк'], correctAnswer: 1, explanation: '«Магические числа» — числа в коде без объяснения, их нужно выносить в константы.' }
        ]
    }
];
