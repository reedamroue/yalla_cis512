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
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="Profile" style={profilePicStyle} />
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