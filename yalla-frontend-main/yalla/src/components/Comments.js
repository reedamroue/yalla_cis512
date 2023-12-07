function Comments({ comments }) {
    return (
        <div className="m-2">
            {comments.map((comment) => (
            <div className="bg-gray-100 m-1 p-2 rounded-lg" key={comment} style={{ backgroundColor: '#f3f3f3', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontSize: 'small' }}>
                <div className="font-sm">{comment}</div>
            </div>

            ))}
        </div>
    )
}

export default Comments