import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MainContainer from './Components/MainContainer'

function App() {

  return (
      <BrowserRouter>
        <Header />
        <MainContainer />
        <Footer />
      </BrowserRouter>
  )
}

export default App
