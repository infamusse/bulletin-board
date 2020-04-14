import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { connect } from "react-redux";
import { getUser } from "../../../redux/userRedux";

import PostForm from "../../features/PostForm/PostForm";
import Snackbar from "../../common/Snackbar/Snackbar";

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      post: {},
      alert: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      post: {
        author: user.userName,
        status: "draft",
      },
    });
  }

  showAlert(text, color) {
    console.log("pokaż alert");

    this.setState({
      alert: {
        text: text,
        color: color,
        show: true,
      },
    });
  }

  handleSubmit(returnForm) {
    let sendPost = returnForm;

    console.log("returnForm", returnForm);

    axios
      .post(`http://localhost:8000/api/post`, { ...sendPost })
      .then((res) => {
        this.showAlert("Dodano pomyśnie post", "success");
        console.log(res.data);
      });
  }

  render() {
    const { user } = this.props;
    const {
      post,
      alert: { text, color, show },
    } = this.state;

    if (!user.userName) {
      return <p> Zaloguj się aby dodać post</p>;
    } else {
      return (
        <div>
          <Snackbar showSnackbar={show} text={text} color={color} />
          <PostForm submit={this.handleSubmit} post={post} />
        </div>
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
