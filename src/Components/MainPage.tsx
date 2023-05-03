import styles from '../Styles/MainPage.module.css'
import foodData from '../../public/food.json'
import FoodList from './FoodList'
import { useState } from 'react';

const MainPage = () => {

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
  const itemsPerPage = 8;  // 페이지당 보여줄 아이템 개수

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = foodData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(foodData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // < > 버튼
  const lastPage = Math.ceil(foodData.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => (prevPage < lastPage ? prevPage + 1 : prevPage));
  };

  const prevButton = currentPage > 1 ? (
    <button onClick={handlePrevClick}>{'<'}</button>
  ) : (
    <button disabled>{'<'}</button>
  );

  const nextButton = currentPage < lastPage ? (
    <button onClick={handleNextClick}>{'>'}</button>
  ) : (
    <button disabled>{'>'}</button>
  );


  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchFood}>
        <input type='text' placeholder='오늘 먹고싶은 건강식은? ex) 연어'></input>
        <button>검색하기</button>
      </div>
      <div className={styles.category}>
        <ul>
          <li>칼로리</li>
          <li>종류</li>
          <li>효능</li>
        </ul>
      </div>
      <div className={styles.foodFullContainer}>
        <span>전체상품</span>
        <div className={styles.foodList}>
          <ul>
            {
              currentItems.map((food) => (
                <FoodList
                  key={food.id}
                  id={food.id}
                  title={food.title}
                  img={food.image}
                  />
              ))
            }
          </ul>
          <div>
            {prevButton}
            {pageNumbers.map((number) => (
              <button key={number} onClick={() => setCurrentPage(number)}>
                {number}
              </button>
            ))}
            {nextButton}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage