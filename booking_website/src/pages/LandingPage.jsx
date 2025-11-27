// 3️⃣ LandingPage.jsx
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";

const LandingPage = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return (
    <div className="h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full p-4 space-y-6 text-center">
        {token ? (
          <h1 className="text-4xl font-bold sm:text-5xl">
            Enjoy Your Bookings!
          </h1>
        ) : (
          <>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Welcome to Elite Stays
            </h1>
            <p className="text-lg sm:text-xl">
              A simple and intuitive platform to manage your bookings. Login to
              get started!
            </p>
            <Link
              to="/login"
              className="mt-6 px-6 py-3 bg-blue-800 text-white rounded-full text-lg font-semibold hover:bg-blue-900 transition"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
