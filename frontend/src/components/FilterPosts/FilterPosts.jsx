import React from "react";
import clsx from "clsx";
const sorts = [
  { title: "New", type: "createdAt" },
  { title: "Popular", type: "viewsCount" },
];

const FilterPosts = ({ setSort }) => {
  const [index, setIndex] = React.useState(0);
  return (
    <>
      <ul className="home__filter-posts">
        {sorts.map((obj, _index) => (
          <li
            onClick={() => {
              setIndex(_index);
              setSort(obj);
            }}
            key={_index}
            className={clsx(
              ["home__select-filter"],
              [
                {
                  ["active"]: _index === index,
                },
              ]
            )}
          >
            {obj.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilterPosts;
