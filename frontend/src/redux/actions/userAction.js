const {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REQUIRE_LOGIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  REQUIRE_SIGNIN,
} = require("../constants/userConstant");
const axios = require("axios");

// const host = "https://facebook-clone-react-new.herokuapp.com";
const host = "http://localhost:5000";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const deleteCookie = (cname) => {
  let cvalue = null;
  const d = new Date();
  d.setTime(d.getTime() - 10 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const signinUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_SIGNIN,
    });

    const link = `${host}/api/v1/signup`;
    const config = { headers: { "Content-Type": "application/json" } };

    const userDetails = {
      name: name,
      email: email,
      password: password,
    };

    const { data } = await axios.post(link, userDetails);

    setCookie("authToken", data.token, 1);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_LOGIN,
    });

    const link = `${host}/api/v1/login`;
    const config = { headers: { "Content-Type": "application/json" } };

    const userDetails = {
      email: email,
      password: password,
    };

    const { data } = await axios.post(link, userDetails);

    setCookie("authToken", data.token, 1);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "REQUIRE_LOGOUT",
    });

    const link = `${host}/api/v1/logout`;

    const { data } = await axios.get(link);

    console.log(data);

    deleteCookie("authToken");

    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response.data,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "REQUIRE_USER"
    })

    let token = getCookie("authToken")

    const link = `${host}/api/v1/myProfile`;

    const {data} = await axios.post(link,{
      authToken: token
    });
    console.log(data)
    dispatch({
      type: "USER_SUCCESS",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "USER_FAIL",
      payload: error.response.data,
    });
  }
}
