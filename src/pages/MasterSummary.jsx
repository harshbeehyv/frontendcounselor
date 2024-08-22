import { useState, useEffect } from "react";
import {
  eventsInfoObj,
  calculateDaysFilledForPercentageForAllUsers,
} from "../services/EventScoresSummaries";
import moment from "moment";
import axios from "../services/axios";
import { useParams } from "react-router-dom";
import DateRangePicker from "../components/DateRangePicker";
const MasterSummary = () => {
  const { counselorid } = useParams();
  const [randomEventValue, setRandomEventValue] = useState({});

  const [date1, setDate1] = useState(
    moment().subtract(4, "days").format("YYYY-MM-DD")
  );
  const [date2, setDate2] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  const [entries, setEntries] = useState({});

  const fetchEntries = async (counselorid, date1, date2) => {
    const entries = {};

    for (const eventName of Object.keys(eventsInfoObj)) {
      try {
        const response = await axios.get(
          `sadhana-entry/all-entries/counselor-id/${counselorid}/event/${eventName}/date1/${date1}/date2/${date2}`
        );

        entries[eventName] = response.data;
      } catch (error) {
        console.error(`Error fetching data for ${eventName}:`, error);
        entries[eventName] = [];
      }
    }
    setRandomEventValue(Object.values(entries)[0]);

    return entries;
  };

  useEffect(() => {
    fetchEntries(counselorid, date1, date2)
      .then((entries) => {
        setEntries(entries);
      })
      .catch((error) => console.error("Error fetching entries:", error));
  }, [counselorid, date1, date2]);

  function generateEventSummary(data) {
    const summary = {};

    for (const eventKey in eventsInfoObj) {
      if (Object.hasOwnProperty.call(eventsInfoObj, eventKey)) {
        const event = eventsInfoObj[eventKey];
        const { getSummaryFn } = event;

        summary[eventKey] = {};
        for (const user in data[eventKey]) {
          if (Object.hasOwnProperty.call(data[eventKey], user)) {
            const userEventValues = data[eventKey][user];
            const summaryValue = getSummaryFn(userEventValues);

            summary[eventKey][user] = summaryValue;
          }
        }
      }
    }

    let unsortedData =
      calculateDaysFilledForPercentageForAllUsers(randomEventValue);

    console.log(summary["days-filled-for-percentage"]);

    summary["days-filled-for-percentage"] = Object.fromEntries(
      Object.entries(unsortedData).sort(
        (a, b) => parseFloat(b[1]) - parseFloat(a[1])
      )
    );

    // summary["days-filled-for-percentage"].sort((a,b)=>b[1]-a[1]);

    return summary;
  }

  const eventSummaries = generateEventSummary(entries);

  console.log(eventSummaries);

  const handleFromDateChange = (fromDate) => {
    setDate1(fromDate);
  };
  const handleToDateChange = (toDate) => {
    setDate2(toDate);
  };

  const eventKeys = Object.keys(eventsInfoObj);
  return (
    <div className="container mx-auto p-4">
      <DateRangePicker
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
      />
      <h1 className="text-3xl font-bold text-center my-4">
        User Summary Table
      </h1>

      <div className="overflow-x-auto">
        <table className="overflow-x-auto min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="text-[24px]">
              <th className="p-2 border-b text-white border-gray-200 sticky left-0 bg-gray-800">
                Name
              </th>
              <th className="p-2 border-b text-white border-gray-200 bg-gray-800">
                % (Days Filled For)
              </th>
              {eventKeys.map((eventKey) => (
                <th
                  key={eventKey}
                  className="p-2 border-b border-gray-200 bg-gray-800 text-white"
                >
                  {eventsInfoObj[eventKey].summaryTitle2}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(eventSummaries["days-filled-for-percentage"]).map(
              (userName) => (
                <tr key={userName} className="hover:bg-gray-100 text-[28px]">
                  <td className="p-2 border-b bg-blue-100 border-gray-20 sticky left-0">
                    {userName}
                  </td>
                  <td className="p-2 border-b border-gray-200 bg-white">
                    {eventSummaries["days-filled-for-percentage"][userName]}
                  </td>
                  {eventKeys.map((eventKey) => (
                    <td
                      key={`${userName}-${eventKey}`}
                      className="p-2 border-b border-gray-200 bg-white"
                    >
                      {eventSummaries[eventKey][userName]}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterSummary;
