import React from "react";
import CustomLoader from "../Loader/CustomLoader";
import PostSkeleton from "./PostSkeleton";
import { Link } from "react-router-dom";
import { fetchRemovePost } from "../../Redux/slices/slicePosts";
import { useDispatch } from "react-redux";
const Post = ({ item, isOwner }) => {
  const {
    _id,
    title,
    tags,
    viewsCount,
    countComments,
    user,
    imageUrl,
    createdAt,
  } = item;
  const dispatch = useDispatch();
  const onClickRemovePost = async () => {
    if (window.confirm("Do you really want to remove post?")) {
      const data = await dispatch(fetchRemovePost(_id));
      console.log(data);
    }
  };
  return (
    <div className="post">
      {isOwner && (
        <div className="post__editor">
          <Link to={`/post/${_id}/editor`}>
            <button>Edit</button>
          </Link>
          <button onClick={onClickRemovePost}>Delete</button>
        </div>
      )}
      {imageUrl && (
        <img
          className="post__image"
          src={
            imageUrl?.includes("/uploads/")
              ? `https://s6nder-react-blog.onrender.com${imageUrl}`
              : imageUrl
          }
        />
      )}
      <div className="post__info">
        <div className="post__user-info">
          <div className="post__user-photo-overflow">
            <img src={user?.avatarUrl || "/assets/images/avatar-icon.webp"} />
          </div>
          <div className="post__pseudo">
            <span className="username">{user.fullName.split(" ")[0]}</span>
            <span className="date">{createdAt}</span>
          </div>
        </div>
        <div className="post__post-info">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="post__tags">
            {tags.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </p>

          <div className="post__metadata">
            <div>
              <img
                width={20}
                height={20}
                src="assets/images/show.png"
                alt="views"
              />
              {viewsCount}
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
              >
                <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"></path>
              </svg>
              {countComments}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
