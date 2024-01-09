"use client"

import { unstable_noStore } from "next/cache";
import { useState, useEffect } from "react";
import { ColorRing } from 'react-loader-spinner';
import Post from "./Post";
const DISPLAY_URL = "/api/posts/display/";
const DELETE_URL = "/api/posts/delete/"

function UserPosts ( { 
  authorId, 
  userPosts, 
  getPosts, 
  setUserPosts, 
  setUpdate, 
  update, 
  setPostTitle, 
  setPostContent,
  setPostId } ) {
  unstable_noStore();

  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);


  const handleDelete = async (id) => {
    const res = await fetch(`${DELETE_URL}${id}`, {
      method: "DELETE",
    })
    if(!res.ok) {
      console.log("res not ok")
      alert((await res.json()).message)
      return
    }
    getPosts(DISPLAY_URL, authorId)
      .then((posts) => {
        setUserPosts(posts);
      });
  }

  const handleEdit = (title, content, id) => {
    setPostTitle(title);
    setPostContent(content);
    setPostId(id);
    setUpdate(!update);
  }


  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="text-3xl">Posts</h1>
      {isLoading ?
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#ffffff']}
        /> 
        :
        userPosts.length !==0 ? userPosts.map((post) => {
          return (
            <div key={post.id}>
              <Post post={post} />
              <div>
              <button className="border border-red-500 text-red-500 rounded p-2 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(post.id)}>Delete</button>
              <button className="border border-blue-500 text-blue-500 rounded p-2 hover:bg-blue-500 hover:text-white" onClick={() => handleEdit(post.title, post.content, post.id)}>Edit</button>
              </div>
            </div>
          )
        })
        :
        <p>No posts</p>}
    </div>
  )
}

export default UserPosts