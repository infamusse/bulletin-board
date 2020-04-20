import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import clsx from "clsx";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import styles from "./Header.module.scss";
import "./Header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Component = ({ className, children, user }) => {
  const [menu, openMenu] = useState(false);
  const hamburger = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 400) openMenu(true);
  }, []);

  const showMenu = () => {
    openMenu(!menu);
    const hambergerButton = hamburger.current;
    hambergerButton.classList.toggle("menuNavbarBarOpen");
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Button
        variant="light"
        className={styles.menuNavbarBar}
        ref={hamburger}
        aria-controls="collapse-menu"
        aria-expanded={menu}
      >
        <FontAwesomeIcon color="blue" onClick={showMenu} icon={faChevronDown} />
      </Button>
      <Collapse in={menu}>
        <Navbar className={styles.navBar} id="collapse-menu">
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
            <Navbar.Collapse
              className={clsx("justify-content-end", styles.navBarCollapse)}
            >
              <Navbar.Text>
                Signed in as:
                <NavLink to={`${process.env.PUBLIC_URL}/profile`}>
                  {user.userName}
                </NavLink>
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
      </Collapse>
      {children}
    </div>
  );
};
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
};

export { Component as HeaderComponent };
