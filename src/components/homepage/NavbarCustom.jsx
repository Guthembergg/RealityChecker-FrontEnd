import { Col, Image, ToggleButton } from "react-bootstrap";
import logo from "../../assets/eye3.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/ModalDream";
import { useRef, useState } from "react";

function NavbarCustom() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.myProfile.username);
  const subbed = useSelector((state) => state.myProfile.subbed);
  const handleClick = () => {
    dispatch({ type: "ADD_MY_PROFILE", payload: "" });
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 nav">
          <Container fluid>
            <Navbar.Brand href="#" className="fw-semibold d-flex">
              <Image
                className="ms-5"
                src={logo}
                style={{ width: "210px" }}
                onClick={() => navigate("/homepage")}
              ></Image>
              <p className="mt-4 ms-3 fs-4"></p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Image
                    className="ms-5"
                    src={logo}
                    style={{ width: "180px" }}
                    href="/homepage"
                  ></Image>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  activeKey={location.pathname}
                  className=" d-flex justify-content-end me-5 align-items-center containerNavLink flex-grow-1 pe-3"
                >
                  <Col lg={1} xl={4}></Col>
                  <Nav.Link>
                    <Modal />
                  </Nav.Link>
                  <Nav.Link href="/journal" className="fontExpand">
                    Journal
                  </Nav.Link>
                  {subbed && (
                    <Nav.Link href="/interpretation" className="fontExpand">
                      Interpretations
                    </Nav.Link>
                  )}
                  <Nav.Link href="/alarm" className="fontExpand">
                    Alarm
                  </Nav.Link>
                  <NavDropdown
                    className="fontExpand"
                    title={
                      <>
                        Welcome,
                        <span className="purple fw-bold ">
                          {" " + username}
                        </span>
                      </>
                    }
                  >
                    {!subbed ? (
                      <NavDropdown.Item
                        href="/checkout"
                        className="text-center fs-3 purple fw-semibold"
                      >
                        Subscribe now
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item className="text-center text-primary fs-4">
                        Premium account!
                      </NavDropdown.Item>
                    )}

                    <Nav.Link
                      onClick={handleClick}
                      className="text-danger text-center fs-4"
                    >
                      Log out
                    </Nav.Link>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>{" "}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarCustom;
