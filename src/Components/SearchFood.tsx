import { useContext, useEffect, useState } from 'react'
import styles from '../Styles/MainPage.module.css'
import { useNavigate } from 'react-router-dom'
import foodData from '../../public/food.json'
import { ThemeContext } from '../Common/Theme'

const SearchFood = () => {

  // input search 기능
  const [searchTerm, setSearchTerm] = useState("")
  const [foodTitles, setFoodTitles] = useState<string[]>([])
  const navigate = useNavigate()

  // search 기능
  useEffect(() => {
    const filterFood = foodData
    .filter((food) => food.title.includes(searchTerm))
    .map((food) => food.title)
    setFoodTitles(filterFood)
  }, [searchTerm])

  // input창
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // 음식 title 클릭 시 이동
  const handleTitleClick = (title: string) => {
    const filterFoodTitle = foodData.find((foodTitle: { title: string }) => foodTitle.title === title)

    if(filterFoodTitle) {
      const filterFoodTitleId = filterFoodTitle.id
      navigate(`/detail/${filterFoodTitleId}`)
      setSearchTerm('')
    }
  }

  // 검색 
  const handleSearchClick = () => {
    if(!searchTerm) {
      alert('검색할 음식을 작성해주세요 ☺️')
      return
    }
    navigate(`/search/${searchTerm}`);
    setSearchTerm('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const themeStyle = {
    border: isDarkMode ? '2px solid rgb(1, 135, 71)' : '',
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  const borderStyle = {
    border: isDarkMode ? '2px solid rgb(1, 135, 71)' : '',
  }

  return (
    <>
      <input 
        type='text' 
        placeholder='오늘 먹고싶은 건강식은? ex) 연어'
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        style={borderStyle}
      ></input>
      <button className="btn btn-lg" onClick={handleSearchClick} style={themeStyle}>검색</button>
      {
        searchTerm !== "" && foodTitles.length > 0 && (
          <ul className={styles.searchUl} style={borderStyle}>
            {
              foodTitles.map((title) => (
                <li key={title} onClick={() => handleTitleClick(title)}>{title}</li>
              ))
            }
          </ul>
        )
      }
    </>
  )
}

export default SearchFood