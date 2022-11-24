import React from 'react'

const Alert = (props) => {

    const {message, type} = props;

  return (
    <>
        {<div className={`${type === "error" && "bg-red-500"} ${type === "success" && "bg-green-500"} rounded-md absolute bottom-10 opacity-90 left-1/2 -translate-x-1/2 w-1/2 flex justify-center items-center text-white h-10`}>
            {message}
        </div>}
    </>
  )
}

export default Alert