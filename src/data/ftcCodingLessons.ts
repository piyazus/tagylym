// FTC Coding Lessons Data - Part 1 (Lessons 1-6)
import { Lesson } from '@/types/lesson';

export const ftcCodingLessons: Lesson[] = [
    {
        id: 'lesson-1',
        number: 1,
        title: 'Введение в экосистему FTC',
        description: 'Установка Android Studio с FTC SDK, структура программы FTC, первая программа TeleOp',
        level: 'beginner',
        duration: '60 мин',
        sections: [
            {
                id: 'intro',
                title: 'Что такое программирование в FTC?',
                blocks: [
                    { type: 'text', content: 'Программирование в FTC - это создание команд для робота на языке Java. Ваш код загружается на Control Hub (мозг робота), который управляет моторами, сервоприводами и датчиками.' },
                    { type: 'heading', level: 3, content: 'Ключевые компоненты системы' },
                    {
                        type: 'list', ordered: false, items: [
                            'Android Studio - программа, в которой вы пишете код',
                            'FTC SDK - готовые инструменты для управления роботом',
                            'Control Hub - плата в роботе, которая выполняет ваш код',
                            'Driver Station - приложение на телефоне для запуска программ'
                        ]
                    },
                    { type: 'heading', level: 3, content: 'Как это работает' },
                    { type: 'text', content: 'Вы пишете код → Android Studio компилирует → APK файл → Загружается на робота → Control Hub выполняет команды → Робот двигается' }
                ]
            },
            {
                id: 'setup',
                title: 'Установка и настройка',
                blocks: [
                    { type: 'heading', level: 3, content: 'Шаг 1: Установка Java (JDK)' },
                    { type: 'text', content: 'Перейдите на https://adoptium.net/, выберите Temurin 17 (LTS), скачайте и установите.' },
                    { type: 'code', language: 'bash', content: 'java -version' },
                    { type: 'heading', level: 3, content: 'Шаг 2: Установка Android Studio' },
                    { type: 'text', content: 'Скачайте Android Studio с https://developer.android.com/studio и установите с настройками "Standard".' },
                    { type: 'heading', level: 3, content: 'Шаг 3: Установка FTC SDK' },
                    {
                        type: 'list', ordered: true, items: [
                            'Запустите Android Studio',
                            'Выберите: Get from VCS',
                            'В поле URL введите: https://github.com/FIRST-Tech-Challenge/FtcRobotController.git',
                            'Выберите папку для проекта и нажмите Clone'
                        ]
                    },
                    { type: 'note', variant: 'info', content: 'Загрузка займёт 5-10 минут. В конце должно появиться BUILD SUCCESSFUL' }
                ]
            },
            {
                id: 'structure',
                title: 'Структура проекта',
                blocks: [
                    {
                        type: 'code', language: 'text', content: `FtcRobotController/
├── FtcRobotController/  ← Не изменять!
└── TeamCode/            ← Ваши программы здесь
    └── src/main/java/org/firstinspires/ftc/teamcode/` },
                    { type: 'note', variant: 'warning', content: 'Все свои программы создавайте ТОЛЬКО в папке TeamCode. Никогда не изменяйте файлы в FtcRobotController!' }
                ]
            },
            {
                id: 'first-program',
                title: 'Первая программа TeleOp',
                blocks: [
                    { type: 'text', content: 'Создайте новый файл FirstTeleOp.java в папке teamcode:' },
                    {
                        type: 'code', language: 'java', filename: 'FirstTeleOp.java', content: `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;

@TeleOp(name = "Моя первая программа", group = "Training")
public class FirstTeleOp extends LinearOpMode {
    
    private DcMotor leftMotor;
    private DcMotor rightMotor;
    
    @Override
    public void runOpMode() {
        // Инициализация - связываем имена с физическими моторами
        leftMotor = hardwareMap.get(DcMotor.class, "left_motor");
        rightMotor = hardwareMap.get(DcMotor.class, "right_motor");
        
        telemetry.addData("Статус", "Готов! Нажмите PLAY");
        telemetry.update();
        
        waitForStart(); // Ждём нажатия кнопки PLAY
        
        // Основной цикл - выполняется 30-50 раз в секунду
        while (opModeIsActive()) {
            double drive = -gamepad1.left_stick_y; // Минус для интуитивного управления
            double turn = gamepad1.right_stick_x;
            
            leftMotor.setPower(drive + turn);
            rightMotor.setPower(drive - turn);
            
            telemetry.addData("Левый", leftMotor.getPower());
            telemetry.addData("Правый", rightMotor.getPower());
            telemetry.update();
        }
    }
}` },
                    { type: 'heading', level: 3, content: 'Объяснение ключевых элементов' },
                    { type: 'text', content: '@TeleOp - аннотация, говорящая системе, что это программа для ручного управления' },
                    { type: 'text', content: 'hardwareMap - "телефонная книга" робота, связывает имя устройства с физическим мотором' },
                    { type: 'text', content: 'waitForStart() - критически важная команда, разделяет инициализацию и рабочий цикл' },
                    { type: 'note', variant: 'tip', content: 'Знак минус в -gamepad1.left_stick_y нужен потому что ось Y геймпада инвертирована: стик вверх = -1.0, вниз = 1.0' }
                ]
            },
            {
                id: 'errors',
                title: 'Типичные ошибки и решения',
                blocks: [
                    { type: 'heading', level: 3, content: 'Cannot resolve symbol' },
                    { type: 'text', content: 'Проверьте импорты в начале файла. Все необходимые классы должны быть импортированы.' },
                    { type: 'heading', level: 3, content: 'Программа не в списке на драйвер-станции' },
                    {
                        type: 'list', ordered: false, items: [
                            'Убедитесь, что есть аннотация @TeleOp или @Autonomous',
                            'Проверьте, что класс объявлен как public',
                            'Build → Clean Project, затем Build → Make Project'
                        ]
                    },
                    { type: 'heading', level: 3, content: 'Could not find hardware device' },
                    { type: 'text', content: 'Имена в коде ("left_motor") должны точно совпадать с именами в конфигурации на драйвер-станции.' }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Базовое управление', description: 'Измените программу для управления только левым стиком', subtasks: ['Сделайте правый мотор повторяющим левый', 'Добавьте вывод времени работы в телеметрию'] },
            { type: 'task', title: 'Управление с переключением скорости', description: 'Добавьте два режима скорости', subtasks: ['Нормальный: кнопка RB (мощность ×1.0)', 'Медленный: кнопка LB (мощность ×0.3)', 'Выводите текущий режим на экран'] },
            { type: 'task', title: 'Система с сервоприводом', description: 'Добавьте управление захватом', subtasks: ['Кнопка A → открыть (позиция 0.7)', 'Кнопка B → закрыть (позиция 0.3)', 'Кнопка X → полуоткрыть (позиция 0.5)'] }
        ],
        quiz: [
            { id: 'q1-1', question: 'Что делает команда waitForStart()?', options: ['Останавливает робота', 'Ожидает нажатия кнопки PLAY', 'Инициализирует моторы', 'Завершает программу'], correctAnswer: 1, explanation: 'waitForStart() приостанавливает программу до нажатия PLAY на драйвер-станции.' },
            { id: 'q1-2', question: 'Зачем нужен HardwareMap?', options: ['Для отображения карты', 'Для связи имён устройств с физическими устройствами', 'Для навигации робота', 'Для сохранения данных'], correctAnswer: 1, explanation: 'HardwareMap связывает имена устройств в коде с реальными устройствами.' },
            { id: 'q1-3', question: 'Почему используется -gamepad1.left_stick_y?', options: ['Это ошибка', 'Ось Y геймпада инвертирована', 'Для замедления', 'Для ускорения'], correctAnswer: 1, explanation: 'Ось Y инвертирована: вверх = -1.0, вниз = 1.0. Минус делает управление интуитивным.' },
            { id: 'q1-4', question: 'Какая разница между TeleOp и Autonomous?', options: ['Никакой', 'TeleOp управляется оператором, Autonomous работает сам', 'TeleOp быстрее', 'Autonomous использует другой язык'], correctAnswer: 1, explanation: 'TeleOp - ручное управление геймпадом, Autonomous - робот выполняет программу сам.' }
        ]
    },
    {
        id: 'lesson-2',
        number: 2,
        title: 'Управление моторами и сервоприводами',
        description: 'Режимы работы моторов, Mecanum привод, работа с сервоприводами',
        level: 'beginner',
        duration: '60 мин',
        sections: [
            {
                id: 'motor-modes',
                title: 'Режимы работы моторов',
                blocks: [
                    { type: 'heading', level: 3, content: '1. RUN_WITHOUT_ENCODER' },
                    { type: 'text', content: 'Простой режим без обратной связи. Когда использовать: для TeleOp управления.' },
                    {
                        type: 'code', language: 'java', content: `motor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
motor.setPower(0.5); // 50% мощности` },
                    { type: 'heading', level: 3, content: '2. RUN_USING_ENCODER' },
                    { type: 'text', content: 'Режим с контролем скорости. SDK использует энкодеры для поддержания стабильной скорости.' },
                    {
                        type: 'code', language: 'java', content: `motor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
motor.setPower(0.5); // SDK поддерживает стабильную скорость` },
                    { type: 'heading', level: 3, content: '3. RUN_TO_POSITION' },
                    { type: 'text', content: 'Движение к заданной позиции с использованием встроенного PID.' },
                    {
                        type: 'code', language: 'java', content: `motor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
motor.setTargetPosition(1000);
motor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
motor.setPower(0.5);

while (motor.isBusy()) {
    // Ждём достижения позиции
}` },
                    { type: 'heading', level: 3, content: 'Настройка направления и поведения' },
                    {
                        type: 'code', language: 'java', content: `motor.setDirection(DcMotor.Direction.REVERSE);
motor.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);` }
                ]
            },
            {
                id: 'mecanum',
                title: 'Mecanum привод',
                blocks: [
                    { type: 'text', content: 'Mecanum колёса имеют ролики под углом 45°, что позволяет роботу двигаться в любом направлении без поворота.' },
                    { type: 'heading', level: 3, content: 'Формулы управления' },
                    {
                        type: 'code', language: 'text', content: `FL = drive + strafe + rotate
FR = drive - strafe - rotate
BL = drive - strafe + rotate
BR = drive + strafe - rotate` },
                    {
                        type: 'code', language: 'java', filename: 'MecanumDrive.java', content: `@TeleOp(name = "Mecanum Drive")
public class MecanumDrive extends LinearOpMode {
    
    @Override
    public void runOpMode() {
        DcMotor frontLeft = hardwareMap.get(DcMotor.class, "front_left");
        DcMotor frontRight = hardwareMap.get(DcMotor.class, "front_right");
        DcMotor backLeft = hardwareMap.get(DcMotor.class, "back_left");
        DcMotor backRight = hardwareMap.get(DcMotor.class, "back_right");
        
        waitForStart();
        
        while (opModeIsActive()) {
            double drive = -gamepad1.left_stick_y;
            double strafe = gamepad1.left_stick_x;
            double rotate = gamepad1.right_stick_x;
            
            double fl = drive + strafe + rotate;
            double fr = drive - strafe - rotate;
            double bl = drive - strafe + rotate;
            double br = drive + strafe - rotate;
            
            // Нормализация - чтобы значения не превышали 1.0
            double max = Math.max(Math.abs(fl), Math.max(Math.abs(fr), 
                         Math.max(Math.abs(bl), Math.abs(br))));
            if (max > 1.0) {
                fl /= max; fr /= max; bl /= max; br /= max;
            }
            
            frontLeft.setPower(fl);
            frontRight.setPower(fr);
            backLeft.setPower(bl);
            backRight.setPower(br);
        }
    }
}` },
                    { type: 'note', variant: 'info', content: 'Нормализация гарантирует, что ни одно значение не превысит 1.0, иначе моторы работают некорректно.' }
                ]
            },
            {
                id: 'servos',
                title: 'Работа с сервоприводами',
                blocks: [
                    { type: 'text', content: 'Сервоприводы - моторы с обратной связью, которые поворачиваются в заданную позицию (0.0 - 1.0).' },
                    {
                        type: 'code', language: 'java', content: `Servo clawServo = hardwareMap.get(Servo.class, "claw");

// Установка позиции (0.0 - 1.0)
clawServo.setPosition(0.5); // Середина

// Настройка диапазона
clawServo.scaleRange(0.2, 0.8);` },
                    { type: 'heading', level: 3, content: 'Управление захватом с toggle' },
                    {
                        type: 'code', language: 'java', content: `boolean isOpen = false;
boolean wasPressed = false;

while (opModeIsActive()) {
    boolean isPressed = gamepad1.a;
    
    if (isPressed && !wasPressed) {
        isOpen = !isOpen;
        clawServo.setPosition(isOpen ? 0.7 : 0.3);
    }
    
    wasPressed = isPressed;
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Улучшенный Mecanum', description: 'Добавьте три режима скорости', subtasks: ['Нормальный (RB)', 'Точный (LB, ×0.3)', 'Турбо (RT, ×1.5)'] },
            { type: 'task', title: 'Сложная система захвата', description: 'Создайте систему с тремя сервоприводами', subtasks: ['Основной захват (A/B)', 'Поворотный механизм (правый стик)', 'Фиксатор (автоматически при подъёме)'] }
        ],
        quiz: [
            { id: 'q2-1', question: 'Зачем нужна нормализация мощностей в Mecanum?', options: ['Для красоты кода', 'Чтобы значения не превышали 1.0', 'Для экономии батареи', 'Не нужна'], correctAnswer: 1, explanation: 'Нормализация гарантирует корректную работу моторов.' },
            { id: 'q2-2', question: 'В чём разница между RUN_WITHOUT_ENCODER и RUN_USING_ENCODER?', options: ['Никакой разницы', 'RUN_USING_ENCODER поддерживает стабильную скорость', 'RUN_WITHOUT_ENCODER быстрее', 'RUN_USING_ENCODER экономит батарею'], correctAnswer: 1, explanation: 'RUN_USING_ENCODER использует энкодеры для стабильной скорости.' },
            { id: 'q2-3', question: 'Зачем отслеживать wasPressed для toggle?', options: ['Для красоты', 'Чтобы срабатывало только при нажатии, а не удержании', 'Для скорости', 'Не нужно'], correctAnswer: 1, explanation: 'Без этого toggle будет срабатывать каждый цикл при удержании кнопки.' }
        ]
    },
    {
        id: 'lesson-3',
        number: 3,
        title: 'Работа с датчиками',
        description: 'Датчики цвета, расстояния, касания и следование по линии',
        level: 'beginner',
        duration: '55 мин',
        sections: [
            {
                id: 'color-sensor',
                title: 'Датчики цвета',
                blocks: [
                    { type: 'text', content: 'Датчики цвета измеряют отражённый свет в каналах RGB.' },
                    {
                        type: 'code', language: 'java', content: `ColorSensor colorSensor = hardwareMap.get(ColorSensor.class, "color_sensor");

// Получение значений
int red = colorSensor.red();
int green = colorSensor.green();
int blue = colorSensor.blue();

// Определение цвета по оттенку (Hue)
float[] hsv = new float[3];
Color.RGBToHSV(red, green, blue, hsv);
float hue = hsv[0];

if (hue < 30 || hue > 330) {
    telemetry.addData("Цвет", "Красный");
} else if (hue >= 30 && hue < 90) {
    telemetry.addData("Цвет", "Жёлтый");
} else if (hue >= 200 && hue < 260) {
    telemetry.addData("Цвет", "Синий");
}` }
                ]
            },
            {
                id: 'distance-sensor',
                title: 'Датчики расстояния',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `DistanceSensor distanceSensor = hardwareMap.get(DistanceSensor.class, "distance");

double distance = distanceSensor.getDistance(DistanceUnit.CM);

if (distance < 10) {
    motor.setPower(0); // Объект очень близко - остановиться
} else if (distance < 30) {
    motor.setPower(0.3); // Близко - замедлиться
} else {
    motor.setPower(0.7); // Далеко - ехать быстро
}` },
                    { type: 'heading', level: 3, content: 'Автоматическая парковка' },
                    {
                        type: 'code', language: 'java', content: `public void parkAtWall(double targetDistance) {
    while (opModeIsActive()) {
        double distance = distanceSensor.getDistance(DistanceUnit.CM);
        double error = distance - targetDistance;
        
        if (Math.abs(error) < 1) {
            motor.setPower(0);
            break;
        }
        
        double power = error * 0.05; // P-регулятор
        motor.setPower(Math.max(-0.5, Math.min(0.5, power)));
    }
}` }
                ]
            },
            {
                id: 'touch-sensor',
                title: 'Датчики касания (концевики)',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `TouchSensor touchSensor = hardwareMap.get(TouchSensor.class, "touch");

if (touchSensor.isPressed()) {
    motor.setPower(0);
    telemetry.addData("Статус", "Достигнут предел!");
}` },
                    { type: 'heading', level: 3, content: 'Лифт с концевиками' },
                    {
                        type: 'code', language: 'java', content: `TouchSensor limitTop = hardwareMap.get(TouchSensor.class, "limit_top");
TouchSensor limitBottom = hardwareMap.get(TouchSensor.class, "limit_bottom");

double liftPower = -gamepad1.left_stick_y;

// Защита от перехода за пределы
if (liftPower > 0 && limitTop.isPressed()) {
    liftPower = 0;
}
if (liftPower < 0 && limitBottom.isPressed()) {
    liftPower = 0;
}

liftMotor.setPower(liftPower);` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Автоматическая парковка', description: 'Робот подъезжает к стене и останавливается на расстоянии 10 см' },
            { type: 'task', title: 'Определение зоны по цвету', description: 'Робот определяет цвет зоны и выполняет соответствующее действие' },
            { type: 'task', title: 'Лифт с защитой', description: 'Реализуйте лифт с концевиками и автоматической остановкой' }
        ],
        quiz: [
            { id: 'q3-1', question: 'Какие значения возвращает датчик цвета?', options: ['Только название цвета', 'RGB значения', 'Температуру', 'Яркость'], correctAnswer: 1, explanation: 'Датчик возвращает значения красного, зелёного и синего каналов.' },
            { id: 'q3-2', question: 'Зачем нужен P-регулятор для парковки?', options: ['Для красоты', 'Для плавного замедления при приближении к цели', 'Для ускорения', 'Не нужен'], correctAnswer: 1, explanation: 'P-регулятор обеспечивает плавное движение: чем ближе к цели, тем медленнее.' }
        ]
    },
    {
        id: 'lesson-4',
        number: 4,
        title: 'Автономные программы и таймеры',
        description: 'Создание автономных программ с ElapsedTime и последовательности действий',
        level: 'beginner',
        duration: '55 мин',
        sections: [
            {
                id: 'autonomous-basics',
                title: 'Основы автономных программ',
                blocks: [
                    { type: 'text', content: 'В автономном режиме робот выполняет запрограммированную последовательность самостоятельно.' },
                    { type: 'heading', level: 3, content: 'Класс ElapsedTime' },
                    {
                        type: 'code', language: 'java', content: `ElapsedTime timer = new ElapsedTime();

timer.reset(); // Сброс таймера
double seconds = timer.seconds(); // Прошедшее время
double ms = timer.milliseconds(); // В миллисекундах` },
                    {
                        type: 'code', language: 'java', filename: 'SimpleAutonomous.java', content: `@Autonomous(name = "Простая автономка")
public class SimpleAutonomous extends LinearOpMode {
    
    private ElapsedTime runtime = new ElapsedTime();
    
    @Override
    public void runOpMode() {
        DcMotor leftMotor = hardwareMap.get(DcMotor.class, "left_motor");
        DcMotor rightMotor = hardwareMap.get(DcMotor.class, "right_motor");
        
        waitForStart();
        runtime.reset();
        
        // Едем вперёд 2 секунды
        leftMotor.setPower(0.5);
        rightMotor.setPower(0.5);
        
        while (opModeIsActive() && runtime.seconds() < 2.0) {
            telemetry.addData("Время", runtime.seconds());
            telemetry.update();
        }
        
        // Останавливаемся
        leftMotor.setPower(0);
        rightMotor.setPower(0);
    }
}` }
                ]
            },
            {
                id: 'sequences',
                title: 'Последовательности действий',
                blocks: [
                    { type: 'heading', level: 3, content: 'Квадратный маршрут' },
                    {
                        type: 'code', language: 'java', content: `public void driveForTime(double power, double seconds) {
    ElapsedTime timer = new ElapsedTime();
    leftMotor.setPower(power);
    rightMotor.setPower(power);
    
    while (opModeIsActive() && timer.seconds() < seconds) {
        // Ждём
    }
    
    leftMotor.setPower(0);
    rightMotor.setPower(0);
}

public void turnForTime(double power, double seconds) {
    ElapsedTime timer = new ElapsedTime();
    leftMotor.setPower(power);
    rightMotor.setPower(-power);
    
    while (opModeIsActive() && timer.seconds() < seconds) {
        // Ждём
    }
    
    leftMotor.setPower(0);
    rightMotor.setPower(0);
}

// Использование: проехать квадрат
for (int i = 0; i < 4; i++) {
    driveForTime(0.5, 1.0);
    turnForTime(0.3, 0.5);
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Квадратный маршрут', description: 'Проехать по квадрату', subtasks: ['Вперёд 1 секунду', 'Поворот 90°', 'Повторить 4 раза'] },
            { type: 'task', title: 'Автономка "Треугольник"', description: 'Проехать по треугольнику со сторонами 1 метр, с паузой 0.5 сек на каждой вершине' }
        ],
        quiz: [
            { id: 'q4-1', question: 'Чем отличается Autonomous от TeleOp?', options: ['Ничем', 'Autonomous выполняется без управления оператором', 'TeleOp быстрее', 'Autonomous другой язык'], correctAnswer: 1, explanation: 'Autonomous работает самостоятельно без геймпада.' },
            { id: 'q4-2', question: 'Зачем нужен ElapsedTime?', options: ['Для красоты', 'Для измерения времени выполнения действий', 'Для скорости', 'Не нужен'], correctAnswer: 1, explanation: 'ElapsedTime позволяет точно измерять время для последовательностей.' }
        ]
    },
    {
        id: 'lesson-5',
        number: 5,
        title: 'Точное движение с энкодерами',
        description: 'Калибровка энкодеров и движение на точные расстояния',
        level: 'intermediate',
        duration: '60 мин',
        sections: [
            {
                id: 'encoder-basics',
                title: 'Основы энкодеров',
                blocks: [
                    { type: 'text', content: 'Энкодеры подсчитывают повороты мотора в тиках. Это позволяет двигаться на точные расстояния вместо "ехать 2 секунды".' },
                    {
                        type: 'code', language: 'java', content: `// Получение данных с энкодеров
int position = motor.getCurrentPosition(); // Текущая позиция в тиках

// Сброс энкодера
motor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);` },
                    { type: 'heading', level: 3, content: 'Калибровка: тиков на сантиметр' },
                    {
                        type: 'code', language: 'java', content: `// Константы калибровки
final double TICKS_PER_REV = 537.7; // Для GoBilda 312 RPM
final double WHEEL_DIAMETER_CM = 9.6;
final double TICKS_PER_CM = TICKS_PER_REV / (Math.PI * WHEEL_DIAMETER_CM);` }
                ]
            },
            {
                id: 'drive-distance',
                title: 'Движение на точное расстояние',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `public void driveDistance(double cm, double power) {
    int targetTicks = (int)(cm * TICKS_PER_CM);
    
    leftMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
    rightMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
    
    leftMotor.setTargetPosition(targetTicks);
    rightMotor.setTargetPosition(targetTicks);
    
    leftMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    rightMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    
    leftMotor.setPower(power);
    rightMotor.setPower(power);
    
    while (opModeIsActive() && leftMotor.isBusy() && rightMotor.isBusy()) {
        telemetry.addData("Позиция", leftMotor.getCurrentPosition());
        telemetry.addData("Цель", targetTicks);
        telemetry.update();
    }
    
    leftMotor.setPower(0);
    rightMotor.setPower(0);
}` },
                    { type: 'heading', level: 3, content: 'Точные повороты' },
                    {
                        type: 'code', language: 'java', content: `final double WHEEL_BASE_CM = 35; // Расстояние между колёсами
final double TICKS_PER_DEGREE = (WHEEL_BASE_CM * Math.PI / 360) * TICKS_PER_CM;

public void turnDegrees(double degrees, double power) {
    int targetTicks = (int)(degrees * TICKS_PER_DEGREE);
    
    leftMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
    rightMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
    
    leftMotor.setTargetPosition(targetTicks);
    rightMotor.setTargetPosition(-targetTicks);
    
    leftMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    rightMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    
    leftMotor.setPower(power);
    rightMotor.setPower(power);
    
    while (opModeIsActive() && leftMotor.isBusy()) {
        // Ждём
    }
    
    leftMotor.setPower(0);
    rightMotor.setPower(0);
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Калибровка робота', description: 'Определите точное значение TICKS_PER_CM', subtasks: ['Проехать ровно 1 метр', 'Записать значение энкодера', 'Рассчитать TICKS_PER_CM'] },
            { type: 'task', title: 'Точный квадрат', description: 'Проехать квадрат 50×50 см с погрешностью менее 2 см' }
        ],
        quiz: [
            { id: 'q5-1', question: 'Что измеряют энкодеры?', options: ['Температуру', 'Количество оборотов в тиках', 'Напряжение', 'Скорость'], correctAnswer: 1, explanation: 'Энкодеры подсчитывают повороты вала в тиках.' },
            { id: 'q5-2', question: 'Почему энкодеры точнее времени?', options: ['Быстрее', 'Не зависят от заряда батареи', 'Проще', 'Меньше кода'], correctAnswer: 1, explanation: 'Энкодеры считают обороты независимо от скорости вращения.' }
        ]
    },
    {
        id: 'lesson-6',
        number: 6,
        title: 'Гироскоп и навигация',
        description: 'Работа с IMU для точных поворотов и навигации',
        level: 'intermediate',
        duration: '55 мин',
        sections: [
            {
                id: 'imu-setup',
                title: 'Настройка IMU',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `IMU imu = hardwareMap.get(IMU.class, "imu");

IMU.Parameters parameters = new IMU.Parameters(
    new RevHubOrientationOnRobot(
        RevHubOrientationOnRobot.LogoFacingDirection.UP,
        RevHubOrientationOnRobot.UsbFacingDirection.FORWARD
    )
);
imu.initialize(parameters);

// Получение угла
double heading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);` }
                ]
            },
            {
                id: 'gyro-turn',
                title: 'Повороты по гироскопу',
                blocks: [
                    { type: 'heading', level: 3, content: 'P-регулятор для поворотов' },
                    {
                        type: 'code', language: 'java', content: `public void turnToAngle(double targetAngle, double power) {
    double currentAngle = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
    double error = targetAngle - currentAngle;
    
    while (opModeIsActive() && Math.abs(error) > 2) {
        currentAngle = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
        error = targetAngle - currentAngle;
        
        // Нормализация ошибки (-180 до 180)
        while (error > 180) error -= 360;
        while (error < -180) error += 360;
        
        double turnPower = error * 0.02; // P-коэффициент
        turnPower = Math.max(-power, Math.min(power, turnPower));
        
        leftMotor.setPower(turnPower);
        rightMotor.setPower(-turnPower);
        
        telemetry.addData("Текущий угол", currentAngle);
        telemetry.addData("Ошибка", error);
        telemetry.update();
    }
    
    leftMotor.setPower(0);
    rightMotor.setPower(0);
}` },
                    { type: 'heading', level: 3, content: 'Автономка с гироскопом' },
                    {
                        type: 'code', language: 'java', content: `// Пример: движение по квадрату с точными поворотами
driveDistance(50, 0.5);
turnToAngle(90, 0.3);

driveDistance(50, 0.5);
turnToAngle(180, 0.3);

driveDistance(50, 0.5);
turnToAngle(270, 0.3);

driveDistance(50, 0.5);
turnToAngle(0, 0.3);` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Калибровка IMU', description: 'Проверьте точность гироскопа', subtasks: ['Повороты на 90°, 180°, 270°, 360°', 'Измерьте реальные углы', 'Определите корректирующий коэффициент'] },
            { type: 'task', title: 'Навигация по компасу', description: 'Повороты на основные направления', subtasks: ['Север (0°)', 'Восток (90°)', 'Юг (180°)', 'Запад (270°)', 'Точность ±2°'] }
        ],
        quiz: [
            { id: 'q6-1', question: 'Что измеряет IMU?', options: ['Расстояние', 'Ориентацию в пространстве', 'Температуру', 'Скорость'], correctAnswer: 1, explanation: 'IMU измеряет углы поворота, наклона и крена робота.' },
            { id: 'q6-2', question: 'Зачем нормализовать ошибку угла?', options: ['Для красоты', 'Чтобы ошибка была в диапазоне -180 до 180', 'Для скорости', 'Не нужно'], correctAnswer: 1, explanation: 'Нормализация предотвращает некорректный расчёт при переходе через 180°.' }
        ]
    }
];
