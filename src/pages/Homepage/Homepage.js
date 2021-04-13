import "./Homepage.scss";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import BrandLogo from "../../globals/Header/BrandLogo";
import SearchBar from "../../globals/Header/SearchBar";
import Menu from "../../globals/Header/Menu";
import PostsList from "./components/Posts/PostsList";
import FooterMenu from "../../globals/Footer/FooterMenu";
import Post from "./components/Posts/Post";
import { useEffect, useState } from "react";
import axios from "axios";

function Homepage() {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [lastPost, setLastPost] = useState({});
  const [mostLikedPost, setMostLikedPost] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1331/api/posts/last", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log("Dernier post chargé !");
        setLastPost(res.data[0]);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:1331/api/posts/mostLiked", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log("Post le plus aimé chargé !");
        setMostLikedPost(res.data[0]);
      })
      .catch((error) => console.log(error));

    setLoaded(true);
  }, []);

  console.log("mostliked", mostLikedPost);
  console.log("lastpost", lastPost);
  console.log(loaded);

  const updateComments = (postId, comment) => {
    if (postId == lastPost.id) {
      let update = {...lastPost};
      update.comments = update.comments.concat([comment]);
      setLastPost(update);
    }
    if (postId == mostLikedPost.id) {
      let update = {...mostLikedPost};
      update.comments = update.comments.concat([comment]);
      setMostLikedPost(update);
    }
    console.log("update", lastPost);
    console.log("up", mostLikedPost);
  };

  return (
    <Container fluid className="page-container homepage">
      <Row className="logs-header mb-1 pt-2">
        <Col xs={6} sm={6} md={3}>
          <BrandLogo />
        </Col>
        <Col className='align-self-center'>
          <SearchBar md={6} />
        </Col>
        <Col xs={6} sm={6} md={3}>
          <Menu />
        </Col>
      </Row>

      <Row className="logs-main justify-content-center">
        <Col md={3} className="text-center">
          <Badge pill variant="dark" className="mb-4">
            Votre dernier post :
          </Badge>
          <button onClick={() => console.log("test", lastPost)}>click</button>
          {loaded && (
            <Post
              key={lastPost.id ? lastPost.id : "dynamicKey"}
              id={lastPost.id}
              authorId={lastPost.userId}
              postId={lastPost.id}
              profilePicture={
                lastPost.user
                  ? lastPost.user.profile_picture
                  : user.profile_picture
              }
              author={
                lastPost.user
                  ? `${lastPost.user.firstname} ${lastPost.user.lastname}`
                  : user.author
              }
              description={lastPost.description}
              mediaUrl={lastPost.mediaUrl}
              commentsNumber={
                lastPost.comments ? lastPost.comments.length : "0"
              }
              comments={lastPost.comments ? lastPost.comments : []}
              likesNumber={lastPost.likes ? lastPost.likes : '' }
              updateComments={updateComments}
            />
          )}
        </Col>
        <Col md={6} className="px-5">
          <Row className="mt-3 justify-content-center">
            <PostsList />
          </Row>
        </Col>
        <Col md={3} className="text-center">
          <Badge pill variant="dark" className="mb-4">
            Post le plus aimé :
          </Badge>
          {loaded && (
            <Post
              key={mostLikedPost.id ? mostLikedPost.id : "dynamicKey"}
              id={mostLikedPost.id}
              authorId={mostLikedPost.userId}
              postId={mostLikedPost.id}
              profilePicture={
                mostLikedPost.user
                  ? mostLikedPost.user.profile_picture
                  : user.profile_picture
              }
              author={
                mostLikedPost.user
                  ? `${mostLikedPost.user.firstname} ${mostLikedPost.user.lastname}`
                  : user.author
              }
              description={mostLikedPost.description}
              mediaUrl={mostLikedPost.mediaUrl}
              commentsNumber={
                mostLikedPost.comments ? mostLikedPost.comments.length : "0"
              }
              comments={mostLikedPost.comments ? mostLikedPost.comments : []}
              likesNumber={mostLikedPost.likes ? mostLikedPost.likes : '' }
              updateComments={updateComments}
            />
          )}
        </Col>
      </Row>

      <Row className="home-footer fixed-bottom">
        <Col md={4}>
          <FooterMenu />
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
