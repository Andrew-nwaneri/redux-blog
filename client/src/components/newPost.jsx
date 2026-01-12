import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import { useNavigate } from "react-router-dom";
import './compStyle.css'


const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const users = useSelector((state) => state.usersManager.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reqStatus, setRequestStatus] = useState('idle');


    const canSubmit = [body, title, userId].every(Boolean) && reqStatus === "idle";

    const handleSubmit = () => {
        try{
            setRequestStatus("loading")
            dispatch(addPost({title, body, userId})).unwrap();
            setBody('');
            setTitle('');
            navigate('/');
        }catch(err){
            console.log(err.message);
        }finally{
            setRequestStatus('idle')
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
        Post
      </button>
    </form>
  </div>
</div>

  )
}

export default NewPost;