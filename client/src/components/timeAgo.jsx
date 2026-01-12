import { parseISO, formatDistanceToNow } from "date-fns";

import React from 'react'

const TimeAgo = ({date}) => {
    const postDate = parseISO(date);
    const timePast = formatDistanceToNow(postDate)
  return (
    <span>
        <small><i>{ timePast } ago</i></small>
    </span>
  )
}

export default TimeAgo;