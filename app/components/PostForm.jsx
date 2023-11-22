"use client"

import { useState } from "react"

const PostForm = ({ authorId }) => {

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
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res, "res")

    setLoading(false);
    if (!res.ok) {
      console.log("res not ok")
      alert((await res.json()).message);
      return;
    }
    setTitle("");
    setContent("")
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
      <button className='border border-white text-white rounded w-full h-12 hover:bg-white hover:text-black hover:border-black:'>{loading ? "...loading" : "Add Post"}</button>
    </form>
  )
}

export default PostForm