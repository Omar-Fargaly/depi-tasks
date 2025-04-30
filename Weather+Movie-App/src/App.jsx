import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Movie from "./pages/movie"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </>
  )
}

export default App
