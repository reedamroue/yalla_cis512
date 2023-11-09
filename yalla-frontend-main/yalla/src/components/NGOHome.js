import { React, useState, useRef, useEffect} from 'react';
import '../assets/Login.css';
import NGOProfile from './NGOProfile';
import Home from './Home';
import CreateEvent from './CreateEvent';
import Chat from './Chat';
import Leaderboardr from './Leaderboard';
import EventsPage from './EventsPage';
import {Button, Col, Container, Form, Row, Dropdown, DropdownButton} from "react-bootstrap";
import App from './App';

function NGOHome({username}) {
    const HOME = 0;
    const EVENTS = 1; 
    const LEADERBOARD = 2;
    const PROFILE = 3;
    const CHAT = 4;
    const LOGIN = 5
    const [page, setPage] = useState(HOME);
    const usernamelogged = useRef('');
    usernamelogged.current = username;


    function goHome() {
        setPage(HOME);
      }
    
      function goEvents() {
        setPage(EVENTS);
      }
    
      function goLeaderboard() {
        setPage(LEADERBOARD);
      }

      function goProfile() {
        setPage(PROFILE);
      }

      function goLogin() {
        setPage(LOGIN);
      }

      function goChat() {
        setPage(CHAT);
      }

    if (page === HOME) {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand font-weight-bold" href="#"><h2>Yalla</h2></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link active" onClick={goHome}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goEvents}>Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goLeaderboard}>Leaderboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goChat}>Chat</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goProfile}>Profile</a>
                    </li>
                    </ul>
                    <h5 className="nav-text-now">Signed in as {username}</h5>
                    <Button className="btn btn-danger" type="button" onClick={goLogin}>LogOut</Button>
                </div>
                </nav>
                <Home username={usernamelogged.current}/>
            </div>
        )
    }

    if (page === EVENTS) {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand font-weight-bold" href="#"><h2>Yalla</h2></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={goHome}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" onClick={goEvents}>Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goLeaderboard}>Leaderboard</a>
                    </li>
                    <li class="nav-item">
                        <a className="nav-link" onClick={goChat}>Chat</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goProfile}>Profile</a>
                    </li>
                    </ul>
                    <h5 className="nav-text-now">Signed in as {username}</h5>
                    <Button className="btn btn-danger" type="button" onClick={goLogin}>LogOut</Button>
                </div>
                </nav>
                <CreateEvent username={usernamelogged.current}/>
                <EventsPage username={usernamelogged.current}/>
            </div>
        )
    }

    if (page === LEADERBOARD) {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand font-weight-bold" href="#"><h2>Yalla</h2></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={goHome}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goEvents}>Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" onClick={goLeaderboard}>Leaderboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goChat}>Chat</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goProfile}>Profile</a>
                    </li>
                    </ul>
                    <h5 className="nav-text-now">Signed in as {username}</h5>
                    <Button className="btn btn-danger" type="button" onClick={goLogin}>LogOut</Button>
                </div>
                </nav>
                <Leaderboardr/>
            </div>
        )
    }

    if (page === PROFILE) {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand font-weight-bold" href="#"><h2>Yalla</h2></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" onClick={goHome}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goEvents}>Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goLeaderboard}>Leaderboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goChat}>Chat</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" onClick={goProfile}>Profile</a>
                    </li>
                    <li>
                    </li>
                    </ul>
                    <h5 className="nav-text-now">Signed in as {username}</h5>
                    <Button className="btn btn-danger" type="button" onClick={goLogin}>LogOut</Button>
                </div>
                </nav>
                <NGOProfile username={usernamelogged.current} />
            </div>
        )
    }
    if (page === CHAT) {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand font-weight-bold" href="#"><h2>Yalla</h2></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" onClick={goHome}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goEvents}>Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goLeaderboard}>Leaderboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" onClick={goChat}>Chat</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={goProfile}>Profile</a>
                    </li>
                    </ul>
                    <h5 className="nav-text-now">Signed in as {username}</h5>
                    <Button className="btn btn-danger" type="button" onClick={goLogin}>LogOut</Button>
                </div>
                </nav>
                <Chat usern={usernamelogged.current}/>
            </div>
        )
    }
    if (page == LOGIN) {
        return (<App/>)
    }
}

export default NGOHome