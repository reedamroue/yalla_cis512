import { React, useState, useEffect} from 'react';
import '../assets/Sidebar.css';
import AddFriend from './AddFriend'

import {RssFeed, Assessment, Settings, DynamicFeed} from "@material-ui/icons"

function Sidebar({username}) {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    const [friends, setFriends] = useState([])
    const [isNGO, setIsNGO] = useState(true)

    function isNGOorUser() {
        fetch(SERVER_URL + "/getuser/" + username)
        .then((res) => res.json())
        .then((res) => {
            if (res.data.length !== 0) {
              setIsNGO(false)
              fetch(SERVER_URL + "/getfriendsofuser/" + username)
              .then((res) => res.json())
              .then((res) => {
                  if (res.data.length !== 0) {
                      setFriends(res.data)
                  } 
              })
            } else {
                  fetch(SERVER_URL + "/getngo/" + username)
                  .then((res) => res.json())
                  .then((res) => {
                      if (res.data) {
                          setIsNGO(true)
                      }
                  })
            }
        })
    }

    useEffect(() => {
        isNGOorUser()
        //setInterval(() => isNGOorUser(), 60000);
    })
    return (
        <div className="sidebar" >
            <div className="sidebarWrapper"></div>
            <ul className="sidebarList" style={{ marginTop: '-20px' }}>
                <li className="sidebarListItem" key="1">
                    <RssFeed htmlColor="purple" className="sidebarIcon"/>
                    <span className="sidebarListItemText">Feed</span>
                </li>
                <li className="sidebarListItem" key="2">
                    <DynamicFeed htmlColor="gold" className="sidebarIcon"/>
                    <span className="sidebarListItemText">My Posts</span>
                </li>
                <li className="sidebarListItem" key="3">
                    <Assessment htmlColor="red" className="sidebarIcon"/>
                    <span className="sidebarListItemText">Analytics</span>
                </li>
                <li className="sidebarListItem" key="4">
                    <Settings className="sidebarIcon"/>
                    <span className="sidebarListItemText">Settings</span>
                </li>
                <li>
                {!isNGO ? <AddFriend currUser={username}/> : <div></div>}
                </li>
            </ul>
            <h3 style={{ marginTop: '20px',  fontWeight: 'bold'}}>Friends</h3>
            <hr className="sidebarHr" style={{ marginTop: '-8px' }}/>
            <ul className="sidebarFriendList">
            {friends.map((friend) => (
                friend[0] != null ? 
                    (<li className="sidebarFriend" key={friend[0]._id}>
                    <img className="sidebarFriendImg" src="https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ=" alt="" />
                    <span className="sidebarFriendName">{friend[0]._id}</span>
                </li>) :
                (<li className="sidebarFriend" key={friend}>
                <img className="sidebarFriendImg" src="https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ=" alt="" />
                <span className="sidebarFriendName">{friend}</span>
            </li>)
                
            ))}
            {friends.length === 0 && <div>No friends :(</div>}
            </ul>
        </div>
    )
}

export default Sidebar;