import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/App.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CalendarPage({currUser, isNgo}) {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    /*const events = [
        {
            title: "Beach Cleanup",
            allDay: true,
            start: new Date(2022, 3, 1),
            end: new Date(2022, 3, 1),
        },
        {
            title: "Soup Kitchen",
            start: new Date(2022, 3, 7),
            end: new Date(2022, 3, 10),
        },
        {
            title: "St. Jude's Philanthropy",
            start: new Date(2022, 3, 20),
            end: new Date(2022, 3, 23),
        },
        {
            title: "West Philly School tutoring",
            start: new Date(2022, 3, 10),
            end: new Date(2022, 3, 11),
        }
    ];*/
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        if (!isNgo) {
            async function get_Events() {
                await fetch(SERVER_URL + "/getEventsPerUser/" + currUser._id)
                    .then((res) => res.json())
                    .then((res) => {
                        const output = []
                        if (res.data.length !== 0) {
                          res.data.forEach((item) => {
                            output.push({ title: item[0].name, start: new Date(item[0].date), end: new Date(item[0].date)})
                          })
                          setAllEvents(output)
                        } 
                    })
            }
            get_Events()
        } 
    })

    return (
        <div className="CalendarPage">
            <h1 className='profile-sub-header' style={{ color: '#00C8F8'}}>Upcoming Events</h1>
            {!isNgo ?
            <Calendar 
            selectable
            localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end" 
            style={{ height: 500, margin: "50px" }}
             /> : <div>Go add events for users to show up!</div>}
        </div>
    );
}

export default CalendarPage;
