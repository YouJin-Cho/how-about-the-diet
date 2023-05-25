import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/MyPage.module.css'
import { authService, dbService } from '../firebase'
import { useContext, useEffect, useState } from 'react'
import { LikeFoods, userObjProps} from '../Service/type'
import { AiFillHeart } from 'react-icons/ai'
import { ThemeContext } from '../Common/Theme'

const MyPage = ({ userObj }: userObjProps) => {

  const [likeFoods, setLikeFoods] = useState<LikeFoods[]>([]);
  const navigate = useNavigate()

  // 찜한 음식 가져오기
  const fetchData = async() => {
    if(userObj) {
      const snapcatch = await dbService 
      .collection(`likes/${userObj.uid}/foods`)
      .get()
      const likeFoodsArray = snapcatch.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as LikeFoods[]
      setLikeFoods(likeFoodsArray)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 찜한 음식 삭제
  const deleteClick = async (foodId: string) => {
    const deleteOk = confirm("찜리스트에서 삭제하시겠습니까? 🥹");
    if (deleteOk) {
      await dbService.doc(`likes/${userObj?.uid}/foods/${foodId}`).delete();
      setLikeFoods((prev) => prev.filter((food) => food.id !== foodId));
    } else {
    }
  };

  // 찜한 음식 전체 삭제
  const deleteAllClick = async () => {
    const deleteAllOk = confirm("음식을 전부 삭제하시겠습니까? 🫠")
    if(deleteAllOk) {
      const foodsRef = dbService.collection(`likes/${userObj?.uid}/foods`)
      const deleteSnap = await foodsRef.get()
      deleteSnap.forEach((doc) => {
        doc.ref.delete()
      })
      setLikeFoods([])
    } else {
    }
  }

  // 음식 상세페이지 이동
  const likeFoodClick = (id: number) => {
    navigate(`/detail/${id}`)
  }

  // 테마 변경
  const { isDarkMode } = useContext(ThemeContext)

  const borderStyle = {
    border: isDarkMode ? '2px solid rgb(1, 135, 71)' : '',
  }

  const backgroundStyle = {
    background: isDarkMode ? 'rgb(1, 135, 71)' : '',
  }

  return (
    <div className={styles.myPageContainer}>
      {
        likeFoods.length === 0 ? (
          <>
            <button className="btn btn-accent" style={borderStyle}><Link to='/'>{userObj?.displayName}<span style={{ fontSize: '15px' }}>님 <br />음식을 담아주세요 🥹</span></Link></button>
          </>
        ) : (
          <button className="btn btn-accent" onClick={deleteAllClick} style={borderStyle}>🍎 음식 전체 삭제 🥦</button>
        )
      }
      <div className={styles.likeContainer} style={borderStyle}>
        <div className={styles.likeBox}>
          {likeFoods.length === 0 ? (
            <p>찜한 음식이 없습니다. <br/>원하는 음식을 담아보세요 💁‍♀️</p>
          ) : (
            <>
              <ul className={styles.likeUl}>
                {likeFoods.map((food) => (
                  <li key={food.id}>
                    <img src={food.image} width='50px' height='50px' onClick={()=>likeFoodClick(Number(food.id))}/>
                    <p style={backgroundStyle}>{food.title}</p>
                    <AiFillHeart className={styles.likeIcon} onClick={()=>deleteClick(food.id)} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyPage