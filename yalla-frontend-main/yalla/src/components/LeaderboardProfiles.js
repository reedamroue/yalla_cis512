import React from 'react'

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
            <img src={value.img} alt="" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />

            <div className="info" style={{ flex: 1 }}>
              <h3 className='name text-dark' style={{ margin: '0', fontWeight: 'bold' }}>{value.name}</h3>
              <span style={{ color: 'gray' }}>{value.location}</span>
            </div>

            <span className="score" style={{ fontSize: '48px', color: 'red', fontWeight: 'bold' }}>{value.score}</span>
          </div>
        </div>
      ))
    }
        </>

        
    )
}