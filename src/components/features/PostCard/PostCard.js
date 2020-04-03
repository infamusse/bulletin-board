import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./PostCard.module.scss";
import { LinkContainer } from "react-router-bootstrap";

const Component = ({ post }) => (
  <Card className={styles.post}>
    <Card.Body>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>{post.text}</Card.Text>
    </Card.Body>
    <LinkContainer to={`post/${post._id}`} exact>
      <Button variant="primary">Read more</Button>
    </LinkContainer>
    <Card.Footer>
      <small className="text-muted">Added: {post.addDate}</small>
    </Card.Footer>
  </Card>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostCard,
  // Container as Post,
  Component as PostCardComponent
};
