import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const response = await loginUser(data);
      const decoded = login(response);
      navigate(decoded?.role === "ADMIN" ? "/admin" : "/reader");
    } catch (err) {
      setServerError(err.response?.data?.detail || "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Welcome Back</h1>
        <p>Continue your journey through thoughts, technology and philosophy.</p>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>

          {serverError && <div className="auth-server-error">{serverError}</div>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
          />
          <p className="field-error">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password required" })}
          />
          <p className="field-error">{errors.password?.message}</p>

          <button type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>

          <span>
            New here? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
