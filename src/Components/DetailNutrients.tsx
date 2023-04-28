import styles from '../Styles/DetailNutrients.module.css'

const DetailNutrients = () => {
  return (
    <div className={styles.detailNuContainer}>
      <div className={styles.nutrientDesc}>
        <div className={styles.imgDesc}>
          <img src='../../public/Nutrients/vitamin.jpg'/>
          <span>Vitamin</span>
        </div>
        <div className={styles.nutrientDescDetail}>
          <p>특징</p>
          <span>
          단백질은 세포와 조직을 구성하는 주요 구성 요소이며, 인체의 다양한 기능을 수행하는 데 필요합니다. <br />
          단백질은 아미노산이라는 작은 분자로 구성되어 있으며, 인체에서 필요한 아미노산을 공급받지 못하면 생명을 유지하는 데 어려움이 생길 수 있습니다.
          </span>
          <p>효능</p>
          <span>
          단백질은 인체에서 근육, 조직, 피부, 모발 등 다양한 조직의 성장과 유지에 중요한 역할을 합니다. <br />
          또한 항체, 호르몬, 효소 등의 생성에도 필수적이며, 대사를 원활하게 하고 면역체계를 강화하는 데도 중요합니다.
          </span>
          <p>하루 권장량 및 주의사항</p>
          <span>
          성인의 경우 일반적으로 체중 1kg당 0.8g~1g 정도의 단백질을 섭취하는 것이 권장됩니다. <br />
          하지만 운동이 많거나 신체활동량이 높은 경우나 임신, 수유 중인 경우에는 더 많은 단백질을 섭취할 필요가 있습니다.
          </span>
          <p>대표 음식</p>
          <span>
          계란, 닭가슴살, 콩, 두부, 그리스 요거트 등이 대표적인 단백질을 섭취할 수 있는 음식입니다. <br />
          이 외에도 생선, 육류, 견과류, 씨앗류, 우유, 치즈 등에서도 단백질을 섭취할 수 있습니다. 다만, 고기나 유제품은 지방이 함유되어 있으므로 적절한 양으로 섭취해야 합니다.
          </span>
        </div>
      </div>
    </div>
  )
}

export default DetailNutrients