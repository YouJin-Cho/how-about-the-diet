import { FormEvent, useEffect, useState } from 'react'
import styles from '../Styles/FreeTalking.module.css'
import { dbService } from '../firebase'
import { userObjProps, Talks } from '../Service/type'
import Talking from './Talking'

const FreeTalking = ({ userObj }:userObjProps) => {

  const [talk, setTalk] = useState('')
  const [talks, setTalks] = useState<Talks[] | null>(null)

  useEffect(() => {
    dbService.collection('fTalks').onSnapshot((snap) => {
      console.log('something')
      const talkArray = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }) as Talks)
      setTalks(talkArray)
      console.log(talkArray)
    })
  }, [])
  
  // form 전송
  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dbService.collection('fTalks').add({
      text: talk,
      createdAt: Date.now(),
      creatorId: userObj?.uid
    })
    setTalk('')
  }

  // input value 변경
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setTalk(value)
  }

  return (
    <div className={styles.chattingContainer}>
      <div>
        <form onSubmit={onSubmit}>
          <input type='text' value={talk} onChange={onChange} placeholder='제발!!' maxLength={120} />
          <input type='submit' value='talk' />
        </form>
        <div>
        {
          talks === null 
          ? <div>Loading...</div>
          : talks.map((item) => (
              <Talking 
                key={item.id} 
                text={item.text} 
                userObj={userObj} 
                isOwner={item.creatorId === userObj?.uid}/>
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default FreeTalking