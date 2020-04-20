import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getUser } from "../../../redux/userRedux";
import { createPost } from "../../../redux/postsRedux";

import PostForm from "../../features/PostForm/PostForm";
import Snackbar from "../../common/Snackbar/Snackbar";

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    user: PropTypes.object,
    sendPost: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      alert: {},
    };
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      post: {
        author: user.email,
        status: "draft",
      },
    });
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

    sendPost(returnForm).then(() => {
      this.showAlert("Dodano pomyśnie post", "success");
      setTimeout(this.redirectToMain, 4000);
    });
  };

  redirectToMain = () => (window.location.href = `${process.env.PUBLIC_URL}/`);

  render() {
    const { user } = this.props;
    const {
      post,
      alert: { text, color, show },
    } = this.state;

    if (!user.userName) {
      return <p> Zaloguj się aby dodać post</p>;
    } else {
      return (
        <div>
          <Snackbar showSnackbar={show} text={text} color={color} />
          <PostForm submit={this.handleSubmit} post={post} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendPost: (post) => dispatch(createPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
