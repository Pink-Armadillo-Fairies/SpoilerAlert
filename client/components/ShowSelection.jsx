import React from 'react';
import { useState } from 'react';
import { Card, CardGroup, Form, Container, Button } from 'react-bootstrap';
import '../../client/styles.css';



const ShowSelection = () => {
    return (
        <CardGroup style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
        <Button style={{width: "100px"}}>
        <Card className='bridgertonCard'>
          <Card.Img variant="top" src="./client/assets/bridgerton.jpg"  alt='bridgerton-picture' style={{width: "100px"}}/>
          <Card.Body>
            <Card.Title>Bridgerton</Card.Title>
            <Card.Text>
              TBD
            </Card.Text>
          </Card.Body>
        </Card>
        </Button>
        <Button>
        <Card className='marioCard'>
          <Card.Img variant="top" src="./client/assets/supermario.jpg" alt='mario-picture' style={{width: "100px"}} />
          <Card.Body>
            <Card.Title>Super Mario Bros. Movie</Card.Title>
            <Card.Text>
              TBD
            </Card.Text>
          </Card.Body>
        </Card>
        </Button>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
                TBD
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    );
}

export default ShowSelection;