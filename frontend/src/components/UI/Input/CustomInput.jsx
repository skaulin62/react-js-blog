import React from "react";
import styles from "./CustomInput.module.scss";
import clsx from "clsx";

const CustomInput = ({ error = false, className, helperText, ...props }) => {
  return (
    <div>
      <input className={`${styles.input} ` + className} {...props} />

      {error ? (
        <label className={clsx({ [styles.helperText]: true })}>
          {helperText}
        </label>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomInput;
