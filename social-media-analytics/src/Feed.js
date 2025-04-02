// social-media-analytics/src/Feed.js
import React from 'react';

const Feed = ({posts, users, comments})=>{
  if (!posts) return <div>Loading...</div>;

  const sortedPosts = [...posts].sort((a,b)=>b.id-a.id);

  return (
    <div>
      <h2>Feed</h2>
      <ul>
        {sortedPosts.map((post)=>(
          <li key = {post.id}>
            {users[post.userid]}: {post.content} ({comments[post.id] ? comments[post.id].length : 0} comments)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
