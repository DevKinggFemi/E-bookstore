import React, { useState, useEffect } from 'react';
import { publicRequest, userRequest } from '../requestMethods';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  width: 300px ;
  min-height: fit-content;
  @media screen and (max-width: 768px) {
    padding: 5px;
  width: 150px ;
  }
`;

const Text = styled.div`
  font-family: cursive;
font-size: 12px;
  text-align: center;

`;

const SubTextContainer = styled.div `
display: flex;
flex-direction: column;


`;
const Subtext = styled.button`
text-align: center;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  border: none;
  font-size: 14px; 
  background-color: white;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background-color: #ffe0b2;
    color: rgb(255, 102, 0, 0.8);
  }
`;

const Sidebar = ({ onCreate }) => {
  const [newCategories, setNewCategories] = useState('');
  const [bookStoreCategories, setBookStoreCategories] = useState([]);

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

  const handleChange = (selectedCategory) => {
    setNewCategories(selectedCategory);
    onCreate(selectedCategory);
  };

  return (
    <Container>
      <Text><p>STORE</p>
         <p>CATEGORIES</p></Text>
      
         <SubTextContainer>

        {bookStoreCategories.map((BookshopCategories) => (
          <Subtext
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
