import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { connect } from "react-redux";
import {
  getLoadingState,
  fetchPostAPI,
  getOne,
} from "../../../redux/postsRedux";
import { getUser } from "../../../redux/userRedux";

import styles from "./PostEdit.module.scss";

import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFileWord } from "@fortawesome/free-solid-svg-icons";

class Component extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    fetchPost: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string,
    }),
    post: PropTypes.object,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    console.log("constructor", props);

    this.state = {
      post: {
        title: "",
        text: "",
        status: "",
      },
      user: {},
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { post } = this.props.location.state;
    this.setState({ post: post });
  }

  handleEvent(event) {
    console.log(event.target.name, event.target.value);
    this.setState({
      post: { ...this.state.post, [event.target.name]: event.target.value },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let editPost = this.state.post;

    console.log("post", editPost);

    axios
      .put(`http://localhost:8000/api/post/${editPost._id}`, { ...editPost })
      .then((res) => {
        console.log(res.data);
        alert("zapisano");
      });
  }

  render() {
    const {
      loading: { active },
      user,
    } = this.props;

    const { post } = this.state;

    if (active) {
      return <p> Loading ...</p>;
    } else if (user.userName) {
      return (
        <Jumbotron className={styles.root}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="author">
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Nazwa użytkownika"
              aria-label="Nazwa"
              disabled
              aria-describedby="author"
              value={post.author}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">
                <FontAwesomeIcon icon={faFileWord} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Tytuł ogłoszenia"
              name="title"
              aria-label="Tytuł"
              aria-describedby="title"
              value={post.title}
              onChange={this.handleEvent}
            />
          </InputGroup>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="Treść ogłoszenia"
              name="text"
              as="textarea"
              rows="3"
              value={post.text}
              onChange={this.handleEvent}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.SelectCustomSizeSm">
            <Form.Label>Publish</Form.Label>
            <Form.Control
              onChange={this.handleEvent}
              value={post.status}
              name="status"
              as="select"
              size="sm"
              custom
            >
              <option value="published">Now</option>
              <option value="draft">Later</option>
            </Form.Control>
          </Form.Group>

          <Button onClick={this.handleSubmit} variant="primary">
            Save
          </Button>
        </Jumbotron>
      );
    } else {
      return <p>Zaloguj się</p>;
    }
  }
}

const mapStateToProps = (state) => ({
  post: getOne(state),
  loading: getLoadingState(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id) => dispatch(fetchPostAPI(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as PostEdit,
  Component as PostEditComponent,
};
