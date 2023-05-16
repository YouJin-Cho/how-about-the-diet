import styles from '../Styles/DetailNutrients.module.css'
import { useParams } from 'react-router-dom';
import nutrientData from '../../public/nutrient.json'

const DetailNutrients = () => {

  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const nutrient = nutrientData.find((nutrient) => nutrient.id === foodId)

  if (!nutrient) {
    return <div>해당 영양소를 찾을 수 없습니다.</div>
  }
  
  return (
    <div className={styles.detailNuContainer}>
      <div className={styles.nutrientDesc}>
        <div className={styles.imgDesc}>
          <img src={`/${nutrient.image}`} alt={nutrient.title}/>
          <span>{nutrient.title}</span>
        </div>
        <div className={styles.nutrientDescDetail}>
          <p>특징</p>
          <span>{nutrient.char}</span>
          <p>효능</p>
          <span>{nutrient.efficacy}</span>
          <p>하루 권장량 및 주의사항</p>
          <span>{nutrient.caution}</span>
          <p>대표 음식</p>
          <span>{nutrient.food}</span>
        </div>
      </div>
    </div>
  )
}

export default DetailNutrients