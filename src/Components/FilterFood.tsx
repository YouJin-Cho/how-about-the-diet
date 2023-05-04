import { useEffect, useState } from 'react';
import styles from '../Styles/MainPage.module.css'
import foodData from '../../public/food.json'

const FilterFood = () => {

  const [showCaloriesDropdown, setShowCaloriesDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showEffectDropdown, setShowEffectDropdown] = useState(false);

  const toggleCaloriesDropdown = () => setShowCaloriesDropdown(!showCaloriesDropdown);
  const toggleTypeDropdown = () => setShowTypeDropdown(!showTypeDropdown);
  const toggleEffectDropdown = () => setShowEffectDropdown(!showEffectDropdown);

  // 

  
  return (
    <ul>
      <li>
        <button onClick={toggleCaloriesDropdown}>칼로리</button>
        {showCaloriesDropdown && (
          <ul className={styles.dropDownUl}>
            <li>100 ~ 299</li>
            <li>300 ~ 499</li>
            <li>500 ~</li>
          </ul>
        )}
      </li>
      <li>
        <button onClick={toggleTypeDropdown}>종류</button>
        {showTypeDropdown && (
          <ul className={styles.dropDownUl}>
            <li>Meals</li>
            <li>Fresh</li>
          </ul>
        )}
      </li>
      <li>
        <button onClick={toggleEffectDropdown}>효능</button>
        {showEffectDropdown && (
          <ul className={styles.dropDownUl}>
            <li>에너지 활력</li>
            <li>심장 기능</li>
            <li>뇌 기능</li>
            <li>피부 개선</li>
            <li>칼슘(뼈)</li>
            <li>면연력 개선</li>
            <li>혈압 조절</li>
            <li>혈액 순환</li>
          </ul>
        )}
      </li>
    </ul>
  );
        }
export default FilterFood