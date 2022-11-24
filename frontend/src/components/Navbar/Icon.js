import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./icon.css";

const Icon = (props) => {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    console.log(props.goto)
  }, [])
  
  return (
    <>
      <div className="flex-col">
        <div
          className="flex flex-col cursor-pointer rounded-md mb-2 hover:bg-gray-200 w-20 justify-center items-center"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <Link to={`${props.goto}`}>

          <props.Icon
            sx={{
              width: 25,
              height: 25,
              color: `${props.active ? "blue" : ""}`,
            }}
            className={`my-1 ${props.active ? "active" : ""}`}
          />
          </Link>
        </div>
        {props.blueBar && (
          <div
            className={`${props.active ? "bluebar-active" : "bluebar"}`}
          ></div>
        )}
        {isShown && props.extraInfo !== "" && (
          <div className="extramenu">{props.extraInfo}</div>
        )}
      </div>
    </>
  );
};

export default Icon;
