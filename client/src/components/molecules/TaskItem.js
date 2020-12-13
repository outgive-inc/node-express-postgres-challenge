import React, { useState } from 'react';
import { 
  Row,
  Container
} from 'react-bootstrap';

export const TaskItem = ({ item }) => {

  const [title] = useState(item.title);

    return (
      <>
        <Container fluid>
          <Row>
            {`${title}`}
          </Row>
        </Container>
      </>
    );
}