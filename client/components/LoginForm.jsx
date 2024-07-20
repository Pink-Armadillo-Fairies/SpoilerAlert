import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { successfulLogin } from '../loginSlice';
import { Form, Container, Button } from 'react-bootstrap';
import '../../client/styles.css';




const LoginForm= () => {
    // const [inputUsernameValue, setInputUsernameValue] = useState('');
    // const [inputPasswordValue, setInputPasswordValue] = useState('');

    const [loginInput, updateLoginEntered] = useState({
      usernameInput: '',
      passwordInput: '',
    })

    const handleInputChange = (event) => {
      // console.log('event', event)
      const { id, value } = event.target;
      updateLoginEntered({
        ...loginInput,
        [id]: value,
      })
      // console.log('loginInput', loginInput);
    }

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleUsernameChange = (event) => {
    //   setInputUsernameValue(event.target.value);
    // }
    // const handlePasswordChange = (event) => {
    //   setInputPasswordValue(event.target.value);
    // }

    const handleLoginSubmit = () => {
      alert(`Username: ${inputUsernameValue} Password: ${inputPasswordValue}`)
    }

    const navigate = useNavigate();
  //   const gotoMainPage = () => {
  //   navigate('/mainpage');
  // };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        //console.log('fetching', loginInput.user);
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(loginInput),
        });
        if (response.ok) {
          // const responseData = await response.json();
          // console.log('verifyUser Response:', responseData);
          dispatch(successfulLogin(loginInput.usernameInput))
          navigate('/mainpage');
        } else {
          console.error('Login failed');
        }
      } catch (err) {
        console.error('Error with login fetch:', err)
      }
    }

    return(


     <Container className="loginFormContainer">


      <Form className="loginBox" onSubmit={handleSubmit} >

      <p style={{fontFamily: "arial", fontSize: "20px"}}>Login</p>
        <Form.Group className="usernameInput" controlId="usernameInput" style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
          <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>Username</Form.Label>
          <Form.Control type="text" onChange={handleInputChange}/>
        </Form.Group>
          <Form.Group className="passwordInput" controlId="passwordInput" style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <Form.Label style={{fontFamily: "arial", color: "black", fontSize: "10px"}}>Password</Form.Label>
            <Form.Control type="password"  onChange={handleInputChange} />
          </Form.Group> 
          <Button className="loginButton" variant="login" type="submit" style={{border: "1px solid black"}} >Log In</Button>
          <div className="newUserLine" style={{display: "flex", alignItems: "center", fontFamily: "Arial", fontSize: "10px", marginTop: "40px"}}>
            <p style={{margin:"0"}}>New to Spoiler Alert?</p>
            <a href="/create-user" style={{marginLeft: "20px"}}>Create New User</a>
          </div>
          
        </Form>
        
    </Container>
    )
}

export default LoginForm;
