import styles from '../Styles/SearchFoodList.module.css'
import foodData from '../../public/food.json'
import { useNavigate, useParams } from 'react-router-dom';
import SearchFood from './SearchFood';

const SearchFoodList = () => {

  const { searchTerm } = useParams<{ searchTerm: string }>()

  const navigate = useNavigate()
  const filteredFood = searchTerm
  ? foodData.filter((food) => food.title.includes(searchTerm))
  : [];

  const handleFoodClick = (id: number) => {
    navigate(`/detail/${id}`);
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.searchFood}>
          <SearchFood />
        </div>
        <div className={styles.foodList}>
          <ul className={styles.foodListUl}>
            {
              filteredFood.length === 0 && (
                <>
                  <p></p>
                  <p className={styles.noFood}>검색한 음식이 없습니다.. 🤦‍♀️ <br/> 연어는 어떠세요? 💁‍♀️</p>
                </>
              )
            }
            {filteredFood.map((food) => (
              <li className={styles.foodListLi} key={food.id} onClick={() => handleFoodClick(food.id)}>
                <div className={styles.imgSection}> 
                  <img src={food.image} />
                </div>
                <div className={styles.descSection}>
                  <p>{`" ${food.title} "`} 어떠신가요? ☺️</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SearchFoodList