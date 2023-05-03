import styles from '../Styles/MainPage.module.css'

export interface FoodListProps {
  id : number
  title: string
  img : string
}

const FoodList = (props: FoodListProps) => {
  return (
    <li className={styles.foodListLi}>
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