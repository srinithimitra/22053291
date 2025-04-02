// social-media-analytics/src/TrendingPosts.js
import React from 'react';

const TrendingPosts = ({ posts, comments, users }) => {
  if (!posts || !comments) return <div>Loading...</div>;

  const postCommentCounts = {};
  posts.forEach((post) => {
    postCommentCounts[post.id] = comments[post.id] ? comments[post.id].length : 0;
  });

  const maxComments = Math.max(...Object.values(postCommentCounts));
  const trendingPosts = posts.filter((post) => postCommentCounts[post.id] === maxComments);

  return (
    <div>
      <h2>Trending Posts</h2>
      <ul>
        {trendingPosts.map((post) => (
          <li key={post.id}>
            {users[post.userid]}: {post.content} ({comments[post.id] ? comments[post.id].length : 0} comments)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
