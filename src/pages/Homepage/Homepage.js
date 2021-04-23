import "./Homepage.scss";
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

    if (lastPost && mostLikedPost) {
      setLoaded(true);
    }
  }, []);

  const updateComments = (postId, comment) => {
    if (postId == lastPost.id) {
      let update = { ...lastPost };
      update.comments = update.comments.concat([comment]);
      setLastPost(update);
    }
    if (postId == mostLikedPost.id) {
      let update = { ...mostLikedPost };
      update.comments = update.comments.concat([comment]);
      setMostLikedPost(update);
    }
  };

  return (
    <Container fluid className="page-container homepage">
      <Row className="home-header mb-1 pt-2">
        <Col xs={6} sm={6} md={4} xl={3} className="d-flex logo-header">
          <BrandLogo />
        </Col>
        <Col className="align-self-center search-bar">
          <SearchBar md={4} xl={6} />
        </Col>
        <Col xs={6} sm={6} md={4} xl={3} className="menu">
          <Menu />
        </Col>
      </Row>

      <Row className="home-main justify-content-center">
        <Col md={3} className="text-center side-posts">
          <Badge pill variant="danger" className="mb-4 p-2">
            Votre dernier post :
          </Badge>
          {loaded && lastPost && (
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
              likesNumber={lastPost.likes ? lastPost.likes : ""}
              updateComments={updateComments}
              userLiked={
                lastPost?.likedUsers?.find((u) => u.id == user.userId)
                  ? true
                  : false
              }
            />
          )}
        </Col>
        <Col
          xs={12}
          md={10}
          xl={6}
          lg={6}
          className="px-5 posts-list"
          id="postsList"
        >
          <Row className="mt-3 justify-content-center">
            <PostsList />
          </Row>
        </Col>
        <Col md={3} className="text-center side-posts">
          <Badge pill variant="danger" className="mb-4 p-2">
            Post le plus aimé :
          </Badge>
          {loaded && mostLikedPost && (
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
              likesNumber={mostLikedPost.likes ? mostLikedPost.likes : ""}
              updateComments={updateComments}
              userLiked={
                mostLikedPost?.likedUsers?.find((u) => u.id == user.userId)
                  ? true
                  : false
              }
            />
          )}
        </Col>
      </Row>

      <Row className="footer fixed-bottom">
        <Col>
          <FooterMenu />
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
