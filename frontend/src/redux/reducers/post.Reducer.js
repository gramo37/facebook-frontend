const {
  REQUIRE_POST,
  POST_SUCCESS,
  POST_FAIL,
  REQUIRE_GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  REQUIRE_ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} = require("../constants/postConstants");

export const postReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case REQUIRE_GET_POST:
      return {
        loading: true,
      };

    case GET_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };

    case GET_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
        post: null,
      };

    case REQUIRE_POST:
      return {
        ...state,
        loading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const commentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case REQUIRE_ADD_COMMENT:
      return {
        loading: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };
    case ADD_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
        comments: null,
      };
    default:
      return state;
  }
};
