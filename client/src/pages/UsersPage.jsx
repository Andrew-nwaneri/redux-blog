import React from 'react'
import { useSelector } from 'react-redux'
import { allUsers } from '../features/users/usersSlice';
import { Link } from 'react-router-dom';

const UsersPage = () => {
    const users = useSelector(allUsers);

    const usersList = <ul>{users.map(user => <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>)}</ul>
  return (
    <div>{usersList}</div>
  )
}

export default UsersPage;