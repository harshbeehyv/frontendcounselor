import  { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CounselorProtected = ({Component}) => {

    const navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('loggedInCounselor')===null)
        navigate("/counselor-login")
    })
  return (
    <div>
      <Component />
    </div>
  );
};

export default CounselorProtected;
