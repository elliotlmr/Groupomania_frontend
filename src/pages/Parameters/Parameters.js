import axios from "axios";
import "./Parameters.scss";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
import FooterMenu from "../../globals/Footer/FooterMenu";
import BrandLogo from "../../globals/Header/BrandLogo";
import Menu from "../../globals/Header/Menu";
import FileInput from "../../globals/components/FileInput";

function Parameters() {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [infos, setInfos] = useState({});
  const [role, setRole] = useState("");
  const [newFile, setNewFile] = useState();
  const [profilePic, setProfilePic] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userIsDeleted, setUserIsDeleted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1331/api/auth/parameters", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setInfos(res.data);
        setRole(res.data.company_role);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);
  const handleCheck = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  };
  function isValid() {
    return password.length > 0 && isChecked;
  }

  function handleModify(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("File", newFile);
    formData.append("company_role", role);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    axios
      .put("http://localhost:1331/api/auth/parameters", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setProfilePic(res.data.profile_picture);
        let pictureStorage = localStorage.getItem("user");
        pictureStorage = JSON.parse(pictureStorage);
        pictureStorage["profile_picture"] = res.data.profile_picture;
        localStorage.setItem("user", JSON.stringify(pictureStorage));
      })
      .catch((error) => console.log(error));
  }

  function deleteAccount(e) {
    e.preventDefault();

    axios
      .delete(`http://localhost:1331/api/auth/${user.userId}`, {
        data: {
          password,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setUserIsDeleted(true);
          setTimeout(function () {
            localStorage.clear();
            window.location = "/signup";
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  return (
    <Container fluid className="page-container parameters">
      <Row className="parameters-header mb-1 pt-2 justify-content-between">
        <Col xs={6} sm={6} md={4} xl={3} className="d-flex logo-header">
          <BrandLogo />
        </Col>
        <Col xs={6} sm={6} md={4} xl={3} className="menu">
          <Menu />
        </Col>
      </Row>

      <Row className="parameters-main justify-content-center mt-5">
        <Col md={6} xl={6} lg={4}>
          <Modal show={showDelete} onHide={handleClose}>
            <Modal.Header closeButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                className="bi bi-exclamation-triangle mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>

              <Modal.Title className="text-center">
                {userIsDeleted
                  ? "Votre compte a été supprimé !"
                  : "Souhaitez-vous supprimer votre compte ?"}
              </Modal.Title>
            </Modal.Header>
            {!userIsDeleted && (
              <>
                <Modal.Body>
                  <Row>
                    <Col md={1}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheck}
                        className="mr-4 my-auto"
                      />
                    </Col>
                    <Col>
                      <p>
                        Je souhaite supprimer mon compte ainsi que toutes les
                        informations, postes, et commentaires liés à celui-ci.
                      </p>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Label>Vérification :</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Entrez votre mot de passe.."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Row className="justify-content-center">
                    {error && (
                      <p className="error-msg">Mot de passe incorrect !</p>
                    )}
                  </Row>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                  <Button
                    variant="danger"
                    disabled={!isValid()}
                    onClick={(e) => deleteAccount(e)}
                  >
                    Supprimer
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal>

          <Form className="justify-content-center d-flex flex-column">
            <Image
              src={profilePic ? profilePic : infos.profile_picture}
              roundedCircle
              className="profile-picture parameters-picture mb-4 mx-auto"
            />
            <Row className="justify-content-end px-3">
              <FileInput
                accept=".jpg, .jpeg, .png"
                text="Photo de profile.."
                newFile={newFile}
                setNewFile={setNewFile}
                class="profile-input"
              />
            </Row>
            <Form.Group>
              <Form.Label>Prénom :</Form.Label>
              <Form.Control
                type="text"
                placeholder={infos.firstname}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nom :</Form.Label>
              <Form.Control type="text" placeholder={infos.lastname} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Poste :</Form.Label>
              <Form.Control
                type="text"
                placeholder={role ? role : infos.company_role}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" placeholder={infos.email} readOnly />
            </Form.Group>

            <Row className="justify-content-center flex-column">
              <Button
                variant="primary"
                type="button"
                onClick={handleModify}
                className="mx-auto my-1"
              >
                Modifier
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={handleShow}
                className="mx-auto my-1 delete-account-btn"
              >
                Supprimer
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row className="parameters-footer fixed-bottom">
        <Col>
          <FooterMenu />
        </Col>
      </Row>
    </Container>
  );
}

export default Parameters;
