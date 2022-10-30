import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//navigate to login when logout
const UpdateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  if (!user) {
    return(
        <>
        update
        </>
    )
  }
  return children
}

export default UpdateRoute