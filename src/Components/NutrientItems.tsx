import styles from '../Styles/Nutrients.module.css'
import { NutrientItemsProps } from '../Service/type'
import { useContext } from 'react'
import { ThemeContext } from '../Common/Theme'

const NutrientItems = ({ nutrient }: NutrientItemsProps) => {

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <div className={styles.Hover}>
      <div className={styles.noHover} key={nutrient.id}>
        <img src={nutrient.image} alt={nutrient.title}/>
        <span style={backgroundStyle}>{nutrient.title}</span>
      </div>
      <div className={styles.onHover} key={nutrient.id}>
        <p style={backgroundStyle}>💁‍♀️ {nutrient.title}의 특징</p>
        <span>{nutrient.char} </span>
        <p style={backgroundStyle}>💁‍♀️ {nutrient.title}의 하루 권장량</p>
        <span>{nutrient.caution} </span>
        <p style={backgroundStyle}>💁‍♀️ {nutrient.title}의 대표 음식</p>
        <span>{nutrient.food} </span>
      </div>
    </div>
  )
}

export default NutrientItems