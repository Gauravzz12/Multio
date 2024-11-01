import React from 'react'
import { selectCurrentUser } from '../features/auth/authSlice'
import {  useSelector } from 'react-redux';

function Profile() {
  const user=useSelector(selectCurrentUser)
  return (
    <div>
      <h1 className='text-white text-6xl' >Welcome {user} </h1>
      </div>
  )
}

export default Profile
