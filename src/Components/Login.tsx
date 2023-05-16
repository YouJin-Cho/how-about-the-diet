import styles from '../Styles/Login.module.css'
import Auth from './Auth'

const Login = () => {

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <Auth />
        </div>
      </div>
    </>
  )
}

export default Login