
import { loginFailure, loginStart, loginSuccess, registerSuccess } from "./userRedux"
import {  publicRequest, userRequest } from "../requestMethods";
import { updateCart} from "./cartRedux";

export const login = async (dispatch, user) =>{

dispatch (loginStart());
console.log(user)
try {
    const res = await publicRequest.post('/userauthentication/login', user) 
    dispatch(loginSuccess(res.data));
  console.log(res.data)
 
  console.log(res.data._id)
  console.log(res.data.accessToken)

 localStorage.setItem('userId',res.data._id) ;
 localStorage.setItem('TOKEN',res.data.accessToken) ;
}catch (err){
    dispatch(loginFailure())
}
}
export const Register = async (dispatch, user) =>{

dispatch (loginStart());
try {
    const res = await userRequest.post('/userauthentication/register', user) 
    dispatch(registerSuccess(res.data));
   
}catch (err){
    dispatch(loginFailure())
}
}


export const fetchCart = async (dispatch) => {
    try {
      const userId = localStorage.getItem('userId');
    const headers = {
      token: `Bearer ${localStorage.getItem('TOKEN')}`, 
    };
    const res = await userRequest.get(`/cart/find/${userId}`, 
    );

  
    console.log(res.data);
    dispatch(updateCart(res.data.products));
  } catch (error) {
    
    console.error('Error fetching cart:', error);
 
  }
};
