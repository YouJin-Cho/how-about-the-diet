import styles from '../Styles/SearchFoodList.module.css'
import foodData from '../../public/food.json'
import { useNavigate, useParams } from 'react-router-dom';
import SearchFood from './SearchFood';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Common/Theme';
import { filteredData } from '../Service/type';
import { BsArrowRepeat } from 'react-icons/bs'

const SearchFoodList = () => {

  const { searchTerm } = useParams<{ searchTerm: string }>()

  const navigate = useNavigate()

  // 전체 음식
  const allFoods = foodData

  // 검색 음식
  const filteredFood = searchTerm
  ? allFoods.filter((food) => food.title.includes(searchTerm))
  : [];

  const handleFoodClick = (id: number) => {
    navigate(`/detail/${id}`);
  }

  // 랜덤추천
  const [randomFoods, setRandomFoods] = useState<filteredData[] | null>(null)

  useEffect(() => {
    if(filteredFood.length === 0) {
      randomFoodList()
    } else {
    setRandomFoods(null)
    }
  }, [searchTerm])

  const randomFoodList = () => {
    const foodDataCopy = [...allFoods]
    const randomFoods: filteredData[] = []

    while(randomFoods.length < 3 && foodDataCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * foodDataCopy.length)
      const randomFood = foodDataCopy.splice(randomIndex, 1)[0]
      randomFoods.push(randomFood)
    }
    setRandomFoods(randomFoods)
  }

  // 랜덤 버튼
  const randomRetry = () => {
    randomFoodList()
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
                  <p className={styles.random}>해당 음식이 없습니다. 아래 추천 음식은 어떠세요? 💁‍♀️</p>
                  <button className={styles.bsBtn} onClick={randomRetry} style={backgroundStyle}><BsArrowRepeat /></button>
                  {randomFoods && randomFoods.map((food) => (
                    <li className={styles.foodListLi} key={food.id} onClick={() => handleFoodClick(food.id)}>
                      <div className={styles.imgSection}>
                        <img src={food.image} alt={food.title} />
                      </div>
                      <div className={styles.descSection} style={backgroundStyle}>
                        <p>{`"${food.title}"`} 어떠신가요?</p>
                      </div>
                    </li>
                  ))}
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