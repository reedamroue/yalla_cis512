import "../assets/Chat.css"
//import './App1.css';
import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import Message from "./Message"
import Select from "react-select"
import { confirmAlert } from "react-confirm-alert"
import {Button} from "react-bootstrap";

//import OnlineUsers from './OnlineUsers.js'
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemButton from '@mui/material/ListItemButton';
//import ListItemText from '@mui/material/ListItemText';

const socket = io.connect("http://localhost:3010")
function Chat({usern}) {
    const [showChat, setShowChat] = useState(false)
    const username = usern;
    const [isOnline, setIsOnline] = useState(false)
    const [invites, addInvite] = useState([])
    const [receiver, setReceiver] = useState([])
    const [userDisconnected, SetUserDisconnected] = useState(false)
    const [room, setRoom] = useState("")
    const [connectedUsers, setConnectedUsers] = useState([])
    //const [allRooms, changeRooms] = useState([]);
    const [selectedValue, setSelectedValue] = useState([])
    const [selectedValueNames, setSelectedValueNames] = useState([])
    const joinRoom = () => {
        if (username != "") {
            //setShowChat(true)
            //socket.emit("join_room", "main")
            setIsOnline(true)
            socket.emit("joining msg", username)
        }
    }

    function generateString(length) {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result = " "
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }

        return result
    }

    //gets called to get selected values from the selector widget
    const handleChange = (e) => {
        const temp_ids = Array.isArray(e) ? e.map((x) => x.soc_id) : []
        const temp_names = Array.isArray(e) ? e.map((x) => x.user) : []
        //console.log(temp_names)
        setSelectedValue(temp_ids)
        setSelectedValueNames(temp_names)
    }

    const sendInvite = (receiver_ids, receiver_names, sender_name, sender_id, onlineUsers) => {
        const room_name = generateString(6)
        const invite = {
            inviter: sender_name,
            inviter_id: sender_id,
            room: room_name,
            people: receiver_names,
        }
        socket.emit("send_invite", invite, receiver_ids, sender_id, onlineUsers)
    }
    //initiazes the room if it doesnt exist between users and emits necessary sockets for room join
    const sendGroupData = (users, username, soc_id, onlineUsers) => {
        if (users.length != 0) {
            //console.log(users)
            setReceiver(users)

            const all_ids = [...users]
            const all_usernames = []
            all_ids.push(soc_id)
            all_ids.forEach((id_n) => all_usernames.push(onlineUsers.filter((obj) => obj.soc_id == id_n)[0].user))
            all_usernames.sort()
            //console.log(all_usernames)
            const temp = all_usernames.join(",")
            //console.log(temp)
            //const temp = generateString(6)
            setRoom(temp)
            setShowChat(true)
            socket.emit("show receiver", temp, users, username, soc_id, onlineUsers)
            //add function here to check if room exists for these usernames and if it does get that room id and pass it in instead of currnt temp = room
            all_ids.forEach((id) =>
                socket.emit("subscribe", temp, onlineUsers.filter((obj) => obj.soc_id == id)[0].user)
            )
            //socket.emit("get_messages", temp, username)
        }
    }

    const setReceiverParameters = (user, sender, send_soc, onlineUsers) => {
        //setShowChat(true)
        //console.log(user)
        //console.log(typeof(user))
        //socket.emit("join_room", "main")
        const temp = generateString(6)
        setReceiver([user])
        setRoom(temp)
        //console.log(socket.id)
        //console.log(onlineUsers)
        socket.emit("subscribe", temp, onlineUsers.filter((obj) => obj.soc_id == socket.id)[0].user)
        setShowChat(true)
        socket.emit("show receiver", temp, [user], sender, send_soc, onlineUsers)
    }
    //var people;
    /*useEffect(() => {
    socket.on("server message", (data) =>{
        people = JSON.parse(data);
        console.log(people)
        console.log(data);
        setConnectedUsers({})
        setConnectedUsers(people)
    })
  }, [socket])*/
    useEffect(() => {
        console.log("waiting for socket all users")
        socket.on("allUsers", (data) => {
            console.log("received all users", data)
            setConnectedUsers(data)
        })
    }, [socket])

    //socket for sending invite to user and adding it to invite state
    useEffect(() => {
        socket.on("invite sent", (invites, sender_id, onlineUsers) => {
            //console.log(data)
            addInvite([])
            addInvite(invites)
            //console.log(invites)
        })
    }, [socket])

    //socket that runs when user goes home and sets showChat to false
    useEffect(() => {
        socket.on("go_home", (user, room, onlineUsers) => {
            //console.log(user)
            //console.log(onlineUsers)
            setConnectedUsers(onlineUsers)
            setShowChat(false)
        })
    }, [socket])

    //sets the users in the chat room
    useEffect(() => {
        socket.on("updated_users", (onlineUsers) => {
            //console.log(connectedUsers)
            //setConnectedUsers([])
            setConnectedUsers(onlineUsers)
            //console.log(connectedUsers)
        })
    }, [socket])

    //emits when the chat invite has been declined, this is a notification
    useEffect(() => {
        socket.on("dont chat response", (onlineUsers) => {
            const confirmDia = () => {
                confirmAlert({
                    title: "Chat Declined",
                    message: "Your Chat Invite was Declined!",
                    buttons: [
                        {
                            label: "Okay",
                            onClick: () => {},
                        },
                    ],
                })
            }
            confirmDia()
            //console.log(connectedUsers)
            //setConnectedUsers([])
        })
    }, [socket])

    //emits when we send a chat invite to a user, this is a notification
    useEffect(() => {
        socket.on("receiver on", (data, sender, send_soc, onlineUsers) => {
            const mem = sender + " wants to talk!"
            //console.log(data)
            const confirmDia = () => {
                confirmAlert({
                    title: "Chat Invite",
                    message: mem,
                    buttons: [
                        {
                            label: "Sure!",
                            onClick: () => {
                                setShowChat(true)
                                setRoom(data)
                                //console.log(socket.id)
                                //console.log(onlineUsers)
                                socket.emit("clear chat", socket.id)
                                socket.emit(
                                    "subscribe",
                                    data,
                                    onlineUsers.filter((obj) => obj.soc_id == socket.id)[0].user
                                )
                                socket.emit(
                                    "invite_join",
                                    send_soc,
                                    onlineUsers,
                                    onlineUsers.filter((obj) => obj.soc_id == socket.id)[0].user
                                )
                            },
                        },
                        {
                            label: "Not now",
                            onClick: () => {
                                socket.emit("go_back_home", send_soc, data, onlineUsers)
                                socket.emit("doesnt want to chat", send_soc, onlineUsers)
                            },
                        },
                    ],
                })
            }
            confirmDia()
            //if (window.confirm(mem)) {
            /*setShowChat(true)
      setRoom(data);
      console.log(socket.id)
      console.log(onlineUsers)
      socket.emit('subscribe', data, (onlineUsers.filter(obj => obj.soc_id == socket.id))[0].user)*/
            /*else {
      socket.emit("go_back_home", send_soc, data, onlineUsers)
    }*/
        })
    }, [socket])

    let shown
    if (!showChat) {
        shown = (
            <div className="flex-center" >
                <h1 className="text" style={{fontWeight: 'bold'}}>Chat Room</h1>
                <div className="flex-line space-x-4">
                    <div>
                        You are <span className="text-green-500">{username}</span>
                    </div>
                    {!isOnline ? (
                <Button onClick={joinRoom} style={{ backgroundColor: '#EA3EF7' }}>Go Online!</Button>
                ) : (
                <Button disabled style={{ backgroundColor: '#EA3EF7' }}>Already online</Button>
                )}

                </div>
                <h3>Users Online:</h3>
                <ul>
                    {Object.keys(connectedUsers /*.filter(obj => obj.user !== username)*/).map((key, value) => {
                        //console.log(connectedUsers)
                        //if (key != username) {
                        //console.log(key)
                        return (
                            <li>
                                <h4>{connectedUsers[key].user}</h4>
                            </li>
                        )
                        //}
                    })}
                </ul>
                <h3>Create Chat</h3>
                <div>
                    <div>
                        <Select
                            className="dropdown"
                            placeholder="Select Option"
                            getOptionLabel={(option) => option.user}
                            getOptionValue={(option) => option.soc_id}
                            value={connectedUsers.filter((obj) => selectedValue.includes(obj.soc_id))} // set selected values
                            options={connectedUsers.filter((obj) => obj.user !== username)} // set list of the data
                            onChange={handleChange} // assign onChange function
                            isMulti
                            isClearable
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                sendGroupData(selectedValue, username, socket.id, connectedUsers)
                            }}
                            style={{backgroundColor: '#EA3EF7', marginTop: '5px' }}
                        >
                            Send Invite!
                        </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        //console.log(connectedUsers)
        shown = <Message socket={socket} username={username} room={room} onlineUsers={connectedUsers} />
    }
    return <div className="App">{shown}</div>
}

export default Chat
