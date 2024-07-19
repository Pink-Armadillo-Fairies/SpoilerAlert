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
    <Container className='mainPageContainer'>
      <div style={{ justifyContent: 'center', textAlign: 'center' }}>
        <h2>Hi {username}!</h2>
        <h3>You and your friends are watching this:</h3>
        <h4>Bridgerton</h4>
        <img
          src='./client/assets/bridgerton.jpg'
          alt='bridgerton-picture'
          style={{ width: '100px' }}
        ></img>
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
              style={{ fontFamily: 'arial', color: 'black', fontSize: '10px' }}
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
              style={{ fontFamily: 'arial', color: 'black', fontSize: '10px' }}
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
              style={{ fontFamily: 'arial', color: 'black', fontSize: '10px' }}
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
            style={{ width: '30%', display: 'flex', justifyContent: 'center' }}
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
