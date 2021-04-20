import "./Post.scss";
import {
  Card,
  Image,
  Button,
  Row,
  InputGroup,
  FormControl,
  Col,
  Dropdown,
  Modal,
} from "react-bootstrap";
import ModifyPost from "./ModifyPost";
import CommentsList from "./CommentsList";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

//Accepte en props : id, authorId, postId, profilePicture, author, dexcription, mediaUrl.

function MainPost(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [showImage, setShowImage] = useState(false);
  const [comment, setComment] = useState("");
  const [displayComments, setDisplayComments] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [modify, setModify] = useState(false);
  const [isModified, setIsModified] = useState({});
  const [isLiked, setIsLiked] = useState(props.userLiked);
  const { updateComments } = props;

  function userIsAuthor() {
    return props.authorId === user.userId || user.role === "admin";
  }

  function commentIsValid() {
    return comment.length > 1;
  }

  function deletePost() {
    axios
      .delete(`http://localhost:1331/api/posts/${props.postId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDeleted(true);
      })
      .catch((error) => console.log(error));
  }

  function toggleModify(event) {
    event.preventDefault();

    if (modify == true) {
      setModify(false);
    } else {
      setModify(true);
    }
  }

  const finishModify = (newText) => {
    setIsModified(newText);
    console.log(newText);
    setModify(false);
  };

  const toggleImage = () => setShowImage(true);
  const closeImage = () => setShowImage(false);

  function toggleComments(e) {
    e.preventDefault();

    if (displayComments == true) {
      setDisplayComments(false);
    } else {
      setDisplayComments(true);
    }
  }

  function handleComment() {
    axios
      .post(
        `http://localhost:1331/api/posts/${props.postId}/comments/`,
        {
          userId: user.userId,
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
        updateComments(props.postId, res.data);
        console.log(res.data);
        setComment('');
      })
      .catch((error) => console.log(error));
  }

  function handleLike() {
    if (isLiked == true) {
      axios
        .post(
          `http://localhost:1331/api/posts/${props.postId}/likes`,
          {
            likes: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setIsLiked(false);
        })
        .catch((error) => console.log(error));
    }
    if (isLiked == false) {
      axios
        .post(
          `http://localhost:1331/api/posts/${props.postId}/likes`,
          {
            likes: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setIsLiked(true);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <Modal show={showImage} onHide={closeImage} className='modal-container'>
        <button
          type="button"
          name="Close Image"
          className="delete-btn ml-auto close-btn"
          onClick={closeImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-x-square"
            viewBox="0 0 16 16"
            id="delete-button"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <Image src={props.mediaUrl} className="modal-image" />
      </Modal>
      {deleted ? ( //Lorsque le post est 'deleted', renvoie une Card modifiée.
        <Card className="w-100 main-post mb-4" id={props.id}>
          <Card.Body>
            <Card.Text> Votre post a été supprimé ! </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        //Lorsque le post n'est pas 'deleted', renvoie une Card post.
        <Card className="w-100 main-post mb-4" id={props.id}>
          <Card.Body>
            <Row className="justify-content-between">
              <Col
                className="d-flex flex-row align-items-center mb-2"
                sm={6}
                md={8}
              >
                <Image
                  src={props.profilePicture}
                  roundedCircle
                  className="profile-picture-post mr-4"
                />
                <Link to={`/profile/${props.authorId}`}>
                  <Card.Title className="my-auto"> {props.author} </Card.Title>
                </Link>
              </Col>
              <Col
                sm={4}
                md={4}
                className="d-flex justify-content-end flex-column"
              >
                {userIsAuthor() && (
                  <>
                    <button
                      type="button"
                      name="Delete Comment"
                      className="delete-btn ml-auto"
                      onClick={deletePost}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        className="bi bi-x-square"
                        viewBox="0 0 16 16"
                        id="delete-button"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      name="Modify your post"
                      className="modify-post-btn ml-auto"
                      onClick={(e) => toggleModify(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-gear"
                        viewBox="0 0 16 16"
                        id="modify-post-button"
                      >
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                      </svg>
                    </button>
                  </>
                )}
              </Col>
            </Row>
            {modify ? (
              <ModifyPost
                postId={props.postId}
                finishModify={finishModify}
                placeholder={props.description}
              />
            ) : (
              <Card.Text className="text-left">
                {isModified.description
                  ? isModified.description
                  : props.description}
              </Card.Text>
            )}
            <Image
              src={props.mediaUrl}
              className="w-100"
              onClick={toggleImage}
            />
          </Card.Body>
          <Card.Footer className="pt-0">
            <Row className="my-2">
              <Col sm={6} className="px-0 mt-auto">
                <Button
                  variant="outline-primary"
                  type="button"
                  className="toggle-comments px-1"
                  onClick={(e) => toggleComments(e)}
                >
                  {`Commentaires (${props.commentsNumber}) :`}
                </Button>
              </Col>
              <Col sm={6} className="text-right">
                <Button
                  type="button"
                  className="like-btn mx-1"
                  variant={isLiked ? "danger" : "primary"}
                  value={isLiked}
                  onClick={handleLike}
                >
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
                  {props.likesNumber ? (
                    <span className="ml-2">{props.likesNumber}</span>
                  ) : (
                    ""
                  )}
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
              {displayComments && (
                <CommentsList postId={props.postId} comments={props.comments} />
              )}
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
                    onClick={(e) => {
                      handleComment();
                    }}
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
      )}
    </>
  );
}

export default MainPost;
