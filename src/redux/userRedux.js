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

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchUser = (payload) => ({ payload, type: FETCH_USER });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchUserinfo = () => {
  return function (dispatch) {
    axios
      .get(`http://localhost:8000/user/logged`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("USER RESPONSE", response);
        const user = response.data;
        dispatch(fetchUser(user));
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
