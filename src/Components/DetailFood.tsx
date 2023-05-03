import { useParams } from 'react-router-dom';
import styles from '../Styles/DetailFood.module.css'
import foodData from '../../public/food.json'

export interface DetailFoodProps {
  foodId : number
}

const DetailFood = () => {

  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const food = foodData.find((food) => food.id === foodId);

  if (!food) {
    return <div>해당 음식을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.foodTitle}>
        <span>{food.title}</span>
      </div>
      <div className={styles.foodDesc}>
        <div>
          <img src={food.image}/>
        </div>
        <div className={styles.foodImgDesc}>
          <p>상품 특징</p>
          <span>{food.desc}</span>
          <p>상품 영양소</p>
          <span>{food.nutrients}</span>
          <p>상품 효능</p>
          <span>{food.efficacy}</span>
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
        <span className={styles.cookingFirstDesc}>{food.cooking.ingredient}</span>
        <p>요리 조리법</p>
        <span>{food.cooking.recipe}</span>
      </div>
    </div>
  )
}

export default DetailFood