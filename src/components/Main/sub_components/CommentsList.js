import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Comment from './Comment';

//Accepte en props 'postId' afin de modifier l'URI de la requête.

function CommentsList(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get(`http://localhost:1331/api/posts/${props.postId}/comments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setComments(result.data);
    };

    fetchPosts();
  }, []);

  return (
    <Row className="mt-3 w-100">
      {comments.map((item) => (
        <Comment
          key={item.id}
          id={item.id}
          author={item.user_id}
          comment={item.text}
        />
      ))}
    </Row>
  );
}

export default CommentsList;
