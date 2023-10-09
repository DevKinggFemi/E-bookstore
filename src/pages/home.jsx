import Announcement from '../components/announcement';
import Navbar from '../components/navBar';
import Searchbars from '../components/Searchbar';
import Slidebar from '../components/slidebar';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../components/footer"
import Sidebar from '../components/Sidebar';
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
      <Searchbars/>
      <Slidebar/>
      <Footer/>
        </Container>
    </div>
  )
}

export default Home
