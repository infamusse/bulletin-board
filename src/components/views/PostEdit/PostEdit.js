import React from "react";
import PropTypes from "prop-types";

import axios from "axios";
import { connect } from "react-redux";
import {
  getLoadingState,
  fetchPostAPI,
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
  };

  constructor(props) {
    super(props);
    console.log("constructor", props);

    this.state = {
      post: {},
      user: {},
      alert: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { post } = this.props.location.state;
    this.setState({ post: post });
  }

  showAlert(text, color) {
    console.log("pokaż alert");

    this.setState({
      alert: {
        text: text,
        color: color,
        show: true,
      },
    });
  }

  handleSubmit(returnForm) {
    let editPost = returnForm;

    console.log("returnForm", returnForm);

    axios
      .put(`http://localhost:8000/api/post/${editPost._id}`, { ...editPost })
      .then((res) => {
        console.log(res.data);
        this.showAlert(`Zmieniono pomyśnie ${editPost.title}`, "success");
      });
  }

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
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as PostEdit,
  Component as PostEditComponent,
};
