import { React, useRef, useState } from 'react';
// import '../assets/Profile.css';
import {Button, Col, Container, Form, Row, DropdownButton, MenuItem, Dropdown } from "react-bootstrap";
import NGOHome from './NGOHome'
import yalla_logo from '../assets/yalla_logo.png';

//const SERVER_URL = "https://phlame-back.herokuapp.com"
const SERVER_URL = "http://localhost:5001"
export default function NGORegisterProfile() {
  const START = 1;
  const REGISTER = 0;
  const [page, setPage] = useState(REGISTER);
  const currUsername = useRef('');
  const currPassword = useRef('');
  const currLocation = useRef('');
  const currNumber = useRef(0);
  const currEventGoal = useRef(0);
  const currDescr = useRef('');

  async function goNGOHome() {

    if (currUsername.current == '' || currPassword.current == '' || currLocation.current == '' || currNumber.current == 0 ||
     currDescr.current == '' || currEventGoal.current == 0) {
      alert("Please input all fields!")
    } else if (currUsername.current.match(/^[0-9A-Za-z]+$/) === null ||
    currPassword.current.match(/^[0-9A-Za-z]+$/) === null ||
    /^\d+$/.test(currEventGoal.current) === false) {
      alert("Username or password not alphanumeric or event goal not number")
    } else {
      let result = fetch(SERVER_URL + "/addngo", {
        headers: {
          "Content-type": "application/json",
      },
        method: "POST",
        body: JSON.stringify({
            name: currUsername.current,
            description: currDescr.current,
            location: currLocation.current,
            contact: currNumber.current,
            password: currPassword.current,
            goal: currEventGoal.current
        }),
    })
    .then(res => {
      res.json()
      if (res.error) {
        alert(res.error)
        return
      }
    })
    .then(data => console.log(data))
    setPage(START)
    return result
    }

  }

  if (page == REGISTER) {
      return (
        <Container id="login-main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center w-100">
        <img className="mb-4 phlame-logo" 
                src={yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
          <h1 className='mb-3 fs 3'>NGO Registration</h1>
          <h6 className='mb-3'>Please enter an alphanumeric username and password</h6>
          <Form.Group controlId='sign-in-user'><Form.Control type="username" size="1g" placeholder="Username" autoComplete='username' className='position-relative'
          onChange={e => currUsername.current = e.target.value }
          ></Form.Control></Form.Group>
          <Form.Group controlId='sign-in-password' className='mb-3'><Form.Control type="password" size="1g" placeholder="Password" autoComplete='current-password' className='position-relative'
          onChange={e => currPassword.current = e.target.value }></Form.Control></Form.Group>
          <h5 className='mb-3 fs 3'>Location</h5>
          <Form.Group controlId='location' className='mb-3'><Form.Control type="string" size="1g" placeholder='1234 Main Street' className='position-relative' required
          onChange={e => currLocation.current = e.target.value }></Form.Control></Form.Group>
          <h5 className='mb-3 fs 3'>Phone number</h5>
          <Form.Group controlId='phone-number' className
          ='mb-3'><Form.Control type="phoneNumber" size="1g" placeholder='XXX-XXXX-XXXX' className='position-relative'
          onChange={e => currNumber.current = e.target.value }></Form.Control></Form.Group>
          <h2 className="mb-3 fs 3 d-grid" style={{color: '#00C8F8'}}>Preferences</h2>
          <h5 className='mb-3 fs 3 d-grid'>Description</h5>
          <Form.Group controlId='description' className='mb-3'><Form.Control type="string" size="1g" placeholder='Add short description for NGO...' className='position-relative'
          onChange={e => currDescr.current = e.target.value }></Form.Control></Form.Group>
          <h5 className='mb-3 fs 3 d-grid'>Event Goal</h5>
          <Form.Group controlId='event-goal' className='mb-3'><Form.Control type="integer" size="1g" placeholder='5, 10, 15, ...' className='position-relative' required
          onChange={e => currEventGoal.current = e.target.value }></Form.Control></Form.Group>
          <div className="d-grid"><Button variant="primary" size="lg" onClick={goNGOHome}>Register</Button></div>
        </Form>
      </Container>
      )
  }
  if (page == START) {
    return <NGOHome username={currUsername.current} />
  }

}
