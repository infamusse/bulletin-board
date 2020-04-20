import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import styles from "./Login.module.scss";

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <h2>Login</h2>
    <a
      className={clsx(styles.loginBtn, styles.loginBtnGoogle)}
      href={`${process.env.REACT_APP_API_URL}/auth/google`}
    >
      Login with Google
    </a>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Login, Component as LoginComponent };
