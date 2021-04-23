import "./SignupCard.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function SignupCard() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function isValid() {
    return (
      firstname.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password == confirm
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:1331/api/auth/signup", {
        firstname,
        lastname,
        company_role: role,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        window.location = "/";
      });
  }

  return (
    <Card style={{ width: "100%" }} className="signup-card">
      <Card.Body>
        <Card.Title className="text-center"> Inscription : </Card.Title>

        <Col sm={{ span: 8, offset: 2 }} className="text-center my-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="firstname-input">
              <Form.Label column sm="2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-type"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.244 13.081l.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z" />
                </svg>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Prénom.."
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="lastname-input">
              <Form.Label column sm="2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-type"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.244 13.081l.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z" />
                </svg>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Nom.."
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="role-input">
              <Form.Label column sm="2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clipboard"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Poste occupé.."
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Col>
            </Form.Group>

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
                  className="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
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

            <Form.Group as={Row} controlId="password-input-confirm">
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
                  placeholder="Confirmez votre mot de passe.."
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="logs-btn my-4"
              id="signup-btn"
              disabled={!isValid()}
            >
              S'inscrire !
            </Button>
          </Form>
        </Col>

        <Card.Text className="text-center">
          Déjà inscrit ? Connectez-vous <Link to={`/`}>ici !</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SignupCard;
