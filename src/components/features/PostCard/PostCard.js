import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./PostCard.module.scss";

import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Component = ({ post, author }) => {
  let updateISO = new Date(post.updated);
  updateISO = updateISO.toDateString();

  const checkAuthor = (checkingPost) => {
    return checkingPost.author === author;
  };

  return (
    <Card className={styles.post}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.text}</Card.Text>
      </Card.Body>
      <LinkContainer to={`post/${post._id}`} exact>
        <Button variant="primary">Read more</Button>
      </LinkContainer>
      <Card.Footer>
        <small className="text-muted">Updated: {updateISO}</small>
        {checkAuthor(post) && (
          <LinkContainer
            to={{
              pathname: `post/${post._id}/edit`,
              state: {
                post: post,
              },
            }}
            exact
          >
            <Button variant="light" className="float-right">
              <FontAwesomeIcon color="red" icon={faEdit} />
            </Button>
          </LinkContainer>
        )}
      </Card.Footer>
    </Card>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  author: PropTypes.string,
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
  Component as PostCardComponent,
};
