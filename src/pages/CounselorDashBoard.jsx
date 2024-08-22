import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import { eventsInfoObj } from "../services/EventScoresSummaries";
import Header from "../components/Header";
import OptionCard from "../components/OptionCard";
import { useState, useEffect } from "react";
import Date from "../counselor-app-assets/date.jpg"
import Devotee from "../counselor-app-assets/devotee.png";
import SummaryData from "../counselor-app-assets/summary.jpg"

const CounselorDashBoard = () => {
  const navigate = useNavigate();
  const counselor = JSON.parse(localStorage.getItem("loggedInCounselor"));

  const handleButtonClick = (eventName) => {
    navigate(`/event-wise-report/${counselor.counselorid}/${eventName}`);
  };

  const [optionsData, setOptionsData] = useState([
    {
      id: 1,
      img: SummaryData,
      title: "Master Summary",
      link: `/all-users-all-events-summary/${counselor.counselorid}`,
      aosDelay: "0",
    },
    {
      id: 2,
      img: Devotee,
      title: "Counselee wise report",
      link: "counselees-list",
      aosDelay: "200",
    },
    {
      id: 3,
      img: Date,
      title: "Date wise Report",
      link: "all-dates",
      aosDelay: "400",

    },
  ]);

  useEffect(() => {
    const newOptions = Object.keys(eventsInfoObj).map((eventKey, index) => {
      return {
        id: optionsData.length + index + 1, // Ensure unique id for each new option
        img: eventsInfoObj[eventKey].img,
        title: eventsInfoObj[eventKey].title,
        link: `/event-wise-report/${counselor.counselorid}/${eventKey}`, // Use correct template literal syntax
        aosDelay: (optionsData.length + index) * 200, // Correctly calculate the delay
      };
    });

    setOptionsData((prevOptions) => [...prevOptions, ...newOptions]); // Update the state correctly
  }, [eventsInfoObj, counselor.counselorid]);

  return (
    <>
      <h1>Hsssi {counselor?.name}, welcome to the counselor dashboard</h1>

      <OptionCard data={optionsData} />

      {/* {Object.keys(eventsInfoObj).map((eventKey) => (
        <button onClick={() => handleButtonClick(eventKey)} key={eventKey}>
          {eventsInfoObj[eventKey].title}
        </button>
      ))} */}
      {/* <button
        onClick={() =>
          navigate(`/all-users-all-events-summary/${counselor.counselorid}`)
        }
      >
        Summary of All Events for All Users
      </button> */}
    </>
  );
};

export default CounselorDashBoard;
