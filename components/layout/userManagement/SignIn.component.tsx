import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';

const Login = () => {
  const router = useRouter()
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    fetch('/api/user/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(async data => {
        const responseData = await data.json();
        if (responseData.success) {
          setCookie('token', responseData.token);

          router.push('/');
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <p>No account yet. You can register hier
          <Link href="/user/sign_up">
            <small>Register</small>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;