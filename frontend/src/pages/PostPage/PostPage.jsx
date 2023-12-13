import React from "react";
import styles from "./PostPage.module.scss";
import Comment from "../../components/Comment/Comment";
import CustomInput from "../../components/UI/Input/CustomInput";
import { useParams } from "react-router-dom";
import axios from "../../API/axios";
import CustomLoader from "../../components/Loader/CustomLoader";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddComment } from "../../Redux/slices/slicePosts";
const PostPage = () => {
  const params = useParams();
  const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`posts/${params.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  console.log(data);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "100px 0",
          backgroundColor: "white",
          borderRadius: "3px",
        }}
      >
        <CustomLoader />;
      </div>
    );
  }
  const onClickSaveComment = async (comment, userId) => {
    const params = { id: userId, comment: comment };
    await dispatch(fetchAddComment(params))
      .then((res) => {
        axios
          .get(`posts/${params.id}`)
          .then((res) => setData(res.data))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      })
      .catch((err) => alert("Something is wrong"));
  };
  return (
    <>
      {!data ? (
        <div className={styles.postPage}>
          <h2 style={{ textAlign: "center", padding: "50px 0" }}>
            Not Found😅
          </h2>
        </div>
      ) : (
        <>
          <div className={styles.postPage}>
            {data?.imageUrl && (
              <img
                className="post__image"
                src={
                  data.imageUrl
                    ? data?.imageUrl?.includes("/uploads/")
                      ? `${process.env.REACT_APP_API_URL}${data?.imageUrl}`
                      : data?.imageUrl
                    : ""
                }
              />
            )}
            <div className="post__info">
              <div className="post__user-info">
                <div className="post__user-photo-overflow">
                  <img src={data.user.avatarUrl} />
                </div>
                <div className="post__pseudo">
                  <span className="username">
                    {data.user.fullName.split(" ")[0]}
                  </span>
                  <span className="date">{data.createdAt}</span>
                </div>
              </div>
              <div className="post__post-info">
                <h2>{data.title}</h2>
                <p>{data.text}</p>
                <p className="post__tags">
                  {data.tags.map((obj, index) => (
                    <span key={index}>#{obj}</span>
                  ))}
                </p>

                <div className="post__metadata">
                  <div>
                    <img
                      width={20}
                      height={20}
                      src="../../assets/images/show.png"
                      alt="views"
                    />
                    {data.viewsCount}
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
                    {data.countComments}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.commentsPost}>
            {data.comments.map((obj, index) => (
              <Comment key={index} data={obj} />
            ))}
          </div>
          <div className={styles.commentsPost__add}>
            <div className={styles.overflow}>
              <img src={user.avatarUrl} alt="avatar" />
            </div>

            <div className={styles.commentsPost__createField}>
              <CustomInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.commentsPost__input}
                placeholder="Add your comment"
              />
              <button
                onClick={() => onClickSaveComment(comment, params.id)}
                className="button-reverse"
              >
                Comment
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
