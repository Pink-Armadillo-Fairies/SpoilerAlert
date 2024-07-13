import React from 'react';
import { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import '../../client/styles.css';



const LoginForm= () => {
    return(
     <Container className="loginFormContainer">
      
      <Form className="loginBox">
      <p style={{fontFamily: "arial", fontSize: "20px"}}>Login</p>
        <Form.Group className="usernameInput" controlId="usernameInput" style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
          <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>Username</Form.Label>
          <Form.Control type="email" value={"TBD"} onChange={"TBD"}/>
        </Form.Group>
          <Form.Group className="passwordInput" controlId="passwordInput" style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>Password</Form.Label>
            <Form.Control type="password" value={"TBD"} onChange={"TBD"}/>
          </Form.Group> 
          <Button className="loginButton" variant="login" type="submit" onPress={"TBD"}>Log In</Button>
          <div className="newUserLine" style={{display: "flex",  alignItems: "center", fontFamily: "Arial", fontSize: "10px", marginTop: "40px"}}>
            <p>New to Spoiler Alert?</p>
            <a href="/create-user" style={{marginLeft: "10px"}}>Create New User</a>
          </div>
          
        </Form>
        
    </Container>
    )
}

export default LoginForm;
