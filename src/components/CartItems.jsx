import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import { userRequest} from '../requestMethods';
import { removeProduct } from '../redux/cartRedux';
import { user } from '../redux/userRedux';
import axios from 'axios';
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100vh;
 min-height: fit-content;
 padding-top: 50px;

`;

const TitleTag = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0 2px 2px brown;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.img`
  width: 150px;

  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Des = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BookDes = styled.div`
  font-size: 15px;
`;

const AuthorName = styled.div`
  font-size: 12px;
  color: #777;
`;

const YearReleased = styled.div`
  font-size: 12px;
  color: #777;
`;

const PriceDes = styled.div`
  font-size: 24px;
  font-family: 'Times New Roman', Times, serif;
  padding: 15px 0;
`;

const Quantity = styled.div`
  font-size: 14px;
  color: #666;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const RemoveButton = styled.button`
  border: none;
  height: 30px;
  margin-top: 15px;
  border-radius: 10px;
  color: white;
  background-color: rgb(238, 52, 52);
  font-weight: 1000;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(180, 8, 8);
  }
`;

const SummaryContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 50px;
  width: 100%;
  
`;

const SummaryTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CartItems = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const users = useSelector(user);
  const dispatch = useDispatch();
  const TOKEN = localStorage.getItem('TOKEN');
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total,
          currency: "usd"
        });
        if (res.data.status === "succeeded") {
          navigate('/Items/success');
        } else {
          navigate('/ERROR');
        }
      } catch {}
    };
    stripeToken && cart.total > 2 && makeRequest();
  }, [stripeToken, cart.total]);

  const handleDeleteCart = (ProductId) => {
 
    dispatch(removeProduct(ProductId));
   const userId = localStorage.getItem('userId');
   deleteUserItem(ProductId,userId);
  };
   const deleteUserItem = async (ProductId,userId) => {
       
        
      try {
        const res = await axios.delete(`/cart/${userId}/${ProductId}`);
      } catch (err) {}
    };
 
  

  return (
    <Container>
      {cart.products.map((product) => (
        <Wrapper key={product._id}>
          <ImageWrapper src={product.Img} alt={product.Title} />
          <Des>
            <TitleTag>Title:</TitleTag>
            <BookDes>{product.Title}</BookDes>
            <AuthorName>Author:</AuthorName>
            <YearReleased>Year of Release: 1998</YearReleased>
            <PriceDes>COST:${product.Price * product.quantity}</PriceDes>
            <Quantity>Quantity: {product.quantity}</Quantity>
            <ButtonWrapper>
             
              <RemoveButton onClick={() => handleDeleteCart(product.ProductId)}>REMOVE</RemoveButton>
            </ButtonWrapper>
          </Des>
        </Wrapper>
      ))}
      <SummaryContainer>
        <SummaryTitle>Cart Summary</SummaryTitle>
        <p>Total Items: {cart.quantity}</p>
        <p>Total Price: ${cart.total}</p>
        {cart.total? 
        <StripeCheckout
          stripeKey={KEY}
          name="Book Shop"
          billingAddress
          shippingAddress
          description={`Your total is $${cart.total}`}
          amount={cart.total * 100}
          token={onToken}
          disabled ={!user || cart.total === 0}
        />
: null}
      </SummaryContainer>
    </Container>
  );
};

export default CartItems;
