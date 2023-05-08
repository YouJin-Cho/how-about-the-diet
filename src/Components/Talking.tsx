import firebase from "firebase/compat";
import { dbService } from "../firebase";
import { FormEvent, useState } from "react";

interface TalkingProps {
  userObj: firebase.User | null;
  id: string;
  text: string;
  isOwner: boolean;
}

const Talking = (props:TalkingProps) => {

  const [editing, setEditing] = useState(false)
  const [newTalk, setNewTalk] = useState(props.text)

  // talk 삭제
  const deleteClick = async() => {
    const deleteOk = confirm('정말로 삭제하시겠습니까?')
    console.log(deleteOk)
    if(deleteOk) {
      await dbService.doc(`fTalks/${props.id}`).delete()
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

  return (
    <>
      <div>
        {
          editing ? (
            <>
              <form onSubmit={onSubmit}>
                <input type="text" value={newTalk} onChange={onChange} required />
                <input type="submit" value="확인" />
              </form> 
              <button onClick={editiongClick}>취소</button>
            </>
          ) : (
            <>
              <p>{props.text}</p>
              {
                props.isOwner && (
                  <>
                    <button onClick={deleteClick}>삭제</button>
                    <button onClick={editiongClick}>수정</button>
                  </>
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