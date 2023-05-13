import { Link, useLocation } from 'react-router-dom'
import styles from '../Styles/Header.module.css'
import { GiHealthNormal } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import cx from 'clsx'
import { authService } from '../firebase'
import { HeaderProps } from '../Service/type'

// 헤더 항상 상위에 고정
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header = ({ isLoggedIn }: HeaderProps) => {

  const [displayName, setDisplayName] = useState(authService.currentUser?.displayName)

  // 헤더 고정
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsSticky(scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 닉네임

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setDisplayName(user?.displayName)
    })
    return unsubscribe
  }, [])

  return (
    <div className={isSticky ? cx(styles.headerContainer, styles.sticky) : styles.headerContainer}>
      <div className={styles.mainLogo}>
        <Link to='/'>
          <div className={styles.logoContainer}>
            <h2>식단어때</h2>
            <GiHealthNormal />
          </div>
        </Link>
        <ul className={styles.headerUl}>
          <Link to='/nutrients'><li className={styles.headerLi}><button className="btn btn-sm">영양소</button></li></Link>
          <Link to='/FreeTalking'><li className={styles.headerLi}><button className="btn btn-sm">요리공유방</button></li></Link>
        </ul>
      </div>
      <div>
        <ul className={styles.mypageUl}>
          {
            isLoggedIn ? (
              <Link to='/mypage'><li className={styles.headerLi}><button className="btn btn-sm">{displayName} 님</button></li></Link>
            ) : (
              <Link to='/login'><li className={styles.headerLi}><button className="btn btn-sm">로그인</button></li></Link>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Header