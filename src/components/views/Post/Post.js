import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getLoadingState,
  fetchPostAPI,
  getOne
} from "../../../redux/postsRedux";

import styles from "./Post.module.scss";
import Jumbotron from "react-bootstrap/Jumbotron";

class Component extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    fetchPost: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string
    }),
    post: PropTypes.object
  };

  componentDidMount() {
    const { fetchPost } = this.props;
    const { id } = this.props.match.params;
    fetchPost(id);
  }

  render() {
    const {
      loading: { active },
      post
    } = this.props;

    if (active) {
      return <p> Loading ...</p>;
    } else {
      return (
        <Jumbotron className={styles.post}>
          <h1> {post.title}</h1>
          <h3>{post.author}</h3>
          <p>{post.text}</p>
        </Jumbotron>
      );
    }
  }
}

const mapStateToProps = state => ({
  post: getOne(state),
  loading: getLoadingState(state)
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPostAPI(id))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent
};
