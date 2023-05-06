import styles from '../Styles/Footer.module.css'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.mainFooterContainer}>
        <div>
          <span>식단어때</span>
        </div>
      </div>
      <div className={styles.addContainer}>
        <div>
          <span className={styles.addDescription}>간편하게 건강을 즐기고 싶다면?</span>
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
                width='60%'
                alt="digital" />
            </div>
            <div>
              <img 
                className={styles.footerImg} 
                src='../../public/Add/002.png'
                height='150px'
                width='60%'
                alt="digital" />
            </div>
            <div>
              <img 
                className={styles.footerImg} 
                src='../../public/Add/003.png'
                height='150px'
                width='60%'
                alt="digital" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Footer