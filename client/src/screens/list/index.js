/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Row, 
  ListGroup, 
  Modal, 
  InputGroup, 
  FormControl, 
  Pagination, 
  Jumbotron, 
  Container, 
  Button,
  Col
} from 'react-bootstrap';

import { TaskItem } from '../../components/molecules';
import { getTaskList, addTask } from '../../redux/actions/task';

const StyledButton = styled(Button)`
  margin-bottom: 10;
`;

export default function List() {

  const dispatch = useDispatch();
  const store = useSelector(store => store)

  const [show, toggleShow] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetail] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getTaskList(10, page));
  }, []);

  
  const handleTitleChange = (event) => {
    let fleldVal = event.target.value;
    setTitle(fleldVal);
  };

  const handleDetailChange = (event) => {
    let fleldVal = event.target.value;
    setDetail(fleldVal);
  };

  const reset = () => {
    setDetail("");
    setTitle("");
  }

  const showPagination = (count) => {
    let items = [];
    let procccessedCount = count / 10;

    if(procccessedCount < 1){
      procccessedCount = 1;
    } else {
      if(count % 10 !== 0) {
        procccessedCount += 1;
      }
  }

  const selectPage = (selectedPage) => {
    let tempPage = 0;
    for (let i = 0; i < selectedPage; i++) {
      tempPage += 10;
    }
    console.log(tempPage);
    setPage(tempPage);
    dispatch(getTaskList(10, tempPage));
  }

    for (let i = 0; i < procccessedCount - 1; i++) {
      items.push(
        <Pagination.Item onClick={e => selectPage(i)} key={i} active={i * 10 === page}>
          {i + 1}
        </Pagination.Item>,
      );
    }

    return (<Pagination>{items}</Pagination>);
  }



  return (
      <>
        <Container fluid>

          <Jumbotron>
            <h1 className="header">TODO</h1>
          </Jumbotron>

          <Row fluid className="mb-3">
            <Col><StyledButton onClick={() => toggleShow(true)}>Add</StyledButton></Col>
          </Row>

          <Row className="mb-3" id="list">
            <Col>
              <ListGroup style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                {
                  store.taskReducer.data.map(function(object, i){
                    return ( 
                      <ListGroup.Item> 
                        <Link to={{
                          pathname: '/detail',
                          state: { object }
                        }}>
                          <TaskItem item={object}/>
                        </Link>
                      </ListGroup.Item>
                    );
                  })
                }
              </ListGroup>
            </Col>
          </Row>

          { showPagination(store.taskReducer.count) }


          <Modal show={show}>
            
            <Modal.Header closeButton>
              <Modal.Title>ADD TASK</Modal.Title>
            </Modal.Header>

            <Modal.Body>  

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Title</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" value={title} onChange={handleTitleChange.bind(this)} />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Details</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" value={details} onChange={handleDetailChange.bind(this)}  />
              </InputGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => {
                toggleShow(false);
                reset();
              }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
                dispatch(addTask(title, details));
                toggleShow(false);
                reset();
              }}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

        </Container>
      </>
  );
}