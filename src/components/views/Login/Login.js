import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import clsx from "clsx";

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from "./Login.module.scss";

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <h2>Login</h2>
    <a
      className={clsx(styles.loginBtn, styles.loginBtnGoogle)}
      exact
      href={`http://localhost:8000/auth/google`}
    >
      Login with Google
    </a>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Login,
  // Container as Login,
  Component as LoginComponent
};
