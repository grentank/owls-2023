import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './PageLayout';
import MainPage from './pages/MainPage';
import PostsPage from './pages/PostsPage';
import OnePostPage from './pages/OnePostPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';

export default function App({ user, posts }) {
  return (
    <PageLayout user={user}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage posts={posts} user={user} />} />
        <Route path="/posts/:id" element={<OnePostPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </PageLayout>
  );
}
