import React from "react";
import { Avatar } from "@mui/material";

const Friend = (props) => {
  return (
    <div className="overflow-hidden flex justify-around w-full px-4 my-4">
      <div className="bg-gray-300 shadow-lg py-4 rounded-md flex justify-between items-center w-full px-2">
        <Avatar className="shadow-lg"/>
        <p style={{ margin: "0 0.5rem" }} className="m-2">
          {props.name}
        </p>
        <button className="bg-blue-500 px-2 py-1 rounded-md shadow-md text-white">
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default Friend;
