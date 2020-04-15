import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import Alert from "react-bootstrap/Alert";

import styles from "./Snackbar.module.scss";

const Snackbar = ({ color, text, showSnackbar, timeout }) => {
  const [show, setShow] = useState({ show: false });

  const closeSnackbar = () => {
    setShow({ show: false });
  };

  useEffect(() => {
    setShow({ show: showSnackbar });
    const autoClose = setTimeout(closeSnackbar, timeout);

    return () => {
      clearTimeout(autoClose);
    };
  }, [showSnackbar]);

  return (
    <Alert show={show.show} className={styles.snackbar} variant={color}>
      {text}
    </Alert>
  );
};

Snackbar.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  showSnackbar: PropTypes.bool,
  timeout: PropTypes.number,
};

Snackbar.defaultProps = {
  timeout: 6000,
};

export default Snackbar;
