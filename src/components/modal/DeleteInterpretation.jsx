import React, { useState } from "react";
import { Form, Button, Modal, Alert, Spinner } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";

function DelInt(props) {
  const [show, setShow] = useState(false);
  const myProfile = useSelector((state) => state.myProfile);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const PutFetch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/dreams/${myProfile?.username}/${props.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: props.title,
            text: props.text,
            emotions: props.emotions,
            type: props.type,
            date: props.date,
          }),
          headers: {
            Authorization: `Bearer ${myProfile?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setError(false);
        setLoading(false);
        handleClose();
        window.location.reload(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  const handleClick = () => {
    PutFetch();
  };

  console.log();

  return (
    <>
      <button
        className="Btn deleteBtn"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        Delete <RiDeleteBin6Fill />
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-center purple">
            Are you sure you want to delete this interpretation?
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body>
          <p>
            Deletion is permanent click on delete only if you are sure you want
            this interpretation permanently deleted. Only the interpretation
            will be deleted the dream will remain in your journal.
          </p>
          {error && (
            <>
              <div className="d-flex justify-content-center mt-3">
                <Alert
                  className=" pb-3 text-danger "
                  key="danger"
                  variant="danger"
                >
                  Error while trying to delete the interpretation
                </Alert>
              </div>
            </>
          )}
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            type="submit"
            onClick={() => {
              handleClick();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DelInt;
