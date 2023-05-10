import styles from '../Styles/FilterFood.module.css'
import { useEffect, useState } from 'react'
import foodData from '../../public/food.json'
import { categoryTypes, filteredData, userObjProps } from '../Service/type'
import { FreshOrMelas, efficacys, kcals } from '../Service/FilterFoodDropdown'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div className={styles.filterFoodContainer}>
      <div className={styles.dropDownContainer}>
        <select onChange={handleFreshOrMealsChange} value={freshOrMeals.state}>
          {FreshOrMelas.map((fm) => (
            <option className={styles.dropdownOption} key={fm.state} value={fm.state}>{fm.name}</option>
          ))}
        </select>
        <select onChange={handleEfficacyChange} value={efficacyFilter}>
          {efficacys.map((efficacy) => (
            <option key={efficacy.state} value={efficacy.state}>{efficacy.name}</option>
          ))}
        </select>
        <select onChange={handleKcalChange} value={kcalFilter}>
          {kcals.map((kcal) => (
            <option key={kcal.state} value={kcal.state}>{kcal.name}</option>
          ))}
        </select>
      </div>
      {/* 페이지네이션 */}
      <ul className={styles.foodListUl}>
        {currentItems.map((food) => (
          <li className={styles.foodListLi} key={food.id} onClick={() => handleFoodClick(food.id)}>
            <section className={styles.imgSection}> 
              <img src={food.image} />
            </section>
            <section className={styles.descSection}>
              <p>{food.title}</p>
            </section>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {totalPages > 1 && (
          <ul>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
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