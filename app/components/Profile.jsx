"use client"

import { useState, useEffect } from 'react'
import PostForm from "./Post/PostForm";
import UserPosts from "./Post/UserPosts";
import PostUpdateForm from "./Post/PostUpdateForm";
import { getPosts } from '../actions/getPosts'
import { Button } from '@/components/ui/button';

const DISPLAY_URL = "/api/posts/display/";

const Profile = ({ user }) => {

    const [ userPosts, setUserPosts ] = useState([]);
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ id, setId ] = useState([]); 
    const [ update, setUpdate ] = useState(false);
    const [ addPost, setAddPost ] = useState(false);

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
            <div className="flex flex-col items-center w-[500px] border border-primary rounded-[0.5rem] p-2 shadow-md shadow-gray-600">
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
        {!update && <Button onClick={() => setAddPost(!addPost)}>{addPost ? "-" : "+"}</Button>}
        {addPost && <PostForm className="animate-accordian-up animate-accordion-down" authorId={userId} getPosts={getPosts} setUserPosts={setUserPosts} setAddPost={setAddPost} addPost={addPost}/>}
    </main> 
    )
}

export default Profile