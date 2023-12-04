import React, { useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import "../assets/Chat.css"

function Message({ socket, username, room, onlineUsers }) {
    const [users, updateUsers] = useState([])
    const [rooms, changeRooms] = useState([])
    //console.log(room)
    //console.log(allRooms)
    //if (allRooms.length !== 0) {
    //    updateUsers(JSON.stringify((allRooms.filter(obj => obj.room === room))[0].participants, null, 2))
    //}
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    //function to send message to user and defines states of message
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                timestamp: Date.now(),
            }
            await socket.emit("send", messageData, onlineUsers)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    //gets called when user leaves room to trigger disconnection event
    const disconnectUser = () => {
        //pass in list of messages when user disconnects
        socket.emit("leave_room", room, onlineUsers, onlineUsers.filter((obj) => obj.user == username)[0].soc_id)
    }

    useEffect(() => {
        if (users.length > 0) {
           /* fetch(SERVER_URL + "/chat/getMessages?room_id=" + users.sort().join(","), {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => setMessageList(res))*/
        }
    }, [users])

    //gets called when we want to append a message to message list after socket trigger
    useEffect(() => {
        socket.on("receive_message", (data, onlineUsers) => {
            setMessageList((list) => [...list, data])
            //console.log(data)
        })
    }, [socket])

    //gets called when chat needs to be cleared
    useEffect(() => {
        socket.on("now_clear_chat", (id) => {
            //console.log('clearing chat')
            setMessageList([])
        })
    })

    //gets called when messages need to be loaded from database
    useEffect(() => {
        socket.on("load_messages", (list_m) => {
            console.log("loading messages", list_m)
            setMessageList(list_m)
        })
    })

    //gets called when user disconnects from room and notification is sent to other users
    useEffect(() => {
        socket.on("now_send_leave", (users, user_who_left) => {
            const mem = user_who_left + " disconnected from server!"
            //console.log('send_leaving')
            const confirmDia = () => {
                confirmAlert({
                    title: "Your Friend Disconnected",
                    message: mem,
                    buttons: [
                        {
                            label: "Okay",
                            onClick: () => {},
                        },
                    ],
                })
            }
            confirmDia()
        })
    })

    //sends notification when user joins chat
    useEffect(() => {
        socket.on("show_joined_alert", (send_soc, user_joined) => {
            const mem = user_joined + " joined the chat!"
            const confirmDia = () => {
                confirmAlert({
                    title: "Joined Chat",
                    message: mem,
                    buttons: [
                        {
                            label: "Yay!",
                            onClick: () => {},
                        },
                    ],
                })
            }
            confirmDia()
        })
    })

    //KEEP TRACK OF EVERY ROOM WITH EVERY USER AND IF USER DISCONNECTS SEND ALERT TO EVERYONE IN INDEX.js

    /*useEffect(() => {
        socket.on("disconnect", (data, onlineUsers) =>{
            socket.emit('leave_room', room, onlineUsers)
        })
    }, [socket])*/

    //sends notification to update rooms with new users when room is made
    useEffect(() => {
        socket.on("updateRooms", (data, people) => {
            //console.log(data)
            /*var temp = data
          if (data.filter(obj => obj.room === room).length != 0) {
            temp = data.filter(obj => obj.room === room)[0].participants
          }
          console.log(temp)*/
            //temp = temp.map(function(e){
            //  return JSON.stringify(e);
            //});
            //temp = temp.join(",");
            if (people != null) {
                updateUsers(people.split(","))
            }
            //console.log(data)
            changeRooms([])
            changeRooms(data)
            //add the uploaded messages to the list of messages
        })
    })

    //used for sending notification of which user left the chat
    useEffect(() => {
        socket.on("user_who_left", (user, soc, onlineUsers) => {
            const mess = "---- " + user + " left the room----"
            const messageData = {
                room: room,
                username: user,
                message: mess,
                timestamp: Date.now(),
            }
            //console.log(mess)
            setMessageList((list) => [...list, messageData])
            // console.log("old users are", users)
            // console.log(
            //     "new users are",
            //     users
            //         .split(",")
            //         .filter((name) => name != user)
            //         .sort()
            //         .join(",")
            // )
            updateUsers(users.filter((name) => name !== user))
            //console.log(messageList)
            //alert(mess)
            //console.log(soc + "SOC")
            //console.log("GOING HOME SERVER")
            //console.log(onlineUsers)
            socket.emit("go_back_home", soc, room, onlineUsers)
        })
    }, [socket])
    return (
    <div className="chat-window">
    <div className="chat-header">
    <button
                    //cssModule={AwesomeButtonStyles}
                    type="button" 
                    class="btn btn-danger"
                    onClick={() => {
                        console.log("disconnecting")
                        disconnectUser()
                    }}
                >
                    &#9587;
                </button>
        <p>Live Chat</p>
    </div>
    <ScrollToBottom className="chat-body">
        {messageList.map((content, index) => (
            <div
                key={index}
                className={`message ${username === content.username ? "sent" : "received"}`}
            >
                <div className="message-content">
                    <p>{content.message}</p>
                </div>
                <div className="message-meta text-right text-xs text-gray-500">
                    <p>{new Date(content.timestamp).toLocaleTimeString() + '   '}</p>
                    <p>{content.username}</p>
                </div>
            </div>
        ))}
    </ScrollToBottom>
    <div className="chat-footer">
        <input
            type="text"
            placeholder="Hey..."
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
            ►
        </button>
    </div>
    <div className="chat-members">
        <h4>Chat Members:</h4>
        <div>
            {users.map((user, index) => (
                <div key={index}>{user}</div>
            ))}
        </div>
    </div>
</div>

        // <div className="chat-window">
        //     <div>
        //         <button
        //             //cssModule={AwesomeButtonStyles}
        //             type="button" 
        //             class="btn btn-danger"
        //             onClick={() => {
        //                 console.log("disconnecting")
        //                 disconnectUser()
        //             }}
        //         >
        //             &#9587;
        //         </button>
        //     </div>
        //     <div className="chat-header">
        //         <p>Live Chat</p>
        //     </div>
        //     <div className="chat-body">
        //         <ScrollToBottom className="w-full h-full overflow-y-auto overflow-x-hidden">
        //             {messageList.map((content) => {
        //                 // console.log(username)
        //                 return (
        //                     <div
        //                         className="message"
        //                         id={username === content.username ? "other" : "you"}
        //                     >
        //                         <div
        //                             className="message-content"
        //                         >
        //                             <p>{content.message}</p>
        //                         </div>
        //                         <div className="message-meta">
        //                             <p className="text-xs text-gray-500">
        //                                 {new Date(content.timestamp).toLocaleTimeString() + "\n"}
        //                             </p>
        //                             <p className="text-xs text-gray-500">{content.username}</p>
        //                         </div>
        //                     </div>
        //                 )
        //             })}
        //         </ScrollToBottom>
        //     </div>
        //     <div className="chat-footer">
        //         <div className="flex-grow">
        //             <input
        //                 type="text"
        //                 placeholder="Hey..."
        //                 value={currentMessage}
        //                 onChange={(event) => {
        //                     setCurrentMessage(event.target.value)
        //                 }}
        //                 onEnter={sendMessage}
        //             />
        //         </div>
        //         <button className="w-12" onClick={sendMessage}>
        //             &#9658;
        //         </button>
        //     </div>
        //     <div>
        //         <h4>Chat Members:</h4>
        //         <div>
        //             <h4>
        //                 {users.map((user) => (
        //                     <div>{user}</div>
        //                 ))}
        //             </h4>
        //         </div>
        //     </div>
        // </div>
    )
}
export default Message
