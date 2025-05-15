import HomePage from "./Pages/HomePage";
import Menu from "./Pages/Menu";
import CartPage from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    
      <BrowserRouter>
       <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      <Routes>
           <Route path="/register" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="/" element={<HomePage/>}/>
        
     </Routes>
      </BrowserRouter>
    
  );
}

export default App;
