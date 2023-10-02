import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
const Container = styled.div`
  background-color: #ffffff; 
  color: #6e1111; 
  max-height: auto;
  max-width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
`;
const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap; 
  gap: 70px; 
  max-height: auto;
  
 max-width:100%;
 @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-width: 5cm;
    gap: 5px; 
  }

`;

const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  width: 80%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    

  }

`;

const ProductImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #4e3838; /* Darker border color */
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 60px;
`;

const ProductTitle = styled.h3`
  font-size: 15px;
  margin: 0;
`;

const BookCategory = styled.p`
  font-size: 14px;
  margin:  0;
  max-width: 30px; 
  white-space: nowrap; 
  text-overflow: ellipsis;
`;

const Author = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
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
        setNewProducts (sortedProducts.slice(0, 6))
     
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
