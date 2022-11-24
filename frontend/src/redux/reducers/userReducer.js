const {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REQUIRE_LOGIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  REQUIRE_SIGNIN,
} = require("../constants/userConstant");

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case REQUIRE_SIGNIN:
    case REQUIRE_LOGIN:
    case "REQUIRE_LOGOUT":
    case "REQUIRE_USER":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case SIGNIN_SUCCESS:
    case LOGIN_SUCCESS:
    case "USER_SUCCESS":
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        loading: false,
        isAuthenticated: false
      };
    case SIGNIN_FAIL:
    case LOGIN_FAIL:
    case "LOGIN_FAIL":
    case "USER_FAIL":
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
      };

    default:
      return state;
  }
};
