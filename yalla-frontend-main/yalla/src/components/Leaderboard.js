import React, { useState, useEffect} from 'react'
import LeaderboardProfiles from './LeaderboardProfiles';
import '../assets/Leaderboard.css';
import {Button} from "react-bootstrap";


export default function Leaderboard() {
    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    const [ngos, setNgos] = useState([])
    const [users, setUsers] = useState([])

    const [leaders, setLeaders] = useState([])

    useEffect(() => {
        async function refresh_NGO() {
          await fetch(SERVER_URL + "/getTotalRepNgos")
              .then((res) => res.json())
              .then((res) => {
                  if (res && res.data.length !== 0) {
                    setNgos(res.data)
                  }
              })
      }
        refresh_NGO()
    }, [])

    useEffect(() => {
        async function refresh_User() {
          await fetch(SERVER_URL + "/getTotalRepUsers")
              .then((res) => res.json())
              .then((res) => {
                  if (res && res.data.length !== 0) {
                    setUsers(res.data)
                  }
              })
      }
        refresh_User()
    }, [])

  const handleClickNGO = (e) => {
    const output = []
    ngos.forEach((item) => {
        output.push({ name: item[0]._id, score: item[0].events.length, 
            img: "https://us.123rf.com/450wm/backwoodsicon/backwoodsicon2008/backwoodsicon200800034/156821062-ngo-organization-black-glyph-icon-non-profit-community-pictogram-for-web-page-mobile-app-promo-.jpg?ver=6",
            location: item[0].location})
    })
    setLeaders(output)
  }

  const handleClickUser = (e) => {
    const output = []
    users.forEach((item) => {
        output.push({ name: item[0]._id, score: item[0].events.length, 
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            location: item[0].interests})
    })
    setLeaders(output)
  }

  return (
    <div className="board" style={{ paddingTop: '70px' }}>
        <h1 className='text-center my-4 font-bold'>Leaderboard</h1>

        <div className="flex gap-4 justify-center">
            {/* <Button onClick={handleClickNGO} data-id='7'>NGO</Button> */}
            <button className="bg-color4 hover:bg-color4Hover rounded-[50px] border-none text-white py-2 px-8" onClick={handleClickUser} data-id='30'>Global</button>
            <button className="bg-color4 hover:bg-color4Hover rounded-[50px] border-none text-white py-2 px-8" onClick={handleClickUser} data-id='30'>Friends</button>
        </div>

        <LeaderboardProfiles Leaderboard={leaders}></LeaderboardProfiles>

    </div>
  )
}