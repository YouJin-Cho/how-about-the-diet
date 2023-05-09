import { useNavigate } from 'react-router-dom'
import styles from '../Styles/MyPage.module.css'
import { authService, dbService } from '../firebase'
import { FormEvent, useEffect, useState } from 'react'
import { userObjProps } from '../Service/type'

const MyPage = ({ userObj }: userObjProps) => {

  const [newName, setNewName] = useState(userObj?.displayName)
  const navigate = useNavigate()

  const onLogOutClick = () => {
    authService.signOut()
    navigate('/login')
  }

  const getMyTalks = async() => { // -> 추가) 내가 작성한 talk 마이페이지에서 보여주기
    const talks = await dbService
    .collection('fTalks')
    .where('creatorId', '==', userObj?.uid)
    .orderBy('createdAt', 'desc') // index 생성
    .get()

    console.log(talks.docs.map((doc) => doc.data()))
  }

  useEffect(() => {
    getMyTalks()
  }, [])

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e
    setNewName(value)
  }

  const nameSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(userObj?.displayName !== newName) {
      await userObj?.updateProfile({
        displayName: newName
      })
    }
  }

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.logOutBtn}>
        <button onClick={onLogOutClick}>로그아웃</button>
      </div>
      <div>
        <h3>{userObj?.displayName}의 myPage</h3>
      </div>
    </div>
  )
}

export default MyPage