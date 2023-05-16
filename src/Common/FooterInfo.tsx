import styles from '../Styles/Footer.module.css'
import { Link } from "react-router-dom"
import { IoLogoYoutube } from 'react-icons/io'
import { BsInstagram } from 'react-icons/bs' 
import { AiFillFacebook } from 'react-icons/ai'

const FooterInfo = () => {
  return (
    <>
      <div className={styles.logoBox}>
        <div className={styles.logoContainer}>
          <button className="btn btn-accent">
            <Link to='/'>
              <img className={styles.logoImg} src='../../public/logo/logo.png' width='100px' height='40px' />
            </Link>
          </button>
        </div>
        <div>
          <p>COMPANY NAME: 식단어때</p>
          <p>OWNER: 조유진</p>
          <p>TEL: 1111-0000</p>
          <p>ADDRESS: 서울시 강남구 테헤란로</p>
          <p>Copyright © 2023 - All right reserved</p>
        </div>
      </div>
      <div className={styles.sns}>
        <div>
          <p>Follow</p>
        </div>
        <div className={styles.snsBox}>
          <IoLogoYoutube className={styles.logo}/>
          <BsInstagram className={styles.logo}/>
          <AiFillFacebook className={styles.logo}/>
        </div>
      </div>
    </>
  )
}

export default FooterInfo