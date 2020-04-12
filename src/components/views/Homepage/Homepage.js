import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getAll,
  getLoadingState,
  fetchPostsAPI,
} from "../../../redux/postsRedux";

import { PostCard } from "../../features/PostCard/PostCard";

import CardDeck from "react-bootstrap/CardDeck";
import styles from "./Homepage.module.scss";

class Component extends React.Component {
  static propTypes = {
    fetchPosts: PropTypes.func,
    fetchUser: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string,
    }),
    posts: PropTypes.array,
  };
  componentDidMount() {
    const { fetchPosts, posts } = this.props;
    fetchPosts();
  }

  render() {
    const {
      loading: { active },
      posts,
    } = this.props;
    let sortedPost;
    if (!active && posts.length)
      sortedPost = posts
        .slice()
        .sort((a, b) => new Date(b.updated) - new Date(a.updated));

    console.log("sortedPost", sortedPost);

    if (active || !sortedPost) {
      return <p> Loading ...</p>;
    } else {
      return (
        <div className={styles.root}>
          <CardDeck className={styles.cardContainer}>
            {sortedPost.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </CardDeck>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  posts: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPostsAPI()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
