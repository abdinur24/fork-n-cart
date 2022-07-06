import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// Material UI
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
          <TextField
            label="Username"
            variant='standard'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
          <TextField
            type="password"
            label="Password"
            variant='standard'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <Button className="btn" type="submit" name="submit" value="Log In">
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
