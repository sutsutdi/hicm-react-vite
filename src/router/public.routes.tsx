import React from 'react'
import { store } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = (props: any) => {
  const auth = store.getState().loginReducer.success
  return auth ? <Navigate to={"/main"}/> : <Outlet/>
}

export default PublicRoutes