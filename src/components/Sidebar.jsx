import React, { useState, useEffect } from 'react';
import { publicRequest, userRequest } from '../requestMethods';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  max-width: 80%;
  overflow: auto; 
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-width: 100%
  }
`;

const Text = styled.div`
  font-family: cursive;
  font-weight: bold;
  text-align: center;
`;

const Subtext = styled.button`
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
      <ul>
        {bookStoreCategories.map((BookshopCategories) => (
          <Subtext
            key={BookshopCategories}
            onClick={() => handleChange(BookshopCategories)}
          >
            {BookshopCategories}
          </Subtext>
        ))}
      </ul>
    </Container>
  );
};

export default Sidebar;
