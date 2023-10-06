import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Register, login } from '../redux/apiCalls';
import bookimage from "../storage/d5.png";


import { fetchCart } from '../redux/apiCalls';
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  max-width: 2800px;
  display: flex;
  background-image: url(${bookimage});
`;

const Wrapper = styled.div`
  box-shadow: 0 0 2px 2px rgb(255, 166, 0, 0.9);
  width: 90%;
  max-width: 400px;
  min-height: 380px;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: #ffffffe1;
  padding: 20px;
  border-radius: 10px;
`;

const Button = styled.button`
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  background-color: rgb(247, 171, 30);
  width: 100px;
  height: 35px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(255, 166, 0);
  }
`;

const Title = styled.div`
  font-size: 25px;
  font-family: cursive;
  font-weight: bold;
`;

const Input = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 20px;
  border: 2px solid rgb(165, 42, 42);
  flex: 1;
  &:hover {
    border-color: rgb(247, 4, 4);
  }
`;

const Agreement = styled.div`
  font-family: 'Times New Roman', Times, serif;
  padding: 5px 5px;
`;

const SearchContainer = styled.div`
  flex-direction: column;
  padding: 10px;
`;

const LoadingCircle = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #f7ab1e;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const BackToHomepageButton = styled.button`
  border: none;
  background-color: transparent;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 15px;
  font-size: 16px;
  &:hover {
    color: #555;
  }
`;

const Login = () => {
  const { isFetching, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
 
  const dispatch = useDispatch();
  
  
  const handleClick = async () => {
    try {
      await login(dispatch, { username, password });
      await dispatch(fetchCart());
    } catch (error) {
     
      console.error("Error:", error);
    }
  };
  
  const handleRegister = () => {
    setRegister(true);
  };

  const handleSubmit = () => {
    Register(dispatch, { username, password, email });
  };

  return (
    <Container>
      <Wrapper>
        {register === false ? <Title>LOGIN</Title> : <Title>REGISTER</Title>}
        <SearchContainer>
          <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        </SearchContainer>
        <SearchContainer>
          <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
        </SearchContainer>
        <SearchContainer>
          {register === true && (
            <Input placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
          )}
        </SearchContainer>
        <Agreement> I agree with the Terms of Service and Privacy <b>Policy</b></Agreement>
        {error ? <Agreement>Unable to login</Agreement> : null}
        {register === false ? (
          <>
            <Button onClick={handleRegister}>Register</Button>
            <p>OR</p>
            <Button onClick={handleClick} disabled={isFetching}>
              {isFetching  ? (
                <LoadingCircle />
              ) : (
                "LOGIN"
              )}
            </Button>
          </>
        ) : (
          <Button onClick={handleSubmit} disabled={isFetching}>
            {isFetching ? (
              <LoadingCircle />
            ) : (
              "SUBMIT"
            )}
          </Button>
        )}
        <BackToHomepageButton onClick={() => window.location.href = '/'}>Back to Homepage</BackToHomepageButton>
      </Wrapper>
    </Container>
  );
};

export default Login;
