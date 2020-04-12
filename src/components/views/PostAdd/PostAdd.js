import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFileWord } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { getUser } from "../../../redux/userRedux";

import styles from "./PostAdd.module.scss";

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    user: PropTypes.object,
  };

  componentDidMount() {
    const { user } = this.props;
    console.log("componentWillMount", user);

    this.setState({
      post: {
        author: user.userName,
      },
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: "",
        text: "",
      },
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitle(event) {
    this.setState({ post: { ...this.state.post, title: event.target.value } });
  }
  handleText(event) {
    this.setState({ post: { ...this.state.post, text: event.target.value } });
  }

  handleSubmit(event) {
    event.preventDefault();
    let post = this.state.post;
    console.log("post", post);
    post.status = "published";

    axios.post(`http://localhost:8000/api/post`, { ...post }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  render() {
    const { user } = this.props;
    console.log("PROPS", this.props.user);

    if (!user.userName) {
      return <p> Loading ...</p>;
    } else {
      return (
        <Jumbotron className={styles.root}>
          {user.userName}
          {this.state.author}
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
              value={this.state.author}
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
              aria-label="Tytuł"
              aria-describedby="title"
              value={this.state.title}
              onChange={this.handleTitle}
            />
          </InputGroup>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="Treść ogłoszenia"
              as="textarea"
              rows="3"
              value={this.state.text}
              onChange={this.handleText}
            />
          </Form.Group>

          <Button onClick={this.handleSubmit} variant="primary">
            Save
          </Button>
        </Jumbotron>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   someAction: (arg) => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
