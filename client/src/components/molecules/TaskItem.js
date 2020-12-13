import React, { useState } from 'react';
import { 
  Row,
  InputGroup, 
  FormControl,
  Container, 
  Button,
  Col,
  ToggleButton
} from 'react-bootstrap';

export const TaskItem = ({ item , deleteItem, updateItem}) => {

  const [title, setTitle] = useState(item.title);
  const [details, setDetail] = useState(item.details);
  const [isCompleted, setCompleted] = useState(item.completed);

  //console.log(isCompleted);
  const handleTitleChange = (event) => {
    let fleldVal = event.target.value;
    console.log(fleldVal);
    setTitle(fleldVal);
    updateItem(item.id, fleldVal, details, isCompleted);
  };

  const handleDetailChange = (event) => {
    let fleldVal = event.target.value;
    console.log(fleldVal);
    setDetail(fleldVal);
    updateItem(item.id, title, fleldVal, isCompleted);
  };


    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <Container fluid>

                <ToggleButton
                  key={item.id}
                  type="checkbox"
                  name="radio"
                  variant="secondary"
                  value={isCompleted}
                  checked={isCompleted}
                  onChange={(e) => {

                    const isTrueSet = (e.currentTarget.value === 'true');
                    if(isTrueSet){
                      setCompleted(false);
                      updateItem(item.id, title, details, false);
                    } else {
                      setCompleted(true);
                      updateItem(item.id, title, details, true);
                    }
                  }}
                >
                  Completed?
                </ToggleButton>

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Title</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl as="textarea" aria-label="With textarea" value={title} onChange={handleTitleChange.bind(this)} />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Details</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl as="textarea" aria-label="With textarea" value={details} onChange={handleDetailChange.bind(this)} />
                </InputGroup>
              </Container>
            </Col>
            <Col xs={1}><Button variant="danger" onClick={() => deleteItem(item)}>DELETE</Button></Col>
          </Row>
        </Container>
      </>
    );
}