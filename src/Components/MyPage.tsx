import { useNavigate } from 'react-router-dom'
import styles from '../Styles/MyPage.module.css'
import { authService, dbService } from '../firebase'
import { useEffect, useState } from 'react'
import { LikeFoods, userObjProps} from '../Service/type'
import { AiFillHeart } from 'react-icons/ai'

const MyPage = ({ userObj }: userObjProps) => {
  const navigate = useNavigate()

  const onLogOutClick = () => {
    authService.signOut()
    navigate('/login')
  }

  const [likeFoods, setLikeFoods] = useState<LikeFoods[]>([]);

  const fetchData = async() => {
    if(userObj) {
      const snapcatch = await dbService // dbLikes?
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

  const deleteClick = async (foodId: string) => {
    const deleteOk = confirm("찜리스트에서 삭제하시겠습니까?");
    if (deleteOk) {
      await dbService.doc(`likes/${userObj?.uid}/foods/${foodId}`).delete();
      setLikeFoods((prev) => prev.filter((food) => food.id !== foodId));
    } else {
    }
  };

  const deleteAllClick = async () => {
    const deleteOk = confirm("음식을 전부 삭제하시겠습니까?")
    if(deleteOk) {
      const foodsRef = dbService.collection(`likes/${userObj?.uid}/foods`)
      const deleteSnap = await foodsRef.get()
      deleteSnap.forEach((doc) => {
        doc.ref.delete()
      })
      setLikeFoods([])
    } else {
    }
  }

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.logOutBtn}>
        <button onClick={onLogOutClick}>로그아웃</button>
      </div>
      <h3>{userObj?.displayName}의 찜리스트</h3>
      <div className={styles.likeContainer}>
        <div className={styles.likeBox}>
          {likeFoods.length === 0 ? (
            <p>찜한 음식이 없습니다.</p>
          ) : (
            <>
              <div className={styles.allDelete}>
                <AiFillHeart className={styles.allDeleteHeart} onClick={deleteAllClick}>전체삭제</AiFillHeart>
              </div>
              <ul className={styles.likeUl}>
                {likeFoods.map((food) => (
                  <li key={food.id}>
                    <img src={food.image} width='50px' height='50px'/>
                    <p>{food.title}</p>
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