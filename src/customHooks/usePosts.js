import axios from 'axios';
import { useState } from 'react';

export default function usePosts(initPosts) {
  const [posts, setPosts] = useState(initPosts);
  const addPostHandler = async (e) => {
    try {
      e.preventDefault();
      const newPostFormData = Object.fromEntries(new FormData(e.target));
      const res = await axios.post('/api/posts', newPostFormData);
      if (res.status === 200) {
        setPosts((prev) => [...prev, res.data]);
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      const res = await axios.delete(`/api/posts/${postId}`);
      if (res.status === 200) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const editPostHandler = async (postId, newPostData) => {
    try {
      const res = await axios.patch(`/api/posts/${postId}`, newPostData);
      if (res.status === 200) {
        setPosts((prev) =>
          prev.map((post) => (post.id === postId ? { ...post, ...newPostData } : post)),
        );
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return { posts, addPostHandler, deletePostHandler, editPostHandler };
}
