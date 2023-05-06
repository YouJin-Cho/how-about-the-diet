import { useNavigate } from 'react-router-dom'
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
      <div className={styles.logOutBtn}>
        <button onClick={onLogOutClick}>로그아웃</button>
      </div>
      <div>
        <h3>찜리스트</h3>
      </div>
    </div>
  )
}

export default MyPage