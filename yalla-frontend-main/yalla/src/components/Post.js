import React from 'react'
import '../assets/Post.css';
import {MoreVert, Favorite, ThumbUp} from '@material-ui/icons'
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Post() {
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src="https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ=" alt=""/>
                    <span className="postUsername">Helen</span>
                    <span className="postDate">5 mins ago</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">The event last week was super fun!!</span>
                <img className="postImg" src="https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ=" alt=""/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <Favorite className="likeIcon" htmlColor="red"/>
                    <ThumbUp className="likeIcon" htmlColor="blue"/>
                    <span className="postLikeCounter">6 people liked this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">3 Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
