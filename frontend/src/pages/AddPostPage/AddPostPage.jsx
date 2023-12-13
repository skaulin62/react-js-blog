import React, { useEffect } from "react";
import styles from "./AddPostPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../Redux/slices/sliceAuth";
import { Navigate, useNavigate, useParams } from "react-router";
import axios from "../../API/axios";
import CustomLoader from "../../components/Loader/CustomLoader";
const AddPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const isEditing = Boolean(id);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [fields, setFields] = React.useState({
    title: "",
    tags: "",
    text: "",
    imageUrl: "",
  });
  const fileRef = React.useRef(null);

  const handleChangeInput = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setFields({ ...fields, imageUrl: data.url });
    } catch (err) {
      console.log(err);
    }
  };

  const onClickCreatePost = async () => {
    try {
      const params = {
        title: fields.title,
        text: fields.text,
        tags: fields.tags.split(" "),
        imageUrl: fields.imageUrl,
      };
      setLoading(true);
      const { data } = isEditing
        ? await axios.patch("/posts/" + id, params)
        : await axios.post("/posts", params);
      const _id = isEditing ? id : data._id;
      navigate(`/post/${_id}`);
      console.log(params);
    } catch {
      alert("Something's wrong");
    }
  };

  useEffect(() => {
    if (!isAuth && !window.localStorage.getItem("token")) {
      return <Navigate to="/signin" />;
    }
    if (isEditing) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) =>
          setFields({
            title: data.title,
            text: data.text,
            tags: data.tags.join(" "),
            imageUrl: data.imageUrl,
          })
        )
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setError("error");
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {!loading ? (
        !error ? (
          <div
            style={{ width: "100%", background: "white", borderRadius: "3px" }}
          >
            <div className={styles.createdPost}>
              <button
                onClick={() => fileRef.current.click()}
                className="button"
              >
                Download Picture
              </button>

              {fields.imageUrl && (
                <div>
                  <img
                    width={250}
                    height={250}
                    src={`${process.env.REACT_APP_API_URL}${fields.imageUrl}`}
                  />
                  <button
                    className={styles.remove}
                    style={{ border: "none" }}
                    onClick={() => setFields({ ...fields, imageUrl: "" })}
                  >
                    Delete
                  </button>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                onChange={handleChangeInput}
                hidden
              />
              <input
                className={styles.createdPost__title}
                value={fields.title}
                onChange={(e) =>
                  setFields({
                    ...fields,
                    title: e.target.value,
                  })
                }
                placeholder="Article title..."
              />
              <input
                className={styles.createdPost__tags}
                placeholder="tags"
                value={fields.tags}
                onChange={(e) => {
                  setFields({
                    ...fields,
                    tags: e.target.value,
                  });
                }}
              />
              <textarea
                onChange={(e) =>
                  setFields({
                    ...fields,
                    text: e.target.value,
                  })
                }
                value={fields.text}
              />
              <button onClick={onClickCreatePost} className="button-reverse">
                {!isEditing ? "Create" : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <h2 style={{ textAlign: "center", padding: "50px 0" }}>
            Not Found😅
          </h2>
        )
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default AddPostPage;
