import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';


const bounceIn = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SuccessMessage = styled.div`
  font-size: 24px;
  color: #4CAF50; /* Green color */
  animation: ${bounceIn} 1.5s ease infinite;
`;

const Success = () => {
    const location = useLocation();
    console.log(location)
  return (
    <Container>
      <SuccessMessage>Success! </SuccessMessage>
    </Container>
  );
};

export default Success;
