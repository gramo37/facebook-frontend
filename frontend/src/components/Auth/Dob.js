import React from "react";

const Dob = (props) => {
  const { input } = props;

  let days = [];
  for (let index = 1; index <= 31; index++) {
    days[index] = index;
  }
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
  let years = [];
  for (let index = 1905; index < 2005; index++) {
      years[index] = index;
      
  }
  return (
  <>
    {input=="Day" && days.map((item)=>{
        return (<option value={item} key={item}>{item}</option>)
    })}
    {input=="Month" && months.map((item)=>{
        return (<option value={item} key={item}>{item}</option>)
    })}
    {input=="Year" && years.map((item)=>{
        return (<option value={item} key={item}>{item}</option>)
    })}
  </>)
};

export default Dob;
