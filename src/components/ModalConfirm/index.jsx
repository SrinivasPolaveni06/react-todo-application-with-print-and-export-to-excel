import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { environmentVariable } from "../Environment";
import { useNavigate } from "react-router-dom";

function Index(props) {
  const { handleModalClose, verify, id, relode } = props;

  const navigate = useNavigate();

  const handleClose = () => handleModalClose();

  function onDeleteTodo() {
    console.log(id);
    axios.delete(`${environmentVariable}/todos/${id}`).then((res) => {
      relode();
    });
    handleModalClose();
  }

  return (
    <Modal show={verify} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure, you want to delete this todo..</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={onDeleteTodo}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
