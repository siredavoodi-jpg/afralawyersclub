import type { Chapter } from "../types";
import lesson01 from "./lesson-01";
import lesson02 from "./lesson-02";
import lesson03 from "./lesson-03";
import lesson04 from "./lesson-04";
import lesson05 from "./lesson-05";
// import exam01 from "./exam"; // برای نسخه بعدی

const chapter01: Chapter = {
  id: 1,
  title: "آشنایی با هوش مصنوعی",
  description: "فصل اول: پایه مفهومی لازم برای استفاده حرفه‌ای از هوش مصنوعی در کار حقوقی",
  isActive: true,
  isFree: true,
  lessons: [lesson01, lesson02, lesson03, lesson04, lesson05],
  quiz: [], // آزمون فصل برای نسخه بعدی اضافه می‌شود
};

export default chapter01;