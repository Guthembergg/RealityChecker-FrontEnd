import { Col, Image, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import "./cardStyle.scss";
import moment from "moment";
import happy from "../../assets/smiley.png";
import angry from "../../assets/angry.png";
import sad from "../../assets/sad.png";
import surprised from "../../assets/surprised.png";
import disgusted from "../../assets/disgusted.png";
import scream from "../../assets/screaming.png";
import Modal from "../modal/ModalDream";
import ModalDelete from "../modal/DeleteModal";
import ModalInt from "../modal/InterpretModal";
import DelInt from "../modal/DeleteInterpretation";
import ImageAi from "../modal/ImageAiModal";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { useSelector } from "react-redux";

function Card(props) {
  const [show, setShow] = useState(false);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">{props}</Tooltip>
  );
  const subbed = useSelector((state) => state.myProfile.subbed);
  return (
    <Col className="cardJ p-3 d-flex flex-column justify-content-between ">
      <Row className="d-flex ">
        <div className="d-flex justify-content-between flex-row align-items-center ">
          <Col className="d-flex flex-column ms-3 mb-2">
            <p className="fs-2 fw-semibold" style={{ color: "purple" }}>
              {moment(props?.date).format("Do")}
            </p>
            <h3 className="fs-5">{moment(props?.date).format("MMM, YYYY")}</h3>
          </Col>
          <Col xs={3}></Col>
          <Col>
            <div className="d-flex flex-row-reverse">
              {" "}
              <Row xs={3} className="gy-3 d-flex flex-row me-2">
                {props?.emotions?.map((e, i) => {
                  return (
                    <div key={`card-` + i}>
                      {e === "scared" ? (
                        <Col className="px-3">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(e)}
                          >
                            <Image className="scary em-logo" src={scream} />
                          </OverlayTrigger>
                        </Col>
                      ) : e === "sadness" ? (
                        <Col className="px-3">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(e)}
                          >
                            <Image className="sad em-logo" src={sad} />
                          </OverlayTrigger>
                        </Col>
                      ) : e === "happiness" ? (
                        <Col className="px-3">
                          {" "}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(e)}
                          >
                            <Image className="happy em-logo" src={happy} />
                          </OverlayTrigger>
                        </Col>
                      ) : e === "disgusted" ? (
                        <Col className="px-3">
                          {" "}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(e)}
                          >
                            <Image
                              className="disgust em-logo"
                              src={disgusted}
                            />
                          </OverlayTrigger>
                        </Col>
                      ) : e === "surprised" ? (
                        <Col className="px-3">
                          {" "}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(e)}
                          >
                            <Image
                              className="surprise em-logo"
                              src={surprised}
                            />
                          </OverlayTrigger>
                        </Col>
                      ) : (
                        <Col className="px-3">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(e)}
                          >
                            <Image className="angry em-logo" src={angry} />
                          </OverlayTrigger>
                        </Col>
                      )}
                    </div>
                  );
                })}
              </Row>
            </div>
          </Col>
        </div>
      </Row>
      <div className="ms-3">
        <h2 className="fs-4 text-center cardTitle fw-bold mt-2">
          {props?.title}
        </h2>
        <p className="my-3 mt-4 fw-semibold fs-6 text-center">{props?.text}</p>
      </div>
      <div className="d-flex justify-content-around">
        {props?.type?.map((e, i) => {
          return (
            <div
              className={
                e === "nightmare"
                  ? "text-danger ms-2 fw-bold"
                  : e === "recursive"
                  ? "text-warning ms-2 fw-bold "
                  : e === "fake"
                  ? "text-secondary ms-2 fw-bold"
                  : e === "lucid"
                  ? "text-primary ms-2 fw-bold"
                  : "text-success ms-2  fw-bold"
              }
              key={`ty` + i}
            >
              {e}
            </div>
          );
        })}
      </div>
      <Row className=" d-flex flex-column align-content-center ">
        {!props.control && (
          <Row xxs={2} sm={3} className=" d-flex justify-content-center  p-0">
            <Col className="p-0 my-2 d-flex justify-content-center">
              <Modal
                control={true}
                id={props.id}
                title={props.title}
                text={props.text}
                date={moment(props.date).format("YYYY-MM-DD")}
                type={props.type}
                emotions={props.emotions}
              />
            </Col>
            {subbed && (
              <Col className="my-2 p-0 d-flex justify-content-center">
                <ModalInt
                  text={props.text}
                  id={props.id}
                  title={props.title}
                  date={moment(props.date).format("YYYY-MM-DD")}
                  type={props.type}
                  emotions={props.emotions}
                />
              </Col>
            )}
            <Col className="my-2 p-0 d-flex justify-content-center">
              <ModalDelete id={props.id} />
            </Col>
          </Row>
        )}
        {props.control && (
          <>
            <div className="d-flex flex-column align-content-center ">
              {props.control && (
                <Row
                  xxs={2}
                  sm={3}
                  className="d-flex justify-content-center  p-0"
                >
                  <Col className="p-0 my-2 d-flex justify-content-center">
                    <button
                      className="Btn editBtn px-3 py-2   "
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      Read
                      <BiDownArrow />
                    </button>
                  </Col>
                  <Col className="p-0 my-2 d-flex justify-content-center">
                    <ImageAi text={props.text} />
                  </Col>
                  <Col className="p-0 my-2 d-flex justify-content-center">
                    <DelInt
                      text={props.text}
                      id={props.id}
                      title={props.title}
                      date={moment(props.date).format("YYYY-MM-DD")}
                      type={props.type}
                      emotions={props.emotions}
                    />
                  </Col>
                </Row>
              )}
            </div>
            {show && (
              <p className="fst-italic fw-semibold mt-3">
                {props.interpretation}
              </p>
            )}
          </>
        )}
      </Row>
    </Col>
  );
}
export default Card;
