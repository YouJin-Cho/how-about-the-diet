import { useContext } from 'react'
import styles from '../Styles/Login.module.css'
import Auth from './Auth'
import { ThemeContext } from '../Common/Theme'

const Login = () => {

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const themeStyle = {
    border: isDarkMode ? '3px solid rgb(1, 135, 71)' : '3px solid #01c466'
  }

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox} style={themeStyle}>
          <Auth />
        </div>
      </div>
    </>
  )
}

export default Login