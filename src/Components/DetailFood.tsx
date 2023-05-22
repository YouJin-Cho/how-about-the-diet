import styles from '../Styles/DetailFood.module.css'
import FoodLike from '../Common/FoodLike'
import { userObjProps } from '../Service/type'
import { useParams } from 'react-router-dom'
import foodData from '../../public/food.json'
import { useContext } from 'react'
import { ThemeContext } from '../Common/Theme'

const DetailFood = ({ userObj }: userObjProps) => {
  
  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const food = foodData.find((food) => food.id === foodId)
  
  if (!food) {
    return <div>해당 음식을 찾을 수 없습니다.</div>
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const borderStyle = {
    border: isDarkMode ? '2px solid rgb(1, 135, 71)' : '',
  }

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  const colorStyle = {
    color: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.foodDesc}>
        <div>
          <div className={styles.foodTitle} style={backgroundStyle}>
            <span>{food.title}</span>
          </div>
        </div>
        <FoodLike userObj={userObj}/>
        <div className={styles.foodImgDesc}>
          <p style={colorStyle}>✅ 음식 특징</p>
          <span>{food.desc}</span>
          <p style={colorStyle}>✅ 음식 영양소</p>
          <span>{food.nutrients}</span>
          <p style={colorStyle}>✅ 음식 효능</p>
          <span>{food.efficacy}</span>
        </div>
      </div>
      <div className={styles.cookingDesc} style={borderStyle}>
        <p style={backgroundStyle}>필요 재료</p>
        <span className={styles.cookingFirstDesc}>{food.cooking.ingredient}</span>
        <p style={backgroundStyle}>요리 조리법</p>
        <span>{food.cooking.recipe}</span>
      </div>
    </div>
  )
}

export default DetailFood