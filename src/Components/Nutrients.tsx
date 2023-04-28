import styels from '../Styles/Nutrients.module.css'

const Nutrients = () => {
  return (
    <div className={styels.nutrientsContainer}>
      <h3>대표적인 필수 영양소 5가지!</h3>
      <div className={styels.imgContainer}>
        <div>
          <img src='../../public/Nutrients/carbohydrate.jpg' />
          <span>탄수화물 (Carbohydrate)</span>
        </div>
        <div>
          <img src='../../public/Nutrients/protein.jpg' />
          <span>단백질 (Protein)</span>
        </div>
        <div>
          <img src='../../public/Nutrients/fattyAcid.jpg' />
          <span>지방 (Fatty Acid)</span>
        </div>
        <div>
          <img src='../../public/Nutrients/minerals.jpg' />
          <span>무기질 (Minerals)</span>
        </div>
        <div>
          <img src='../../public/Nutrients/vitamin.jpg' />
          <span>비타민 (Vitamin)</span>
        </div>
      </div>
    </div>
  )
}

export default Nutrients