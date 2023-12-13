import React from "react";
import ContentLoader from "react-content-loader";
const PostSkeleton = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <ContentLoader
        speed={2}
        width={800}
        height={400}
        viewBox="0 0 800 400"
        backgroundColor="#c4c4c4"
        foregroundColor="#cfcfcf"
      >
        <rect x="0" y="0" rx="0" ry="0" width="800" height="200" />
        <circle cx="55" cy="248" r="25" />
        <rect x="110" y="230" rx="4" ry="4" width="105" height="17" />
        <rect x="110" y="255" rx="5" ry="5" width="70" height="9" />
        <rect x="60" y="305" rx="7" ry="7" width="375" height="34" />
        <rect x="60" y="360" rx="0" ry="0" width="179" height="12" />
      </ContentLoader>
    </div>
  );
};

export default PostSkeleton;
