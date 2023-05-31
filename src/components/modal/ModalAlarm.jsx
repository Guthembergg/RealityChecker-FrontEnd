import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";

import { RiDeleteBin6Fill } from "react-icons/ri";

function ModalAlarm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className=""
        style={{
          cursor: "pointer",
          border: "none",
          background: "none",
          color: "purple",
        }}
        onClick={() => {
          handleShow();
        }}
      >
        *
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="text-center m-auto purple">
            How to use the alarm correctly
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body>
          <p>
            To increase the likelihood of having lucid dreams, it's important to
            set your alarm at the right time. Lucid dreaming is most likely to
            occur during the REM (Rapid Eye Movement) stage of sleep, which is
            the stage associated with vivid dreaming.
          </p>
          <p className="mt-2">
            Here's a general guideline for setting your alarm to optimize your
            chances of lucid dreaming:
          </p>
          <ol className="m-2">
            <li className="mt-2">
              Determine your average sleep duration: Calculate the number of
              hours you typically sleep on a regular night. This will help you
              establish a consistent sleep schedule.
            </li>
            <li className="mt-2">
              Identify the last third of your sleep: Once you know your average
              sleep duration, divide it by three. For example, if you typically
              sleep for 7 hours, the last third would be approximately the last
              2 hours and 20 minutes (7 divided by 3).
            </li>
            <li className="mt-2">
              Set the alarm for the end of the last third: Subtract the duration
              of the last third from your desired wake-up time. For example, if
              you want to wake up at 7:00 AM, and the last third of your sleep
              is 2 hours and 20 minutes, you would set your alarm for
              approximately 4:40 AM.
            </li>
          </ol>
          <p>
            By setting your alarm for the end of the last third of your sleep,
            you increase the likelihood of waking up during or just after a
            dream, when your mind is more likely to be in a state conducive to
            lucid dreaming.
          </p>
          <p>
            This method takes advantage of the fact that REM sleep periods tend
            to get longer and more frequent as the night progresses. However,
            it's important to note that individual sleep patterns can vary, and
            what works for one person may not work for another.
          </p>
          <p>
            It may require some experimentation to find the optimal time for
            inducing lucid dreams based on your own sleep habits and patterns.
            Remember, consistency is key when it comes to lucid dreaming.
          </p>
          <p>
            Try to maintain a regular sleep schedule, practice reality checks,
            keep a dream journal, and be patient as you develop your lucid
            dreaming skills.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              handleClose();
            }}
          >
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAlarm;
