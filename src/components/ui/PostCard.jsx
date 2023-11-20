import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Form } from 'react-bootstrap';

export default function PostCard({ post, deletePostHandler, editPostHandler, user }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        {isEditing ? (
          <Form
            onSubmit={(e) => {
              editPostHandler(post.id, Object.fromEntries(new FormData(e.target)));
              e.target.reset();
              setIsEditing(false);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="title"
                placeholder={post.title}
                defaultValue={post.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                name="body"
                placeholder={post.body}
                defaultValue={post.body}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.author.name}</Card.Subtitle>
            <Card.Text>{post.body}</Card.Text>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="danger"
                disabled={!(user?.id === post.userId)}
                onClick={() => deletePostHandler(post.id)}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                disabled={!(user?.id === post.userId)}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="primary">More</Button>
            </ButtonGroup>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
