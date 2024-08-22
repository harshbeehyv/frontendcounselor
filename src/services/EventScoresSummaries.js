import moment from "moment";
import DhamYatra  from "../assets/DhamYatra/dhamyatra.png";
import BookReading from "../counselor-app-assets/book-reading.jpeg";
import ChantingAttendance from "../counselor-app-assets/chanting-attendance.jpg";
import ChantingCompletionTime from "../counselor-app-assets/chanting-completion-time.jpg";
import MangalAartiAttendance from "../counselor-app-assets/mangal--aarti-attendance.jpg";
import SbClassAttendance from "../counselor-app-assets/sb-class-attendance.jpg";
import LectureHearing from "../counselor-app-assets/lecture-hearing.jpg";
import Date from "../counselor-app-assets/date.jpg"


export function getObjectLength(obj) {
  return Object.keys(obj).length;
}

export function getNonEmptyValuesCount(obj) {
  return Object.values(obj).filter((value) => value !== "").length;
}

export function calculateDaysFilledForPercentage(obj) {
  return Math.round(getNonEmptyValuesCount(obj)*100/getObjectLength(obj));
}
export function formatDuration(duration) {
  const hours = Math.floor(duration?.asHours());
  const minutes = duration.minutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export function calculateTotalDuration(userEventValues) {
  return Object.values(userEventValues).reduce((total, duration) => {
    if (duration) {
      return total.add(moment.duration(duration));
    }
    return total;
  }, moment.duration());
}

export function calculateDaysFilledForPercentageForAllUsers(data) {
  const result = {};

  // Iterate through each person in the original data object
  Object.keys(data).forEach((person) => {
    const totalDays = getObjectLength(data[person]);
    const filledDays = getNonEmptyValuesCount(data[person]);
    const percentage = (filledDays / totalDays) * 100;

    // Store the calculated percentage for the person
    result[person] = percentage.toFixed(2); // Rounded to 2 decimal places
  });

  return result;
}

export function calculateFormattedTotalDuration(userEventValues) {
  return formatDuration(calculateTotalDuration(userEventValues));
}

export function calculateFormattedAverageTime(userEventValues) {
  const totalNonEmptyValueDays = getNonEmptyValuesCount(userEventValues);
  if (totalNonEmptyValueDays === 0) return "N/A";
  const totalDuration = calculateTotalDuration(userEventValues);
  const averageTime = moment.duration(
    totalDuration.asMilliseconds() / totalNonEmptyValueDays
  );

  return formatDuration(averageTime);
}

export function calculateTotalPresents(userEventValues) {
  return Object.values(userEventValues).reduce((count, attendance) => {
    return attendance && attendance === "P" ? count + 1 : count;
  }, 0);
}

export function calculatePresentPercentage(userEventValues) {
  const totalDays = getObjectLength(userEventValues);

  const presentCount = calculateTotalPresents(userEventValues);

  const percentage = Math.round((presentCount / totalDays) * 100).toString();
  return percentage;
}

export const eventsInfoObj = {
  "chanting-attendance": {
    title: "Chanting Attendance",
    getSummaryFn: calculatePresentPercentage,
    summaryTitle: "% of Present",
    summaryTitle2: "P% (Chanting)",
    img: ChantingAttendance,
  },
  "mangal-aarti-attendance": {
    title: "Mangal Aarti Attendance",
    getSummaryFn: calculatePresentPercentage,
    summaryTitle: "% of Present",
    summaryTitle2: "P% (MA)",
    img: MangalAartiAttendance,
  },
  "sb-class-attendance": {
    title: "SB Class Attendance",
    getSummaryFn: calculatePresentPercentage,
    summaryTitle: "% of Present",
    summaryTitle2: "P% (SB Class)",
    img: SbClassAttendance,
  },

  "chanting-completion-time": {
    title: "Chanting Completion Time",
    getSummaryFn: calculateFormattedAverageTime,
    summaryTitle: "Avg Time",
    summaryTitle2: "Avg Chanting Comp Time",
    img: ChantingCompletionTime,
  },

  "book-reading-duration": {
    title: "Book Reading Duration",
    getSummaryFn: calculateFormattedTotalDuration,
    summaryTitle: "Total Duration",
    summaryTitle2: "Total Dur (Book Reading)",
    img: BookReading,
  },
  "lecture-hearing-duration": {
    title: "Lecture Hearing Duration",
    getSummaryFn: calculateFormattedTotalDuration,
    summaryTitle: "Total duration",
    summaryTitle2: "Total Dur (Lecture Hearing)",
    img: LectureHearing,
  },
};
