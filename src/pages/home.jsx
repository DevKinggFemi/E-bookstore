import Announcement from '../components/announcement';
import Navbar from '../components/navBar';

import Slidebar from '../components/slidebar';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../components/footer"
import SearchBars from '../components/Searchbar';
const Container = styled.div`
max-width: 2800px;
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
     <SearchBars onCreate = {setFilters} />
     <Slidebar onFilter = {filters} onCat= {cat} />
   <Footer/>
        </Container>
    </div>
  )
}

export default Home
