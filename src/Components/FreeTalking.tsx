import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from '../Styles/FreeTalking.module.css'
import { dbService, storageService } from '../firebase'
import { userObjProps, Talks } from '../Service/type'
import Talking from './Talking'
import { v4 as uuidv4 } from 'uuid';
import { FaTrashAlt } from 'react-icons/fa'

const FreeTalking = ({ userObj }:userObjProps) => {

  const [talk, setTalk] = useState('')
  const [talks, setTalks] = useState<Talks[] | null>(null)
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    dbService.collection('fTalks').orderBy('createdAt', 'asc').onSnapshot((snap) => {
      const talkArray = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }) as Talks)
      talkArray.sort((a, b) => a.createdAt - b.createdAt)
      setTalks(talkArray)
    })
  }, [])
  
  // form 전송
  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let photoUrl = ''
  
    if(photo !== '') {
      const photoRef = storageService.ref().child(`${userObj?.uid}/${uuidv4()}`)
      const response = await photoRef.putString(photo, 'data_url')
      photoUrl = await response.ref.getDownloadURL()
    }
  
    const newTalk = {
      text: talk, 
      createdAt: Date.now(),
      creatorId: userObj?.uid,
      photoUrl
    }
  
    await dbService.collection('fTalks').add(newTalk)
    setTalk('')
    clearPhotoClick()
  }
  
  // input value 변경
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setTalk(value)
  }

  // 사진 가져오기
  const fileChange = (e: ChangeEvent<HTMLInputElement & { files: FileList }>) => {
    const {
      target: { files }
    } = e

    const theFile = files[0] // 사진 1개만
    const reader = new FileReader()

    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const result = finishedEvent.target?.result as string
      setPhoto(result)
    }
    reader.readAsDataURL(theFile)
  }

  // 사진 미리보기 삭제
  const clearPhotoClick = () => {
    setPhoto('')
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    } 
  }

  return (
    <div className={styles.talkContainer}>
      <div className={styles.talkingContainer}>
        <h3>함께 식단을 공유하세요! 💁‍♀️</h3>
          <div className={styles.talkBox}>
            <div>
              {
                talks === null 
                ? <div>Loading...</div>
                : talks.map((item) => (
                  <Talking 
                    key={item.id} 
                    text={item.text} 
                    id={item.id}
                    photoUpdate={item.photoUrl}
                    userObj={userObj}
                    isOwner={item.creatorId === userObj?.uid}
                    currentUser={item.creatorId}
                    />
                ))
              }
            </div>
          </div>
          <form className={styles.photoForm} onSubmit={onSubmit}>
            <div className={styles.photoTalk}>
              <input className={styles.file} type='file' accept='image/*' onChange={fileChange}/>
              <input className={styles.text} type='text' value={talk} onChange={onChange} placeholder='오늘은 연어를 먹었어요 🥹' maxLength={120} required/>
              <input className={styles.submit} type='submit' value='전송' />
            </div>
            {photo && 
              <div className={styles.prePhoto}>
                <span>preView</span>
                <img src={photo} width='50px' height='50px' />
                <button onClick={clearPhotoClick}><FaTrashAlt /></button>
              </div>
            }
          </form>
      </div>
    </div>
  )
}

export default FreeTalking