"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
const UPDATE_URL = "/api/posts/update/";
const DISPLAY_URL = "/api/posts/display/";

const PostUpdateForm = ({ 
    authorId, 
    getPosts, 
    setUserPosts, 
    postTitle, 
    postContent,
    postId,
    setUpdate,
    update}) => {

const [ title, setTitle ] = useState(postTitle)
const [ content, setContent ] = useState(postContent)
const [ error, setError ] = useState(false)
const [ loading, setLoading ] = useState(false)

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  const postData = {
    title,
    content,
    }
  console.log(postData, "postData")
  try {
    const res = await fetch(`${UPDATE_URL}${postId}`, {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.body, "res")

    setLoading(false);
    if (!res.ok) {
      console.log("res not ok")
      alert((await res.json()).message);
      return;
    }
    setUpdate(!update);
    getPosts(DISPLAY_URL, authorId)
      .then((posts) => {
        setUserPosts(posts);
      });
  } catch (error) {
    setLoading(false);
    setError(true)
    console.log(error, "error");
    alert(error.message);
  }
};

const handleTitle = (e) => {
  console.log(title);
  setTitle(e.target.value)
};

const handleContent = (e) => {
  console.log(content);
  setContent(e.target.value)
};

  return (
    <motion.form 
    initial={{ y: -300, opacity: 0 }}
    animate={{ y: 0, opacity: 1, duration: 0.5 }}
    exit={{ y: 300, opacity: 0 }}
      onSubmit={handleSubmit} className="flex flex-col gap-2 items-center w-full ">
        {error && <p className="text-red-500">error!!!</p>}
        <div className="flex flex-col gap-2 items-center w-full">
          <label htmlFor="title">Title</label>
          <Input className="text-black w-[500px] focus:ring-1" onChange={handleTitle} type="text" name="title" value={title} required/>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <label htmlFor="content">Content</label>
          <Textarea className="text-black w-[500px] h-[250px] focus:ring" onChange={handleContent} type="text" name="content" placeholder="Write your post here..." value={content} required/>
        </div>
        <Button >{loading ? "...loading" : "Submit"}</Button>
        <Button size="icon" variant='destructive' onClick={() => setUpdate(!update)}>X</Button>
    </motion.form>
  )
}

export default PostUpdateForm