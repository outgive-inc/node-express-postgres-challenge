import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form,Button,Table,Card,Accordion} from 'react-bootstrap'
import { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert';
import './css/custom.css'

export default class List extends Component{

    constructor(){
        super();
        this.state = {
            showWhenEmpty : false,
            showAddForm: false,
            showList: false,
            showUpdForm: false,
            id:"",
            title: "",
            details: "",
            complete: false,
            data:[],
            completedata:[],
            incompletedata:[],
            view: [],
            updid: "",
            updtitle: "",
            upddetails: "",
            showComplete: false,
            showIncomplete:false
            
        
        }
        this.TriggerHideAndShow = this.TriggerHideAndShow.bind(this);
    }

    TriggerHideAndShow(indicator){
        switch(indicator){
            case 'showAddForm':
                this.setState({showAddForm: true, showWhenEmpty:false,showList:false,showUpdForm: false,showComplete:false, showIncomplete:false})
            break;
            case 'back':
                if(this.state.data.length === 0){
                    this.setState({ showWhenEmpty : true, showAddForm: false, showList: false, showUpdForm: false, showComplete:false, showIncomplete:false})
                }else{
                    this.setState({ showWhenEmpty : false, showAddForm: false, showList: true, showUpdForm: false, showComplete:false, showIncomplete:false})
                }
            break;
            case 'viewComplete':
                if(this.state.data.length === 0){
                    this.setState({ showWhenEmpty : true, showAddForm: false, showList: false, showUpdForm: false, showComplete:false, showIncomplete:false})
                }else{
                    this.setState({ showWhenEmpty : false, showAddForm: false, showList: false, showUpdForm: false, showComplete:true, showIncomplete:false})
                }
            break;
            case 'viewIncomplete':
                if(this.state.data.length === 0){
                    this.setState({ showWhenEmpty : true, showAddForm: false, showList: false, showUpdForm: false, showComplete:false, showIncomplete:false})
                }else{
                    this.setState({ showWhenEmpty : false, showAddForm: false, showList: false, showUpdForm: false, showComplete:false, showIncomplete:true})
                }
            break;
            case 'Update':
                this.setState({showAddForm: false,  showWhenEmpty : false, showList:false, showUpdForm:true, })
            break;
            default:
        }
    }
 
    componentDidMount(){
        axios.get(`http://localhost:5001/api/v1/get/tasks`).then(response =>{
            let complete = [];
            let incomplete = [];
            if(response.data.length !== 0){
                this.setState({data: response.data})
                this.setState({ showWhenEmpty : false, showAddForm: false, showList: true, showUpdForm: false,})
            }else{
                this.setState({ showWhenEmpty : true, showAddForm: false, showList: false, showUpdForm: false,})
            }
            for(var i in response.data){
                if(response.data[i].completed === true){
                    complete.push(response.data[i])
                }else{
                    incomplete.push(response.data[i])
                }
            }
            this.setState({completedata:complete, incompletedata:incomplete})
        }).catch(()=>{
            alert("error on axios");
        })
    }

    Validate(title,details){
        let indicator = [];
        let titlefield = document.getElementById("titlefield")
        let detailsfield = document.getElementById("detailsfield")
        if(title===""){
            titlefield.style.borderColor = "red"
            indicator.push(1)
        }else{
            titlefield.style.borderColor = "black"
        }
        if(details===""){
            detailsfield.style.borderColor = "red"
            indicator.push(1)
        }else{
            detailsfield.style.borderColor = "black"
        }

        if(indicator.length === 0){
            return true
        }else{
            return false
        }
    }
    
    Submit(){
        if(this.Validate(this.state.title,this.state.details)){
            let data = {
                title: this.state.title,
                details: this.state.details,
                complete:this.state.complete
            }
            axios.post("http://localhost:5001/api/v1/tasks",data).then(res =>{
                swal({
                    title:"New task added",
                    icon:"success",
                    button:"Okay"
                }).then(()=>{
                    window.location.reload();
                })
            }).catch(()=>{
                alert("error on axios");
            })
        }
    }
    async Update(id,title,details) {
       await this.setState({
            updid:id,
            updtitle:title,
            upddetails:details,
            showAddForm: false, 
            showWhenEmpty:false,
            showList:false,
            showComplete:false, 
            showIncomplete:false,
            showUpdForm: true,
        })
    }
    SubmitUpdate(){
        if(this.Validate(this.state.updtitle, this.state.upddetails)){
            let data = {
                id: this.state.updid,
                title: this.state.updtitle,
                details: this.state.upddetails,
                complete: this.state.complete
            }
            axios.put(`http://localhost:5001/api/v1/tasks/${this.state.updid}`,data).then(res =>{
                swal({
                    title:"Task has been updated",
                    icon:"success",
                    button:"Okay"
                }).then(()=>{
                    window.location.reload();
                })
            }).catch(()=>{
                alert("There was an interruption getting the backend datas");
            })
        }
    }
    async Delete(delId){
        await this.setState({id:delId})
        swal({
            title: "Are you sure?",
            text: "There will be no recovery for the deleted task",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios.delete(`http://localhost:5001/api/v1/tasks/${delId}`).then(res =>{
                    swal({
                        title:"Task has been deleted",
                        icon:"success",
                        button:"Okay"
                    }).then(()=>{
                        window.location.reload();
                    })
                }).catch(()=>{
                    alert("Unable to delete item");
                })
            } else {
              swal("To do task is not deleted!");
            }
          });
    }
 
    render(){
        const custom = {
            padding: "0px",
            margin: "auto",
            width: "40%",
            form : {
                textAlign : "left",
                height: "360px"
            },
            detailStyle: {
                marginTop: "0px",
                marginBottom: "0px", 
                height: "168px"
            },
            paddingTop: "216px",
            list : {
                overflowY: 'scroll',
                border:'1px solid black',
                height:'420px',
                textAlign:"center"
            }
        } 
        const {showWhenEmpty,showAddForm,showList,showUpdForm,data,showComplete,showIncomplete} = this.state
        return(
 
            <div className = "container" style={custom}>
                
                <Card style={{height:"599px"}}>
                    <Card.Header as="h5">To do App, you have {this.state.data.length} List/s</Card.Header>
                        <Card.Body>
                            { showWhenEmpty &&(
                                <div>   
                                    <h3>You have no List Yet</h3>   
                                </div>
                            )}

                            {showAddForm && (              
                                <div  style={custom.form}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label><h5>Title</h5></Form.Label>
                                            <Form.Control id="titlefield"
                                            required 
                                            type="text" 
                                            value={this.state.title} 
                                            onInput={(e)=>{this.setState({title: e.target.value})}}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label><h5>Details</h5></Form.Label>
                                            <Form.Control id="detailsfield" style={custom.detailStyle}
                                            required 
                                            as="textarea" 
                                            row={3} 
                                            onInput={(e)=>{this.setState({details: e.target.value})}}/>
                                        </Form.Group>

                                        <Button onClick={()=>this.Submit()}>Submit</Button> 
                                        <Button variant="secondary" onClick={()=>this.TriggerHideAndShow("back")}>Back</Button>
                                    </Form>
                                </div>
                            )}

                            {showList && (
                                <div>
                                    <br></br>
                                        <div  style={custom.list}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th style={{backgroundColor:"#0070fb"}}><h5 style={{color:"white"}}>TO DO TASK</h5></th>
                                                </tr>
                                                {
                                                data.map((todo) => {
                                                    return(
                                                        <tr key={todo.id}>
                                                            <td>
                                                                <Accordion>
                                                                    <Accordion.Toggle as={Button}  variant="Link" eventKey="0" style={{width:"500px"}}>
                                                                    <h4>{todo.title}</h4>
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey="0">
                                                                        <Card.Body>
                                                                                {todo.details}
                                                                                {todo.completed === false ? <h5 style={{color:"red"}}>NOT COMPLETED</h5>:<h5 style={{color:"green"}}>COMPLETED</h5>}
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="primary"
                                                                                    onClick={()=>this.Update(todo.id,todo.title,todo.details)}>
                                                                                    Update
                                                                                </Button>
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="danger"
                                                                                    onClick={()=>{this.Delete(todo.id)}}>
                                                                                    Delete
                                                                                </Button>
                                                                        </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Accordion>
                                                            </td>
                                                        </tr>
                                                    )
                                                }).reverse()
                                                }
                                            </thead>
                                        </Table>
                                        </div>
                                        <br></br>
                                </div>
                            )}


                            {showComplete &&(
                                <div>
                                    <br></br>
                                        <div  style={custom.list}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                <th style={{backgroundColor:"#03b703"}}><h5 style={{color:"white"}}>COMPLETED TASKS</h5></th>
                                                </tr>
                                                {
                                                this.state.completedata.map((todo) => {
                                                    return(
                                                        <tr key={todo.id}>
                                                            <td>
                                                                <Accordion>
                                                                    <Accordion.Toggle as={Button}  variant="Link" eventKey="0" style={{width:"500px"}}>
                                                                    <h4>{todo.title}</h4>
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey="0">
                                                                        <Card.Body>
                                                                                {todo.details}
                                                                                {todo.completed === false ? <h5 style={{color:"red"}}>NOT COMPLETED</h5>:<h5 style={{color:"green"}}>COMPLETED</h5>}
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="primary"
                                                                                    onClick={()=>this.Update(todo.id,todo.title,todo.details)}>
                                                                                    Update
                                                                                </Button>
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="danger"
                                                                                    onClick={()=>{this.Delete(todo.id)}}>
                                                                                    Delete
                                                                                </Button>
                                                                        </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Accordion>
                                                            </td>
                                                        </tr>
                                                    )
                                                }).reverse()
                                                }
                                            </thead>
                                        </Table>
                                        </div>
                                        <br></br>
                                </div>
                            )}


                            {showIncomplete &&(
                                <div>
                                    <br></br>
                                        <div  style={custom.list}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                <th style={{backgroundColor:"red"}}><h5 style={{color:"white"}}>INCOMPLETE TASKS</h5></th>
                                                </tr>
                                                {
                                                this.state.incompletedata.map((todo) => {
                                                    return(
                                                        <tr key={todo.id}>
                                                            <td>
                                                                <Accordion>
                                                                    <Accordion.Toggle as={Button}  variant="Link" eventKey="0" style={{width:"500px"}}>
                                                                    <h4>{todo.title}</h4>
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey="0">
                                                                        <Card.Body>
                                                                                {todo.details}
                                                                                {todo.completed === false ? <h5 style={{color:"red"}}>NOT COMPLETED</h5>:<h5 style={{color:"green"}}>COMPLETED</h5>}
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="primary"
                                                                                    onClick={()=>this.Update(todo.id,todo.title,todo.details)}>
                                                                                    Update
                                                                                </Button>
                                                                                <Button 
                                                                                    size="sm" 
                                                                                    variant="danger"
                                                                                    onClick={()=>{this.Delete(todo.id)}}>
                                                                                    Delete
                                                                                </Button>
                                                                        </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Accordion>
                                                            </td>
                                                        </tr>
                                                    )
                                                }).reverse()
                                                }
                                            </thead>
                                        </Table>
                                        </div>
                                        <br></br>
                                </div>
                            )}


                            {showUpdForm && (              
                                <div>
                                    <Form style={custom.form}>
                                        <Form.Group>
                                            <Form.Label><h5>Title</h5></Form.Label>
                                            <Form.Control id="titlefield"
                                            required 
                                            type="text" 
                                            value={this.state.updtitle} 
                                            onInput={(e)=>{this.setState({updtitle: e.target.value})}}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label><h5>Details</h5></Form.Label>
                                            <Form.Control id="detailsfield"
                                                required 
                                                as="textarea" 
                                                row={3} 
                                                value={this.state.upddetails} 
                                                onInput={(e)=>{this.setState({upddetails: e.target.value})}}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Check 
                                            label={`Mark as complete`}
                                            value={true}
                                            onInput={(e)=>{this.setState({complete:e.target.value})}}
                                        />
                                        
                                        
                                        </Form.Group>

                                        <Button onClick={()=>this.SubmitUpdate()}>Update</Button> 
                                        <Button variant="secondary" onClick={()=>this.TriggerHideAndShow("back")}>Back</Button>
                                    </Form>
                                </div>
                            )}

                    </Card.Body>
                    <Card.Footer style={{textAlign:"center"}}>
                        <Button  onClick={()=>this.TriggerHideAndShow("showAddForm")}>Add More</Button>
                        <Button  onClick={()=>this.TriggerHideAndShow("back")} variant="secondary">View All</Button>
                        <Button  onClick={()=>this.TriggerHideAndShow("viewComplete")} variant="success">View Completed Task</Button>
                        <Button  onClick={()=>this.TriggerHideAndShow("viewIncomplete")} variant="danger">View Incomplete Tasks</Button>
                    </Card.Footer>
                </Card>

            </div>
        )
    }
}
