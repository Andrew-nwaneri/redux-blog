import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { fetchPosts } from './features/posts/postSlice.js'
import { fetchUsers } from './features/users/usersSlice.js'

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

createRoot(document.getElementById('root')).render(
    < Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </Router>  
    </Provider>,
)
