import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import MainPost from "./sub_components/MainPost";

function PostsList() {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:1331/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setPosts(result.data);
    };

    fetchPosts();
  }, []);

  return (
    <Row className="mt-3 w-100">
      {posts.map((post) => (
        <MainPost
          key={post.id}
          id={post.id}
          postId={post.id}
          profilePicture="testPP"
          author={post.userId}
          description={post.description}
          mediaUrl={post.mediaUrl}
        />
      ))}
    </Row>
  );
}

export default PostsList;
