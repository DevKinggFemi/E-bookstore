import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Register, login } from '../redux/apiCalls';
import bookimage from "../storage/back.png";
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { fetchCart } from '../redux/apiCalls';

const Container = styled.div`
  background-size: cover;
  min-height: 100vh;
  min-width: fit-content;
  justify-content: center;
  align-items: center;
  max-width: 2800px;
  display: flex;
  background-image: url(${bookimage});
`;

const Wrapper = styled.div`
  box-shadow: 0 0 2px 2px rgb(255, 166, 0, 0.9);
  width: 30%;
  height: 100%;
  min-width: 400px;
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
  border: none;
  outline: none;
  flex: 1;
  user-select: none;
`;

const Agreement = styled.div`
  font-family: 'Times New Roman', Times, serif;
  padding: 5px 5px;
`;

const SearchContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  margin-bottom: 15px;
  width: 60%;
  height: 100px;
  border-radius: 20px;
  border: 2px solid rgb(165, 42, 42);
  flex: 1;
  &:hover {
    border-color: rgb(247, 4, 4);
  }
  display: flex;
  gap: 0.1rem;
  background-color: white;
  margin-top: 40px;
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PasswordToggle = styled.div`
  cursor: pointer;
  user-select: none;
  color: #000000;
  font-size: 10px;
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
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const dispatch = useDispatch();

  const handleClick = () => {
    login(dispatch, { username, password })
      .then(() => {
        // The user has successfully logged in; now fetch the cart
        fetchCart(dispatch);
      })
      .catch((error) => {
        // Handle login errors here if needed
        console.error('Login failed:', error);
        setErrorMessage('Invalid username or password.'); 
      });
  };

  const handleRegister = () => {
    setRegister(true);
  };

  const handleSubmit = () => {
    // Validate password, username, and email
    if (!passwordValidation(password)) {
      setErrorMessage('Password must contain at least one number, one alphabet, and one punctuation.');
    } else if (username === email) {
      setErrorMessage('Username and email cannot be the same.');
    } else if (!emailValidation(email)) {
      setErrorMessage('Invalid email format.');
    }else if (error) {
      setErrorMessage('There is a problem  with  registration , kindly contact our customer care');
    } else {
      Register(dispatch, { username, password, email });
    }
  };

  // Function to validate email format
  const emailValidation = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Function to validate password format (at least one number, one alphabet, one punctuation)
  const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s])/;
    return passwordRegex.test(password);
  };

  return (
    <Container>
      <Wrapper>
        {register === false ? <Title>LOGIN</Title> : <Title>REGISTER</Title>}
        <SearchContainer>
          <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        </SearchContainer>
        <SearchContainer>
          <Input
            placeholder='Password' class = "no-outline"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </PasswordToggle>
        </SearchContainer>
        {register === true && (
          <SearchContainer>
            <Input placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
          </SearchContainer>
        )}
        {errorMessage && <Agreement>{errorMessage}</Agreement>}
        {register === false ? (
          <>
            <Button onClick={handleRegister}>Register</Button>
            <p>OR</p>
            <Button onClick={handleClick} disabled={isFetching}>
              {isFetching ? (
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
