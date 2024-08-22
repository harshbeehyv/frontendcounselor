import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axios";
import ShowAveragesUserwise from "./ShowAveragesUserwise";
import { convertToDMMMM } from "../services/calculateDatesArray";



const ShowReportUserwise = () => {
  const { id } = useParams();

  const [entries, setEntries] = useState([]);
  const [user,setUser]=useState();

  const fetchEntries = () => {
    axios
      .get(`sadhana-entry/all-entries/user/${id}`)
      .then((response) => {
        setEntries(response.data.sadhanaEntries.reverse())
        setUser(response.data.user);
     
      })
      .catch((error) => console.log("error"));
  };
  useEffect(() => {
    fetchEntries();
  }, [id]);

  console.log(entries);

  return (
    <div>
      {/* <h1>Sadhana Entries for {user.name}</h1> */}

      <ShowAveragesUserwise entries={entries} days={30} />
<ShowAveragesUserwise entries={entries} days={7}/>

<br />
<br />

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Chanting Completion Time</th>
            <th className="px-4 py-2">Book Reading Duration</th>
            <th className="px-4 py-2">Lecture Hearing Duration</th>
            <th className="px-4 py-2">Chanting Attendance</th>
            <th className="px-4 py-2">Mangal Aarti Attendance</th>
            <th className="px-4 py-2">SB Class Attendance</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.sadhanaEntryId} className="bg-gray-100">
              <td className="border px-4 py-2">{convertToDMMMM(entry.dateOfSadhana)}</td>
              <td className="border px-4 py-2">
                {entry.chantingCompletionTime}
              </td>
              <td className="border px-4 py-2">{entry.bookReadingDuration}</td>
              <td className="border px-4 py-2">
                {entry.lectureHearingDuration}
              </td>
              <td className="border px-4 py-2">{entry.chantingAttendance}</td>
              <td className="border px-4 py-2">
                {entry.mangalAartiAttendance}
              </td>
              <td className="border px-4 py-2">{entry.sbClassAttendance}</td>
            </tr>
          ))}
        </tbody>
      </table>




    </div>
  );
};

export default ShowReportUserwise;
