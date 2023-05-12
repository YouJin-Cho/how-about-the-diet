import { FormEvent, useState } from 'react'
import styles from '../Styles/Login.module.css'
import { authService } from '../firebase'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import SocialLogin from './SocialLogin'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [newAccount, setNewAccount] = useState(true)

  const navigate = useNavigate()

  // email & password 작성
  const onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    if (name === 'displayName') {
      setDisplayName(value)
    } else if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  // email & password 전송
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      let data
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
        await data.user?.updateProfile({
          displayName: displayName
        })
        authService.signOut()
        navigate('/login')
        alert('식단어때에 회원가입 되셨습니다. 로그인 해주세요 :)')
        return
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
        alert('식단어때에 로그인 되었습니다.')
        setNewAccount(false)
        navigate('/')
      }
    } catch (error) {
      const authError = error as firebase.auth.Error
      if (authError.code === 'auth/email-already-in-use') {
        alert('이미 가입된 이메일입니다.')
      } else if (authError.code === 'auth/weak-password') {
        alert('비밀번호는 6자리 이상 입력해주세요.')
      } else if (authError.code === 'auth/wrong-password') {
        alert('비밀번호를 잘못 입력하였습니다. 다시 입력해주세요.')
      } else if (authError.code === 'auth/user-not-found') {
        alert('해당 이메일은 가입되어 있지 않습니다.')
      }
      console.log(error)
    }
  }

  // 버튼 변경(로그인 & 회원가입)
  const toggleAccount = () => {
    setNewAccount((prev) => !prev)
  }

  return (
    <>
    <button onClick={toggleAccount}>{newAccount ? '계정이 있다면? Click후, 로그인' : '계정이 없다면? Click후, 회원가입'}</button>
    <div>
      <form className={styles.idPassword} onSubmit={onSubmit}>
      {newAccount && (
        <div>
          <span>닉네임</span>
          <input type='text' name='displayName' value={displayName} onChange={onChanged} placeholder='name' required/>
        </div>
      )}
        <div>
          <span>이메일</span>
          <input type='email' name='email' value={email} onChange={onChanged} placeholder='Email' required/>
        </div>
        <div>
          <span>비밀번호</span>
          <input type='password' name='password' value={password} onChange={onChanged} placeholder='Password' required/>
        </div>
        <input type='submit' value={newAccount ? '회원가입' : '로그인'} />
      </form>
    </div>
    <SocialLogin />
    </>
  )
}

export default Auth