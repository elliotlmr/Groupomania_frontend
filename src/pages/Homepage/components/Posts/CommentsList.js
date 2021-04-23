import Row from "react-bootstrap/Row";
import Comment from "./Comment";

function CommentsList(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const { comments } = props;

  return (
    <Row className="mt-3 w-100">
      {comments.map((item) => (
        <Comment
          key={item.id}
          commentId={item.id}
          postId={item.postId}
          authorId={item.userId}
          author={
            item.user
              ? `${item.user.firstname} ${item.user.lastname}`
              : user.author
          }
          comment={item.text}
        />
      ))}
    </Row>
  );
}

export default CommentsList;
