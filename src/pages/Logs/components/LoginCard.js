import "./LoginCard.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginCard(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  function isValid() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:1331/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoading(true);
        props.history.push("/home");
        //window.location = "/home";
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setPassword("");
        if (error.response.status == 401) {
          setError(true);
        }
      });
  }

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" className="mx-auto" />
      ) : (
        <Card className="login-card w-75 mx-auto">
          <Card.Body>
            <Card.Title className="text-center mt-2"> Connexion : </Card.Title>

            <Col sm={{ span: 10, offset: 1 }} className="text-center my-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="email-input">
                  <Form.Label column sm="2">
                    {" "}
                    @{" "}
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="email"
                      placeholder="Email.."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password-input">
                  <Form.Label column sm="2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-unlock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                    </svg>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="password"
                      placeholder="Mot de passe.."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                {error && <p className="error-msg">Mot de passe incorrect !</p>}

                <Button
                  variant="primary"
                  type="submit"
                  className="logs-btn my-4"
                  id="connect-btn"
                  disabled={!isValid()}
                >
                  Connexion !
                </Button>
              </Form>
            </Col>

            <Card.Text className="text-center">
              Pas encore inscrit ? Inscrivez-vous{" "}
              <Link to={`/signup`}>ici !</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      )}{" "}
    </>
  );
}

export default withRouter(LoginCard);
