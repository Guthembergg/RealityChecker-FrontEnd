import { Component } from "react";
import { Input } from "@nextui-org/react";
import logo1 from "../../assets/eye3.png";

import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "./style.scss";
import { connect } from "react-redux";
import { Col, Image, Row } from "react-bootstrap";
import logo from "../../assets/areYouDreaming.png";
import persistStore from "redux-persist/es/persistStore";
class EntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "logIn",
      registerInfo: {
        username: "",
        password: "",
        email: "",
        name: "",
      },

      display: false,
      error: false,
      message: "",
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view,
    });
  };

  handleChange = (parameter, value) => {
    this.setState({
      registerInfo: {
        ...this.state.registerInfo,
        [parameter]: value,
      },
    });
  };

  handleSubmit = async (url, event, body) => {
    event.preventDefault();

    console.log(this.state.registerInfo);
    try {
      let res = await fetch(`http://localhost:8080/api/auth/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        if (url === "login") {
          const data = await res.json();
          console.log(data);
          this.props.addMyProfile(data);
          window.location.href = "/homepage";
        } else {
          const data = await res;
        }

        this.changeView("logIn");
        console.log("register post ok");
        this.setState({
          display: false,
        });
      } else {
        const data = await res.json();
        this.props.addMyProfile("");
        console.log("register post bad");
        if (url === "login") {
          this.setState({
            display: true,
          });
        } else if (url === "register") {
          this.setState({ error: true, message: data.message });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
        return (
          <form className="login">
            <Row className="d-flex ">
              <Image
                className="ms-3"
                src={logo1}
                style={{ width: "220px" }}
              ></Image>
            </Row>

            <fieldset>
              <legend className="ps-3 purple fw-bold">Create Account</legend>
              <ul>
                <li>
                  <label name="username">Name:</label>
                  <Input
                    type="text"
                    id="username"
                    value={this.state.registerInfo.name}
                    onChange={(e) => {
                      this.handleChange("name", e.target.value);
                    }}
                    required
                  />
                </li>
                <li>
                  <label name="username">Username:</label>
                  <Input
                    type="text"
                    id="username"
                    value={this.state.registerInfo.username}
                    onChange={(e) => {
                      this.handleChange("username", e.target.value);
                    }}
                    required
                  />
                </li>
                <li>
                  <label name="email">Email:</label>
                  <Input
                    type="email"
                    id="email"
                    value={this.state.registerInfo.email}
                    onChange={(e) => {
                      this.handleChange("email", e.target.value);
                    }}
                    required
                  />
                </li>
                <li>
                  <label name="password">Password:</label>
                  <Input.Password
                    type="password"
                    id="password"
                    value={this.state.registerInfo.password}
                    onChange={(e) => {
                      this.handleChange("password", e.target.value);
                    }}
                    required
                  />
                </li>
                {this.state.error && (
                  <>
                    <div className="d-flex justify-content-center">
                      <Alert
                        className="text-center pb-3 text-danger w-75"
                        key="danger"
                        variant="danger"
                      >
                        {this.state.message}
                      </Alert>
                    </div>
                  </>
                )}
              </ul>
            </fieldset>
            <button
              className="purple fw-semibold "
              type="submit"
              onClick={(e) => {
                this.handleSubmit("register", e, this.state.registerInfo);
              }}
            >
              Submit
            </button>
            <button
              className="purple fw-semibold"
              type="button"
              onClick={() => this.changeView("logIn")}
            >
              Have an Account?
            </button>
          </form>
        );
        break;
      case "logIn":
        return (
          <form className="login">
            <Row className="d-flex ">
              <Image
                className="ms-3"
                src={logo1}
                style={{ width: "220px" }}
              ></Image>
            </Row>

            <fieldset>
              <legend className="ps-3 purple fw-bold">Login</legend>
              <ul className="mb-4">
                <li>
                  <label name="username">Username:</label>
                  <Input
                    labelPlaceholder="Username"
                    status="default"
                    type="text"
                    id="username"
                    value={this.state.registerInfo.username}
                    onChange={(e) => {
                      this.handleChange("username", e.target.value);
                    }}
                    required
                  />
                </li>
                <li className="mt-5">
                  <label name="password">Password:</label>
                  <Input.Password
                    shadow={false}
                    labelPlaceholder="Password"
                    status="default"
                    type="password"
                    id="password"
                    value={this.state.registerInfo.password}
                    onChange={(e) => {
                      this.handleChange("password", e.target.value);
                    }}
                    style={{ backgroundColor: this.state.loginSuccess }}
                    required
                  />
                </li>
                <li>
                  <i />
                  <a
                    className="text-secondary ms-2 fs-6"
                    onClick={() => this.changeView("PWReset")}
                    href="#reset"
                  >
                    Forgot Password?
                  </a>
                </li>
                {this.state.display && (
                  <>
                    <div className="d-flex justify-content-center">
                      {" "}
                      <Alert
                        className=" pb-3 text-danger w-75"
                        key="danger"
                        variant="danger"
                      >
                        Wrong username or password!
                      </Alert>
                    </div>
                  </>
                )}
              </ul>
            </fieldset>
            <button
              id="bottone1"
              className="purple fw-semibold"
              onClick={(e) =>
                this.handleSubmit("login", e, {
                  username: this.state.registerInfo.username,
                  password: this.state.registerInfo.password,
                })
              }
            >
              <strong>Login</strong>
            </button>
            <button
              className="purple fw-semibold"
              type="button"
              onClick={() => this.changeView("signUp")}
            >
              Create an Account
            </button>
          </form>
        );
        break;
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label name="email">Email:</label>
                  <Input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Go Back
            </button>
          </form>
        );
      default:
        break;
    }
  };

  render() {
    return <section id="entry-page">{this.currentView()}</section>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMyProfile: (data) => dispatch({ type: "ADD_MY_PROFILE", payload: data }),
  };
};
export default connect(null, mapDispatchToProps)(EntryPage);
