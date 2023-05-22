import styles from '../Styles/MainPage.module.css'
import FilterFood from './FilterFood';
import SearchFood from './SearchFood';

const MainPage = () => {

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchFood}>
        <SearchFood />
      </div>
      <div className={styles.foodFullContainer}>
        <FilterFood />
      </div>
    </div>
  )
}

export default MainPage