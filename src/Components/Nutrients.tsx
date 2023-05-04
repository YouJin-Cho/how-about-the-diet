import styels from '../Styles/Nutrients.module.css'
import nutrientData from '../../public/nutrient.json'
import { useState } from 'react'
import DetailNutrients from './DetailNutrients'
import { useNavigate } from 'react-router-dom'

const Nutrients = () => {

  const [selectedNutrient, setSelectedNutrient] = useState<number>()
  
  const handleNutrientClick = (id: number) => {
    setSelectedNutrient(id)
  }

  return (
    <div className={styels.nutrientsContainer}>
      <h3>대표적인 필수 영양소 5가지!</h3>
      <div className={styels.imgContainer}>
        {
          nutrientData.map((nutrient) => (
            <NutrientItems key={nutrient.id} nutrient={nutrient} onClick={handleNutrientClick} />
          ))
        }
      </div>
    </div>
  )
}

interface NutrientItemsProps {
  nutrient: {
    id: number
    title: string
    image: string
  }
  onClick: (id: number) => void
}

const NutrientItems = ({ nutrient, onClick }: NutrientItemsProps) => {

  const navigate = useNavigate()

  const handleClick = () => {
    onClick(nutrient.id)
    navigate(`/nutrients/${nutrient.id}`)
  }

  return (
    <div key={nutrient.id} onClick={handleClick}>
      <img src={nutrient.image} alt={nutrient.title}/>
      <span>{nutrient.title}</span>
    </div>
  )
}

export default Nutrients