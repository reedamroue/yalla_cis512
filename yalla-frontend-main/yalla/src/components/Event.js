import { React, useState} from 'react';
import '../assets/Event.css';
import {LocationOn, DateRange, AccessTime} from '@material-ui/icons'
import {Button} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

export default function Event({event_id, username, name, date, location, start_time, description, volunteer_req, going}) {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    const [amgoing, setGoing] = useState(going);

    function toggleGoing() {
        if (amgoing) {
            fetch(SERVER_URL + "/leaveevent", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    eventid: event_id,
                }),
            })
            const confirmDia = () => {
                confirmAlert({
                    title: "Unregistered from Event :(",
                    message: "You just unregistered from the event: " + name,
                    buttons: [
                        {
                            label: "Sad",
                            onClick: () => {},
                        },
                    ],
                })
            }
            confirmDia()
        } else {
            fetch(SERVER_URL + "/joinevent", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    eventid: event_id,
                }),
            })
            confirmAlert({
                title: "Registered for Event :)",
                message: "You just registered for the event: " + name,
                buttons: [
                    {
                        label: "Yay!",
                        onClick: () => {},
                    },
                ],
            })
        }
        setGoing(!amgoing);
      }
  return  (
    <div className="event">
      <div className="eventWrapper" style={{ position: 'relative' }}>
        <div className="eventTop">
          <h2>{name}</h2>
        </div>
        <div className="component-wrapper">
            <div className="date-event-picture">
                <DateRange htmlColor="blue"/>
            </div> 
            <div className="date-event">
                <h5>{date}</h5>
            </div>     
        </div> 

        <div className="component-wrapper">
            <div className="date-event-picture">
                <AccessTime htmlColor="orange"/>
            </div> 
            <div className="date-event">
                <h5>{start_time}</h5>
            </div>  
            <div className="more-info-button">
                {/* <Button className= { amgoing ? "btn btn-success" : "btn btn-primary"} onClick={toggleGoing}>{amgoing ? "Registered" : "Register"}</Button> */}
                <Button 
                    className={`btn ${amgoing ? "btn-success" : "btn-custom-purple"} rounded-circle`} 
                    onClick={toggleGoing}
                    style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    width: '50px',
                    height: '50px',
                    padding: 0,
                    lineHeight: '50px'
                    }}
                >
        {amgoing ? "✓" : "+"}
      </Button>

            </div>     
        </div> 

        <div className="component-wrapper">
            <div className="date-event-picture">
                <LocationOn htmlColor='red'/>
            </div> 
            <div className="date-event">
                <h5>{location}</h5>
            </div>     
        </div> 
        <h5 className='descrip-title' style={{ fontWeight: 'bold', color: '#00C8F8'}}>Description</h5>
        <h5 className='description'>{description}</h5>
        <div className="component-wrappeer">
            <h5 className='descrip-title' style={{ fontWeight: 'bold', color: '#00C8F8'}}>Volunteer Requirements</h5>
            <h5 className='description'>{volunteer_req}</h5>
        </div>
    </div>
</div>
  )
}

/*<div className="shareBottom">
<div className="shareOptions">
    <Event htmlColor="blue" className="shareIcon"/>
    <span className="shareOptionText">Event</span>
</div>
<div className="shareOptions">
    <PermMedia htmlColor="tomato" className="shareIcon"/>
    <input className="shareOptionText" type="file" onChange={onImageChange} />
</div>
<div className="shareOptions">
    <Room htmlColor="green" className="shareIcon"/>
    <span className="shareOptionText">Location</span>
</div>
<Button variant="primary" className="shareButton">Share</Button>
</div>  */