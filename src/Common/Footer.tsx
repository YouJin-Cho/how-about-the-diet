import styles from '../Styles/Footer.module.css'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import FooterInfo from './FooterInfo'

const Footer = () => {

  return (
    <div className={styles.footerContainer}>
      <div className={styles.mainFooterContainer}>  
        <FooterInfo />
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