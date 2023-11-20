import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AddPostForm from '../ui/AddPostForm';
import PostCard from '../ui/PostCard';
import usePosts from '../../customHooks/usePosts';

export default function PostsPage({ posts: initPosts, user }) {
  const { posts, addPostHandler, deletePostHandler, editPostHandler } = usePosts(initPosts);
  return (
    <Container>
      <Row>
        <Col>
          <AddPostForm handleSubmit={addPostHandler} user={user} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            {posts.map((post) => (
              <Col xs={4} key={post.id}>
                <PostCard
                  deletePostHandler={deletePostHandler}
                  editPostHandler={editPostHandler}
                  post={post}
                  user={user}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
