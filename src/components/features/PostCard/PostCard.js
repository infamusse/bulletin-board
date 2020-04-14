import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./PostCard.module.scss";

import clsx from "clsx";

import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Component = ({ post, author, deletePost }) => {
  let updateISO = new Date(post.updated);
  updateISO = updateISO.toDateString();

  const checkAuthor = (checkingPost) => {
    return checkingPost.author === author;
  };

  const handleDelete = () => {
    deletePost(post._id);
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
          <>
            <LinkContainer
              to={{
                pathname: `post/${post._id}/edit`,
                state: {
                  post: post,
                },
              }}
              exact
            >
              <Button
                variant="light"
                title="edit"
                className={clsx(styles.iconBtn, "float-right")}
              >
                <FontAwesomeIcon color="red" icon={faEdit} />
              </Button>
            </LinkContainer>
            <Button
              onClick={handleDelete}
              title="delete"
              variant="light"
              className={clsx(styles.iconBtn, "float-right")}
            >
              <FontAwesomeIcon color="red" icon={faTrash} />
            </Button>
          </>
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
  deletePost: PropTypes.func,
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
