import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import PageLayout from "./Layouts/PageLayout"


function App() {

  return (
  <>
  <PageLayout>

    <Routes>
      <Route path="/" element={<HomePage/>} />
    </Routes>
  </PageLayout>
  </>
  )
}

export default App
