// 4️⃣ Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./../components/Navbar";
import { loginUser } from "./../api/auth";
import { useAuth } from "./../data/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await loginUser(username, password);
      login(userData); // store user data in context
      setMessage({ text: "Login successful!", type: "success" });
      setTimeout(() => navigate("/bookings"), 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid Credentials";
      setMessage({ text: errorMessage, type: "error" });

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <Navbar />

      {message && (
        <div
          className={`p-4 my-4 text-white rounded-lg absolute w-full text-center ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-full px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-center">
          Login to Your Account
        </h2>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-6 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white rounded-full text-lg font-semibold hover:bg-blue-800 transition"
          >
            {loading ? "Loading.." : "Login"}
          </button>
        </form>
        {/* <p className="text-center text-gray-300">
          Don't have an account? <a href="/signup" className="text-blue-300 hover:underline">Sign up</a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
