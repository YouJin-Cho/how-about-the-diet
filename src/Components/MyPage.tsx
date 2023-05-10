import { useNavigate, useParams } from 'react-router-dom'
import styles from '../Styles/MyPage.module.css'
import { authService, dbService } from '../firebase'
import { useEffect, useState } from 'react'
import { LikeFoods, userObjProps} from '../Service/type'

const MyPage = ({ userObj }: userObjProps) => {
  const navigate = useNavigate()

  const onLogOutClick = () => {
    authService.signOut()
    navigate('/login')
  }

  const [likeFoods, setLikeFoods] = useState<LikeFoods[]>([]);

  const fetchData = async() => {
    if(userObj) {
      const snapshot = await dbService
      .collection(`likes/${userObj.uid}/foods`)
      .where('like', '==', true)
      .get()
      const likeFoodsArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as LikeFoods[]
      setLikeFoods(likeFoodsArray)
    }
  }

  useEffect(() => {
    fetchData()
  }, [likeFoods])

  const deleteClick = async (foodId: string) => {
    const deleteOk = confirm("찜리스트에서 삭제하시겠습니까?");
    if (deleteOk) {
      await dbService.doc(`likes/${userObj?.uid}/foods/${foodId}`).delete();
    }
    setLikeFoods((prev) => prev.filter((food) => food.id !== foodId));
  };

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.logOutBtn}>
        <button onClick={onLogOutClick}>로그아웃</button>
      </div>
      <div>
        <h3>{userObj?.displayName}의 찜리스트</h3>
        <div>
        {likeFoods.length === 0 ? (
          <p>찜한 음식이 없습니다.</p>
        ) : (
          <ul>
            {likeFoods.map((food) => (
              <li key={food.id}>
                <p>{food.title}</p>
                <img src={food.image} width='50px' height='50px'/>
                <button onClick={()=>deleteClick(food.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  )
}

export default MyPage