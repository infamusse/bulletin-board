import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { connect } from "react-redux";
import { getAll } from "../../../redux/postsRedux";

import { PostCard } from "../../features/PostCard/PostCard";

import CardDeck from "react-bootstrap/CardDeck";
import styles from "./Homepage.module.scss";

const Component = ({ className, children, posts }) => (
  <div className={clsx(className, styles.root)}>
    <CardDeck className={styles.cardContainer}>
      {posts.map(post => (
        <PostCard key={post.title} post={post} />
      ))}
    </CardDeck>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array
};

const mapStateToProps = state => ({
  posts: getAll(state)
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent
};
