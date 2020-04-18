export const initialState = {
  posts: {
    data: {},
    loading: {
      active: false,
      error: false,
    },
    post: {},
  },
  user: {
    userName: null,
    email: null,
    photo: null,
    posts: null,
    loading: {
      active: false,
      error: false,
    },
  },
};
