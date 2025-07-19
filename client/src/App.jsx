import { BrowserRouter as Router, Route, Routes, Link, } from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"

function App() {
 
  return (
   <div>
   <Link to={'/createpost'}>Create a post</Link>
   <Link to={'/'}>Home Page</Link>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
      </Routes>
   </div>
  )
}

export default App
