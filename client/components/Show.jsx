import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Container, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../../client/styles.css';
import Comment from './Comment.jsx'

const Show = () => {

  // extract show_id from query parameter    
  //-----------------------------------------

  /* Note
  1. get the current location object from React Router
  2. create a URLSearchParams object from query string portion of the URL
  3. extract the value associated with the 'id' parameter from the query string
  */

  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const show_id = queryParams.get('id');


  // state variables   
  //-----------------------------------------

  // Show information  
  const [showInfo, setShowInfo] = useState({
    id: undefined,
    title: '',
    image: '',
    allEpisodeList: [], 
    seasons: [],
  });

  // User's watch history
  const [watchHistory, setWatchHistory] = useState({
    season: undefined,
    episode: undefined,
  });

  // User's inputs from pull-down to update watch history
  const [watchHistoryInput, setWatchHistoryInput] = useState({
    season: undefined,
    episode: undefined,
  });

  // User's inputs from comment box 
  const [commentInput, setCommentInput] = useState('');


  // side effects    
  //-----------------------------------------

  // fetches show information when component mounts or show_id changes
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

  // retrieve user's watch history for the current show when component mounts  
  useEffect(()=> {
    const fetchWatchHistory = async () => {
      try {
        const response = await fetch(`/getwatchhistory?show_id=${show_id}`); 
        if (response.ok) {
          const result = await response.json();
          setWatchHistory({
            ...watchHistory,
            season: result.season_number,
            episode: result.episode_number,
          });
        }
      } catch (error) {
        console.log('Error fetching watch history:', error);
        // TODO: Implement user-facing error handling
      }
    };
    fetchWatchHistory();
  }, []); // call the function only once when the component mounts. 


  // event handlers
  //-----------------------------------------
 
  // update watchHistoryInput state when user selects season or episode from pull-down
  const handleWatchHistoryInput = (e, field) => {
    setWatchHistoryInput({
      ...watchHistoryInput,
      [field]: e.target.value 
    })
  }

  // update commentInput state as user types in comment box 
  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  }
  
  // save user's watch history to database and update local states
  const handleSaveWatchHistory = async (e) => {
    e.preventDefault();
    try{
      const placeData = {
        showId: show_id,
        seasonNumber: watchHistoryInput.season,
        episodeNumber: watchHistoryInput.episode,
      }
      console.log('placeData ', placeData)
      const response = await fetch('/saveplace', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(placeData),
      });
      if (response.ok) {
        // update local watchHistory state
        setWatchHistory({
          ...watchHistory,
          season: watchHistoryInput.season,
          episode: watchHistoryInput.episode,
        })
        // reset local watchHistoryInput state  
        setWatchHistoryInput({
          season: undefined,
          episode: undefined,
        })
      }
    } catch (error){
        console.log('Error in handleSaveWatchHistory:', error);
    }
  }

  // save user's comment to database for current watch history 
  const handleSaveComment = async (e) => {
    e.preventDefault(); 
    try {
      const commentInfo = {
        body: commentInput,
        show_id: show_id,
        season: watchHistory.season,
        episode: watchHistory.episode,
      }
      const response = await fetch('/addcomment', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentInfo),
      })
      if (response.ok) {
        // clear comment input on successful save 
        setCommentInput('');
      } else {
        // TODO: Handle unsuccessful comment save
      }
    } catch (error) {
      console.log('Error in handleSaveComment:', error);
    }
  }


  // console logs for test 
  //-----------------------------------------
  console.log('showInfo is ', showInfo);
  // console.log('watchHistoryInput state is ', watchHistoryInput)
  // console.log('watchHistory is: ', watchHistory);
  // console.log('commentInput state is: ', commentInput)


  // return statement 
  //-----------------------------------------

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
        <h4 style={{ paddingLeft: "10px", fontFamily: "Ubuntu Condensed"}}>Which episode have you watched up to?</h4>
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
            Save your watch history
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
  
        {watchHistory.season && watchHistory.episode && (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>You've watched up to season {watchHistory.season}, episode {watchHistory.episode}</p>
        )}

        {/* render Comment component */}   
        {!watchHistory.season || !watchHistory.episode ? (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>Please save your watch history first to see comments.</p>
        ) : ( 
          <Comment 
          showId={show_id} 
          season={watchHistory.season} 
          episode={watchHistory.episode} 
          />
        )}  
      </>
    )}
  </Container>
  )
}

export default Show; 