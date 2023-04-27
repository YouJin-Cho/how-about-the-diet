import styles from '../Styles/Login.module.css'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.idPassword}>
          <div>
            <span>아이디</span>
            <input type='text'/>
          </div>
          <div>
            <span>비밀번호</span>
            <input type='text'/>
          </div>
          <button>로그인</button>
        </div>
        <div className={styles.snsLogin}>
          <span>소셜로그인</span>
          <FcGoogle className={styles.googleLogin}/>
          <span>or</span>
          <button>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Login