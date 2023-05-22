import styles from '../Styles/SearchFoodList.module.css'
import foodData from '../../public/food.json'
import { useNavigate, useParams } from 'react-router-dom';
import SearchFood from './SearchFood';
import { useContext } from 'react';
import { ThemeContext } from '../Common/Theme';

const SearchFoodList = () => {

  const { searchTerm } = useParams<{ searchTerm: string }>()

  const navigate = useNavigate()
  const filteredFood = searchTerm
  ? foodData.filter((food) => food.title.includes(searchTerm))
  : [];

  const handleFoodClick = (id: number) => {
    navigate(`/detail/${id}`);
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const borderStyle = {
    border: isDarkMode ? '3px solid rgb(1, 135, 71)' : '',
  }

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.searchFood}>
          <SearchFood />
        </div>
        <div className={styles.foodList} style={borderStyle}>
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
                <div className={styles.descSection} style={backgroundStyle}>
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