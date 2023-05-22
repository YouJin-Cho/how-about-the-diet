import styels from '../Styles/Nutrients.module.css'
import nutrientData from '../../public/nutrient.json'
import NutrientItems from './NutrientItems'
import { useContext } from 'react'
import { ThemeContext } from '../Common/Theme'

const Nutrients = () => {

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const borderStyle = {
    border: isDarkMode ? '3px solid rgb(1, 135, 71)' : '3px solid #01c466',
  }

  return (
    <div className={styels.nutrientsContainer}>
      <h3 style={borderStyle}>🍋 대표적인 필수 영양소 5가지 🥦</h3>
      <div className={styels.imgContainer}>
        {
          nutrientData.map((nutrient) => (
            <NutrientItems key={nutrient.title} nutrient={nutrient} />
          ))
        }
      </div>
    </div>
  )
}

export default Nutrients