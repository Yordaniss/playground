import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter()
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    fetch('/api/user/sign_up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
    })
      .then(async data => {
        const responseData = await data.json();
        if (responseData.success) {
          document.cookie = `token=${responseData.token}`;

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
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
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
        <p>Already have an account
          <Link href="/user/sign_in">
            <small>Login</small>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register;