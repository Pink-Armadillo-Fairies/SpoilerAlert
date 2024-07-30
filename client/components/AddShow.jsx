import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardGroup, Form, Container, Button } from 'react-bootstrap';

// NOTE: we do not currently use redux store in this component. 
const AddShow = () => {
  // state to user's input in the search bar 
  const [userInput, setUserInput] = useState({
    searchQuery: '',
  });

  // variable to store a search query 
  const query = userInput.searchQuery;

  // state to store the reuslt of searching a show
  const [searchedShow, setSearchedShow] = useState({
    id: '',
    name: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    // prevent the page from being reloaded
    e.preventDefault(); 

    // make a request to '/searchshows' with a search query as a query parameter
    // currently, we expect to get 1 show as a result 
    try {
      const response = await fetch(`/searchshows?searchQuery=${query}`);
      if (response.ok) {
        const result = await response.json();
        setSearchedShow({
          ...searchedShow,
          id: result.id,
          name: result.name,
          image: result.image.medium,
        });
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    }
  }
  
  // update 'userInput' state per user's input
  const handleInputChange = (e) => {
    setUserInput({
      ...userInput,
      searchQuery: e.target.value,
    });
  }

  const handleSaveSubmit = async (e) => {
    // make a post request to server to save the show
    // pass the id in searchedShow state to the API endpoint
    
    // prevent the page from being reloaded
    e.preventDefault(); 
    try {
      const ssid = document.cookie;
      const response = await fetch(`/saveusershow?${ssid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchedShow),
      });
    }
    catch (error) {
      // 
    }
  }

  return (
    <Container>
      <h1>Add a New Show </h1>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%' 
      }}>
        <Form onSubmit={handleSubmit} style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
        }}>
          <Form.Control 
            type="text" 
            placeholder='search for a TV show' 
            name="queryInput" 
            value={query} 
            onChange={handleInputChange} 
            style={{
              flexGrow: 1, 
              marginRight: '20px' 
            }}
          />
          <Button
            className="searchButton"
            variant="search"
            type="submit"
            style={{ border: '1px solid black' }}
          >
            Search
          </Button>
        </Form>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem', 
        marginButtom: '2rem' 
      }}>
        {searchedShow.name && (
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={searchedShow.image} />
          <Card.Body style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <Card.Title>{searchedShow.name}</Card.Title>
            <Button
              variant="primary"
              onClick={handleSaveSubmit}
              style={{ marginTop: '1rem' }}
            >
              Add this show
            </Button>
          </Card.Body>
        </Card>
        )}
      </div>

    </Container>
  )
}

export default AddShow;


  // const [filteredShows, setFilteredShows] = useState([]);

  // useEffect(() => {
  //   setFilteredShows(
  //     shows.filter(show => 
  //     show.title.includes(userInput)
  //     )
  //   );
  // }, [userInput, shows]);

//   <CardGroup>
//   {shows.map((show) => (
//     <Card key={show.id} className="m-2">
//       <Card.Body>
//         <Card.Title>{show.title}</Card.Title>
//       </Card.Body>
//     </Card>
//   ))}
// </CardGroup>