import React from "react";
import Comment from "../Comment/Comment";
import CustomLoader from "../Loader/CustomLoader";
import clsx from "clsx";

const SideBar = ({
  setFilter,
  isLoadingTags,
  tags,
  comments,
  isLoadingComments,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  console.log(activeIndex);

  const setInActiveIndex = (index, obj) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
      setFilter("");
    } else {
      setActiveIndex(index);
      setFilter(obj);
    }
  };

  const renderTags = () => {
    if (tags.length) {
      return (
        <>
          <ul className="list-tags">
            {isLoadingTags ? (
              <CustomLoader />
            ) : (
              tags.map((obj, index) => (
                <li
                  className={clsx(
                    ["sidebar__tag"],
                    [{ ["activeTag"]: index === activeIndex }]
                  )}
                  key={index}
                  onClick={() => setInActiveIndex(index, obj)}
                >
                  <img
                    width={20}
                    height={20}
                    src="assets/images/tag.svg"
                    alt="tag"
                  />
                  <span className="tag">{obj}</span>
                </li>
              ))
            )}
          </ul>
        </>
      );
    } else {
      return (
        <h2 style={{ textAlign: "center", margin: "10px auto" }}>Not tags😅</h2>
      );
    }
  };

  const renderComments = () => {
    if (comments.length) {
      return (
        <>
          {isLoadingComments ? (
            <CustomLoader />
          ) : (
            comments.map((obj, index) => <Comment key={index} data={obj} />)
          )}
        </>
      );
    } else {
      return <h2 style={{ margin: "10px auto" }}>Not comments😅</h2>;
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__tags">
        {" "}
        <h2>Tags</h2>
        {renderTags()}
      </div>
      <div className="sidebar__comments">
        <h2>Comments</h2>
        <div className="list-comments">{renderComments()}</div>
      </div>
    </div>
  );
};

export default SideBar;
