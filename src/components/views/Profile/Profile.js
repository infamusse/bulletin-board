import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchUserinfo, getUser } from "../../../redux/userRedux";
import {
  getAll,
  getLoadingState,
  fetchPostsAPI,
} from "../../../redux/postsRedux";

import { PostCard } from "../../features/PostCard/PostCard";

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

  componentDidMount() {
    const { fetchUser, posts, user, fetchPosts } = this.props;
    fetchUser();
    fetchPosts();
  }

  render() {
    const {
      loading: { active },
      posts,
      user,
    } = this.props;

    let userPost = [];
    if (!active && posts.length)
      userPost = posts.filter(({ author }) => author === user.userName);

    console.log("userPost", userPost);

    if (user.userName && userPost.length) {
      return (
        <div>
          <div className={"ml-4"}>
            <p>Signed in as: {user.userName}</p>
            <p>Yours posts:</p>
          </div>
          <CardDeck className={styles.cardContainer}>
            {userPost.map((post) => (
              <PostCard key={post.title} post={post} author={user.userName} />
            ))}
          </CardDeck>
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
