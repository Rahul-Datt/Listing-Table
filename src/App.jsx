import Create from "./Create";
import Home from "./Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
