import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  logInUser,
  authorizeToken,
  rejectedState,
} from '../store/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const rejectState = useAppSelector(rejectedState);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(
      logInUser({
        username,
        password,
      })
    );
    await dispatch(authorizeToken());
    setUsername('');
    setPassword('');
    const token = localStorage.getItem('token');
    console.log(token);
    if (token !== '[object Object]') {
      navigate('/');
    }
  };

  return (
    <div>
      {rejectState === 'Rejected' ? (
        <div className="text-white block">Invalid Username/Password </div>
      ) : (
        <div></div>
      )}
      <h1 className="text-white block">LOGIN </h1>
      <form id="form1" onSubmit={handleSubmit}>
        <label className="text-white block"> USERNAME</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-white block"> PASSWORD</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button type="submit" form="form1" value="Submit" className="text-white">
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
