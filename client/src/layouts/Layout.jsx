import { Link } from 'react-router-dom';

export default function Layout({ currentUser, handleLogout, children }) {
  return (
    <div>
      <header>
        <h1>Tasteville</h1>
        {currentUser ? (
          <div>
            <p>{currentUser.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to='/login'>Login/Register</Link>
        )}
        {currentUser && (
          <nav>
            <Link to='/foods'>Foods</Link>
            <Link to='/flavors'>Flavors</Link>
          </nav>
        )}
      </header>
      {children}
    </div>
  );
}
