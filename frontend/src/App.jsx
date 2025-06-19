import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import { Routes, Route, BrowserRouter } from "react-router"

function App() {


  return (
    <BrowserRouter>
    <div data-theme='forest'>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
