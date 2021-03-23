import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FileInput from "./FileInput";
import Button from "react-bootstrap/Button";

function CreatePost() {
  return (
    <Card className="w-75 mx-auto">
      <Card.Header className="d-flex pb-0">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Col xs={6} md={2}>
              <Image src="" roundedCircle />
            </Col>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Nouveau post .."
            aria-label="Nouveau post .."
            type="text"
            value=""
          />
        </InputGroup>
      </Card.Header>
      <Card.Body>
        <Col>
          <FileInput text="Photo / Image" />
        </Col>
      </Card.Body>
    </Card>
  );
}

export default CreatePost;
