import { React} from 'react';
import '../assets/App.css';
import '../assets/EventsPage.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"

export default function CreateEvent({username}) {
  //const SERVER_URL = "https://phlame-back.herokuapp.com"
  const SERVER_URL = "http://localhost:5001"

    function addEvent() {

        const name = document.getElementById('ename').value;
        const date = document.getElementById('edate').value;
        const state = document.getElementById('estate').value;
        const address = document.getElementById('eaddress').value;
        const city = document.getElementById('ecity').value;
        const zipcode = document.getElementById('ezipcode').value;
        const startTime = document.getElementById('estartTime').value;
        const endTime = document.getElementById('eendTime').value;
        const description = document.getElementById('edescription').value;
        const requirements = document.getElementById('erequirements').value; 
        const comments = document.getElementById('ecomments').value; 
        var event = new Object(); 
        event.name = name; 
        event.date = date; 
        event.state = state; 
        event.address = address; 
        event.city = city; 
        event.zipcode = zipcode; 
        event.startTime = startTime; 
        event.endTime = endTime; 
        event.description = description; 
        event.requirements = requirements; 
        event.comments = comments; 

        let result = fetch(SERVER_URL + "/addevent", {
          headers: {
            "Content-type": "application/json",
        },
          method: "POST",
          body: JSON.stringify({
              name: event.name,
              date: event.date,
              address: event.address,
              city: event.city,
              state: event.state,
              zipcode: event.zipcode,
              starttime: event.startTime,
              endtime: event.endTime,
              description: event.description,
              requirements: event.requirements,
          }),
      })
      .then(res => res.json())
      .then(data => console.log(data))
      confirmAlert({
        title: "You just created an event!",
        message: "Share it for users to come!",
        buttons: [
            {
                label: "Yay!",
                onClick: () => {},
            },
        ],
    })
      return result
        /*listOfEvents.current = [...listOfEvents.current, event]; 
        var events = listOfEvents.current.map(function (t, i) {
            return ( 
                "<Container id = position-relativeUp><h1>Event Name: "+t.name+"<h4>Date: "+t.date+"</h4></h1><p>"+t.description+"</p><h5>Comments:</h5><p>"+t.comments+"</p></Container>"
            )
        }) 
        console.log(JSON.stringify(events))
        document.getElementById('events').innerHTML =
            '<li>' + events.join('</li><li>') + '</li>'*/
    }
    return (
        <>
        <div class = "row">
        <div className="col-xs-6">
        <Container id="NGOHome-main-container">
        <Form id = "position-relative">
        <h4>Create New Event Posting</h4>
  <Row className="mb-0.5">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Event Name</Form.Label>
      <Form.Control type="text" id="ename" placeholder="Enter Event Name" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Date</Form.Label>
      <Form.Control type="date" id = "edate" placeholder="Enter Date" />
    </Form.Group>
  </Row>

  <Form.Group className="mb-0.5" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" id="eaddress" placeholder="1234 Main St" />
  </Form.Group>

  <Row className="mb-0.5">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control type="text" id="ecity" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Select id = "estate" defaultValue="Choose...">
        <option>Choose...</option>
        <option>Alabama</option>
        <option>Alaska</option>
        <option>Arizona</option>
        <option>Arkansas</option>
        <option>California</option>
        <option>Colorado</option>
        <option>Connecticut</option>
        <option>Delaware</option>
        <option>Florida</option>
        <option>Georgia</option>
        <option>Hawaii</option>
        <option>Idaho</option>
        <option>Illinois</option>
        <option>Indiana</option>
        <option>Iowa</option>
        <option>Kansas</option>
        <option>Kentucky</option>
        <option>Louisiana</option>
        <option>Maine</option>
        <option>Maryland</option>
        <option>Massachusetts</option>
        <option>Michigan</option>
        <option>Minnesota</option>
        <option>Mississippi</option>
        <option>Missouri</option>
        <option>Montana</option>
        <option>Nebraska</option>
        <option>Nevada</option>
        <option>New Hampshire</option>
        <option>New Jersey</option>
        <option>New Mexico</option>
        <option>New York</option>
        <option>North Carolina</option>
        <option>North Dakota</option>
        <option>Ohio</option>
        <option>Oklahoma</option>
        <option>Oregon</option>
        <option>Pennsylvania</option>
        <option>Rhode Island</option>
        <option>South Carolina</option>
        <option>South Dakota</option>
        <option>Tennessee</option>
        <option>Texas</option>
        <option>Utah</option>
        <option>Vermont</option>
        <option>Virginia</option>
        <option>Washington</option>
        <option>West Virginia</option>
        <option>Wisconsin</option>
        <option>Wyoming</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control id="ezipcode" />
    </Form.Group>
  </Row>
  <Row className="mb-2">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Start Time</Form.Label>
      <Form.Control type="time" id ='estartTime'/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>End Time</Form.Label>
      <Form.Control type="time" id = 'eendTime'/>
    </Form.Group>
  </Row>

  <Form.Group className="mb-0.5" controlId="formGridDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control type="text" id='edescription' class="input-xlarge"/>
  </Form.Group>

  <Form.Group className="mb-0.5" controlId="formGridDescription">
    <Form.Label>Volunteer Requirements</Form.Label>
    <Form.Control type="text" id = 'erequirements' class="input-xlarge"/>
  </Form.Group>

  <Form.Group className="mb-4" controlId="formGridDescription">
    <Form.Label>Comments</Form.Label>
    <Form.Control type="text" id = 'ecomments' class="input-xlarge"/>
  </Form.Group>

  <Button variant="primary" onClick={addEvent}>
    Submit
  </Button>
</Form>
</Container>
</div>
<div class="col-xs-6">
</div>
</div>
</>
      );
}
