import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFileWord } from "@fortawesome/free-solid-svg-icons";

import styles from "./PostForm.module.scss";

const PostForm = ({ post, submit }) => {
  const [editedPost, setEditedPost] = useState(post);

  useEffect(() => {
    setEditedPost(post);
  }, [post]);

  const handleEvent = (event) => {
    setEditedPost({ ...editedPost, [event.target.name]: event.target.value });
  };

  const sendForm = () => {
    submit(editedPost);
  };

  return (
    <Jumbotron className={styles.root}>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="author">
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Post Author"
            aria-label="Author"
            disabled
            aria-describedby="author"
            value={editedPost.author}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="title">
              <FontAwesomeIcon icon={faFileWord} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Post title"
            name="title"
            aria-label="Title"
            aria-describedby="title"
            value={editedPost.title}
            onChange={handleEvent}
          />
        </InputGroup>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            placeholder="Post text"
            name="text"
            as="textarea"
            rows="3"
            value={editedPost.text}
            onChange={handleEvent}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              maxLength="10"
              placeholder="Enter phone"
              value={editedPost.phone}
              onChange={handleEvent}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              placeholder="Enter your location"
              value={editedPost.location}
              onChange={handleEvent}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              minLength="1"
              min="0"
              placeholder="Price"
              value={editedPost.price}
              onChange={handleEvent}
            />
          </Form.Group>
        </Form.Row>

        {/* <Form.File
          name="photo"
          label="Insert photo"
          accept="image/*"
          value={editedPost.photo}
          onChange={handleEvent}
          custom
        /> */}

        <Form.Group className="mt-4" controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Publish</Form.Label>
          <Form.Control
            onChange={handleEvent}
            value={editedPost.status}
            name="status"
            as="select"
            size="sm"
            custom
          >
            <option value="published">Now</option>
            <option value="draft">Later</option>
          </Form.Control>
        </Form.Group>

        <Button onClick={sendForm} variant="primary">
          Save
        </Button>
      </Form>
    </Jumbotron>
  );
};

PostForm.propTypes = {
  post: PropTypes.object,
  submit: PropTypes.func,
};

export default PostForm;
