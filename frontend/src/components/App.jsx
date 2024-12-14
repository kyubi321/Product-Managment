import Home from '../components/Home';
import Login from './Login';
import Register from './Register';
import EditProduct from './EditProduct';
import ViewUsers from './viewUsers';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "../App.css"


 
function App() {

  return (
    
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/view-users" element={<ViewUsers/>}/>
        </Routes>
      </BrowserRouter>
 
  )
}

export default App
