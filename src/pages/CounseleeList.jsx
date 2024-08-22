import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const CounseleeList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const loggedInCounselorJSON = localStorage.getItem("loggedInCounselor");
  const [counselorId, setCounselorId] = useState(
    JSON.parse(loggedInCounselorJSON)?.counselorid
  );
  useEffect(() => {
    setCounselorId(JSON.parse(loggedInCounselorJSON)?.counselorid);
  }, [loggedInCounselorJSON]);

  const fetchUsers = () => {
    axios
      .get(`counselors/${counselorId}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log("error"));
  };
  useEffect(() => {
    fetchUsers();
  }, [counselorId]);

 

  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.batch]) {
      acc[user.batch] = [];
    }
    acc[user.batch].push(user);
    return acc;
  }, {});

  const handleShowReport = (userid) => {
    console.log(userid)
    navigate(`/show-report-userwise/${userid}`);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="px-4 py-2">Batch</th> */}
              <th className="px-4 py-2">Name</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedUsers).map(([batch, usersInBatch]) => (
              <React.Fragment key={batch}>
                <tr className="bg-gray-100">
                  <td colSpan="3" className="px-4 py-2 font-bold">
                    {batch}
                  </td>
                </tr>
                {usersInBatch.map((user) => (
                  <tr key={user.userid}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">
                      {/* Icons for each row */}
                      <button
                        className="cursor-pointer"
                        onClick={() => handleShowReport(user.userid)}
                      >
                        Show report{" "}
                      </button>
                      {/* <button className="mr-2 cursor-pointer">Edit </button>
                      <button className="mr-2 cursor-pointer">Delete </button> */}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CounseleeList;
