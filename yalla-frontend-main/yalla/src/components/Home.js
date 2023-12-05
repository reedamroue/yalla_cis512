import { React} from 'react';
import '../assets/Home.css';
import Sidebar from './Sidebar';
import Feed from './Feed';

function Home({username}) {
    return (
        <div className="homeContainer" style={{ paddingTop: '70px' }}>
            <Sidebar username={username}/>
            <Feed username={username}/>
        </div>
    )
}

export default Home;