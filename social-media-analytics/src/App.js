// social-media-analytics/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopUsers from './TopUsers';
import TrendingPosts from './TrendingPosts';
import Feed from './Feed';
import './App.css'; // Add CSS Library imports

const App = () => {
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const authToken = 'YOUR_AUTH_TOKEN'; // Replace with your actual token

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://20.244.56.144/evaluation-service/users',
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [authToken]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      if (users) {
        const postPromises = Object.keys(users).map(async (userId) => {
          try {
            const response = await axios.get(
              `http://20.244.56.144/evaluation-service/users/${userId}/posts`,
              { headers: { Authorization: `Bearer ${authToken}` } }
            );
            return response.data.posts;
          } catch (error) {
            console.error(`Error fetching posts for user ${userId}:`, error);
            return [];
          }
        });
        const allPosts = (await Promise.all(postPromises)).flat();
        setPosts(allPosts);
      }
    };
    fetchAllPosts();
  }, [users, authToken]);

  useEffect(() => {
    const fetchAllComments = async () => {
      if (posts) {
        const commentPromises = posts.map(async (post) => {
          try {
            const response = await axios.get(
              `http://20.244.56.144/evaluation-service/posts/${post.id}/comments`,
              { headers: { Authorization: `Bearer ${authToken}` } }
            );
            return { [post.id]: response.data.comments };
          } catch (error) {
            console.error(`Error fetching comments for post ${post.id}:`, error);
            return { [post.id]: [] };
          }
        });
        const allComments = await Promise.all(commentPromises);
        setComments(Object.assign({}, ...allComments));
      }
    };
    fetchAllComments();
  }, [posts, authToken]);

  return (
    <div className="App">
      <TopUsers users={users} posts={posts} />
      <TrendingPosts posts={posts} comments={comments} users={users}/>
      <Feed posts={posts} users={users} comments={comments} />
    </div>
  );
};

export default App;
