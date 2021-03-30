import "./CreatePost.scss";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FileInput from "./sub_components/FileInput";
import Picker from 'react-giphy-picker';
import Button from "react-bootstrap/Button";
import { useState } from "react";

//Accepte comme props : profilePicture

function CreatePost(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [description, setDescription] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:1331/api/posts", {
        description,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Card className="w-100 mx-auto create-post">
      <Card.Header className="d-flex pb-0">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Col xs={6} md={2}>
              <Image src={props.profilePicture} roundedCircle />
            </Col>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            placeholder="Nouveau post .."
            aria-label="Nouveau post .."
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>
      </Card.Header>
      <Card.Body as={Row} className='btn-row'>
        <Col>
          <Button type='button'> GIF </Button>
        </Col>
        <Col>
          <FileInput text="Photo / Image" />
        </Col>
        <Col>
          <Button type='button' onClick={handleSubmit}>
            Publier !
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default CreatePost;