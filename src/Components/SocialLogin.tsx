import { useNavigate } from 'react-router-dom'
import styles from '../Styles/Login.module.css'
import { authService, firebaseInstance } from '../firebase'  
import { FcGoogle } from 'react-icons/fc'
import { useContext } from 'react'
import { ThemeContext } from '../Common/Theme'

const SocialLogin = () => {

  const navigate = useNavigate()

  // 구글 로그인
  const onSocialClick = async () => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider()
    await authService.signInWithPopup(provider)
    navigate('/')
    alert('식단어때에 로그인 되셨습니다 ☺️')
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const themeStyle = {
    border: isDarkMode ? '3px solid rgb(1, 135, 71)' : '',
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  const colorStyle = {
    color: isDarkMode ? 'rgb(1, 135, 71)' : ''
  }

  return (
    <>
      <div className={styles.snsLogin}>
        <span style={colorStyle}>or</span>
        <span style={colorStyle}>소셜로그인</span>
        <FcGoogle name='google' className={styles.googleLogin} style={themeStyle} onClick={onSocialClick}/>
      </div>
    </>
  )
}

export default SocialLogin