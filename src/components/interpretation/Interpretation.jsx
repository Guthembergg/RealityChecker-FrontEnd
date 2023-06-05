import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../homepage/NavbarCustom";
import moment from "moment/moment";
import Pagination from "react-bootstrap/Pagination";
import { Alert, Col, Image, Row, Spinner } from "react-bootstrap";
import Card from "../journal/Card";
import { Input, useInput } from "@nextui-org/react";

function Interpretation() {
  const navigate = useNavigate();
  const [dreams, setDreams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const myProfile = useSelector((state) => state.myProfile);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Error while trying to fetch the dreams"
  );
  const { reset } = useInput("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (!myProfile) {
      navigate("/");
    }
    if (!myProfile.subbed) {
      navigate("/homepage");
    }

    GetFetch();
  }, []);

  useEffect(() => {
    if (!myProfile) {
      navigate("/");
    }
  }, [myProfile]);
  useEffect(() => {
    GetFetch();
  }, [myProfile]);
  const GetFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/dreams/usernameP/${
          myProfile?.username
        }?pageSize=9&pageNo=${currentPage - 1}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${myProfile?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setError(false);
        setLoading(false);
        const data = await response.json();
        setDreams(data);
      } else {
        const data = await response.json();
        setDreams(data);
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="d-flex justify-content-center align-items-center ">
        <h1 className="text-center fw-bold  personalTitle mt-5 mb-5 me-5">
          Saved interpretations
        </h1>{" "}
        <Input
          shadow={false}
          onClearClick={reset}
          labelPlaceholder="Search "
          status="secondary"
          type="text"
          id=""
          className=""
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          clearable
        />
      </div>
      <div className="d-flex flex-column mt-5">
        {!error && loading && (
          <div className="d-flex justify-content-center mt-2 mb-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && !loading && !dreams.message === "Nessun sogno trovato" && (
          <>
            <div className="d-flex justify-content-center mt-3">
              <Alert
                className=" pb-3 text-danger "
                key="danger"
                variant="danger"
              >
                {message}
              </Alert>
            </div>
          </>
        )}
        {!dreams.message &&
          dreams?.content?.filter((d) => d.interpretation !== null).length <=
            0 &&
          !loading && (
            <Row className=" d-flex justify-content-center m-auto w-50 text-center mt-2">
              <Alert variant="primary w-50">
                It seems you don't have any interpretation saved, please use the
                option in the journal to interpret a dream
              </Alert>
            </Row>
          )}{" "}
        {dreams.message === "Nessun sogno trovato" && !loading && (
          <Row className=" d-flex justify-content-center m-auto w-50 text-center mt-2">
            <Alert variant="primary w-50">
              It seems you don't have any interpretation saved, please use the
              option in the journal to interpret a dream
            </Alert>
          </Row>
        )}
        <Row
          xs={1}
          md={2}
          xl={3}
          xxl={4}
          className="m-3 g-3 d-flex flex-row justify-content-center "
        >
          {filter &&
            dreams?.content
              ?.filter((d) => d.interpretation !== null)
              ?.filter(
                (e) =>
                  e.title.includes(filter) ||
                  e.emotions.some((e) => e.includes(filter)) ||
                  e.type.some((e) => e.includes(filter))
              )

              .map((d, i) => (
                <Col
                  key={`card` + i}
                  className="d-flex align-content-between flex-wrap"
                >
                  <Card
                    control={true}
                    interpretation={d.interpretation}
                    text={d.text}
                    id={d.id}
                    title={d.title}
                    emotions={d.emotions}
                    type={d.type}
                    date={d.date}
                  />
                </Col>
              ))}
          {!filter &&
            dreams?.content
              ?.filter((d) => d.interpretation !== null)
              .map((d, i) => (
                <Col
                  key={`card` + i}
                  className="d-flex align-content-between flex-wrap"
                >
                  <Card
                    control={true}
                    interpretation={d.interpretation}
                    text={d.text}
                    id={d.id}
                    title={d.title}
                    emotions={d.emotions}
                    type={d.type}
                    date={d.date}
                  />
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
}

export default Interpretation;
