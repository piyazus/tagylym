// FTC Coding Lessons Data - Part 2 (Lessons 7-12)
import { Lesson } from '@/types/lesson';

export const ftcCodingLessonsAdvanced: Lesson[] = [
    {
        id: 'lesson-7',
        number: 7,
        title: 'Конечные автоматы (State Machines)',
        description: 'Структурированные автономные программы с переходами между состояниями',
        level: 'intermediate',
        duration: '65 мин',
        sections: [
            {
                id: 'state-machine-intro',
                title: 'Что такое State Machine',
                blocks: [
                    { type: 'text', content: 'State Machine - паттерн программирования, где программа находится в одном из нескольких состояний и переходит между ними по условиям.' },
                    { type: 'list', ordered: false, items: ['Читаемость - видна вся последовательность', 'Отладка - легко найти, где застрял робот', 'Гибкость - можно добавлять/удалять состояния'] },
                    {
                        type: 'code', language: 'java', filename: 'StateMachineAuto.java', content: `@Autonomous(name = "State Machine Auto")
public class StateMachineAuto extends LinearOpMode {
    
    enum State {
        DRIVE_FORWARD,
        TURN_LEFT,
        PICK_UP,
        RETURN,
        DONE
    }
    
    private State currentState = State.DRIVE_FORWARD;
    private ElapsedTime stateTimer = new ElapsedTime();
    
    @Override
    public void runOpMode() {
        // Инициализация...
        
        waitForStart();
        stateTimer.reset();
        
        while (opModeIsActive()) {
            switch (currentState) {
                case DRIVE_FORWARD:
                    leftMotor.setPower(0.5);
                    rightMotor.setPower(0.5);
                    if (stateTimer.seconds() > 2.0) {
                        currentState = State.TURN_LEFT;
                        stateTimer.reset();
                    }
                    break;
                    
                case TURN_LEFT:
                    leftMotor.setPower(-0.3);
                    rightMotor.setPower(0.3);
                    if (stateTimer.seconds() > 1.0) {
                        currentState = State.PICK_UP;
                        stateTimer.reset();
                    }
                    break;
                    
                case PICK_UP:
                    clawServo.setPosition(0.0);
                    if (stateTimer.seconds() > 0.5) {
                        currentState = State.RETURN;
                        stateTimer.reset();
                    }
                    break;
                    
                case RETURN:
                    leftMotor.setPower(-0.5);
                    rightMotor.setPower(-0.5);
                    if (stateTimer.seconds() > 2.0) {
                        currentState = State.DONE;
                    }
                    break;
                    
                case DONE:
                    leftMotor.setPower(0);
                    rightMotor.setPower(0);
                    break;
            }
            
            telemetry.addData("State", currentState);
            telemetry.update();
        }
    }
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Сборщик мусора', description: 'Создайте State Machine с состояниями', subtasks: ['ПОИСК элемента', 'ПОДЪЕЗД', 'ЗАХВАТ', 'ВОЗВРАТ', 'СБРОС'] }
        ],
        quiz: [
            { id: 'q7-1', question: 'Какое преимущество даёт State Machine?', options: ['Быстрее выполняется', 'Легче отлаживать и понимать структуру', 'Меньше кода', 'Работает без ошибок'], correctAnswer: 1, explanation: 'State Machine делает структуру программы наглядной и упрощает отладку.' }
        ]
    },
    {
        id: 'lesson-8',
        number: 8,
        title: 'Компьютерное зрение (AprilTags)',
        description: 'VisionPortal и распознавание AprilTags для навигации',
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
    .setDrawTagID(true)
    .build();

VisionPortal visionPortal = new VisionPortal.Builder()
    .setCamera(hardwareMap.get(WebcamName.class, "Webcam 1"))
    .addProcessor(aprilTag)
    .build();` }
                ]
            },
            {
                id: 'apriltag-detection',
                title: 'Распознавание тегов',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `List<AprilTagDetection> detections = aprilTag.getDetections();

for (AprilTagDetection detection : detections) {
    int tagId = detection.id;
    double x = detection.ftcPose.x; // см от камеры
    double y = detection.ftcPose.y;
    double range = detection.ftcPose.range;
    double bearing = detection.ftcPose.bearing; // угол
    
    telemetry.addData("Tag ID", tagId);
    telemetry.addData("Range", "%.1f cm", range);
    telemetry.addData("Bearing", "%.1f°", bearing);
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Парковка по AprilTag', description: 'Подъехать к тегу на расстояние 30 см по центру' }
        ],
        quiz: [
            { id: 'q8-1', question: 'Что возвращает AprilTag detection?', options: ['Только ID тега', 'ID и позицию относительно камеры', 'Цвет тега', 'Размер тега'], correctAnswer: 1, explanation: 'AprilTag detection возвращает ID тега и его позицию (x, y, range, bearing) относительно камеры.' }
        ]
    },
    {
        id: 'lesson-9',
        number: 9,
        title: 'Продвинутая навигация с Road Runner',
        description: 'Траектории со сплайнами и точное движение',
        level: 'advanced',
        duration: '90 мин',
        sections: [
            {
                id: 'roadrunner-intro',
                title: 'Основы Road Runner',
                blocks: [
                    { type: 'text', content: 'Road Runner - библиотека для точного движения робота по сложным траекториям с использованием сплайнов.' },
                    {
                        type: 'code', language: 'java', content: `// Создание траектории
TrajectorySequence trajectory = drive.trajectorySequenceBuilder(startPose)
    .forward(50)
    .turn(Math.toRadians(90))
    .strafeRight(30)
    .splineTo(new Vector2d(60, 60), Math.toRadians(45))
    .build();

// Выполнение
drive.followTrajectorySequence(trajectory);` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Сложная траектория', description: 'Создайте траекторию для сбора 3 элементов', hints: ['Используйте splineTo для плавных поворотов'] }
        ],
        quiz: [
            { id: 'q9-1', question: 'Что такое сплайн в Road Runner?', options: ['Тип мотора', 'Плавная кривая для движения', 'Датчик', 'Режим работы'], correctAnswer: 1, explanation: 'Сплайн - математическая кривая для создания плавных траекторий без резких поворотов.' }
        ]
    },
    {
        id: 'lesson-10',
        number: 10,
        title: 'Продвинутые архитектурные паттерны',
        description: 'Event-driven архитектура и распределённые системы',
        level: 'advanced',
        duration: '80 мин',
        sections: [
            {
                id: 'event-driven',
                title: 'Событийная архитектура',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `public class EventBus {
    private Map<String, List<Consumer<Object>>> listeners = new HashMap<>();
    
    public void subscribe(String event, Consumer<Object> handler) {
        listeners.computeIfAbsent(event, k -> new ArrayList<>()).add(handler);
    }
    
    public void publish(String event, Object data) {
        List<Consumer<Object>> handlers = listeners.get(event);
        if (handlers != null) {
            for (Consumer<Object> handler : handlers) {
                handler.accept(data);
            }
        }
    }
}

// Использование
eventBus.subscribe("ELEMENT_DETECTED", data -> {
    // Реагируем на обнаружение элемента
    setState(State.APPROACH);
});` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Система мониторинга', description: 'Создайте мониторинг состояния робота', subtasks: ['Температура моторов', 'Напряжение батареи', 'Оповещения'] }
        ],
        quiz: [
            { id: 'q10-1', question: 'Зачем нужна событийная архитектура?', options: ['Для красоты кода', 'Для слабой связанности компонентов', 'Для ускорения', 'Не нужна'], correctAnswer: 1, explanation: 'Событийная архитектура позволяет компонентам взаимодействовать без прямых зависимостей.' }
        ]
    },
    {
        id: 'lesson-11',
        number: 11,
        title: 'Искусственный интеллект и компьютерное зрение',
        description: 'TensorFlow Lite для распознавания объектов',
        level: 'advanced',
        duration: '85 мин',
        sections: [
            {
                id: 'tensorflow',
                title: 'TensorFlow Lite',
                blocks: [
                    { type: 'text', content: 'TensorFlow Lite позволяет запускать нейронные сети прямо на Control Hub для распознавания игровых элементов.' },
                    {
                        type: 'code', language: 'java', content: `TfodProcessor tfod = new TfodProcessor.Builder()
    .setModelFileName("model.tflite")
    .setModelLabels(new String[]{"cone", "cube", "ball"})
    .build();

VisionPortal portal = new VisionPortal.Builder()
    .setCamera(hardwareMap.get(WebcamName.class, "Webcam 1"))
    .addProcessor(tfod)
    .build();

// Получение распознаний
List<Recognition> recognitions = tfod.getRecognitions();
for (Recognition recognition : recognitions) {
    String label = recognition.getLabel();
    float confidence = recognition.getConfidence();
    // Координаты bounding box
    float left = recognition.getLeft();
    float top = recognition.getTop();
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Распознавание элементов', description: 'Настройте распознавание игровых элементов сезона' }
        ],
        quiz: [
            { id: 'q11-1', question: 'Что возвращает TensorFlow распознавание?', options: ['Только название объекта', 'Название, уверенность и координаты', 'Только координаты', 'Цвет объекта'], correctAnswer: 1, explanation: 'TensorFlow возвращает label (название), confidence (уверенность) и bounding box (координаты).' }
        ]
    },
    {
        id: 'lesson-12',
        number: 12,
        title: 'Профессиональная разработка и соревнования',
        description: 'Архитектура проекта, тестирование и подготовка к турнирам',
        level: 'advanced',
        duration: '75 мин',
        sections: [
            {
                id: 'project-structure',
                title: 'Структура проекта',
                blocks: [
                    { type: 'text', content: 'Профессиональная организация кода упрощает командную работу и отладку.' },
                    {
                        type: 'list', ordered: false, items: [
                            'subsystems/ - подсистемы (привод, лифт, захват)',
                            'commands/ - команды для подсистем',
                            'auto/ - автономные программы',
                            'teleop/ - программы TeleOp',
                            'util/ - вспомогательные классы'
                        ]
                    }
                ]
            },
            {
                id: 'testing',
                title: 'Тестирование',
                blocks: [
                    {
                        type: 'code', language: 'java', content: `// Тестовая программа для проверки подсистем
@TeleOp(name = "Subsystem Test")
public class SubsystemTest extends LinearOpMode {
    
    @Override
    public void runOpMode() {
        DriveSubsystem drive = new DriveSubsystem(hardwareMap);
        LiftSubsystem lift = new LiftSubsystem(hardwareMap);
        
        waitForStart();
        
        // Тест привода
        telemetry.addData("Test", "Drive Forward");
        telemetry.update();
        drive.driveForward(0.3);
        sleep(1000);
        drive.stop();
        
        // Тест лифта
        telemetry.addData("Test", "Lift Up");
        telemetry.update();
        lift.goToPosition(LiftSubsystem.HIGH);
        sleep(2000);
        lift.goToPosition(LiftSubsystem.HOME);
    }
}` }
                ]
            }
        ],
        practicalTasks: [
            { type: 'task', title: 'Подготовка к турниру', description: 'Создайте полную программу для автономного периода', subtasks: ['Выбор стратегии по AprilTag', 'Сбор элементов', 'Размещение', 'Парковка'] }
        ],
        quiz: [
            { id: 'q12-1', question: 'Почему важна структура проекта?', options: ['Для красоты', 'Для командной работы и отладки', 'Не важна', 'Для скорости'], correctAnswer: 1, explanation: 'Хорошая структура упрощает командную работу, отладку и поддержку кода.' },
            { id: 'q12-2', question: 'Что нужно проверить перед турниром?', options: ['Только код', 'Код, железо, связь и батареи', 'Только батареи', 'Ничего'], correctAnswer: 1, explanation: 'Перед турниром нужно проверить все системы: код, механику, электронику и связь.' }
        ]
    }
];
