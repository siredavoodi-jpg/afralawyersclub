import type { Chapter } from "../types";
import exam from "./exam";
import lesson01 from "./lesson-01";
import lesson02 from "./lesson-02";
import lesson03 from "./lesson-03";
import lesson04 from "./lesson-04";
import lesson05 from "./lesson-05";
import lesson06 from "./lesson-06";
import lesson07 from "./lesson-07";
import lesson08 from "./lesson-08";
import lesson09 from "./lesson-09";
import lesson10 from "./lesson-10";
import lesson11 from "./lesson-11";
import lesson12 from "./lesson-12";
import lesson13 from "./lesson-13";
import lesson14 from "./lesson-14";

const chapter02: Chapter = {
  id: 2,
  title: "آشنایی با ابزارهای هوش مصنوعی",
  description: "شناخت ابزار مناسب برای هر کار",
  isActive: true,
  isFree: false,
  lessons: [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08, lesson09, lesson10, lesson11, lesson12, lesson13, lesson14],
  quiz: exam,
  quizPassThreshold: 14,
};

export default chapter02;