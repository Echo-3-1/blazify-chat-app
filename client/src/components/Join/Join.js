import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [room, setRoom] = useState('');
  const [roompassword, setRoomPassword] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Username" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="mixed" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room Password" className="joinInput mt-20" type="mixed" onChange={(event) => setRoomPassword(event.target.value)} />
        </div>
        <Link onClick={e => (!room || !name ||!password ||!roompassword) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
