import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { connect } from "react-redux";
import { fetchUserinfo, getUser } from "../../../redux/userRedux";
import {
  getAll,
  getLoadingState,
  fetchPostsAPI,
} from "../../../redux/postsRedux";

import { PostCard } from "../../features/PostCard/PostCard";
import DialogConfirm from "../../common/DialogConfirm/DialogConfirm";
import Snackbar from "../../common/Snackbar/Snackbar";

import CardDeck from "react-bootstrap/CardDeck";

import styles from "./Profile.module.scss";

class Component extends React.Component {
  static propTypes = {
    fetchPosts: PropTypes.func,
    fetchUser: PropTypes.func,
    user: PropTypes.object,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string,
    }),
    posts: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      dialog: {},
      deleteItemId: "",
      alert: {},
    };

    this.showDialog = this.showDialog.bind(this);
    this.comfirmDialog = this.comfirmDialog.bind(this);
  }

  componentDidMount() {
    const { fetchUser, fetchPosts } = this.props;
    fetchUser();
    fetchPosts();
  }

  showAlert(text, color) {
    console.log("pokaż alert");

    this.setState({
      alert: {
        textAlert: text,
        color: color,
        showAlert: true,
      },
    });
  }

  showDialog(id) {
    this.setState({
      dialog: {
        text: "Czy na pewno chcesz usunąć",
        show: true,
      },
      deleteItemId: id,
    });
  }

  closeDialog() {
    this.setState({
      dialog: {
        text: "",
        show: false,
      },
      deleteItemId: "",
    });
  }

  comfirmDialog() {
    const { deleteItemId } = this.state;
    this.deletePost(deleteItemId);
  }

  deletePost(postId) {
    console.log("deletePost", postId);
    axios.delete(`http://localhost:8000/api/post/${postId}`).then((res) => {
      console.log(res.data);
      this.closeDialog();
      this.showAlert("Usunięto pomyśnie", "success");
    });
  }

  render() {
    const {
      loading: { active },
      posts,
      user,
    } = this.props;

    const {
      dialog: { text, show },
      alert: { textAlert, color, showAlert },
    } = this.state;

    let userPost = [];
    if (!active && posts.length)
      userPost = posts.filter(({ author }) => author === user.userName);

    if (user.userName && userPost.length) {
      return (
        <div>
          <Snackbar showSnackbar={showAlert} text={textAlert} color={color} />
          <div className={"ml-4"}>
            <p>Signed in as: {user.userName}</p>
            <p>Yours posts:</p>
          </div>
          <CardDeck className={styles.cardContainer}>
            {userPost.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                author={user.userName}
                deletePost={this.showDialog}
              />
            ))}
          </CardDeck>
          <DialogConfirm
            text={text}
            showDialog={show}
            comfirmDialog={this.comfirmDialog}
          />
        </div>
      );
    } else {
      return (
        <div>
          <p>Zaloguj się</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
  posts: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUserinfo()),
  fetchPosts: () => dispatch(fetchPostsAPI()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //   Component as Logged,
  Container as Profile,
  Component as ProfileComponent,
};
