// components/Navbar.js
'use client';

import { isAuthenticated, getClientRole, logout } from '../lib/auth';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    setIsAuth(isAuthenticated());
    setRole(getClientRole());
  }, []);
  
  return (
    <nav>
      {isAuth ? (
        <>
          <span>Role: {role}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}