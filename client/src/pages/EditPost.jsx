import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import '../components/compStyle.css';
import { deletePost, editPost, findPost } from "../features/posts/postSlice";

const EditPost = () => {  
    const { postId } = useParams();
    const post = useSelector((state) => findPost(state, Number(postId)));


    const [title, setTitle] = useState(post?.title || "");
    const [body, setBody] = useState(post?.body || "");
    const [userId, setUserId] = useState(post?.userId || "");
    const users = useSelector((state) => state.usersManager.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reqStatus, setReqStatus] = useState('idle');
    const canSubmit = [body, title, userId].every(Boolean) && reqStatus === "idle";

    if(!post){
        <div>No post found</div>
    }

        const handleDelete = () => {
        try{
            setReqStatus('loading');
            dispatch(deletePost(postId)).unwrap();
            setBody('');
            setTitle('');
            setUserId('');
            navigate("/");
        }catch(err){
            console.log(err.message);
        }finally{
            setReqStatus('idle')
        }

    }

    const handleSubmit = () => {
        try{
            setReqStatus('loading');
            dispatch(editPost({body, title, userId, id:post.id})).unwrap();
            setBody('');
            setTitle('');
            setUserId('');
            navigate(`/post/${post.id}`);
        }catch(err){
            console.log(err.message);
        }finally{
            setReqStatus('idle')
        }

    }

  return (
<div className="new-post-page">
  <div className="preview">
    <h2>{title}</h2>
    <span>{body}</span>
  </div>

  <div className="form-container">
    <form className="form" action={handleSubmit}>
      <input
        name="title"
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
      />

      <label className="author" htmlFor="postAuthor">
        Author:
        <select
          value={userId}
          id="postAuthor"
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value="">Choose an Author</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <input
        name="content"
        value={body}
        type="text"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post Content..."
      />

      <button
        className="submit-btn"
        type="submit"
        value="submit"
        disabled={!canSubmit}
      >
        Edit
      </button>

        <button
        className="delete-btn"
        type="delete"
        value="delete"
        onClick={handleDelete}
        disabled={!canSubmit}
         >
        Delete
      </button>
    </form>
  </div>
</div>

)}

export default EditPost;