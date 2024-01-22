"use client"

import { unstable_noStore } from "next/cache";
import { useState, useEffect } from "react";
import { ColorRing } from 'react-loader-spinner';
import Post from "./Post";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
            <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, duration: 0.5 }}
            exit={{ y: 50, opacity: 0 }}
              key={post.id} className="flex flex-col gap-2">
              <Post post={post} />
              <div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => handleDelete(post.id)}>Delete</Button>
                <Button variant="ghost" onClick={() => handleEdit(post.title, post.content, post.id)}>Edit</Button>
              </div>
              </div>
            </motion.div>
          )
        })
        :
        <p>No posts</p>}
    </div>
  )
}

export default UserPosts