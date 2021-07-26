import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTask = ({ modal, toggle }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const refTitleError = useRef();
  const refDetailsError = useRef();

  const resetField = () => {
    setTitle("");
    setDetails("");
  };

  const toggleModal = () => {
    toggle();
    resetField();
  };

  const saveTask = async () => {
    if (title.length === 0 || title.length > 25) {
      refTitleError.current.hidden = false;
    } else {
      refTitleError.current.hidden = true;
    }

    if (details.length === 0 || details.length > 100) {
      refDetailsError.current.hidden = false;
    } else {
      refDetailsError.current.hidden = true;
    }

    if (
      refTitleError.current.hidden === true &&
      refDetailsError.current.hidden === true
    ) {
      try {
        const body = { title, details };
        await fetch("http://localhost:5000/api/v1/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <p className="error-message" ref={refTitleError} hidden={true}>
          Title must have at least 1 character and less than or equal to 25.
        </p>
        <div className="form-group">
          <textarea
            rows="3"
            className="form-control"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details"
          ></textarea>
        </div>
        <p className="error-message" ref={refDetailsError} hidden={true}>
          Details must have at least 1 character and less than or equal to 100.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={saveTask}>
          Save
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTask;
