import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardGroup, Form, Container, Button } from 'react-bootstrap';

const AddShow = () => {

  // create a state to track what a user typed 

  const [userInput, setUserInput] = useState({
    searchQuery: '',
  });

  const query = userInput.searchQuery;

  // test component 
  const [shows, setShows] = useState([{
    id: 'test',
    title: 'test'
    }
  ]);

  const [filteredShows, setFilteredShows] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // make a request to endpoint to get a list of shows 
    try {
      // testing request 
      const response = await fetch("/shows");
      const result = await response.json();
      console.log('result is', result)
      setShows(result); // Set shows with the result


        // useEffect(() => {
        //   setFilteredShows(
        //     shows.filter(show => 
        //     show.title.includes(userInput)
        //     )
        //   );
        // }, [userInput, shows]);
    

    } catch (error) {
      console.error("Failed to fetch shows:", error);
    }
    
    // if response is ok, update 'filteredShows' state 

  }

  console.log('shows', shows)

  const handleInputChange = (e) => {
    setUserInput({
      ...userInput,
      searchQuery: e.target.value,
    });
  }

  console.log('userInput state is ', userInput)

  // TODO in return: 
  // add a 'search' button 
  // add a cardgroup to show a filtered result 

  return (
    <Container>
      <h1>Add a New Show </h1>
      <Form className='searchBox' onSubmit={handleSubmit}>
        <Form.Group
          className="queryInput"
          controlId="queryInput"
          name="queryInput"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Form.Control type="text" placeholder='search query' name="queryInput" value={query} onChange={handleInputChange} />
        </Form.Group>
        <Button
          className="searchButton"
          variant="search"
          type="submit"
          style={{ border: '1px solid black' }}
        >
          Search
        </Button>
      </Form>
      <CardGroup>
      {shows.map((show) => (
        <Card key={show.id} className="m-2">
          <Card.Body>
            <Card.Title>{show.title}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
    </Container>
  )
}

export default AddShow;