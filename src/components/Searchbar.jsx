import React, { useState, useEffect } from 'react';
import { Search } from '@material-ui/icons';
import styled from 'styled-components';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  background-color: #f4f4f4; 
  width: 100%;
  overflow: hidden;
  position: relative;
  top: 80px;
  z-index: -1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  
  

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
   
   @media (max-width: 768px) {
   width: 95%;
   align-items:center ;
  }
`;

const FilterTitle = styled.div`
margin-top: 10px;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  @media (min-width: 768px) {
   
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  @media (max-width: 768px) {
   width: 100%;
   align-items:center ;
  }
`;


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  width: 95%;
  border: 1px solid #ccc;
  border-radius: 5px;

  background-color: white;
  margin-top: 40px;
  @media (max-width: 768px) {
   width: 95%;
   align-items:center ;
   padding: 0px;
  }
`;

const Input = styled.input`
  border: none;
  flex: 1;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  height: 33px;
  flex-direction: row;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
     @media (max-width: 768px) {
   height : 40px ;
  }
`;

const SearchBars = (props) => {
  const [filters, setFilters] = useState({});
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Author, setAuthor] = useState([]);
  const { onCreate } = props;

  const handleOnCreate = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      
    });
    
    onCreate({ ...filters, [name]: value });
  
 
  };
 
  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const res = await publicRequest.get(
          //if there is an author and category, fetch the category and author selected
             `/products`
            
        );
       
// maps the category property of the object which is an array of an array and breaks it into a singular array. A new set of array is created containing a unique set of categories avoiding repretion
        // Filter unique categories and authors
        const uniqueCat = Array.from(new Set(res.data.map((item) => item.Categories).flat()));
        setUniqueCategories(uniqueCat);

        const uniqueAuth = Array.from(new Set(res.data.map((item) => item.Author)));
        setUniqueAuthors(uniqueAuth);
setAuthor(res.data)
      
      } catch (err) {
        console.error(err);
      }
    };
    getFilteredData();
    
  }, []);

  return (
    <Container>
      <Wrapper>
        <FilterContainer>
          <FilterTitle>BOOK CATEGORIES</FilterTitle>
          <FilterSelect name="Categories" onChange={handleOnCreate}>
            <option value={Categories}>All Categories</option>
            {uniqueCategories.map((items) => (
              <option key={items} value={items}>
                {items}
              </option>
            ))}
          </FilterSelect>
        </FilterContainer>
        <FilterContainer>
          <FilterTitle>AUTHOR</FilterTitle>
          <FilterSelect name="Author" onChange={handleOnCreate}>
            <option value="">All Authors</option>
            {uniqueAuthors.map((items) => (
              <option key={items} value={items}>
                {items}
              </option>
            ))}
          </FilterSelect>
        </FilterContainer>

        <FilterContainer>
          
            <SearchContainer>
              <Input placeholder="Search for books..." />
              <SearchButton>
                <Search />
              </SearchButton>
            </SearchContainer>
      
        </FilterContainer>
      </Wrapper>
    </Container>
  );
};

export default SearchBars;
