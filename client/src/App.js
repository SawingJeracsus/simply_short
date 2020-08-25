import React from 'react'
import 'materialize-css'
import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes'
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenicated = !!token;
  const routes = useRoutes(isAuthenicated)
  if(!ready){
    return (
      <Loader />
    )
  }

  return (
    <AuthContext.Provider value = {{
      token, login, logout, userId, isAuthenicated
    }}>
      <Router>
      {isAuthenicated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
    
    
  )
}

export default App
