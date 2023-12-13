import React from "react";
import styles from "./Comment.module.scss";

const Comment = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.comment}>
      <div className={styles.overflow}>
        <img src={data.user.avatarUrl} alt="avatar" />
      </div>

      <div className={styles.info}>
        <span className={styles.username}>{data.user.fullName}</span>

        <span className={styles.descr}>{data.comment}</span>
      </div>
    </div>
  );
};

export default Comment;
