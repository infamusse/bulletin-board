const axios = require("axios");

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getOne = ({ posts }) => posts.post;
export const getLoadingState = ({ posts }) => posts.loading;

/* action name creator */
const reducerName = "posts";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
/* GET */
const FETCH_START = createActionName("FETCH_START");
const FETCH_SUCCESS = createActionName("FETCH_SUCCESS");
const FETCH_SUCCESS_POST = createActionName("FETCH_SUCCESS_POST");
const FETCH_ERROR = createActionName("FETCH_ERROR");
/* POST */
const CREATE_POST = createActionName("CREATE_POST");

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchSuccessPost = (payload) => ({
  payload,
  type: FETCH_SUCCESS_POST,
});
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchPostsAPI = () => {
  return function (dispatch) {
    dispatch(fetchStarted());
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => {
        const posts = response.data;
        dispatch(fetchSuccess(posts));
      })
      .catch((error) => fetchError(error.message));
  };
};

export const fetchPostAPI = (id) => {
  console.log("fetchPostAPI", id);
  return function (dispatch) {
    dispatch(fetchStarted());
    axios
      .get(`http://localhost:8000/api/post/${id}`)
      .then((response) => {
        const post = response.data;
        console.log("post", post);
        dispatch(fetchSuccessPost(post));
      })
      .catch((error) => fetchError(error.message));
  };
};

export const createPost = (post) => {
  console.log("createPost", post);
  return (dispatch) =>
    axios
      .post("http://localhost:8000/api/post", { ...post })
      .then((response) => {
        dispatch(fetchPostsAPI());
      })
      .catch((error) => fetchError(error.message));
};

export const editPost = (post) => {
  console.log("editPost", post);
  return (dispatch) =>
    axios
      .put(`http://localhost:8000/api/post/${post._id}`, { ...post })
      .then((response) => {
        dispatch(fetchPostsAPI());
      })
      .catch((error) => fetchError(error.message));
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
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_SUCCESS_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        post: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
