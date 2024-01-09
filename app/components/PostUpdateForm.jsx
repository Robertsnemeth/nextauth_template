"use client"

import { useState } from "react";
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center w-full ">
      {error && <p className="text-red-500">error!!!</p>}
      <div className="flex flex-col gap-2 items-center w-full">
        <label htmlFor="title">Title</label>
        <input className="text-black w-[500px]" onChange={handleTitle} type="text" name="title" value={title} required/>
      </div>
      <div className="flex flex-col gap-2 items-center w-full">
        <label htmlFor="content">Content</label>
        <textarea className="text-black w-[500px] h-[250px]" onChange={handleContent} type="text" name="content" placeholder="Write your post here..." value={content} required/>
      </div>
      <button className=' w-1/4 border border-white text-white rounded h-12 hover:bg-white hover:text-black hover:border-black:'>{loading ? "...loading" : "Submit"}</button>
      <button className=' w-1/4 border border-white text-white rounded h-12 hover:bg-white hover:text-black hover:border-black:' onClick={() => setUpdate(!update)}>X</button>
    </form>
  )
}

export default PostUpdateForm