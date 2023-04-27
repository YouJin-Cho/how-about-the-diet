import styles from '../Styles/SearchList.module.css'

const SearchList = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.foodTitle}>
        <span>음식 title</span>
      </div>
      <div className={styles.foodDesc}>
        <div>
          <img src='../../public/Add/001.png'/>
        </div>
        <div className={styles.foodImgDesc}>
          <p>설명</p>
          <div>
            <hr />
            <div className={styles.likeSection}>
              <span>찜하기</span>
              <span>찜리스트 이동</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>필요 재료</p>
        <p>요리 조리법</p>
      </div>
    </div>
  )
}

export default SearchList