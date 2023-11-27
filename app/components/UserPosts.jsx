"use client"

import { useState, useEffect } from "react"

function UserPosts ( { authorId } ) {

  const [ posts, setPosts ] = useState([])
  console.log(authorId, "authorId")

  useEffect(() => {
    async function getPosts() {
      
      const res = await fetch(`/api/posts/display/${authorId}`, {
        method: "GET",
      })

      const resPosts  = await res.json()
      const userPosts = resPosts.posts
      console.log(userPosts, "userPosts")

      setPosts(userPosts)
    }
    getPosts()
  }, [])

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default UserPosts