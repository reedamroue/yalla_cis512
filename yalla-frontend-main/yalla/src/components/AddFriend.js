import { React, useState, useEffect} from 'react'
import {Group} from '@material-ui/icons'
import {Button} from "react-bootstrap";
import Select from 'react-select';
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

export default function AddFriend({currUser}) {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    //const [people, setPeople] = useState([])
    //const [ngos, setNGOs] = useState([])
    const [friend, setFriend] = useState('')
    const [allThem, setAllThem] = useState([])
    const [isNGO, setIsNGO] = useState(false)

    function updatePeople() {
        async function refresh_people() {
            fetch(SERVER_URL + "/getTotalRepUsers")
                .then((res) => res.json())
                .then((res) => {
                    if (res && res.data.length !== 0) {
                        //setPeople(res.data)
                        const output = []
                        res.data.forEach((item) => {
                            if (item[0]._id != currUser) {
                                output.push({ label: item[0]._id, value: item[0]._id })
                            }
                        })
                        setAllThem(output)
                    }
                })
        }
        async function refresh_NGOs() {
            fetch(SERVER_URL + "/getTotalRepNgos")
                .then((res) => res.json())
                .then((res) => {
                    if (res && res.data.length !== 0) {
                        //setPeople(res.data)
                        const output = []
                        res.data.forEach((item) => {
                            if (item[0]._id != currUser) {
                                output.push({ label: item[0]._id, value: item[0]._id })
                            }
                        })
                        setAllThem(output)
                    }
                })
        }
        if (isNGO) {
            refresh_NGOs()
        } else {
            refresh_people()
        }
    }

    async function isNGOorUser() {
        await fetch(SERVER_URL + "/getuser/" + currUser)
        .then((res) => res.json())
        .then((res) => {
            if (res.data.length != 0) {
              setIsNGO(false)
            } else {
                  fetch(SERVER_URL + "/getngo/" + currUser)
                  .then((res) => res.json())
                  .then((res) => {
                      if (res.data) {
                          setIsNGO(true)
                      }
                  })
            }
        })
    }

    function addFriend() {
        console.log(currUser)
        console.log(friend)
        let result = fetch(SERVER_URL + "/addfriend", {
            headers: {
              "Content-type": "application/json",
          },
            method: "PUT",
            body: JSON.stringify({
                username: currUser,
                friend: friend,
            }),
        })
        .then(res => res.json())
        .then(data => console.log(data))
        const confirmDia = () => {
            confirmAlert({
                title: "New Friend!",
                message: friend + " is your new friend!",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => {},
                    },
                ],
            })
        }
        confirmDia()
        return result
    }

    useEffect(() => {
        isNGOorUser()
    }, [])
  return (
    <div>
        <div>
            <Group htmlColor="blue"
            onMouseOver={updatePeople}/>
            <span className="shareOptionText"
            onMouseOver={updatePeople}>Add Friend</span>
            <Select options={allThem} 
            onChange={e => setFriend(e.value)}
            onMouseOver={updatePeople}/>
        </div>
        <Button variant="primary" className="shareButton"
        onClick={addFriend}
        onMouseOver={updatePeople}>Add!</Button>
    </div>
  )
}
