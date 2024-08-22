import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtected = ({ Component }) => {

    const navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('loggedInUser')===null)
        navigate("/user-login")
    })
  return (
    <div>
      <Component />
    </div>
  );
};

export default UserProtected;
