import React from "react";
import Navbar from "../Navbar/Navbar";
import Friend from "./Friend";

const Friends = () => {
    
  return (
    <>
      <Navbar show="friends" />
      <div className="pt-16">
        <Friend name="Prasanna Gramopadhye"/>
      </div>
    </>
  );
};

export default Friends;
