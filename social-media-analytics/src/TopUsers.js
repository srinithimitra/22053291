// social-media-analytics/src/TopUsers.js
import React from 'react';

const TopUsers = ({ users, posts }) => {
  if (!users || !posts) return <div>Loading...</div>;

  const userPostCounts = {};
  posts.forEach((post) => {
    userPostCounts[post.userid] = (userPostCounts[post.userid] || 0) + 1;
  });

  const sortedUsers = Object.entries(userPostCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([userId, count]) => ({ userId, count }));

  return (
    <div>
      <h2>Top Users</h2>
      <ul>
        {sortedUsers.map((user) => (
          <li key={user.userId}>
            {users[user.userId]}: {user.count} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
