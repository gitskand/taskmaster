
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import manImage from './man.jpg';

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: "hhttp:localhost:3000" });
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="http:localhost:3000" style={{ textAlign: 'center' }}>

          <div className="container">Text-Manager</div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {!isAuthenticated ? (
                <button className="btn btn-primary nav-link active" onClick={handleLogin}>
                  Login
                </button>
              ) : (
                <button className="btn btn-primary nav-link active" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Content to be shown when user is logged out */}
      {!isAuthenticated && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
         
          <img src={manImage} alt="Man" style={{ width: '196.5vh', height: '97.1vh' }} />
          {/* <h3 style={{color: "white"}}>Welcome! Please log in to access the content.</h3> */}
          {/* Add your desired content here */}
        </div>
      )}
    </div>
  );
}

