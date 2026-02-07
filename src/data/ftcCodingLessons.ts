// FTC Coding Lessons Data - Part 1 (Lessons 1-6)
import { Lesson } from '@/types/lesson';

export const ftcCodingLessons: Lesson[] = [
    {
        id: 'lesson-1',
        number: 1,
        title: 'Введение в экосистему FTC',
        description: 'Установка Android Studio, структура проекта FTC, первая программа TeleOp',
        level: 'beginner',
        duration: '45 мин',
        sections: [
            {
                id: 'intro',
                title: 'Что такое программирование в FTC?',
                blocks: [
                    { type: 'text', content: 'Программирование в FTC - это создание команд для робота на языке Java. Ваш код загружается на Control Hub (мозг робота), который управляет моторами, сервоприводами и датчиками.' },
                    { type: 'heading', level: 3, content: 'Ключевые компоненты системы' },
                    {
                        type: 'list', ordered: false, items: [
                            'Android Studio - программа для написания кода',
                            'FTC SDK - готовые инструменты для управления роботом',
                            'Control Hub - плата в роботе, выполняющая код',
                            'Driver Station - приложение для запуска программ'
                        ]
                    }
                ]
            },
            {
                id: 'first-program',
                title: 'Первая программа TeleOp',
                blocks: [
                    { type: 'text', content: 'Создайте новый файл FirstTeleOp.java в папке TeamCode:' },
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
        // Инициализация
        leftMotor = hardwareMap.get(DcMotor.class, "left_motor");
        rightMotor = hardwareMap.get(DcMotor.class, "right_motor");
        
        telemetry.addData("Статус", "Готов!");
        telemetry.update();
        
        waitForStart();
        
        while (opModeIsActive()) {
            double drive = -gamepad1.left_stick_y;
            double turn = gamepad1.right_stick_x;
            
            leftMotor.setPower(drive + turn);
            rightMotor.setPower(drive - turn);
            
            telemetry.addData("Левый", leftMotor.getPower());
            telemetry.addData("Правый", rightMotor.getPower());
            telemetry.update();
        }
    }
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Базовое управление', description: 'Измените программу для управления только левым стиком', subtasks: ['Сделайте правый мотор повторяющим левый', 'Добавьте вывод времени работы в телеметрию'] }
        ],
        quiz: [
            { id: 'q1-1', question: 'Что делает команда waitForStart()?', options: ['Останавливает робота', 'Ожидает нажатия кнопки PLAY', 'Инициализирует моторы', 'Завершает программу'], correctAnswer: 1, explanation: 'waitForStart() приостанавливает выполнение программы до нажатия кнопки PLAY на драйвер-станции.' },
            { id: 'q1-2', question: 'Зачем нужен HardwareMap?', options: ['Для отображения карты', 'Для связи имён устройств в коде с физическими устройствами', 'Для навигации робота', 'Для сохранения данных'], correctAnswer: 1, explanation: 'HardwareMap связывает имена устройств в коде с реальными устройствами робота.' },
            { id: 'q1-3', question: 'Почему используется знак минус в -gamepad1.left_stick_y?', options: ['Это ошибка', 'Ось Y геймпада инвертирована', 'Для замедления', 'Для ускорения'], correctAnswer: 1, explanation: 'Ось Y геймпада инвертирована: стик вверх = -1.0, вниз = 1.0. Минус делает управление интуитивным.' }
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
                    { type: 'text', content: 'Простой режим без обратной связи. Мотор получает заданную мощность без коррекций.' },
                    {
                        type: 'code', language: 'java', content: `motor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
motor.setPower(0.5); // 50% мощности` },
                    { type: 'heading', level: 3, content: '2. RUN_USING_ENCODER' },
                    { type: 'text', content: 'Режим с контролем скорости через энкодеры.' },
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
}` }
                ]
            },
            {
                id: 'mecanum',
                title: 'Mecanum привод',
                blocks: [
                    { type: 'text', content: 'Mecanum колёса позволяют роботу двигаться в любом направлении без поворота.' },
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
            
            // Нормализация
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
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Улучшенный Mecanum', description: 'Добавьте режимы скорости', subtasks: ['Нормальный (RB)', 'Точный (LB, ×0.3)', 'Турбо (RT, ×1.5)'] }
        ],
        quiz: [
            { id: 'q2-1', question: 'Зачем нужна нормализация мощностей в Mecanum?', options: ['Для красоты кода', 'Чтобы значения не превышали 1.0', 'Для экономии батареи', 'Не нужна'], correctAnswer: 1, explanation: 'Нормализация гарантирует, что ни одно значение мощности не превысит 1.0, иначе моторы работают некорректно.' },
            { id: 'q2-2', question: 'В чём разница между RUN_WITHOUT_ENCODER и RUN_USING_ENCODER?', options: ['Никакой разницы', 'RUN_USING_ENCODER поддерживает стабильную скорость', 'RUN_WITHOUT_ENCODER быстрее', 'RUN_USING_ENCODER экономит батарею'], correctAnswer: 1, explanation: 'RUN_USING_ENCODER использует энкодеры для поддержания стабильной скорости независимо от нагрузки.' }
        ]
    },
    {
        id: 'lesson-3',
        number: 3,
        title: 'Работа с датчиками',
        description: 'Датчики цвета, расстояния, касания и следование по линии',
        level: 'beginner',
        duration: '50 мин',
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
    // Объект очень близко - остановиться
    motor.setPower(0);
} else if (distance < 30) {
    // Объект близко - замедлиться
    motor.setPower(0.3);
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Автоматическая парковка', description: 'Робот подъезжает к стене и останавливается на расстоянии 10 см' }
        ],
        quiz: [
            { id: 'q3-1', question: 'Какие значения возвращает датчик цвета?', options: ['Только название цвета', 'RGB значения (0-255)', 'Температуру', 'Яркость'], correctAnswer: 1, explanation: 'Датчик цвета возвращает значения красного, зелёного и синего каналов (0-255).' }
        ]
    },
    {
        id: 'lesson-4',
        number: 4,
        title: 'Автономные программы и таймеры',
        description: 'Создание автономных программ с ElapsedTime',
        level: 'beginner',
        duration: '55 мин',
        sections: [
            {
                id: 'autonomous-basics',
                title: 'Основы автономных программ',
                blocks: [
                    { type: 'text', content: 'В автономном режиме робот выполняет запрограммированную последовательность без управления оператором.' },
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
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Квадратный маршрут', description: 'Запрограммируйте робота проехать по квадрату', subtasks: ['Вперёд 1 секунду', 'Поворот 90°', 'Повторить 4 раза'] }
        ],
        quiz: [
            { id: 'q4-1', question: 'Чем отличается Autonomous от TeleOp?', options: ['Ничем', 'Autonomous выполняется без управления оператором', 'TeleOp быстрее', 'Autonomous использует другой язык'], correctAnswer: 1, explanation: 'В Autonomous режиме робот выполняет программу самостоятельно, без управления геймпадом.' }
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
                    { type: 'text', content: 'Энкодеры подсчитывают повороты мотора в тиках. Это позволяет двигаться на точные расстояния.' },
                    {
                        type: 'code', language: 'java', content: `// Константы калибровки
final double TICKS_PER_REV = 537.7; // Для GoBilda 312 RPM
final double WHEEL_DIAMETER_CM = 9.6;
final double TICKS_PER_CM = TICKS_PER_REV / (Math.PI * WHEEL_DIAMETER_CM);

public void driveDistance(double cm, double power) {
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
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Калибровка робота', description: 'Определите точное значение TICKS_PER_CM для вашего робота', subtasks: ['Проехать ровно 1 метр', 'Записать значение энкодера', 'Рассчитать TICKS_PER_CM'] }
        ],
        quiz: [
            { id: 'q5-1', question: 'Что измеряют энкодеры?', options: ['Температуру мотора', 'Количество оборотов в тиках', 'Напряжение', 'Скорость'], correctAnswer: 1, explanation: 'Энкодеры подсчитывают повороты вала мотора в дискретных единицах - тиках.' }
        ]
    },
    {
        id: 'lesson-6',
        number: 6,
        title: 'Гироскоп и навигация',
        description: 'Работа с IMU для точных поворотов',
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
                    {
                        type: 'code', language: 'java', content: `public void turnToAngle(double targetAngle, double power) {
    double currentAngle = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
    double error = targetAngle - currentAngle;
    
    while (opModeIsActive() && Math.abs(error) > 2) {
        currentAngle = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
        error = targetAngle - currentAngle;
        
        double turnPower = error * 0.02; // P-коэффициент
        turnPower = Math.max(-power, Math.min(power, turnPower));
        
        leftMotor.setPower(turnPower);
        rightMotor.setPower(-turnPower);
    }
    
    leftMotor.setPower(0);
    rightMotor.setPower(0);
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Навигация по компасу', description: 'Повороты на основные направления', subtasks: ['Север (0°)', 'Восток (90°)', 'Юг (180°)', 'Запад (270°)'] }
        ],
        quiz: [
            { id: 'q6-1', question: 'Что измеряет IMU?', options: ['Расстояние', 'Ориентацию робота в пространстве', 'Температуру', 'Скорость'], correctAnswer: 1, explanation: 'IMU (Inertial Measurement Unit) измеряет ориентацию робота: углы поворота, наклона и крена.' }
        ]
    }
];
