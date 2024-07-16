import React from 'react';
import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import '../../client/styles.css';

const MainPage = () => {
  return (
    <Container className="mainPageContainer">
    <div style={{justifyContent: "center", textAlign: "center"}}>
      <h2>Hi USER!</h2>
      <h3>You and your friends are watching this:</h3>
      <h4>Bridgerton</h4>  
      <img src="./client/assets/bridgerton.jpg"  alt='bridgerton-picture' style={{width: "100px"}}></img> 
    </div>
    <Form className="submitWatchProgess" style={{display: "flex", flexDirection: "column", justifyContent: "center"}} >
    {/* TODO: add onChange function and value attribute */}
   <div style={{display: "flex", justifyContent: "space-around", marginBottom: "20px", marginTop: "20px"}}>
      <Form.Group className="seasonInput" controlId="seasonInput" style={{display: "flex", flexDirection: "column"}}>
        <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>Season</Form.Label>
        <Form.Control type="text"/>
        </Form.Group>
     <Form.Group className="episodeInput" controlId="episodeInput" style={{display: "flex", flexDirection: "column"}}>
        <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>Episode</Form.Label>
        <Form.Control type="text"/>
     </Form.Group> 
    </div>
    <div style={{display: "flex", justifyContent: "space-around", marginBottom: "20px"}}>
        <Form.Group className="commentInput" controlId="commentInput" style={{display: "flex", flexDirection: "column", width: "90%"}}>
          <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>What do you think of this episode? Write your comments:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
    </div> 
    <div style={{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
        <Button className="saveInput" variant="watchUpdate" type="submit" style={{width: "30%", display: "flex", justifyContent: "center"}}>Save</Button>      
    </div>
      </Form>
      </Container>
  )
}

export default MainPage;