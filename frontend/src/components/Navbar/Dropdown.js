import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import DropDownItem from "./DropDownItem";

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <div ref={props.dropDownRef} className="opacity-0 absolute right-0 translate-y-[120px] -translate-x-2 rounded-md bg-white px-2 py-4 shadow-md">
        <ul>
            <DropDownItem message="Show Profile" Icon={AccountCircleIcon}/>
            <DropDownItem message="Logout" Icon={LogoutIcon} func={()=>logout()}/>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
