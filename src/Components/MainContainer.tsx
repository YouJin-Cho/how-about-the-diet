import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Registration from "./Registration"
import MainPage from "./MainPage"
import DetailFood from "./DetailFood"
import Nutrients from "./Nutrients"
import DetailNutrients from "./DetailNutrients"
import firebase from "firebase/compat"


interface MainContainerProps {
  isLoggedIn: boolean
}

const MainContainer = (props:MainContainerProps) => {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/nutrients" element={<Nutrients />} />
      <Route path="/detailnutrients" element={<DetailNutrients />} />
      <Route path="/detail" element={<DetailFood />} />
    </Routes>
  )
}

export default MainContainer