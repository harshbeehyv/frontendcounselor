import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateRangePicker = ({ handleFromDateChange, handleToDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState("Last 7 Days");

  const dateChangeFrom = (date) => {
    if (date) {
      const fromDate = moment(date).format("YYYY-MM-DD");
      handleFromDateChange(fromDate);
      setStartDate(date);
    }
  };

  const dateChangeTo = (date) => {
    if (date) {
      const toDate = moment(date).format("YYYY-MM-DD");
      handleToDateChange(toDate);
      setEndDate(date);
    }
  };

  const setFromAndToDates = (daysBeforeTodayFrom, daysBeforeTodayTo) => {
    dateChangeFrom(moment().subtract(daysBeforeTodayFrom, "days").toDate());
    dateChangeTo(moment().subtract(daysBeforeTodayTo, "days").toDate());
  };

  const handleDateRangeChange = (e) => {
    const dateRange = e.target.value;
    setDateRange(dateRange);

    switch (dateRange) {
      case "Last 7 Days":
        setFromAndToDates(7, 0);
        break;
      case "Last 14 Days":
        setFromAndToDates(14, 0);
        break;
      case "Last 30 Days":
        setFromAndToDates(30, 0);
        break;
      case "Last 60 Days":
        setFromAndToDates(60, 0);
        break;
      case "Custom":
        setStartDate(null);
        setEndDate(null);
        break;
      default:
        console.log("Unknown selection");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <label
          htmlFor="dateRange"
          className="block text-sm font-medium text-gray-700"
        >
          Select Range Of Date
        </label>
        <select
          id="dateRange"
          value={dateRange}
          onChange={handleDateRangeChange}
          className="block w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 14 Days">Last 14 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 60 Days">Last 60 Days</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      {dateRange === "Custom" && (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              From
            </label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={dateChangeFrom}
              className="block w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Select date start"
            />
          </div>
          
          <div className="relative">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              To
            </label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={dateChangeTo}
              className="block w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Select date end"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

// import { useState } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";

// import moment from "moment";
// const DateRangePicker = ({ handleFromDateChange, handleToDateChange }) => {
//   const dateChangeFrom = (date) => {
//     if (date) {
//       console.log(date);
//       const fromDate = moment(date.$d || date).format("YYYY-MM-DD");
//       console.log(fromDate);
//       handleFromDateChange(fromDate);
//     }
//   };

//   const dateChangeTo = (date) => {
//     if (date) {
//       console.log(date);
//       const toDate = moment(date.$d).format("YYYY-MM-DD");
//       console.log(toDate);
//       handleToDateChange(toDate);
//     }
//   };

//   const setFromAndToDates = (daysBeforeTodayFrom, daysBeforeTodayTo) => {
//     dateChangeFrom(moment().subtract(daysBeforeTodayFrom, "days"));
//     dateChangeTo(moment().subtract(daysBeforeTodayTo, "days"));
//   };

//   const handleDateRangeChange = (e) => {
//     const dateRange = e.target.value;
//     setDateRange(dateRange);

//     switch (dateRange) {
//       case "Last 7 Days":
//         setFromAndToDates(7, 0);
//         break;
//       case "Last 14 Days":
//         setFromAndToDates(14, 0);
//         break;
//       case "Last 30 Days":
//         setFromAndToDates(30, 0);
//         break;
//       case "Last 60 Days":
//         setFromAndToDates(60, 0);
//         break;
//       case "Custom":
//         break;
//       default:
//         console.log("Unknown selection");
//     }
//   };

//   const [dateRange, setDateRange] = useState("Last 7 Days");

//   return (
//     <div className="flex items-center space-x-4">
//       <Box sx={{ minWidth: 120 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Select Range Of Date</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={dateRange}
//             label="Select Range Of Date"
//             onChange={handleDateRangeChange}
//           >
//             <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
//             <MenuItem value="Last 14 Days">Last 14 Days</MenuItem>
//             <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
//             <MenuItem value="Last 60 Days">Last 60 Days</MenuItem>
//             <MenuItem value="Custom">Custom</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {dateRange === "Custom" ? (
//         <div>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="From"
//               inputFormat="MM/dd/yyyy"
//               value={null}
//               onChange={dateChangeFrom}
//               renderInput={(params) => <input {...params} />}
//             />
//           </LocalizationProvider>

//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="To"
//               inputFormat="MM/dd/yyyy"
//               value={null}
//               onChange={dateChangeTo}
//               renderInput={(params) => <input {...params} />}
//             />
//           </LocalizationProvider>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default DateRangePicker;
