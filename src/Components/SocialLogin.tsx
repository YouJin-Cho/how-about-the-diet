import { useNavigate } from 'react-router-dom'
import styles from '../Styles/Login.module.css'
import { authService, firebaseInstance } from '../firebase'  
import { FcGoogle } from 'react-icons/fc'

const SocialLogin = () => {

  const navigate = useNavigate()

  // 구글 로그인
  const onSocialClick = async () => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider()
    await authService.signInWithPopup(provider)
    navigate('/')
    alert('식단어때에 로그인 되셨습니다 ☺️')
  }

  return (
    <>
      <div className={styles.snsLogin}>
        <span>or</span>
        <span>소셜로그인</span>
        <FcGoogle name='google' className={styles.googleLogin} onClick={onSocialClick}/>
      </div>
    </>
  )
}

export default SocialLogin