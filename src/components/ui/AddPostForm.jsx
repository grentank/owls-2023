import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddPostForm({ handleSubmit, user }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title" disabled={!user} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          name="body"
          placeholder="Enter body"
          disabled={!user}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!user}>
        Submit
      </Button>
    </Form>
  );
}
