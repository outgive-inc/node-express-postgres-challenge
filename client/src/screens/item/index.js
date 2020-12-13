import React, { useState } from 'react';
import { 
    Container, 
    Jumbotron,
    Form,
    Button
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {  deleteTask, updateTask } from '../../redux/actions/task';


export default function Item(props) {

    const dispatch = useDispatch();
    const [item] = useState(props.location.state.object);
    const [title, setTitle] = useState(props.location.state.object.title);
    const [details, setDetails] = useState(props.location.state.object.details);
    const [isCompleted, setCompleted] = useState(props.location.state.object.completed);

    const handleTitleChange = (event) => {
      let fleldVal = event.target.value;
      setTitle(fleldVal);
      dispatch(updateTask(item.id, fleldVal, details, isCompleted));
    };

    const handleDetailChange = (event) => {
      let fleldVal = event.target.value;
      setDetails(fleldVal);
      dispatch(updateTask(item.id, title, fleldVal, isCompleted));
    };

    const onDelete = () => {
        dispatch(deleteTask(item.id));
        props.history.goBack();
    }

    return (
        <>
            <Container fluid>
                <Jumbotron>
                    <h1 className="header">TODO</h1>
                </Jumbotron>

                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={handleTitleChange.bind(this)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Details</Form.Label>
                        <Form.Control as="textarea" value={details} onChange={handleDetailChange.bind(this)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check 
                            type="checkbox" 
                            label="Completed?" 
                            value={isCompleted}
                            checked={isCompleted}
                            onChange={(e) => {
                                const isTrueSet = (e.currentTarget.value === 'true');
                                console.log(isTrueSet);
                                if(isTrueSet){
                                  setCompleted(false);
                                  dispatch(updateTask(item.id, title, details, false));
                                } else {
                                  setCompleted(true);
                                  dispatch(updateTask(item.id, title, details, true));
                                }
                              }}
                        />
                    </Form.Group>

                    <Button variant="danger" onClick={() => onDelete()}>
                        Delete
                    </Button>
                </Form>
            </Container>
        </>
    );
}