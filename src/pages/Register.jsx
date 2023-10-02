import React from 'react';
import styled from 'styled-components';
import bookimage from "../storage/d2.png";
const Container =styled.div`
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
text-align: center;
display: flex;
background-image: url(${bookimage});



`
const Button =styled.button`
justify-content: center;
border-radius: 15px;
margin-top: 10px;
margin-bottom: 10px;
text-align: center ;
background-color: rgb(247, 171, 30);
width: 100px;
height: 50px;
color: white;
border: none;
cursor: pointer;

&:hover{
background-color: rgb(255, 166, 0);
}
`

const Wrapper =styled.div`
background-color: white;
box-shadow: 0 0 2px 2px  rgb(255, 166, 0,0.9) ;
width: 450px;
border-radius: 20px;
justify-content: center;
align-items: center;
text-align: center;


`
const SearchWrapper = styled.div`
align-items: center;
text-align: center;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`
const Title =styled.div`
font-size: 25px;
font-family: Georgia, 'Times New Roman', Times, serif;
font-weight: bold;
margin-top: 10px;
`
const Input =styled.input`
font-family: Arial, Helvetica, sans-serif;
padding: 5px 10px;
border-radius: 20px;
border-color: rgb(165, 42, 42);
&:hover{
    border-color: rgb(247, 4, 4);
}
`
const Agreement =styled.div`
font-family: 'Times New Roman', Times, serif;
text-align: center;
align-items: center;
justify-content: center;
padding: 20px;

`
const SearchContainer =styled.div`
margin-top: 25px;
text-align: center;
align-items: center;
padding: 10px;
`

const AuthText =styled.div`
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`

const Register = () => {
  return (
    <Container>
<Wrapper>
<SearchWrapper>
<Title>  CREATE AN ACCOUNT </Title>
     
<SearchContainer>
  
    <Input placeholder='NAME'/>
    <AuthText></AuthText>
</SearchContainer>

<SearchContainer>
    <Input placeholder='LASTNAME'/>
    <AuthText></AuthText>
</SearchContainer>

<SearchContainer>   
    <Input placeholder='EMAIL'/>
    <AuthText></AuthText>
</SearchContainer>
<SearchContainer>
    <Input placeholder='USERNAME'/>
    <AuthText></AuthText>
</SearchContainer>
<SearchContainer>
    <Input placeholder='PASSWORD'/>
    <AuthText></AuthText>
</SearchContainer>
<SearchContainer>
  
    <Input placeholder='CONFIRM PASSWORD'/>
    <AuthText></AuthText>
</SearchContainer>
<Agreement> I agree with the Terms of Service and Privacy <b>Policy </b></Agreement>
<Button>REGISTER</Button>
</SearchWrapper>
</Wrapper>


    </Container>
  )
}

export default Register;
