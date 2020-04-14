import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DialogConfirm = ({ text, showDialog, comfirmDialog }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const comfirm = () => {
    comfirmDialog();
  };

  useEffect(() => {
    setShow(showDialog);
  }, [showDialog]);

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={comfirm}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DialogConfirm.propTypes = {
  text: PropTypes.string,
  showDialog: PropTypes.bool,
};

export default DialogConfirm;
