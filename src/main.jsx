import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "flowbite";
import FormComposer from "./FormComposer.jsx";
import UserProtected from "./UserProtected.jsx";
import UserLogin from "./UserLogin.jsx";
import CounselorLogin from "./CounselorLogin.jsx";
import CounselorDashBoard from "./pages/CounselorDashBoard.jsx";
import CounselorProtected from "./CounselorProtected.jsx";
import CounseleeList from "./pages/CounseleeList.jsx";
import ShowReportUserwise from "./pages/ShowReportUserwise.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import DateWiseReport from "./pages/DateWiseReport.jsx";
import AllDates from "./pages/AllDates.jsx";
import EventWiseReport from "./pages/EventWiseReport.jsx";
import MasterSummary from "./pages/MasterSummary.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "sadhana-form",
        element: <UserProtected Component={FormComposer} />,
      },
      { path: "user-login", element: <UserLogin /> },
      { path: "counselor-login", element: <CounselorLogin /> },
      {
        path: "counselor-dashboard",
        element: <CounselorProtected Component={CounselorDashBoard} />,
      },
      {
        path: "counselees-list",
        element: <CounselorProtected Component={CounseleeList} />,
      },

      {
        path: "show-my-report/:id",
        element: <UserProtected Component={ShowReportUserwise} />,
      },

      {
        path: "show-report-userwise/:id",
        element: <CounselorProtected Component={ShowReportUserwise} />,
      },

      {
        path: "show-report-datewise/:id",
        element: <CounselorProtected Component={DateWiseReport} />,
      },

      {
        path: "all-dates",
        element: <CounselorProtected Component={AllDates} />,
      },
      {
        path: "event-wise-report/:counselorid/:eventName",
        element: <CounselorProtected Component={EventWiseReport} />,
      },

      {
        path: "all-users-all-events-summary/:counselorid",
        element: <CounselorProtected Component={MasterSummary} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
