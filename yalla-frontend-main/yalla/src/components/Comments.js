import reeda_yalla_pic from '../assets/reeda_yalla_pic.jpg';
import vikram_yalla_pic from '../assets/vikram_yalla_pic.jpg';
import ali_yalla_pic from '../assets/ali_yalla_pic.jpg';
function Comments({ comments }) {
    const containerStyle = {
        maxHeight: '150px',
        overflowY: 'auto',
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%', 
    };

    const commentStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '12px',
        padding: '8px',
        fontSize: 'small',
    };

    const profilePicStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    };

    const nameStyle = {
        fontWeight: 'bold',
        display: 'block',
    };

    const textStyle = {
        display: 'block',
    };

    return (
        <div style={containerStyle}>
            {comments.map((comment, index) => {
                const [name, text] = comment.split(': ');
                return (
                    <div key={index} style={commentStyle}>
                        <img    src={
                                name === 'Reeda' ? reeda_yalla_pic :
                                name === 'Vikram' ? vikram_yalla_pic :
                                name === 'Ali' ? ali_yalla_pic :
                                name === 'Grace' ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" :
                                "https://media.istockphoto.com/photos/volunteers-standing-hands-picture-id1303107115?b=1&k=20&m=1303107115&s=170667a&w=0&h=Qy0CzAqe8H_wDTiE7-r6jMqfvNdt_HzK1Z9HDLETRrQ="
                            }  alt="Profile" style={profilePicStyle} />
                        <div>
                            <span style={nameStyle}>{name}</span>
                            <span style={textStyle}>{text}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}






export default Comments