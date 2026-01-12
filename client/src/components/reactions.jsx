import { useDispatch } from "react-redux";
import { addReaction } from "../features/posts/postSlice";

import React from 'react'

const Reactions = ({post}) => {
    const dispatch = useDispatch();
    const reactions = post.reactions;
    

  return (
<div className="reactions-bar">
  <button className="reaction-btn" onClick={() => dispatch(addReaction({ postId: post.id, reaction: "like" }))}>
    👍 <span>{reactions?.like}</span>
  </button>

  <button className="reaction-btn" onClick={() => dispatch(addReaction({ postId: post.id, reaction: "love" }))}>
    ❤️ <span>{reactions?.love}</span>
  </button>

  <button className="reaction-btn" onClick={() => dispatch(addReaction({ postId: post.id, reaction: "haha" }))}>
    😂 <span>{reactions?.haha}</span>
  </button>

  <button className="reaction-btn" onClick={() => dispatch(addReaction({ postId: post.id, reaction: "insightful" }))}>
    💡 <span>{reactions?.insightful}</span>
  </button>

  <button className="reaction-btn" onClick={() => dispatch(addReaction({ postId: post.id, reaction: "wow" }))}>
    😮 <span>{reactions?.wow}</span>
  </button>

  <button className="reaction-btn" onClick={() => dispatch(addReaction({ postId: post.id, reaction: "angry" }))}>
    😡 <span>{reactions?.angry}</span>
  </button>
</div>

  )
}

export default Reactions;