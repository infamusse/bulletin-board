import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchUserinfo, getUser } from "../../../redux/userRedux";

class Component extends React.Component {
  static propTypes = {
    fetchPosts: PropTypes.func,
    fetchUser: PropTypes.func,
    user: PropTypes.object
  };
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    const { user } = this.props;
    console.log("user", user);
    if (user.userName) {
      return (
        <div>
          <p>Zalogowano jako {user.userName}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Brak dostępu</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUserinfo())
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //   Component as Logged,
  Container as Logged,
  Component as LoggedComponent
};
