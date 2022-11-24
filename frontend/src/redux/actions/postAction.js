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
const axios = require("axios");

const host = "http://localhost:5000";
// const host = "https://facebook-clone-react-new.herokuapp.com";

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

export const sendPost = (caption) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_POST,
    });

    let token = getCookie("authToken")

    const link = `${host}/api/v1/createPost`;
    const {data} = await axios.post(link, {
      authToken: token,
      caption: caption,
      image: {
        public_id: "public_id",
        url: "url",
      },
    });

    dispatch({
        type: POST_SUCCESS,
        payload: data
    })

  } catch (error) {
    dispatch({
        type: POST_FAIL,
        payload: error.response.data
    })
  }
};

export const getPost = () => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_GET_POST
        })

        let token = getCookie("authToken")

        const link = `${host}/api/v1/getPosts`;
        const {data} = await axios.post(link,{
          authToken: token,
        });

        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_POST_FAIL,
            payload: error.response.data
        })
    }
}

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_ADD_COMMENT
    })

    let token = getCookie("authToken")

    const link = `${host}/api/v1/comment/${postId}`
    const {data} = await axios.post(link, {
      authToken: token,
      comment: comment
    });

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error.response.data
    });
  }
}
