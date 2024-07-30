import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import '../../client/styles.css';
import Comment from './Comment.jsx'

const Show = () => {
  // variable to store a show_id from path param or query param 
  // TO DO: dynamically get show_id from a previous page (dashbaord)
  const show_id = 100; // use '100' to get 'The office' show data for test 

  // state to save a show information 
  const [showInfo, setShowInfo] = useState({
    id: null,
    name: '',
    image: '',
    season_episode: {}, // nested object to save 1) season (key) and 2) object (value) of episode number + episode title 
  });

  // state to track user inputs from pull-down to select season/episode 
  const [watchHistory, setWatchHistory] = useState({
    season: null,
    episode: null,
  });
  
  // state to save user's comments for selected season/episode 
  // TODO: if a user can make a comment for selected season/episode in the comment box, add selected season/episode to the state
  const [commentInput, setCommentInput] = useState('');

  // useEffect to send a GET request to /xxx to get show information by passing show_id 
  useEffect(()=> {
    const fetchShowData = async () => {
      try {
        const response = await fetch(`/xxx?xx=${show_id}`); // TO DO: confirm endpoint 
        const result = await response.json();
        // TO DO: update property name based on API's response format 
        setShowInfo({
          ...showInfo,
          id: result.id,
          name: result.name,
          image: result.image,
          season_episode: result.season_episode, 
        }); 
      } catch (error) {
        console.log('Fetch error');
      }
    };
    fetchShowData();
  }, []);

  // function to track user inputs from pull-down, and save them to state  
  const handleWatchHistory = () => {
    // take user's input from pulldown and update state 
    
  }

  // function to track user inputs from comment box, and save them to state 
  const handleCommentInput = () => {
    // 
  }

  
  // function to send a POST request to save user's watch history (season/episode) to database
  // which is fired when a user clicks 'save' button
  const handleSaveWatchHistory = () => {
    // 
  }

  // function to save a user's comment to DB by making a POST request to /xxx 
  // which is fired when a user clicks 'comment' button 
  const handleSaveComment = () => {
    // 
  }


  return (
    <Container>


      {/* render Comment component. Passing show id, season and episode, and user's progress as props */}
      <Comment />
    </Container>
  )
}

export default Show; 


/* keep the original here (comment out to see the page)

    <Container className='showPageContainer'>
    <div className='generalInfo'style={{ border: "2px solid black", boxShadow: "1px 1px 1px red", borderRadius: "5px", maxWidth: "100%", padding: "20px"}}>
        {/* <h3 style={{display: "flex", justifyContent: "start", paddingTop: "15px", fontFamily: "Ubuntu Condensed"}}>Hi, {username}!</h3> }
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
          <h4 style={{ paddingLeft: "10px", fontFamily: "Ubuntu Condensed"}}>You are watching:</h4>
          </div>
          </div>
    </Container>
    <Form.Group
        className='seasonInput'
        controlId='seasonInput'
        style={{ display: 'flex', flexDirection: 'column'}}
    >
        <Form.Label
            style={{ fontFamily: 'Ubuntu Condesned', }}
        >
            Season
        </Form.Label>
        <Form.Select
            value=''
        >

        </Form.Select>
    </Form.Group>

*/

