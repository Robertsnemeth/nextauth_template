"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
const DISPLAY_URL = "/api/posts/display/";

const PostForm = ({ authorId, getPosts, setUserPosts, setAddPost, addPost }) => {

const [ title, setTitle ] = useState("")
const [ content, setContent ] = useState("")
const [ error, setError ] = useState(false)
const [ loading, setLoading ] = useState(false)

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  const postData = {
    title,
    content,
    authorId,
    }
  console.log(postData, "postData")
  try {
    const res = await fetch("/api/posts/create", {
      method: "POST",
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
    setTitle("");
    setContent("");
    setAddPost(!addPost);
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
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1, duration: 0.5 }}
      exit={{ y: -300, opacity: 0 }}
      key={{ authorId}}
      onSubmit={handleSubmit} className="flex flex-col gap-2 items-center w-[500px]">
        {error && <p className="text-red-500">error!!!</p>}
        <div className="flex flex-col gap-2 items-start w-full">
          <label htmlFor="title">Title</label>
          <Input className="text-black" onChange={handleTitle} type="text" name="title" value={title} required/>
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <label htmlFor="content">Content</label>
          <Textarea className="text-black h-[250px]" onChange={handleContent} type="text" name="content" placeholder="Write your post here..." value={content} required/>
        </div>
        <Button >{loading ? "...loading" : "Add Post"}</Button>
    </motion.form>
  )
}

export default PostForm