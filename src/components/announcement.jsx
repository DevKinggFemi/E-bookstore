import styled from "styled-components";
import { Link } from "react-router-dom";
import bookimage from "../storage/d4.png";

const Container = styled.div`
position: relative;
top: 80px;
z-index: -1;
width: 100%;
overflow: wrap;
`;

const Textsub = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: white;

`;

const Wrapper = styled.div`
  background-image: url(${bookimage});
  height: 100vh; 
  background-size: cover; 
  display: flex;
  align-items: center;
`;

const Texting = styled.div`
  max-width: 600px;
  background-color: rgba(24, 13, 13, 0.3);
  border-radius: 200px;
  text-align: center;
  padding: 20px;
  margin: 0 auto;
`;


const TextWrapper = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 2rem; 
  color: #FFFFF0;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 15px;
  text-align: center;
  border-radius: 50px;
  width: 250px;
  height: 50px;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: Georgia, 'Times New Roman', Times, serif;
  background-color: rgb(255, 102, 0);
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    font-size: 1.5rem; 
    width: 270px;
    height: 53px;
    background-color: rgb(255, 166, 0);
  }
`;

const Announcement = () => {
  return (
    <Container>
      <Wrapper>
        <Texting>
          <TextWrapper>YOUR ONE STOP SHOP FOR BOOKS</TextWrapper>
          <Textsub>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
            eligendi, sunt dolores porro officiis natus, enim delectus
            perspiciatis neque dolore animi illum deleniti blanditiis ducimus
            ex, ab cum! Neque, eaque?
          </Textsub>
          <Link to="bookshop">
            <Button>SHOP NOW!</Button>
          </Link>
        </Texting>
      </Wrapper>
    </Container>
  );
};

export default Announcement;
