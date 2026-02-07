// FTC Coding Lessons Data - Part 2 (Lessons 7-12 Advanced)
import { Lesson } from '@/types/lesson';

export const ftcCodingLessonsAdvanced: Lesson[] = [
    {
        id: 'lesson-7',
        number: 7,
        title: 'Конечные автоматы (State Machines)',
        description: 'Структурированные автономные программы с состояниями и переходами',
        level: 'intermediate',
        duration: '65 мин',
        sections: [
            {
                id: 'state-machine-basics',
                title: 'Основы State Machine',
                blocks: [
                    { type: 'text', content: 'State Machine - паттерн программирования, где программа находится в одном из нескольких состояний и переходит между ними по условиям.' },
                    { type: 'heading', level: 3, content: 'Преимущества' },
                    {
                        type: 'list', ordered: false, items: [
                            'Читаемость - видна вся последовательность',
                            'Отладка - легко найти, где застрял робот',
                            'Гибкость - можно добавлять/удалять состояния',
                            'Надежность - каждое состояние независимо'
                        ]
                    }
                ]
            },
            {
                id: 'state-machine-impl',
                title: 'Реализация State Machine',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `public enum RobotState {
    START,
    DRIVE_TO_TARGET,
    GRAB_ELEMENT,
    DRIVE_TO_ZONE,
    DROP_ELEMENT,
    PARK,
    DONE
}

private RobotState currentState = RobotState.START;
private ElapsedTime stateTimer = new ElapsedTime();

@Override
public void runOpMode() {
    // Инициализация...
    waitForStart();
    
    while (opModeIsActive()) {
        switch (currentState) {
            case START:
                stateTimer.reset();
                currentState = RobotState.DRIVE_TO_TARGET;
                break;
                
            case DRIVE_TO_TARGET:
                driveForward(0.5);
                if (distanceSensor.getDistance(DistanceUnit.CM) < 10) {
                    stopMotors();
                    currentState = RobotState.GRAB_ELEMENT;
                    stateTimer.reset();
                }
                break;
                
            case GRAB_ELEMENT:
                clawServo.setPosition(CLAW_CLOSED);
                if (stateTimer.seconds() > 0.5) {
                    currentState = RobotState.DRIVE_TO_ZONE;
                }
                break;
                
            case DRIVE_TO_ZONE:
                driveForward(0.5);
                if (colorSensor.red() > 100) {
                    stopMotors();
                    currentState = RobotState.DROP_ELEMENT;
                    stateTimer.reset();
                }
                break;
                
            case DROP_ELEMENT:
                clawServo.setPosition(CLAW_OPEN);
                if (stateTimer.seconds() > 0.5) {
                    currentState = RobotState.PARK;
                }
                break;
                
            case PARK:
                turnToAngle(0, 0.3);
                currentState = RobotState.DONE;
                break;
                
            case DONE:
                stopMotors();
                break;
        }
        
        telemetry.addData("State", currentState);
        telemetry.update();
    }
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Сборщик мусора', description: 'Реализуйте State Machine', subtasks: ['ПОИСК → ПОДЪЕЗД → ЗАХВАТ → ВОЗВРАТ → СБРОС', 'Добавьте состояния ОШИБКА и ВОССТАНОВЛЕНИЕ'] },
            { type: 'task', title: 'Трёхэтапная миссия', description: 'Собрать 3 конуса, расставить на разной высоте, вернуться' }
        ],
        quiz: [
            { id: 'q7-1', question: 'Зачем нужен State Machine?', options: ['Для красоты', 'Для структурирования сложных программ', 'Для скорости', 'Не нужен'], correctAnswer: 1, explanation: 'State Machine упрощает отладку и добавление новых функций.' },
            { id: 'q7-2', question: 'Что такое enum в Java?', options: ['Переменная', 'Перечисление возможных значений', 'Функция', 'Класс'], correctAnswer: 1, explanation: 'enum определяет фиксированный набор констант-состояний.' }
        ]
    },
    {
        id: 'lesson-8',
        number: 8,
        title: 'Компьютерное зрение (AprilTags)',
        description: 'VisionPortal, распознавание AprilTags и навигация по тегам',
        level: 'intermediate',
        duration: '70 мин',
        sections: [
            {
                id: 'vision-setup',
                title: 'Настройка VisionPortal',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `AprilTagProcessor aprilTag = new AprilTagProcessor.Builder()
    .setDrawTagOutline(true)
    .setDrawAxes(true)
    .build();

VisionPortal visionPortal = new VisionPortal.Builder()
    .setCamera(hardwareMap.get(WebcamName.class, "Webcam 1"))
    .addProcessor(aprilTag)
    .build();` }
                ]
            },
            {
                id: 'apriltag-detection',
                title: 'Обнаружение AprilTags',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `List<AprilTagDetection> detections = aprilTag.getDetections();

for (AprilTagDetection detection : detections) {
    if (detection.metadata != null) {
        telemetry.addLine(String.format("ID %d: %s", detection.id, detection.metadata.name));
        telemetry.addData("X (см)", detection.ftcPose.x);
        telemetry.addData("Y (см)", detection.ftcPose.y);
        telemetry.addData("Z (см)", detection.ftcPose.z);
        telemetry.addData("Yaw (градусы)", detection.ftcPose.yaw);
    }
}` },
                    { type: 'heading', level: 3, content: 'Навигация к AprilTag' },
                    {
                        type: 'code', language: 'java', content: `public void driveToAprilTag(int targetId) {
    while (opModeIsActive()) {
        List<AprilTagDetection> detections = aprilTag.getDetections();
        
        for (AprilTagDetection detection : detections) {
            if (detection.id == targetId && detection.metadata != null) {
                double rangeError = detection.ftcPose.range - 20; // Остановиться в 20 см
                double headingError = detection.ftcPose.bearing;
                
                if (Math.abs(rangeError) < 2 && Math.abs(headingError) < 2) {
                    stopMotors();
                    return;
                }
                
                double drive = rangeError * 0.02;
                double turn = headingError * 0.02;
                
                leftMotor.setPower(drive + turn);
                rightMotor.setPower(drive - turn);
            }
        }
    }
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Парковка по AprilTag', description: 'Распознать тег и подъехать точно к месту парковки (±3 см)' },
            { type: 'task', title: 'Выбор стратегии', description: 'По номеру тега выбрать левую/центральную/правую стратегию автономки' }
        ],
        quiz: [
            { id: 'q8-1', question: 'Что такое AprilTag?', options: ['Датчик', 'Визуальный маркер для навигации', 'Мотор', 'Сервопривод'], correctAnswer: 1, explanation: 'AprilTag - 2D штрих-код для точного определения позиции.' },
            { id: 'q8-2', question: 'Что возвращает ftcPose.range?', options: ['Угол', 'Расстояние до тега', 'ID тега', 'Цвет'], correctAnswer: 1, explanation: 'range - расстояние от камеры до AprilTag в сантиметрах.' }
        ]
    },
    {
        id: 'lesson-9',
        number: 9,
        title: 'Продвинутая навигация с Road Runner',
        description: 'Кинематика Mecanum, калибровка Road Runner, траектории со сплайнами',
        level: 'advanced',
        duration: '90 мин',
        sections: [
            {
                id: 'roadrunner-intro',
                title: 'Введение в Road Runner',
                blocks: [
                    { type: 'text', content: 'Road Runner - библиотека для точной автономной навигации с Mecanum приводом. Использует PID, профили движения и одометрию.' },
                    { type: 'heading', level: 3, content: 'Физические параметры' },
                    {
                        type: 'code', language: 'java', content: `public static double TRACK_WIDTH = 35; // см между колёсами
public static double WHEEL_RADIUS = 4.8; // см
public static double GEAR_RATIO = 1.0; // редукция

public static double MAX_VEL = 50; // см/с
public static double MAX_ACCEL = 40; // см/с²
public static double MAX_ANG_VEL = Math.toRadians(180); // рад/с` }
                ]
            },
            {
                id: 'trajectories',
                title: 'Создание траекторий',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `Trajectory trajectory = drive.trajectoryBuilder(new Pose2d())
    .splineTo(new Vector2d(60, 30), Math.toRadians(45))
    .splineTo(new Vector2d(90, 60), Math.toRadians(90))
    .build();

drive.followTrajectory(trajectory);` },
                    { type: 'heading', level: 3, content: 'Траектория с действиями' },
                    {
                        type: 'code', language: 'java', content: `TrajectorySequence sequence = drive.trajectorySequenceBuilder(new Pose2d())
    .forward(50)
    .addDisplacementMarker(() -> {
        liftMotor.setTargetPosition(HIGH_POSITION);
    })
    .turn(Math.toRadians(90))
    .forward(30)
    .addTemporalMarker(0.5, () -> {
        clawServo.setPosition(CLAW_OPEN);
    })
    .waitSeconds(0.3)
    .back(30)
    .build();

drive.followTrajectorySequence(sequence);` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Калибровка Road Runner', description: 'Настройте параметры для вашего робота', subtasks: ['Измерьте track width', 'Откалибруйте одометрию', 'Проверьте точность квадрата 1×1 м'] },
            { type: 'task', title: 'Сложная траектория', description: 'Оптимальный путь сбора 5 элементов', subtasks: ['Минимизация времени', 'Параллельный подъём лифта'] }
        ],
        quiz: [
            { id: 'q9-1', question: 'Что такое сплайн?', options: ['Прямая линия', 'Плавная кривая между точками', 'Поворот', 'Остановка'], correctAnswer: 1, explanation: 'Сплайн - математическая кривая для плавных траекторий.' },
            { id: 'q9-2', question: 'Зачем нужна одометрия?', options: ['Для красоты', 'Для отслеживания позиции робота', 'Для скорости', 'Не нужна'], correctAnswer: 1, explanation: 'Одометрия определяет текущую позицию по данным энкодеров.' }
        ]
    },
    {
        id: 'lesson-10',
        number: 10,
        title: 'Архитектурные паттерны',
        description: 'Событийная архитектура, подсистемы, командный паттерн',
        level: 'advanced',
        duration: '80 мин',
        sections: [
            {
                id: 'subsystems',
                title: 'Подсистемы робота',
                blocks: [
                    { type: 'text', content: 'Разделение робота на независимые подсистемы упрощает разработку и тестирование.' },
                    {
                        type: 'code', language: 'java', content: `public class DriveSubsystem {
    private DcMotor frontLeft, frontRight, backLeft, backRight;
    
    public DriveSubsystem(HardwareMap hardwareMap) {
        frontLeft = hardwareMap.get(DcMotor.class, "front_left");
        // ... остальные моторы
    }
    
    public void mecanumDrive(double drive, double strafe, double rotate) {
        double fl = drive + strafe + rotate;
        double fr = drive - strafe - rotate;
        double bl = drive - strafe + rotate;
        double br = drive + strafe - rotate;
        
        // Нормализация и установка мощности
    }
    
    public void stop() {
        frontLeft.setPower(0);
        // ... остальные
    }
}` }
                ]
            },
            {
                id: 'command-pattern',
                title: 'Командный паттерн',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `public interface Command {
    void initialize();
    void execute();
    boolean isFinished();
    void end(boolean interrupted);
}

public class DriveForwardCommand implements Command {
    private DriveSubsystem drive;
    private double distance, power;
    private int startPosition;
    
    public DriveForwardCommand(DriveSubsystem drive, double distance, double power) {
        this.drive = drive;
        this.distance = distance;
        this.power = power;
    }
    
    @Override
    public void initialize() {
        startPosition = drive.getPosition();
    }
    
    @Override
    public void execute() {
        drive.setDrivePower(power);
    }
    
    @Override
    public boolean isFinished() {
        return Math.abs(drive.getPosition() - startPosition) >= distance * TICKS_PER_CM;
    }
    
    @Override
    public void end(boolean interrupted) {
        drive.stop();
    }
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Создание подсистем', description: 'Разбейте код на подсистемы', subtasks: ['DriveSubsystem', 'LiftSubsystem', 'ClawSubsystem', 'SensorSubsystem'] },
            { type: 'task', title: 'Командная система', description: 'Реализуйте базовые команды', subtasks: ['DriveCommand', 'TurnCommand', 'GrabCommand', 'SequentialCommandGroup'] }
        ],
        quiz: [
            { id: 'q10-1', question: 'Зачем разделять на подсистемы?', options: ['Для красоты', 'Для упрощения разработки и тестирования', 'Для скорости', 'Не нужно'], correctAnswer: 1, explanation: 'Подсистемы упрощают разработку, тестирование и повторное использование кода.' }
        ]
    },
    {
        id: 'lesson-11',
        number: 11,
        title: 'ИИ и компьютерное зрение',
        description: 'TensorFlow Lite, распознавание объектов, машинное обучение',
        level: 'advanced',
        duration: '90 мин',
        sections: [
            {
                id: 'tensorflow',
                title: 'TensorFlow Lite для FTC',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `TfodProcessor tfod = new TfodProcessor.Builder()
    .setModelAssetName("game_elements.tflite")
    .setModelLabels(new String[]{"cone", "cube", "sphere"})
    .build();

VisionPortal visionPortal = new VisionPortal.Builder()
    .setCamera(hardwareMap.get(WebcamName.class, "Webcam 1"))
    .addProcessor(tfod)
    .build();` },
                    { type: 'heading', level: 3, content: 'Обработка распознаваний' },
                    {
                        type: 'code', language: 'java', content: `List<Recognition> recognitions = tfod.getRecognitions();

for (Recognition recognition : recognitions) {
    telemetry.addData("Объект", recognition.getLabel());
    telemetry.addData("Уверенность", "%.2f%%", recognition.getConfidence() * 100);
    
    double x = (recognition.getLeft() + recognition.getRight()) / 2;
    double y = (recognition.getTop() + recognition.getBottom()) / 2;
    telemetry.addData("Позиция", "(%.0f, %.0f)", x, y);
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Распознавание элементов', description: 'Настройте TensorFlow для распознавания игровых элементов' },
            { type: 'task', title: 'Адаптивная стратегия', description: 'Выбор действия на основе распознанного объекта' }
        ],
        quiz: [
            { id: 'q11-1', question: 'Что такое TensorFlow Lite?', options: ['Датчик', 'Библиотека машинного обучения', 'Мотор', 'Язык программирования'], correctAnswer: 1, explanation: 'TensorFlow Lite - облегчённая версия TensorFlow для мобильных устройств.' }
        ]
    },
    {
        id: 'lesson-12',
        number: 12,
        title: 'Подготовка к соревнованиям',
        description: 'Организация кода, тестирование, документация, стратегия турнира',
        level: 'advanced',
        duration: '75 мин',
        sections: [
            {
                id: 'code-organization',
                title: 'Организация кода',
                blocks: [
                    { type: 'heading', level: 3, content: 'Структура проекта' },
                    {
                        type: 'code', language: 'text', content: `teamcode/
├── subsystems/
│   ├── DriveSubsystem.java
│   ├── LiftSubsystem.java
│   └── ClawSubsystem.java
├── commands/
│   ├── DriveCommand.java
│   └── AutoSequences.java
├── autonomous/
│   ├── LeftAuto.java
│   └── RightAuto.java
├── teleop/
│   └── MainTeleOp.java
└── Constants.java` },
                    { type: 'heading', level: 3, content: 'Константы' },
                    {
                        type: 'code', language: 'java', content: `public class Constants {
    // Порты
    public static final String FRONT_LEFT = "front_left";
    public static final String FRONT_RIGHT = "front_right";
    
    // Позиции лифта
    public static final int LIFT_GROUND = 0;
    public static final int LIFT_LOW = 500;
    public static final int LIFT_MID = 1000;
    public static final int LIFT_HIGH = 1500;
    
    // Позиции захвата
    public static final double CLAW_OPEN = 0.7;
    public static final double CLAW_CLOSED = 0.3;
}` }
                ]
            },
            {
                id: 'testing',
                title: 'Тестирование и отладка',
                blocks: [
                    { type: 'heading', level: 3, content: 'Чеклист перед матчем' },
                    {
                        type: 'list', ordered: true, items: [
                            'Батарея заряжена (>12.5V)',
                            'Все моторы подключены',
                            'Конфигурация активна',
                            'Камера работает',
                            'Автономка выбрана правильно'
                        ]
                    },
                    { type: 'heading', level: 3, content: 'Система логирования' },
                    {
                        type: 'code', language: 'java', content: `public void log(String tag, String message) {
    telemetry.addData(tag, message);
    telemetry.update();
    
    // Можно также записывать в файл для анализа
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Организация проекта', description: 'Реорганизуйте код по папкам и создайте Constants.java' },
            { type: 'task', title: 'Подготовка к турниру', description: 'Создайте чеклисты', subtasks: ['Чеклист оборудования', 'Чеклист кода', 'Стратегия на турнир'] }
        ],
        quiz: [
            { id: 'q12-1', question: 'Зачем выносить константы в отдельный класс?', options: ['Для красоты', 'Для удобства изменения и единообразия', 'Для скорости', 'Не нужно'], correctAnswer: 1, explanation: 'Константы в одном месте упрощают настройку и исключают ошибки.' },
            { id: 'q12-2', question: 'Что проверить перед матчем?', options: ['Только батарею', 'Батарею, подключения, конфигурацию, камеру', 'Ничего', 'Только код'], correctAnswer: 1, explanation: 'Полная проверка всех систем критична для успеха на турнире.' }
        ]
    }
];
