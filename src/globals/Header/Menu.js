import "./Menu.scss";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function Menu() {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);

  function handleLogout() {
    localStorage.clear();
    window.location = "/";
  }

  return (
    <Navbar sticky="top" bg="light" expand="md" id="log-menu">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/home">
            <Nav.Link> Accueil </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`/profile/${user.userId}`}>
            <Nav.Link> Profil </Nav.Link>
          </LinkContainer>
          <NavDropdown title="Options" id="dropdown-menu">
            <LinkContainer to="/parameters">
              <NavDropdown.Item> Paramètres </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              {" "}
              Déconnexion{" "}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
