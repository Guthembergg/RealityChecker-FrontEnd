import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import "./style.scss";
import { Alert, Col, Image, Row, Spinner } from "react-bootstrap";
import Card from "./Card";
import ModalDream from "../modal/ModalDream";
import lady from "../../assets/_Layer_.jpg";
import { Input, useInput } from "@nextui-org/react";
function Journal() {
  const navigate = useNavigate();
  const [dreams, setDreams] = useState([]);
  const [pages, setPages] = useState();
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
    } else {
      GetFetch();
    }
  }, [currentPage]);

  useEffect(() => {
    if (!myProfile) {
      navigate("/");
    }
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
        setPages(data.totalPages);
      } else {
        const data = await response.json();
        setDreams(data);
        console.log(data);
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setMessage(message + "fatal");
    }
  };
  const handelChange = (value) => {
    setFilter(value);
  };
  const renderPage = () => {
    let td = [];
    for (let i = 1; i <= pages; i++) {
      td.push(
        <Pagination.Item
          active={i === currentPage ? true : false}
          key={`page` + i}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {" "}
          {i}{" "}
        </Pagination.Item>
      );
    }
    return td;
  };
  const [selectedItem, setSelectedItem] = useState();

  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        <h1 className="text-center fw-bold personalTitle mt-5 mb-5 me-5">
          Your personal Journal
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
      <div className="d-flex  flex-column mt-5">
        {" "}
        <Row
          xs={1}
          md={2}
          xl={3}
          className="m-3 g-3 d-flex flex-row justify-content-center"
        >
          {!error && loading && (
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {error && !loading && dreams.message !== "Nessun sogno trovato" && (
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
          {dreams.message === "Nessun sogno trovato" && (
            <Alert variant="primary" className="text-center">
              It seems you don't have any dreams saved, please use the option in
              the navbar to add a dream
            </Alert>
          )}
          {filter &&
            dreams &&
            dreams?.content
              ?.filter(
                (e) =>
                  e.title.includes(filter) ||
                  e.emotions.some((e) => e.includes(filter)) ||
                  e.type.some((e) => e.includes(filter))
              )
              .map((d, i) => (
                <div key={`card` + i} className="d-flex justify-content-center">
                  <Card
                    text={d.text}
                    id={d.id}
                    title={d.title}
                    emotions={d.emotions}
                    type={d.type}
                    date={d.date}
                  />
                </div>
              ))}

          {!filter &&
            dreams?.content?.map((d, i) => (
              <div key={`card` + i} className="d-flex justify-content-center">
                <Card
                  text={d.text}
                  id={d.id}
                  title={d.title}
                  emotions={d.emotions}
                  type={d.type}
                  date={d.date}
                />
              </div>
            ))}
        </Row>
        {!filter && pages !== 1 && (
          <Pagination className="purple pagination mt-5 m-auto mb-5">
            {renderPage()}
          </Pagination>
        )}
      </div>
    </>
  );
}

export default Journal;
