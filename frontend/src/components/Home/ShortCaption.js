import React, { useState } from "react";

const ShortCaption = (props) => {
  const [postCaption, setPostCaption] = useState(0);

  return (
    <>
      <div>
        {!postCaption ? props?.caption?.substring(0, 200) : props?.caption}
        <p
          onClick={()=>setPostCaption(!postCaption)}
          className="decoration-gray-500 cursor-pointer underline underline-offset-1"
        >
          Read {!postCaption ? "More" : "Less"}
        </p>
      </div>
    </>
  );
};

export default ShortCaption;
