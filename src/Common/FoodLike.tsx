import { useEffect, useState } from "react";
import { userObjProps } from "../Service/type";
import { dbService } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import foodData from '../../public/food.json'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { LikeFoods } from "../Service/type";
import styles from '../Styles/FoodLike.module.css'

const FoodLike = ({ userObj }:userObjProps) => {

  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const food = foodData.find((food) => food.id === foodId);
  const dbLikes = dbService.collection('likes');

  const navigate = useNavigate()

  // 찜하기
  const [like, setLike] = useState(false);

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
    if (!userObj) return;
    const likeRef = dbLikes.doc(userObj.uid).collection('foods').doc(`${foodId}`);
    likeRef.set({
      id: food?.id,
      title: food?.title,
      image: food?.image,
      like: !like
    });
    setLike(!like);
    const goMyPage = confirm("마이페이지에서 상품을 확인하시겠습니까?")
    if(goMyPage) {
      navigate('/mypage')
    }
  }
  
  return (
    <div className={styles.foodImg}>
      {like ? (
        <AiFillHeart className={styles.heartIcon} onClick={foodLikeClick} />
      ) : (
        <AiOutlineHeart className={styles.heartIcon} onClick={foodLikeClick} />
      )}
    </div>
  )
}

export default FoodLike