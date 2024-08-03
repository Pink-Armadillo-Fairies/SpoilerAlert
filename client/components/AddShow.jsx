import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardGroup, Form, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


// NOTE: we do not currently use redux store in this component. 
const AddShow = () => {

  // extract ssid from cookie     
  //-----------------------------------------

  function getCookie (name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
  
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  const ssid = getCookie('ssid');


  // create navigate for redirection 
  //-----------------------------------------
  const navigate = useNavigate();


  // state variables 
  //-----------------------------------------

  // store user's input of search query 
  const [userInput, setUserInput] = useState({
    searchQuery: '',
  });

  // store the reuslt of searching a show 
  const [searchedShow, setSearchedShow] = useState({
    id: '',
    name: '',
    image: '',
  });


  // event handlers  
  //-----------------------------------------

  // update userInput state when user types in a search box
  const handleInputChange = (e) => {
    setUserInput({
      ...userInput,
      searchQuery: e.target.value,
    });
  }
  
  // extract a result of searching show with user's search query 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Note: we currently expect to get 1 show as a fetch result 
    try {
      const response = await fetch(`/searchshows?searchQuery=${userInput.searchQuery}`);
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
      console.error("Failed to fetch show:", error);
    }
  }
  
  // save a show for user in database, and reset search box 
  const handleSaveSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`/saveusershow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchedShow),
      });
      if (response.ok) {
        setUserInput({
          searchQuery: '',
        });
        navigate('/Dashboard');
      }
    }
    catch (error) {
      console.error("Failed to save show:", error);
    }
  }


  // return statement   
  //-----------------------------------------

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
            value={userInput.searchQuery} 
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
          <Card.Img 
          variant="top" 
          src={searchedShow.image}
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'cover'
          }} 
          />
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