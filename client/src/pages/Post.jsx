import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router'

function Post() {
    let {id} = useParams();
      const [postObject, setPostObject] = useState([])
    useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data)
    })
    }, [])
  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='title'>{postObject.title}</div>
        <div className='postText'>{postObject.postText}</div>
        <div className='footer'>{postObject.username}</div>
      </div>
      <div className='rightSide'></div>
    </div>
  )
}

export default Post