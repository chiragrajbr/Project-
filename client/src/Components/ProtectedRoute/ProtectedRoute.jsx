import React from 'react'
import {Outlet,Navigate} from "react-router-dom"

function ProtectedRoute() {
  return (
    localStorage.getItem("token")?<Outlet/>:<Navigate to={"/login"}/>
  )
}

export default ProtectedRoute
