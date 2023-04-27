import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Registration from "./Registration"
import MainPage from "./MainPage"
import SearchList from "./SearchList"


const MainContainer = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/search" element={<SearchList />} />
    </Routes>
  )
}

export default MainContainer