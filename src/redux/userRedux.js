const axios = require("axios");

/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = "user";
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_USER = createActionName("FETCH_USER");
const FETCH_ERROR = createActionName("FETCH_ERROR");
const IS_LOGGED = createActionName("IS_LOGGED");

/* action creators */
export const fetchUser = payload => ({ payload, type: FETCH_USER });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const isLogged = payload => ({ payload, type: IS_LOGGED });

/* thunk creators */
export const fetchUserinfo = () => {
  return function(dispatch) {
    console.log("user fetch", process.env.REACT_APP_API_URL);
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logged`)
      .then(response => {
        console.log("USER RESPONSE", response);
        const user = response.data;
        dispatch(fetchUser(user));
      })
      .catch(error => fetchError(error.message));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...statePart,
        user: action.payload
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        user: action.payload
      };
    }
    case IS_LOGGED: {
      return {
        ...statePart,
        isLogged: action.payload
      };
    }
    default:
      return statePart;
  }
};
