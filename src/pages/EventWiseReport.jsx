import { useEffect, useState } from "react";
import axios from "../services/axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { calcualateDatesArrayDecreasing } from "../services/calculateDatesArray";
import { getColorClass } from "../services/StylingFns";
import {
  calculateDaysFilledForPercentage,
  eventsInfoObj,
} from "../services/EventScoresSummaries";
import DateRangePicker from "../components/DateRangePicker";
import Loader from "../components/Loader";

const EventWiseReport = () => {
  const [entries, setEntries] = useState({});
  const { counselorid, eventName } = useParams();
  const [date1, setDate1] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [date2, setDate2] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [summary, setSummary] = useState({});

  const fetchEntries = () => {
    axios
      .get(
        `sadhana-entry/all-entries/counselor-id/${counselorid}/event/${eventName}/date1/${date1}/date2/${date2}`
      )
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => console.log("error"));
  };

  const calculateSortedSummary = () => {
    const newSummary = {};
    Object.entries(entries).forEach(([name, values]) => {
      let val = 0;
      const fn = eventsInfoObj[eventName]?.getSummaryFn;
      if (fn) {
        val = fn(values);
      }
      newSummary[name] = val;
    });

    const sortedSummaryArray = Object.entries(newSummary).sort((a, b) => {
      const getMinutes = (value) => {
        if (typeof value === "string") {
          const duration = moment.duration(value);
          if (eventName === "chanting-completion-time")
            return duration.asMinutes() * -1;
          else return duration.asMinutes();
        }
        return value;
      };

      return getMinutes(b[1]) - getMinutes(a[1]);
    });

    setSummary(Object.fromEntries(sortedSummaryArray));
  };

  useEffect(() => {
    fetchEntries();
  }, [counselorid, eventName, date1, date2]);

  useEffect(() => {
    calculateSortedSummary();
  }, [entries]);

  const renderTable = () => {
    const dates = calcualateDatesArrayDecreasing(date1, date2);

    const tableHeaders = (
      <tr>
        <th className="p-2  sticky left-0 bg-gray-800 ">Name</th>
        <th className="p-2  bg-gray-800">% Days filled for</th>
        <th className="p-2 bg-gray-800">
          {eventsInfoObj[eventName].summaryTitle}
        </th>
        {dates.map((date) => (
          <th key={date} className="p-2 bg-gray-800">
            {moment(date).format("D MMMM")}
          </th>
        ))}
      </tr>
    );

    const tableRows = Object.entries(summary).map(([name, summaryValue]) => {
      let noOfDaysFilledForPercentage = calculateDaysFilledForPercentage(
        entries[name]
      );

      console.log(eventName);

      return (
        <tr key={name} className="hover:bg-gray-100 border-gray-200">
          <td className="p-2 border-b border-gray-200 bg-blue-100  sticky left-0">
            {name}
          </td>
          <td
            className={`p-2 border-b border-gray-200 ${getColorClass(
              noOfDaysFilledForPercentage,
              "no-of-days-filled-for-percentage"
            )}`}
          >
            {noOfDaysFilledForPercentage}
          </td>
          <td
            className={`p-2 border-b border-gray-200 ${getColorClass(
              summaryValue,
              eventsInfoObj[eventName]?.summaryTitle
            )}`}
          >
            {summaryValue}
          </td>
          {dates.map((date) => {
            let val = entries[name][date]; // Assuming entries and name are defined in your component
            return (
              <td
                key={`${name}-${date}`}
                className={`p-2 border-b border-gray-200 ${getColorClass(
                  val,
                  eventName
                )}`}
              >
                {val || "NF"}
              </td>
            );
          })}
        </tr>
      );
    });

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-x-auto">
          <thead className="bg-gray-800 border-b border-gray-200 text-white">
            {tableHeaders}
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };

  const handleFromDateChange = (fromDate) => {
    setDate1(fromDate);
  };

  const handleToDateChange = (toDate) => {
    setDate2(toDate);
  };

  return (
    <div className="container mx-auto p-4">
      <DateRangePicker
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
      />

      <h1 className="text-3xl font-bold text-center my-4">
        {eventsInfoObj[eventName].title}
      </h1>
      {/* <Loader/> */}

      <div className="overflow-x-auto">{renderTable()}</div>
    </div>
  );
};

export default EventWiseReport;
