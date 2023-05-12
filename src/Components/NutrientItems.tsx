import { useNavigate } from 'react-router-dom'
import { NutrientItemsProps } from '../Service/type'

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

export default NutrientItems