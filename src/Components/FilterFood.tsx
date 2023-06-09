import styles from '../Styles/FilterFood.module.css'
import { useContext, useEffect, useState } from 'react'
import foodData from '../../public/food.json'
import { categoryTypes, filteredData } from '../Service/type'
import { FreshOrMelas, efficacys, kcals } from '../Service/FilterFoodDropdown'
import { useNavigate } from 'react-router-dom'
import "daisyui/dist/styled.css";
import { ThemeContext } from '../Common/Theme'

const FilterFood = () => {
  const [freshOrMeals, setFreshOrMeals] = useState<categoryTypes>(FreshOrMelas[0])
  const [efficacyFilter, setEfficacyFilter] = useState<string>('')
  const [kcalFilter, setKcalFilter] = useState<number | string>('')
  const [filteredFood, setFilteredFood] = useState<filteredData[]>(foodData)

  const navigate = useNavigate()

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1)
  const PAGE_COUNT = 8
  const totalPages = Math.ceil(filteredFood.length / PAGE_COUNT)

  useEffect(() => {
    let filteredKind = foodData
    if (freshOrMeals.state) {
      filteredKind = foodData.filter((item) => {
        return freshOrMeals.state === item.kind
      })
    }

    if (efficacyFilter) {
      filteredKind = filteredKind.filter((item) => {
        return item.efficacy.includes(efficacyFilter)
      })
    }

    if (kcalFilter) {
      filteredKind = filteredKind.filter((item) => {
        const kcal = item.kcal
        switch (kcalFilter) {
          case '100-299':
            return kcal >= 100 && kcal <= 299
          case '300-499':
            return kcal >= 300 && kcal <= 499
          case '500+':
            return kcal >= 500
          default:
            return true
        }
      })
    }

    setFilteredFood(filteredKind)
    setCurrentPage(1)
  }, [freshOrMeals, efficacyFilter, kcalFilter])

  const handleFreshOrMealsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (value === 'all') {
      setFreshOrMeals(FreshOrMelas[0])
    } else {
      setFreshOrMeals({
        state: value,
        name: '',
      })
    }
  }

  const handleEfficacyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (value === 'all') {
      setEfficacyFilter('')
    } else {
      setEfficacyFilter(value)
    }
  }

  const handleKcalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (value === 'all') {
      setKcalFilter('')
    } else {
      const [min, max] = value.split('-')
      const filtered = filteredFood.filter(item => {
        const kcal = item.kcal
        return kcal >= parseInt(min) && (max === '' || kcal <= parseInt(max))
      })
      setKcalFilter(value)
      setFilteredFood(filtered)
    }
  }

  // 상품 클릭 시, 이동
  const handleFoodClick = (id:number) => {
    navigate(`/detail/${id}`)
  }

  // 페이지네이션
  const lastFood = currentPage * PAGE_COUNT
  const firstFood = lastFood - PAGE_COUNT
  const currentItems = filteredFood.slice(firstFood, lastFood)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const borderStyle = {
    border: isDarkMode ? '1px solid rgb(1, 135, 71)' : '',
  }

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <div className={styles.filterFoodContainer}>
      <div className={styles.dropDownContainer}>
        <select className="select select-success w-full max-w-xs" onChange={handleFreshOrMealsChange} value={freshOrMeals.state} style={borderStyle}>
          {FreshOrMelas.map((fm) => (
            <option className={styles.dropdownOption} key={fm.state} value={fm.state}>{fm.name}</option>
          ))}
        </select>
        <select className="select select-success w-full max-w-xs" onChange={handleEfficacyChange} value={efficacyFilter} style={borderStyle}>
          {efficacys.map((efficacy) => (
            <option key={efficacy.state} value={efficacy.state}>{efficacy.name}</option>
          ))}
        </select>
        <select className="select select-success w-full max-w-xs" onChange={handleKcalChange} value={kcalFilter} style={borderStyle}>
          {kcals.map((kcal) => (
            <option key={kcal.state} value={kcal.state}>{kcal.name}</option>
          ))}
        </select>
      </div>
      {/* 페이지네이션 */}
      {
        currentItems.length === 0 ? (
          <section className={styles.noFood} style={borderStyle}>
            <p>해당 음식이 없습니다 😂</p>
          </section>
        ) : (
          <ul className={styles.foodListUl}>
            {currentItems.map((food) => (
              <li className={styles.foodListLi} key={food.id} onClick={() => handleFoodClick(food.id)}>
                <section className={styles.imgSection}> 
                  <img src={food.image} />
                </section>
                <section className={styles.descSection} style={backgroundStyle}>
                  <p>{food.title}</p>
                </section>
              </li>
            ))}
          </ul>
        )
      }
      <div className={styles.pagination}>
        {totalPages > 1 && (
          <ul>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button 
                  className="btn btn-xs"
                  style={{
                    background: currentPage === index + 1 ? (isDarkMode ? '#01ad5a' : '') : (isDarkMode ? 'rgb(1, 135, 71)' : ''),
                  }}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={currentPage === index + 1}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FilterFood