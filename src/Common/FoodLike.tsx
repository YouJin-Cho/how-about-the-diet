import { useEffect, useState } from "react";
import { userObjProps } from "../Service/type";
import { dbService } from "../firebase";
import { useParams } from "react-router-dom";
import foodData from '../../public/food.json'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { LikeFoods } from "../Service/type";

const FoodLike = ({ userObj }:userObjProps) => {

  const { id } = useParams<{ id: string }>()
  const foodId = parseInt(id || '0', 10)
  const food = foodData.find((food) => food.id === foodId);
  const dbLikes = dbService.collection('likes');

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
  }, [foodId, userObj?.uid]);

  const foodLikeClick = () => {
    if (!userObj) return;
    const likeRef = dbLikes.doc(userObj.uid).collection('foods').doc(`${foodId}`);
    likeRef.set({
      ...food,
      like: !like
    });
    setLike(!like);
  }
  
  return (
    <div>
      {food && <img src={food.image} width='50px' height='50px'/>}
      {like ? (
        <AiFillHeart onClick={foodLikeClick} />
      ) : (
        <AiOutlineHeart onClick={foodLikeClick} />
      )}
    </div>
  )
}

export default FoodLike