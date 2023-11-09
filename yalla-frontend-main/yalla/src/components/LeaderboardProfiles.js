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
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.img} alt="" />
            
                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>    
                                <span>{value.location}</span>
                            </div>                
                        </div>
                        <div className="item">
                            <span className="score">{value.score}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>

        
    )
}