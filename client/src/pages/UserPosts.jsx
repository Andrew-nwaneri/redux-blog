import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { findByUserId } from '../features/posts/postSlice';
import { userById } from '../features/users/usersSlice';
import { useSelector } from 'react-redux';

const UserPosts = () => {
    const { userId } = useParams();
    const posts = useSelector(state => findByUserId(state, Number(userId)));
    console.log(userId)
    const userName = useSelector(state => userById(state, Number(userId)))

    if(!posts){
       return <div>Could not find posts for user with ID: {userId}.</div>
    }

    const postsList = <ol>{posts?.map( post => <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li> )}</ol>
    
    
  return (

    <div>
        <h1>{userName.name}</h1>
        {postsList}
    </div>
  )
}

export default UserPosts;