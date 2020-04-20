import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getLoadingState,
  fetchPostAPI,
  editPost,
  getOne,
} from "../../../redux/postsRedux";
import { getUser } from "../../../redux/userRedux";

import PostForm from "../../features/PostForm/PostForm";
import Snackbar from "../../common/Snackbar/Snackbar";

class Component extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    fetchPost: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string,
    }),
    post: PropTypes.object,
    user: PropTypes.object,
    location: PropTypes.object,
    sendPost: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      post: {},
      user: {},
      alert: {},
    };
  }

  componentDidMount() {
    const { post } = this.props.location.state;
    this.setState({ post: post });
  }

  showAlert(text, color) {
    this.setState({
      alert: {
        text: text,
        color: color,
        show: true,
      },
    });
  }

  handleSubmit = (returnForm) => {
    const { sendPost } = this.props;
    const { title } = returnForm;

    sendPost(returnForm).then(() =>
      this.showAlert(`Zmieniono pomyśnie ${title}`, "success")
    );
  };

  render() {
    const {
      loading: { active },
      user,
    } = this.props;

    const {
      post,
      alert: { text, color, show },
    } = this.state;

    if (active) {
      return <p> Loading ...</p>;
    } else if (user.userName) {
      return (
        <div>
          <Snackbar showSnackbar={show} text={text} color={color} />
          <PostForm submit={this.handleSubmit} post={post} />
        </div>
      );
    } else {
      return <p>Zaloguj się</p>;
    }
  }
}

const mapStateToProps = (state) => ({
  post: getOne(state),
  loading: getLoadingState(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id) => dispatch(fetchPostAPI(id)),
  sendPost: (post) => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as PostEdit,
  Component as PostEditComponent,
};
