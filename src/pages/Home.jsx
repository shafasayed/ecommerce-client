import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Home() {
  const { user, checkedSession, logout } = useAuth()

  if (!checkedSession) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Welcome to the store</h1>
      <p><Link to="/products">Browse products</Link></p>

      {user ? (
        <div>
          <p>Logged in as {user.name} ({user.email})</p>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link to="/login">Log in</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  )
}

export default Home
