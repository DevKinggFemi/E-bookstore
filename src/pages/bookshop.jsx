import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/navBar";
import Productlist from "../components/productlist";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer"
const Container = styled.div`
  max-width: 1350px;
  width: 100%;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  max-width: 50%;
  background-color: hsl(0, 0%, 100%);
  @media screen and (max-width: 768px) {
    max-width: 50%;
    align-items: center;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const SlideWrapper = styled.div`
  margin-left: -6%;
  margin-top: 20px;
   @media screen and (max-width: 768px) {
    max-width: 50%;
    margin-left: 0;
  }
`;


const Bookshop = () => {
  const location = useLocation();
  const locationCategory = location.pathname.split('/')[2]
  console.log(locationCategory);
  const [selectedCategories, setSelectedCategories] = useState('');
  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        <SidebarWrapper> 
          <Sidebar onCreate ={setSelectedCategories}/>
        </SidebarWrapper>
        <MainContentWrapper>
        <SlideWrapper>
     
     <Productlist  locationCategory= {locationCategory} selectCategories={selectedCategories}  />
   </SlideWrapper>
        </MainContentWrapper>
      </ContentWrapper>
      <Footer/>
    </Container>
  );
};

export default Bookshop;
