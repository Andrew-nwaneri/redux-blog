import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './compStyle.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to="/"><span className='logo'>Redux-Blog</span></Link>
        <div className='navs'>
            <div><NavLink to='/'>Home</NavLink></div>
            <div><NavLink to='/post'>Post</NavLink></div>
            <div><NavLink to='/user'>Users</NavLink></div>
        </div>
    </div>
  )
}

export default Navbar;