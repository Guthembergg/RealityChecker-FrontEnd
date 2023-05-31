import AlarmOption from "../clock/AlarmOption";
import ContextAlarm from "../context/ContextAlarm";
import DigitalClock from "../clock/DigitalClock";
import "./FullClock.scss";
import AnalogClock from "./AnalogClock";
import Navbar from "../homepage/NavbarCustom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ModalAlarm from "../modal/ModalAlarm";
function FullClock() {
  const myProfile = useSelector((state) => state.myProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!myProfile) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!myProfile) {
      navigate("/");
    }
  }, [myProfile]);
  return (
    <>
      {" "}
      <div className="full-clock">
        <section className="clock container">
          <div className="clock__container grid">
            <div className="clock__content grid">
              <ContextAlarm>
                {" "}
                <h2 className="text-center text-clock fs-1 mb-5">
                  Alarm clock
                </h2>
                <AnalogClock />
                <DigitalClock />
                <AlarmOption />
              </ContextAlarm>
              <h2 className="text-center fs-5 text-secondary mt-3">
                <ModalAlarm />
                This alarm clock is meant to help you have an increased
                probability to have lucid dreams! (click the asterisk to open
                the guide)
              </h2>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default FullClock;
