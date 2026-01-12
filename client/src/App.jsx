import { Route, Routes } from 'react-router-dom'
import './App.css'
import NewPost from './components/newPost'
import PostsList from './components/postsList'
import EditPost from './pages/EditPost'
import ViewPost from './pages/ViewPost'
import Layout from './components/Layout'
import UsersPage from './pages/UsersPage'
import UserPosts from './pages/UserPosts'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />
        
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":postId" element={<ViewPost />} />
          <Route path="edit/:postId" element={<EditPost />} />
        </Route>
        
        <Route path='user'>
          <Route index element={<UsersPage />} />
          <Route path=':userId' element={<UserPosts />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
