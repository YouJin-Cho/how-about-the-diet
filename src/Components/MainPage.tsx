import styles from '../Styles/MainPage.module.css'

const MainPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchFood}>
        <input type='text' placeholder='오늘 먹고싶은 건강식은? ex) 연어'></input>
        <button>검색하기</button>
      </div>
      <div className={styles.category}>
        <ul>
          <li>칼로리</li>
          <li>종류</li>
          <li>효능</li>
        </ul>
      </div>
      <div className={styles.foodFullContainer}>
        <span>전체상품</span>
        <div className={styles.foodList}>
          <ul>
            {
              Array.from({ length: 8 }).map((_, index) => {
                return (
                  <li key={index} className={styles.foodListLi}>
                    <section className={styles.imgSection}>
                      <img />
                    </section>
                    <section className={styles.descSection}>
                      <p>곡물 샐러드</p>
                    </section>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MainPage