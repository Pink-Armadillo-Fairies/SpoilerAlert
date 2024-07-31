import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Container, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../../client/styles.css';
import Comment from './Comment.jsx'

const Show = () => {
  // get show's id from query paramter 
  const location = useLocation(); 
  // Use URLSearchParams to parse the query string
  const queryParams = new URLSearchParams(location.search);
  const show_id = queryParams.get('id');

  // const show_id = 133; // use static number for testing

  // state to save a show information 
  const [showInfo, setShowInfo] = useState({
    id: null,
    title: '',
    image: '',
    allEpisodeList: [], 
    seasons: [],
  });

  /* use this 'watchHistory' state if we want to separate states to manage 'save watch history' and 'make comment'
  // state to store the user's watch history
  const [watchHistory, setWatchHistory] = useState({
    season: null,
    episode: null,
  // });
  */

  // state to save user's comments for selected season/episode 
  const [commentInput, setCommentInput] = useState('');

  // state to save user input of watch history (season and episode) from pull-downs. 
  // this state is also reffered to 1) save user's watch history and 2) make a comment to a show
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

  // useEffect to send a GET request to /xxx API to see if a user has watchHistory, and update 'watchHistoryInput' state 
  useEffect(()=> {
    const fetchWatchHistory = async () => {
      try {
        const response = await fetch(`/xxx?show_id=${show_id}`); // TO DO: confirm endpoint 
        const result = await response.json();
        // TODO: update property name based on API's response format 
        setWatchHistoryInput({
          ...watchHistoryInput,
          // TODO: update season and episode 
          // season: '1',
          // episode: '1',
        }); 
      } catch (error) {
        console.log('Fetch error');
      }
    };
    fetchWatchHistory();
  }, []); // call the function only once when the component mounts. 

  // function to track user inputs from pull-down and update 'watchHistoryInput' state 
  const handleWatchHistoryInput = (e, field) => {
    setWatchHistoryInput({
      ...watchHistoryInput,
      [field]: e.target.value 
    })
  }

  // function to track user inputs from comment box, and save them to 'commentInput' state 
  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  }
  
  // function to send a POST request to save user's watch history (season/episode) to database
  const handleSaveWatchHistory = async () => {
    e.preventDefault();
    try{
      const placeData = {
        showId: show_id,
        seasonId: watchHistoryInput.season,
        episodeID: watchHistoryInput.episode,
      }
      const response = await fetch('/saveplace', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          body: JSON.stringify({})
        }
      });
      if(response.ok) {
        // 
      }

    } catch (error){
        console.log('Error in handlWatchSaveHistory');
    }

  }

  // function to save a user's comment to DB by making a POST request to /xxx 
  // which is fired when a user clicks 'comment' button 
  const handleSaveComment = async () => {
    try {
      const commentInfo = {
        body: commentInput,
        show_id: show_id,
        season: watchHistoryInput.season,
        episode: watchHistoryInput.episode,
      }
      const response = await fetch('/xxxx', { //TODO: update the endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentInfo),
      })

    } catch (error) {
      console.log('Fetch error')
    }
    
  }

  // log 'showInfo' state and first episode for test 
  // console.log('showInfo is', showInfo);
  // if (showInfo.allEpisodeList && showInfo.allEpisodeList.length > 0) {
  //   console.log(showInfo.allEpisodeList[0].episode_name);
  // } else {
  //   console.log('No episodes available yet');
  // }

  console.log('watchHistoryInput state is ', watchHistoryInput)
  console.log('commentInput state is: ', commentInput)

  return (<Container>
    {/* guide a user to dashboard if no show is selected */}
    {!show_id ? (
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>No show selected. Please choose a show from the dashboard.</p>
    ) : (
      <>
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
        <Form onSubmit={handleSaveComment}>
          <Form.Group controlId="commentBox">
            <Form.Control as="textarea" rows={3} value={commentInput} onChange={handleCommentInput} />
          </Form.Group>
          <Button 
            type="submit" 
            disabled={!commentInput}
          >
            Save
          </Button>
        </Form>
  
        {/* render Comment component */}      
        {watchHistoryInput.season && (
          <Comment 
            showId={show_id} 
            season={watchHistoryInput.season} 
            episode={watchHistoryInput.episode} 
          />
        )}
      </>
    )}
  </Container>
  )
}

export default Show; 