import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Container, Button, Card } from 'react-bootstrap';
import '../../client/styles.css';
import Comment from './Comment.jsx'

const Show = () => {
  // variable to store a show_id from path param or query param 
  // TO DO: dynamically get show_id from a previous page (dashbaord)
  const show_id = 133; // use static number for testing

  // state to save a show information 
  const [showInfo, setShowInfo] = useState({
    id: null,
    title: '',
    image: '',
    allEpisodeList: [], 
    seasons: [],
  });

  // state to store the user's watch history
  const [watchHistory, setWatchHistory] = useState({
    season: null,
    episode: null,
  });
  
  // state to save user's comments for selected season/episode 
  // TODO: if we allow a user to make a comment for selected season/episode in the comment box, add selected season/episode to the state
  const [commentInput, setCommentInput] = useState('');

  // TODO ?: have anoter state to track user input for watch history
  const [watchHistoryInput, setWatchHistoryInput] = useState({
    season: null,
    episode: null,
  });

  // useEffect to send a GET request to /getshow API to get a show information 
  useEffect(()=> {
    const fetchShowData = async () => {
      try {
        const response = await fetch(`/getshow?show_id=${show_id}`); 
        const result = await response.json();
        setShowInfo({
          ...showInfo,
          id: result.id,
          title: result.title,
          image: result.image,
          allEpisodeList: result.allEpisodeList, 
          seasons: result.seasons,
        }); 
      } catch (error) {
        console.log('Fetch error');
      }
    };
    fetchShowData();
  }, [show_id]); // re-fetches data if show_id changes

  // useEffect to send a GET request to /xxx API to see if a user has watchHistory & update 'watchHistory' state 
  useEffect(()=> {
    const fetchWatchHistory = async () => {
      try {
        const response = await fetch(`/xxx?show_id=${show_id}`); // TO DO: confirm endpoint 
        const result = await response.json();
        // TODO: update property name based on API's response format 
        setWatchHistory({
          ...watchHistory,
          // TODO: update season and episode 
          // season: '1',
          // episode: '1',
        }); 
      } catch (error) {
        console.log('Fetch error');
      }
    };
    fetchWatchHistory();
  }, []);

  // function to track user inputs from pull-down and update 'watchHistoryInput' state 
  const handleWatchHistoryInput = (e, field) => {
    setWatchHistoryInput({
      ...watchHistoryInput,
      [field]: e.target.value 
    })
  }

  // function to track user inputs from comment box, and save them to 'commentInput' state 
  const handleCommentInput = () => {
    // 
  }
  
  // function to send a POST request to save user's watch history (season/episode) to database
  const handleSaveWatchHistory = () => {

  }

  // function to save a user's comment to DB by making a POST request to /xxx 
  // which is fired when a user clicks 'comment' button 
  const handleSaveComment = (e) => {
    console.log('handleSaveComment is invoked - save comment')
  }

  // log 'showInfo' state and first episode for test 
  console.log('showInfo is', showInfo);
  if (showInfo.seasonEpisode && showInfo.seasonEpisode.length > 0) {
    console.log(showInfo.seasonEpisode[0].episode_name);
  } else {
    console.log('No episodes available yet');
  }

  console.log('watchHistoryINput is ', watchHistoryInput)

  return (
    <Container>
      {/* display a show information */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem'
      }}>
        <h4 style={{ paddingLeft: "10px", fontFamily: "Ubuntu Condensed"}}>You are watching:</h4>
        <Card style={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
          <Card.Img 
            variant="top" 
            src={showInfo.image} 
            alt="Show image" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '600px', 
              height: 'auto' 
            }} 
          />
          <Card.Body>
            <Card.Title style={{ fontFamily: "Ubuntu Condensed" }}>{showInfo.title}</Card.Title>
          </Card.Body>
        </Card>
      </div>

      {/* display drop-down and save a user watch history (season and episode) */}
      <h4 style={{ paddingLeft: "10px", fontFamily: "Ubuntu Condensed"}}>Add your watch history:</h4>
      <Form onSubmit={handleSaveWatchHistory}>
        <Form.Select 
          value={watchHistoryInput.season}
          onChange={(e) => handleWatchHistoryInput(e, 'season')}
          style={{ marginBottom: '10px' }}
        >
          <option value="">Select Season</option>
          {showInfo.seasons.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Form.Select>
        {watchHistoryInput.season && (
          <Form.Select 
          value={watchHistoryInput.episode}
          onChange={(e) => handleWatchHistoryInput(e, 'episode')}
          style={{ marginBottom: '10px' }}
        >
          <option value="">Select Episode</option>
          {showInfo.allEpisodeList
            .filter(episode => episode.season_number === watchHistoryInput.season)
            .map((episode) => (
              <option key={episode.episode_number} value={episode.episode_number}>
                {episode.episode_number}:  {episode.episode_name}
              </option>
            ))
          }
          </Form.Select>
        )}
        
        <Button 
          type="submit" 
          disabled={!watchHistoryInput.season || !watchHistoryInput.episode}
        >
          Save
        </Button>
      </Form>

      {/* add comment box - pulldown to select season/episode to add comments */}
      <h4 style={{ paddingLeft: "10px", fontFamily: "Ubuntu Condensed"}}>Comment to the show:</h4>
      <Form.Group 
        controlId="commentBox" 
        style={{

        }}>
        <Form.Control as="textarea" rows={3} value={commentInput} onChange={handleCommentInput} />
        {/* <Button onClick={handleSaveComment}>Comment</Button> */}
      </Form.Group>

      {/* render Comment component */}      
      {watchHistory.season && (
        <Comment 
          showId={show_id} 
          season={watchHistory.season} 
          episode={watchHistory.episode} 
        />
      )}

    </Container>
  )
}

export default Show; 