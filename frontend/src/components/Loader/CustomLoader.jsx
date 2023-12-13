import React from "react";
import styles from "./CustomLoader.module.scss";
const CustomLoader = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CustomLoader;
