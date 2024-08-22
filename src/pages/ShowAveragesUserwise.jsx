import { useState, useEffect } from "react";
import moment from "moment";
import { formatDuration } from "../services/EventScoresSummaries";

const ShowAveragesUserwise = ({ entries,days }) => {


  const [averages, setAverages] = useState({
    averageBookReadingDuration: "00:00",
    averageLectureHearingDuration: "00:00",
    averageChantingCompletionTime: "00:00",
    chantingAttendancePercent: 0,
    mangalAartiAttendancePercent: 0,
    sbClassAttendancePercent: 0,
  });

  const calculateAverages = (entries) => {
    const thirtyDaysAgo = moment().subtract(days, "days").startOf("day");
    const yesterday = moment().subtract(1, "day").endOf("day");

    console.log(yesterday)
    console.log(thirtyDaysAgo)

    const last30DaysEntries = entries.filter((entry) => {
      const entryDate = moment(entry.dateOfSadhana);
      return entryDate.isBetween(thirtyDaysAgo, yesterday, undefined, '[]');
    });

    const totalEntries = last30DaysEntries.length;
    console.log(totalEntries)

    if (totalEntries === 0) return;

    let totalBookReadingDuration = moment.duration();
    let totalLectureHearingDuration = moment.duration();
    let totalChantingCompletionTime = moment.duration();
    let chantingAttendanceCount = 0;
    let mangalAartiAttendanceCount = 0;
    let sbClassAttendanceCount = 0;

    last30DaysEntries.forEach((entry) => {
      totalBookReadingDuration.add(moment.duration(entry.bookReadingDuration));
      totalLectureHearingDuration.add(
        moment.duration(entry.lectureHearingDuration)
      );
      totalChantingCompletionTime.add(
        moment.duration(entry.chantingCompletionTime)
      );

      if (entry.chantingAttendance === "P") chantingAttendanceCount++;
      if (entry.mangalAartiAttendance === "P")
        mangalAartiAttendanceCount++;
      if (entry.sbClassAttendance === "P") sbClassAttendanceCount++;
    });

    const averageBookReadingDuration =
      totalBookReadingDuration.asMilliseconds() / totalEntries;
    const averageLectureHearingDuration =
      totalLectureHearingDuration.asMilliseconds() / totalEntries;
    const averageChantingCompletionTime =
      totalChantingCompletionTime.asMilliseconds() / totalEntries;

    setAverages({
      averageBookReadingDuration: formatDuration(
        moment.duration(averageBookReadingDuration)
      ),
      averageLectureHearingDuration: formatDuration(
        moment.duration(averageLectureHearingDuration)
      ),
      averageChantingCompletionTime: formatDuration(
        moment.duration(averageChantingCompletionTime)
      ),
      chantingAttendancePercent: (chantingAttendanceCount / totalEntries) * 100,
      mangalAartiAttendancePercent:
        (mangalAartiAttendanceCount / totalEntries) * 100,
      sbClassAttendancePercent: (sbClassAttendanceCount / totalEntries) * 100,
    });
  };

  

  useEffect(() => {
    if (entries.length > 0) {
      calculateAverages(entries);
    }
  }, [entries]);

 
  return (
    <div>
      <h2 className="mt-4">
        Report for Last {days} Days
      </h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Average Book Reading Duration</th>
            <th className="px-4 py-2">Average Lecture Hearing Duration</th>
            <th className="px-4 py-2">Average Chanting Completion Time</th>
            <th className="px-4 py-2">Chanting Attendance (%)</th>
            <th className="px-4 py-2">Mangal Aarti Attendance (%)</th>
            <th className="px-4 py-2">SB Class Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2">
              {averages.averageBookReadingDuration}
            </td>
            <td className="border px-4 py-2">
              {averages.averageLectureHearingDuration}
            </td>
            <td className="border px-4 py-2">
              {averages.averageChantingCompletionTime}
            </td>
            <td className="border px-4 py-2">
              {averages.chantingAttendancePercent.toFixed(2)}%
            </td>
            <td className="border px-4 py-2">
              {averages.mangalAartiAttendancePercent.toFixed(2)}%
            </td>
            <td className="border px-4 py-2">
              {averages.sbClassAttendancePercent.toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowAveragesUserwise;
