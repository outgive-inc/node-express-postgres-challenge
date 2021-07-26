import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTask = ({ modal, toggle, task, completed }) => {
  const [title, setTitle] = useState(task.title);
  const [details, setDetails] = useState(task.details);

  const refTitleError = useRef();
  const refDetailsError = useRef();

  const resetField = () => {
    setTitle(task.title);
    setDetails(task.details);
  };

  const toggleModal = () => {
    toggle();
    resetField();
  };

  const updateTask = async () => {
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
        const body = { title, details, completed };
        await fetch(`http://localhost:5000/api/v1/tasks/${task.id}`, {
          method: "PUT",
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
      <ModalHeader toggle={toggleModal}>Edit Task</ModalHeader>
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
        <Button color="primary" onClick={updateTask}>
          Update
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTask;
