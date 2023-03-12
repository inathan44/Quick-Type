import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <div>
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
