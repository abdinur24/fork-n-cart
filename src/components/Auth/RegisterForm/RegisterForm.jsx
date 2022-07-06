import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField
          label="Username"
          value={username}
          variant='standard'
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label='Password'
          type="password"
          value={password}
          variant='standard'
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <Button className="btn" type="submit" name="submit" value="Register">
          Submit
        </Button> 
      </div>
    </form>
  );
}

export default RegisterForm;
