import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import line from "../../assets/—Pngtree—proportional thick straight line_5487827.png";
import lady from "../../assets/sleepingLady-modified.png";
import "./style.scss";
import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import img from "../../assets/diary2.avif";
import img2 from "../../assets/diary.jpg";
import img3 from "../../assets/magic.jpg";

function Homepage() {
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
  const handleClick = () => {
    if (myProfile.subbed) {
      navigate("/journal");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <>
      <div className="position-relative homepage ">
        <div className="homepage-slogan ">
          <h2 className="position-relative ">
            {" "}
            Dreams Unveiled.
            <Image src={line} className="line1" />
            <Image src={line} className="line2" />
            <Image src={line} className="line3" />
          </h2>
          <span>Journey Digitally.</span>
          <h2>
            Awaken Insight.
            <Image src={line} className="line4" />
            <Image src={line} className="line5" />{" "}
            <button
              className="cssbuttons-io-button position-absolute"
              onClick={handleClick}
            >
              {" "}
              {myProfile.subbed ? "Get started" : "Subscribe!"}
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </h2>{" "}
        </div>

        <Image src={lady} style={{ width: "700px" }} className="hero" />
      </div>
    </>
  );
}

export default Homepage;
