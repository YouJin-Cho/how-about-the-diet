import styles from '../Styles/Registration.module.css'

const Registration = () => {
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationBox}>
        <div className={styles.idNickname}>
          <div>
            <span>닉네임</span>
            <input type='text'/>
          </div>
          <div>
            <span>아이디</span>
            <input type='text'/>
            <span>아이디 중복 확인</span>
          </div>
        </div>
        <div className={styles.passwordConfirm}>
          <div>
            <span>비밀번호</span>
            <input type='text'/>
          </div>
          <div>
            <span>비밀번호 확인</span>
            <input type='text'/>
          </div>
        </div>
        <button>회원가입</button>
      </div>
    </div>
  )
}

export default Registration