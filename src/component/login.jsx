import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const bApp = import.meta.env.VITE_API_URL;
console.log(bApp);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); // use setUser from context

  // useEffect(() => {
  //   if (user) {
  //     // Redirect based on role immediately
  //     if (user.role === "student") {
  //       navigate("/student/dashboard");
  //     } else if (user.role === "teacher") {
  //       navigate("/teacher/dashboard");
  //     } else {
  //       navigate("/admin_dashboard");
  //     }
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      alert("Please fill in all the fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${bApp}/api/auth/login`, {
        method: "POST",
        credentials: "include", // Include cookies in request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log(data.user);

      if (res.ok) {
        const userFromServer = data.user;

        setUser(userFromServer);
        localStorage.setItem("userInfo", JSON.stringify(userFromServer));
        setMessage("Login successful!");
        // Redirect or update app state
        if (userFromServer.role === "student") {
          navigate("/student/dashboard");
        } else if (userFromServer.role === "teacher") {
          navigate("/teacher/dashboard");
        } else {
          navigate("/admin_dashboard");
        }

        console.log("Logged in user:", userFromServer);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-back">
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100%" }}>
        <form className="col-xl-6 bg-custom-form p-4" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Login</h3>

          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1">Email:</label>
            <input
              type="email"
              className="form-control bg-custom-input"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password:</label>
            <input
              type="password"
              className="form-control bg-custom-input"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="my-5">
            <a href="/forgot-password">Forgot Password</a>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-2 btn-custom w-100"
            disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"></span>
                Authenticating...
              </>
            ) : (
              "Login"
            )}
          </button>

          {message && <p className="mt-3 text-center text-danger">{message}</p>}

          <p className="mt-5 text-center">
            Proudly designed by{" "}
            <a href="https://altechdev.onrender.com">Altechdev</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
