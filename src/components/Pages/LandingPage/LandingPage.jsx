import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../../Auth/RegisterForm/RegisterForm';

// Material UI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <Typography variant='h1'>
        {heading}
      </Typography>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>Eat Good and Save Good While Using Fork-N-Cart</p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
