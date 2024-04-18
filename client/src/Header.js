import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', { credentials: 'include' }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo.userName);
        });
      }
    );
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const userName = userInfo?.userName;
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {userName && (
          <>
            <Link to="/create">Create New post</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
