import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from './ui/NavBar';

export default function PageLayout({ children, user }) {
  return (
    <Container>
      <Row>
        <Col>
          <NavBar user={user} />
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
