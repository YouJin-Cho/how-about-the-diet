import { Route, Routes } from "react-router-dom"
import MainPage from "./MainPage"
import DetailFood from "./DetailFood"
import Nutrients from "./Nutrients"
import DetailNutrients from "./DetailNutrients"
import MyPage from "./MyPage"
import SearchFoodList from "./SearchFoodList"
import FreeTalking from "./FreeTalking"
import { userObjProps } from "../Service/type"
import { useEffect, useState } from "react"
import { authService } from "../firebase"
import firebase from "../firebase"

const MainContainer = ({ isLoggedIn }: userObjProps) => {

  const [userObj, setUserObj] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUserObj(user)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Routes>
      {
        isLoggedIn ? (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/nutrients/:id" element={<DetailNutrients />} />
            <Route path="/detail/:id" element={<DetailFood userObj={userObj}/>} />
            <Route path="/search/:searchTerm" element={<SearchFoodList />} />
            <Route path="/mypage" element={<MyPage userObj={userObj} />} />
            <Route path="/FreeTalking" element={<FreeTalking userObj={userObj} />} />
          </>
        ) : (
          <>
          </>
        )
      }
    </Routes>
  )
}

export default MainContainer