import "./FooterMenu.scss";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function FooterMenu() {
  return (
    <Row className="footer-menu w-100">
      <Col sm={3} className="privacy">
        <Link to="/privacy-policy">Confidentialité</Link>
        <Link to="/copyrights">Copyrights</Link>
      </Col>
    </Row>
  );
}

export default FooterMenu;
