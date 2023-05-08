import { useEffect, useState } from 'react'
import styles from '../Styles/Login.module.css'
import { authService } from '../firebase'
import MainContainer from './MainContainer'
import Auth from './Auth'


const Login = () => {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 추가

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
        // setUserObj(user)
      } else {
        setIsLoggedIn(false)
        // setUserObj(null)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {
        init ? (
          <MainContainer isLoggedIn={isLoggedIn} userObj={null} />
        ) : (
          'Loading...'
        )
      }
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <Auth />
        </div>
      </div>
    </>
  )
}

export default Login