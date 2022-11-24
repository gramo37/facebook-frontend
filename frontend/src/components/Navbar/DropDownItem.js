import React from "react";

const DropDownItem = (props) => {
  const { message, Icon, func } = props;
  return (
    <>
      <li onClick={func} className="rounded-md my-1 px-2 py-2 flex justify-start items-center cursor-pointer hover:bg-gray-400">
        <div style={{borderRadius: "100%"}} className="bg-gray-300 p-2 mr-2 "><Icon sx={{ width: 25, height: 25 }} /></div>
        <p className="text-lg font-semibold">{message}</p>
      </li>
    </>
  );
};

export default DropDownItem;
