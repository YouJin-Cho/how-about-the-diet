import { FormEvent, useContext, useState } from 'react'
import styles from '../Styles/Profile.module.css'
import { userObjProps } from '../Service/type'
import { FaUserAlt } from 'react-icons/fa'
import { ThemeContext } from '../Common/Theme'
import { useNavigate } from 'react-router-dom'
import { authService } from '../firebase'

const Profile = ({ userObj }: userObjProps) => {

  const [newDisplayName, setNewDisplayName] = useState(userObj?.displayName || '')
  const [displayNameUpdate, setdisplayNameUpdate] = useState(false)
  const navigate = useNavigate()


  // displayName 작성
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setNewDisplayName(value)
  }

  // displayName 업로드
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setdisplayNameUpdate(true)
    if(userObj?.displayName !== newDisplayName) {
      await userObj?.updateProfile({
        displayName: newDisplayName
      })
      setdisplayNameUpdate(false)
    }
  }

  // 로그아웃
  const onLogOutClick = () => {
    const logOut =  confirm('로그아웃 하시겠습니까? 🫠') 
    if (logOut) {
      authService.signOut()
      navigate('/')
    } else {
    }
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const borderStyle = {
    border: isDarkMode ? '2px solid rgb(1, 135, 71)' : '2px solid #01c466',
  }

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.logOutBtn}>
        <button className="btn btn-accent" onClick={onLogOutClick} style={backgroundStyle}>로그아웃</button>
      </div>
      <p className={styles.profileP} style={backgroundStyle}>식단어때 프로필</p>
      <div className={styles.profileBox} style={borderStyle}>
        <div className={styles.profileImg} style={backgroundStyle}>
          <FaUserAlt className={styles.fa}/>
        </div>
        <div className={styles.profileDisplayname}>
          <p>닉네임 : </p>
          <p>{userObj?.displayName}</p>
        </div>
        <form onSubmit={onSubmit}>
          <input type='text' onChange={onChange} className={styles.change} placeholder='닉네임' value={newDisplayName} style={borderStyle}/>
          <input type='submit' value='변경' className={styles.submitBtn} disabled={displayNameUpdate} style={backgroundStyle}/>
        </form>
      </div>
    </div>
  )
}

export default Profile