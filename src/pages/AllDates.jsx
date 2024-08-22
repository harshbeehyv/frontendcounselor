import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DateRangePicker from "../components/DateRangePicker";

const AllDates = () => {
  const startDate = moment().subtract(59, "days");
  const endDate = moment(); // The latest date (today)

  // Calculate the start day of the week for the calendar layout
  const startDayOfWeek = startDate.day();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Last 60 Days Dates</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {Array.from({ length: 60 + startDayOfWeek }, (_, index) => {
          const date = endDate.clone().subtract(index, "days"); // Calculate date from the end date
          const dateString = date.format("D MMMM");
          const dayString = date.format("dddd"); // Get the day of the week
          const navigationDate = date.format("YYYY-MM-DD");
          const isPastDate = index < 60;
          const bgColor = isPastDate
            ? index % 2 === 0
              ? "bg-blue-100"
              : "bg-blue-200"
            : "bg-transparent";

          return (
            <div key={index} className="col-span-1">
              {isPastDate ? (
                <Link to={`/show-report-datewise/${navigationDate}`}>
                  <button
                    className={`w-full py-2 px-4 ${bgColor} text-blue-800 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  >
                    <div>{dayString}</div>
                    <div>{dateString}</div>
                  </button>
                </Link>
              ) : (
                <div className="w-full py-2 px-4 bg-transparent"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllDates;
