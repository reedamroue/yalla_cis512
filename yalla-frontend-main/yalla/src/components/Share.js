import { React, useState, useRef, useEffect } from 'react';
import '../assets/Share.css';
import {PermMedia, Label, Room, EmojiEmotions, Event} from '@material-ui/icons'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import 'reactjs-popup/dist/index.css';
import Select from 'react-select';
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import reeda_yalla_pic from '../assets/reeda_yalla_pic.jpg'

export default function Share({username}) {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    const [message, setMessage] = useState('');
    const usernamelogged = useRef('')
    const [events, setEvents] = useState([])
    const [options, setOptions] = useState([])
    const [event_id, setEventId] = useState('')
    usernamelogged.current = username;
    /*  let result = fetch(SERVER_URL + "/addngo", {
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
    .then(res => res.json())
    .then(data => console.log(data))
    setPage(START)
    return result*/


    function updateEvents() {
        const output = []
        events.forEach((item) => {
            if (item[0]) {
                output.push({ label: item[0].name, value: item[0]._id })
            }
        })
        setOptions(output)
    }

    useEffect(() => {
        async function refresh_events() {
            await fetch(SERVER_URL + "/getTotalRepEvents")
                .then((res) => res.json())
                .then((res) => {
                    if (res && res.data.length !== 0) {
                        setEvents(res.data)
                    }
                })
        }
        refresh_events()

    }, [])

    /*useEffect(() => {
 
    }, [events])*/

    function addPost() {
        if (message == '') {
            confirmAlert({
                title: "You did not add text!",
                message: "Please add text and repost!",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => {},
                    },
                ],
            })
            return
        }
        if (event_id != '') {
            let result = fetch(SERVER_URL + "/addpost", {
                headers: {
                  "Content-type": "application/json",
              },
                method: "POST",
                body: JSON.stringify({
                    message: message,
                    event: event_id,
                    username: usernamelogged.current,
                }),
            })        
            .then(res => res.json())
            .then(data => console.log(data))
            confirmAlert({
                title: "You added a post!",
                message: "Check out your post in the feed below!",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => {},
                    },
                ],
            })
            return result
        } else {
            let result = fetch(SERVER_URL + "/addpost", {
                headers: {
                  "Content-type": "application/json",
              },
                method: "POST",
                body: JSON.stringify({
                    message: message,
                    event: '',
                    username: usernamelogged.current,
                }),
            })        
            .then(res => res.json())
            .then(data => console.log(data))
            confirmAlert({
                title: "You added a post!",
                message: "Check out your post in the feed below!",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => {},
                    },
                ],
            })
            return result
        }
    }
    return (
        <div className="share bg-white p-4 rounded-lg shadow-md">
            <div className="shareWrapper">
                <div className="shareTop flex items-center space-x-2">
                    <img className="shareProfileImg rounded-full" src={reeda_yalla_pic} alt="" />
                    <input placeholder="Share your last event!" className="shareInput flex-1"
                    onChange={e => 
                        {setMessage(e.target.value)
                        }
                    }/>
                </div>
                <hr className="shareHr my-2"/>
                <div className="shareBottom flex justify-between items-center">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Event className="shareIcon text-color4" onMouseOver={updateEvents} />
                        <span className="shareOptionText" onMouseOver={updateEvents}>Event</span>
                    </div>
                    <Select options={options} onChange={e => setEventId(e.value)} />
                    </div>
                    <button className="shareButton bg-color4 hover:bg-color4Hover text-white rounded px-4 py-2" onClick={addPost}>Share</button>
                </div>               
            </div>
        </div>

      )
}
