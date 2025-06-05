import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const bApp = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all the fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${bApp}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword,
          id_number: location.state?.id_number,
          confirmPassword,
        }),
      });

      if (res.ok) {
        alert("Password reset successfully");
        navigate("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError("Something went wrong. Please try again.");
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
          <h3 className="text-center mb-4">Reset Password</h3>

          <div className="form-group mb-4">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              className="form-control bg-custom-input"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control bg-custom-input"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 btn-custom w-100"
            disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"></span>
                Verifying...
              </>
            ) : (
              "Change"
            )}
          </button>

          {error && <p className="mt-3 text-center text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
