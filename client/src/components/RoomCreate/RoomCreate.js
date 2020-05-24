import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './SignUp.css';

export default function SignUp() {
  const [room, setRoomName] = useState('');
  const [roompassword, setRoomPassword] = useState('');

  return (
    <div className="signupOuterContainer">
      <div className="signupInnerContainer">
        <h1 className="heading">Create Room</h1>
        <div>
          <input placeholder="Room Name" className="signupInput" type="text" onChange={(event) => setRoomName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="signupInput mt-20" type="mixed" onChange={(event) => setRoomPassword(event.target.value)} />
        </div>
        <Link onClick={e => (!room || !roompassword) ? e.preventDefault() : null} to={`/Join/Join`}>
          <button className={'button mt-20'} type="submit">Create Room</button>
        </Link>
      </div>
    </div>
  );
}