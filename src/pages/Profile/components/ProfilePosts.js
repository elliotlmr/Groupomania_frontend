import { useEffect, useState } from "react";
import Post from "../../Homepage/components/Posts/Post";

function ProfilePosts(props) {
  const userStorage = localStorage.getItem("user");
  const user = JSON.parse(userStorage);
  const userPosts = props.posts;
  const [posts, setPosts] = useState([]);
  
    useEffect(() => {
        setPosts(userPosts);
    }, []);

  console.log(posts);

  const updateComments = (postId, comment) => {
    let copyPosts = [...posts];
    let post = copyPosts.find((p) => p.id == postId);
    post.comments = post.comments.concat([comment]);
    setPosts(copyPosts);
  };

  return (
    <>
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
          updateComments={updateComments}
        />
      ))}
    </>
  );
}

export default ProfilePosts;
