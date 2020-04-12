import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { HeaderComponent } from "../Header/Header";
import { getUser, fetchUserinfo } from "../../../redux/userRedux";

import { connect } from "react-redux";

import styles from "./MainLayout.module.scss";
import { useEffect } from "react";

const Component = ({ className, children, fetchUser, user }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      <HeaderComponent user={user} />
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  fetchUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUserinfo()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as MainLayout,
  Container as MainLayout,
  Component as MainLayoutComponent,
};
