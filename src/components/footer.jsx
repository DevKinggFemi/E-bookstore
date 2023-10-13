import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.footer`
  background-color: hsl(0, 16.190476190476193%, 20.588235294117645%);
  color: white;
  padding: 30px 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 2800px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Left = styled.div`
  text-align: left;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const Logo = styled.div`
  font-family: 'cursive';
  font-size: 30px;
  font-weight: bold;
`;

const AboutUs = styled.div`
  margin-top: 20px;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;

  @media screen and (min-width: 768px) {
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
  cursor: pointer;
`;

const Center = styled.div`
  margin-top: 20px;
margin-left: 60px;
  @media screen and (min-width: 768px) {
    margin-top: 0;
  }
`;

const Title = styled.h2`
  font-family: 'Times New Roman', Times, serif;
  font-weight: 1000;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Links = styled.li`
  font-weight: bold;
  margin: 5px;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>myBOOKSTORE</Logo>
          <AboutUs>
            <Title>ABOUT US</Title>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Adipisci quibusdam enim excepturi quos consequatur ratione, dolorum
              quod sequi similique, exercitationem iusto consectetur. Fugit ex
              illum, animi at ipsum aspernatur repudiandae?
            </p>
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
      </Wrapper>
    </Container>
  );
};

export default Footer;
