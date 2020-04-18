import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { connect } from "react-redux";
import { fetchUserinfo, getUser } from "../../../redux/userRedux";
import { getAll, getLoadingState } from "../../../redux/postsRedux";
import { fetchUserPostsAPI } from "../../../redux/userRedux";

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

  componentDidUpdate(prevProps) {
    const { fetchPosts, user } = this.props;
    if (this.props.user.userName !== prevProps.user.userName) {
      fetchPosts(user.email);
    }
  }

  showAlert(text, color) {
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

  reloadData() {
    const { fetchPosts, user } = this.props;
    fetchPosts(user.email);
  }

  deletePost(postId) {
    console.log("deletePost", postId);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/post/${postId}`)
      .then((res) => {
        console.log(res.data);
        this.closeDialog();
        this.showAlert("Usunięto pomyśnie", "success");
        this.reloadData();
      });
  }

  render() {
    const {
      loading: { active },
      user: { userName, posts, email },
    } = this.props;

    const {
      dialog: { text, show },
      alert: { textAlert, color, showAlert },
    } = this.state;

    if (active) {
      return <p>Loading</p>;
    } else if (userName && posts) {
      return (
        <div>
          <Snackbar showSnackbar={showAlert} text={textAlert} color={color} />
          <div className={"ml-4"}>
            <p>Signed in as: {userName}</p>
            <p>Yours posts:</p>
          </div>
          <CardDeck className={styles.cardContainer}>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                author={email}
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
  fetchPosts: (user) => dispatch(fetchUserPostsAPI(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //   Component as Logged,
  Container as Profile,
  Component as ProfileComponent,
};
