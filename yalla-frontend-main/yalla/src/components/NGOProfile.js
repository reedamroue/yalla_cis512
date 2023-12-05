import { useState, useEffect} from 'react'
import '../assets/Login.css';
import ProfileSub from './ProfileSub';
import '../assets/Profile.css';

const NGOProfile = ({username}) => {

    //const SERVER_URL = "https://phlame-back.herokuapp.com"
    const SERVER_URL = "http://localhost:5001"
    const [currUser, setUser] = useState(null)
    const [isNGO, setIsNGO] = useState(false)

    useEffect(() => {
        async function refresh_Profile() {
          await fetch(SERVER_URL + "/getuser/" + username)
              .then((res) => res.json())
              .then((res) => {
                  if (res.data.length !== 0) {
                    setUser(res.data[0])
                    setIsNGO(false)
                  } else {
                        fetch(SERVER_URL + "/getngo/" + username)
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.data) {
                                setUser(res.data[0])
                                setIsNGO(true)
                            }
                        })
                  }
              })
      }
        refresh_Profile()
    })

    return (
        <div  style={{ paddingTop: '70px' }}>
            <div style={{
                display: "flex",
                margin: "15px 15px"
            }}>
                <div>
                    <img className="rounded-circle" alt="" style={{width:"250px",height:"250px",borderRadius:"80px"}}
                    src={currUser == null ? "" : isNGO ? "https://us.123rf.com/450wm/backwoodsicon/backwoodsicon2008/backwoodsicon200800034/156821062-ngo-organization-black-glyph-icon-non-profit-community-pictogram-for-web-page-mobile-app-promo-.jpg?ver=6" : 
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"}
                    />
                </div>
                <div style={{
                margin: "15px 15px"
            }}>
                    <h1>{currUser == null ? "" : isNGO ? currUser._id : currUser._id}</h1>
                    <h4 className="descrip-title-phone">{isNGO ? "Phone Number:" : "Age:"}</h4>
                    <h4>{currUser == null ? "" : isNGO ? currUser.contact : currUser.age}</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width: "108%", margin: "20px 0px"}}>
                        <h3>{currUser == null ? "" : currUser.events.length + " Events"}</h3>
                        <h3>{currUser == null ? "" : currUser.friends == null ? "0 friends" : currUser.friends.length + " friends"}</h3>
                    </div>
                </div>
            </div>
            <ProfileSub currUser={currUser} isNgo={isNGO}/>
        </div>
    )
}

export default NGOProfile