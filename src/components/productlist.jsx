import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  background-color: #ffffff; 
  height : fit-content;
  min-height: 100vh;
  padding-top: 80px;
  padding-right: 10px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
   padding-top : 20px;
   padding-left: 30px;
  }
`;

const Wrapper = styled.div`
  padding: 35px;
  display: flex;
  flex-wrap: wrap; 

  gap: 10px; 
  border: 1px solid #6e1111 ;
  border-radius: 60px;
  border-color: #6e1111;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

 @media screen and (max-width: 768px) {
  padding-right: 0px;
    padding-top: 20px;
    align-items: center;
    justify-content: flex-start;
    gap: 10px; 
   width: 90%;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    column-gap: 5px;
   margin-right: 10px;
  }

`;

const ProductImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #4e3838; 
  @media screen and (max-width: 768px) {
    width: 75px;
    height: 90px;   
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 60px;
  @media screen and (max-width: 768px) {
    
  }
`;

const ProductTitle = styled.h3`
  font-size: 15px;
  margin: 0;
  width: 100px;
  @media screen and (max-width: 768px) {
    font-size: 10px;
    width: 80px;
  }
`;

const BookCategory = styled.p`
  font-size: 14px;
  margin:  0;
  width: 50px;
  max-width: 30px; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Author = styled.p`
  font-size: 12px;
  margin: 5px 0;
  width: 50px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }

`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
  @media screen and (max-width: 768px) {
    margin: 0 0;
  }
`;
const LinkButtons = styled(NavLink)`
text-decoration: none;
color: black;
transition: color 0.3s, opacity 0.3s;
&:hover {
  color: #ff6600; 
  opacity: 0.8; 
}
`;

const ProductList = ({selectCategories, locationCategory}) => {
  const [newProducts,  setNewProducts ] = useState([])
  const [bookCategories, setbookCategories] = useState([]);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const res = await publicRequest.get(
          '/products'   
        );
       setProducts(res.data)
     const sortedProducts =  (res.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        }));
        setNewProducts (sortedProducts.slice(0, 4))
     
      }catch (err) {}
    };
    getFilteredData();
  }, [ selectCategories]);
  useEffect(() => {
    if (selectCategories ) {
      setbookCategories(
        products.filter((item) =>
          item.BookshopCategories.some((category) =>
            selectCategories.includes(category)
          )
        )
      );
    }
    else if (locationCategory){
      setbookCategories(
        products.filter((item) =>
          item.Categories.some((category) =>
            locationCategory.includes(category)
          )
        )
      );

    }
    else {
      setbookCategories(products)
    }
  }, [selectCategories, locationCategory]);

 
  return (
    <Container>
        <Wrapper>

      {(selectCategories || locationCategory ) ? bookCategories.map((item) => (
          <LinkButtons to = {`/products/${item._id}`}>
          <ProductWrapper key={item.id}>
          <ProductImage  src={item.Img} alt={item.Title} />
          <ProductInfo>
            <ProductTitle >{item.Title}</ProductTitle>
         
    
            <BookCategory  >{selectCategories }</BookCategory>
        
            <Author ><div font-type='bold'>by</div> {item.Author}</Author>
            <Price >${item.Price}</Price>
          </ProductInfo>
        </ProductWrapper>
        </LinkButtons>) 
        ):
         (newProducts.map((item) => (
         
          <LinkButtons to = {`/products/${item._id}`}>
         
          <ProductWrapper key={item.id}>
          <ProductImage src={item.Img} alt={item.Title} />
          <ProductInfo>
            <ProductTitle>{item.Title}</ProductTitle>
            <BookCategory>{item.Categories[0]}</BookCategory>
            <Author>by {item.Author}</Author>
            <Price>${item.Price}</Price>
          </ProductInfo>
        </ProductWrapper>
        </LinkButtons>
        )
        
      ))}
            </Wrapper>
    </Container>
  );
};

export default ProductList;
