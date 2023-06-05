import React, { useState } from "react";
import { Form, Button, Modal, Spinner, Image, Alert } from "react-bootstrap";
import { HiPhotograph } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { saveAs } from "file-saver";

function ModalInfo(props) {
  const [show, setShow] = useState(false);
  const myProfile = useSelector((state) => state.myProfile);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setImage("");
  };
  const handleShow = () => setShow(true);

  const PostImageFetch = async () => {
    setLoading(true);
    const deepai = require("deepai");

    deepai.setApiKey(process.env.REACT_APP_DEEP_AI_API_KEY);

    (async function () {
      var resp = await deepai.callStandardApi("text2img", {
        text: props.text,
      });

      setImage(resp?.output_url);
      setLoading(false);
      setError(false);

      console.log(resp);
    })();
  };
  const handleClick = () => {
    PostImageFetch();
  };

  console.log();
  const downloadImage = () => {
    saveAs(image, "image.jpg"); // Put your image url here.
  };
  return (
    <>
      <button
        className="Btn imageBtn"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleShow();
        }}
      >
        Image <HiPhotograph />
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-center purple">
            Create an image using Ai from your own dream
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body>
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {image && (
            <>
              <Image className="w-100" src={image} />{" "}
            </>
          )}
          {error && !loading && (
            <div className="d-flex justify-content-center mt-3">
              <Alert
                className=" pb-3 text-danger "
                key="danger"
                variant="danger"
              >
                Error trying to generate image
              </Alert>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {image && (
            <Button variant="primary" type="submit" onClick={downloadImage}>
              Download
            </Button>
          )}
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              handleClick();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInfo;
