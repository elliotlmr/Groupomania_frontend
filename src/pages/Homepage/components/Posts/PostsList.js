import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { withRouter } from "react-router-dom";
import CreatePost from "../CreatePost";
import Post from "./Post";

function PostsList(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios
        .get("http://localhost:1331/api/posts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            localStorage.clear();
            props.history.push("/");
            //window.location = "/";
          }
        });
    };

    fetchPosts();
  }, []);

  const updatePosts = () => {
    axios
      .get("http://localhost:1331/api/posts/last", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let post = res.data[0];
        let copyPosts = [...posts];
        copyPosts = copyPosts.concat([post]);
        copyPosts.unshift(copyPosts.pop());
        setPosts(copyPosts);
      });
  };

  const updateComments = (postId, comment) => {
    let copyPosts = [...posts];
    let post = copyPosts.find((p) => p.id == postId);
    post.comments = post.comments.concat([comment]);
    setPosts(copyPosts);
  };

  return (
    <Row className="mt-3 w-100">
      <Row className="w-100 mx-auto mb-5">
        <CreatePost
          profilePicture={user.profile_picture}
          updatePosts={updatePosts}
        />
      </Row>
      <Row className="w-100 mx-auto">
        {posts.map((post) => (
          <Post
            key={post.id ? post.id : "dynamicKey"}
            id={post.id}
            authorId={post.userId}
            postId={post.id}
            profilePicture={
              post.user ? post.user.profile_picture : user.profile_picture
            }
            author={
              post.user
                ? `${post.user.firstname} ${post.user.lastname}`
                : user.author
            }
            description={post.description}
            mediaUrl={post.mediaUrl}
            commentsNumber={post.comments ? post.comments.length : "0"}
            comments={post.comments ? post.comments : []}
            likesNumber={!post.likes || post.likes == 0 ? "" : post.likes}
            updateComments={updateComments}
            userLiked={
              post.likedUsers.find((u) => u.id == user.userId) ? true : false
            }
          />
        ))}
      </Row>
    </Row>
  );
}

export default withRouter(PostsList);
