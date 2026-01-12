import { useSelector } from "react-redux";

import React from 'react'

const Author = ({userID}) => {
    const users = useSelector((state) => state.usersManager.users);
    const id = userID || 0;
    const postedBy = users.find(user => user.id === id);

  return (
    <span>
        <small><i>Author: {postedBy? postedBy.name : "Unknown"}</i></small>
    </span>
  )
}

export default Author;