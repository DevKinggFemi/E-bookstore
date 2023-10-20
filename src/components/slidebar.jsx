import React from 'react';
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';
import { NavLink } from 'react-router-dom';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  padding: 10px; 
  overflow: hidden;
  position: absolute;
  z-index: -1;
  margin-top: 100px;
  width: 100%;
`;

const ImgContainer = styled.div`
  margin-top: 10px;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 140px;
  border: 4px solid white;
`;

const InfoContainer = styled.div``;

const Wrapper = styled.div`
  background-color: #f8fbf8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  max-width: 100%; 
  border-radius: 10px;
  margin: 0 auto;
`;


const Name = styled.div`
  font-family: cursive;
  font-size: 14px;
  margin-top: 10px;
`;

const AuthorName = styled.div`
  font-size: 12px;
  font-family: cursive;
`;

const Price = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  margin-top: 5px;
`;


const CartButton = styled.button`
  background-color: #0074CC; 
  margin-top: 5px;
  border: none;
  color: white; 
  font-weight: bold;
  padding: 10px 20px; 
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`
const LinkButtons = styled(NavLink)`
  text-decoration: none;
  color: black;
  transition: color 0.3s, opacity 0.3s;
  &:hover {
    color: #ff6600;
    opacity: 0.8;
  }
`;

const NullFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 2rem;
  text-align: center;
`;


const Slidebar = (props) => {
  register();
  const swiperElRef = useRef(true);
  const { onFilter } = props;
  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
    });
    swiperElRef.current.addEventListener('slidechange', (e) => {
    
    });
  }, [onFilter]);


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [NumFilteredProducts,setNumFilteredProducts] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
         '/products'
        );
        setProducts(res.data);
        
      } catch (err) {}
    };
    getProducts();
  }, [onFilter]);
  
  useEffect(() => {
    if (onFilter ) {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(onFilter).every(([key, value]) =>
            item[key].includes(value)
          )
          )
          ) 
          setNumFilteredProducts(
            products.filter((item) =>
              Object.entries(onFilter).every(([key, value]) =>
                item[key].includes(value)
              )
              ).length
               )   
    }
    else {
      setFilteredProducts(products)
     setNumFilteredProducts(products.length)
    }
  }, [products, onFilter]);
  const slidesPerView = getSlidesPerView(NumFilteredProducts);
console.log(NumFilteredProducts)
  function getSlidesPerView(NumFilteredProducts) {
    if (window.innerWidth <= 768) {
      return 1;
    } else if (NumFilteredProducts > 4) {
      return 3;
    } else if (NumFilteredProducts === 0) {
      return 1;
    } else {
      return NumFilteredProducts;
    }
  }
  return (
    
<Container>
       <swiper-container
      ref={swiperElRef}
   slides-per-view= {slidesPerView}   
      navigation="true"
      pagination={NumFilteredProducts}
      
      
    >
           {  NumFilteredProducts !== 0 ? (filteredProducts.map((items) => (
             <swiper-slide key= {items.id} style={{height : 380 }}>
                <LinkButtons to = {`/products/${items._id}`}>

                <Wrapper  key ={items.id}>
                  <ImgContainer>
                 <Image  src={items.Img} alt={items.Title} />
                  </ImgContainer>
                  <InfoContainer>
                    <Name >{items.Title}</Name>
                    <AuthorName  >{items.Author}</AuthorName>
                    <Price >{items.Price}$</Price> 
                    
                    <CartButton>BUY NOW</CartButton>
                  </InfoContainer>
                  </Wrapper>
                  
                </LinkButtons>
              </swiper-slide>
                 
           ))
         )  : ( <swiper-slide >
           
             <NullFilter> THIS BOOK DOES NOT EXIST RIGHT NOW</NullFilter>
          
          </swiper-slide>) }
  
      </swiper-container>
      </Container>
  );
};

export default Slidebar;