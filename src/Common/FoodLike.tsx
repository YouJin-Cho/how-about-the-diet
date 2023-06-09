import { useEffect, useState } from "react"
import { userObjProps } from "../Service/type"
import { dbService } from "../firebase"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { LikeFoods } from "../Service/type"
import styles from '../Styles/FoodLike.module.css'
import foodData from '../../public/food.json'

const FoodLike = ({ userObj }:userObjProps) => {

  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const food = foodData.find((food) => food.id === foodId)
  
  const dbLikes = dbService.collection('likes')
  const navigate = useNavigate()

  // 찜하기
  const [like, setLike] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const likeRef = dbLikes.doc(userObj?.uid).collection('foods').doc(`${foodId}`);
      const doc = await likeRef.get();
      if (doc.exists) {
        const data = doc.data() as LikeFoods;
        setLike(data.like);
      }
    }
    fetchData();
  }, []); // foodId, userObj?.uid

  const foodLikeClick = () => {
    if (!userObj) return

    const likeRef = dbLikes.doc(userObj.uid).collection('foods').doc(`${foodId}`)
    if (like) {
      const deleteOk = confirm("해당 음식을 찜리스트에서 삭제하시겠습니까?")
      if (deleteOk) {
        likeRef.delete()
        setLike(false)
      }
    } else {
      const addOk = confirm("해당 음식을 찜리스트에 추가하시겠습니까?")
      if (addOk) {
        likeRef.set({
          id: food?.id,
          title: food?.title,
          image: food?.image,
          like: true,
        });
        setLike(true)
        
        const goMyPage = confirm("찜리스트에서 음식을 확인하시겠습니까?")
        if (goMyPage) {
          navigate('/mypage')
        }
      }
    }
  };
  
  return (
    <div className={styles.foodImg}>
      {food && <img src={food.image} width='50px' height='50px'/>}
      {like ? (
        <AiFillHeart className={styles.heartIcon} onClick={foodLikeClick} />
      ) : (
        <AiOutlineHeart className={styles.heartIcon} onClick={foodLikeClick} />
      )}
    </div>
  )
}

export default FoodLike