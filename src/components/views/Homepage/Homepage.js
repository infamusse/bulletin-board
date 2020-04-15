import React, { useEffect, useMemo } from "react";
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

const sortPost = (unSortedPosts) => {
  let sortedPost;

  if (unSortedPosts.length)
    sortedPost = unSortedPosts
      .slice()
      .sort((a, b) => new Date(b.updated) - new Date(a.updated));
  else sortedPost = [];

  return sortedPost;
};

const Component = ({ loading: { active }, posts, fetchPosts }) => {
  useEffect(() => {
    fetchPosts();
  }, []);

  const postsAfterSorting = useMemo(() => sortPost(posts), [posts]);

  if (active || !sortPost) {
    return <p> Loading ...</p>;
  } else {
    return (
      <div className={styles.root}>
        <CardDeck className={styles.cardContainer}>
          {postsAfterSorting.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </CardDeck>
      </div>
    );
  }
};

Component.propTypes = {
  fetchPosts: PropTypes.func,
  fetchUser: PropTypes.func,
  loading: PropTypes.shape({
    active: PropTypes.bool,
    error: PropTypes.string,
  }),
  posts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  posts: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = { fetchPosts: fetchPostsAPI };

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
