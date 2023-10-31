import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { LoginContainer, LoginTitle, LoginForm, FormInput, SubmitButton, ErrorMessage } from '../styles/LoginStyles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginMutation] = useMutation(LOGIN);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data && data.login) {
        // Handle successful login
        console.log('Login successful');
        setIsAuthenticated(true); // Set user as authenticated

        // Use navigate to go to the "Apparel" page after successful login
        navigate('/login/success');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Error logging in:', err);
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginForm onSubmit={handleLogin}>
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Log In</SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
