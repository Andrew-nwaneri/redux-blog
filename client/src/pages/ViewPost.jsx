import { findPost, deletePost } from '../features/posts/postSlice'
import Author from '../components/authors'
import Reactions from '../components/reactions'
import TimeAgo from '../components/timeAgo'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const ViewPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const post = useSelector((state) => findPost(state, Number(postId)));


    const handleDelete = () => {
        dispatch(deletePost(postId)).unwrap();
        navigate('/');
    }

    if (!post) {
    return <p>Post not found or still loading...</p>
    }



  return (
<div className="view-post">
  <h2 className="view-title">{post.title}</h2>

  <p className="view-body">{post.body}</p>

  <div className="view-meta">
    <span className="view-author">
      <Author userID={post.userId} />
    </span>
    <span className="view-date">
      <TimeAgo date={post.date} />
    </span>
  </div>



  <div className="view-actions">

    <button className="delete-button" onClick={handleDelete}>🗑️ Delete</button>
 
    <Link className="edit-link" to={`/post/edit/${postId}`}>
      ✏️ Edit Post
    </Link>
    
  </div>

  <div className="view-reactions">
    <Reactions post={post} />
  </div>


</div>

  )
}

export default ViewPost;