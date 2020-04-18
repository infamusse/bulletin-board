import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { getUser } from "../../../redux/userRedux";
import { connect } from "react-redux";

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user.userName ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const Container = connect(mapStateToProps, null)(PrivateRoute);

export { Container as PrivateRoute };
