import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import MainPost from "./MainPost";

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

  const updateComments = (postId, comment) => {
    let copyPosts = [...posts];
    let post = copyPosts.find(p => p.id == postId);
    post.comments = post.comments.concat([comment]);
    setPosts(copyPosts);
  }

  return (
    <Row className="mt-3 w-100">
      {posts.map((post) => (
        <MainPost
          key={post.id}
          id={post.id}
          authorId={post.userId}
          postId={post.id}
          profilePicture={post.user.profile_picture}
          author={`${post.user.firstname} ${post.user.lastname}`}
          description={post.description}
          mediaUrl={post.mediaUrl}
          commentsNumber={post.comments.length}
          comments={post.comments}
          updateComments={updateComments}
        />
      ))}
    </Row>
  );
}

export default PostsList;
