import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setServerError(null);
    setSubmitting(true);
    try {
      await registerUser({ username: data.username, email: data.email, password: data.password });
      navigate("/login");
    } catch (err) {
      setServerError(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Join The Journal</h1>
        <p>Create an account to comment, discuss ideas and participate in conversations.</p>
      </div>

      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Account</h2>

          {serverError && <div className="auth-server-error">{serverError}</div>}

          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          <p className="field-error">{errors.username?.message}</p>

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          <p className="field-error">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
          />
          <p className="field-error">{errors.password?.message}</p>

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          <p className="field-error">{errors.confirmPassword?.message}</p>

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>

          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
