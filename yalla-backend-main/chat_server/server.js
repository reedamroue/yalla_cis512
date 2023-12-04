const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

//var db = require("./chat_db.js")

app.use(cors())
app.use(express.static("public"))
const PORT = process.env.PORT || 3010;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

  const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
    },
})
var name
const userids = []
const allRooms = []
const invites = []
var userLeft
var userLeftSoc
/*const sendConnectedUsers = async () => {
  await socket.emit('allUsers', userSocketIdMap);
}*/

//socket to establish inital connection between users on server
io.on("connection", (socket) => {
    console.log("socket connected!")
    socket.join("main")
    socket.on("joining msg", function (username) {
        console.log("received join msg")
        //userSocketIdMap[socket.id + ""] = username
        //name = username;
        const userData = {
            user: username,
            soc_id: socket.id,
        }
        //console.log(JSON.stringify(userSocketIdMap))
        console.log(userData)
        var found = false
        console.log(userids)
        userids.forEach(x => {
            if (userData.user == x.user) {
                x.soc_id = userData.soc_id;
                console.log("inside")
                found = true
            }
        })
        if (!found) {
            userids.push(userData)
        }
        socket.emit("allUsers", userids)
        socket.to("main").emit("allUsers", userids)
        //  io.emit('chat message', `${username} joined the chat!!`);
    })

    //socket that runs on disconnection event between users 
    socket.on("disconnect", function () {
        const usernames_to_send = []
        const userids1 = [...userids]
        const allRooms1 = [...allRooms]
        var sockets_to_send = []
        var person_who_left = ""
        if (userids1.filter((obj) => obj.soc_id === socket.id).length !== 0) {
            person_who_left = userids1.filter((obj) => obj.soc_id === socket.id)[0].user
        }
        allRooms1.forEach((elem) => {
            if (elem.participants.includes(person_who_left)) {
                elem.participants.forEach((user) => {
                    if (user !== person_who_left) {
                        usernames_to_send.push(user)
                    }
                })
            }
        })
        usernames_to_send.forEach((u) => {
            if (userids1.filter((obj) => obj.user == u).length !== 0) {
                sockets_to_send.push(userids1.filter((obj) => obj.user == u)[0].soc_id)
            }
        })

        io.to(sockets_to_send).emit("now_send_leave", sockets_to_send, person_who_left)

        /////////

        for (let x = 0; x < userids.length; x++) {
            //console.log(userids[x].soc_id)
            //console.log((socket.id))
            if (userids[x].soc_id === socket.id) {
                //console.log("INSIDE")
                userids.splice(x, 1)
            }
        }
        io.to("main").emit("updated_users", userids)
        var log_out_user_arr = userids.filter((obj) => obj.soc_id == socket.id)
        if (log_out_user_arr.length !== 0) {
            var log_out_user = log_out_user_arr[0].user
            allRooms.forEach((elem) => {
                if (elem.participants.includes(log_out_user)) {
                    const index = elem.participants.indexOf(log_out_user)
                    elem.participants.splice(index, 1)
                    if (elem.participants.length == 0) {
                        allRooms.filter((obj) => obj.room !== elem.room)
                    }
                }
            })
        }
        socket.emit("updateRooms", allRooms)
    })

    //socket that runs when a user leaves the room and emits another message to other friends
    socket.on("leave_room", (room, onlineUsers, user_id) => {
        //upload the room id with the messages to the database
        for (let x = 0; x < userids.length; x++) {

            if (userids[x].soc_id === user_id) {
                userLeft = userids[x].user
                userLeftSoc = userids[x].soc_id
            }
        }
        allRooms.forEach((elem) => {
            if (elem.room === room) {
                //console.log((userids.filter(obj => obj.soc_id == user_id))[0])
                const index = elem.participants.indexOf(userids.filter((obj) => obj.soc_id == user_id)[0].user)
                elem.participants.splice(index, 1)
                if (elem.participants.length == 0) {
                    //console.log("INSIDE FILTER")
                    allRooms.filter((obj) => obj.room !== elem.room)
                }
            }
        })

        socket.emit("updateRooms", allRooms)
        socket.leave(room)
        io.to(user_id).emit("go_home", user_id, room, onlineUsers)
        io.to(room).emit("user_who_left", userLeft, userLeftSoc, onlineUsers)
        //}
    })

    //socket that runs when user joins room
    socket.on("join_room", (id) => {
        socket.join(id)
        //console.log("joined room", id)
    })

    //socket that runs when user is sending invite to chat with another user
    socket.on("send_invite", (invite, receiver_ids, sender_id, onlineUsers) => {
        invites.push(invite)
        socket.to(receiver_ids).emit("invite sent", invites, onlineUsers)
    })

    //socket that runs when user accepts chat invite and we need chat to show up on screen
    socket.on("show receiver", (room, user, sender, send_soc, onlineUsers) => {
        socket.to(user).emit("receiver on", room, sender, send_soc, onlineUsers)
        //socket.join(room)
    })

    socket.on("chat message", function (msg) {
        socket.broadcast.emit("chat message", msg)
    })

    //socket that runs when user declines chat invite
    socket.on("doesnt want to chat", function (send_soc, onlineUsers) {
        socket.to(send_soc).emit("dont chat response", onlineUsers)
    })

    //clearing chat socket
    socket.on("clear chat", (id) => {
        //console.log('clearing chat')
        io.to(id).emit("now_clear_chat", id)
    })

    //socket for leave message that is sent to friends
    socket.on("send_leave_message", (users, user_who_left, onlineUsers) => {
        //console.log('clearing chat')
        io.to(users).emit("now_send_leave", users, user_who_left, onlineUsers)
    })

    socket.on("go_back_home", function (user, room, onlineUsers) {

        socket.to(user).emit("go_home", user, room, onlineUsers)
    })

    socket.on("get_messages", function (room, user) {
        console.log("socket says room is", room)
        /*db.getMessages(room, function (err, data) {
            if (err) {
                console.log("Error retrieving messages" + err)
            } else {
                console.log("This is the list of messages", data)
                socket.to(user).emit("load_messages", data)
            }
        })*/
    })

    //runs when user subscribes to room and sends info to database
    socket.on("subscribe", function (room, username) {

        /*db.checkExistingChat(username, room, function (err, data) {
            if (err) {
                console.log("Error checking for existing chats" + err)
            } else {
                //console.log(data)
                return data
            }
        })*/
        //console.log('joining room', room);
        socket.join(room)
        if (allRooms.filter((obj) => obj.room == room).length !== 0) {
            allRooms.forEach((elem) => {
                if (elem.room === room && !elem.participants.includes(username)) {
                    elem.participants.push(username)
                }
            })
        } else {
            const newRoom = {
                room: room,
                participants: [username],
            }
            allRooms.push(newRoom)
        }
        //console.log(allRooms)
        var temp = allRooms
        const str = "Participants: "
        if (temp.filter((obj) => obj.room === room).length != 0) {
            temp = temp.filter((obj) => obj.room === room)[0].participants
            temp = JSON.stringify(temp).replace(/]|[[]/g, "")
            temp = temp.replace(/['"]+/g, "")
            //console.log(temp)
        }
        //get the list of messages in particular room, convert them back to objects and push to updateRooms
        //db.getMessages()
        socket.emit("updateRooms", allRooms, temp)
    })

    socket.on("unsubscribe", function (room) {
        //console.log('leaving room', room);
        socket.leave(room)
    })

    //socket for sending message between users
    socket.on("send", function (data, onlineUsers) {
        //console.log('sending message');
        console.log("data is", data)
        /*db.addMessage(data.username, data.room, data.message, data.timestamp, function (err, data) {
            if (err) console.log("Error adding message" + err)
        })*/
        console.log(data)
        socket.to(data.room).emit("receive_message", data, onlineUsers)
        //io.sockets.in(data.room).emit('message', data);
    })

    socket.on("invite_join", function (send_soc, onlineUsers, user_joined) {
        socket.to(send_soc).emit("show_joined_alert", send_soc, user_joined)
        //io.sockets.in(data.room).emit('message', data);
    })
})
