import { Link, useLocation } from 'react-router-dom'
import styles from '../Styles/Header.module.css'
import { GiHealthNormal } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import cx from 'clsx'

// 헤더 항상 상위에 고정
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header = () => {

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
          <Link to='/nutrients'><li>영양소</li></Link>
          <li>전체상품</li>
        </ul>
      </div>
      <div>
        <ul className={styles.mypageUl}>
          <li>자유게시판</li>
          <Link to='/mypage'><li>마이페이지</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Header