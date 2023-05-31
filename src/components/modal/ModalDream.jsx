import React, { useState } from "react";
import {
  Form,
  Button,
  Modal,
  Row,
  Col,
  Image,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import "./modalDreamStyle.scss";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import scream from "../../assets/screaming.png";
import happy from "../../assets/smiley.png";
import angry from "../../assets/angry.png";
import sad from "../../assets/sad.png";
import surprised from "../../assets/surprised.png";
import disgusted from "../../assets/disgusted.png";
import { current } from "@reduxjs/toolkit";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { utils } from "react-modern-calendar-datepicker";
import { HiOutlinePencil } from "react-icons/hi";
function ModalDream(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Error while trying to post the dream"
  );
  const handleClick = (event) => {
    event.currentTarget.classList.toggle("selected");
  };
  const [show, setShow] = useState(false);

  const myProfile = useSelector((state) => state.myProfile);

  const [type, setType] = useState(props.control === true ? props?.type : []);
  const [emotions, setEmotions] = useState(
    props.control === true ? props?.emotions : []
  );
  const dispatch = useDispatch();
  const handleChange = (property, value) => {
    setInfo({ ...info, [property]: value });
  };
  const handleChangeADD = (arr, value) => {
    if (arr?.includes(value)) {
      arr === emotions
        ? setEmotions(arr.filter((e) => e !== value))
        : setType(arr.filter((e) => e !== value));
    } else {
      arr === emotions
        ? setEmotions((current) => [...current, value])
        : setType((current) => [...current, value]);
    }

    console.log(emotions);
  };
  const handleClose = () => {
    setShow(false);
    setEmotions([]);
    setType([]);
    setErrorDream(false);
    setErrorTitle(false);
  };
  const handleShow = () => setShow(true);
  let zeroD = "0";
  let zeroM = "0";

  const PostFetch = async () => {
    setLoading(true);
    try {
      if (selectedDay.month > 9) {
        zeroD = "";
      }
      if (selectedDay.day > 9) {
        zeroD = "";
      }
      const response = await fetch(
        `http://localhost:8080/dreams/username/${myProfile?.username}`,
        {
          method: "POST",
          body: JSON.stringify({
            title: info.title,
            text: info.dream,
            emotions: emotions,
            type: type,
            date: `${selectedDay.year}-${zeroM}${selectedDay.month}-${zeroD}${selectedDay.day}`,
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
        if (window.location.pathname === "/journal") {
          window.location.reload(false);
        }
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setMessage(message + err);
    }
  };

  const PutFetch = async () => {
    setLoading(true);
    try {
      if (selectedDay.month > 9) {
        zeroD = "";
      }
      if (selectedDay.day > 9) {
        zeroD = "";
      }
      const response = await fetch(
        `http://localhost:8080/dreams/${myProfile?.username}/${props.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: info.title,
            text: info.dream,
            emotions: emotions,
            type: type,
            date: `${selectedDay.year}-${zeroM}${selectedDay.month}-${zeroD}${selectedDay.day}`,
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
        window.location.reload(false);
      } else {
        setError(true);
        setLoading(false);
        setMessage("error modifying dream");
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setMessage("error modifying dream" + err);
    }
  };
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDream, setErrorDream] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (info.title === "") {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (info.dream === "") {
      setErrorDream(true);
    } else {
      setErrorDream(false);
    }

    if (info.dream !== "" && info.title !== "") {
      if (props.control) {
        PutFetch();
      } else {
        PostFetch();
      }
      setErrorDream(false);

      setErrorTitle(false);
      setEmotions([]);
      setType([]);
      setInfo({ dream: "", title: "" });
      handleClose(true);
    }
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">{props}</Tooltip>
  );
  const defaultValue = {
    year: utils().getToday().year,
    month: utils().getToday().month,
    day: utils().getToday().day,
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [info, setInfo] = useState({
    title: props.control === true ? props?.title : "",
    dream: props.control === true ? props?.text : "",
    emotions: emotions,
    type: type,
    date: selectedDay,
  });

  return (
    <>
      {props.control ? (
        <button
          className="Btn editBtn"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleShow();
          }}
        >
          Edit
          <svg className="svg" viewBox="0 0 512 512">
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
          </svg>
        </button>
      ) : (
        <h2 onClick={handleShow} className="fs-5 fw-bold fontExpand">
          {" "}
          Add Dream
        </h2>
      )}

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          {!props.control ? (
            <Modal.Title className="ms-auto purple">
              Add a dream to your journal
            </Modal.Title>
          ) : (
            <Modal.Title className="ms-auto purple">
              Modify your dream
            </Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body className="position-relative ">
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <div className="d-flex justify-content-around align-items-center">
            <Form.Text className="fs-4">Select a date</Form.Text>
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder="Select a day"
              shouldHighlightWeekends
              maximumDate={utils().getToday()}
            />
          </div>
          <Form onSubmit={handleSubmit} onKeyDown={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple">Title</Form.Text>
            </div>
            <Form.Control
              as="textarea"
              placeholder="Write a title"
              value={info?.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />{" "}
            {errorTitle && (
              <div className="d-flex justify-content-center">
                {" "}
                <Alert
                  className=" pb-3 text-danger w-100 mt-3"
                  key="danger"
                  variant="danger"
                >
                  You need to insert a title!
                </Alert>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 purple">Emotions</Form.Text>
            </div>
            <Row>
              <Col xs={2}>
                <div className="emotionModal">
                  {" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Fear")}
                  >
                    <Image
                      className={
                        props?.emotions?.includes("scared")
                          ? "selected"
                          : "emotionModal"
                      }
                      onClick={(e) => {
                        handleClick(e);
                        handleChangeADD(emotions, "scared");
                      }}
                      src={scream}
                      style={{ width: "50px" }}
                    />
                  </OverlayTrigger>
                </div>
              </Col>{" "}
              <Col xs={2}>
                <div>
                  {" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Happiness")}
                  >
                    <Image
                      className={
                        props?.emotions?.includes("happiness")
                          ? "selected"
                          : "emotionModal"
                      }
                      onClick={(e) => {
                        handleClick(e);
                        handleChangeADD(emotions, "happiness");
                      }}
                      src={happy}
                      style={{ width: "50px" }}
                    />
                  </OverlayTrigger>
                </div>
              </Col>
              <Col xs={2}>
                <div>
                  {" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Anger")}
                  >
                    <Image
                      className={
                        props?.emotions?.includes("anger")
                          ? "selected"
                          : "emotionModal"
                      }
                      onClick={(e) => {
                        handleClick(e);
                        handleChangeADD(emotions, "anger");
                      }}
                      src={angry}
                      style={{ width: "50px" }}
                    />
                  </OverlayTrigger>
                </div>
              </Col>{" "}
              <Col xs={2}>
                <div>
                  {" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Sadness")}
                  >
                    <Image
                      className={
                        props?.emotions?.includes("sadness")
                          ? "selected"
                          : "emotionModal"
                      }
                      onClick={(e) => {
                        handleClick(e);
                        handleChangeADD(emotions, "sadness");
                      }}
                      src={sad}
                      style={{ width: "45px" }}
                    />
                  </OverlayTrigger>
                </div>
              </Col>{" "}
              <Col xs={2}>
                <div>
                  {" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Surprise")}
                  >
                    <Image
                      className={
                        props?.emotions?.includes("surprised")
                          ? "selected"
                          : "emotionModal"
                      }
                      src={surprised}
                      onClick={(e) => {
                        handleClick(e);
                        handleChangeADD(emotions, "surprised");
                      }}
                      style={{ width: "45px" }}
                    />
                  </OverlayTrigger>
                </div>
              </Col>{" "}
              <Col xs={2}>
                <div>
                  {" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Disgust")}
                  >
                    <Image
                      className={
                        props?.emotions?.includes("disgusted")
                          ? "selected p-0"
                          : "emotionModal"
                      }
                      onClick={(e) => {
                        handleClick(e);
                        handleChangeADD(emotions, "disgusted");
                      }}
                      src={disgusted}
                      style={{ width: "45px" }}
                    />
                  </OverlayTrigger>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Form.Text className="fs-3 text-center mb-2 purple">
                Type of dream
              </Form.Text>
            </div>
            <Row className="d-flex g-2" xs={3}>
              <Col>
                <div
                  className={
                    props?.type?.includes("recursive")
                      ? "selected typeDream p-1"
                      : "typeDream p-1"
                  }
                  onClick={(e) => {
                    handleClick(e);
                    handleChangeADD(type, "recursive");
                  }}
                >
                  Recursive
                </div>
              </Col>{" "}
              <Col>
                <div
                  className={
                    props?.type?.includes("lucid")
                      ? "selected typeDream p-1"
                      : "typeDream p-1"
                  }
                  onClick={(e) => {
                    handleClick(e);
                    handleChangeADD(type, "lucid");
                  }}
                >
                  Lucid
                </div>
              </Col>{" "}
              <Col>
                <div
                  className={
                    props?.type?.includes("vivid")
                      ? "selected typeDream p-1"
                      : "typeDream p-1"
                  }
                  onClick={(e) => {
                    handleClick(e);
                    handleChangeADD(type, "vivid");
                  }}
                >
                  Vivid
                </div>
              </Col>
              <Col>
                <div
                  className={
                    props?.type?.includes("fake")
                      ? "selected typeDream p-1"
                      : "typeDream p-1"
                  }
                  onClick={(e) => {
                    handleClick(e);
                    handleChangeADD(type, "fake");
                  }}
                >
                  Fake
                </div>
              </Col>{" "}
              <Col>
                <div
                  className={
                    props?.type?.includes("nightmare")
                      ? "selected typeDream p-1"
                      : "typeDream p-1"
                  }
                  onClick={(e) => {
                    handleClick(e);
                    handleChangeADD(type, "nightmare");
                  }}
                >
                  Nightmare
                </div>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold fs-4 mt-3">
                What happened in your dream?
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Tell us what happened in your dream"
                value={info?.dream}
                onChange={(e) => handleChange("dream", e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Form.Label>
                  {props.control === true
                    ? props?.text?.length
                    : info?.dream?.length}
                  /2048
                </Form.Label>
              </div>
              {errorDream && (
                <div className="d-flex justify-content-center">
                  {" "}
                  <Alert
                    className=" pb-3 text-danger w-100"
                    key="danger"
                    variant="danger"
                  >
                    You need to insert a dream text!
                  </Alert>
                </div>
              )}
              {error && (
                <div className="d-flex justify-content-center mt-3">
                  <Alert
                    className=" pb-3 text-danger "
                    key="danger"
                    variant="danger"
                  >
                    {message}
                  </Alert>
                </div>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button
                className="buttonModalSubmit"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDream;
