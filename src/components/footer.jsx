import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import styled, {keyframes} from "styled-components";

const Container = styled.div`
  background-color: hsl(0, 16.190476190476193%, 20.588235294117645%);
  color: white;
  padding: 10px 10px;
  max-width: 2800px;
  
  overflow: hidden;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
  @media (max-width: 768px) {
    
  }
`;

const BodyText = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

  @media   (max-width: 768px) {
    text-align: center;
    
  }
`;
const Left = styled.div`
margin-left: 20px;
width: 30%;
  @media (max-width: 768px) { 
    margin-left: 5px;
    text-align: center;
    width: 40%;
  }
`;
const pulseAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const Logo = styled.div`
align-items: center;
  text-align: center;
  font-family: 'cursive';
  font-size: 25px;
  font-weight: bold;  
  animation: ${pulseAnimation} 2s linear infinite;
    @media (max-width: 768px) { 
      font-size: 15px;

  }
`;

const AboutUs = styled.div`

  
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: start;
  @media  (max-width: 768px) {
    justify-content: flex-start;

  }
`;

const SocialIcons = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border-radius: 20%;
  }
`;

const Center = styled.div`
width: 25%;
margin-right: 40px;
text-align: center;

  @media  (max-width: 768px) {
   font-size: 10px;
   margin-right: 5px;
   width: 40%
   
  }
`;

const Title = styled.h2`
  font-family: 'Times New Roman', Times, serif;
  font-weight: 1000;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 14px;
   
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-left: 15px;
    flex-direction: column;
    text-align: start;
  }
`;

const Links = styled.li`
  font-weight: bold;
  margin: 5px;

  @media (max-width: 768px) {
    
    margin : 5px;
    font-size: 12px;

  }
`;
const Des = styled.body`
 text-align: left;
 @media (max-width: 768px) {
    font-size: 13px;
    margin-left: 5px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>myBOOKSTORE</Logo>
        <BodyText>
        <Left>
          <AboutUs>
            <Title>ABOUT US</Title>
           <Des>

              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Adipisci quibusdam enim excepturi quos consequatur ratione, dolorum
              quod sequi similique, exercitationem iusto consectetur. Fugit ex
              illum, animi at ipsum aspernatur repudiandae? 
           </Des>
          </AboutUs>
          <SocialContainer>
            <SocialIcons color="#3b5998">
              <Facebook />
            </SocialIcons>
            <SocialIcons color="#3f729b">
              <Instagram />
            </SocialIcons>
            <SocialIcons color="#55acee">
              <Twitter />
            </SocialIcons>
            <SocialIcons color="#cd201f">
              <YouTube />
            </SocialIcons>
          </SocialContainer>
        </Left>
        <Center>
          <Title>USEFUL LINKS</Title>
          <List>
            <Links>HOME</Links>
            <Links>BOOKSTORE</Links>
            <Links>LOGIN</Links>
            <Links>CATEGORIES</Links>
            <Links>MOST POPULAR</Links>
            <Links>NEW STOCK</Links>
            <Links>PROMO</Links>
            <Links>RECENTLY OPENED</Links>
          </List>
        </Center>
        </BodyText>
      </Wrapper>
    </Container>
  );
};

export default Footer;
