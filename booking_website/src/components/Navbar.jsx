// 2️⃣ Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from './../data/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-lg font-semibold"> <Link to="/" >Elite Stays</Link> </h1>
      <div className="flex gap-4">
        {!user ? (
          <Link to="/login" className="underline">Login</Link>
        ) : (
          <>
            <Link to="/bookings" className="underline">View</Link>
            <Link to="/bookings/new" className="underline">Create</Link>
            <button onClick={logout} className="underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;