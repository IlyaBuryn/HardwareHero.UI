import React, { useState, useContext, useEffect } from 'react';
import { FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordCheck = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [password, setPassword] = useState('');

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    const inputTest = document.getElementById('input_test');
    const passwordBlockCheck = document.getElementById('password_block_check');

    const checkPasswordStrength = () => {
      const inputTestValue = inputTest.value;

      let isLowerCase = false;
      let isUpperCase = false;
      let hasDigit = false;
      let hasSpecialCharacter = false;

      for (let i = 0; i < inputTestValue.length; i++) {
        const char = inputTestValue[i];

        if (!isLowerCase && /[a-z]/.test(char)) {
          isLowerCase = true;
        } else if (!isUpperCase && /[A-Z]/.test(char)) {
          isUpperCase = true;
        } else if (!hasDigit && /\d/.test(char)) {
          hasDigit = true;
        } else if (!hasSpecialCharacter && /[!@#$%^&*()_\-+=|/.,:;[\]{}]/.test(char)) {
          hasSpecialCharacter = true;
        }
      }

      let rating = 0;

      if (isLowerCase) rating++;
      if (isUpperCase) rating++;
      if (hasDigit) rating++;
      if (hasSpecialCharacter) rating++;

      if (inputTestValue.length == 0) {
        passwordBlockCheck.style.width = '0%';
      }
      else if (inputTestValue.length < 6 && rating < 3) {
        passwordBlockCheck.style.width = '10%';
        passwordBlockCheck.style.backgroundColor = '#e7140d';
      } else if (inputTestValue.length < 6 && rating >= 3) {
        passwordBlockCheck.style.width = '50%';
        passwordBlockCheck.style.backgroundColor = '#ffdb00';
      } else if (inputTestValue.length >= 8 && rating < 3) {
        passwordBlockCheck.style.width = '50%';
        passwordBlockCheck.style.backgroundColor = '#ffdb00';
      } else if (inputTestValue.length >= 8 && rating >= 3) {
        passwordBlockCheck.style.width = '100%';
        passwordBlockCheck.style.backgroundColor = '#61ac27';
      } else if (inputTestValue.length >= 6 && rating === 1) {
        passwordBlockCheck.style.width = '10%';
        passwordBlockCheck.style.backgroundColor = '#e7140d';
      } else if (inputTestValue.length >= 6 && rating > 1 && rating < 4) {
        passwordBlockCheck.style.width = '50%';
        passwordBlockCheck.style.backgroundColor = '#ffdb00';
      } else if (inputTestValue.length >= 6 && rating === 4) {
        passwordBlockCheck.style.width = '100%';
        passwordBlockCheck.style.backgroundColor = '#61ac27';
      }
    };

    inputTest.addEventListener('input', checkPasswordStrength);

    return () => {
      inputTest.removeEventListener('input', checkPasswordStrength);
    };
  }, []);

  return (
    <div>
      <FormControl fullWidth size="small" variant="outlined">
        <OutlinedInput
          sx={{ borderRadius: '10px', mt: 1 }}
          id="input_test"
          placeholder="at least $ characters"
          color="secondary"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          } onChange={handleChangePassword}
        />
      </FormControl>
    <div style={{ marginBottom: 15 }} id="password_block_check"></div>
  </div>
  );
}

export default PasswordCheck;
