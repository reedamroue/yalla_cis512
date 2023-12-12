import Comments from "./Comments"
import { useState, useEffect} from "react"
import Input from "./Input"
import {Button} from "react-bootstrap";
import LikeButton from "./LikeButton"
import '../assets/Post.css';
import '../assets/Profile.css';
import Event from "./Event"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import reeda_yalla_pic from '../assets/reeda_yalla_pic.jpg'
//import { SERVER_URL } from "../config"
//import { Link } from "react-router-dom"

function Postr({numberLikes, timestamp, message, username, comments_list, usersWhoLiked, post_id, event_id, curr_user}) {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    const [event, setEvent] = useState({})
    /*function getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(";").shift()
    }*/
    //const myUserId = getCookie("username")

    let formatTimestamp = (timestamp) => {
        let millis = Date.now() - timestamp
        if (millis < 1000 * 60) {
            return Math.floor(millis / 1000) + " seconds ago"
        } else if (millis < 1000 * 60 * 60) {
            return Math.floor(millis / (1000 * 60)) + " minutes ago"
        } else if (millis < 1000 * 60 * 60 * 24) {
            return Math.floor(millis / (1000 * 60 * 60)) + " hours ago"
        } else {
            return Math.floor(millis / (1000 * 60 * 60 * 24)) + " days ago"
        }
    }
    const [newComment, setNewComment] = useState("")
    function checkIfLiked() {
        var count = 0
        usersWhoLiked.forEach((item) => {
            if (item.username == curr_user) {
                count += 1
            }
        })
        if (count == 0) {
            return false
        } else {
            return true
        }
    }
    const [isLiked, setIsLiked] = useState(checkIfLiked)
    const [numLikes, setNumLikes] = useState(numberLikes)
    function getComments(comments) {
        const output = [];
        var user = ''
        var message = ''
        comments.forEach((comment) => {
            user = comment.user.username
            message = comment.message.message
            output.push(`${user}: ${message}`)
        })
        return output
    }
    const [comments, setComments] = useState(getComments(comments_list))

    let likeClicked = () => {
        if (!isLiked) {
            setIsLiked(true)
            setNumLikes(numLikes + 1)
            fetch(SERVER_URL + "/likepost", {
                headers: {
                    "Content-type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    username: curr_user,
                    postid: post_id,
                }),
            })
        } else {
            confirmAlert({
                title: "You already liked this post!",
                message: "There are many other posts to like :)",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => {},
                    },
                ],
            })
        }
    }

    async function refresh_event() {
        if (event_id != '') {
            await fetch(SERVER_URL + "/getevent/" + event_id)
            .then((res) => res.json())
            .then((res) => {
                if (res && res.data.length !== 0) {
                    setEvent(res.data)
                }
            })
        }
    }
    useEffect(() => {
        refresh_event()
      }, [])

    let postComment = (message) => {
        fetch(SERVER_URL + "/addcomment", {
            headers: {
                "Content-type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                message: message,
                username: curr_user,
                postid: post_id,
            }),
        })
            .then((res) => res.json())
            .then(
                (res) => {
                    setComments([...comments, `${curr_user}: ${message}`])
                },
                (err) => {
                    console.log("error posting comment!")
                }
            )
            setComments([...comments, `${curr_user}: ${message}`])
    }
    /*{event_id != '' ? 
            
    <Event name={post[0].name} date={post[0].date} location={post[0].address + ', ' + post[0].city + ', ' + post[0].state + ', ' + post[0].zipcode} 
          start_time={post[0].starttime}
          description={post[0].description} 
          volunteer_req={post[0].requirements}
          username={username}
          event_id={post[0]._id}
          going={post[0].attendees.includes(username)}/> : 
          <div></div>}*/

    return (
        <div className="post max-w-100 w-full p-4 bg-white rounded-xl">
<div className="shareTop flex items-center space-x-2">
    {username && username.length > 0 && (
        <img className="shareProfileImg rounded-full"
        src={
            username === 'Reeda' ? reeda_yalla_pic :
            username !== 'Grace' ? "https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ=":
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
        } alt="" />
    )}

    <div className="flex flex-col justify-center" style={{ gap: '0.25rem' }}> {/* Adjust the gap here */}
        <h2 className="descrip-title" style={{ marginBottom: '0rem' }}>{username}</h2> {/* Reduce bottom margin */}
        <div className="font-light text-sm" style={{ marginTop: '-2px' }}>{formatTimestamp(timestamp)}</div> {/* Reduce top margin */}
    </div>
</div>

            <div style={{ marginTop: '20px'}}><h2>{message}</h2></div>
            {event[0] != null ? 
            <Event name={event[0].name} date={event[0].date} location={event[0].address + ', ' + event[0].city + ', ' + event[0].state + ', ' + event[0].zipcode} 
                  start_time={event[0].starttime}
                  description={event[0].description} 
                  volunteer_req={event[0].requirements}
                  username={curr_user}
                  event_id={event[0]._id}
                  going={event[0].attendees.includes(curr_user)}/> : 
                  <div></div>}
            {
                comments.length > 0 &&
                <div style={{ marginTop: '20px', marginBottom: '-10px'}}>
                    <div><h6>Comments</h6></div>
                    <hr style={{ marginTop: '-1px' }}/>
                </div>
            }
            <Comments comments={comments}></Comments>
            <div className="flex-line" style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                    placeholder="Comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></Input>
                <button className="bg-color4 py-2 px-3 border-none outline-none rounded-md hover:bg-color4Hover text-white"
                    onClick={() => {
                        if (newComment == "") {
                            const confirmDia = () => {
                                confirmAlert({
                                    title: "No Text!",
                                    message: "Please add text to your comment!",
                                    buttons: [
                                        {
                                            label: "Okay",
                                            onClick: () => {},
                                        },
                                    ],
                                })
                            }
                            confirmDia()
                        } else {
                            postComment(newComment)
                            setNewComment("")
                        }
                    }}
                >
                    {">"}
                </button>
            </div>
            <div className="flex-line space-x-4 " style={{ marginTop: '5px' }}>
                <LikeButton onClick={() => likeClicked()} disabled={isLiked}></LikeButton>
                <div>{numLikes} people liked this.</div>
            </div>
        </div>
    )
}

export default Postr