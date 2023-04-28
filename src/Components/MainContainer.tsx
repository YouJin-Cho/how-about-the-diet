import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Registration from "./Registration"
import MainPage from "./MainPage"
import DetailFood from "./DetailFood"


const MainContainer = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/detail" element={<DetailFood />} />
    </Routes>
  )
}

export default MainContainer