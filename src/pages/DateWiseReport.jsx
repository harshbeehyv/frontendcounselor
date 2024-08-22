import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axios";
import { getColorClass } from "../services/StylingFns";

const DateWiseReport = () => {
  const { id } = useParams();
  const counselor = JSON.parse(localStorage.getItem("loggedInCounselor"));
  console.log(counselor);

  const [entries, setEntries] = useState([]);

  const fetchEntries = () => {
    axios
      .get(
        `sadhana-entry/all-entries/counselor-id/${counselor.counselorid}/date/${id}`
      )
      .then((response) => {
        // if(response.data)
        setEntries(response.data);
      })
      .catch((error) => console.log("error"));
  };
  useEffect(() => {
    fetchEntries();
  }, [id]);

  console.log(entries);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center my-4">{id} Report</h1>

      <div className="overflow-x-auto">
        <table className="m-4 overflow-x-auto">
          <thead className="bg-gray-800 text-white text-[20px]">
            <tr>
              <th className="p-2 border-b sticky left-0 border-gray-200 z-10 bg-gray-800">
                User Name
              </th>
              <th className="p-2 border-b border-gray-200 bg-gray-800">
                Chanting Completion Time
              </th>
              <th className="p-2 border-b border-gray-200 bg-gray-800">
                Book Reading Duration
              </th>
              <th className="p-2 border-b border-gray-200 bg-gray-800">
                Lecture Hearing Duration
              </th>
              <th className="p-2 border-b border-gray-200 bg-gray-800">
                Chanting Attendance
              </th>
              <th className="p-2 border-b border-gray-200 bg-gray-800">
                Mangal Aarti Attendance
              </th>
              <th className="p-2 border-b border-gray-200 bg-gray-800">
                SB Class Attendance
              </th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr
                className="hover:bg-gray-100 p-2 text-[28px]  border-b border-gray-200 bg-white"
                key={entry.sadhanaEntryId}
              >
                <td className="bg-blue-100 sticky left-0 pr-4 ">
                  {entry?.username || "NF"}
                </td>
                <td
                  className={`${getColorClass(
                    entry.chantingCompletionTime,
                    "chanting-completion-time"
                  )}`}
                >
                  {entry.chantingCompletionTime || "NF"}
                </td>
                <td
                  className={`${getColorClass(
                    entry.bookReadingDuration,
                    "book-reading-duration"
                  )}`}
                >
                  {entry.bookReadingDuration || "NF"}
                </td>
                <td
                  className={`${getColorClass(
                    entry.lectureHearingDuration,
                    "lecture-hearing-duration"
                  )}`}
                >
                  {entry.lectureHearingDuration || "NF"}
                </td>
                <td
                  className={`${getColorClass(
                    entry.chantingAttendance,
                    "chanting-attendance"
                  )}`}
                >
                  {entry.chantingAttendance || "NF"}
                </td>
                <td
                  className={`${getColorClass(
                    entry.mangalAartiAttendance,
                    "mangal--arti-attendance"
                  )}`}
                >
                  {entry.mangalAartiAttendance || "NF"}
                </td>
                <td
                  className={`${getColorClass(
                    entry.sbClassAttendance,
                    "sb-class-attendance"
                  )}`}
                >
                  {entry.sbClassAttendance || "NF"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateWiseReport;
