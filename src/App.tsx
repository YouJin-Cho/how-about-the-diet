import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header, { ScrollToTop } from './Common/Header'
import MainContainer from './Components/MainContainer'
import { useEffect, useState } from 'react'
import { authService } from './firebase'
import Login from './Components/Login'
import styles from './Styles/MainContaier.module.css'
import Footer from './Common/Footer'
import Theme from './Common/Theme'

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
      <Theme>
        <Header isLoggedIn={isLoggedIn}/>
        <ScrollToTop />
        {
          init && !isLoggedIn ? ( 
            <Login /> 
          ) : ( 
            <div className={styles.MainContaier}>
              <MainContainer isLoggedIn={isLoggedIn} userObj={null} />
            </div>
          )
        }
        <Footer />
      </Theme>
    </BrowserRouter>
  )
}

export default App
