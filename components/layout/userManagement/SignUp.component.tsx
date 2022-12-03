import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';
import {server} from '../../../config/index'

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
          setCookie('token', responseData.token);

          router.push('/');
        }
      });
  }

  return (
    <div className='outer-container'>
      <div className='sign-up-outer-container'>
        <form className='sign-up' onSubmit={handleSubmit}>
          <div className='sign-up__inner-container'>
              <label htmlFor='sign-up-username'>Username</label>
              <input id='sign-up-username' className='input' type="text" onChange={e => setUserName(e.target.value)} />
              <label htmlFor='sign-up-email'>Email</label>
              <input id='sign-up-email' className='input' type="email" onChange={e => setEmail(e.target.value)} />
              <label htmlFor='sign-up-password'>Password</label>
              <input id='sign-up-password' className='input' type="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='formButtons'>
            <input disabled={false} className='button submit' type="submit" value="submit" />
            <input className='button cancel' type="reset" value="cancel" />
          </div>
        </form>
        
        <div className='have-account'>
          <p>Already have an account?<br/><br/></p>
          <Link className='link-login' href={`${server}/user/sign_in`}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register;