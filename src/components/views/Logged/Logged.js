import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { isLogged } from "../../../redux/userRedux";

import { useEffect } from "react";

const Component = ({ isLogged }) => {
  useEffect(isLogged, []);
  return <Redirect push to="/" />;
};

Component.propTypes = {
  isLogged: PropTypes.func
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
  isLogged: () => dispatch(isLogged())
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  //   Component as Logged,
  Container as Logged,
  Component as LoggedComponent
};
