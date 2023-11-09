import { React} from 'react';
import '../assets/Home.css';
import Sidebar from './Sidebar';
import Feed from './Feed';

function Home({username}) {
    return (
        <div className="homeContainer">
            <Sidebar username={username}/>
            <Feed username={username}/>
        </div>
    )
}

export default Home;