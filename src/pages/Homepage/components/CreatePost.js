import "./CreatePost.scss";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FileInput from "../../../globals/components/FileInput";
import Picker from "react-giphy-picker";
import Button from "react-bootstrap/Button";
import { useState } from "react";

//Accepte comme props : profilePicture

function CreatePost(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const {updatePosts} = props;

  function handleSubmit(event) {
    event.preventDefault();
    const mediaUrl = new FormData();

    mediaUrl.append('File', selectedFile);

    axios
      .post(
        "http://localhost:1331/api/posts",
        {
          description,
          mediaUrl,
          user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        updatePosts();
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Card className="w-100 create-post">
      <Card.Header className="d-flex pb-0">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Col xs={6} md={2} className='pl-0'>
              <Image src={props.profilePicture} roundedCircle className='profile-picture mr-2' />
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
      <Card.Body as={Row} className="btn-row">
        <Col className="d-flex flex-row">
          <Button type="button" className='mr-3'> GIF </Button>
          <FileInput
            name="Photos"
            text="Photos"
            id="photos-input"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </Col>
        <Col className='text-right'>
          <Button type="button" onClick={handleSubmit}>
            Publier !
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default CreatePost;
