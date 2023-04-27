import { Link } from 'react-router-dom'
import styles from '../Styles/Header.module.css'
import { GiHealthNormal } from 'react-icons/gi'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.mainLogo}>
        <Link to='/'>
          <div className={styles.logoContainer}>
            <h2>식단어때</h2>
            <GiHealthNormal />
          </div>
        </Link>
        <ul className={styles.headerUl}>
          <li>영양소</li>
          <li>전체상품</li>
        </ul>
      </div>
      <div>
        <ul className={styles.mypageUl}>
          <li>자유게시판</li>
          <li>마이페이지</li>
        </ul>
      </div>
    </div>
  )
}

export default Header