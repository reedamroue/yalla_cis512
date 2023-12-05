import { React, useState, useEffect} from 'react'
import Event from './Event'
import '../assets/Event.css';
import {Container} from "react-bootstrap";

export default function EventsPage({username}) {
  //const SERVER_URL = "https://phlame-back.herokuapp.com"
  const SERVER_URL = "http://localhost:5001"
    //read in events for user from database and display list of event components below
    const [events, setEvents] = useState([])
    useEffect(() => {
      async function refresh() {
        await fetch(SERVER_URL + "/getTotalRepEvents")
            .then((res) => res.json())
            .then((res) => {
                if (res && res.data.length !== 0) {
                  setEvents(res.data)
                }
            })
    }
      refresh()
  }, [])
  return (
    <div  style={{ paddingTop: '70px' }}>
        <Container>
            <h1 className="title">Upcoming Events</h1>
            <ul id="events"></ul>
        </Container>
        {events.map((post) => (
                <div className="my-4" key={post[0].name}>
                  <Event name={post[0].name} date={post[0].date} location={post[0].address + ', ' + post[0].city + ', ' + post[0].state + ', ' + post[0].zipcode} 
                  start_time={post[0].starttime}
                  description={post[0].description} 
                  volunteer_req={post[0].requirements}
                  username={username}
                  event_id={post[0]._id}
                  going={post[0].attendees.includes(username)}/>
                </div>
            ))}
          {events.length === 0 && <div>No posts to show!</div>}
    </div>
  )
}
