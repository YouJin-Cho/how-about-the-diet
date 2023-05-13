import styels from '../Styles/Nutrients.module.css'
import nutrientData from '../../public/nutrient.json'
import NutrientItems from './NutrientItems'

const Nutrients = () => {

  return (
    <div className={styels.nutrientsContainer}>
      <h3>대표적인 필수 영양소 5가지!</h3>
      <div className={styels.imgContainer}>
        {
          nutrientData.map((nutrient) => (
            <NutrientItems key={nutrient.id} nutrient={nutrient} />
          ))
        }
      </div>
    </div>
  )
}

export default Nutrients