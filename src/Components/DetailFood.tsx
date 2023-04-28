import styles from '../Styles/DetailFood.module.css'

const DetailFood = () => {
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
          <p>
          상품 특징
          </p>
          <div>
            <hr />
            <div className={styles.likeSection}>
              <span>찜하기</span>
              <span>찜리스트 이동</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cookingDesc}>
        <p>필요 재료</p>
        <span className={styles.cookingFirstDesc}>설명</span>
        <p>요리 조리법</p>
        <span>
          설명
        </span>
      </div>
    </div>
  )
}

export default DetailFood