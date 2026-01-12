import React from 'react'
import TimeAgo from "./timeAgo";
import Reactions from "./reactions";
import Author from "./authors";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findPost } from '../features/posts/postSlice';

const PostExducer = ({postId}) => {
    // const posts = useSelector(allPosts)
    const post = useSelector(state => findPost(state, postId))

  return (
<div className="post-card">
  <h2 className="post-title">{post.title}</h2>

  <p className="post-body">
    {post.body.substring(0, 100)}...
  </p>

  <div className="post-meta">
    <Link className="post-link" to={`post/${post.id}`}>
      View Post
    </Link>

    <span className="post-author">
      <Author userID={post.userId} />
    </span>

    <span className="post-time">
      <TimeAgo date={post.date} />
    </span>
  </div>

  <div className="post-reactions">
    <Reactions post={post} />
  </div>
</div>

  )
}

export default PostExducer;