import React from 'react';
import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import '../../client/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSeason,
  updateEpisode,
  updateMessage,
  updateWatchParty,
} from '../episodeSlice';
import WatchParty from './WatchParty.jsx'

const MainPage = () => {
  const dispatch = useDispatch();
  const episode = useSelector((store) => store.episode);
  const username = useSelector((store) => store.login.username); 
  //console.log('username', username)

  const saveView = async (input) => {
    console.log('input', input);
    try {
      console.log('updating', episode);
      const response = await fetch('/saveview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...episode, username}),
      });
      if (response.ok) {
        // const responseData = await response.json();
        // console.log('verifyUser Response:', responseData);
        //console.log(response);
        const watchParty =await response.json();
        dispatch(updateWatchParty(watchParty));
      } else {
        console.error('Save failed');
      }
    } catch (err) {
      console.error('Error with saving viewed:', err);
    }
  };

  return (
    <Container className='mainPageContainer' >
      <div className='generalInfo'style={{ border: "2px solid black", boxShadow: "1px 1px 1px red", borderRadius: "5px", maxWidth: "100%", padding: "20px"}}>
        <h3 style={{display: "flex", justifyContent: "start", paddingTop: "15px", fontFamily: "Ubuntu Condensed"}}>Hi, {username}!</h3>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
          <h4 style={{ paddingLeft: "10px", fontFamily: "Ubuntu Condensed"}}>You and your friends are currently watching:</h4>
          {/*<h4>Bridgerton</h4>*/}
        </div>
        <div>
        <img
            src='./client/assets/bridgerton.jpg'
            alt='bridgerton-picture'
            style={{ width: '15%', margin: "auto", display: "block"}}
          ></img>
        </div>
      </div>
      <Form
        className='submitWatchProgess'
        onSubmit={(e) => {
          console.log('episodestate', episode);
          e.preventDefault();
          saveView(e.target.value);
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          border: '2px solid black',
          marginTop: '10px',
          marginBottom: '10px',
          boxShadow: '1px 1px 2px red'
        }}
      >
        {/* TODO: add onChange function and value attribute */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        >
          <Form.Group
            className='seasonInput'
            controlId='seasonInput'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Form.Label
              style={{ fontFamily: 'arial', color: 'black', fontSize: '15px', fontFamily: 'Ubuntu Condensed' }}
            >
              Season
            </Form.Label>
            <Form.Control
              type='text'
              value={episode.season}
              onChange={(e) => dispatch(updateSeason(e.target.value))}
            />
          </Form.Group>
          <Form.Group
            className='episodeInput'
            controlId='episodeInput'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Form.Label
              style={{ fontFamily: 'arial', color: 'black', fontSize: '15px', fontFamily: 'Ubuntu Condensed' }}
            >
              Episode
            </Form.Label>
            <Form.Control
              type='text'
              value={episode.episode}
              onChange={(e) => dispatch(updateEpisode(e.target.value))}
            />
          </Form.Group>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
          }}
        >
          <Form.Group
            className='commentInput'
            controlId='commentInput'
            style={{ display: 'flex', flexDirection: 'column', width: '90%' }}
          >
            <Form.Label
              style={{ fontFamily: 'Ubuntu Condensed', color: 'black', fontSize: '15px' }}
            >
              What do you think of this episode? Write your comments:
            </Form.Label>
            <Form.Control
              as='textarea'
              value={episode.message}
              rows={3}
              onChange={(e) => dispatch(updateMessage(e.target.value))}
            />
          </Form.Group>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
          <Button
            className='saveInput'
            variant='watchUpdate'
            type='submit'
            style={{ width: '30%', display: 'flex', justifyContent: 'center', border: '1px solid black'}}
          >
            Save
          </Button>
        </div>
      </Form>
      <WatchParty/>
    </Container>
  );
};

export default MainPage;
