import styles from '../Styles/Nutrients.module.css'
import { NutrientItemsProps } from '../Service/type'

const NutrientItems = ({ nutrient }: NutrientItemsProps) => {

  return (
    <div className={styles.Hover}>
      <div className={styles.noHover} key={nutrient.id}>
        <img src={nutrient.image} alt={nutrient.title}/>
        <span>{nutrient.title}</span>
      </div>
      <div className={styles.onHover} key={nutrient.id}>
        <p>💁‍♀️ {nutrient.title}의 특징</p>
        <span>{nutrient.char} </span>
        <p>💁‍♀️ {nutrient.title}의 하루 권장량</p>
        <span>{nutrient.caution} </span>
        <p>💁‍♀️ {nutrient.title}의 대표 음식</p>
        <span>{nutrient.food} </span>
      </div>
    </div>
  )
}

export default NutrientItems