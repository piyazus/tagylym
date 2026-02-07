// Combined FTC Coding Lessons export
import { ftcCodingLessons } from './ftcCodingLessons';
import { ftcCodingLessonsAdvanced } from './ftcCodingLessonsAdvanced';

// LEGO Robotics (FLL) Lessons export
import { legoRoboticsLessonsBasic } from './legoRoboticsLessonsBasic';
import { legoRoboticsLessonsIntermediate } from './legoRoboticsLessonsIntermediate';
import { legoRoboticsLessonsAdvanced } from './legoRoboticsLessonsAdvanced';

export const allFtcCodingLessons = [...ftcCodingLessons, ...ftcCodingLessonsAdvanced];
export const allLegoRoboticsLessons = [
    ...legoRoboticsLessonsBasic,
    ...legoRoboticsLessonsIntermediate,
    ...legoRoboticsLessonsAdvanced
];

export { ftcCodingLessons, ftcCodingLessonsAdvanced };
export { legoRoboticsLessonsBasic, legoRoboticsLessonsIntermediate, legoRoboticsLessonsAdvanced };
