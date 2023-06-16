'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './login.module.css';
import { authenticateLogin } from '@/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className={ `${style.container}` }>
      <form
        className={ `${style.form}` }
        onSubmit={ (e) => authenticateLogin(e, email, password, router) }
      >
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}
