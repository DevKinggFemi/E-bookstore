import Home from "./pages/home";
import Bookshop from "./pages/bookshop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewsLetter from "./pages/NewsLetter";
import Items from "./pages/Items";
import Products from "../src/components/products";
import Success from "./components/Success";
import {BrowserRouter , Routes,Route,  Navigate } from "react-router-dom";
import CANCEL from "./components/cancel";
import { useSelector } from "react-redux";
import { user } from "./redux/userRedux";
import styled from "styled-components";
function App() {
  const User = useSelector(state => state.user.currentUser);
  
return  (
  <BrowserRouter>
<Routes>
  <Route exact path="/" element={<Home/>}></Route>
  <Route path="/bookshop" element={<Bookshop/>}></Route>
  <Route path="/bookshop/:Categories" element={<Bookshop/>}></Route>
  <Route path="/products/:id" element={<Products/>}></Route>
  <Route path="/Register"  element = {User ? <Navigate to = "/"/> : <Register/>}></Route>
  <Route path="/Login" element = {User ? <Navigate to= "/"/> : <Login/>}></Route>
  <Route path="/Items" element={<Items/>}></Route>
  <Route path="/Items/success" element={<Success/>}></Route>
  <Route path="/Items/cancel" element={<CANCEL/>}></Route>
  </Routes>
  </BrowserRouter>
  

)
};

export default App;
