import './Profile.scss';
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
        <Col xs={6} sm={6} md={3}>
          <BrandLogo />
        </Col>
        <Col>
          <SearchBar md={6} />
        </Col>
        <Col xs={6} sm={6} md={3}>
          <Menu />
        </Col>
      </Row>

      <Row className="profile-main">
        <Col xs={8} sm={8} md={3}>
          <ProfileCard
            profilePicture={userProfile.profile_picture}
            name={`${userProfile.firstname} ${userProfile.lastname}`}
            role={userProfile.company_role}
            className='user-card'
          />
        </Col>
        <Col xs={8} sm={8} md={6}>
          {loaded && <ProfilePosts posts={userProfile.posts} />}
        </Col>
      </Row>

      <Row className="profile-footer fixed-bottom">
        <Col md={4}>
          <FooterMenu />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
