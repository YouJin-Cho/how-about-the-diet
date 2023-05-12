import { useNavigate } from 'react-router-dom'
import styles from '../Styles/MainPage.module.css'

export interface FoodListProps {
  id : number
  title: string
  img : string
}

const FoodList = (props: FoodListProps) => {

  const navigate = useNavigate()

  // 상세페이지 이동
  const handleFoodClick = () => {
    const id = props.id
    navigate(`/detail/${id}`)
  }

  return (
    <li className={styles.foodListLi} onClick={handleFoodClick}>
      <section className={styles.imgSection}> 
        <img src={props.img} />
      </section>
      <section className={styles.descSection}>
        <p>{props.title}</p>
      </section>
    </li>
  )
}

export default FoodList