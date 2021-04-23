import { Card, Image } from "react-bootstrap";

function ProfileCard(props) {
  return (
    <Card className={props.className}>
      <Card.Header className="d-flex">
        <Image
          src={props.profilePicture}
          roundedCircle
          className="profile-picture-post mr-4"
        />
        <Card.Title className="my-auto"> {props.name} </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="my-auto"> {props.role} </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
