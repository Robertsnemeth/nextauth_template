import React from 'react'

const Post = ( {post}) => {
    return (
    <section className="flex flex-col gap-2 items-start w-[500px] border border-white p-2">
        <div className=" flex gap-2">
            <label>Title:</label>
            <h2>{post.title}</h2>
        </div>
        <div className="flex flex-col gap-2">
            <label>Content:</label>
            <p>{post.content}</p>
        </div>
    </section>  
    )
}

export default Post