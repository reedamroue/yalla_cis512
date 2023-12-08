import { React, useRef, useState } from 'react';
// import '../assets/Profile.css';
import {Button, Container, Form} from "react-bootstrap";
import yalla_logo from '../assets/yalla_logo.png';
import UserHome from './UserHome'
//const SERVER_URL = "https://phlame-back.herokuapp.com"
const SERVER_URL = "http://localhost:5001"
export default function UserRegisterProfile() {
  const START = 1;
  const REGISTER = 0;
  const [page, setPage] = useState(REGISTER);
  const currUsername = useRef('');
  const currPassword = useRef('');
  const currAge = useRef(0);
  const currNumber = useRef(0);
  const currEventGoal = useRef(0);
  const currInterests = useRef('');

  function goUserHome() {
    if (currUsername.current === '' || currPassword.current === '' || currAge.current === 0 || currNumber.current === 0 ||
     currInterests.current === '' || currEventGoal.current === 0) {
      alert("Please input all fields!")
    } else if (currUsername.current.match(/^[0-9A-Za-z]+$/) === null ||
    currPassword.current.match(/^[0-9A-Za-z]+$/) === null ||
    /^\d+$/.test(currEventGoal.current) === false) {
      alert("Username or password not alphanumeric")
    } else {
      let result = fetch(SERVER_URL + "/adduser", {
        headers: {
          "Content-type": "application/json",
      },
        method: "POST",
        body: JSON.stringify({
            username: currUsername.current,
            age: currAge.current,
            interests: currInterests.current,
            password: currPassword.current,
            goal: currEventGoal.current
        }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    setPage(START)
    return result
    }
  }

  if (page === REGISTER) {
      return (
        <Container id="login-main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center w-100">
        <img className="mb-4 phlame-logo" 
                src={yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
          <h1 className='mb-3 fs 3'>User Registration</h1>
          <h6 className='mb-3'>Please enter an alphanumeric username and password</h6>
          <Form.Group controlId='sign-in-user'><Form.Control type="username" size="1g" placeholder="Username" autoComplete='username' className='position-relative'
          onChange={e => currUsername.current = e.target.value }
          ></Form.Control></Form.Group>
          <Form.Group controlId='sign-in-password' className='mb-3'><Form.Control type="password" size="1g" placeholder="Password" autoComplete='current-password' className='position-relative'
          onChange={e => currPassword.current = e.target.value }></Form.Control></Form.Group>
          <h5 className='mb-3 fs 3'>Age</h5>
          <Form.Group controlId='age' className='mb-3'><Form.Control type="age" size="1g" placeholder='' className='position-relative' required
          onChange={e => currAge.current = e.target.value }></Form.Control></Form.Group>
          <h5 className='mb-3 fs 3'>Phone number</h5>
          <Form.Group controlId='phone-number' className='mb-3'><Form.Control type="phoneNumber" size="1g" placeholder='XXX-XXXX-XXXX' className='position-relative'
          onChange={e => currNumber.current = e.target.value }></Form.Control></Form.Group>
          <h2 className='mb-3 fs 3 d-grid' style={{color: '#00C8F8'}}>Preferences</h2>
          <h5 className='mb-3 fs 3 d-grid'>Interests</h5>
          <Form.Group controlId='interests' className='mb-3'><Form.Control type="string" size="1g" placeholder='policy, cleaning, climate, etc.' className='position-relative'
          onChange={e => currInterests.current = e.target.value }></Form.Control></Form.Group>
          <h5 className='mb-3 fs 3 d-grid'>Event Goal</h5>
          <Form.Group controlId='event-goal' className='mb-3'><Form.Control type="integer" size="1g" placeholder='5, 10, 15, ...' className='position-relative' required
          onChange={e => currEventGoal.current = e.target.value }></Form.Control></Form.Group>
          <div className="d-grid"><Button variant="primary" size="lg" onClick={goUserHome} style={{backgroundColor: '#00C8F8', border: 'none', outline: 'none',}}>Register</Button></div>
        </Form>
      </Container>
      )
  }
  if (page === START) {
    return <UserHome username={currUsername.current} />
  }

}
