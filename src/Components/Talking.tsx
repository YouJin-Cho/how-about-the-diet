import { dbService, storageService } from "../firebase";
import { FormEvent, useContext, useState } from "react";
import { TalkingProps } from "../Service/type";
import styles from '../Styles/FreeTalking.module.css'
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillPencilFill } from 'react-icons/bs'
import { ThemeContext } from "../Common/Theme";

const Talking = (props:TalkingProps) => {

  const [editing, setEditing] = useState(false)
  const [newTalk, setNewTalk] = useState(props.text)

  // talk 삭제
  const deleteClick = async() => {
    const deleteOk = confirm('정말로 삭제하시겠습니까?')
    console.log(deleteOk)
    if(deleteOk) {
      await dbService.doc(`fTalks/${props.id}`).delete()
      await storageService.refFromURL(props.photoUpdate).delete()
    }
  }

  const editiongClick = () => {
    setEditing((prev) => !prev)
  }

  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dbService.doc(`fTalks/${props.id}`).update({
      text: newTalk
    })
    setEditing(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e

    setNewTalk(value)
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <>
      <div className={styles.talkList} style={ backgroundStyle }>
        {
          editing ? (
            <>
              {props.text}
              <form onSubmit={onSubmit}>
                <input className={styles.editingText} type="text" value={newTalk} onChange={onChange} required />
                <input className={styles.editingOk} type="submit" value="확인" />
                <button className={styles.editingCancel} onClick={editiongClick}>취소</button>
              </form> 
            </>
          ) : (
            <> 
              <p>{props.text}</p>
              {
                props.photoUpdate && <img className={styles.photoEditing} src={props.photoUpdate} />
              }
              {
                props.isOwner && (
                  <div className={styles.btnContainer}>
                    <button onClick={deleteClick}><FaTrashAlt /></button>
                    <button onClick={editiongClick}><BsFillPencilFill /></button>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}

export default Talking