import { React, useState, useEffect} from 'react'
import '../assets/Feed.css';
import Share from './Share';
import Postr from "./Postr"
//import { useNavigate } from "react-router-dom"

export default function Feed({username}) {
  //const SERVER_URL = "https://phlame-back.herokuapp.com"
  const SERVER_URL = "http://localhost:5001"
  //let navigate = useNavigate()
  const [posts, setPosts] = useState([])

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a[0].date);
    const dateB = new Date(b[0].date);
    return dateB - dateA;
  });
  //const posts = useRef([])
  //const postObjects = useRef([])
  /*async function addCom() {
    let i=0;
    for (i;i < posts.current.length;i++){
        console.log(posts.current[i])
        await fetch(SERVER_URL + "/getpost/" + posts.current[i])
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                console.log(res)
                postObjects.current.push(res.data[0])
            }
        })
    }
    /*posts.current.forEach(async (postid) => {
        console.log(postid)
        await fetch(SERVER_URL + "/getpost/" + postid)
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                postObjects.current.push(res.data[0])
            }
        })
    });*/
  //}
  function refresh() {
    fetch(SERVER_URL + "/getTotalRepPosts")
        .then((res) => res.json())
        .then((res) => {
            if (res && res.data.length !== 0) {
                setPosts(res.data)
            }
        })
}
  useEffect(() => {
    refresh()
    //setInterval(() => refresh(), 300000);
  })
  
  /*return (
    <div class="flex-center bg-gray-100 min-h-screen">
        <div class="w-96 max-w-100">
            {posts.map((post) => (
                <div class="my-4">
                    <Post data={post}></Post>
                </div>
            ))}
            {posts.length == 0 && <div>No posts to show!</div>}
        </div>
    </div>
  )*/
  //{numberLikes, timestamp, message, username, comments_list, usersWhoLiked, post_id}
  return (
    <div className="feed">
    <div className="feedWrapper">
      <Share username={username}/>
      {sortedPosts.map((post) => (
        <div className="my-4" key={post[0]._id}>
          <Postr numberLikes={post[0].likes.length} message={post[0].message == null ? post[0].newPost.message : post[0].message} 
          event_id={post[0].event == null ? "" : post[0].event}
          curr_user={username}
          timestamp={post[0].date}
          username={post[0].username}
          comments_list={post[0].comments}
          usersWhoLiked={post[0].likes}
          post_id={post[0]._id}
          myUserId="hello"/>
        </div>
      ))}
      {sortedPosts.length === 0 && <div>No posts to show!</div>}
    </div>
  </div>
  )
}
