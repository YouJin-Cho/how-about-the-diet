import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Registration from "./Registration"
import MainPage from "./MainPage"
import DetailFood from "./DetailFood"
import Nutrients from "./Nutrients"
import DetailNutrients from "./DetailNutrients"
import MyPage from "./MyPage"
import SearchFoodList from "./SearchFoodList"

interface MainContainerProps {
  isLoggedIn: boolean
}

const MainContainer = (props:MainContainerProps) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/nutrients" element={<Nutrients />} />
      <Route path="/nutrients/:id" element={<DetailNutrients />} />
      <Route path="/detail/:id" element={<DetailFood />} />
      <Route path="/search/:searchTerm" element={<SearchFoodList />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default MainContainer