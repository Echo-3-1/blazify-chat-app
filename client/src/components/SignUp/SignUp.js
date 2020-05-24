import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './SignUp.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signupOuterContainer">
      <div className="signupInnerContainer">
        <h1 className="heading">Sign Up</h1>
        <div>
          <input placeholder="Username" className="signupInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="signupInput mt-20" type="mixed" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !password) ? e.preventDefault() : null} to={`/Join/Join`}>
          <button className={'button mt-20'} type="submit">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}