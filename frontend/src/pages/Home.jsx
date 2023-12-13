import React from "react";
import FilterPosts from "../components/FilterPosts/FilterPosts";
import Post from "../components/Post/Post";
import SideBar from "../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchPosts,
  fetchTags,
} from "../Redux/slices/slicePosts";
import PostSkeleton from "../components/Post/PostSkeleton";

import qs from "qs";
import axios from "../API/axios";
const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const isLoadingPost = posts.status === "loading";
  const isLoadingTags = tags.status === "loading";
  const isLoadingComments = comments.status === "loading";

  //sort filter
  const [sort, setSort] = React.useState({ title: "New", type: "createdAt" });
  const [filter, setFilter] = React.useState("");
  React.useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  React.useEffect(() => {
    dispatch(fetchPosts({ sort: sort.type, filter: filter }));
  }, [sort, filter]);

  const fillPosts = () => {
    if (posts.items.length) {
      return (isLoadingPost ? [...Array(3)] : posts.items).map((obj, index) =>
        isLoadingPost ? (
          <PostSkeleton key={index} />
        ) : (
          <Post
            key={index}
            isOwner={userData?._id === obj.user._id}
            item={obj}
          />
        )
      );
    } else {
      return <h1 style={{ margin: "55px auto" }}>Not posts😅</h1>;
    }
  };
  return (
    <section className="home">
      <FilterPosts setSort={setSort} />
      <div className="home__content">
        <div className="home__posts">{fillPosts()}</div>

        <SideBar
          setFilter={setFilter}
          isLoadingTags={isLoadingTags}
          tags={tags.items}
          comments={comments.items}
          isLoadingComments={isLoadingComments}
        />
      </div>
    </section>
  );
};

export default Home;
