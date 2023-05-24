import { FormEvent, useEffect, useState } from 'react'
import styles from '../Styles/Profile.module.css'
import { userObjProps } from '../Service/type'

const Profile = ({ userObj }: userObjProps) => {

  const [newDisplayName, setNewDisplayName] = useState(userObj?.displayName || '')
  const [displayNameUpdate, setdisplayNameUpdate] = useState(false)


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setNewDisplayName(value)
  }

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

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileBox}>
        <div className={styles.profileImg}>
          <img src='../../public/Nutrients/protein.jpg' />
        </div>
        <div>
          <p>{userObj?.displayName}</p>
        </div>
        <form onSubmit={onSubmit}>
          <input type='text' onChange={onChange} placeholder='닉네임' value={newDisplayName} />
          <input type='submit' value='수정' disabled={displayNameUpdate}/>
        </form>
      </div>
    </div>
  )
}

export default Profile