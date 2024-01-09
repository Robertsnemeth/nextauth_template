"use client"

import { useState, useEffect } from 'react'
import PostForm from "../components/PostForm";
import UserPosts from "../components/UserPosts";
import PostUpdateForm from "../components/PostUpdateForm";
import { getPosts } from '../actions/getPosts'

const DISPLAY_URL = "/api/posts/display/";

const Profile = ({ user }) => {

    const [ userPosts, setUserPosts ] = useState([]);
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ id, setId ] = useState([]); 
    const [ update, setUpdate ] = useState(false);

    const userId = user.id;

    const getUserPosts = () => {
        getPosts(DISPLAY_URL, userId)
        .then((posts) => {
            setUserPosts(posts); 
        });
        }

    useEffect(() => {
        getUserPosts();
    }, []);

    return (
    <main className="flex min-h-screen flex-col gap-2 items-center w-screen p-10">
        <div className="flex flex-col w-full items-center gap-2">
            <div className="flex flex-col items-center w-[500px] border border-white p-2">
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <h2>{userId}</h2>
            </div>
            {update ? 
                <PostUpdateForm 
                    authorId={userId} 
                    getPosts={getPosts} 
                    setUserPosts={setUserPosts} 
                    postTitle={title} 
                    postContent={content}
                    postId={id}
                    setUpdate={setUpdate} 
                    update={update}/> 
                :             
                <UserPosts 
                    authorId={userId} 
                    userPosts={userPosts} 
                    getPosts={getPosts} 
                    setUserPosts={setUserPosts} 
                    setUpdate={setUpdate} 
                    update={update}
                    setPostTitle={setTitle}
                    setPostContent={setContent}
                    setPostId={setId}/>}
        </div>
        <PostForm authorId={userId} getPosts={getPosts} setUserPosts={setUserPosts}/>
    </main> 
    )
}

export default Profile