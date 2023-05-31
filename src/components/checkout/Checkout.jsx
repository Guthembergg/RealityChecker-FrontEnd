import { useState, useEffect } from "react";
import { CLIENT_ID } from "../../Config/config.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import lady from "../../assets/_Layer_.jpg";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Checkout = () => {
  const myProfile = useSelector((state) => state.myProfile);
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState({});
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Error while trying to post the dream"
  );
  const dispatch = useDispatch();
  const notify = (name) => toast.success(`Transaction completed by ${name}`);

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: "ADD_MY_PROFILE",
      payload: { ...myProfile, subbed: true },
    });
  };

  const subbed = useSelector((state) => state.myProfile.subbed);

  useEffect(() => {
    if (!myProfile) {
      Navigate("/");
    }
  }, [myProfile]);

  useEffect(() => {
    if (subbed) {
      Navigate("/homepage");
    }
  }, []);

  const PostFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/users/subscribe`, {
        method: "POST",
        body: JSON.stringify({
          username: myProfile?.username,
          subbed: true,
        }),
        headers: {
          Authorization: `Bearer ${myProfile?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setShow(true);
        setError(false);
        setLoading(false);
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

  return (
    <Row className="d-flex  w-100">
      <div className=" d-flex flex-column  align-items-center ">
        <h2 className="purple fw-bold fs-1  mt-5">Subscribe now</h2>
        <ul className="fs-3 mb-2 text-center p-5 pt-3 pb-2">
          By subscribing you get access to:
          <li className="text-start mt-2">
            interpretations generated by ChatGPT model 3.5
          </li>
          <li className="text-start mt-2">
            image generation using Deepai text2image model
          </li>
        </ul>
        <h1 className="mb-3  purple fw-bold">only 9.99 €</h1>
        <PayPalScriptProvider
          options={{
            "client-id": "test",
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "9.99",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              PostFetch();
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                notify(name);
              });
            }}
          />
        </PayPalScriptProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Image className="mb-4 mt-2 lady" src={lady}></Image>
      </div>{" "}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            You are now premium!
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body>
          Congrats! You have unlocked the interpretation and image generation
          functions!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleClose}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default Checkout;