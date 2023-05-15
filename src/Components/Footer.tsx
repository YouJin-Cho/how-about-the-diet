import styles from '../Styles/Footer.module.css'
import { Carousel } from 'react-responsive-carousel'
import { GiHealthNormal } from 'react-icons/gi'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'
import { IoLogoYoutube } from 'react-icons/io'
import { BsInstagram } from 'react-icons/bs' 
import { AiFillFacebook } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.mainFooterContainer}>  
        <div className={styles.logoBox}>
          <div className={styles.logoContainer}>
            <button className="btn btn-accent"><Link to='/'>식단어때<GiHealthNormal className={styles.giHeal}/></Link></button>
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
      </div>
      
      <div className={styles.addContainer}>
        <div>
          <p>🥦 식단어때와 함께 즐기자! 🥦</p>
        </div>
        <div className={styles.footerCarousel}>
        <Carousel 
        autoPlay={true} 
        infiniteLoop={true}
        showThumbs={false} 
        showStatus={false}
        >
          <div>
            <img 
              className={styles.footerImg} 
              src='../../public/Add/001.png'
              height='150px'
              alt="digital" />
          </div>
          <div>
            <img 
              className={styles.footerImg} 
              src='../../public/Add/002.png'
              height='150px'
              alt="digital" />
          </div>
          <div>
            <img 
              className={styles.footerImg} 
              src='../../public/Add/003.png'
              height='150px'
              alt="digital" />
          </div>
        </Carousel>
      </div>
      </div>
    </div>
  )
}

export default Footer