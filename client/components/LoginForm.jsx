import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../../client/styles.css';



const LoginForm= () => {
    return(
        <Form>
          <Form.Group className="emailInput" controlId="emailInput">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email"/>
          </Form.Group>
          <Form.Group className="passwordInput" controlId="passwordInput">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group> 
        </Form>
    )
}

export default LoginForm;
