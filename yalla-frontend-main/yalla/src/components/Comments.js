function Comments({ comments }) {
    return (
        <div className="m-2">
            {comments.map((comment) => (
                <div className="bg-gray-100 m-1 p-2 rounded-lg" key={comment}>
                    <div className="font-sm">{comment}</div>
                </div>
            ))}
        </div>
    )
}

export default Comments