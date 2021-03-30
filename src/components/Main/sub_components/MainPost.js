import "./MainPost.scss";
import {
  Card,
  Image,
  Button,
  Row,
  InputGroup,
  FormControl,
  Col,
} from "react-bootstrap";
import CommentsList from "./CommentsList";
import axios from "axios";
import { useState } from "react";

//Accepte en props : author, dexcription, mediaUrl (+ comments à définir)

function MainPost(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [comment, setComment] = useState("");

  function commentIsValid() {
    return comment.length > 1;
  }

  function handleComment(event) {
    event.preventDefault();

    axios.post(
      `http://localhost:1331/api/posts/${props.postId}/comments/`,
      {
        user_id: user.userId,
        comment_text: comment,
        postId: props.postId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));
  }

  return (
    <Card className="w-100 main-post mb-4" id={props.id}>
      <Card.Body>
        <Row>
          <Image src={props.profilePicture} />
          <Card.Title> {props.author} </Card.Title>
        </Row>
        <Card.Text> {props.description} </Card.Text>
        <Image src={props.mediaUrl} />
      </Card.Body>
      <Card.Footer className="pt-0">
        <Row className="my-2">
          <Col> Commentaires : </Col>
          <Col className="text-right">
            <Button type="button" className="mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </Button>
            <Button type="button" className="mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-share"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <CommentsList postId={props.postId} />
        </Row>
        <Row>
          <InputGroup>
            <FormControl
              placeholder="Votre commentaire .."
              aria-label="Votre commentaire .."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={handleComment}
                disabled={!commentIsValid()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default MainPost;
