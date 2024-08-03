import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { successfulLogin, failedLogin } from '../loginSlice';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import '../../client/styles.css';

const LoginForm = () => {
  
  const [loginInput, updateLoginEntered] = useState({
    usernameInput: '',
    passwordInput: '',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    updateLoginEntered({
      ...loginInput,
      [id]: value,
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
      });
      if (response.ok) {
        dispatch(successfulLogin(loginInput.usernameInput));
        navigate('/dashboard');
      } else {
        dispatch(failedLogin(loginInput.usernameInput));
        console.error('Login failed');
      }
    } catch (err) {
      console.error('Error with login fetch:', err);
    }
  };

  const loginMessage = useSelector((store) => store.login.loginFailedMessage);
  let alert = <></>;
  if (loginMessage) {
    alert = (
      <Alert style={{ margin: '8px' }} variant="danger">
        {loginMessage}
      </Alert>
    );
  }

  return (
    <Container className="loginFormContainer">
      <Form className="loginBox" onSubmit={handleSubmit}>
        <p style={{ fontFamily: 'arial', fontSize: '25px' }}>Welcome!</p>
        <Form.Group
          className="usernameInput"
          controlId="usernameInput"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Form.Label
            style={{ fontFamily: 'arial', color: 'black', fontSize: '15px' }}
          >
            Username
          </Form.Label>
          <Form.Control type="text" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group
          className="passwordInput"
          controlId="passwordInput"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Form.Label
            style={{ fontFamily: 'arial', color: 'black', fontSize: '15px' }}
          >
            Password
          </Form.Label>
          <Form.Control type="password" onChange={handleInputChange} />
        </Form.Group>
        <Button
          className="loginButton"
          variant="login"
          type="submit"
          style={{ border: '1px solid black' }}
        >
          Log In
        </Button>
        {alert}
        <div
          className="newUserLine"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Arial',
            fontSize: '10px',
            marginTop: '40px',
          }}
        >
          <p style={{ margin: '0' , fontSize: "15px"}}>New to Spoiler Alert?</p>
          <a href="#" onClick={()=>navigate('/signup')} style={{ marginLeft: '20px' , color: 'red', fontSize: "15px"}}>
            Create New User
          </a>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
