import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

import clsx from "clsx";

import Navbar from "react-bootstrap/Navbar";

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from "./Header.module.scss";
import Button from "react-bootstrap/Button";

const Component = ({ className, children, user }) => (
  <div className={clsx(className, styles.root)}>
    <Navbar>
      <NavLink
        className={styles.navLink}
        color="inherit"
        exact
        to={`${process.env.PUBLIC_URL}/`}
      >
        <Button variant="light">Home</Button>
      </NavLink>

      {user.userName != null && (
        <NavLink
          className={styles.navLink}
          color="inherit"
          exact
          to={`${process.env.PUBLIC_URL}/post/add`}
          activeClassName="active"
        >
          <Button variant="light">Add post</Button>
        </NavLink>
      )}
      {user.userName != null ? (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{user.userName}</a>
          </Navbar.Text>
          <Button className={"ml-2"} variant="danger">
            <a
              className={styles.logoutBtn}
              href={`${process.env.REACT_APP_API_URL}/user/logout`}
            >
              Log out
            </a>
          </Button>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <NavLink
            className={styles.navLink}
            color="inherit"
            exact
            to={`${process.env.PUBLIC_URL}/Login`}
            activeClassName="active"
          >
            <Button variant="light">Login</Button>
          </NavLink>
        </Navbar.Collapse>
      )}
    </Navbar>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
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
  Component as HeaderComponent,
};
