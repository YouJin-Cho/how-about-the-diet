import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header, { ScrollToTop } from './Components/Header'
import Footer from './Components/Footer'
import MainContainer from './Components/MainContainer'
import { useEffect, useState } from 'react'
import { authService } from './firebase'
import Login from './Components/Login'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn}/>
      <ScrollToTop />
      {
        init && !isLoggedIn ? ( 
          <Login /> 
        ) : ( 
          <>
            <MainContainer isLoggedIn={isLoggedIn} userObj={null} />
          </>
        )
      }
      <Footer />
    </BrowserRouter>
  )
}

export default App
