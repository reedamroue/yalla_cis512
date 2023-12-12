import React from 'react'

import reeda_yalla_pic from '../assets/reeda_yalla_pic.jpg';
import vikram_yalla_pic from '../assets/vikram_yalla_pic.jpg';
import ali_yalla_pic from '../assets/ali_yalla_pic.jpg';

export default function LeaderboardProfiles({ Leaderboard }) {

    function compare_score( a, b ) {
        if (a.score < b.score){
            return 1;
        }
        if (a.score > b.score){
            return -1;
        }
            return 0;
  }

  Leaderboard.sort(compare_score);
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}


function Item(data) {
    return (

        <>
    {
      data.map((value, index) => (
        <div className="flex" key={index} style={{ alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
          <div className="item" style={{ background: 'white', padding: '15px 25px', borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'space-between', width: '100%' }}>
            <img src={
                                value.name === 'Reeda' ? reeda_yalla_pic :
                                value.name === 'Vikram' ? vikram_yalla_pic :
                                value.name === 'Ali' ? ali_yalla_pic :
                                value.name === 'Grace' ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" :
                                "https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ="
                            }  alt="" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />

            <div className="info" style={{ flex: 1 }}>
              <h3 className='name text-dark' style={{ margin: '0', fontWeight: 'bold' }}>{value.name}</h3>
              <span style={{ color: 'gray' }}>{value.location}</span>
            </div>

            <span className="text-5xl text-color4 font-bold">{value.score}</span>
          </div>
        </div>
      ))
    }
        </>

        
    )
}