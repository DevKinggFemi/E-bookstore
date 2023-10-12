
import { loginFailure, loginStart, loginSuccess, registerSuccess } from "./userRedux"
import {  publicRequest , userRequest} from "../requestMethods";
import { updateCart} from "./cartRedux";
import axios from "axios";
export const login = async (dispatch, user) =>{

dispatch (loginStart());

try {
    const res = await axios.post('/userauthentication/login', user) 
    dispatch(loginSuccess(res.data)); 

 localStorage.setItem('userId',res.data._id) ;
  localStorage.setItem('TOKEN',res.data.accessToken) ;
 const TOKEN = localStorage.getItem('TOKEN')
 
}catch (err){
    dispatch(loginFailure())
}
}
export const Register = async (dispatch, user) =>{

dispatch (loginStart());
try {
    const res = await axios.post('/userauthentication/register', user,) 
    dispatch(registerSuccess(res.data));
   
}catch (err){
    dispatch(loginFailure())
}
}


export const fetchCart = async (dispatch) => {
    try {
      const userId = localStorage.getItem('userId');
      const TOKEN = localStorage.getItem("TOKEN")
  
    const res = await axios.get(`/cart/find/${userId}`
    );
    dispatch(updateCart(res.data.products));

  } catch (error) {
    
    console.error('Error fetching cart:', error);
 
  }
};
