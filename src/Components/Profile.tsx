import { FormEvent, useContext, useState } from 'react'
import styles from '../Styles/Profile.module.css'
import { userObjProps } from '../Service/type'
import { FaUserAlt } from 'react-icons/fa'
import { ThemeContext } from '../Common/Theme'
import { useNavigate } from 'react-router-dom'
import { authService } from '../firebase'
import firebase from 'firebase/compat/app'

const Profile = ({ userObj }: userObjProps) => {

  const [newDisplayName, setNewDisplayName] = useState(userObj?.displayName || '')
  const [displayNameUpdate, setdisplayNameUpdate] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  // displayName 작성
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    if(name === 'displayName') {
      setNewDisplayName(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  // displayName 업로드
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setdisplayNameUpdate(true)
    if(userObj?.displayName !== newDisplayName) {
      await userObj?.updateProfile({
        displayName: newDisplayName
      })
    }

    // password 업로드
    if(password !== '') {
      try {
        await authService.currentUser?.updatePassword(password)
        alert('비밀번호가 변경되었습니다.')
        setPassword('')
      } catch (error) {
        const authError = error as firebase.auth.Error
        if (authError.code === 'auth/weak-password') {
          alert('비밀번호는 6자리 이상 입력해주세요.')
        }
      }
    }

    setdisplayNameUpdate(false)
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
          <input type='text' name='displayName' onChange={onChange} className={styles.change} placeholder='닉네임' value={newDisplayName} style={borderStyle}/>
          <input type='submit' value='변경' className={styles.submitBtn} disabled={displayNameUpdate} style={backgroundStyle}/>
        </form>
        <div className={styles.profileDisplayname}>
          <p>비밀번호 변경</p>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <input type='password' name='password' placeholder='Password' onChange={onChange} value={password} required style={borderStyle} className={styles.change}/>
          </div>
          <input className={styles.submitBtn} type='submit' value='변경'/>
        </form>
      </div>
    </div>
  )
}

export default Profile