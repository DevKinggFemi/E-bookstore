import Announcement from '../components/announcement';
import Navbar from '../components/navBar';
import Searchbars from '../components/Searchbar';
import Slidebar from '../components/slidebar';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../components/footer"
const Container = styled.div`
`
const Home = () => {
  const location = useLocation();
  const cat = (location.pathname.split("/")[1]);
const [filters, setFilters] = useState('');

  return (
    <div>
      <Container>
      <Navbar/>
      <Announcement/>
      <Searchbars onCreate = {setFilters} />
      <Slidebar onFilter = {filters} onCat= {cat}/>
      <Footer/>
        </Container>
    </div>
  )
}

export default Home
