import React from 'react'
import { store } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = (props: any) => {
  const auth = store.getState().loginReducer.success
  return auth ? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoutes