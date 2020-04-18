const axios = require("axios");

/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = "user";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName("FETCH_START");
const FETCH_USER = createActionName("FETCH_USER");
const FETCH_ERROR = createActionName("FETCH_ERROR");
const FETCH_USER_POSTS = createActionName("FETCH_SUCCESS_POSTS_USER");

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchUser = (payload) => ({ payload, type: FETCH_USER });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const fetchPostsUser = (payload) => ({
  payload,
  type: FETCH_USER_POSTS,
});

/* thunk creators */
export const fetchUserinfo = () => {
  return (dispatch) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logged`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("USER RESPONSE", response);
        const user = response.data;
        dispatch(fetchUser(user));
      })
      .catch((error) => fetchError(error.message));
};

export const fetchUserPostsAPI = (user) => {
  console.log("fetchUserPostsAPI", user);
  return function (dispatch) {
    dispatch(fetchStarted());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/user/${user}`)
      .then((response) => {
        const post = response.data;
        console.log("post", post);
        dispatch(fetchPostsUser(post));
      })
      .catch((error) => fetchError(error.message));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_USER: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        userName: action.payload.userName,
        email: action.payload.email,
        photo: action.payload.photo,
      };
    }
    case FETCH_USER_POSTS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        posts: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        user: action.payload,
      };
    }
    default:
      return statePart;
  }
};
