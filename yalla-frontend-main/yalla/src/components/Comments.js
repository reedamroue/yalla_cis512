import reeda_yalla_pic from '../assets/reeda_yalla_pic.jpg';
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
                        <img src={reeda_yalla_pic} alt="Profile" style={profilePicStyle} />
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