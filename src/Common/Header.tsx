import { Link, useLocation } from 'react-router-dom'
import styles from '../Styles/Header.module.css'
import { useContext, useEffect, useState } from 'react'
import cx from 'clsx'
import { authService } from '../firebase'
import { HeaderProps } from '../Service/type'
import { FiSun } from 'react-icons/fi'
import { FaMoon } from 'react-icons/fa'
import { ThemeContext } from './Theme'
import logo from '../../public/logo/logo.png';
import logoDark from '../../public/logo/logoDark.png';


// 페이지 이동 시, 화면 상위 고정
export const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const Header = ({ isLoggedIn }: HeaderProps) => {

  const [displayName, setDisplayName] = useState(authService.currentUser?.displayName)
  const [isSticky, setIsSticky] = useState(false)

  // 헤더 고정
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
    const nameOn = authService.onAuthStateChanged((user) => {
      setDisplayName(user?.displayName)
    })
    return nameOn
  }, [])

  // 테마 변경
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  const themeStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }
  
  return (
    <div className={isSticky ? cx(styles.headerContainer, styles.sticky) : styles.headerContainer} style={themeStyle}>
      <div className={styles.mainLogo}>
        <Link to='/'>
          <div className={styles.logoContainer}>
          <img src={isDarkMode ? logoDark : logo} width='100px' height='40px' />
          </div>
        </Link>
        <ul className={styles.headerUl}>
          <Link to='/nutrients'><li className={styles.headerLi}><button className="btn btn-sm">영양소</button></li></Link>
          <Link to='/FreeTalking'><li className={styles.headerLi}><button className="btn btn-sm">식단공유방</button></li></Link>
        </ul>
      </div>
      <div>
        <ul className={styles.mypageUl}>
          <button className={styles.themeIcon}>
            {isDarkMode ? <FiSun className={styles.fi} onClick={toggleTheme} /> : <FaMoon className={styles.fa} onClick={toggleTheme} />}
          </button>
          <Link to='/mypage'><li className={styles.headerLi}><button className="btn btn-sm">찜리스트</button></li></Link>
          {
            isLoggedIn ? (
              <Link to='/profile'><li className={styles.headerLi}><button className="btn btn-sm">마이페이지</button></li></Link>
            ) : (
              <Link to='/'><li className={styles.headerLi}><button className="btn btn-sm">로그인</button></li></Link>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Header