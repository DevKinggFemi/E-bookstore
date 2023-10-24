import React, { useState, useEffect } from 'react';
import { publicRequest, userRequest } from '../requestMethods';
import styled from 'styled-components';

import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

const Container = styled.div`
  background-color: none;
 
  width: 80% ;
  min-height: fit-content;
  padding-top: 100px;
  overflow: hidden;
  @media screen and  (max-width: 768px) {
width: 100%;
padding-top: 80px;
padding-left: 0px;
  }
`;

const Text = styled.div`
  font-family: cursive;
font-size: 12px;
  text-align: center;
  @media screen and  (max-width: 768px) {
    display: none;
 
  }
`;
const Arrow = styled.div`
margin-top: -2px;

  
`;

const SubTextContainer = styled.div `
display:flex;
flex-direction: column;
@media screen and (max-width: 768px) {
  display: ${(props) => (props.mobile ? 'none' : 'inline')};
  width: 100%;
  margin-top: 40px;
  transition: height 5s ease-in;
  transform: translateX(0%);
  position: fixed;
  height: 100vh;
  background-color: white;  
   z-index: 1;
  }
`;

const Subtext = styled.button`
text-align: center;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  border: none;
  font-size: 14px; 
  background-color: white;
  transition:  0.2s, color 0.2s;
  &:hover {
    background-color: #ffe0b2;
    color: rgb(255, 102, 0, 0.8);
  }
`;
const FilterButton = styled.button`
display: none;
@media screen and (max-width: 768px) {
  transform: translateX(0%);
 
  position: fixed;
  z-index: 1;
 display: flex;
  width: 100%;
  border: none;
  font-size: 16px;
  background-color: rgb(255, 102, 0);
  color: white;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: rgba(255, 102, 0, 0.829);
  }
}
`;

const Sidebar = ({ onCreate }) => {
  const [newCategories, setNewCategories] = useState('');
  const [bookStoreCategories, setBookStoreCategories] = useState([]);
 const [filterOpen, setFilterOpen] = useState(true); 
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          newCategories
            ? `/products?BookshopCategories=${newCategories}`
            : '/products'
        );

        const dataResponse = res.data.map((item) => item.BookshopCategories);
        setBookStoreCategories([...new Set(dataResponse.flat())]);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [newCategories]);

  const toggleFilter = () => {
    // Toggle the filter options open/close
    setFilterOpen(!filterOpen);
    
  };

  const handleChange = (selectedCategory) => {
    setNewCategories(selectedCategory);
    onCreate(selectedCategory);
    setFilterOpen(true);
  };

  return (
    <Container>
      <Text><p>STORE</p>
         <p>CATEGORIES</p></Text>
         <FilterButton   onClick={toggleFilter}>Filter Options {filterOpen? <Arrow><ArrowDropDown/></Arrow>: <Arrow><ArrowDropUp/></Arrow>} </FilterButton>
       <SubTextContainer  mobile= {filterOpen}>
        {bookStoreCategories.map((BookshopCategories) => (
          <Subtext
          mobile= {filterOpen}
          key={BookshopCategories}
          onClick={() => handleChange(BookshopCategories)}
          >
            {BookshopCategories}
          </Subtext>
        ))}
        </SubTextContainer>
    
    </Container>
  );
};

export default Sidebar;
