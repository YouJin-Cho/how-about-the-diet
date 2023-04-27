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
      </div>
    </div>
  )
}

export default MainPage