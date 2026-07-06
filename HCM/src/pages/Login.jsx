import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import "../styles/login.css";
import Auth from "../auth/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let lang = localStorage.setItem("language","English");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await Auth.login(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    dispatch(loginSuccess(data));

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h1>Welcome Back</h1>
          <p>
            Login to continue managing your Health Centre with ease and
            security.
          </p>

          <img
            src="https://illustrations.popsy.co/amber/digital-nomad.svg"
            alt="Login Illustration"
          />
        </div>

        <div className="login-right">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <a href="/">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;