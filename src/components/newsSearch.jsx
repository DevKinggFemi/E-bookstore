import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
display: flex;
align-items: center;
text-align: center;
justify-content: center;
border: grey;
border-width: 20px;
overflow: hidden;
`
const Wrapper = styled.div`
margin-top: 20px ;
`
const SearchContainer = styled.div`
`
const Button =styled.button`
border-radius: 15px;
margin-top: 10px;
margin-bottom: 10px;
text-align: center ;
background-color: hsl(0, 63.63636363636363%, 8.627450980392156%);
width: 100px;
height: 35px;
color: white;
border: none;
`

const Input = styled.input`
width: 5cm;
height: 40px;
text-decoration: solid;
font-family: Arial, Helvetica, sans-serif;
font-size: 20px;
border-color: #240404;
border-radius: 5cm;
text-align: center;
`
const Title = styled.div`
margin-bottom: 30px;
font-size: 40px;
font-family: Verdana, Geneva, Tahoma, sans-serif;
font-weight: bolder;
text-shadow: 20px;
`
const Text = styled.div`
margin-top: 10px;
font-size: 20px;
font-family: Georgia, 'Times New Roman', Times, serif;
`
const NewsSearch = () => {
return (
  <div>
      <Container>
<Wrapper>
  <Title>
    NEWSLETTER
  </Title>
  <SearchContainer><Input placeholder='Search'/></SearchContainer>
<Text>GET DAILY UPDATES  BY SIGNING UP</Text>
<Button>SIGN UP</Button>
</Wrapper>
      </Container>
    </div>
  )
}

export default NewsSearch;
