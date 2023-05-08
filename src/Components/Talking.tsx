import firebase from "firebase/compat";

interface TalkingProps {
  userObj: firebase.User | null;
  text: string;
  isOwner: boolean;
}

const Talking = (props:TalkingProps) => {
  return (
    <>
      <div>
        <p>{props.text}</p>
        {
          props.isOwner && (
            <>
              <button>삭제</button>
              <button>수정</button>
            </>
          )
        }
      </div>
    </>
  )
}

export default Talking