import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

// import clsx from "clsx";

import { connect } from "react-redux";
import { getAll } from "../../../redux/postsRedux";

import styles from "./Post.module.scss";
import Jumbotron from "react-bootstrap/Jumbotron";

const Component = ({ className, children, match, post }) => {
  const matchId = match.params.id;
  const getPost = async id => {
    axios.get(`http://localhost:8000/api/post/${id}`).then(res => {
      console.log("getPost", res.data);
    });
  };
  getPost(matchId);

  // const { title, contnet, addDate } = matchPost;

  return (
    <Jumbotron className={styles.post}>
      {/* <h1> {title}</h1>
      <p>{contnet}</p>
      <p>{addDate}</p> */}
      <h1>Tu będzie widok posta</h1>
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
