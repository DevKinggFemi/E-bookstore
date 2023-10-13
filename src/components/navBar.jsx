import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined, Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import bookimage from '../storage/logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, user } from '../redux/userRedux';
import { clearCart } from '../redux/cartRedux';

const Container = styled.div`
  background-color: #351010;  
max-width: 2800px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

`;

const Logo = styled.img`

  width: 120px;
  height: 90px;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
 
  }
`;

const Topright = styled.div`
  display: flex;
  align-items: center;
 padding-right: 20px ;
`;
const Left = styled.div`
  width: 30%;
`;

const NavbarItem = styled(NavLink)`
margin-top: 5px;
  margin-right: 1.5rem;
  font-size: 18px;
  font-family: cursive;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease-in;

  &:hover {
    color: rgb(104, 61, 32);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    display: ${(props) => (props.mobile ? 'none' : 'inline')};
  }
`;

const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 24px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 20px;
    cursor: pointer;
    color:white;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const products = useSelector((state) => state.cart.products);

  const users = useSelector(user);
  const [menuOpen, setMenuOpen] = useState(true);

  const handleClick = () => {
    localStorage.removeItem("TOKEN");
    dispatch(logOut());
    dispatch(clearCart());
    
  };

  return (
    <Container>
      <Wrapper>
        <Left>

        <Logo src={bookimage} alt="logo" />
        </Left>
        <Topright>
          <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
            <Menu />
          </HamburgerMenu>
          <NavbarItem to="/" mobile={menuOpen} onClick={() => setMenuOpen(false)}>
            HOME
          </NavbarItem>
          <NavbarItem to="/bookshop" mobile={menuOpen} onClick={() => setMenuOpen(false)}>
            BOOKSTORE
          </NavbarItem>
          {users ? (
            <NavbarItem to="/Login" onClick={handleClick} mobile={menuOpen}>
              LOGOUT
            </NavbarItem>
          ) : (
            <NavbarItem to="/Login" mobile={menuOpen}>
              LOGIN
            </NavbarItem>
          )}
          <NavbarItem
            to="/Items"
            mobile={menuOpen}
            onClick={() => setMenuOpen(false)}
          >
            ITEMS<Badge badgeContent={quantity} color="#e7e2e2">
              <CartIcon />
            </Badge>
          </NavbarItem>
        </Topright>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
