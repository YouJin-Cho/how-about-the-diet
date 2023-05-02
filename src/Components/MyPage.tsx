import { Link, Navigate, useNavigate } from 'react-router-dom'
import styles from '../Styles/MyPage.module.css'
import { authService } from '../firebase'

const MyPage = () => {
  const navigate = useNavigate()

  const onLogOutClick = () => {
    authService.signOut()
    navigate('/login')
  }

  return (
    <div className={styles.myPageContainer}>
      <button onClick={onLogOutClick}>로그아웃</button>
    </div>
  )
}

export default MyPage