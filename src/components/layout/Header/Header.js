import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import clsx from "clsx";

import Navbar from "react-bootstrap/Navbar";

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from "./Header.module.scss";
import Button from "react-bootstrap/Button";

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Navbar>
      <NavLink
        className={styles.navLink}
        color="inherit"
        exact
        to={`${process.env.PUBLIC_URL}/`}
        activeClassName="active"
      >
        <Button variant="light">Home</Button>
      </NavLink>
      <NavLink
        className={styles.navLink}
        color="inherit"
        exact
        to={`${process.env.PUBLIC_URL}/Login`}
        activeClassName="active"
      >
        <Button variant="light">Login</Button>
      </NavLink>
    </Navbar>
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
  // Container as Header,
  Component as HeaderComponent
};
