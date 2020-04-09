import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getAll,
  getLoadingState,
  fetchPostsAPI
} from "../../../redux/postsRedux";

import { fetchUserinfo } from "../../../redux/userRedux";

import { PostCard } from "../../features/PostCard/PostCard";

import CardDeck from "react-bootstrap/CardDeck";
import styles from "./Homepage.module.scss";

class Component extends React.Component {
  static propTypes = {
    fetchPosts: PropTypes.func,
    fetchUser: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string
    }),
    posts: PropTypes.array
  };
  componentDidMount() {
    const { fetchPosts, fetchUser } = this.props;
    fetchPosts();
    fetchUser();
  }

  render() {
    const {
      loading: { active },
      posts
    } = this.props;

    if (active || !posts.length) {
      return <p> Loading ...</p>;
    } else {
      return (
        <div className={styles.root}>
          <CardDeck className={styles.cardContainer}>
            {posts.map(post => (
              <PostCard key={post.title} post={post} />
            ))}
          </CardDeck>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  posts: getAll(state),
  loading: getLoadingState(state)
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPostsAPI()),
  fetchUser: () => dispatch(fetchUserinfo())
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent
};
