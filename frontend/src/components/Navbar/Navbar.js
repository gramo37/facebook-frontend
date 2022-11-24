import React, {useRef, useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import GroupIcon from '@mui/icons-material/Group';
import { deepOrange } from '@mui/material/colors';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import StoreIcon from '@mui/icons-material/Store';
import Icon from './Icon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Dropdown from './Dropdown';

const Navbar = (props) => {
  const ref =  useRef(null);
  const [toggle, settoggle] = useState(false);
  
  
  const toggleDropdown = () => {
    if(toggle) {
      ref.current.classList.add('opacity-0');
      ref.current.classList.remove('opacity-100');
    }
    else {
      ref.current.classList.add('opacity-100');
      ref.current.classList.remove('opacity-0');
    }
    settoggle(!toggle);
  }
  
  return (
    <>
      <nav className='fixed flex bg-white w-full h-16 justify-between z-10 items-center shadow-lg shadow-gray-500/50'>
        <div className='flex ml-5'>
          <Icon Icon={FacebookIcon} extraInfo="" blueBar={false}/>
          <Icon Icon={SearchIcon} extraInfo="Search" blueBar={false}/>
        </div>
        <div className='flex'>
        <Icon Icon={HomeIcon} goto="/" active={props.show === "home" ? true : false} extraInfo="Home" blueBar={true}/>
        <Icon Icon={GroupIcon} goto="/friends" active={props.show === "friends" ? true : false} extraInfo="friends" blueBar={true}/>
        <Icon Icon={WatchLaterIcon} active={props.show === "watch" ? true : false} extraInfo="Watch" blueBar={true}/>
        <Icon Icon={StoreIcon} active={props.show === "marketPlace" ? true : false} extraInfo="MarketPlace" blueBar={true}/>
        </div>
        <div className='flex justify-center items-center mr-5'>
          <Avatar sx={{width: 40, height: 40, bgcolor: deepOrange[500]}} className='cursor-pointer mr-1'>P</Avatar>
          <div className='cursor-pointer' onClick={()=>toggleDropdown()}><ArrowDropDownIcon/></div>
        </div>
        <Dropdown dropDownRef={ref}/>
      </nav>
    </>
  )
}

export default Navbar