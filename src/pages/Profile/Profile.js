import "./Profile.scss";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import BrandLogo from "../../globals/Header/BrandLogo";
import SearchBar from "../../globals/Header/SearchBar";
import Menu from "../../globals/Header/Menu";
import FooterMenu from "../../globals/Footer/FooterMenu";
import ProfileCard from "./components/ProfileCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfilePosts from "./components/ProfilePosts";

function Profile(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [userProfile, setUserProfile] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:1331/api/auth/profile/${
          window.location.pathname.split("/")[2]
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log("profile", res.data);
        setUserProfile(res.data);
        setLoaded(true);
      });
  }, []);

  return (
    <Container fluid className="page-container profile">
      <Row className="profile-header mb-1 pt-2">
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

      <Row className="profile-main">
        <Col xs={8} sm={8} md={3} className="profile-card">
          <ProfileCard
            profilePicture={userProfile.profile_picture}
            name={`${userProfile.firstname} ${userProfile.lastname}`}
            role={userProfile.company_role}
            className="user-card"
          />
        </Col>
        <Col xs={12} sm={12} md={8} xl={6} className="px-5 posts-list" id="postsList">
          {loaded && <ProfilePosts posts={userProfile.posts} />}
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

export default Profile;
