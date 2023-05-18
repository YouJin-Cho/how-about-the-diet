import styles from '../Styles/DetailFood.module.css'
import FoodLike from '../Common/FoodLike'
import { userObjProps } from '../Service/type'
import { useParams } from 'react-router-dom'
import foodData from '../../public/food.json'

const DetailFood = ({ userObj }: userObjProps) => {
  
  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const food = foodData.find((food) => food.id === foodId)
  
  if (!food) {
    return <div>해당 음식을 찾을 수 없습니다.</div>
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.foodDesc}>
        <div>
          <div className={styles.foodTitle}>
            <span>{food.title}</span>
          </div>
        </div>
        <FoodLike userObj={userObj}/>
        <div className={styles.foodImgDesc}>
          <p>✅ 음식 특징</p>
          <span>{food.desc}</span>
          <p>✅ 음식 영양소</p>
          <span>{food.nutrients}</span>
          <p>✅ 음식 효능</p>
          <span>{food.efficacy}</span>
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