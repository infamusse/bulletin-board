import React from "react";
import PropTypes from "prop-types";

// import clsx from "clsx";

import { connect } from "react-redux";
import { getAll } from "../../../redux/postsRedux";

import styles from "./Post.module.scss";
import Jumbotron from "react-bootstrap/Jumbotron";

const Component = ({ className, children, match, post }) => {
  const matchId = match.params.id;
  /* Unitil connect to DB */
  const matchPost = post.find(({ id }) => id === parseInt(matchId));

  const { title, contnet, addDate } = matchPost;

  return (
    <Jumbotron className={styles.post}>
      <h1> {title}</h1>
      <p>{contnet}</p>
      <p>{addDate}</p>
    </Jumbotron>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  post: PropTypes.array
};

const mapStateToProps = state => ({
  post: getAll(state)
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent
};
