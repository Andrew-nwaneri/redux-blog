import { useSelector, } from "react-redux";
import React from 'react';
// import { parseISO } from "date-fns";
import { allPostsIDs, postErrors, postStatus, } from "../features/posts/postSlice";
import PostExducer from "./postExducer";

const PostsList = () => {
    // const posts = useSelector(allPosts)
    const postIds = useSelector(allPostsIDs)
    const errors = useSelector(postErrors)
    const status = useSelector(postStatus);

    // useEffect(() => {
    //     if (status === 'idle') {
    //         console.log("Fetching posts...")
    //         dispatch(fetchPosts());
    //     }
    // }, [status, dispatch])

    // useEffect(() => {
    //         console.log("Fetching users...")
    //         dispatch(fetchUsers());
    //     })
    
    let content;
    if(status === "failed"){
        console.log(errors);
        content = <div>{errors}</div>
    }else if(status === "loading"){
        content = <p>Loading...</p>
    }else if(status === "succeeded"){
        console.log(status)
        // const orderedPosts = posts.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));
        content = postIds.map(
                    (postId) => <PostExducer key={postId} postId={postId} />    
                )
    }
    
   

  return (
        <div className="postlist">
            { content }
        </div>
  )
}

export default PostsList;