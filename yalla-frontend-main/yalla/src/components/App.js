import { React, useState, useRef } from 'react';
import '../assets/Login.css';
import UserHome from './UserHome';
import NGOHome from './NGOHome';
import {Button, Container, Form} from "react-bootstrap";
import UserRegisterProfile from './UserRegisterProfile';
import NGORegisterProfile from './NGORegisterProfile';
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import Warning from './Warning';
import yalla_logo from '../assets/yalla_logo.png';
import new_yalla_logo from '../assets/new_yalla_logo.png';
//import { getUserEvents } from '../../../server/dbOperations';
// Pages accessible from this start page

function App() {
  // Define regular expression used to test for alphanumeric strings
  //const SERVER_URL = "https://phlame-back.herokuapp.com"
  const SERVER_URL = "http://localhost:5001"

  // Define constants for the different states that the page can be in
  const START = 0;
  const LOGIN = 1; 
  const REGISTER = 2;
  const USERLOGIN = 3; 
  const USERREGISTER = 4;
  const NGOLOGIN = 5;
  const NGOREGISTER = 6;
  const USERHOME = 7;
  const NGOHOME = 8;

  //const currUsername = useRef('');
  const [currUsername, setUsername] = useState('');
  const [currPassword, setPassword] = useState('');
  //const currPassword = useRef('');

  // Initialize game
  const [page, setPage] = useState(START);

  const [unsucc, setUnsucc] = useState(0);

  //const [dbuser, setdbuser] = useState([]);

  const dbuser = useRef([]);

  // Define event handlers
  function handleSubmit(e) {
    if (e.target === document.getElementById('logInBtn')) {
      goLogin();
    } else if (e.target === document.getElementById('registerBtn')) {
      goRegister();
    }
  }

  function goLogin() {
    setPage(LOGIN);
  }

  function goRegister() {
    setPage(REGISTER);
  }

  function goUserLogin() {
    setPage(USERLOGIN);
  }

  function goUserRegister() {
    setPage(USERREGISTER);
  }

  function goNGOLogin() {
    setPage(NGOLOGIN);
  }

  function goNGORegister() {
    setPage(NGOREGISTER);
  }

  async function goNGOHomePage() {
    //setUsername(document.getElementById('sign-in-email').value)
    //setPassword(document.getElementById('sign-in-password').value)
    await fetch(SERVER_URL + "/getngo/" + currUsername)
    .then(res => res.json())
    .then(res => {dbuser.current = res.data
    });

    if (currUsername.match(/^[0-9A-Za-z]+$/) === null || currPassword.match(/^[0-9A-Za-z]+$/) === null) {
          confirmAlert({
            title: "Username/Password not alphanumeric!",
            message: "Please try again with a alphanumeric username/password",
            buttons: [
                {
                    label: "Okay",
                    onClick: () => {},
                },
            ],
        })
        setUnsucc(unsucc + 1)
    } else {
      if (dbuser.current.length === 0 || currPassword !== dbuser.current[0].password) {
        confirmAlert({
          title: "Username or password incorrect!",
          message: "Please try again",
          buttons: [
              {
                  label: "Okay",
                  onClick: () => {},
              },
          ],
      })
      setUnsucc(unsucc + 1)
      } else {
        setUnsucc(0)
        setPage(NGOHOME);
      }
    }
  }
  async function goUserHome() {
    //setUsername(document.getElementById('sign-in-email').value)
    //setPassword(document.getElementById('sign-in-password').value)
    await fetch(SERVER_URL + "/getuser/" + currUsername)
    .then(res => res.json())
    .then(res => {dbuser.current = res.data
    });
    if (currUsername.match(/^[0-9A-Za-z]+$/) === null || currPassword.match(/^[0-9A-Za-z]+$/) === null) {
      confirmAlert({
        title: "Username/Password not alphanumeric!",
        message: "Please try again with a alphanumeric username/password",
        buttons: [
            {
                label: "Okay",
                onClick: () => {},
            },
        ],
    })
      //const [dbuser, setdbuser] = useState([]);
      setUnsucc(unsucc + 1)
    } else {
        if (dbuser.current.length === 0 || currPassword !== dbuser.current[0].password) {
          confirmAlert({
            title: "Username or password incorrect!",
            message: "Please try again",
            buttons: [
                {
                    label: "Okay",
                    onClick: () => {},
                },
            ],
        })
        setUnsucc(unsucc + 1)
        } else {
          setUnsucc(0)
          setPage(USERHOME)
        }
    }
  }

  if (page === START) {
    return (
      <Container id="login-main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center w-100">
          <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
          <h5 className='mb-3 fs 3'>The community for community service lovers</h5>
          <div className="mb-3 d-grid"><button id="logInBtn" className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={handleSubmit}>Login</button></div>
          <div className="mb-3 d-grid"><button id="registerBtn" className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={handleSubmit}>Register</button></div>
        </Form>
      </Container>
    );
    /*return (
      <div>
        <h1>Phlame</h1>
        <label>The community for community service lovers.</label>
        <button type="submit" id="logInBtn" onClick={handleSubmit}>Log In</button>
        <button type="submit" id="registerBtn" onClick={handleSubmit}>Register</button>
      </div>
    );*/
  }
  if (page === LOGIN) {
    return (
      <Container id="login-main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center w-100">
        <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
          <h5 className='mb-3 fs 3'>Login as a</h5>
          <div className="mb-3 d-grid"><button id="logInBtn" className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={goUserLogin}>User</button></div>
          <div className="mb-3 d-grid"><button id="registerBtn" className='bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl' onClick={goNGOLogin}>NGO</button></div>
        </Form>
      </Container>
    );

    /*return (
      <div>
        <h1>Phlame</h1>
        <br />
        <label>Login as a</label>
        <br />
        <button type="button" onClick={goUserLogin}>User</button>
        <br />
        <button type="button" onClick={goNGOLogin}>NGO</button>
        <br />
        <button type="button" onClick={goStart}>Go back</button>
      </div>
    );*/
  }
  if (page === REGISTER) {
    return (
      <Container id="login-main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center w-100">
        <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
          <h5 className='mb-3 fs 3'>Register as a </h5>
          <div className="mb-3 d-grid"><button id="logInBtn" className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={goUserRegister}>User</button></div>
          <div className="mb-3 d-grid"><button id="registerBtn" className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={goNGORegister}>NGO</button></div>
        </Form>
      </Container>
    );

    /*return (
      <div>
        <h1>Phlame</h1>
        <br />
        <label>Register as a</label>
        <br />
        <button type="button" onClick={goUserRegister}>User</button>
        <br />
        <button type="button" onClick={goNGORegister}>NGO</button>
        <br />
        <button type="button" onClick={goStart}>Go back</button>
      </div>
    );*/
  }
  if (page === USERLOGIN) {
    if (unsucc > 3) {
      //setUnsucc(0)
      return (
      <Container id="login-main-container" className="d-grid h-100">
        <Warning setUnsucc={setUnsucc}/>
      <Form id="sign-in-form" className="text-center w-100">
      <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
        <h1 className='mb-3 fs 3'>Welcome Back!</h1>
        <Form.Group controlId='sign-in-email'><Form.Control type="username" size="1g" placeholder="Username" autoComplete='username' className='position-relative'
        onChange={e => setUsername(e.target.value)}></Form.Control></Form.Group>
        <Form.Group controlId='sign-in-password' className='mb-3'><Form.Control type="password" size="1g" placeholder="Password" autoComplete='current-password' className='position-relative' style={{ marginTop: '5px' }}
        onChange={e => setPassword(e.target.value)}></Form.Control></Form.Group>
        <Form.Group controlId='sign-in-check' className=" mb-4 d-flex justify-content-center">
          <Form.Check label="Remember Me"></Form.Check>
        </Form.Group>
        <div className="d-grid"><Button className = {unsucc > 3 ? "btn btn-primary disabled" : "btn btn-primary"} size="lg" onClick={goUserHome} style={{backgroundColor: '#00C8F8', border: 'none', outline: 'none',}}> Sign In!</Button></div>
      </Form>
    </Container>
      
      )
    } else {
      return (
        <Container id="login-main-container" className="d-grid h-100">
          <Form id="sign-in-form" className="text-center w-100">
          <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
            <h1 className='mb-3 fs 3'>Welcome Back!</h1>
            <Form.Group controlId='sign-in-email'><Form.Control type="username" size="1g" placeholder="Username" autoComplete='username' className='position-relative'
            onChange={e => setUsername(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='sign-in-password' className='mb-3' style={{ marginTop: '5px' }}><Form.Control type="password" size="1g" placeholder="Password" autoComplete='current-password' className='position-relative'
            onChange={e => setPassword(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='sign-in-check' className=" mb-4 d-flex justify-content-center">
              <Form.Check label="Remember Me"></Form.Check>
            </Form.Group>
            <div className="d-grid"><button className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={goUserHome}> Sign In!</button></div>
          </Form>
        </Container>
  
      );
    }

    /*return (
      <div>
        <h1>Phlame</h1>
        <br />
        <label>Welcome back!</label>
        <br />
        <input type="text" id="uname" />
        <br />
        <input type="text" id="password" />
        <br />
        <button type="button" onClick={handleUserLogin}>Login</button>
        <br />
        <button type="button" onClick={goLogin}>Go back</button>
      </div>
    );*/
  }
  if (page === NGOLOGIN) {
    if (unsucc > 3) {
      return (
        <Container id="login-main-container" className="d-grid h-100">
          <Warning setUnsucc={setUnsucc}/>
          <Form id="sign-in-form" className="text-center w-100">
          <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
            <h1 className='mb-3 fs 3'>Welcome Back!</h1>
            <Form.Group controlId='sign-in-email'><Form.Control type="username" size="1g" placeholder="Username" autoComplete='username' className='position-relative'
            onChange={e => setUsername(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='sign-in-password' className='mb-3'><Form.Control type="password" size="1g" placeholder="Password" autoComplete='current-password' className='position-relative' style={{ marginTop: '5px' }}
            onChange={e => setPassword(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='sign-in-check' className=" mb-4 d-flex justify-content-center">
              <Form.Check label="Remember Me"></Form.Check>
            </Form.Group>
            <div className="d-grid"><Button className = {unsucc > 3 ? "btn btn-primary disabled" : "btn btn-primary"} size="lg" onClick={goNGOHomePage} style={{backgroundColor: '#00C8F8', border: 'none', outline: 'none',}}> Sign In!</Button></div>
          </Form>
        </Container>
      );
    } else {
      return (
        <Container id="login-main-container" className="d-grid h-100">
          <Form id="sign-in-form" className="text-center w-100">
          <img className="mb-4 phlame-logo" 
                src={new_yalla_logo} 
                alt="Bootstrap 5" 
                style={{ display: 'block', marginLeft: '-100px'}}/>
            <h1 className='mb-3 fs 3'>Welcome Back!</h1>
            <Form.Group controlId='sign-in-email'><Form.Control type="username" size="1g" placeholder="Username" autoComplete='username' className='position-relative'
            onChange={e => setUsername(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='sign-in-password' className='mb-3'><Form.Control type="password" size="1g" placeholder="Password" autoComplete='current-password' className='position-relative' style={{ marginTop: '5px' }}
            onChange={e => setPassword(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='sign-in-check' className=" mb-4 d-flex justify-content-center">
              <Form.Check label="Remember Me"></Form.Check>
            </Form.Group>
            <div className="d-grid"><Button className="bg-color1 py-2.5 px-3 border-none outline-none rounded-md text-white text-xl" onClick={goNGOHomePage}> Sign In!</Button></div>
          </Form>
        </Container>
      );
    }

    /*return (
      <div>
        <h1>Phlame</h1>
        <br />
        <label>Welcome back!</label>
        <br />
        <input type="text" id="uname" />
        <br />
        <input type="text" id="password" />
        <br />
        <button type="button" onClick={handleNGOLogin}>Login</button>
        <br />
        <button type="button" onClick={goLogin}>Go back</button>
      </div>
    );*/
  }
  if (page === USERREGISTER) {
    return (

        <UserRegisterProfile />

    );
    /*return (
      <div>
        <h1>Phlame</h1>
        <br />
        <label>Welcome!</label>
        <br />
        <label>Please enter an alphanumeric username and password.</label>
        <br />
        <input type="text" id="uname" />
        <br />
        <input type="text" id="password" />
        <br />
        <button type="button" onClick={handleUserRegister}>Register</button>
        <br />
        <button type="button" onClick={goRegister}>Go back</button>
      </div>
    );*/
  }
  if (page === NGOREGISTER) {
    return (
      <NGORegisterProfile />
    );
    /*return (
      <div>
        <h1>Phlame</h1>
        <br />
        <label>Welcome!</label>
        <br />
        <label>Please enter an alphanumeric username and password.</label>
        <br />
        <input type="text" id="uname" />
        <br />
        <input type="text" id="password" />
        <br />
        <button type="button" onClick={handleNGORegister}>Register</button>
        <br />
        <button type="button" onClick={goRegister}>Go back</button>
      </div>
    );*/
  }
  if (page === USERHOME) {
    return (
      <div>
        <UserHome username={currUsername} />
      </div>
    );
  }

  if (page === NGOHOME) {
    return (
      <div>
        <NGOHome username={currUsername}/>
      </div>
    )
  }

}

export default App;