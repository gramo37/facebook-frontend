import React, { useState, useEffect } from "react";
import image from "./demo.png";
import CloseIcon from "@mui/icons-material/Close";
import Dob from "./Dob";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
const { useDispatch, useSelector } = require("react-redux");
const { signinUser, loginUser } = require("../../redux/actions/userAction");

const Login = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isClicked, setIsClicked] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!user.loading && isClicked) {
      if (user.error) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      } else if (user.user.success) {
        
        navigate("/", { replace: true });
      }
    }
  }, [user.loading]);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loginCredentials, setLoginCredentials] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const signUpFormChangeHandler = async (e) => {
    await setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const loginFormChangeHandler = async (e) => {
    await setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
    setIsClicked(true);
  };

  const submitSignUp = async (e) => {
    await dispatch(
      signinUser(
        userDetails.firstName + userDetails.lastName,
        userDetails.email,
        userDetails.password
      )
    );
    setIsClicked(true);
  };

  const submitLogin = async (e) => {
    await dispatch(
      loginUser(loginCredentials.loginEmail, loginCredentials.loginPassword)
    );
  };

  return (
    <>
      <div
        className={`${
          !toggle ? "z-10 opacity-100" : "z-0 opacity-0"
        } transition-all z-10 flex flex-col items-center justify-center lg:flex-row lg:justify-around w-[80%] lg:items-start absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3`}
        onChange={(e) => loginFormChangeHandler(e)}
      >
        <div className="w-[375px] mb-2">
          <div className="flex justify-center items-center lg:justify-start">
            <img className="w-1/2" src={image} alt="" />
          </div>
          <div className="font-semibold text-lg text-center lg:text-left">
            Connect with friends and the world around you on Facebook.
          </div>
        </div>
        <div className="w-[375px] flex justify-center items-center flex-col bg-white py-6 px-4 rounded-md shadow-md">
          <div className="w-full border-2 rounded-md my-1">
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="w-full h-10 pl-4 rounded-md outline-none"
              name="loginEmail"
              value={loginCredentials.loginEmail}
            />
          </div>
          <div className="sec-2 w-full border-2 rounded-md my-1">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 pl-4 rounded-md outline-none"
              name="loginPassword"
              value={loginCredentials.loginPassword}
            />
          </div>
          <div className="button w-full">
            <button
              className="w-full h-10 bg-blue-500 rounded-md my-2 text-white"
              onClick={(e) => submitLogin(e)}
            >
              Log In
            </button>
          </div>
          <div className="my-2 text-blue-700 border-b-2 border-gray-300 w-full h-10 flex justify-center">
            Forgot Password ?
          </div>
          <div className="my-2 w-full flex justify-center items-center">
            <button
              className="w-2/3 bg-green-600 h-10 rounded-md text-white"
              onClick={() => setToggle(!toggle)}
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>

      {/* Sign Up */}
      <div
        className={`${
          !toggle ? "z-0 opacity-0" : "z-10 opacity-100"
        } transition-all flex flex-col w-[450px] shadow-md items-center bg-white py-4 px-2 justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        onChange={(e) => signUpFormChangeHandler(e)}
      >
        <div className="w-full px-2 flex justify-between items-start my-2 mb-4 pb-2 border-b-2">
          <div className="">
            <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
            <p>It's quick and easy.</p>
          </div>
          <div className="cursor-pointer" onClick={() => setToggle(!toggle)}>
            <CloseIcon />
          </div>
        </div>
        <div className="w-full flex my-2">
          <input
            type="text"
            className="rounded-md bg-gray-300 h-10 pl-4 mr-2 w-1/2"
            placeholder="First Name"
            name="firstName"
            value={userDetails.firstName}
          />
          <input
            type="text"
            className="rounded-md bg-gray-300 h-10 pl-4 w-1/2"
            placeholder="Last Name"
            name="lastName"
            value={userDetails.lastName}
          />
        </div>
        <input
          type="email"
          className="rounded-md bg-gray-300 h-10 pl-4 w-full my-2"
          placeholder="Email Address"
          name="email"
          value={userDetails.email}
        />
        <input
          type="password"
          className="rounded-md bg-gray-300 h-10 pl-4 w-full my-2"
          placeholder="Password"
          name="password"
          value={userDetails.password}
        />

        <div className="flex flex-col w-full">
          <p className="text-sm ml-1 my-2">Date Of Birth</p>
          <div className="flex justify-between items-center">
            <select
              name="Days"
              id="day"
              className="w-1/3 mx-1 border-2 py-1 rounded-md cursor-pointer"
            >
              <option value={0}>Day</option>
              <Dob input="Day" />
            </select>
            <select
              name="Mon"
              id="cars"
              className="w-1/3 mx-1 border-2 py-1 rounded-md cursor-pointer"
            >
              <option value={0}>Mon</option>
              <Dob input="Month" />
            </select>
            <select
              name="Year"
              id="cars"
              className="w-1/3 mx-1 border-2 py-1 rounded-md cursor-pointer"
            >
              <option value="0">Year</option>
              <Dob input="Year" />
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full my-2">
          <p className="text-sm ml-1 my-1">Gender</p>
          <div className="flex justify-between items-center">
            <label className="border-2 w-1/3 mx-1 rounded-md py-2 px-1 flex justify-between items-center cursor-pointer">
              Female
              <input type="radio" name="gender" />
            </label>
            <label className="border-2 w-1/3 mx-1 rounded-md py-2 px-1 flex justify-between items-center cursor-pointer">
              Male
              <input type="radio" name="gender" />
            </label>
            <label className="border-2 w-1/3 mx-1 rounded-md py-2 px-1 flex justify-between items-center cursor-pointer">
              Custom
              <input type="radio" name="gender" />
            </label>
          </div>
        </div>
        <div className="my-4 w-full flex justify-center items-center">
          <button
            className="w-1/2 bg-green-600 h-10 rounded-md text-white"
            onClick={(e) => submitSignUp(e)}
          >
            Sign Up
          </button>
        </div>
      </div>
      {showError && <Alert message={user.error.message} type="error" />}
    </>
  );
};

export default Login;
